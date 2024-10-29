from fastapi import APIRouter
from pydantic import BaseModel
from celery.result import AsyncResult

router = APIRouter(
    prefix='/task',
    responses={404: {"description": "Not found"}},
    tags=["Task Status"]
)


class TaskStatus(BaseModel):
    task_id: str
    status: str




@router.get("/task-status/{task_id}", tags=["Task Status"])
async def get_task_status(task_id: str):
    task_result = AsyncResult(task_id)
    
    if task_result.ready():
        return TaskStatus(task_id=task_id, status=task_result.status)
    return TaskStatus(task_id=task_id, status=task_result.status)