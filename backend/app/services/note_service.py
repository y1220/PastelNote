from typing import List, Optional
from ..models.note import Note
from ..schemas.note import NoteCreate, NoteUpdate

class NoteService:
    def __init__(self):
        # Initialize with a simple in-memory store for now
        self.notes = []
        self.next_id = 1

    async def create_note(self, note: NoteCreate) -> Note:
        note_dict = note.model_dump()
        new_note = Note(id=self.next_id, **note_dict)
        self.next_id += 1
        self.notes.append(new_note)
        return new_note

    async def get_note(self, note_id: int) -> Optional[Note]:
        for note in self.notes:
            if note.id == note_id:
                return note
        return None

    async def get_notes(self) -> List[Note]:
        return self.notes

    async def update_note(self, note_id: int, note_update: NoteUpdate) -> Optional[Note]:
        for i, note in enumerate(self.notes):
            if note.id == note_id:
                updated_dict = note_update.model_dump()
                updated_note = Note(id=note_id, **updated_dict)
                self.notes[i] = updated_note
                return updated_note
        return None

    async def delete_note(self, note_id: int) -> bool:
        for i, note in enumerate(self.notes):
            if note.id == note_id:
                self.notes.pop(i)
                return True
        return False
