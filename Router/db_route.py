from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from DB.db_operations import PDFModel, UserManager
from typing import Optional
from uuid import UUID

router = APIRouter(
    prefix='/db_operation',
    responses={404: {"description": "Not found"}},
    # tags=["DB Operation"]
)

class UserModel(BaseModel):
    username: Optional[str]
    user_email: Optional[str]

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
                       user_email=user_info.user_email)
    get_user = user.create_user()

    return JSONResponse(get_user)


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

@router.delete('/user', tags=["User Manager"])
async def delete_user(user_id:UUID):
    user = UserManager()
    deleted_user = user.delete_user(user_id=user_id)
    return JSONResponse(delete_user)

