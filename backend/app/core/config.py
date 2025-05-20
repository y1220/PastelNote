from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Pastel Notes"
    admin_email: str = "admin@example.com"
    secret_key: str = "your_secret_key"
    database_url: str = "sqlite:///./test.db"  # Example for SQLite, change as needed

    class Config:
        env_file = ".env"

settings = Settings()