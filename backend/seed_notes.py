import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

# Load environment variables from .env
load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE", "pastel_notes")
MONGODB_COLLECTION = "notes"

sample_notes = [
    {
        "title": "Introduction to Graph Databases",
        "content": "Graph databases like Neo4j store data in nodes and relationships, making it perfect for connected data...",
        "tags": ["neo4j", "databases", "graph theory"],
        "createdAt": datetime(2023, 5, 1, 10, 30),
        "updatedAt": datetime(2023, 5, 1, 11, 45),
    },
    {
        "title": "AI and Natural Language Processing",
        "content": "Modern AI models like Gemini can understand and generate human language with remarkable accuracy...",
        "tags": ["ai", "nlp", "gemini"],
        "createdAt": datetime(2023, 5, 3, 14, 20),
        "updatedAt": datetime(2023, 5, 3, 16, 15),
    },
    {
        "title": "Knowledge Graphs for Learning",
        "content": "Connecting concepts in a knowledge graph helps with retention and understanding complex topics...",
        "tags": ["learning", "knowledge graph", "study techniques"],
        "createdAt": datetime(2023, 5, 5, 9, 10),
        "updatedAt": datetime(2023, 5, 5, 10, 30),
    },
]

def main():
    client = MongoClient(MONGODB_URL)
    db = client[MONGODB_DATABASE]
    collection = db[MONGODB_COLLECTION]

    # Optional: clear existing notes
    collection.delete_many({})

    # Insert sample notes
    result = collection.insert_many(sample_notes)
    print(f"Inserted {len(result.inserted_ids)} notes into '{MONGODB_COLLECTION}' collection.")

if __name__ == "__main__":
    main()
