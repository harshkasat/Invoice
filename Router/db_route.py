import tempfile
from fastapi import APIRouter, Response, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from DB.db_operations import UserManager
from utils.file_manager import PDFService
from typing import Optional
from uuid import UUID

router = APIRouter(
    prefix='/db_operation',
    responses={404: {"description": "Not found"}},
    # tags=["DB Operation"]
)

class UserModel(BaseModel):
    username: Optional[str]
    email: Optional[str]

@router.get('/', tags=["Health of Server"])
async def check_route_health():
    try:
        return JSONResponse("DB route is working")
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse("DB route is not working properly")

@router.post('/create_user', tags=["User Manager"])
async def create_user(user_info:UserModel):
    user = UserManager(username=user_info.username,
                       user_email=user_info.email)
    get_user = user.create_user()
    return JSONResponse(get_user)


# User Manager
@router.get('/list_user', tags=["User Manager"])
async def list_user():
    user = UserManager()
    get_user = user.list_view_and_edit_users()
    return JSONResponse(get_user)

@router.get('/email', tags=["User Manager"])
async def get_user_by_email(email:str):
    user = UserManager()
    get_user = user.get_user_by_email(email=email)
    return JSONResponse(get_user)

@router.delete('/delete_user', tags=["User Manager"])
async def delete_user(user_id:UUID):
    user = UserManager()
    deleted_user = user.delete_user(user_id=user_id)
    return JSONResponse(deleted_user)


# PDF File Manager
@router.get('/list_pdf', tags=["PDF Manager"])
async def list_pdf(user_id:UUID):
    pdf_service = PDFService()
    pdf_list = pdf_service.list_pdfs_by_user_id(user_id=user_id)
    return pdf_list

@router.post('/create_pdf', tags=["PDF Manager"])
async def create_pdf(user_id:UUID, file_path:UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        content = await file_path.read()
        temp_file.write(content)
        temp_file_path = temp_file.name
    pdf_service = PDFService()
    secure_url, public_id, original_filename = pdf_service.save_pdf(
        user_id=user_id,
        file_path=temp_file_path,
        file_name=file_path.filename
        )
    return JSONResponse(
        content={
            "message": "File uploaded and processing started", 
            "secure_url": secure_url,
            "public_id": public_id,
            "filename": original_filename
        })

@router.delete('/delete_pdf', tags=["PDF Manager"])
async def delete_pdf(user_id, pdf_name):
    pdf_service = PDFService()
    pdf_service.delete_pdf(user_id=user_id, pdf_name=pdf_name)
