# Pastel Notes

Pastel Notes is a modern note-taking application with knowledge graph visualization capabilities, built with Next.js for the frontend and FastAPI for the backend.

## Project Overview

Pastel Notes helps you:
- Create and manage notes with an intuitive interface
- Visualize connections between notes as a knowledge graph
- Use AI assistance (via Google Gemini) for summarizing and analyzing notes
- Store data persistently in MongoDB Atlas

## Tech Stack

### Frontend
- **Next.js** - React framework for server-rendered applications
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library built on Radix UI
- **Framer Motion** - Animation library for React
- **Force Graph** - For knowledge graph visualization

### Backend
- **FastAPI** - Modern Python web framework for building APIs
- **Pydantic** - Data validation and settings management
- **MongoDB Atlas** - Cloud database for storing notes
- **Neo4j** - Graph database for knowledge connections (future integration)
- **Python 3.9+** - Programming language

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python 3.9+
- MongoDB Atlas account (or local MongoDB installation)
- Neo4j account (optional, for future graph features)

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```zsh
   cd pastel-notes/backend
   ```

2. Create and activate a virtual environment:
   ```zsh
   python -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```zsh
   pip install -r requirements.txt
   ```

4. Configure environment variables in the `.env` file:
   ```
   # MongoDB Atlas connection
   MONGODB_URL="your_mongodb_connection_string"
   MONGODB_DATABASE="pastel_notes"

   # App settings
   APP_NAME="Pastel Notes API"
   SECRET_KEY="your-secret-key-change-in-production"

   # Neo4j connection (for future use)
   NEO4J_URI="your_neo4j_connection_uri"
   NEO4J_USER="your_neo4j_username"
   NEO4J_PASSWORD="your_neo4j_password"
   ```

5. Run the backend server:
   ```zsh
   uvicorn app.main:app --reload --port 8000
   ```

#### Frontend Setup

1. Navigate to the project root directory:
   ```zsh
   cd pastel-notes
   ```

2. Install dependencies:
   ```zsh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   GOOGLE_AI_API_KEY=your_gemini_api_key
   ```

4. Run the development server:
   ```zsh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Usage with Postman

You can use Postman to interact with the FastAPI backend and populate the database with notes.

### Setting Up Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a new collection for Pastel Notes

### Creating a New Note

1. Create a new POST request in Postman
2. Set the URL to `http://localhost:8000/notes/`
3. Go to the Headers tab and add:
   - Key: `Content-Type`
   - Value: `application/json`
4. Go to the Body tab, select "raw" and "JSON", then enter:
   ```json
   {
     "title": "Introduction to Knowledge Graphs",
     "content": "Knowledge graphs represent information as a network of entities and their relationships. They enable powerful data connections and insights that traditional storage methods cannot provide.",
     "tags": ["knowledge-graph", "database", "connections"]
   }
   ```
5. Click "Send" to create the note

### Getting All Notes

1. Create a new GET request in Postman
2. Set the URL to `http://localhost:8000/notes/`
3. Click "Send" to retrieve all notes

### Getting a Note by ID

1. Create a new GET request in Postman
2. Set the URL to `http://localhost:8000/notes/{note_id}` (replace `{note_id}` with the actual ID)
3. Click "Send" to retrieve the note

### Updating a Note

1. Create a new PUT request in Postman
2. Set the URL to `http://localhost:8000/notes/{note_id}` (replace `{note_id}` with the actual ID)
3. Go to Headers and add `Content-Type: application/json`
4. In the Body tab, select "raw" and "JSON", then enter:
   ```json
   {
     "title": "Updated Note Title",
     "content": "Updated content for the note",
     "tags": ["updated", "modified"]
   }
   ```
5. Click "Send" to update the note

### Deleting a Note

1. Create a new DELETE request in Postman
2. Set the URL to `http://localhost:8000/notes/{note_id}` (replace `{note_id}` with the actual ID)
3. Click "Send" to delete the note

## API Documentation

FastAPI generates interactive API documentation:
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Features

- **Note Management**: Create, edit, delete, and search notes
- **Knowledge Graph**: Visualize connections between your notes and concepts
- **AI Assistant**: Use Gemini AI to analyze and extract insights from your notes
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

The project is organized into two main directories:

- `backend/`: Contains the FastAPI backend application
  - `app/`: Main application code
    - `api/`: API endpoints and routing
    - `core/`: Configuration and security
    - `db/`: Database connections
    - `models/`: Data models
    - `schemas/`: Pydantic schemas
    - `services/`: Business logic

- Frontend (root directory): Contains the Next.js frontend application
  - `app/`: Next.js pages and routes
  - `components/`: Reusable React components
  - `lib/`: Utility functions and API clients
  - `hooks/`: Custom React hooks
  - `styles/`: Global styles
  - `public/`: Static assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Neo4j](https://neo4j.com/)
- [Google Gemini AI](https://ai.google/gemini/)
- [Shadcn UI](https://ui.shadcn.com/)
