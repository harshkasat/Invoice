from fastapi import APIRouter, UploadFile, File
import tempfile
import os
from CloudStorage.utils import CloudinaryStorage
from Celery.celery_worker import process_file_task
from fastapi.responses import JSONResponse


cloud_storage = CloudinaryStorage()

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

        # # check if the file is already uploaded
        # existing_url = cloud_storage.check_file_exist(file.filename, folder_name="invoices")
        # if existing_url:
        #     return JSONResponse(
        #     content={
        #         "message": "File already uploaded",
        #         "existing_url": existing_url
        #     }
        #     )

        # Upload the file to cloudinary
        secure_url, public_id, original_filname = cloud_storage.upload_to_cloudinary(
            file_path=temp_file_path,
            public_id=file.filename, # use uuid from pdf table
            folder="invoices")

        # Delete the temporary file
        os.unlink(temp_file_path)

        # Start Celery task
        task = process_file_task.delay(public_id, email=email)

        return JSONResponse(
            content={
                "message": "File uploaded and processing started", 
                "secure_url": secure_url,
                "public_id": public_id,
                "filename": original_filname,
                "task_id": task.id
            }
        )


    except Exception as e:
        print(f"Error uploading file: {e}")
        return JSONResponse(content={"message": "Error when uploading file", "error": str(e)})