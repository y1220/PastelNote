from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from ...schemas.note import NoteCreate, NoteUpdate, Note as NoteRead, NoteList
from ...services.note_service import NoteService

router = APIRouter()

# Dependency to get NoteService instance
async def get_note_service():
    return NoteService()

@router.post("/", response_model=NoteRead, status_code=201)
async def create_note(
    note: NoteCreate,
    note_service: NoteService = Depends(get_note_service)
):
    """Create a new note"""
    return await note_service.create_note(note)

@router.get("/", response_model=List[NoteRead])
async def read_notes(
    note_service: NoteService = Depends(get_note_service),
    skip: int = 0,
    limit: int = 100
):
    """Get all notes with pagination"""
    return await note_service.get_notes(skip=skip, limit=limit)

@router.get("/search", response_model=List[NoteRead])
async def search_notes(
    query: str = Query(..., description="Search query"),
    note_service: NoteService = Depends(get_note_service)
):
    """Search notes by content"""
    return await note_service.search_notes(query)

@router.get("/{note_id}", response_model=NoteRead)
async def read_note(
    note_id: str,
    note_service: NoteService = Depends(get_note_service)
):
    """Get a note by ID"""
    note = await note_service.get_note(note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@router.put("/{note_id}", response_model=NoteRead)
async def update_note(
    note_id: str,
    note_data: NoteUpdate,
    note_service: NoteService = Depends(get_note_service)
):
    """Update a note by ID"""
    updated_note = await note_service.update_note(note_id, note_data)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note

@router.delete("/{note_id}", status_code=204)
async def delete_note(
    note_id: str,
    note_service: NoteService = Depends(get_note_service)
):
    """Delete a note by ID"""
    deleted = await note_service.delete_note(note_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Note not found")
    return None
