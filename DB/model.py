from sqlalchemy import Column, String, Integer, ForeignKey, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

import uuid
import os

DATABASE_URL = os.getenv("SUPABASE_DATABASE_URL")

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), nullable=False)
    user_email = Column(String(50), unique=True, nullable=False)
    credit = Column(Integer, nullable=False, default=0)
    role = Column(String(50), nullable=False)

class PDF(Base):
    __tablename__ = "pdfs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    pdf_public_id = Column(String(100), unique=True, nullable=False)
    pdf_link = Column(Text, nullable=False)
    created_at = Column(String, server_default=func.now())
    updated_at = Column(String, server_default=func.now(), onupdate=func.now())

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
