"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  ChevronLeft,
  Terminal,
  Workflow,
  Code2,
  Pencil,
  Check,
  Puzzle,
  Search,
  Star,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  MessageSquare,
  Copy,
  CheckCheck,
  User,
} from "lucide-react"

type Mode = "workflow" | "code"

// Mock team members
const teamMembers = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "Admin", initials: "SC" },
  { id: 2, name: "Mike Johnson", email: "mike@example.com", role: "Editor", initials: "MJ" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", role: "Viewer", initials: "ED" },
]

// Workflow nodes
const workflowNodes = [
  { id: 1, type: "trigger", name: "Email Trigger", x: 100, y: 150, icon: "📧" },
  { id: 2, type: "action", name: "LLM Processor", x: 350, y: 150, icon: "🤖" },
  { id: 3, type: "action", name: "Slack Notify", x: 600, y: 100, icon: "💬" },
  { id: 4, type: "output", name: "Save to DB", x: 600, y: 220, icon: "💾" },
]

// Marketplace components
const marketplaceComponents = [
  { id: 1, name: "Email Parser", icon: "📧", rating: 4.8, downloads: "12.3K", category: "Data" },
  { id: 2, name: "Slack Notifier", icon: "💬", rating: 4.9, downloads: "8.7K", category: "Communication" },
  { id: 3, name: "PDF Extractor", icon: "📄", rating: 4.6, downloads: "5.2K", category: "Document" },
  { id: 4, name: "Calendar Sync", icon: "📅", rating: 4.7, downloads: "9.1K", category: "Productivity" },
  { id: 5, name: "Database Query", icon: "🗄️", rating: 4.5, downloads: "15.4K", category: "Data" },
  { id: 6, name: "AI Summarizer", icon: "🤖", rating: 4.9, downloads: "20.1K", category: "AI" },
]

// File tree for Code mode
const fileTree = [
  {
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      { name: "agent.ts", type: "file", active: true },
      { name: "workflow.json", type: "file" },
      { name: "utils.py", type: "file" },
    ],
  },
  {
    name: "tests",
    type: "folder",
    expanded: false,
    children: [{ name: "test_agent.py", type: "file" }],
  },
  { name: "config.yaml", type: "file" },
  { name: "README.md", type: "file" },
]

const codeContent = `import { OpenAI } from 'openai';
import { z } from 'zod';

const EmailSchema = z.object({
  subject: z.string(),
  body: z.string(),
  sender: z.string().email(),
  timestamp: z.date(),
});

export class EmailSummarizerAgent {
  private client: OpenAI;
  private model = "gpt-4-turbo";

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async summarize(emails: z.infer<typeof EmailSchema>[]) {
    const prompt = this.buildPrompt(emails);
    
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: "You are an email summarizer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    });
    
    return response.choices[0].message.content;
  }

  private buildPrompt(emails: z.infer<typeof EmailSchema>[]) {
    return emails.map(e => \`From: \${e.sender}\\nSubject: \${e.subject}\\n\${e.body}\`).join('\\n---\\n');
  }
}

// Initialize agent
const agent = new EmailSummarizerAgent(process.env.OPENAI_API_KEY!);
`

// Chat messages mock
const initialWorkflowChat = [
  { role: "assistant", content: "Hello! I'm your AI assistant. I can help you build and modify workflows. Try asking me to add nodes, connect components, or explain how things work." },
  { role: "user", content: "Add a sentiment analysis step after the email trigger" },
  { role: "assistant", content: "I've added a Sentiment Analysis node after the Email Trigger. The workflow now analyzes the emotional tone of incoming emails before processing them further. Would you like me to configure the sentiment thresholds?" },
]

const initialCodeChat = [
  { role: "assistant", content: "Hello! I'm your AI coding assistant. I can help you write, refactor, and debug code. Ask me anything about your codebase." },
  { role: "user", content: "Can you refactor the summarize function to use async/await properly?" },
  { role: "assistant", content: "Here's the refactored code with proper async/await pattern:\n\n```typescript\nasync summarize(emails: Email[]): Promise<string> {\n  const prompt = await this.buildPrompt(emails);\n  const response = await this.client.chat.completions.create({\n    model: this.model,\n    messages: [/* ... */]\n  });\n  return response.choices[0].message.content ?? '';\n}\n```\n\nWould you like me to apply this change?" },
]

export default function ProjectWorkspacePage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("workflow")
  const [projectName, setProjectName] = useState("Enterprise Sales Agent")
  const [isEditingName, setIsEditingName] = useState(false)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState(initialWorkflowChat)
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setChatMessages(mode === "workflow" ? initialWorkflowChat : initialCodeChat)
  }, [mode])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    setChatMessages((prev) => [...prev, { role: "user", content: chatInput }])
    setChatInput("")
    setIsLoading(true)
    
    // Simulate AI response
    setTimeout(() => {
      const response = mode === "workflow"
        ? "I've updated the workflow based on your request. The changes have been applied to the canvas."
        : "I've analyzed your code and prepared the changes. Click 'Apply' to implement them."
      setChatMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Workspace Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-6 py-3">
          {/* Left: Breadcrumb + Project Name */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => router.push("/layer4/projects")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="h-8 w-64 border-[#E5E7EB]"
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
          </div>

          {/* Center: Mode Switcher */}
          <div className="flex items-center rounded-lg bg-[#F5F7FA] p-1">
            <button
              onClick={() => setMode("workflow")}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-all rounded-md ${
                mode === "workflow"
                  ? "bg-[#ee3224] text-white shadow-sm"
                  : "text-[#333] hover:bg-white/50"
              }`}
            >
              <Workflow className="h-4 w-4" />
              Workflow
            </button>
            <button
              onClick={() => setMode("code")}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-all rounded-md ${
                mode === "code"
                  ? "bg-[#ee3224] text-white shadow-sm"
                  : "text-[#333] hover:bg-white/50"
              }`}
            >
              <Code2 className="h-4 w-4" />
              Code
            </button>
          </div>

          {/* Right: Team + Actions */}
          <div className="flex items-center gap-3">
            {/* Avatar Stack */}
            <div className="flex items-center -space-x-2">
              {teamMembers.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <Dialog open={showInvite} onOpenChange={setShowInvite}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 border-[#E5E7EB]">
                  <UserPlus className="h-4 w-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite Team Members</DialogTitle>
                  <DialogDescription>Add collaborators to this project</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-2">
                    <Input placeholder="Enter email address" className="flex-1 border-[#E5E7EB]" />
                    <Select defaultValue="editor">
                      <SelectTrigger className="w-28 border-[#E5E7EB]">
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
                      <div key={member.id} className="flex items-center justify-between rounded border border-[#E5E7EB] p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                              {member.initials}
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

            <Button size="sm" className="gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e]">
              <Play className="h-4 w-4" />
              Run
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 border-[#E5E7EB]">
              <Rocket className="h-4 w-4" />
              Deploy
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Canvas - Split Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Canvas (70%) */}
          <div className="flex w-[70%] flex-col border-r border-[#E5E7EB]">
            {mode === "workflow" ? (
              <WorkflowCanvas
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                onOpenMarketplace={() => setShowMarketplace(true)}
              />
            ) : (
              <CodeEditor />
            )}
          </div>

          {/* Right Panel - AI Chat (30%) */}
          <div className="flex w-[30%] flex-col bg-[#F5F7FA]">
            {/* Chat Header */}
            <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-white px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ee3224]">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">AI Assistant</p>
                <p className="text-xs text-muted-foreground">
                  {mode === "workflow" ? "Workflow Builder" : "Code Helper"}
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "user" ? "bg-muted" : "bg-[#ee3224]"
                    }`}>
                      {msg.role === "user" ? (
                        <User className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#ee3224] text-white"
                          : "bg-white border border-[#E5E7EB] text-foreground shadow-sm"
                      }`}
                    >
                      {msg.content.includes("```") ? (
                        <div className="space-y-2">
                          {msg.content.split("```").map((part, i) => (
                            i % 2 === 0 ? (
                              <p key={i}>{part}</p>
                            ) : (
                              <div key={i} className="relative rounded bg-zinc-900 p-3 font-mono text-xs text-zinc-100">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="absolute right-2 top-2 h-6 w-6 text-zinc-400 hover:text-white"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <pre className="overflow-x-auto">{part.replace(/^typescript\n/, "")}</pre>
                              </div>
                            )
                          ))}
                          <Button size="sm" className="mt-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
                            Apply Changes
                          </Button>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ee3224]">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#ee3224]" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#ee3224]" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#ee3224]" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="border-t border-[#E5E7EB] bg-white p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {mode === "workflow" ? (
                  <>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-[#E5E7EB]" onClick={() => setChatInput("Test workflow")}>
                      Test Workflow
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-[#E5E7EB]" onClick={() => setChatInput("Debug issues")}>
                      Debug
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-[#E5E7EB]" onClick={() => setChatInput("Add a new node")}>
                      Add Node
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-[#E5E7EB]" onClick={() => setChatInput("Explain this code")}>
                      Explain
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-[#E5E7EB]" onClick={() => setChatInput("Refactor selected code")}>
                      Refactor
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-[#E5E7EB]" onClick={() => setChatInput("Fix bugs in this file")}>
                      Fix Bugs
                    </Button>
                  </>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Describe changes..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 border-[#E5E7EB]"
                />
                <Button
                  size="icon"
                  className="h-9 w-9 bg-[#ee3224] hover:bg-[#cc2a1e]"
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Marketplace Modal */}
        <Dialog open={showMarketplace} onOpenChange={setShowMarketplace}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Browse Marketplace Components</DialogTitle>
              <DialogDescription>Find agents, tools, and templates to add to your workflow</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search components..." className="pl-9 border-[#E5E7EB]" />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-[#ee3224]/10">All</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">Data</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">AI</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">Communication</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {marketplaceComponents.map((component) => (
                  <div
                    key={component.id}
                    className="flex flex-col gap-2 rounded border border-[#E5E7EB] bg-white p-3 transition-all hover:border-[#ee3224] hover:shadow-sm"
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
                      onClick={() => setShowMarketplace(false)}
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

// Workflow Canvas Component
function WorkflowCanvas({
  selectedNode,
  setSelectedNode,
  onOpenMarketplace,
}: {
  selectedNode: number | null
  setSelectedNode: (id: number | null) => void
  onOpenMarketplace: () => void
}) {
  const getNodeStyle = (type: string) => {
    switch (type) {
      case "trigger":
        return "border-amber-500 bg-amber-50"
      case "action":
        return "border-[#ee3224] bg-red-50"
      case "output":
        return "border-emerald-500 bg-emerald-50"
      default:
        return "border-[#E5E7EB] bg-white"
    }
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Canvas */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#F5F7FA",
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Connection Lines */}
        <svg className="absolute inset-0 pointer-events-none">
          <path d="M 200 165 C 275 165, 275 165, 330 165" fill="none" stroke="#C0C6CA" strokeWidth="2" />
          <path d="M 450 165 C 525 130, 525 115, 580 115" fill="none" stroke="#C0C6CA" strokeWidth="2" />
          <path d="M 450 165 C 525 200, 525 235, 580 235" fill="none" stroke="#C0C6CA" strokeWidth="2" />
          <circle cx="200" cy="165" r="4" fill="#C0C6CA" />
          <circle cx="330" cy="165" r="4" fill="#C0C6CA" />
          <circle cx="450" cy="165" r="4" fill="#C0C6CA" />
          <circle cx="580" cy="115" r="4" fill="#C0C6CA" />
          <circle cx="580" cy="235" r="4" fill="#C0C6CA" />
        </svg>

        {/* Workflow Nodes */}
        {workflowNodes.map((node) => (
          <div
            key={node.id}
            className={`absolute flex cursor-pointer items-center gap-3 rounded border-2 px-4 py-3 shadow-sm transition-all ${
              selectedNode === node.id
                ? "border-[#ee3224] ring-2 ring-[#ee3224]/20"
                : getNodeStyle(node.type)
            }`}
            style={{ left: node.x, top: node.y }}
            onClick={() => setSelectedNode(node.id)}
          >
            <span className="text-xl">{node.icon}</span>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">{node.type}</p>
              <p className="text-sm font-medium text-foreground">{node.name}</p>
            </div>
          </div>
        ))}

        {/* Marketplace Component Node */}
        <div
          onClick={onOpenMarketplace}
          className="absolute flex cursor-pointer items-center gap-3 rounded border-2 border-dashed border-[#ee3224]/50 bg-white px-4 py-3 shadow-sm transition-all hover:border-[#ee3224] hover:bg-[#ee3224]/5"
          style={{ left: 350, top: 280 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#ee3224]/10">
            <Puzzle className="h-4 w-4 text-[#ee3224]" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#ee3224]">Add from Marketplace</p>
            <p className="text-xs text-muted-foreground">Browse components</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white p-1 shadow-sm">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-4 w-px bg-[#E5E7EB]" />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Add Node FAB */}
      <Button
        size="icon"
        className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-[#ee3224] hover:bg-[#cc2a1e] shadow-md"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  )
}

// Code Editor Component
function CodeEditor() {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["src"])
  const [activeFile, setActiveFile] = useState("agent.ts")
  const [terminalExpanded, setTerminalExpanded] = useState(true)

  const consoleOutput = [
    { type: "info", message: "[INFO] Agent initialized successfully", time: "10:23:45" },
    { type: "info", message: "[INFO] Loading configuration...", time: "10:23:46" },
    { type: "success", message: "[SUCCESS] Connected to OpenAI API", time: "10:23:47" },
    { type: "info", message: "[INFO] Processing 5 emails...", time: "10:23:48" },
    { type: "success", message: "[SUCCESS] Summary generated in 1.2s", time: "10:23:49" },
  ]

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    )
  }

  return (
    <div className="flex h-full">
      {/* File Explorer */}
      <div className="w-56 border-r border-[#E5E7EB] bg-[#F5F7FA] p-3">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <Folder className="h-4 w-4" /> Explorer
        </div>
        <div className="space-y-0.5">
          {fileTree.map((item) => (
            <FileTreeItem
              key={item.name}
              item={item}
              depth={0}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
            />
          ))}
        </div>
      </div>

      {/* Editor + Terminal */}
      <div className="flex flex-1 flex-col">
        {/* Editor Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded bg-muted px-2 py-1">
              <FileCode className="h-4 w-4 text-[#ee3224]" />
              <span className="text-sm font-medium">{activeFile}</span>
              <button className="ml-2 text-muted-foreground hover:text-foreground">
                <span className="text-xs">×</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">TypeScript</Badge>
            <Button size="sm" className="h-7 gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e] text-xs">
              <Sparkles className="h-3 w-3" />
              AI Refactor
            </Button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Line Numbers */}
            <div className="flex-shrink-0 select-none bg-zinc-900 py-4 text-right font-mono text-xs text-zinc-500">
              {codeContent.split("\n").map((_, i) => (
                <div key={i} className="px-3 leading-5">{i + 1}</div>
              ))}
            </div>
            {/* Code */}
            <pre className="flex-1 overflow-auto bg-zinc-900 p-4 font-mono text-xs text-zinc-100 leading-5">
              <code>{codeContent}</code>
            </pre>
          </div>
        </div>

        {/* Terminal */}
        <div className={`border-t border-[#E5E7EB] ${terminalExpanded ? "h-40" : "h-8"}`}>
          <div
            className="flex cursor-pointer items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-3 py-1.5"
            onClick={() => setTerminalExpanded(!terminalExpanded)}
          >
            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-300">Terminal</span>
            <ChevronDown className={`ml-auto h-3 w-3 text-zinc-400 transition-transform ${!terminalExpanded ? "-rotate-90" : ""}`} />
          </div>
          {terminalExpanded && (
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
          )}
        </div>
      </div>
    </div>
  )
}

// File Tree Item Component
function FileTreeItem({
  item,
  depth,
  expandedFolders,
  toggleFolder,
  activeFile,
  setActiveFile,
}: {
  item: any
  depth: number
  expandedFolders: string[]
  toggleFolder: (name: string) => void
  activeFile: string
  setActiveFile: (name: string) => void
}) {
  const isExpanded = expandedFolders.includes(item.name)
  const isActive = item.type === "file" && item.name === activeFile

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm transition-colors hover:bg-white ${
          isActive ? "bg-[#ee3224]/10 text-[#ee3224]" : "text-foreground"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          if (item.type === "folder") {
            toggleFolder(item.name)
          } else {
            setActiveFile(item.name)
          }
        }}
      >
        {item.type === "folder" ? (
          <>
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            {isExpanded ? (
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
      {item.type === "folder" && isExpanded && item.children && (
        <div>
          {item.children.map((child: any) => (
            <FileTreeItem
              key={child.name}
              item={child}
              depth={depth + 1}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}
