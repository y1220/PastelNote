# FastAPI Backend for Pastel Notes

This is the backend for the Pastel Notes application, built using FastAPI. The backend provides a RESTful API for managing notes, including creating, reading, updating, and deleting notes, with future integration for Neo4j knowledge graph functionality.

## Features

- RESTful API for notes CRUD operations
- In-memory storage (expandable to Neo4j integration)
- FastAPI with automatic OpenAPI documentation
- Pydantic models for data validation
- Async API endpoints

## Project Structure

The backend is organized into several packages:

- **app**: Contains the main application code.
  - **api**: Contains the API endpoints and routing.
    - **endpoints**: Defines the CRUD operations for notes.
  - **core**: Contains core configuration and security settings.
  - **models**: Defines the data models used in the application.
  - **schemas**: Contains Pydantic schemas for data validation and serialization.
  - **services**: Contains business logic for managing notes.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/y1220/PastelNote.git
   cd pastel-notes/backend
   ```

2. **Create a virtual environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://127.0.0.1:8000`.

## Development

### Prerequisites

- Python 3.9+
- FastAPI
- Uvicorn server
- Pydantic for data validation

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-cov

# Run tests
pytest
```

## API Usage

Once the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Endpoints

The following endpoints are available for managing notes:

| Method | Endpoint       | Description         | Request Body | Response           |
|--------|----------------|---------------------|--------------|-------------------|
| GET    | /notes/        | Get all notes       | -            | Array of notes    |
| GET    | /notes/{id}    | Get a specific note | -            | Note object       |
| POST   | /notes/        | Create a new note   | Note object  | Created note      |
| PUT    | /notes/{id}    | Update a note       | Note object  | Updated note      |
| DELETE | /notes/{id}    | Delete a note       | -            | 204 No Content    |

### Data Models

#### Note

```json
{
  "id": 1,
  "title": "Example Note",
  "content": "This is an example note content",
  "created_at": "2025-05-20T10:00:00.000Z",
  "updated_at": "2025-05-20T10:00:00.000Z"
}
```

## Docker

To build and run the application using Docker, use the following commands:

1. **Build the Docker image**:
   ```bash
   docker build -t pastel-notes-backend .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -d -p 8000:8000 pastel-notes-backend
   ```

The API will be accessible at `http://localhost:8000`.

## Future Enhancements

- Database integration with SQLAlchemy
- Neo4j knowledge graph analysis and visualization
- Authentication and authorization
- User management
- Note categorization and tagging
- Full-text search capabilities
- Integration with AI for automated knowledge extraction

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
