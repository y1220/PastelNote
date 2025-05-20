import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

try:
    # Try to import from pydantic_settings (Pydantic v2)
    from pydantic_settings import BaseSettings
except ImportError:
    try:
        # Fallback to pydantic v1 approach
        from pydantic import BaseSettings
    except ImportError:
        raise ImportError("Neither pydantic_settings nor pydantic's BaseSettings could be imported. Please install pydantic v1 or pydantic-settings.")

class Settings(BaseSettings):
    app_name: str = "Pastel Notes"
    admin_email: str = "admin@example.com"
    secret_key: str = "your_secret_key_change_this_in_production"

    # MongoDB settings
    mongodb_url: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    mongodb_database: str = os.getenv("MONGODB_DATABASE", "pastel_notes")
    mongodb_notes_collection: str = "notes"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Log MongoDB connection details to help with debugging
        import logging
        logger = logging.getLogger("app.core.config")
        logger.info(f"MongoDB URL: {self.mongodb_url}")
        logger.info(f"MongoDB Database: {self.mongodb_database}")

    # Neo4j settings (for future use)
    neo4j_uri: Optional[str] = os.getenv("NEO4J_URI")
    neo4j_user: Optional[str] = os.getenv("NEO4J_USER")
    neo4j_password: Optional[str] = os.getenv("NEO4J_PASSWORD")

    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "extra": "allow"  # Allow extra fields from environment variables
    }

settings = Settings()
