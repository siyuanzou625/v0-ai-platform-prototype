"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Play,
  Send,
  Sparkles,
  Code,
  GitBranch,
  Users,
  Rocket,
  Settings,
  ZoomIn,
  ZoomOut,
  Maximize2,
  MoreHorizontal,
  Brain,
  Database,
  GitFork,
  Variable,
  Globe,
  Mail,
  BookOpen,
  FolderKanban,
} from "lucide-react"

// Project data
const PROJECT_DATA: Record<string, { name: string; status: string; environment: string }> = {
  "proj-001": { name: "Customer Support Bot", status: "active", environment: "Production" },
  "proj-002": { name: "Sales Assistant", status: "draft", environment: "Development" },
  "proj-003": { name: "HR Onboarding Agent", status: "active", environment: "Staging" },
  "proj-004": { name: "Data Analyzer", status: "paused", environment: "Production" },
  "proj-005": { name: "Marketing Automation", status: "active", environment: "Production" },
  "proj-006": { name: "Enterprise Sales Agent", status: "active", environment: "Production" },
}

// Node types for the left panel - matching screenshot exactly
const NODE_TYPES = [
  { id: "llm", name: "LLM", description: "Invoke the large language model to...", icon: Brain, color: "bg-orange-500" },
  { id: "code", name: "Code", description: "Write code to process input variables and...", icon: Code, color: "bg-orange-500" },
  { id: "knowledge", name: "Knowledge", description: "Retrieve and match information from...", icon: BookOpen, color: "bg-green-500" },
  { id: "condition", name: "Condition", description: "Connect branches based on set conditions", icon: GitFork, color: "bg-green-500" },
  { id: "variable", name: "Variable", description: "Read and write variables in your workflow", icon: Variable, color: "bg-red-500" },
  { id: "database", name: "Database", description: "Query and store data in databases", icon: Database, color: "bg-blue-500" },
]

const INTEGRATION_NODES = [
  { id: "http", name: "HTTP Request", description: "Make HTTP requests to external APIs", icon: Globe, color: "bg-green-500" },
  { id: "email", name: "Email", description: "Send and receive emails", icon: Mail, color: "bg-red-500" },
]

// Chat messages for AI Assistant - matching screenshot
const CHAT_MESSAGES = [
  { role: "assistant", content: "Hello! I'm your AI assistant. I can help you build and modify workflows. Try asking me to add nodes, connect components, or explain how things work." },
  { role: "user", content: "Add a sentiment analysis step after the email trigger" },
  { role: "assistant", content: "I've added a Sentiment Analysis node after the Email Trigger. The workflow now analyzes the emotional tone of incoming emails before processing them further. Would you like me to configure the sentiment thresholds?" },
  { role: "user", content: "Debug issues" },
  { role: "assistant", content: "I've updated the workflow based on your request. The changes have been applied to the canvas." },
]

export default function ProjectWorkflowPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = typeof params.id === "string" ? params.id : ""
  const [chatInput, setChatInput] = useState("")
  const [activeTab, setActiveTab] = useState("workflow")
  
  const project = PROJECT_DATA[projectId] || { name: "Enterprise Sales Agent", status: "active", environment: "Production" }

  // Project not found
  if (!PROJECT_DATA[projectId] && projectId !== "") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F5F7FA] p-8">
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
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => router.push("/build/projects")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-base font-semibold text-foreground">{project.name}</h1>
        </div>

        {/* Build Mode Tabs */}
        <div className="flex items-center bg-[#F5F7FA] rounded-lg p-1">
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === "ai" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Build with AI
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === "workflow" ? "bg-[#ee3224] text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Play className="h-4 w-4" />
            Workflow
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === "code" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code className="h-4 w-4" />
            Code
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E7EB] rounded-md text-sm">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <span>GitHub:</span>
            <span className="font-medium">main</span>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center -space-x-2 px-2">
            <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarFallback className="text-xs bg-blue-100 text-blue-700">SC</AvatarFallback>
            </Avatar>
            <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarFallback className="text-xs bg-purple-100 text-purple-700">MJ</AvatarFallback>
            </Avatar>
            <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarFallback className="text-xs bg-green-100 text-green-700">ED</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Users className="h-4 w-4" /> Invite
          </Button>
          <Button size="sm" className="gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e]">
            <Play className="h-4 w-4" /> Run
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Rocket className="h-4 w-4" /> Deploy
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Node Library */}
        <div className="w-64 border-r border-[#E5E7EB] bg-white flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {NODE_TYPES.map((node) => {
                const IconComponent = node.icon
                return (
                  <div
                    key={node.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#F5F7FA] cursor-grab transition-colors"
                    draggable
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${node.color} text-white flex-shrink-0`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground">{node.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{node.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Integrations</p>
              <div className="space-y-3">
                {INTEGRATION_NODES.map((node) => {
                  const IconComponent = node.icon
                  return (
                    <div
                      key={node.id}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#F5F7FA] cursor-grab transition-colors"
                      draggable
                    >
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${node.color} text-white flex-shrink-0`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground">{node.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{node.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Center - Workflow Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#FAFBFC]">
          {/* Grid background */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: "radial-gradient(circle, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
          
          {/* Workflow Nodes */}
          <div className="absolute inset-0 p-8">
            {/* Node: Qualify Lead */}
            <div className="absolute" style={{ top: 60, left: 320 }}>
              <div className="bg-white rounded-lg border-2 border-green-500 shadow-md p-3 w-52">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-green-500 flex items-center justify-center">
                      <Play className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-medium text-sm">Qualify Lead</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">INPUT</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs">lead_data</Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">OUTPUT</span>
                    <div className="mt-1 flex gap-1">
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">score</Badge>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">analysis</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Node: Lead Received */}
            <div className="absolute" style={{ top: 180, left: 120 }}>
              <div className="bg-white rounded-lg border-2 border-green-500 shadow-md p-3 w-48">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-green-500 flex items-center justify-center">
                      <Play className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-medium text-sm">Lead Received</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">OUTPUT</span>
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">trigger</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Node: CRM Lookup */}
            <div className="absolute" style={{ top: 300, left: 320 }}>
              <div className="bg-white rounded-lg border-2 border-green-500 shadow-md p-3 w-48">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-green-500 flex items-center justify-center">
                      <Database className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-medium text-sm">CRM Lookup</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">INPUT</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs">email</Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">OUTPUT</span>
                    <div className="mt-1 flex gap-1">
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">history</Badge>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">status</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Node: Score */}
            <div className="absolute" style={{ top: 60, left: 580 }}>
              <div className="bg-white rounded-lg border-2 border-green-500 shadow-md p-3 w-40">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded bg-green-500 flex items-center justify-center">
                    <Variable className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-medium text-sm">Score</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">INPUT</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs">score</Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">OUTPUT</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">qualified</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
              <path d="M 268 220 C 290 180, 310 140, 320 120" stroke="#9CA3AF" strokeWidth="2" fill="none" />
              <path d="M 268 240 C 290 280, 310 310, 320 320" stroke="#9CA3AF" strokeWidth="2" fill="none" />
              <path d="M 472 120 C 510 100, 540 90, 580 100" stroke="#9CA3AF" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-2">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-[#E5E7EB]" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Run Workflow Button */}
          <Button 
            className="absolute bottom-6 right-6 gap-2 bg-[#ee3224] hover:bg-[#cc2a1e] shadow-lg"
            size="lg"
          >
            <Play className="h-4 w-4" />
            Run Workflow
          </Button>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-80 border-l border-[#E5E7EB] bg-white flex flex-col">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {CHAT_MESSAGES.map((message, index) => (
                <div key={index} className="flex gap-3">
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-[#ee3224]" />
                    </div>
                  )}
                  <div className={`flex-1 ${message.role === "user" ? "flex justify-end" : ""}`}>
                    <div className={`rounded-lg p-3 text-sm ${
                      message.role === "user" 
                        ? "bg-[#ee3224] text-white max-w-[85%]" 
                        : "bg-[#F5F7FA] text-foreground"
                    }`}>
                      {message.content}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <span className="text-xs font-medium">ZD</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Action Buttons */}
          <div className="px-4 py-2 border-t border-[#E5E7EB]">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Test Workflow
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Debug
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Add Node
              </Button>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#E5E7EB]">
            <div className="flex gap-2">
              <Input 
                placeholder="Describe changes..." 
                className="flex-1"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <Button size="icon" className="bg-[#ee3224] hover:bg-[#cc2a1e] flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
