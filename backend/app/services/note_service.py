from typing import List, Optional, Dict, Any
from ..models.note import Note
from ..schemas.note import NoteCreate, NoteUpdate
from ..db.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime
from ..core.config import settings

class NoteService:
    async def __get_collection(self):
        """Get the notes collection from MongoDB"""
        db = await get_database()
        return db[settings.mongodb_notes_collection]

    async def create_note(self, note_data: NoteCreate) -> Note:
        """Create a new note in MongoDB"""
        collection = await self.__get_collection()

        # Create note model
        note_dict = note_data.model_dump()
        note = Note(**note_dict)

        # Insert into MongoDB
        mongo_dict = note.to_mongo()
        mongo_dict["created_at"] = datetime.utcnow()
        mongo_dict["updated_at"] = datetime.utcnow()

        result = await collection.insert_one(mongo_dict)
        note.id = str(result.inserted_id)

        return note

    async def get_note(self, note_id: str) -> Optional[Note]:
        """Get a note by its ID"""
        collection = await self.__get_collection()

        try:
            document = await collection.find_one({"_id": ObjectId(note_id)})
            return Note.from_mongo(document) if document else None
        except Exception as e:
            print(f"Error retrieving note: {e}")
            return None

    async def get_notes(self) -> List[Note]:
        """Get all notes"""
        collection = await self.__get_collection()
        notes = []

        cursor = collection.find({}).sort("created_at", -1)
        async for document in cursor:
            note = Note.from_mongo(document)
            if note:
                notes.append(note)

        return notes

    async def update_note(self, note_id: str, note_update: NoteUpdate) -> Optional[Note]:
        """Update an existing note"""
        collection = await self.__get_collection()

        # Create update data
        update_data = note_update.model_dump(exclude_unset=True, exclude_none=True)
        if not update_data:
            # Nothing to update
            return await self.get_note(note_id)

        # Add updated timestamp
        update_data["updated_at"] = datetime.utcnow()

        try:
            result = await collection.update_one(
                {"_id": ObjectId(note_id)},
                {"$set": update_data}
            )

            if result.modified_count > 0 or result.matched_count > 0:
                return await self.get_note(note_id)
            return None
        except Exception as e:
            print(f"Error updating note: {e}")
            return None

    async def delete_note(self, note_id: str) -> bool:
        """Delete a note by its ID"""
        collection = await self.__get_collection()

        try:
            result = await collection.delete_one({"_id": ObjectId(note_id)})
            return result.deleted_count > 0
        except Exception as e:
            print(f"Error deleting note: {e}")
            return False

    async def search_notes(self, query: str) -> List[Note]:
        """Search notes by text query"""
        collection = await self.__get_collection()
        notes = []

        # Text search (requires text index on title and content fields)
        cursor = collection.find({"$text": {"$search": query}}).sort("score", {"$meta": "textScore"})

        async for document in cursor:
            note = Note.from_mongo(document)
            if note:
                notes.append(note)

        return notes
