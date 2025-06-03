from neo4j import GraphDatabase
from ..core.config import settings

def get_neo4j_driver():
    if not settings.neo4j_uri or not settings.neo4j_user or not settings.neo4j_password:
        raise RuntimeError("Neo4j connection settings are not set in environment variables.")
    driver = GraphDatabase.driver(
        settings.neo4j_uri,
        auth=(settings.neo4j_user, settings.neo4j_password)
    )
    return driver
