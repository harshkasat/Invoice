from fastapi import APIRouter, UploadFile, File
import tempfile
import os
from CloudStorage.utils import CloudinaryStorage
from Celery.celery_worker import process_file_task
from fastapi.responses import JSONResponse
from utils.file_manager import PDFService, UserManager


# cloud_storage = CloudinaryStorage()

router = APIRouter(
    prefix='/upload',
    responses={404: {"description": "Not found"}},
    tags=["Upload Invoice"]
)


@router.post("/upload_invoice", tags=["Upload Invoice"])
async def upload_invoice(user_id:str, file: UploadFile = File(...)):
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
        user = UserManager()  # Use Role enum
        user_info = user.get_user_info(user_id=user_id)
        pdf_service = PDFService()
        response = pdf_service.save_pdf(
            user_id=user_id,
            file_path=temp_file_path,
            file_name=file.filename
        )
        if isinstance(response, str):
            return JSONResponse({
                "message":response
            })

        secure_url, public_id, original_filename = response

        # Delete the temporary file
        os.unlink(temp_file_path)

        # Start Celery task
        task = process_file_task.delay(public_id, email=user_info['email'])
        print(task)

        return JSONResponse(
            content={
                "message": "File uploaded and processing started", 
                "secure_url": secure_url,
                "public_id": public_id,
                "filename": original_filename,
                "task_id": task.id
            }
        )

    except Exception as e:
        print(f"Error uploading file: {e}")
        return JSONResponse(content={"message": "Error when uploading file", "error": str(e)})
