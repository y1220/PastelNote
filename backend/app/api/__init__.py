# File: /pastel-notes/pastel-notes/backend/app/api/__init__.py

from fastapi import APIRouter

router = APIRouter()

from .endpoints import notes

router.include_router(notes.router, prefix="/notes", tags=["notes"])