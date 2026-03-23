"use client"
// Project Workflow Builder Page - Full UI with AI Assistant
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Save,
  ZoomIn,
  ZoomOut,
  Maximize2,
  GitBranch,
  Circle,
  Square,
  Diamond,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Copy,
  Plus,
  Send,
  Bot,
  Sparkles,
  FolderKanban,
  Users,
  Rocket,
  Settings,
  Code,
  Workflow,
  MoreHorizontal,
} from "lucide-react"

// Project data
const PROJECT_DATA: Record<string, { id: string; name: string; description: string; status: string; environment: string }> = {
  "proj-001": { id: "proj-001", name: "Customer Support Bot", description: "AI-powered customer support agent", status: "active", environment: "production" },
  "proj-002": { id: "proj-002", name: "Sales Assistant", description: "Lead qualification bot", status: "draft", environment: "development" },
  "proj-003": { id: "proj-003", name: "HR Onboarding Agent", description: "Employee onboarding automation", status: "active", environment: "staging" },
  "proj-004": { id: "proj-004", name: "Data Analytics Dashboard", description: "Real-time analytics agent", status: "paused", environment: "production" },
  "proj-005": { id: "proj-005", name: "Content Generator", description: "AI content creation assistant", status: "active", environment: "production" },
  "proj-006": { id: "proj-006", name: "Code Review Assistant", description: "Automated code review", status: "draft", environment: "development" },
}

const nodeTypes = [
  { name: "Trigger", icon: Circle, bgColor: "bg-amber-50", iconColor: "text-amber-600" },
  { name: "Action", icon: Square, bgColor: "bg-[#ee3224]/10", iconColor: "text-[#ee3224]" },
  { name: "Condition", icon: Diamond, bgColor: "bg-violet-50", iconColor: "text-violet-600" },
  { name: "Output", icon: ArrowRight, bgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
]

const workflowNodes = [
  { id: 1, type: "Trigger", name: "Email Received", x: 100, y: 150, bgColor: "bg-amber-50", iconColor: "text-amber-600" },
  { id: 2, type: "Condition", name: "Is Important?", x: 300, y: 150, bgColor: "bg-violet-50", iconColor: "text-violet-600" },
  { id: 3, type: "Action", name: "Summarize Content", x: 500, y: 100, bgColor: "bg-[#ee3224]/10", iconColor: "text-[#ee3224]" },
  { id: 4, type: "Action", name: "Archive Email", x: 500, y: 200, bgColor: "bg-[#ee3224]/10", iconColor: "text-[#ee3224]" },
  { id: 5, type: "Output", name: "Send Notification", x: 700, y: 150, bgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
]

export default function ProjectWorkflowPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = typeof params.id === "string" ? params.id : ""
  const [buildMode, setBuildMode] = useState("workflow")
  const [chatInput, setChatInput] = useState("")
  
  const project = PROJECT_DATA[projectId]

  // Project not found state
  if (!project) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full p-8">
          <FolderKanban className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground">Project Not Found</h2>
          <p className="text-muted-foreground mt-2">The project you are looking for does not exist.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => router.push("/build/projects")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push("/build/projects")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded bg-[#ee3224]/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-[#ee3224]" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{project.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`text-xs ${
                    project.status === "active" ? "bg-emerald-50 text-emerald-700" :
                    project.status === "draft" ? "bg-slate-100 text-slate-700" :
                    "bg-amber-50 text-amber-700"
                  }`}>
                    {project.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{project.environment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Build Mode Tabs */}
          <Tabs value={buildMode} onValueChange={setBuildMode}>
            <TabsList className="bg-[#F5F7FA]">
              <TabsTrigger value="ai" className="gap-1.5 text-xs data-[state=active]:bg-white">
                <Sparkles className="h-3.5 w-3.5" /> Build with AI
              </TabsTrigger>
              <TabsTrigger value="workflow" className="gap-1.5 text-xs data-[state=active]:bg-white">
                <Workflow className="h-3.5 w-3.5" /> Workflow
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-1.5 text-xs data-[state=active]:bg-white">
                <Code className="h-3.5 w-3.5" /> Code
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <GitBranch className="h-3.5 w-3.5" /> main
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Users className="h-3.5 w-3.5" /> Invite
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Play className="h-3.5 w-3.5" /> Run
            </Button>
            <Button size="sm" className="gap-1.5 text-xs bg-[#ee3224] hover:bg-[#cc2a1e]">
              <Rocket className="h-3.5 w-3.5" /> Deploy
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content - 3 Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Node Palette */}
          <div className="w-64 border-r border-[#E5E7EB] bg-white flex flex-col">
            <div className="p-4 border-b border-[#E5E7EB]">
              <h3 className="font-semibold text-sm">Node Types</h3>
              <p className="text-xs text-muted-foreground mt-1">Drag nodes to canvas</p>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {nodeTypes.map((node) => (
                  <div
                    key={node.name}
                    className="flex cursor-grab items-center gap-3 rounded border border-[#E5E7EB] bg-white p-3 transition-colors hover:border-[#ee3224]/50 active:cursor-grabbing"
                    draggable
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded ${node.bgColor}`}>
                      <node.icon className={`h-4 w-4 ${node.iconColor}`} />
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
            </ScrollArea>
          </div>

          {/* Center Panel - Workflow Canvas */}
          <div className="flex-1 flex flex-col bg-[#F5F7FA]">
            {/* Canvas Toolbar */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-2">
              <div className="text-sm font-medium">Workflow Canvas</div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground px-2">100%</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative overflow-hidden">
              {/* Grid background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              
              {/* Workflow Nodes */}
              {workflowNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute flex cursor-pointer items-center gap-2 rounded border-2 bg-white px-3 py-2 shadow-sm transition-all border-[#E5E7EB] hover:border-[#ee3224]/50"
                  style={{ left: node.x, top: node.y }}
                >
                  <div className={`flex h-6 w-6 items-center justify-center rounded ${node.bgColor}`}>
                    {node.type === "Trigger" && <Circle className={`h-3 w-3 ${node.iconColor}`} />}
                    {node.type === "Condition" && <Diamond className={`h-3 w-3 ${node.iconColor}`} />}
                    {node.type === "Action" && <Square className={`h-3 w-3 ${node.iconColor}`} />}
                    {node.type === "Output" && <ArrowRight className={`h-3 w-3 ${node.iconColor}`} />}
                  </div>
                  <span className="text-xs font-medium text-foreground">{node.name}</span>
                </div>
              ))}

              {/* Connection lines */}
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <path d="M 180 165 Q 240 165 280 165" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 400 165 Q 450 130 480 115" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 400 165 Q 450 200 480 215" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 620 115 Q 660 135 680 165" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 620 215 Q 660 195 680 165" fill="none" stroke="#C0C6CA" strokeWidth="2" strokeDasharray="5,5" />
              </svg>

              {/* Add node button */}
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Panel - AI Assistant */}
          <div className="w-80 border-l border-[#E5E7EB] bg-white flex flex-col">
            <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ee3224]/10">
                <Sparkles className="h-4 w-4 text-[#ee3224]" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything</p>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ee3224]/10 flex-shrink-0">
                    <Bot className="h-4 w-4 text-[#ee3224]" />
                  </div>
                  <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-slate-100 text-foreground">
                    Hello! I am your AI assistant for this workflow. I can help you build, optimize, and debug your automation. What would you like to do?
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t border-[#E5E7EB]">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask AI for help..." 
                  className="flex-1"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <Button size="icon" className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
