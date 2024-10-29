import os
import tempfile

from fastapi import Depends, FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# from sqlalchemy.orm import Session

# from AwsService.s3_utils import upload_file_to_s3
# from Celery.celery_worker import process_file_task
# from celery.result import AsyncResult
from Router import task_status, upload_invoice

app = FastAPI()

print("Starting FastAPI server...")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(task_status.router)
app.include_router(upload_invoice.router)

