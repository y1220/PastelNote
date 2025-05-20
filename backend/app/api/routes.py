from fastapi import APIRouter
from .endpoints import notes

router = APIRouter()

router.include_router(notes.router, prefix="/notes", tags=["notes"])