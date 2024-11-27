from fastapi import APIRouter, UploadFile, File
import tempfile
import os
from AwsService.s3_utils import upload_file_to_s3
from Celery.celery_worker import process_file_task
from fastapi.responses import JSONResponse



router = APIRouter(
    prefix='/upload',
    responses={404: {"description": "Not found"}},
    tags=["Upload Invoice"]
)


@router.post("/upload_invoice", tags=["Upload Invoice"])
async def upload_invoice(email: str, file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name

        # Upload the file to S3
        s3_key = f"invoices/{file.filename}"
        upload_file_to_s3(temp_file_path, s3_key)

        # Delete the temporary file
        os.unlink(temp_file_path)

        # Start Celery task
        task = process_file_task.delay(s3_key, email)

        return JSONResponse(content={"message": "File uploaded and processing started", "task_id": task.id})
    except Exception as e:
        print(f"Error uploading file: {e}")
        return JSONResponse(content={"message": "Error when uploading file", "error": str(e)})