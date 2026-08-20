import os #interact with env variables

from dotenv import load_dotenv #importing func that reads our .env file

from sqlalchemy import create_engine #importing SQLAlchemy's database engine creator
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv() #load the variables of env file

DATABASE_URL = os.getenv("DATABASE_URL") #retrives value from .env

engine = create_engine(DATABASE_URL) #connection mechanism between python and postgre

#sessionlocal creates session when we need them
SessionLocal=sessionmaker(
    autocommit=False,#db changes aren't automatically commited
    autoflush=False, #controls when SQLAlchemy send pending changes to db
    bind=engine #connects session factory to our existing db engine
)

Base=declarative_base()

def get_db():
    db = SessionLocal()

    try:
        yield db #gives db session to whoever need it
    finally:
        db.close()