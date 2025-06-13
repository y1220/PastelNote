from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.db.database import get_database
from typing import List

router = APIRouter()

class RegisterTaskRequest(BaseModel):
    note_id: str
    task_id: str
    status: str

class RegisterTasksBatchRequest(BaseModel):
    tasks: List[RegisterTaskRequest]

@router.post("/register-task")
async def register_task(req: RegisterTaskRequest, db=Depends(get_database)):
    await db["registered_tasks"].update_one(
        {"note_id": req.note_id, "task_id": req.task_id},
        {"$set": {"status": req.status}},
        upsert=True
    )
    return {"status": "registered"}

@router.post("/register-tasks-batch")
async def register_tasks_batch(req: RegisterTasksBatchRequest, db=Depends(get_database)):
    if not req.tasks:
        raise HTTPException(status_code=400, detail="No tasks provided")
    operations = [
        {
            "update_one": {
                "filter": {"note_id": t.note_id, "task_id": t.task_id},
                "update": {"$set": {"status": t.status}},
                "upsert": True
            }
        }
        for t in req.tasks
    ]
    if operations:
        await db["registered_tasks"].bulk_write(operations)
    return {"status": "batch registered", "count": len(operations)}

@router.post("/remove-task")
async def remove_task(req: RegisterTaskRequest, db=Depends(get_database)):
    await db["registered_tasks"].delete_one(
        {"note_id": req.note_id, "task_id": req.task_id}
    )
    return {"status": "removed"}

@router.get("/registered-tasks/{note_id}")
async def get_registered_tasks(note_id: str, db=Depends(get_database)):
    tasks = await db["registered_tasks"].find({"note_id": note_id}).to_list(100)
    return {"tasks": tasks}
