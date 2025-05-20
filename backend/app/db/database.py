from motor.motor_asyncio import AsyncIOMotorClient
from ..core.config import settings
import logging
from pymongo.errors import ConnectionFailure

logger = logging.getLogger(__name__)

class MongoDB:
    client: AsyncIOMotorClient = None

db = MongoDB()

async def get_database() -> AsyncIOMotorClient:
    """
    Return database client instance
    """
    return db.client[settings.mongodb_database]

async def connect_to_mongo():
    """
    Connect to MongoDB database
    """
    logger.info("Connecting to MongoDB...")
    try:
        db.client = AsyncIOMotorClient(settings.mongodb_url)
        # Verify the connection
        await db.client.admin.command('ping')
        logger.info("Connected to MongoDB!")
    except ConnectionFailure as e:
        logger.error(f"Could not connect to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """
    Close MongoDB connection
    """
    logger.info("Closing MongoDB connection...")
    if db.client:
        db.client.close()
        logger.info("MongoDB connection closed.")
        db.client = None
