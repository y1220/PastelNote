import { NextResponse } from "next/server";
import neo4j from "neo4j-driver";
import logger from "@/lib/logger";

// Create a Neo4j driver instance
const driver = neo4j.driver(
  process.env.NEO4J_URI || "neo4j://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "password"
  )
);

logger.info(`Neo4j connection established to ${process.env.NEO4J_URI || "neo4j://localhost:7687"}`);

// Helper function to format results from Neo4j to the expected graph format
function formatGraphResults(records: any[]) {
  const nodes: any[] = [];
  const relationships: any[] = [];
  const nodeMap = new Map();

  const addNode = (item: any) => {
    if (item && item.identity && item.labels && !nodeMap.has(item.identity.toString())) {
      nodeMap.set(item.identity.toString(), true);
      nodes.push({
        id: item.identity.toString(),
        label: item.properties.name || item.properties.title ||
              (item.labels.length > 0 ? item.labels[0] : "Node"),
        type: item.labels.length > 0 ? item.labels[0].toLowerCase() : "node",
        ...item.properties
      });
    }
  };
  const tempRelationships: any[] = [];
  const addRelationship = (item: any) => {
    if (item && item.type && item.start && item.end) {
      tempRelationships.push({
        id: item.identity.toString(),
        source: item.start.toString(),
        target: item.end.toString(),
        type: item.type,
        ...item.properties
      });
    } else {
      logger.warn(`Invalid relationship structure: ${JSON.stringify(item, null, 2)}`);
    }
  };

  records.forEach((record) => {
    record.keys.forEach((key: any) => {
      const item = record.get(key);
      if (key === 'note' || key === 'connected' || key === 'secondDegree' || key === 'n' || key === 'm') {
        addNode(item);
      }
    });

    // Relationship extraction:
    if (record.has('r') || record.has('r1')) {
      const rel = record.get('r') || record.get('r1');
      const sourceId = record.get('sourceId');
      const targetId = record.get('targetId');
      if (rel && sourceId && targetId) {
        relationships.push({
          id: rel.identity.toString(),
          source: sourceId,
          target: targetId,
          type: rel.type,
          ...rel.properties
        });
      }
    }
  });

  // Only include relationships where both source and target are present in nodes
  const nodeIds = new Set(nodes.map(n => n.id));
  tempRelationships.forEach(rel => {
    if (nodeIds.has(rel.source) && nodeIds.has(rel.target)) {
      relationships.push(rel);
    }
  });

  logger.info("Extracted relationships: " + JSON.stringify(tempRelationships, null, 2));

  return { nodes, relationships };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get('noteId');

    logger.info(`Neo4j GET request received${noteId ? ` for noteId: ${noteId}` : ''}`);
    const session = driver.session();
    try {
      // Query to get nodes and relationships, filtered by noteId if provided
      const result = await session.run(
        noteId
          ? `
            MATCH (n:GraphNode {noteId: $noteId})
            OPTIONAL MATCH (n)-[r]->(m:GraphNode)
            RETURN n, r, m
          `
          : `
            MATCH (n:GraphNode)-[r]->(m:GraphNode)
            RETURN n, r, m
          `,
        noteId ? { noteId } : {}
      );

      logger.info("Raw Neo4j records: " + JSON.stringify(result.records, null, 2));

      const graphData = formatGraphResults(result.records);
      logger.info(`Neo4j query returned ${graphData.nodes.length} nodes and ${graphData.relationships.length} relationships`);

      // Debug logging
      const debugInfo = {
        params: { noteId },
        nodeTypes: graphData.nodes.map((n: any) => n.type),
        nodeSample: graphData.nodes[0],
        relationshipSample: graphData.relationships[0]
      };
      logger.info(`Graph debug info: ${JSON.stringify(debugInfo, null, 2)}`);

      if (graphData.nodes.length === 0) {
        logger.warn(`No nodes found${noteId ? ` for noteId: ${noteId}` : ''}`);
      }

      return NextResponse.json(graphData);
    } finally {
      await session.close();
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`Neo4j connection failed: ${errorMessage}`);

    // Fall back to mock data if connection fails
    const mockGraphData = {
      nodes: [
        { id: "1", label: "Neo4j", type: "concept" },
        { id: "2", label: "Graph Databases", type: "concept" },
        { id: "3", label: "Introduction to Graph Databases", type: "note" },
        { id: "4", label: "AI", type: "concept" },
        { id: "5", label: "NLP", type: "concept" },
        { id: "6", label: "AI and Natural Language Processing", type: "note" },
        { id: "7", label: "Knowledge Graphs", type: "concept" },
        { id: "8", label: "Learning", type: "concept" },
        { id: "9", label: "Knowledge Graphs for Learning", type: "note" },
      ],
      relationships: [
        { source: "3", target: "1", type: "MENTIONS" },
        { source: "3", target: "2", type: "MENTIONS" },
        { source: "1", target: "2", type: "IS_A" },
        { source: "6", target: "4", type: "MENTIONS" },
        { source: "6", target: "5", type: "MENTIONS" },
        { source: "5", target: "4", type: "RELATED_TO" },
        { source: "9", target: "7", type: "MENTIONS" },
        { source: "9", target: "8", type: "MENTIONS" },
        { source: "7", target: "8", type: "SUPPORTS" },
        { source: "7", target: "4", type: "RELATED_TO" },
      ],
    };

    return NextResponse.json(mockGraphData);
  }
}

export async function POST(req: Request) {
  try {
    logger.info('Neo4j POST request received');
    const { note } = await req.json();

    if (!note || !note.title || !note.content) {
      logger.warn('Invalid note data received');
      return NextResponse.json(
        { error: "Note must include title and content" },
        { status: 400 }
      );
    }

    const session = driver.session();
    try {
      // Create a note node
      const noteResult = await session.run(`
        CREATE (n:Note {id: $id, title: $title, content: $content, createdAt: $createdAt})
        RETURN n
      `, {
        id: Date.now().toString(),
        title: note.title,
        content: note.content,
        createdAt: new Date().toISOString()
      });

      const noteId = noteResult.records[0].get('n').properties.id;

      // Extract potential concepts from the note (simple implementation)
      // In a real app, you might use NLP or the Gemini API for this
      const concepts = note.concepts || [];

      // Create concept nodes and relationships
      if (concepts.length > 0) {
        for (const concept of concepts) {
          await session.run(`
            MERGE (c:Concept {name: $name})
            WITH c
            MATCH (n:Note {id: $noteId})
            CREATE (n)-[r:MENTIONS]->(c)
            RETURN c, r, n
          `, {
            name: concept,
            noteId: noteId
          });
        }
      }

      logger.info(`Note added to knowledge graph with ID: ${noteId}`);
      return NextResponse.json({
        success: true,
        message: "Note added to knowledge graph",
        noteId: noteId
      });
    } finally {
      await session.close();
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`Neo4j API error: ${errorMessage}`);
    return NextResponse.json(
      { error: "Failed to process with Neo4j" },
      { status: 500 }
    );
  }
}
