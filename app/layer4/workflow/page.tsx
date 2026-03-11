"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize2,
  GitBranch,
  Circle,
  Square,
  Diamond,
  ArrowRight,
  Settings,
  Trash2,
  Copy,
  Plus,
} from "lucide-react"

const nodeTypes = [
  { name: "Trigger", icon: Circle, color: "bg-chart-4" },
  { name: "Action", icon: Square, color: "bg-primary" },
  { name: "Condition", icon: Diamond, color: "bg-chart-2" },
  { name: "Output", icon: ArrowRight, color: "bg-chart-3" },
]

const workflowNodes = [
  { id: 1, type: "Trigger", name: "Email Received", x: 100, y: 150, color: "bg-chart-4" },
  { id: 2, type: "Condition", name: "Is Important?", x: 300, y: 150, color: "bg-chart-2" },
  { id: 3, type: "Action", name: "Summarize Content", x: 500, y: 100, color: "bg-primary" },
  { id: 4, type: "Action", name: "Archive Email", x: 500, y: 200, color: "bg-primary" },
  { id: 5, type: "Output", name: "Send Notification", x: 700, y: 150, color: "bg-chart-3" },
]

export default function WorkflowBuilderPage() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null)

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Visual Workflow Builder</h1>
            <p className="text-muted-foreground">
              Drag and drop nodes to create automated workflows
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Undo className="mr-1 h-4 w-4" /> Undo
            </Button>
            <Button variant="outline" size="sm">
              <Redo className="mr-1 h-4 w-4" /> Redo
            </Button>
            <Button variant="outline" size="sm">
              <Save className="mr-1 h-4 w-4" /> Save
            </Button>
            <Button size="sm" className="gap-1">
              <Play className="h-4 w-4" /> Run
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* Node Palette */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Node Types</CardTitle>
              <CardDescription>Drag nodes to the canvas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {nodeTypes.map((node) => (
                  <div
                    key={node.name}
                    className="flex cursor-grab items-center gap-3 rounded border border-border bg-card p-3 transition-colors hover:border-primary active:cursor-grabbing"
                    draggable
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded ${node.color}`}>
                      <node.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{node.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="mb-3 text-sm font-medium text-foreground">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <GitBranch className="h-4 w-4" /> Add Branch
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Copy className="h-4 w-4" /> Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-destructive">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canvas */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-medium">Workflow Canvas</CardTitle>
                <CardDescription>Email Processing Workflow</CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground">100%</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 rounded border border-border bg-secondary/30">
                {/* Grid background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                
                {/* Workflow Nodes */}
                {workflowNodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute flex cursor-pointer items-center gap-2 rounded border-2 bg-card px-3 py-2 shadow-sm transition-all ${
                      selectedNode === node.id ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                    style={{ left: node.x, top: node.y }}
                    onClick={() => setSelectedNode(node.id)}
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded ${node.color}`}>
                      {node.type === "Trigger" && <Circle className="h-3 w-3 text-primary-foreground" />}
                      {node.type === "Condition" && <Diamond className="h-3 w-3 text-primary-foreground" />}
                      {node.type === "Action" && <Square className="h-3 w-3 text-primary-foreground" />}
                      {node.type === "Output" && <ArrowRight className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className="text-xs font-medium text-foreground">{node.name}</span>
                  </div>
                ))}

                {/* Connection lines (simplified) */}
                <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
                  <path
                    d="M 180 165 Q 240 165 280 165"
                    fill="none"
                    stroke="#C0C6CA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 400 165 Q 450 130 480 115"
                    fill="none"
                    stroke="#C0C6CA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 400 165 Q 450 200 480 215"
                    fill="none"
                    stroke="#C0C6CA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 620 115 Q 660 135 680 165"
                    fill="none"
                    stroke="#C0C6CA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 620 215 Q 660 195 680 165"
                    fill="none"
                    stroke="#C0C6CA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>

                {/* Add node button */}
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-4 right-4 h-10 w-10 rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Properties Panel */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <Settings className="h-4 w-4" /> Properties
              </CardTitle>
              <CardDescription>
                {selectedNode ? `Node ${selectedNode} settings` : "Select a node"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedNode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nodeName">Node Name</Label>
                    <Input
                      id="nodeName"
                      defaultValue={workflowNodes.find((n) => n.id === selectedNode)?.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nodeType">Type</Label>
                    <Select defaultValue={workflowNodes.find((n) => n.id === selectedNode)?.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Trigger">Trigger</SelectItem>
                        <SelectItem value="Action">Action</SelectItem>
                        <SelectItem value="Condition">Condition</SelectItem>
                        <SelectItem value="Output">Output</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Connections</Label>
                    <div className="rounded border border-border bg-secondary/50 p-2 text-xs text-muted-foreground">
                      <p>Input: Node {selectedNode > 1 ? selectedNode - 1 : "—"}</p>
                      <p>Output: Node {selectedNode < 5 ? selectedNode + 1 : "—"}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge variant="secondary">Configured</Badge>
                  </div>
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center text-center text-sm text-muted-foreground">
                  Click on a node to view and edit its properties
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Workflow Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Nodes</p>
                <p className="text-xl font-semibold text-foreground">5</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-xl font-semibold text-foreground">4</p>
              </div>
              <Badge variant="secondary">Valid</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Last Run</p>
                <p className="text-xl font-semibold text-foreground">2m ago</p>
              </div>
              <Badge className="bg-chart-3 text-primary-foreground">Success</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-xl font-semibold text-foreground">1.2s</p>
              </div>
              <Badge variant="secondary">Fast</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
