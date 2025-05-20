from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router as api_router
from .db.database import connect_to_mongo, close_mongo_connection
from .core.config import settings
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("logs/app.log")
    ]
)

logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="Backend API for Pastel Notes application",
    version="0.1.0"
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Events for database connection
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    logger.info("Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()
    logger.info("Disconnected from MongoDB")

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Pastel Notes API!",
        "documentation": "/docs"
    }

# Include API routes
app.include_router(api_router, prefix="/api")
