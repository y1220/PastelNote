from fastapi import APIRouter
from .endpoints import notes, graphify

router = APIRouter()

router.include_router(notes.router, prefix="/notes", tags=["notes"])
router.include_router(graphify.router, tags=["graphify"])
