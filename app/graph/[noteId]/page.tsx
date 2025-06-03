"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CatMascot } from "@/components/cat-mascot"

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false })

export default function NoteGraphPage() {
  const { noteId } = useParams() as { noteId: string }
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [error, setError] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<any | null>(null)
  const [stats, setStats] = useState({
    noteCount: 0,
    conceptCount: 0,
    relationshipCount: 0
  })
  const graphRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!noteId) return
    setIsLoading(true)
    setError(null)
    console.log("Fetching graph data for noteId:", noteId);
    fetch(`/api/neo4j?noteId=${noteId}`)
      .then(async res => {
        const data = await res.json();
        console.log("Raw Neo4j response:", data);
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch graph data");
        }
        return data;
      })
      .then(data => {
        if (!data.nodes || !Array.isArray(data.nodes)) {
          console.error("Invalid nodes data:", data.nodes);
          throw new Error("Invalid graph data structure");
        }

        // Process nodes
        const nodes = data.nodes.map((node: any) => {
          if (!node.id) {
            console.warn("Node missing ID:", node);
          }
          return {
            id: node.id,
            color: getNodeColor(node.type),
            name: node.label || node.name || node.id,
            type: node.type || "unknown",
            noteId: node.noteId,
            val: 1
          };
        });

        // Process relationships
        const links = (data.relationships || []).map((rel: any) => {
          if (!rel.source || !rel.target) {
            console.warn("Relationship missing source or target:", rel);
            return null;
          }
          return {
            id: rel.id || `${rel.source}-${rel.target}`,
            // Handle both string IDs and Neo4j integers
            source: typeof rel.source === 'object' ? rel.source.toString() : rel.source,
            target: typeof rel.target === 'object' ? rel.target.toString() : rel.target,
            type: rel.type || "related"
          };
        }).filter(Boolean);

        console.log("Processed graph data:", {
          nodeCount: nodes.length,
          linkCount: links.length,
          sampleNode: nodes[0],
          sampleLink: links[0]
        });

        setGraphData({ nodes, links })

        // Calculate statistics
        const noteCount = nodes.filter((node: any) =>
          node.type.toLowerCase() === 'note'
        ).length
        const conceptCount = nodes.filter((node: any) =>
          node.type.toLowerCase() === 'concept'
        ).length

        setStats({
          noteCount,
          conceptCount,
          relationshipCount: links.length
        })
        setIsLoading(false)
      })
      .catch(e => {
        console.error("Error fetching graph data:", e)
        setError(e.message || "Failed to load graph data")
        setIsLoading(false)
      })
  }, [noteId])

  const handleZoomIn = () => {
    if (graphRef.current) {
      const newZoom = Math.min(zoom + 0.2, 5)
      graphRef.current.zoom(newZoom, 400)
      setZoom(newZoom)
    }
  }
  const handleZoomOut = () => {
    if (graphRef.current) {
      const newZoom = Math.max(zoom - 0.2, 0.2)
      graphRef.current.zoom(newZoom, 400)
      setZoom(newZoom)
    }
  }
  const handleMaximize = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400)
    }
  }
  const handleBackClick = () => {
    router.back()
  }

  function getNodeColor(type: string) {
    switch ((type || "").toLowerCase()) {
      case "note": return "#FF9580"
      case "concept": return "#7B61FF"
      case "event": return "#FFD36E"
      case "plan": return "#6EE7B7"
      case "distance": return "#60A5FA"
      case "database": return "#F472B6"
      case "databasetype": return "#FBBF24"
      case "datastructure": return "#34D399"
      case "datatype": return "#818CF8"
      case "graphnode": return "#A3E635"
      default: return "#7B61FF"
    }
  }

  return (
    <div className="min-h-screen bg-pastel-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handleBackClick}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-pastel-primary">Note Graph</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="bg-white h-[800px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-pastel-primary">Note Connections</CardTitle>
                <CardDescription>Explore relationships with other notes and concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end gap-2 mb-4">
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleMaximize}>
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-pastel-light rounded-lg h-[700px]" ref={containerRef}>
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pastel-primary border-t-transparent mb-4"></div>
                        <p className="text-pastel-secondary">Loading your note graph...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2 text-xs mt-2 whitespace-pre-wrap">
                      {error}
                    </div>
                  ) : graphData.nodes.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-pastel-secondary">No nodes found for this note.</p>
                        <p className="text-sm text-pastel-secondary mt-2">Try graphifying the note again.</p>
                      </div>
                    </div>
                  ) : (
                    <ForceGraph2D
                      ref={graphRef}
                      graphData={graphData}
                      nodeLabel="name"
                      nodeColor={(node: any) => node.color || "#666"}
                      nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
                        const isCurrentNote = node.noteId === noteId;
                        const size = isCurrentNote ? 12 : 8;
                        const fontSize = 12 / globalScale;

                        // Draw node circle
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                        ctx.fillStyle = node.color || "#666";
                        ctx.fill();

                        if (isCurrentNote) {
                          ctx.strokeStyle = "#000";
                          ctx.lineWidth = 2;
                          ctx.stroke();
                        }

                        // Draw node label
                        const label = node.name || node.id;
                        if (label) {
                          ctx.font = `${fontSize}px Sans-Serif`;
                          ctx.fillStyle = "black";
                          ctx.textAlign = "center";
                          ctx.fillText(label, node.x, node.y + size + fontSize);
                        }
                      }}
                      linkDirectionalParticles={2}
                      linkDirectionalParticleSpeed={0.005}
                      linkColor={() => "#999"}
                      onNodeClick={(node: any) => setSelectedNode(node)}
                      width={dimensions.width}
                      height={dimensions.height}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-pastel-primary">Graph Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-pastel-secondary">Connected Notes</h3>
                    <p className="text-sm">{stats.noteCount} notes</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-pastel-secondary">Related Concepts</h3>
                    <p className="text-sm">{stats.conceptCount} concepts</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-pastel-secondary">Total Connections</h3>
                    <p className="text-sm">{stats.relationshipCount} relationships</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4">
              <CatMascot message="Here's a focused view of your note's connections!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
