import uuid
import os
import enum
from sqlalchemy import create_engine, Column, String, Integer, Text, ForeignKey, func, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base, sessionmaker


DATABASE_URL = os.getenv("SUPABASE_DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

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
    pdf_public_id = Column(String(100), unique=True, nullable=False)
    pdf_link = Column(Text, nullable=False)
    created_at = Column(String, server_default=func.now)
    updated_at = Column(String, server_default=func.now, onupdate=func.now)

Base.metadata.create_all(engine)

# Test Connection
def test_connection():
    try:
        with engine.connect() as connection:
            print("✅ Connected to Supabase successfully!")
    except Exception as e:
        print("❌ Error connecting to Supabase:", e)

test_connection()
