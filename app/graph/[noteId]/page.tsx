"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import dynamic from "next/dynamic"
import Link from "next/link"
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
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        });
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
          conceptCount: conceptCount,
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

  const handleDownload = () => {
    let canvas: HTMLCanvasElement | null = null;
    if (graphRef.current && graphRef.current.canvas) {
      canvas = graphRef.current.canvas();
    } else {
      if (containerRef.current) {
        canvas = containerRef.current.querySelector('canvas');
      } else {
        canvas = document.querySelector('canvas');
      }
    }
    if (canvas && canvas.toDataURL) {
      const legendDiv = containerRef.current?.querySelector('.graph-legend') as HTMLDivElement;
      if (legendDiv) {
        import('html2canvas').then(({ default: html2canvas }) => {
          html2canvas(legendDiv, { backgroundColor: '#F8FAFC', scale: window.devicePixelRatio || 1 }).then((legendCanvas: HTMLCanvasElement) => {
            // Set width to the max of both, but align both to the same width
            const finalWidth = Math.max(canvas!.width, legendCanvas.width);
            // If legend is narrower, pad it
            let legendPadded = legendCanvas;
            if (legendCanvas.width < finalWidth) {
              legendPadded = document.createElement('canvas');
              legendPadded.width = finalWidth;
              legendPadded.height = legendCanvas.height;
              const lctx = legendPadded.getContext('2d');
              if (lctx) {
                lctx.fillStyle = '#F8FAFC';
                lctx.fillRect(0, 0, finalWidth, legendCanvas.height);
                lctx.drawImage(legendCanvas, 0, 0);
              }
            }
            // If graph is narrower, pad it
            let graphPadded = canvas!;
            if (canvas!.width < finalWidth) {
              graphPadded = document.createElement('canvas');
              graphPadded.width = finalWidth;
              graphPadded.height = canvas!.height;
              const gctx = graphPadded.getContext('2d');
              if (gctx) {
                gctx.fillStyle = '#F8FAFC';
                gctx.fillRect(0, 0, finalWidth, canvas!.height);
                gctx.drawImage(canvas!, 0, 0);
              }
            }
            // Combine
            const combinedCanvas = document.createElement('canvas');
            combinedCanvas.width = finalWidth;
            combinedCanvas.height = legendPadded.height + graphPadded.height;
            const ctx = combinedCanvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#F8FAFC';
              ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
              ctx.drawImage(legendPadded, 0, 0);
              ctx.drawImage(graphPadded, 0, legendPadded.height);
              const link = document.createElement('a');
              link.href = combinedCanvas.toDataURL('image/png');
              link.download = 'graph_with_legend.png';
              link.click();
            }
          });
        });
      } else {
        // fallback: just download the graph
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'graph.png';
        link.click();
      }
    }
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
            <Card className="bg-white h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-pastel-primary">Note Connections</CardTitle>
                <CardDescription>Explore relationships with other notes and concepts</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
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
                  <Button variant="outline" size="icon" onClick={handleDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  </Button>
                </div>
                <div
                  className="bg-pastel-light rounded-lg flex-1 w-full relative overflow-hidden"
                  ref={containerRef}
                  style={{ maxWidth: '100%' }}
                >
                  {/* Relationship Legend */}
                  {graphData.links.length > 0 && (
                    <div className="graph-legend flex flex-wrap gap-2 p-2 text-xs text-pastel-secondary items-center z-10 relative">
                      <span className="font-semibold">Legend:</span>
                      {Array.from(new Set(graphData.links.map((l: any) => l.type))).map((type: string) => {
                        // Find a sample link of this type
                        const sample = graphData.links.find((l: any) => l.type === type) as any;
                        // Try to find the source and target node names
                        const sourceNode = graphData.nodes.find((n: any) => n.id === (sample && sample.source));
                        const targetNode = graphData.nodes.find((n: any) => n.id === (sample && sample.target));
                        return (
                          <span key={type} className="px-2 py-1 rounded bg-pastel-primary/10 border border-pastel-primary/20 flex items-center gap-1">
                            <span className="font-semibold">{type}</span>
                            {sourceNode && targetNode && (
                              <span className="text-pastel-secondary/80">(
                                <span className="font-normal">{(sourceNode as any).name || (sourceNode as any).label}</span>
                                <span className="mx-1">→</span>
                                <span className="font-normal">{(targetNode as any).name || (targetNode as any).label}</span>
                              )</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  )}
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
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <ForceGraph2D
                        ref={graphRef}
                        graphData={graphData}
                        nodeLabel="name"
                        nodeColor={(node: any) => node.color || "#666"}
                        nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
                          const isCurrentNote = node.noteId === noteId;
                          const size = isCurrentNote ? 8 : 5;
                          const fontSize = 10 / globalScale;

                          // Draw node circle
                          ctx.beginPath();
                          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                          ctx.fillStyle = node.color || "#666";
                          ctx.fill();

                          if (isCurrentNote) {
                            ctx.strokeStyle = "#000";
                            ctx.lineWidth = 1.5;
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
                    </div>
                  )}
                </div>
                <div className="mt-8 flex justify-end">
                  <Link href={{ pathname: "/graph/miro-board", query: { noteId } }}>
                    <Button variant="outline">Open Miro Board</Button>
                  </Link>
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
