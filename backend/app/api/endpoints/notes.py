from fastapi import APIRouter, HTTPException
from typing import List
from ...schemas.note import NoteCreate, NoteUpdate, Note as NoteRead
from ...services.note_service import NoteService

router = APIRouter()
note_service = NoteService()

@router.post("/", response_model=NoteRead)
async def create_note(note: NoteCreate):
    return await note_service.create_note(note)

@router.get("/", response_model=List[NoteRead])
async def read_notes():
    return await note_service.get_notes()

@router.get("/{note_id}", response_model=NoteRead)
async def read_note(note_id: int):
    note = await note_service.get_note(note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@router.put("/{note_id}", response_model=NoteRead)
async def update_note(note_id: int, note: NoteUpdate):
    updated_note = await note_service.update_note(note_id, note)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note

@router.delete("/{note_id}", status_code=204)
async def delete_note(note_id: int):
    deleted = await note_service.delete_note(note_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Note not found")
    return None
    return note

@router.put("/{note_id}", response_model=NoteRead)
async def update_note(note_id: int, note: NoteUpdate):
    updated_note = await note_service.update_note(note_id, note)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note

@router.delete("/{note_id}", response_model=dict)
async def delete_note(note_id: int):
    success = await note_service.delete_note(note_id)
    if not success:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"detail": "Note deleted successfully"}
