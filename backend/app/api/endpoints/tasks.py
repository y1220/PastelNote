from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from bson import ObjectId
import motor.motor_asyncio
import os
import asyncio
from ...db.database import get_database
from fastapi import Request

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    status: str = "todo"
    note_id: Optional[str] = None
    priority: Literal['low', 'medium', 'high'] = "medium"  # restrict to allowed values

class Task(TaskCreate):
    id: str

# Helper to convert MongoDB document to Task
def task_from_mongo(doc):
    if not doc:
        return None
    doc['id'] = str(doc['_id'])
    doc.pop('_id', None)
    # Validate priority value
    priority = doc.get('priority', 'medium')
    if priority not in ['low', 'medium', 'high']:
        priority = 'medium'
    return Task(
        title=doc.get('title', ''),
        description=doc.get('description', ''),
        status=doc.get('status', 'todo'),
        note_id=doc.get('note_id'),
        priority=priority,
        id=doc['id']
    )

@router.post("/", response_model=Task, status_code=201)
async def create_task(task: TaskCreate, db=Depends(get_database)):
    task_dict = task.dict(exclude_unset=True)
    result = await db["tasks"].insert_one(task_dict)
    created = await db["tasks"].find_one({"_id": result.inserted_id})
    return task_from_mongo(created)

@router.get("/", response_model=List[Task])
async def get_tasks(note_id: Optional[str] = None, db=Depends(get_database)):
    query = {"note_id": note_id} if note_id else {}
    tasks = []
    async for doc in db["tasks"].find(query):
        tasks.append(task_from_mongo(doc))
    return tasks

@router.post("/batch", status_code=201)
async def create_tasks_batch(tasks: list[TaskCreate], db=Depends(get_database)):
    created_tasks = []
    for task in tasks:
        task_dict = task.dict(exclude_unset=True)
        result = await db["tasks"].insert_one(task_dict)
        created = await db["tasks"].find_one({"_id": result.inserted_id})
        created_tasks.append(task_from_mongo(created))
    return created_tasks

@router.post("/remove-all", status_code=200)
async def remove_all_tasks(db=Depends(get_database)):
    result = await db["tasks"].delete_many({})
    return {"deleted_count": result.deleted_count}
