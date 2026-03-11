"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Rocket,
  Settings,
  UserPlus,
  Send,
  Bot,
  Circle,
  Square,
  Diamond,
  ArrowRight,
  Plus,
  Sparkles,
  FileCode,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Terminal,
  RefreshCw,
  Cpu,
  HardDrive,
  Activity,
  Search,
  Star,
  Download,
  X,
  Pencil,
  Check,
  Puzzle,
} from "lucide-react"

type Mode = "no-code" | "low-code" | "high-code"

// Mock marketplace components
const marketplaceComponents = [
  { id: 1, name: "Email Parser", icon: "📧", rating: 4.8, downloads: "12.3K", category: "Data" },
  { id: 2, name: "Slack Notifier", icon: "💬", rating: 4.9, downloads: "8.7K", category: "Communication" },
  { id: 3, name: "PDF Extractor", icon: "📄", rating: 4.6, downloads: "5.2K", category: "Document" },
  { id: 4, name: "Calendar Sync", icon: "📅", rating: 4.7, downloads: "9.1K", category: "Productivity" },
  { id: 5, name: "Database Query", icon: "🗄️", rating: 4.5, downloads: "15.4K", category: "Data" },
  { id: 6, name: "AI Summarizer", icon: "🤖", rating: 4.9, downloads: "20.1K", category: "AI" },
]

// Mock team members
const teamMembers = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "Admin", avatar: "/avatars/01.png" },
  { id: 2, name: "Mike Johnson", email: "mike@example.com", role: "Editor", avatar: "/avatars/02.png" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", role: "Viewer", avatar: "/avatars/03.png" },
]

// Workflow nodes for Low-Code view
const workflowNodes = [
  { id: 1, type: "Trigger", name: "Email Received", x: 80, y: 120 },
  { id: 2, type: "Condition", name: "Is Important?", x: 280, y: 120 },
  { id: 3, type: "Action", name: "Summarize Content", x: 480, y: 70 },
  { id: 4, type: "Action", name: "Archive Email", x: 480, y: 170 },
  { id: 5, type: "Output", name: "Send Notification", x: 680, y: 120 },
]

// File tree for High-Code view
const fileTree = [
  {
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      { name: "agent.py", type: "file", active: true },
      { name: "config.yaml", type: "file" },
      { name: "utils.py", type: "file" },
    ],
  },
  {
    name: "tests",
    type: "folder",
    expanded: false,
    children: [{ name: "test_agent.py", type: "file" }],
  },
  { name: "requirements.txt", type: "file" },
  { name: "README.md", type: "file" },
]

const codeContent = `import openai
from typing import List, Dict

class EmailSummarizerAgent:
    """AI Agent for summarizing emails"""
    
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.model = "gpt-4"
    
    async def summarize(self, emails: List[Dict]) -> str:
        """Summarize a list of emails"""
        prompt = self._build_prompt(emails)
        
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are an email summarizer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        
        return response.choices[0].message.content

# Initialize agent
agent = EmailSummarizerAgent(api_key="sk-...")
`

export default function ProjectWorkspacePage() {
  const [mode, setMode] = useState<Mode>("low-code")
  const [projectName, setProjectName] = useState("Email Summarizer Agent")
  const [isEditingName, setIsEditingName] = useState(false)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [nlPrompt, setNlPrompt] = useState("")
  const [placedComponents, setPlacedComponents] = useState<typeof marketplaceComponents>([])

  const handleAddComponent = (component: (typeof marketplaceComponents)[0]) => {
    setPlacedComponents([...placedComponents, component])
    setShowMarketplace(false)
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Project Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
          {/* Left: Project Name + Status */}
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="h-8 w-64"
                  autoFocus
                />
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsEditingName(false)}>
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-foreground">{projectName}</h1>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setIsEditingName(true)}>
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
            )}
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
              Draft
            </Badge>
          </div>

          {/* Center: Mode Switcher */}
          <div className="flex items-center rounded-lg bg-[#F5F7FA] p-1">
            {(["no-code", "low-code", "high-code"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 text-sm font-medium transition-all rounded-md ${
                  mode === m
                    ? "bg-[#ee3224] text-white shadow-sm"
                    : "text-[#333] hover:bg-white/50"
                }`}
              >
                {m === "no-code" ? "No-Code" : m === "low-code" ? "Low-Code" : "High-Code"}
              </button>
            ))}
          </div>

          {/* Right: Team + Actions */}
          <div className="flex items-center gap-3">
            {/* Avatar Stack */}
            <div className="flex items-center -space-x-2.5">
              {teamMembers.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            {/* Invite Button */}
            <Dialog open={showInvite} onOpenChange={setShowInvite}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <UserPlus className="h-4 w-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite Team Members</DialogTitle>
                  <DialogDescription>
                    Add collaborators to this project
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-2">
                    <Input placeholder="Enter email address" className="flex-1" />
                    <Select defaultValue="editor">
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">Add</Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Current Team</Label>
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{member.role}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" className="gap-1.5">
              <Play className="h-4 w-4" />
              Run
            </Button>
            <Button size="sm" className="gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e]">
              <Rocket className="h-4 w-4" />
              Deploy
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mode-Adaptive Canvas */}
        <div className="flex-1 overflow-hidden">
          {mode === "no-code" && (
            <NoCodeView prompt={nlPrompt} setPrompt={setNlPrompt} />
          )}
          {mode === "low-code" && (
            <LowCodeView
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              onOpenMarketplace={() => setShowMarketplace(true)}
              placedComponents={placedComponents}
            />
          )}
          {mode === "high-code" && <HighCodeView />}
        </div>

        {/* Marketplace Modal */}
        <Dialog open={showMarketplace} onOpenChange={setShowMarketplace}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Browse Marketplace Components</DialogTitle>
              <DialogDescription>
                Find agents, tools, and templates to add to your workflow
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search agents, tools, templates..." className="pl-9" />
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {marketplaceComponents.map((component) => (
                  <div
                    key={component.id}
                    className="flex flex-col gap-2 rounded-lg border border-border p-3 transition-all hover:border-[#ee3224] hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-2xl">{component.icon}</span>
                      <Badge variant="secondary" className="text-xs">{component.category}</Badge>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{component.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {component.rating}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Download className="h-3 w-3" />
                          {component.downloads}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="mt-auto bg-[#ee3224] hover:bg-[#cc2a1e]"
                      onClick={() => handleAddComponent(component)}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}

// No-Code View Component
function NoCodeView({ prompt, setPrompt }: { prompt: string; setPrompt: (v: string) => void }) {
  const [showGraph, setShowGraph] = useState(false)

  const handleGenerate = () => {
    if (prompt.trim()) {
      setShowGraph(true)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Natural Language Input */}
      <div className="border-b border-border bg-card p-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-[#ee3224]" />
            <span className="font-medium text-foreground">Describe your agent workflow</span>
          </div>
          <div className="flex gap-3">
            <Textarea
              placeholder="Example: Create an agent that monitors my inbox, summarizes important emails, and sends me a daily digest at 9 AM..."
              className="min-h-24 resize-none flex-1"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              className="self-end bg-[#ee3224] hover:bg-[#cc2a1e]"
              onClick={handleGenerate}
            >
              <Send className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>
      </div>

      {/* Auto-generated Node Graph */}
      <div className="flex-1 bg-[#F5F7FA] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Generated Workflow (Read-Only)</span>
            {showGraph && (
              <Badge className="bg-emerald-100 text-emerald-700">AI Generated</Badge>
            )}
          </div>
          <div
            className="relative h-80 rounded-lg border border-border bg-white"
            style={{
              backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            {showGraph ? (
              <>
                {workflowNodes.map((node) => (
                  <div
                    key={node.id}
                    className="absolute flex items-center gap-2 rounded border-2 border-border bg-white px-3 py-2 shadow-sm"
                    style={{ left: node.x, top: node.y }}
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded ${
                      node.type === "Trigger" ? "bg-amber-500" :
                      node.type === "Condition" ? "bg-blue-500" :
                      node.type === "Action" ? "bg-[#ee3224]" :
                      "bg-emerald-500"
                    }`}>
                      {node.type === "Trigger" && <Circle className="h-3 w-3 text-white" />}
                      {node.type === "Condition" && <Diamond className="h-3 w-3 text-white" />}
                      {node.type === "Action" && <Square className="h-3 w-3 text-white" />}
                      {node.type === "Output" && <ArrowRight className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-xs font-medium text-foreground">{node.name}</span>
                  </div>
                ))}
                <svg className="absolute inset-0 pointer-events-none">
                  <path d="M 160 135 Q 220 135 260 135" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 380 135 Q 430 100 460 85" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 380 135 Q 430 170 460 185" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 600 85 Q 640 110 660 135" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 600 185 Q 640 160 660 135" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <Bot className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Describe your workflow above to generate a visual graph
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Low-Code View Component
function LowCodeView({
  selectedNode,
  setSelectedNode,
  onOpenMarketplace,
  placedComponents,
}: {
  selectedNode: number | null
  setSelectedNode: (id: number | null) => void
  onOpenMarketplace: () => void
  placedComponents: typeof marketplaceComponents
}) {
  const nodeTypes = [
    { name: "Trigger", icon: Circle, color: "bg-amber-500" },
    { name: "Action", icon: Square, color: "bg-[#ee3224]" },
    { name: "Condition", icon: Diamond, color: "bg-blue-500" },
    { name: "Output", icon: ArrowRight, color: "bg-emerald-500" },
  ]

  return (
    <div className="flex h-full">
      {/* Node Palette */}
      <div className="w-56 border-r border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-medium text-foreground">Node Types</h3>
        <div className="space-y-2">
          {nodeTypes.map((node) => (
            <div
              key={node.name}
              className="flex cursor-grab items-center gap-3 rounded border border-border bg-white p-2.5 transition-colors hover:border-[#ee3224] active:cursor-grabbing"
              draggable
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded ${node.color}`}>
                <node.icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">{node.name}</span>
            </div>
          ))}
        </div>

        {/* Marketplace Component Button */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-foreground">Marketplace</h3>
          <button
            onClick={onOpenMarketplace}
            className="flex w-full cursor-pointer items-center gap-3 rounded border-2 border-dashed border-[#ee3224]/30 bg-[#ee3224]/5 p-2.5 transition-colors hover:border-[#ee3224] hover:bg-[#ee3224]/10"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#ee3224]/20">
              <Puzzle className="h-3.5 w-3.5 text-[#ee3224]" />
            </div>
            <span className="text-sm font-medium text-[#ee3224]">Add Component</span>
          </button>
        </div>

        {/* Placed Components */}
        {placedComponents.length > 0 && (
          <div className="mt-4 space-y-2">
            {placedComponents.map((comp, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded border border-border bg-white p-2 text-sm">
                <span>{comp.icon}</span>
                <span className="truncate">{comp.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Canvas */}
      <div
        className="relative flex-1"
        style={{
          backgroundColor: "#F5F7FA",
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Workflow Nodes */}
        {workflowNodes.map((node) => (
          <div
            key={node.id}
            className={`absolute flex cursor-pointer items-center gap-2 rounded border-2 bg-white px-3 py-2 shadow-sm transition-all ${
              selectedNode === node.id ? "border-[#ee3224]" : "border-border hover:border-[#ee3224]/50"
            }`}
            style={{ left: node.x, top: node.y }}
            onClick={() => setSelectedNode(node.id)}
          >
            <div className={`flex h-6 w-6 items-center justify-center rounded ${
              node.type === "Trigger" ? "bg-amber-500" :
              node.type === "Condition" ? "bg-blue-500" :
              node.type === "Action" ? "bg-[#ee3224]" :
              "bg-emerald-500"
            }`}>
              {node.type === "Trigger" && <Circle className="h-3 w-3 text-white" />}
              {node.type === "Condition" && <Diamond className="h-3 w-3 text-white" />}
              {node.type === "Action" && <Square className="h-3 w-3 text-white" />}
              {node.type === "Output" && <ArrowRight className="h-3 w-3 text-white" />}
            </div>
            <span className="text-xs font-medium text-foreground">{node.name}</span>
          </div>
        ))}

        {/* Marketplace Component Node */}
        <div
          onClick={onOpenMarketplace}
          className="absolute flex cursor-pointer items-center gap-2 rounded border-2 border-dashed border-[#ee3224]/50 bg-white px-3 py-2 shadow-sm transition-all hover:border-[#ee3224]"
          style={{ left: 280, top: 250 }}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#ee3224]/20">
            <Puzzle className="h-3 w-3 text-[#ee3224]" />
          </div>
          <span className="text-xs font-medium text-[#ee3224]">Marketplace Component</span>
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 pointer-events-none">
          <path d="M 160 135 Q 220 135 260 135" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 380 135 Q 430 100 460 85" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 380 135 Q 430 170 460 185" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 600 85 Q 640 110 660 135" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 600 185 Q 640 160 660 135" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Add node button */}
        <Button
          size="icon"
          className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-[#ee3224] hover:bg-[#cc2a1e]"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Properties Panel */}
      <div className="w-64 border-l border-border bg-card p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <Settings className="h-4 w-4" /> Properties
        </h3>
        {selectedNode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nodeName" className="text-xs">Node Name</Label>
              <Input
                id="nodeName"
                defaultValue={workflowNodes.find((n) => n.id === selectedNode)?.name}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nodeType" className="text-xs">Type</Label>
              <Select defaultValue={workflowNodes.find((n) => n.id === selectedNode)?.type}>
                <SelectTrigger className="h-8 text-sm">
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
              <Label className="text-xs">Connections</Label>
              <div className="rounded border border-border bg-muted/50 p-2 text-xs text-muted-foreground">
                <p>Input: Node {selectedNode > 1 ? selectedNode - 1 : "—"}</p>
                <p>Output: Node {selectedNode < 5 ? selectedNode + 1 : "—"}</p>
              </div>
            </div>
            <Badge variant="secondary">Configured</Badge>
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center text-center text-xs text-muted-foreground">
            Click on a node to view and edit its properties
          </div>
        )}
      </div>
    </div>
  )
}

// High-Code View Component
function HighCodeView() {
  const [isRunning, setIsRunning] = useState(false)

  const consoleOutput = [
    { type: "info", message: "[INFO] Agent initialized successfully", time: "10:23:45" },
    { type: "info", message: "[INFO] Loading configuration from config.yaml", time: "10:23:46" },
    { type: "success", message: "[SUCCESS] Connected to OpenAI API", time: "10:23:47" },
    { type: "info", message: "[INFO] Processing 5 emails...", time: "10:23:48" },
    { type: "success", message: "[SUCCESS] Summary generated in 1.2s", time: "10:23:49" },
  ]

  return (
    <div className="flex h-full">
      {/* File Explorer */}
      <div className="w-56 border-r border-border bg-card p-3">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <Folder className="h-4 w-4" /> Explorer
        </div>
        <div className="space-y-0.5">
          {fileTree.map((item) => (
            <FileTreeItem key={item.name} item={item} depth={0} />
          ))}
        </div>
      </div>

      {/* Code Editor + Terminal */}
      <div className="flex flex-1 flex-col">
        {/* Editor Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-[#ee3224]" />
            <span className="text-sm font-medium">agent.py</span>
            <Badge variant="secondary" className="text-xs">Python</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              className="h-7 gap-1 bg-[#ee3224] hover:bg-[#cc2a1e] text-xs"
            >
              <Sparkles className="h-3 w-3" />
              Refactor with AI
            </Button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-auto">
          <pre className="h-full bg-zinc-900 p-4 font-mono text-xs text-zinc-100">
            <code>{codeContent}</code>
          </pre>
        </div>

        {/* Terminal */}
        <div className="h-40 border-t border-border">
          <div className="flex items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-3 py-1.5">
            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-300">Terminal</span>
          </div>
          <div className="h-[calc(100%-32px)] overflow-auto bg-zinc-900 p-3 font-mono text-xs">
            {consoleOutput.map((line, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-zinc-500">{line.time}</span>
                <span
                  className={
                    line.type === "success" ? "text-green-400" :
                    line.type === "error" ? "text-red-400" :
                    "text-zinc-300"
                  }
                >
                  {line.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Monitor */}
      <div className="w-52 border-l border-border bg-card p-4">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <Activity className="h-4 w-4" /> Monitor
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Cpu className="h-3 w-3" /> CPU
              </span>
              <span className="font-medium text-foreground">34%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className="h-1.5 w-1/3 rounded-full bg-[#ee3224]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <HardDrive className="h-3 w-3" /> Memory
              </span>
              <span className="font-medium text-foreground">512MB</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className="h-1.5 w-1/2 rounded-full bg-blue-500" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Activity className="h-3 w-3" /> GPU
              </span>
              <span className="font-medium text-foreground">78%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className="h-1.5 w-3/4 rounded-full bg-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// File Tree Item Component
function FileTreeItem({ item, depth }: { item: any; depth: number }) {
  const [expanded, setExpanded] = useState(item.expanded || false)

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm transition-colors hover:bg-muted ${
          item.active ? "bg-[#ee3224]/10 text-[#ee3224]" : "text-foreground"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => item.type === "folder" && setExpanded(!expanded)}
      >
        {item.type === "folder" ? (
          <>
            {expanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            {expanded ? (
              <FolderOpen className="h-4 w-4 text-amber-500" />
            ) : (
              <Folder className="h-4 w-4 text-amber-500" />
            )}
          </>
        ) : (
          <>
            <span className="w-3" />
            <FileCode className="h-4 w-4 text-blue-500" />
          </>
        )}
        <span className="ml-1 text-xs">{item.name}</span>
      </div>
      {item.type === "folder" && expanded && item.children && (
        <div>
          {item.children.map((child: any) => (
            <FileTreeItem key={child.name} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
