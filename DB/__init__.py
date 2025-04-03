import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = os.getenv("SUPABASE_DATABASE_URL")
DATABASE_URL = 'postgresql://postgres.qwvnfuwovmdhdnnuzklt:uvuFojwlS3mtK3h4@aws-0-ap-south-1.pooler.supabase.com:6543/postgres'
if not DATABASE_URL:
    raise ValueError("SUPABASE_DATABASE_URL environment variable is not set.")

try:
    # Create the engine
    engine = create_engine(DATABASE_URL)

    # Test the connection
    engine.connect()

    # Session factory
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Create a session instance
    session = SessionLocal()

except Exception as e:
    print(f"Error: Unable to connect to the database. {str(e)}")
    raise
