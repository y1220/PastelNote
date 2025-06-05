"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Network, Filter, Download, ZoomIn, ZoomOut, Maximize } from "lucide-react"
import { CatMascot } from "@/components/cat-mascot"
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// Import force graph using dynamic import with no SSR
const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d'),
  { ssr: false } // This ensures the component only renders on client side
)

export default function GraphPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [graphStats, setGraphStats] = useState({
    noteCount: 0,
    conceptCount: 0,
    relationshipCount: 0,
    mostConnected: { name: "", connections: 0 }
  })
  // Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  const [selectedNode, setSelectedNode] = useState<any | null>(null)
  const graphRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 })

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
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [])

  useEffect(() => {
    // Set mounted to true once component is mounted
    setMounted(true)

    // Fetch real data from Neo4j
    const fetchGraphData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/neo4j')
        const data = await response.json()

        // Transform data for the force graph
        const graphData = {
          nodes: data.nodes.map((node: { id: any; label: any; type: string }) => ({
            id: node.id,
            name: node.label,
            type: node.type,
            val: 1, // Size factor
            color: node.type === 'note' ? '#FF9580' : '#7B61FF' // Different colors for notes vs concepts
          })),
          links: data.relationships.map((rel: { source: any; target: any; type: any }) => ({
            source: rel.source,
            target: rel.target,
            type: rel.type
          }))
        }

        setGraphData(graphData)

        // Calculate statistics
        const noteCount = data.nodes.filter((node: { type: string }) => node.type === 'note').length
        const conceptCount = data.nodes.filter((node: { type: string }) => node.type === 'concept').length

        // Find most connected node
        const connectionCounts: { [key: string]: number } = {}
        data.relationships.forEach((rel: { source: string; target: string }) => {
          connectionCounts[rel.source] = (connectionCounts[rel.source] || 0) + 1
          connectionCounts[rel.target] = (connectionCounts[rel.target] || 0) + 1
        })

        let mostConnected = { name: "None", connections: 0 }
        Object.entries(connectionCounts).forEach(([nodeId, count]: [string, number]) => {
          if (count > mostConnected.connections) {
            const node = data.nodes.find((n: { id: string; label: string }) => n.id === nodeId)
            if (node) {
              mostConnected = { name: node.label, connections: count }
            }
          }
        })

        setGraphStats({
          noteCount,
          conceptCount,
          relationshipCount: data.relationships.length,
          mostConnected
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching Neo4j data:", error)
        setIsLoading(false)
      }
    }

    fetchGraphData()
  }, [])

  // If not mounted yet, render a minimal version to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-pastel-bg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-pastel-primary">Knowledge Graph</h1>
          <div className="h-[600px] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pastel-primary border-t-transparent mb-4"></div>
              <p className="text-pastel-secondary">Loading your knowledge graph...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original render after component is mounted
  return (
    <div className="min-h-screen bg-pastel-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-pastel-primary">Knowledge Graph</h1>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="neo4j">Neo4j</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="bg-white h-[800px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-pastel-primary">Visualization</CardTitle>
                <CardDescription>Explore connections between your notes and concepts</CardDescription>
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
                  <Button variant="outline" size="icon" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div ref={containerRef} className="bg-pastel-light rounded-lg min-h-[600px] min-w-[700px] h-[700px] w-full" style={{height: 700, minHeight: 600, minWidth: 700}}>
                  {/* Relationship Legend */}
                  {graphData.links && graphData.links.length > 0 && (
                    <div className="graph-legend flex flex-wrap gap-2 p-2 text-xs text-pastel-secondary items-center">
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
                        <p className="text-pastel-secondary">Loading your knowledge graph...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ForceGraph2D
                        ref={graphRef}
                        graphData={graphData}
                        nodeLabel={(node: any) => `${node.name} (${node.type})`}
                        linkLabel={(link: any) => link.type}
                        nodeAutoColorBy="type"
                        linkDirectionalArrowLength={3}
                        linkDirectionalArrowRelPos={1}
                        linkCurvature={0.25}
                        height={dimensions.height}
                        width={dimensions.width}
                        onNodeClick={(node) => setSelectedNode(node)}
                        nodeCanvasObject={(node, ctx, globalScale) => {
                          if (typeof node.x !== 'number' || typeof node.y !== 'number') return;
                          // Color by type
                          let color = '#7B61FF'; // default purple
                          if (node.type === 'note' || node.type === 'Note') color = '#FF9580';
                          else if (node.type === 'concept' || node.type === 'Concept') color = '#7B61FF';
                          else if (node.type === 'event' || node.type === 'Event') color = '#FFD36E';
                          else if (node.type === 'plan' || node.type === 'Plan') color = '#6EE7B7';
                          else if (node.type === 'distance' || node.type === 'Distance') color = '#60A5FA';
                          else if (node.type === 'database' || node.type === 'Database') color = '#F472B6';
                          else if (node.type === 'databasetype' || node.type === 'DatabaseType') color = '#FBBF24';
                          else if (node.type === 'datastructure' || node.type === 'DataStructure') color = '#34D399';
                          else if (node.type === 'datatype' || node.type === 'DataType') color = '#818CF8';
                          else if (node.type === 'graphnode' || node.type === 'GraphNode') color = '#A3E635';
                          // Draw node as a circle
                          ctx.beginPath();
                          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
                          ctx.fillStyle = color;
                          ctx.fill();
                          ctx.strokeStyle = '#fff';
                          ctx.lineWidth = 1.5;
                          ctx.stroke();
                          // Draw node name with smaller text
                          const label = node.name || node.label || '';
                          ctx.font = `${Math.max(8, 10/globalScale)}px Sans-Serif`;
                          ctx.textAlign = 'center';
                          ctx.textBaseline = 'top';
                          ctx.fillStyle = '#333';
                          ctx.fillText(label, node.x, node.y + 10);
                        }}
                      />
                      <Dialog open={!!selectedNode} onOpenChange={(open) => !open && setSelectedNode(null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Node Details</DialogTitle>
                            <DialogDescription>
                              {selectedNode ? `Details for node "${selectedNode.name || selectedNode.label}"` : ""}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedNode && (
                            <div className="space-y-2 mt-2">
                              <div><b>Name:</b> {selectedNode.name || selectedNode.label}</div>
                              <div><b>Type:</b> {selectedNode.type}</div>
                              <div><b>ID:</b> {selectedNode.id}</div>
                              {/* Add more node details here if needed */}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pastel-primary">Graph Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-pastel-secondary">Nodes</h3>
                        <p className="text-sm">{graphStats.noteCount} notes, {graphStats.conceptCount} concepts</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-pastel-secondary">Relationships</h3>
                        <p className="text-sm">{graphStats.relationshipCount} connections</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-pastel-secondary">Most Connected</h3>
                        <p className="text-sm">"{graphStats.mostConnected.name}" ({graphStats.mostConnected.connections} connections)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="mt-4">
                  <CatMascot message="Your knowledge graph is growing nicely! Keep connecting those ideas!" />
                </div>
              </TabsContent>
              <TabsContent value="insights" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pastel-primary">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-pastel-secondary">Missing Connections</h3>
                        <p className="text-sm">Consider connecting "AI" and "Knowledge Graphs"</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-pastel-secondary">Study Suggestion</h3>
                        <p className="text-sm">Review "Graph Theory" concepts to strengthen understanding</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-pastel-secondary">Knowledge Gaps</h3>
                        <p className="text-sm">Add notes about "Graph Algorithms" to complete your knowledge</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add a dedicated graph view for a single note
// Add a new page: /graph/[noteId]/page.tsx
