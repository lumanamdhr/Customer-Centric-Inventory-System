from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
from models import Customer

#password hashing
pwd_context = CryptContext( #creates our pw hashing configuration
    schemes=["bcrypt"],
    deprecated="auto"
)

# JWT settings
SECRET_KEY = "your-super-secret-key-change-this-later"

ALGORITHM = "HS256" #tells which signing algorthm to use

ACCESS_TOKEN_EXPIRE_MINUTES = 60 #token validity time


def hash_password(password: str) -> str: #produces secure hash
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool: #checks hash password
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode( #to create token
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

#authentication token will be provided as a Bearer token
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        customer_id = payload.get("sub")

        if customer_id is None:
            raise credentials_exception

    except JWTError:

        raise credentials_exception

    user = (
        db.query(Customer)
        .filter(Customer.id == int(customer_id))
        .first()
    )

    if user is None:
        raise credentials_exception

    return user


#role checker
def require_role(*allowed_roles):

    def role_checker(
        current_user: Customer = Depends(get_current_user)
    ):

        if current_user.role not in allowed_roles:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this resource"
            )

        return current_user

    return role_checker