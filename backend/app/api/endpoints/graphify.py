from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import Any, Dict
import httpx
import os
from ...db.neo4j import get_neo4j_driver
from ...models.note import Note
from ...services.note_service import NoteService

router = APIRouter()

class GraphifyRequest(BaseModel):
    note_id: str

@router.post("/graphify-note")
async def graphify_note(request: GraphifyRequest):
    note_service = NoteService()
    note = await note_service.get_note(request.note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise HTTPException(status_code=500, detail="Gemini API key not set")
    prompt = f"""
    Design a knowledge graph for the following note. Return a JSON object with two arrays: 'nodes' (each with id, label, type) and 'relationships' (each with source, target, type). The format must be compatible with Neo4j import.
    Note content:
    {note.content}
    """
    async with httpx.AsyncClient() as client:
        gemini_resp = await client.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + gemini_api_key,
            json={"contents": [{"parts": [{"text": prompt}]}]}
        )
        gemini_data = gemini_resp.json()
        import logging
        logging.info(f"Gemini API response: {gemini_data}")
        if gemini_resp.status_code != 200 or "candidates" not in gemini_data:
            detail = gemini_data.get("error", {}).get("message") or str(gemini_data)
            raise HTTPException(status_code=500, detail=f"Failed to get response from Gemini: {detail}")
        import re, json as pyjson
        text = gemini_data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        if text.strip().startswith("```"):
            text = text.strip().split('\n', 1)[1]
            if text.endswith("```"):
                text = text.rsplit('```', 1)[0]
        match = re.search(r'\{[\s\S]*\}', text)
        if not match:
            raise HTTPException(status_code=500, detail=f"Gemini did not return valid JSON. Raw response: {text}")
        graph_json = pyjson.loads(match.group(0))

        import uuid
        filtered_nodes = []
        node_id_map = {}
        for node in graph_json["nodes"]:
            if node.get("label", "").strip().lower() != "node":
                unique_id = f"{request.note_id}_{uuid.uuid4().hex[:8]}"
                node_id_map[node["id"]] = unique_id
                node["id"] = unique_id
                node["noteId"] = request.note_id
                filtered_nodes.append(node)

        graph_json["nodes"] = filtered_nodes

        filtered_relationships = []
        for rel in graph_json["relationships"]:
            if rel["source"] in node_id_map and rel["target"] in node_id_map:
                rel["source"] = node_id_map[rel["source"]]
                rel["target"] = node_id_map[rel["target"]]
                filtered_relationships.append(rel)

        graph_json["relationships"] = filtered_relationships

    driver = get_neo4j_driver()
    with driver.session() as session:
        for node in graph_json["nodes"]:
            session.run(
                "MERGE (n:GraphNode {id: $id}) SET n.label=$label, n.type=$type, n.noteId=$noteId",
                id=node["id"], label=node["label"], type=node["type"], noteId=node["noteId"]
            )
        for rel in graph_json["relationships"]:
            session.run(
                "MATCH (a:GraphNode {id: $source}) MATCH (b:GraphNode {id: $target}) MERGE (a)-[r:RELATED {type: $type}]->(b)",
                source=rel["source"], target=rel["target"], type=rel["type"]
            )
    return {"status": "success", "graph": graph_json}
