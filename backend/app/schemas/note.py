from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = []

class NoteCreate(NoteBase):
    pass

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

class Note(NoteBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class NoteList(BaseModel):
    notes: List[Note]

class NoteList(BaseModel):
    notes: List[Note]
