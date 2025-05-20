from datetime import datetime
from typing import Optional, Dict, Any, List
from bson import ObjectId

class Note:
    def __init__(
        self,
        title: str,
        content: str,
        id: Optional[str] = None,
        tags: Optional[List[str]] = None,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None
    ):
        self.id = id or str(ObjectId())
        self.title = title
        self.content = content
        self.tags = tags or []
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()

    @classmethod
    def from_mongo(cls, data: Dict[str, Any]) -> "Note":
        """
        Convert MongoDB document to Note object
        """
        if not data:
            return None

        return cls(
            id=str(data.get("_id")),
            title=data.get("title"),
            content=data.get("content"),
            tags=data.get("tags", []),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at")
        )

    def to_mongo(self) -> Dict[str, Any]:
        """
        Convert Note object to MongoDB document
        """
        return {
            "title": self.title,
            "content": self.content,
            "tags": self.tags,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
