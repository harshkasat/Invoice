import uuid
import enum
from sqlalchemy import Column, String, Integer, Text, ForeignKey, func, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
from DB import engine

Base = declarative_base()

class Role(enum.Enum):
    VIEW = "view"
    EDIT = "edit"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), nullable=False)
    user_email = Column(String(50), unique=True, nullable=False)
    credit = Column(Integer, nullable=False, default=5)
    role = Column(Enum(Role), nullable=False, default=Role.VIEW)

class PDF(Base):
    __tablename__ = "pdfs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    pdf_name = Column(String(100), nullable=False)
    pdf_link = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

# Move table creation to the bottom and add a function to handle it
def init_db():
    # Drop all tables first to ensure clean slate
    Base.metadata.drop_all(engine)
    # Create all tables
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    # Run this file directly to recreate tables
    init_db()
    print("Database tables created successfully!")
