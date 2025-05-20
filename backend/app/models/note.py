from datetime import datetime
from typing import Optional

class Note:
    def __init__(self, id: int, title: str, content: str,
                 created_at: Optional[datetime] = None,
                 updated_at: Optional[datetime] = None):
        self.id = id
        self.title = title
        self.content = content
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
