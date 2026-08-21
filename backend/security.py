from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

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