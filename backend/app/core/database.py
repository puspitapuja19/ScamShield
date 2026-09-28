from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Engine মানে database এর সাথে connection তৈরি করা
engine = create_engine(settings.DATABASE_URL)

# Session মানে database এ কাজ করার জন্য একটা workspace
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base মানে সব table এর parent class
Base = declarative_base()

# এই function টা প্রতিটা API request এ database session দেবে
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()