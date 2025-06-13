from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from app.db.database import get_database

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str

@router.post("/", status_code=201)
async def create_task(task: TaskCreate, db=Depends(get_database)):
    result = await db["tasks"].insert_one(task.dict())
    return {"id": str(result.inserted_id), **task.dict()}

# You can add more endpoints (get, update, delete) as needed
