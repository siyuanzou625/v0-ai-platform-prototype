"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
  Braces,
  Database,
  GitBranch,
  Variable,
  BookOpen,
  Globe,
  Mail,
  Clock,
  Filter,
  MoreHorizontal,
} from "lucide-react"

type Mode = "workflow" | "code"
type ProjectType = "workflow" | "code"

// Mock projects data to determine project type - matches IDs from projects page
const projectsData: Record<string, { name: string; type: ProjectType; description: string }> = {
  "proj-001": { name: "Enterprise Sales Agent", type: "workflow", description: "Automating lead qualification and outreach for enterprise sales teams" },
  "proj-002": { name: "Data Pipeline v2", type: "code", description: "ETL workflow for processing customer analytics data" },
  "proj-003": { name: "Customer Support Bot", type: "workflow", description: "AI-powered customer service automation with ticket routing" },
  "proj-004": { name: "Analytics Dashboard API", type: "code", description: "Backend API for real-time analytics dashboard" },
  "proj-005": { name: "Invoice Processor", type: "workflow", description: "Automated invoice processing and approval workflow" },
  "proj-006": { name: "Notification Service", type: "code", description: "Multi-channel notification microservice" },
  "new": { name: "New Project", type: "workflow", description: "A new project" },
}

// Mock team members
const teamMembers = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "Admin", initials: "SC" },
  { id: 2, name: "Mike Johnson", email: "mike@example.com", role: "Editor", initials: "MJ" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", role: "Viewer", initials: "ED" },
]

// Tool palette categories
const toolPaletteCategories = [
  {
    name: "Basic Nodes",
    items: [
      { id: "llm", name: "LLM", icon: Bot, color: "bg-purple-500", description: "Invoke the large language model to generate responses using variables and prompts" },
      { id: "code", name: "Code", icon: Braces, color: "bg-blue-500", description: "Write code to process input variables and generate return values" },
      { id: "knowledge", name: "Knowledge", icon: BookOpen, color: "bg-amber-500", description: "Retrieve and match information from selected knowledge bases" },
      { id: "condition", name: "Condition", icon: GitBranch, color: "bg-emerald-500", description: "Connect branches based on set conditions" },
      { id: "variable", name: "Variable", icon: Variable, color: "bg-pink-500", description: "Read and write variables in your workflow" },
      { id: "database", name: "Database", icon: Database, color: "bg-cyan-500", description: "Query and store data in databases" },
    ],
  },
  {
    name: "Integrations",
    items: [
      { id: "http", name: "HTTP Request", icon: Globe, color: "bg-orange-500", description: "Make HTTP requests to external APIs" },
      { id: "email", name: "Email", icon: Mail, color: "bg-red-500", description: "Send and receive emails" },
      { id: "scheduler", name: "Scheduler", icon: Clock, color: "bg-indigo-500", description: "Schedule tasks to run at specific times" },
    ],
  },
]

// Project-specific workflow nodes
const projectWorkflowNodes: Record<string, typeof defaultWorkflowNodes> = {
  "proj-001": [ // Enterprise Sales Agent
    { id: 1, type: "start", name: "Lead Received", x: 80, y: 180, color: "bg-emerald-500", inputs: [], outputs: ["trigger"] },
    { id: 2, type: "llm", name: "Qualify Lead", x: 300, y: 120, color: "bg-purple-500", inputs: ["lead_data"], outputs: ["score", "analysis"] },
    { id: 3, type: "http", name: "CRM Lookup", x: 300, y: 280, color: "bg-orange-500", inputs: ["email"], outputs: ["history", "status"] },
    { id: 4, type: "condition", name: "Score Check", x: 560, y: 180, color: "bg-emerald-500", inputs: ["score"], outputs: ["qualified", "nurture"] },
    { id: 5, type: "email", name: "Send Outreach", x: 800, y: 120, color: "bg-red-500", inputs: ["template", "lead"], outputs: ["sent"] },
    { id: 6, type: "database", name: "Update CRM", x: 800, y: 260, color: "bg-cyan-500", inputs: ["lead", "status"], outputs: ["id"] },
  ],
  "proj-003": [ // Customer Support Bot
    { id: 1, type: "start", name: "Ticket Created", x: 80, y: 180, color: "bg-emerald-500", inputs: [], outputs: ["trigger"] },
    { id: 2, type: "llm", name: "Analyze Intent", x: 300, y: 120, color: "bg-purple-500", inputs: ["message"], outputs: ["intent", "sentiment"] },
    { id: 3, type: "knowledge", name: "Search FAQ", x: 300, y: 280, color: "bg-amber-500", inputs: ["query"], outputs: ["answers"] },
    { id: 4, type: "condition", name: "Can Auto-Resolve?", x: 560, y: 180, color: "bg-emerald-500", inputs: ["confidence"], outputs: ["yes", "no"] },
    { id: 5, type: "llm", name: "Generate Response", x: 800, y: 120, color: "bg-purple-500", inputs: ["context", "intent"], outputs: ["reply"] },
    { id: 6, type: "http", name: "Escalate to Agent", x: 800, y: 260, color: "bg-orange-500", inputs: ["ticket"], outputs: ["assigned"] },
  ],
  "proj-005": [ // Invoice Processor
    { id: 1, type: "start", name: "Invoice Uploaded", x: 80, y: 180, color: "bg-emerald-500", inputs: [], outputs: ["trigger"] },
    { id: 2, type: "llm", name: "Extract Data", x: 300, y: 120, color: "bg-purple-500", inputs: ["document"], outputs: ["fields", "confidence"] },
    { id: 3, type: "database", name: "Vendor Lookup", x: 300, y: 280, color: "bg-cyan-500", inputs: ["vendor_id"], outputs: ["vendor_info"] },
    { id: 4, type: "condition", name: "Amount > $10K?", x: 560, y: 180, color: "bg-emerald-500", inputs: ["amount"], outputs: ["approval", "auto"] },
    { id: 5, type: "email", name: "Request Approval", x: 800, y: 120, color: "bg-red-500", inputs: ["invoice", "approver"], outputs: ["sent"] },
    { id: 6, type: "http", name: "Process Payment", x: 800, y: 260, color: "bg-orange-500", inputs: ["invoice"], outputs: ["confirmation"] },
  ],
}

const defaultWorkflowNodes = [
  { id: 1, type: "start", name: "Start", x: 80, y: 180, color: "bg-emerald-500", inputs: [], outputs: ["trigger"] },
  { id: 2, type: "llm", name: "LLM Processor", x: 300, y: 120, color: "bg-purple-500", inputs: ["content"], outputs: ["response", "tokens"] },
  { id: 3, type: "http", name: "API Request", x: 300, y: 280, color: "bg-orange-500", inputs: ["url", "params"], outputs: ["data", "status"] },
  { id: 4, type: "condition", name: "Check Status", x: 560, y: 180, color: "bg-emerald-500", inputs: ["value"], outputs: ["true", "false"] },
  { id: 5, type: "database", name: "Save Result", x: 800, y: 120, color: "bg-cyan-500", inputs: ["data"], outputs: ["id"] },
  { id: 6, type: "end", name: "End", x: 800, y: 260, color: "bg-gray-500", inputs: ["output"], outputs: [] },
]

// Connections between nodes
const workflowConnections = [
  { from: 1, to: 2, fromPort: "trigger", toPort: "content" },
  { from: 1, to: 3, fromPort: "trigger", toPort: "url" },
  { from: 2, to: 4, fromPort: "response", toPort: "value" },
  { from: 3, to: 4, fromPort: "data", toPort: "value" },
  { from: 4, to: 5, fromPort: "true", toPort: "data" },
  { from: 4, to: 6, fromPort: "false", toPort: "output" },
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

// Project-specific code content
const projectCodeContent: Record<string, string> = {
  "proj-002": `import { Pipeline, Transform } from '@data/pipeline';
import { PostgresSource, S3Destination } from '@data/connectors';

const CustomerAnalyticsPipeline = new Pipeline({
  name: 'customer-analytics-v2',
  schedule: '0 */6 * * *', // Every 6 hours
});

// Extract from PostgreSQL
const source = new PostgresSource({
  connectionString: process.env.DATABASE_URL,
  query: \`
    SELECT 
      customer_id,
      event_type,
      properties,
      timestamp
    FROM events
    WHERE timestamp > NOW() - INTERVAL '6 hours'
  \`,
});

// Transform data
const transform = new Transform({
  async process(record) {
    return {
      ...record,
      enriched_at: new Date().toISOString(),
      segment: await classifyCustomer(record.customer_id),
    };
  },
});

// Load to S3
const destination = new S3Destination({
  bucket: process.env.ANALYTICS_BUCKET,
  prefix: 'processed/customers/',
  format: 'parquet',
});

CustomerAnalyticsPipeline
  .extract(source)
  .transform(transform)
  .load(destination);

export default CustomerAnalyticsPipeline;
`,
  "proj-004": `import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import { z } from 'zod';

const app = new Hono();

// Middleware
app.use('/*', cors());
app.use('/api/*', jwt({ secret: process.env.JWT_SECRET! }));

// Analytics schemas
const MetricQuerySchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  metrics: z.array(z.enum(['pageviews', 'sessions', 'conversions'])),
  groupBy: z.enum(['day', 'week', 'month']).optional(),
});

// GET /api/metrics - Real-time analytics data
app.get('/api/metrics', async (c) => {
  const query = MetricQuerySchema.parse(c.req.query());
  
  const data = await db.analytics.findMany({
    where: {
      timestamp: {
        gte: new Date(query.startDate),
        lte: new Date(query.endDate),
      },
    },
    select: query.metrics.reduce((acc, m) => ({ ...acc, [m]: true }), {}),
  });

  return c.json({ success: true, data });
});

// POST /api/track - Track events
app.post('/api/track', async (c) => {
  const event = await c.req.json();
  await db.events.create({ data: event });
  return c.json({ success: true });
});

export default app;
`,
  "proj-006": `import { SNS, SES, Twilio } from '@notifications/providers';
import { Queue } from '@notifications/queue';

interface NotificationPayload {
  userId: string;
  type: 'email' | 'sms' | 'push';
  template: string;
  data: Record<string, unknown>;
  priority: 'high' | 'normal' | 'low';
}

class NotificationService {
  private providers = {
    email: new SES({ region: 'us-east-1' }),
    sms: new Twilio({ accountSid: process.env.TWILIO_SID }),
    push: new SNS({ region: 'us-east-1' }),
  };

  private queue = new Queue('notifications', {
    concurrency: 10,
    retries: 3,
  });

  async send(payload: NotificationPayload) {
    const { type, priority } = payload;
    
    if (priority === 'high') {
      return this.sendImmediate(payload);
    }
    
    return this.queue.add(payload);
  }

  private async sendImmediate(payload: NotificationPayload) {
    const provider = this.providers[payload.type];
    const content = await this.renderTemplate(payload);
    
    return provider.send({
      to: await this.getUserContact(payload.userId, payload.type),
      ...content,
    });
  }

  private async renderTemplate(payload: NotificationPayload) {
    // Template rendering logic
    return { subject: '', body: '' };
  }
}

export const notificationService = new NotificationService();
`,
}

const defaultCodeContent = `import { OpenAI } from 'openai';
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
  const searchParams = useSearchParams()
  const projectId = searchParams.get("id") || "1"
  const urlMode = searchParams.get("mode") as ProjectType | null
  
  // Determine project type from data or URL param (for new projects)
  const projectData = projectsData[projectId] || projectsData["proj-001"]
  const projectType: ProjectType = urlMode || projectData.type
  
  // For code projects, always show code mode. For workflow projects, default to workflow mode
  const [mode, setMode] = useState<Mode>(projectType === "code" ? "code" : "workflow")
  const [projectName, setProjectName] = useState(projectData.name)
  const [isEditingName, setIsEditingName] = useState(false)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState(initialWorkflowChat)
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // For code projects, always use code chat. For workflow projects, depends on current mode
    if (projectType === "code") {
      setChatMessages(initialCodeChat)
    } else {
      setChatMessages(mode === "workflow" ? initialWorkflowChat : initialCodeChat)
    }
  }, [mode, projectType])

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
              onClick={() => router.push("/build/projects")}
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

          {/* Center: Mode Switcher (only for workflow projects) or Project Type Badge */}
          {projectType === "workflow" ? (
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
          ) : (
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 px-3 py-1.5">
              <Code2 className="h-4 w-4 mr-1.5" />
              Code Project
            </Badge>
          )}

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
            {projectType === "code" ? (
              <CodeEditor projectId={projectId} />
            ) : mode === "workflow" ? (
              <WorkflowCanvas
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                onOpenMarketplace={() => setShowMarketplace(true)}
                projectId={projectId}
              />
            ) : (
              <CodeEditor projectId={projectId} />
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
                  {projectType === "code" ? "Code Assistant" : (mode === "workflow" ? "Workflow Builder" : "Code Helper")}
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
                {projectType === "code" || mode === "code" ? (
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
                ) : (
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
  projectId,
  }: {
  selectedNode: number | null
  setSelectedNode: (id: number | null) => void
  onOpenMarketplace: () => void
  projectId: string
  }) {
  const [toolPaletteCollapsed, setToolPaletteCollapsed] = useState<boolean>(false)
  
  // Get project-specific workflow nodes
  const workflowNodes = projectWorkflowNodes[projectId] || defaultWorkflowNodes
  
  // Calculate bezier curve path between two nodes
  const getConnectionPath = (fromNode: typeof defaultWorkflowNodes[0], toNode: typeof defaultWorkflowNodes[0]) => {
    const nodeWidth = 180
    const nodeHeight = 100 // Approximate height including header + body
    
    const startX = fromNode.x + nodeWidth
    const startY = fromNode.y + nodeHeight / 2
    const endX = toNode.x
    const endY = toNode.y + nodeHeight / 2
    
    // Calculate control point offset based on distance
    const dx = endX - startX
    const controlPointOffset = Math.min(Math.abs(dx) * 0.4, 80)
    
    const cp1X = startX + controlPointOffset
    const cp1Y = startY
    const cp2X = endX - controlPointOffset
    const cp2Y = endY
    
    return {
      path: `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
    }
  }

  // Get node icon component
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "start": return Play
      case "end": return Square
      case "llm": return Bot
      case "http": return Globe
      case "condition": return GitBranch
      case "database": return Database
      case "code": return Braces
      default: return Circle
    }
  }

  return (
    <div className="relative flex flex-1 overflow-hidden">
      {/* Tool Palette */}
      <div className={`flex flex-col border-r border-[#E5E7EB] bg-white transition-all ${toolPaletteCollapsed ? "w-12" : "w-56"}`}>
        {/* Palette Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-3 py-2">
          {!toolPaletteCollapsed && (
            <span className="text-sm font-medium text-foreground">Nodes</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setToolPaletteCollapsed(!toolPaletteCollapsed)}
          >
            {toolPaletteCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Palette Content */}
        <ScrollArea className="flex-1">
          {toolPaletteCollapsed ? (
            // Collapsed view - just icons
            <div className="flex flex-col items-center gap-1 p-2">
              {toolPaletteCategories.flatMap((cat) =>
                cat.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      className={`flex h-8 w-8 cursor-grab items-center justify-center rounded ${item.color} text-white transition-transform hover:scale-110`}
                      title={item.name}
                      draggable
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  )
                })
              )}
            </div>
          ) : (
            // Expanded view
            <div className="p-3 space-y-4">
              {toolPaletteCategories.map((category) => (
                <div key={category.name}>
                  <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">{category.name}</p>
                  <div className="space-y-1">
                    {category.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={item.id}
                          className="group flex cursor-grab items-start gap-2.5 rounded-lg border border-transparent p-2 transition-all hover:border-[#E5E7EB] hover:bg-[#F5F7FA]"
                          draggable
                        >
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${item.color} text-white`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* Marketplace Link */}
              <div
                onClick={onOpenMarketplace}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-dashed border-[#ee3224]/40 p-3 transition-all hover:border-[#ee3224] hover:bg-[#ee3224]/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#ee3224]/10">
                  <Puzzle className="h-4 w-4 text-[#ee3224]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#ee3224]">Marketplace</p>
                  <p className="text-xs text-muted-foreground">Browse more components</p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 overflow-auto"
          style={{
            backgroundColor: "#F5F7FA",
            backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Connection Lines SVG */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: "1200px", height: "600px" }}>
            {workflowConnections.map((conn, idx) => {
              const fromNode = workflowNodes.find((n) => n.id === conn.from)
              const toNode = workflowNodes.find((n) => n.id === conn.to)
              if (!fromNode || !toNode) return null
              
              const { path } = getConnectionPath(fromNode, toNode)
              
              return (
                <path
                  key={idx}
                  d={path}
                  fill="none"
                  stroke="#C0C6D0"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )
            })}
          </svg>

          {/* Workflow Nodes */}
          {workflowNodes.map((node) => {
            const NodeIcon = getNodeIcon(node.type)
            const isSelected = selectedNode === node.id
            
            return (
              <div
                key={node.id}
                className={`absolute cursor-pointer rounded-lg border-2 bg-white shadow-sm transition-all hover:shadow-md ${
                  isSelected
                    ? "border-[#ee3224] ring-2 ring-[#ee3224]/20"
                    : "border-[#E5E7EB]"
                }`}
                style={{ left: node.x, top: node.y, width: "180px" }}
                onClick={() => setSelectedNode(node.id)}
              >
                {/* Node Header */}
                <div className="flex items-center gap-2 border-b border-[#E5E7EB] px-3 py-2">
                  <div className={`flex h-6 w-6 items-center justify-center rounded ${node.color} text-white`}>
                    <NodeIcon className="h-3.5 w-3.5" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground truncate">{node.name}</span>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Node Body */}
                <div className="p-2 space-y-1.5">
                  {/* Inputs */}
                  {node.inputs.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase">Input</p>
                      <div className="flex flex-wrap gap-1">
                        {node.inputs.map((input, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-blue-50 text-blue-600 border border-blue-200">
                            {input}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Outputs */}
                  {node.outputs.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase">Output</p>
                      <div className="flex flex-wrap gap-1">
                        {node.outputs.map((output, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-emerald-50 text-emerald-600 border border-emerald-200">
                            {output}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                
              </div>
            )
          })}
        </div>

        {/* Canvas Toolbar */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white p-1 shadow-sm">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="px-2 text-xs text-muted-foreground">100%</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="mx-1 h-4 w-px bg-[#E5E7EB]" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Run Button */}
        <div className="absolute bottom-4 right-4">
          <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e] shadow-md">
            <Play className="h-4 w-4" />
            Run Workflow
          </Button>
        </div>
      </div>
    </div>
  )
}

// Code Editor Component
function CodeEditor({ projectId }: { projectId: string }) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["src"])
  const [activeFile, setActiveFile] = useState("agent.ts")
  const [terminalExpanded, setTerminalExpanded] = useState(true)
  
  // Get project-specific code content
  const codeContent = projectCodeContent[projectId] || defaultCodeContent

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
