from fastapi import APIRouter
from .endpoints import notes, graphify, registered_tasks, tasks

router = APIRouter()

router.include_router(notes.router, prefix="/notes", tags=["notes"])
router.include_router(graphify.router, tags=["graphify"])
router.include_router(registered_tasks.router, tags=["registered_tasks"])
router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
