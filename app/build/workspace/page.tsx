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
  RefreshCw,
  History,
  X,
  GitCommit,
  Github,
  Lock,
  Shield,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  CheckCircle,
  Mic,
  FileText,
  ArrowUp,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

type Mode = "build-ai" | "workflow" | "code"
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

// Mock Git connection data
const gitConnection = {
  provider: "GitHub",
  repository: "Enterprise Corp / sales-agent-repo",
  branch: "main",
  status: "connected" as const, // "connected" | "unsaved" | "error" | "disconnected"
  unsavedCount: 0,
  lastSync: "2025-03-12T12:30:00Z",
  commitHash: "a1b2c3d",
  syncSettings: {
    autoSyncOnDeploy: true,
    commitWorkflows: true,
    commitPrompts: true,
    commitKnowledge: false,
  },
  branchProtection: {
    protected: true,
    requiresPR: true,
  },
}

// Mock version history data
const versionHistory = [
  {
    id: "v23",
    timestamp: "2025-03-12T14:30:00Z",
    author: "Zoey Doyle",
    note: "Added lead scoring node",
    type: "manual" as const,
    changes: { added: 1, modified: 2, removed: 0 },
    isCurrent: true,
    gitSynced: false,
  },
  {
    id: "v22",
    timestamp: "2025-03-11T16:15:00Z",
    author: "Zoey Doyle",
    note: "Fixed Slack notification",
    type: "manual" as const,
    changes: { added: 0, modified: 1, removed: 0 },
    isCurrent: false,
    gitSynced: true,
  },
  {
    id: "v21",
    timestamp: "2025-03-10T10:00:00Z",
    author: "Alex Chen",
    note: "Initial workflow",
    type: "auto" as const,
    changes: { added: 5, modified: 0, removed: 0 },
    isCurrent: false,
    gitSynced: true,
  },
  {
    id: "v20",
    timestamp: "2025-03-09T15:45:00Z",
    author: "Zoey Doyle",
    note: "Added email trigger",
    type: "git" as const,
    changes: { added: 1, modified: 1, removed: 0 },
    isCurrent: false,
    gitSynced: true,
  },
  {
    id: "v19",
    timestamp: "2025-03-08T11:00:00Z",
    author: "Zoey Doyle",
    note: "Updated prompt template",
    type: "manual" as const,
    changes: { added: 0, modified: 2, removed: 0 },
    isCurrent: false,
    gitSynced: false,
  },
  {
    id: "v18",
    timestamp: "2025-03-07T09:30:00Z",
    author: "Alex Chen",
    note: "Connected Salesforce",
    type: "manual" as const,
    changes: { added: 1, modified: 0, removed: 0 },
    isCurrent: false,
    gitSynced: true,
  },
  {
    id: "v17",
    timestamp: "2025-03-06T14:00:00Z",
    author: "Zoey Doyle",
    note: "Performance optimization",
    type: "auto" as const,
    changes: { added: 0, modified: 3, removed: 1 },
    isCurrent: false,
    gitSynced: false,
  },
  {
    id: "v16",
    timestamp: "2025-03-05T10:15:00Z",
    author: "Zoey Doyle",
    note: "Initial commit",
    type: "git" as const,
    changes: { added: 6, modified: 0, removed: 0 },
    isCurrent: false,
    gitSynced: true,
  },
]

// Mock git activity log
const gitActivityLog = [
  { timestamp: "2025-03-12T14:30:00Z", action: "Pushed v23 to main", user: "Zoey Doyle" },
  { timestamp: "2025-03-11T16:15:00Z", action: "Pulled latest changes", user: "Zoey Doyle" },
  { timestamp: "2025-03-10T10:00:00Z", action: "Created branch feature/lead-scoring", user: "Alex Chen" },
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

// Template-specific Build with AI conversation data (for new projects from templates)
const templateBuildAIChat: Record<string, Array<{ role: string; content: string }>> = {
  "meeting-notes": [
    { 
      role: "assistant", 
      content: "I've created your Meeting Notes Agent with 4 steps:\n\n1. Receive meeting recording (from Zoom, Teams, or upload)\n2. Transcribe audio to text (using Whisper AI)\n3. Summarize key points (extract decisions and action items)\n4. Send to Slack (post to #meetings channel)\n\nWould you like to:\n- Add email delivery as an alternative?\n- Change the summary format (bullet points vs. paragraph)?\n- Add a human approval step before sending?"
    },
  ],
  "email-triage": [
    { 
      role: "assistant", 
      content: "I've created your Email Triage Agent with 5 steps:\n\n1. Connect to inbox (Gmail, Outlook, or IMAP)\n2. Analyze email content (extract sender, subject, urgency)\n3. Categorize by priority (urgent, important, low priority)\n4. Draft response suggestions (AI-generated replies)\n5. Move to appropriate folder or label\n\nWould you like to:\n- Add auto-reply for specific categories?\n- Set up VIP sender rules?\n- Connect to your calendar for meeting requests?"
    },
  ],
  "data-analyst": [
    { 
      role: "assistant", 
      content: "I've created your Data Analyst Agent with 4 steps:\n\n1. Connect to data source (CSV, database, or API)\n2. Clean and transform data (handle missing values, normalize)\n3. Analyze patterns (statistical analysis, trends)\n4. Generate visualizations (charts, dashboards)\n\nWould you like to:\n- Add scheduled reports?\n- Set up anomaly detection alerts?\n- Export to specific formats (PDF, Excel, Sheets)?"
    },
  ],
  "calendar": [
    { 
      role: "assistant", 
      content: "I've created your Calendar Optimizer Agent with 4 steps:\n\n1. Sync with calendar (Google Calendar, Outlook)\n2. Analyze meeting patterns (frequency, duration, attendees)\n3. Suggest optimizations (batch meetings, protect focus time)\n4. Auto-schedule based on preferences\n\nWould you like to:\n- Add buffer time between meetings?\n- Set up recurring availability blocks?\n- Integrate with scheduling tools (Calendly, etc.)?"
    },
  ],
  "research": [
    { 
      role: "assistant", 
      content: "I've created your Research Assistant Agent with 4 steps:\n\n1. Receive research topic (text input or voice)\n2. Search multiple sources (web, academic papers, news)\n3. Synthesize findings (summarize, compare perspectives)\n4. Generate report (structured document with citations)\n\nWould you like to:\n- Add fact-checking step?\n- Include competitor analysis?\n- Set up recurring research on topics?"
    },
  ],
  "social-media": [
    { 
      role: "assistant", 
      content: "I've created your Social Media Manager Agent with 5 steps:\n\n1. Generate content ideas (based on trends, audience)\n2. Create posts (text, images, hashtags)\n3. Schedule across platforms (Twitter, LinkedIn, Instagram)\n4. Monitor engagement (likes, comments, shares)\n5. Generate performance reports\n\nWould you like to:\n- Add auto-reply to comments?\n- Set up content approval workflow?\n- Connect to analytics dashboards?"
    },
  ],
}

// Template-specific agent steps
const templateAgentSteps: Record<string, Array<{ id: string; name: string; icon: any; type: string; isNew: boolean }>> = {
  "meeting-notes": [
    { id: "step-1", name: "Receive meeting recording", icon: Download, type: "trigger", isNew: false },
    { id: "step-2", name: "Transcribe audio to text", icon: Mic, type: "action", isNew: false },
    { id: "step-3", name: "Summarize key points", icon: FileText, type: "action", isNew: false },
    { id: "step-4", name: "Send to Slack", icon: MessageSquare, type: "output", isNew: false },
  ],
  "email-triage": [
    { id: "step-1", name: "Connect to inbox", icon: Mail, type: "trigger", isNew: false },
    { id: "step-2", name: "Analyze email content", icon: FileText, type: "action", isNew: false },
    { id: "step-3", name: "Categorize by priority", icon: Filter, type: "action", isNew: false },
    { id: "step-4", name: "Draft response suggestions", icon: MessageSquare, type: "action", isNew: false },
    { id: "step-5", name: "Organize in folders", icon: Folder, type: "output", isNew: false },
  ],
  "data-analyst": [
    { id: "step-1", name: "Connect to data source", icon: Database, type: "trigger", isNew: false },
    { id: "step-2", name: "Clean and transform data", icon: RefreshCw, type: "action", isNew: false },
    { id: "step-3", name: "Analyze patterns", icon: FileText, type: "action", isNew: false },
    { id: "step-4", name: "Generate visualizations", icon: Variable, type: "output", isNew: false },
  ],
  "calendar": [
    { id: "step-1", name: "Sync with calendar", icon: Clock, type: "trigger", isNew: false },
    { id: "step-2", name: "Analyze meeting patterns", icon: FileText, type: "action", isNew: false },
    { id: "step-3", name: "Suggest optimizations", icon: Sparkles, type: "action", isNew: false },
    { id: "step-4", name: "Auto-schedule", icon: Check, type: "output", isNew: false },
  ],
  "research": [
    { id: "step-1", name: "Receive research topic", icon: Download, type: "trigger", isNew: false },
    { id: "step-2", name: "Search multiple sources", icon: Search, type: "action", isNew: false },
    { id: "step-3", name: "Synthesize findings", icon: FileText, type: "action", isNew: false },
    { id: "step-4", name: "Generate report", icon: BookOpen, type: "output", isNew: false },
  ],
  "social-media": [
    { id: "step-1", name: "Generate content ideas", icon: Sparkles, type: "trigger", isNew: false },
    { id: "step-2", name: "Create posts", icon: FileText, type: "action", isNew: false },
    { id: "step-3", name: "Schedule across platforms", icon: Clock, type: "action", isNew: false },
    { id: "step-4", name: "Monitor engagement", icon: MessageSquare, type: "action", isNew: false },
    { id: "step-5", name: "Generate reports", icon: Variable, type: "output", isNew: false },
  ],
}

// Template-specific quick suggestions
const templateQuickSuggestions: Record<string, Array<string>> = {
  "meeting-notes": ["Add email delivery", "Change summary format", "Add approval step", "Test with sample"],
  "email-triage": ["Add auto-reply", "Set up VIP rules", "Connect calendar", "Test with sample"],
  "data-analyst": ["Add scheduled reports", "Set up alerts", "Export to PDF", "Test with sample"],
  "calendar": ["Add buffer time", "Set availability blocks", "Connect Calendly", "Test with sample"],
  "research": ["Add fact-checking", "Include competitors", "Set up recurring", "Test with sample"],
  "social-media": ["Add auto-reply", "Set up approval", "Connect analytics", "Test with sample"],
}

// Template names for display
const templateNames: Record<string, string> = {
  "meeting-notes": "Meeting Notes Agent",
  "email-triage": "Email Triage Agent",
  "data-analyst": "Data Analyst Agent",
  "calendar": "Calendar Optimizer",
  "research": "Research Assistant",
  "social-media": "Social Media Manager",
}

// Project-specific Build with AI conversation data
const projectBuildAIChat: Record<string, Array<{ role: string; content: string }>> = {
  "proj-001": [ // Enterprise Sales Agent
    { 
      role: "assistant", 
      content: "I've created your Enterprise Sales Agent with 5 steps:\n\n1. Receive new lead (from Salesforce webhook)\n2. Enrich lead data (using Clearbit API)\n3. Score lead qualification (AI-powered scoring model)\n4. Generate personalized outreach (GPT-4 email template)\n5. Update CRM and schedule follow-up\n\nWould you like to:\n- Add LinkedIn research step?\n- Customize the scoring criteria?\n- Add Slack notification for high-priority leads?"
    },
    { role: "user", content: "Add Slack notification for high-priority leads" },
    { 
      role: "assistant", 
      content: "I've added Slack notification for high-priority leads:\n\nNew Step 6: Notify Sales Team\n- Channel: #sales-hot-leads\n- Trigger: When lead score > 80\n- Include: Lead summary, company info, recommended talking points\n\nThis will alert your sales team immediately when a qualified lead comes in. Want me to adjust the score threshold?"
    },
  ],
  "proj-003": [ // Customer Support Bot
    { 
      role: "assistant", 
      content: "I've built your Customer Support Bot with 4 steps:\n\n1. Receive support ticket (email, chat, or form)\n2. Analyze sentiment and intent (NLP classification)\n3. Route to appropriate team (based on category)\n4. Generate initial response (AI-drafted reply)\n\nWould you like to:\n- Add escalation rules for urgent issues?\n- Connect to your knowledge base?\n- Add CSAT survey after resolution?"
    },
    { role: "user", content: "Connect to our knowledge base for better responses" },
    { 
      role: "assistant", 
      content: "I've connected your knowledge base to improve response quality:\n\nUpdated Step 4: Enhanced AI Response\n- Search knowledge base for relevant articles\n- Include up to 3 related help articles in reply\n- Cite sources for transparency\n\nNew Step 5: Knowledge Gap Detection\n- Flag questions without good KB matches\n- Auto-create draft articles for review\n\nThis should improve first-contact resolution. Want to set up the knowledge base sync?"
    },
  ],
  "proj-005": [ // Invoice Processor
    { 
      role: "assistant", 
      content: "I've created your Invoice Processor with 4 steps:\n\n1. Receive invoice (email attachment or upload)\n2. Extract data with OCR (vendor, amount, line items)\n3. Validate against PO system\n4. Route for approval (based on amount thresholds)\n\nWould you like to:\n- Add duplicate detection?\n- Set up automatic payment scheduling?\n- Add Slack notifications for approvals needed?"
    },
    { role: "user", content: "Add duplicate detection to prevent double payments" },
    { 
      role: "assistant", 
      content: "I've added duplicate detection to your workflow:\n\nNew Step 3: Duplicate Check\n- Compare invoice number, vendor, amount, date\n- Flag potential duplicates within 90 days\n- Auto-reject exact matches\n- Queue near-matches for manual review\n\nThis will help prevent double payments. Should I also add a quarterly audit report for flagged invoices?"
    },
  ],
  "new": [ // New project (no template)
    { 
      role: "assistant", 
      content: "Welcome! I'm ready to help you build your AI agent. Tell me what you'd like to automate, and I'll create the workflow for you.\n\nFor example:\n- \"I want to summarize my meeting recordings and send notes to Slack\"\n- \"Help me process customer emails and route them to the right team\"\n- \"Build an agent that monitors social media mentions\"\n\nWhat would you like to build?"
    },
  ],
}

// Project-specific agent steps for Build with AI preview
const projectAgentSteps: Record<string, Array<{ id: string; name: string; icon: any; type: string; isNew: boolean }>> = {
  "proj-001": [ // Enterprise Sales Agent
    { id: "step-1", name: "Receive new lead", icon: Download, type: "trigger", isNew: false },
    { id: "step-2", name: "Enrich lead data", icon: Database, type: "action", isNew: false },
    { id: "step-3", name: "Score lead qualification", icon: FileText, type: "action", isNew: false },
    { id: "step-4", name: "Generate personalized outreach", icon: Mail, type: "action", isNew: false },
    { id: "step-5", name: "Update CRM", icon: RefreshCw, type: "output", isNew: false },
    { id: "step-6", name: "Notify Sales Team (Slack)", icon: MessageSquare, type: "output", isNew: true },
  ],
  "proj-003": [ // Customer Support Bot
    { id: "step-1", name: "Receive support ticket", icon: Download, type: "trigger", isNew: false },
    { id: "step-2", name: "Analyze sentiment & intent", icon: Bot, type: "action", isNew: false },
    { id: "step-3", name: "Route to team", icon: GitBranch, type: "action", isNew: false },
    { id: "step-4", name: "Generate AI response", icon: MessageSquare, type: "action", isNew: false },
    { id: "step-5", name: "Knowledge gap detection", icon: BookOpen, type: "output", isNew: true },
  ],
  "proj-005": [ // Invoice Processor
    { id: "step-1", name: "Receive invoice", icon: Download, type: "trigger", isNew: false },
    { id: "step-2", name: "Extract data (OCR)", icon: FileText, type: "action", isNew: false },
    { id: "step-3", name: "Duplicate check", icon: Shield, type: "action", isNew: true },
    { id: "step-4", name: "Validate against PO", icon: Check, type: "action", isNew: false },
    { id: "step-5", name: "Route for approval", icon: User, type: "output", isNew: false },
  ],
  "new": [],
}

// Project-specific pending changes for Build with AI
const projectPendingChanges: Record<string, Array<string>> = {
  "proj-001": [
    "Add Slack notification node",
    "Configure #sales-hot-leads channel",
    "Set score threshold to 80",
  ],
  "proj-003": [
    "Connect knowledge base integration",
    "Add KB search to response generation",
    "Enable gap detection logging",
  ],
  "proj-005": [
    "Add duplicate detection step",
    "Configure 90-day lookback window",
    "Set up manual review queue",
  ],
  "new": [],
}

// Project-specific quick suggestions
const projectQuickSuggestions: Record<string, Array<string>> = {
  "proj-001": [
    "Adjust score threshold",
    "Add LinkedIn research",
    "Customize email template",
    "Test with sample lead",
  ],
  "proj-003": [
    "Add escalation rules",
    "Set up CSAT survey",
    "Configure auto-responses",
    "Test with sample ticket",
  ],
  "proj-005": [
    "Add payment scheduling",
    "Configure approval thresholds",
    "Set up audit reports",
    "Test with sample invoice",
  ],
  "new": [
    "Start from a template",
    "Import existing workflow",
    "Browse marketplace",
    "View examples",
  ],
}

export default function ProjectWorkspacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("id") || "1"
  const urlMode = searchParams.get("mode") as ProjectType | null
  const templateId = searchParams.get("template")
  
  // Determine project type from data or URL param (for new projects)
  const projectData = projectsData[projectId] || projectsData["proj-001"]
  const projectType: ProjectType = urlMode || projectData.type
  
  // For code projects, always show code mode. For workflow projects, check if URL has build-ai mode
  const [mode, setMode] = useState<Mode>(
    projectType === "code" ? "code" : 
    urlMode === "build-ai" ? "build-ai" : "workflow"
  )
  
  // Determine the project name - use template name for new projects with templates
  const getInitialProjectName = () => {
    if (projectId === "new" && templateId && templateNames[templateId]) {
      return templateNames[templateId]
    }
    return projectData.name
  }
  const [projectName, setProjectName] = useState(getInitialProjectName())
  
  // Build with AI state - use template-specific data for new projects, project-specific for existing
  const getInitialChat = () => {
    if (projectId === "new" && templateId && templateBuildAIChat[templateId]) {
      return templateBuildAIChat[templateId]
    }
    return projectBuildAIChat[projectId] || projectBuildAIChat["new"]
  }
  
  const getInitialSteps = () => {
    if (projectId === "new" && templateId && templateAgentSteps[templateId]) {
      return templateAgentSteps[templateId]
    }
    return projectAgentSteps[projectId] || projectAgentSteps["new"]
  }
  
  const getQuickSuggestions = () => {
    if (projectId === "new" && templateId && templateQuickSuggestions[templateId]) {
      return templateQuickSuggestions[templateId]
    }
    return projectQuickSuggestions[projectId] || projectQuickSuggestions["new"]
  }
  
  const initialChat = getInitialChat()
  const initialSteps = getInitialSteps()
  const pendingChanges = projectPendingChanges[projectId] || []
  const quickSuggestions = getQuickSuggestions()
  
  const [buildAIChat, setBuildAIChat] = useState(initialChat)
  const [buildAIInput, setBuildAIInput] = useState("")
  const [isAITyping, setIsAITyping] = useState(false)
  const [showProgressiveDisclosure, setShowProgressiveDisclosure] = useState(false)
  const [agentSteps, setAgentSteps] = useState(initialSteps)
  const [hasPendingChanges, setHasPendingChanges] = useState(pendingChanges.length > 0)
  const [isEditingName, setIsEditingName] = useState(false)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState(initialWorkflowChat)
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [showRunSimulation, setShowRunSimulation] = useState(false)
  const [runStatus, setRunStatus] = useState<"idle" | "running" | "completed" | "error">("idle")
  const [runProgress, setRunProgress] = useState(0)
  const [runLogs, setRunLogs] = useState<Array<{ time: string; type: "info" | "success" | "warning" | "error"; message: string }>>([])
  const runLogsEndRef = useRef<HTMLDivElement>(null)
  
  // Version History & Git states
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [showGitSettings, setShowGitSettings] = useState(false)
  const [showVisualDiff, setShowVisualDiff] = useState(false)
  const [selectedVersionForDiff, setSelectedVersionForDiff] = useState<string | null>(null)
  const [compareVersion, setCompareVersion] = useState<string>("v22")
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [gitSyncSettings, setGitSyncSettings] = useState(gitConnection.syncSettings)

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

  useEffect(() => {
    runLogsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [runLogs])

  // Project-specific run simulation logs
  const projectRunLogs: Record<string, Array<{ time: string; type: "info" | "success" | "warning" | "error"; message: string }>> = {
    "proj-001": [ // Enterprise Sales Agent
      { time: "00:00", type: "info", message: "Initializing Enterprise Sales Agent..." },
      { time: "00:01", type: "info", message: "Loading lead qualification model..." },
      { time: "00:02", type: "success", message: "Connected to CRM API (Salesforce)" },
      { time: "00:03", type: "info", message: "Processing incoming lead: john.doe@techcorp.com" },
      { time: "00:04", type: "info", message: "Running qualification scoring algorithm..." },
      { time: "00:05", type: "success", message: "Lead score calculated: 87/100 (High Priority)" },
      { time: "00:06", type: "info", message: "Generating personalized outreach email..." },
      { time: "00:07", type: "success", message: "Email template generated using GPT-4" },
      { time: "00:08", type: "info", message: "Scheduling follow-up sequence..." },
      { time: "00:09", type: "success", message: "CRM record updated successfully" },
      { time: "00:10", type: "success", message: "Workflow completed - Lead processed in 10s" },
    ],
    "proj-002": [ // Data Pipeline v2
      { time: "00:00", type: "info", message: "Starting Data Pipeline v2 execution..." },
      { time: "00:01", type: "info", message: "Connecting to PostgreSQL source..." },
      { time: "00:02", type: "success", message: "Database connection established" },
      { time: "00:03", type: "info", message: "Executing extraction query..." },
      { time: "00:04", type: "info", message: "Retrieved 15,234 records from events table" },
      { time: "00:05", type: "info", message: "Applying transformations..." },
      { time: "00:06", type: "warning", message: "3 records skipped (missing customer_id)" },
      { time: "00:07", type: "info", message: "Enriching data with customer segments..." },
      { time: "00:08", type: "success", message: "Transformation complete: 15,231 records processed" },
      { time: "00:09", type: "info", message: "Uploading to S3 (parquet format)..." },
      { time: "00:10", type: "success", message: "Pipeline completed - s3://analytics/processed/customers/2024-03-15/" },
    ],
    "proj-003": [ // Customer Support Bot
      { time: "00:00", type: "info", message: "Initializing Customer Support Bot..." },
      { time: "00:01", type: "success", message: "NLP model loaded (sentiment + intent)" },
      { time: "00:02", type: "info", message: "Processing test ticket: #TKT-4521" },
      { time: "00:03", type: "info", message: "Analyzing customer message intent..." },
      { time: "00:04", type: "success", message: "Intent detected: billing_inquiry (confidence: 94%)" },
      { time: "00:05", type: "info", message: "Searching knowledge base for relevant answers..." },
      { time: "00:06", type: "success", message: "Found 3 relevant FAQ articles" },
      { time: "00:07", type: "info", message: "Generating contextual response..." },
      { time: "00:08", type: "success", message: "Auto-resolution confidence: 89% - Sending response" },
      { time: "00:09", type: "success", message: "Ticket #TKT-4521 resolved automatically" },
    ],
    "proj-004": [ // Analytics Dashboard API
      { time: "00:00", type: "info", message: "Starting API server on port 3000..." },
      { time: "00:01", type: "success", message: "JWT middleware configured" },
      { time: "00:02", type: "success", message: "CORS enabled for *.company.com" },
      { time: "00:03", type: "info", message: "Running test: GET /api/metrics..." },
      { time: "00:04", type: "success", message: "Response: 200 OK (latency: 45ms)" },
      { time: "00:05", type: "info", message: "Running test: POST /api/track..." },
      { time: "00:06", type: "success", message: "Event tracked successfully" },
      { time: "00:07", type: "info", message: "Running load test: 100 concurrent requests..." },
      { time: "00:08", type: "success", message: "Load test passed - avg latency: 52ms, p99: 120ms" },
      { time: "00:09", type: "success", message: "All API endpoints validated successfully" },
    ],
    "proj-005": [ // Invoice Processor
      { time: "00:00", type: "info", message: "Initializing Invoice Processor..." },
      { time: "00:01", type: "info", message: "Loading document extraction model..." },
      { time: "00:02", type: "success", message: "OCR engine ready (Tesseract + GPT-4V)" },
      { time: "00:03", type: "info", message: "Processing test invoice: INV-2024-0892.pdf" },
      { time: "00:04", type: "info", message: "Extracting fields: vendor, amount, due date..." },
      { time: "00:05", type: "success", message: "Extracted: Acme Corp, $12,450.00, Due: 2024-04-15" },
      { time: "00:06", type: "info", message: "Looking up vendor in database..." },
      { time: "00:07", type: "success", message: "Vendor verified: Acme Corp (ID: VND-0234)" },
      { time: "00:08", type: "warning", message: "Amount exceeds $10K - Routing for approval" },
      { time: "00:09", type: "info", message: "Sending approval request to finance@company.com" },
      { time: "00:10", type: "success", message: "Invoice queued for approval - Workflow complete" },
    ],
    "proj-006": [ // Notification Service
      { time: "00:00", type: "info", message: "Starting Notification Service..." },
      { time: "00:01", type: "success", message: "Email provider (SES) connected" },
      { time: "00:02", type: "success", message: "SMS provider (Twilio) connected" },
      { time: "00:03", type: "success", message: "Push provider (SNS) connected" },
      { time: "00:04", type: "info", message: "Processing test notification batch..." },
      { time: "00:05", type: "info", message: "Sending email to user@example.com..." },
      { time: "00:06", type: "success", message: "Email delivered (MessageId: abc123)" },
      { time: "00:07", type: "info", message: "Sending SMS to +1-555-0123..." },
      { time: "00:08", type: "success", message: "SMS delivered (SID: SM789xyz)" },
      { time: "00:09", type: "success", message: "All notification channels tested successfully" },
    ],
  }

  const handleRunSimulation = () => {
    setShowRunSimulation(true)
    setRunStatus("running")
    setRunProgress(0)
    setRunLogs([])
    
    const logs = projectRunLogs[projectId] || projectRunLogs["proj-001"]
    let currentIndex = 0
    
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setRunLogs(prev => [...prev, logs[currentIndex]])
        setRunProgress(Math.round(((currentIndex + 1) / logs.length) * 100))
        currentIndex++
      } else {
        clearInterval(interval)
        setRunStatus("completed")
      }
    }, 800)
  }

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
                onClick={() => setMode("build-ai")}
                className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-all rounded-md ${
                  mode === "build-ai"
                    ? "bg-[#ee3224] text-white shadow-sm"
                    : "text-[#333] hover:bg-white/50"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Build with AI
              </button>
              <button
                onClick={() => {
                  if (mode === "build-ai") {
                    setShowProgressiveDisclosure(true)
                  } else {
                    setMode("workflow")
                  }
                }}
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
                onClick={() => {
                  if (mode === "build-ai") {
                    setShowProgressiveDisclosure(true)
                  } else {
                    setMode("code")
                  }
                }}
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

          {/* Right: Git Status + Team + Actions */}
          <div className="flex items-center gap-3">
            {/* Git Status Indicator */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setShowGitSettings(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E5E7EB] bg-white hover:bg-[#F5F7FA] transition-colors"
                  >
                    <GitBranch className={`h-4 w-4 ${
                      gitConnection.status === "connected" ? "text-[#22C55E]" :
                      gitConnection.status === "unsaved" ? "text-[#F59E0B]" :
                      gitConnection.status === "error" ? "text-[#ee3224]" : "text-[#6B7280]"
                    }`} />
                    <span className="text-sm text-[#333]">
                      {gitConnection.status === "disconnected" ? "Connect GitHub" : `GitHub: ${gitConnection.branch}`}
                    </span>
                    {gitConnection.status === "connected" && (
                      <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
                    )}
                    {gitConnection.status === "unsaved" && (
                      <>
                        <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                        <span className="text-xs text-[#F59E0B]">{gitConnection.unsavedCount} unsaved</span>
                      </>
                    )}
                    {gitConnection.status === "error" && (
                      <>
                        <div className="h-2 w-2 rounded-full bg-[#ee3224]" />
                        <span className="text-xs text-[#ee3224]">Failed</span>
                      </>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <div className="space-y-1 text-xs">
                    <p className="font-medium">{gitConnection.repository}</p>
                    <p className="text-muted-foreground">Last sync: {new Date(gitConnection.lastSync).toLocaleString()}</p>
                    <p className="text-muted-foreground">Commit: {gitConnection.commitHash}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Version History Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-1.5 border-[#E5E7EB] ${showVersionHistory ? 'bg-[#F5F7FA]' : ''}`}
                    onClick={() => setShowVersionHistory(!showVersionHistory)}
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Version History</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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

            <Button size="sm" className="gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={handleRunSimulation}>
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
          {/* Build with AI Mode - Two Panel Layout */}
          {mode === "build-ai" && projectType === "workflow" ? (
            <>
              {/* Left Panel: Conversation Interface (50% width) */}
              <div className={`flex ${showVersionHistory ? 'w-[35%]' : 'w-[50%]'} flex-col border-r border-[#E5E7EB] bg-white transition-all duration-200`}>
                {/* Chat Header */}
                <div className="flex items-center gap-2 border-b border-[#E5E7EB] px-4 py-3">
                  <MessageSquare className="h-5 w-5 text-[#1F2937]" />
                  <span className="text-sm font-semibold text-[#1F2937]">Tell Me What to Build or Change</span>
                </div>
                
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {buildAIChat.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          msg.role === "user" ? "bg-muted" : "bg-[#ee3224]"
                        }`}>
                          {msg.role === "user" ? (
                            <span className="text-xs font-medium text-muted-foreground">ZD</span>
                          ) : (
                            <Sparkles className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-[#ee3224] text-white"
                              : "bg-[#F5F7FA] border border-[#E5E7EB] text-[#333]"
                          }`}
                        >
                          <div className="whitespace-pre-line">{msg.content}</div>
                        </div>
                      </div>
                    ))}
                    {isAITyping && (
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ee3224]">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg p-3">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-[#6B7280] animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="h-2 w-2 rounded-full bg-[#6B7280] animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="h-2 w-2 rounded-full bg-[#6B7280] animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Quick Suggestions */}
                <div className="px-4 py-2 border-t border-[#E5E7EB] bg-[#F9FAFB]">
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setBuildAIInput(suggestion)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#ee3224] hover:text-[#ee3224] transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="p-4 border-t border-[#E5E7EB] bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Describe what you want to change..."
                      value={buildAIInput}
                      onChange={(e) => setBuildAIInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && buildAIInput.trim()) {
                          setBuildAIChat((prev) => [...prev, { role: "user", content: buildAIInput }])
                          setBuildAIInput("")
                          setIsAITyping(true)
                          setTimeout(() => {
                            setIsAITyping(false)
                            setBuildAIChat((prev) => [...prev, { 
                              role: "assistant", 
                              content: "I've updated the agent based on your request. The changes are ready for your review in the Agent Preview panel. Would you like me to explain what I changed or make any adjustments?" 
                            }])
                          }, 2000)
                        }
                      }}
                      className="flex-1 border-[#E5E7EB]"
                    />
                    <Button 
                      size="icon" 
                      className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                      onClick={() => {
                        if (buildAIInput.trim()) {
                          setBuildAIChat((prev) => [...prev, { role: "user", content: buildAIInput }])
                          setBuildAIInput("")
                          setIsAITyping(true)
                          setTimeout(() => {
                            setIsAITyping(false)
                            setBuildAIChat((prev) => [...prev, { 
                              role: "assistant", 
                              content: "I've updated the agent based on your request. The changes are ready for your review in the Agent Preview panel." 
                            }])
                          }, 2000)
                        }
                      }}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Right Panel: Agent Preview (50% width) */}
              <div className={`flex ${showVersionHistory ? 'w-[35%]' : 'w-[50%]'} flex-col bg-[#F5F7FA] transition-all duration-200`}>
                {/* Preview Header */}
                <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#1F2937]">Agent Preview</span>
                    <Badge className="bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E] text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E] mr-1 animate-pulse" />
                      Live
                    </Badge>
                  </div>
                </div>
                
                {/* Agent Preview Card */}
                <div className="flex-1 overflow-auto p-4">
                  <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 mb-4">
                    {/* Agent Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#ee3224]" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#1F2937]">{projectName}</h3>
                        <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B] text-xs">
                          Draft - Not Deployed
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Steps List */}
                    <div className="space-y-2">
                      {agentSteps.map((step, idx) => {
                        const IconComponent = step.icon
                        return (
                          <div 
                            key={step.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${
                              step.isNew 
                                ? "bg-[#22C55E]/5 border-[#22C55E]" 
                                : "bg-white border-[#E5E7EB]"
                            }`}
                          >
                            <span className="text-sm font-medium text-[#6B7280] w-5">{idx + 1}.</span>
                            <IconComponent className={`h-4 w-4 ${step.isNew ? "text-[#22C55E]" : "text-[#6B7280]"}`} />
                            <span className="text-sm text-[#333] flex-1">{step.name}</span>
                            {step.isNew && (
                              <Sparkles className="h-4 w-4 text-[#22C55E]" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Test Button */}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5"
                      onClick={() => setShowRunSimulation(true)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Test Agent
                    </Button>
                  </div>
                  
                  {/* Change Summary */}
                  {hasPendingChanges && (
                    <div className="bg-[#F5F7FA] rounded-lg border border-[#E5E7EB] p-4">
                      <h4 className="text-sm font-semibold text-[#1F2937] mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        What I'll Do:
                      </h4>
<ul className="space-y-2 text-sm text-[#333] mb-4">
  {pendingChanges.map((change, idx) => (
    <li key={idx} className="flex items-center gap-2">
      <Check className="h-4 w-4 text-[#22C55E]" />
      {change}
    </li>
  ))}
  </ul>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-[#ee3224] hover:bg-[#cc2a1e]"
                          onClick={() => setHasPendingChanges(false)}
                        >
                          Approve Changes
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Left Panel - Canvas */}
              <div className={`flex ${showVersionHistory ? 'w-[55%]' : 'w-[70%]'} flex-col border-r border-[#E5E7EB] transition-all duration-200`}>
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
          </>
          )}

          {/* Version History Panel (Right Sidebar) */}
          {showVersionHistory && (
            <div className="w-[280px] flex-shrink-0 flex flex-col bg-white border-l border-[#E5E7EB] transition-all duration-200">
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-[#1F2937]" />
                  <span className="text-sm font-semibold text-[#1F2937]">Version History</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setShowVersionHistory(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Auto-Save Toggle */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-[#1F2937]">Auto-Save: {autoSaveEnabled ? "On" : "Off"}</p>
                  <p className="text-xs text-[#6B7280]">Last saved: 2 minutes ago</p>
                </div>
                <Switch
                  checked={autoSaveEnabled}
                  onCheckedChange={setAutoSaveEnabled}
                  className="data-[state=checked]:bg-[#ee3224]"
                />
              </div>

              {/* Version List */}
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {versionHistory.map((version) => (
                    <div
                      key={version.id}
                      className="p-3 rounded-md hover:bg-[#F5F7FA] transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        {/* Version Indicator */}
                        <div className={`mt-1 h-3 w-3 rounded-full border-2 ${
                          version.isCurrent 
                            ? "bg-[#ee3224] border-[#ee3224]" 
                            : version.type === "manual" 
                              ? "border-[#8B5CF6] bg-transparent" 
                              : version.type === "auto" 
                                ? "border-[#3B82F6] bg-transparent" 
                                : "border-[#22C55E] bg-transparent"
                        }`} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-[#1F2937]">
                              {version.id} {version.isCurrent && "(Current)"}
                            </span>
                            {version.gitSynced && (
                              <Github className="h-3 w-3 text-[#333]" />
                            )}
                          </div>
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {new Date(version.timestamp).toLocaleDateString("en-US", { 
                              month: "short", 
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit"
                            })}
                          </p>
                          <p className="text-xs text-[#333] truncate mt-0.5">{version.note}</p>
                          <p className="text-xs text-[#6B7280]">by {version.author}</p>
                          
                          {/* Action Buttons - Visible on Hover */}
                          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs px-2 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white"
                              disabled={version.isCurrent}
                            >
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Restore
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs px-2 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white"
                              onClick={() => {
                                setSelectedVersionForDiff(version.id)
                                setShowVisualDiff(true)
                              }}
                            >
                              Compare
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Panel Footer */}
              <div className="border-t border-[#E5E7EB] p-3 space-y-2">
                <button className="text-xs text-[#ee3224] hover:underline w-full text-left">
                  View All 50 Versions
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white"
                >
                  <Download className="h-3 w-3 mr-1.5" />
                  Export Version History
                </Button>
              </div>
            </div>
          )}
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

      {/* Run Simulation Dialog */}
      <Dialog open={showRunSimulation} onOpenChange={setShowRunSimulation}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-[#ee3224]" />
              Run Simulation - {projectName}
            </DialogTitle>
            <DialogDescription>
              {runStatus === "running" ? "Executing workflow..." : runStatus === "completed" ? "Run completed successfully" : "Test run simulation"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{runProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#F5F7FA]">
                <div 
                  className="h-2 rounded-full bg-[#ee3224] transition-all duration-300"
                  style={{ width: `${runProgress}%` }}
                />
              </div>
            </div>
            
            {/* Run Logs */}
            <div className="rounded-lg border border-[#E5E7EB] bg-[#1F2937] p-4 h-[300px] overflow-y-auto font-mono text-sm">
              {runLogs.map((log, index) => (
                <div key={index} className="flex gap-3 py-1">
                  <span className="text-[#6B7280] shrink-0">[{log.time}]</span>
                  <span className={
                    log.type === "success" ? "text-emerald-400" :
                    log.type === "warning" ? "text-amber-400" :
                    log.type === "error" ? "text-red-400" :
                    "text-gray-300"
                  }>
                    {log.type === "success" && "[SUCCESS] "}
                    {log.type === "warning" && "[WARNING] "}
                    {log.type === "error" && "[ERROR] "}
                    {log.type === "info" && "[INFO] "}
                    {log.message}
                  </span>
                </div>
              ))}
              {runStatus === "running" && (
                <div className="flex items-center gap-2 py-1 text-gray-400">
                  <div className="h-2 w-2 rounded-full bg-[#ee3224] animate-pulse" />
                  <span>Processing...</span>
                </div>
              )}
              <div ref={runLogsEndRef} />
            </div>
            
            {/* Stats */}
            {runStatus === "completed" && (
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-[#E5E7EB] bg-[#F5F7FA] p-3 text-center">
                  <p className="text-2xl font-semibold text-[#1F2937]">{runLogs.length}</p>
                  <p className="text-xs text-muted-foreground">Steps Executed</p>
                </div>
                <div className="rounded-lg border border-[#E5E7EB] bg-[#F5F7FA] p-3 text-center">
                  <p className="text-2xl font-semibold text-emerald-600">{runLogs.filter(l => l.type === "success").length}</p>
                  <p className="text-xs text-muted-foreground">Successful</p>
                </div>
                <div className="rounded-lg border border-[#E5E7EB] bg-[#F5F7FA] p-3 text-center">
                  <p className="text-2xl font-semibold text-amber-600">{runLogs.filter(l => l.type === "warning").length}</p>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex justify-end gap-2">
              {runStatus === "completed" && (
                <Button variant="outline" onClick={handleRunSimulation} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Run Again
                </Button>
              )}
              <Button 
                onClick={() => setShowRunSimulation(false)} 
                className={runStatus === "completed" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                variant={runStatus === "completed" ? "default" : "outline"}
              >
                {runStatus === "completed" ? "Done" : "Cancel"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Git Settings Modal */}
      <Dialog open={showGitSettings} onOpenChange={setShowGitSettings}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-[#ee3224]" />
              Project Settings - Git Integration
            </DialogTitle>
            <DialogDescription>Manage version control and sync settings</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Connection Status Card */}
            <div className="rounded-lg bg-[#F5F7FA] border border-[#E5E7EB] p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                <span className="text-sm font-semibold text-[#22C55E]">Connected to GitHub</span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-[#333]"><span className="text-[#6B7280]">Repository:</span> {gitConnection.repository}</p>
                <p className="text-[#333]"><span className="text-[#6B7280]">Current Branch:</span> {gitConnection.branch}</p>
                <p className="text-[#333]"><span className="text-[#6B7280]">Last Sync:</span> {new Date(gitConnection.lastSync).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-xs">Disconnect</Button>
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Sync Now
                </Button>
                <Button variant="outline" size="sm" className="text-xs">Change Repository</Button>
              </div>
            </div>

            {/* Sync Settings */}
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-4 space-y-4">
              <h3 className="text-sm font-semibold text-[#1F2937]">Sync Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="autoSync" 
                    checked={gitSyncSettings.autoSyncOnDeploy}
                    onCheckedChange={(checked) => setGitSyncSettings(prev => ({...prev, autoSyncOnDeploy: !!checked}))}
                  />
                  <div>
                    <Label htmlFor="autoSync" className="text-sm font-medium text-[#1F2937]">Auto-sync on deploy</Label>
                    <p className="text-xs text-[#6B7280]">Automatically commit on each deployment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="commitWorkflows" 
                    checked={gitSyncSettings.commitWorkflows}
                    onCheckedChange={(checked) => setGitSyncSettings(prev => ({...prev, commitWorkflows: !!checked}))}
                  />
                  <div>
                    <Label htmlFor="commitWorkflows" className="text-sm font-medium text-[#1F2937]">Commit workflow changes to Git</Label>
                    <p className="text-xs text-[#6B7280]">Export workflow JSON to repo</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="commitPrompts" 
                    checked={gitSyncSettings.commitPrompts}
                    onCheckedChange={(checked) => setGitSyncSettings(prev => ({...prev, commitPrompts: !!checked}))}
                  />
                  <div>
                    <Label htmlFor="commitPrompts" className="text-sm font-medium text-[#1F2937]">Commit prompt templates to Git</Label>
                    <p className="text-xs text-[#6B7280]">Sanitized, no secrets</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="commitKnowledge" 
                    checked={gitSyncSettings.commitKnowledge}
                    onCheckedChange={(checked) => setGitSyncSettings(prev => ({...prev, commitKnowledge: !!checked}))}
                  />
                  <div>
                    <Label htmlFor="commitKnowledge" className="text-sm font-medium text-[#1F2937]">Commit knowledge base references to Git</Label>
                    <p className="text-xs text-[#6B7280]">Not recommended</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Label className="text-sm font-medium text-[#1F2937]">Protected Branch</Label>
                <Select defaultValue="main">
                  <SelectTrigger className="w-48 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                    <SelectItem value="staging">staging</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-[#6B7280] mt-1">Changes require pull request review</p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="rounded-lg bg-[#FEF2F2] border border-[#FECACA] p-4">
              <div className="flex gap-3">
                <Lock className="h-4 w-4 text-[#DC2626] mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#991B1B]">Important Security Notice</h4>
                  <p className="text-xs text-[#991B1B] mt-1">
                    Credentials and secrets are NEVER synced to Git. They are stored securely in Connections and scoped by environment (Dev/Staging/Prod).
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Git Activity */}
            <div>
              <h3 className="text-sm font-semibold text-[#1F2937] mb-3">Recent Git Activity</h3>
              <div className="space-y-2">
                {gitActivityLog.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <GitCommit className="h-3 w-3 text-[#6B7280]" />
                    <span className="text-[#6B7280]">
                      {new Date(activity.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </span>
                    <span className="text-[#333]">{activity.action}</span>
                    <span className="text-[#6B7280]">by {activity.user}</span>
                  </div>
                ))}
              </div>
              <button className="text-xs text-[#ee3224] hover:underline mt-2">View Full Git Log</button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowGitSettings(false)}>Cancel</Button>
            <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => setShowGitSettings(false)}>Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visual Diff Modal */}
      <Dialog open={showVisualDiff} onOpenChange={setShowVisualDiff}>
        <DialogContent className="max-w-[1000px] w-[95vw] max-h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#E5E7EB]">
            <DialogTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-[#ee3224]" />
              Compare Versions
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-3 mt-3">
                {/* Version Selectors */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-[#6B7280]">Compare</span>
                  <Select defaultValue="v23">
                    <SelectTrigger className="w-36 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {versionHistory.map(v => (
                        <SelectItem key={v.id} value={v.id}>{v.id} {v.isCurrent && "(Current)"}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-[#6B7280]">vs</span>
                  <Select value={compareVersion} onValueChange={setCompareVersion}>
                    <SelectTrigger className="w-36 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {versionHistory.filter(v => !v.isCurrent).map(v => (
                        <SelectItem key={v.id} value={v.id}>{v.id}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Diff Statistics - On separate row */}
                <div className="flex items-center gap-2 flex-wrap">
                  {projectType === "code" ? (
                    <>
                      <Badge className="bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]">+12 lines</Badge>
                      <Badge className="bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]">-3 lines</Badge>
                      <Badge variant="outline">1 file changed</Badge>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]">+1 Added</Badge>
                      <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]">2 Modified</Badge>
                      <Badge className="bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]">0 Removed</Badge>
                      <Badge variant="outline">5 Unchanged</Badge>
                    </>
                  )}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto px-6 py-4 min-h-0">
            {projectType === "code" ? (
              /* Code Diff View for code-based projects */
              <div className="rounded-lg border border-[#E5E7EB] bg-[#1E1E1E] overflow-hidden h-[320px] flex flex-col">
                {/* File Header */}
                <div className="bg-[#2D2D2D] border-b border-[#404040] px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-sm font-mono text-[#E5E7EB]">src/services/dataProcessor.ts</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#22C55E]">+12 lines</span>
                    <span className="text-[#DC2626]">-3 lines</span>
                  </div>
                </div>
                {/* Code Diff Content */}
                <div className="flex-1 overflow-auto font-mono text-xs">
                  {/* Unchanged lines */}
                  <div className="flex">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#6B7280] bg-[#1E1E1E] select-none border-r border-[#404040]">14</div>
                    <div className="flex-1 py-0.5 px-3 text-[#D4D4D4]">{"  const processData = async (input: DataInput) => {"}</div>
                  </div>
                  <div className="flex">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#6B7280] bg-[#1E1E1E] select-none border-r border-[#404040]">15</div>
                    <div className="flex-1 py-0.5 px-3 text-[#D4D4D4]">{"    const validated = validateInput(input);"}</div>
                  </div>
                  {/* Removed lines */}
                  <div className="flex bg-[#3D1F1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#F87171] bg-[#4C1D1D] select-none border-r border-[#7F1D1D]">16</div>
                    <div className="flex-1 py-0.5 px-3 text-[#F87171]">{"−   const result = transform(validated);"}</div>
                  </div>
                  <div className="flex bg-[#3D1F1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#F87171] bg-[#4C1D1D] select-none border-r border-[#7F1D1D]">17</div>
                    <div className="flex-1 py-0.5 px-3 text-[#F87171]">{"−   return result;"}</div>
                  </div>
                  {/* Added lines */}
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">16</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"   // Apply new transformation pipeline"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">17</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"   const enriched = await enrichData(validated);"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">18</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"   const transformed = applyTransforms(enriched);"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">19</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"   const validated = runValidation(transformed);"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">20</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"   return validated;"}</span></div>
                  </div>
                  {/* Unchanged lines */}
                  <div className="flex">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#6B7280] bg-[#1E1E1E] select-none border-r border-[#404040]">21</div>
                    <div className="flex-1 py-0.5 px-3 text-[#D4D4D4]">{"  };"}</div>
                  </div>
                  <div className="flex">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#6B7280] bg-[#1E1E1E] select-none border-r border-[#404040]">22</div>
                    <div className="flex-1 py-0.5 px-3 text-[#D4D4D4]">{""}</div>
                  </div>
                  {/* More added lines */}
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">23</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"  // New helper function for data enrichment"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">24</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"  const enrichData = async (data: ValidatedData) => {"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">25</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"    const metadata = await fetchMetadata(data.id);"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">26</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"    return { ...data, metadata };"}</span></div>
                  </div>
                  <div className="flex bg-[#1F3D1F]">
                    <div className="w-12 text-right pr-3 py-0.5 text-[#4ADE80] bg-[#1D4C1D] select-none border-r border-[#166534]">27</div>
                    <div className="flex-1 py-0.5 px-3 text-[#4ADE80]">{"+ "}<span className="bg-[#166534] px-0.5">{"  };"}</span></div>
                  </div>
                </div>
              </div>
            ) : (
              /* Workflow Diff View for workflow-based projects */
              <div className="grid grid-cols-2 gap-4 h-[320px]">
                {/* Current Version Canvas */}
                <div className="rounded-lg border border-[#E5E7EB] bg-[#F5F7FA] overflow-hidden flex flex-col min-w-0">
                  <div className="bg-white border-b border-[#E5E7EB] px-3 py-2 flex-shrink-0">
                    <span className="text-sm font-medium text-[#1F2937]">v23 (Current)</span>
                  </div>
                  <div className="flex-1 relative overflow-hidden" style={{ backgroundImage: "radial-gradient(#C0C6CA 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                    {/* Mock workflow nodes - Current version with added node - using percentages */}
                    <div className="absolute left-[5%] top-[20%] w-[100px] h-[60px] rounded-lg border-2 border-[#E5E7EB] bg-white shadow-sm flex flex-col">
                      <div className="bg-emerald-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-t-md">Start</div>
                      <div className="flex-1 flex items-center justify-center text-[10px] text-[#333] px-1 text-center">Lead Received</div>
                    </div>
                    <div className="absolute left-[35%] top-[10%] w-[100px] h-[60px] rounded-lg border-2 border-[#22C55E] bg-[#F0FDF4] shadow-sm flex flex-col">
                      <div className="bg-purple-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-t-md">LLM</div>
                      <div className="flex-1 flex items-center justify-center text-[10px] text-[#333] px-1 text-center">Lead Scoring</div>
                      <Badge className="absolute -top-1.5 -right-1.5 text-[8px] px-1 py-0 h-4 bg-[#22C55E]">NEW</Badge>
                    </div>
                    <div className="absolute left-[35%] top-[50%] w-[100px] h-[60px] rounded-lg border-2 border-[#F59E0B] bg-[#FFFBEB] shadow-sm flex flex-col">
                      <div className="bg-purple-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-t-md">LLM</div>
                      <div className="flex-1 flex items-center justify-center text-[10px] text-[#333] px-1 text-center">Qualify Lead</div>
                    </div>
                    <div className="absolute right-[5%] top-[30%] w-[100px] h-[60px] rounded-lg border-2 border-[#E5E7EB] bg-white shadow-sm flex flex-col">
                      <div className="bg-red-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-t-md">Email</div>
                      <div className="flex-1 flex items-center justify-center text-[10px] text-[#333] px-1 text-center">Send Outreach</div>
                    </div>
                  </div>
                </div>
                
                {/* Previous Version Canvas */}
                <div className="rounded-lg border border-[#E5E7EB] bg-[#F5F7FA] overflow-hidden flex flex-col min-w-0">
                  <div className="bg-white border-b border-[#E5E7EB] px-3 py-2 flex-shrink-0">
                    <span className="text-sm font-medium text-[#1F2937]">{compareVersion}</span>
                  </div>
                  <div className="flex-1 relative overflow-hidden" style={{ backgroundImage: "radial-gradient(#C0C6CA 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                    {/* Mock workflow nodes - Previous version without added node */}
                    <div className="absolute left-[5%] top-[20%] w-[100px] h-[60px] rounded-lg border-2 border-[#E5E7EB] bg-white shadow-sm flex flex-col">
                      <div className="bg-emerald-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-t-md">Start</div>
                      <div className="flex-1 flex items-center justify-center text-[10px] text-[#333] px-1 text-center">Lead Received</div>
                    </div>
                    <div className="absolute left-[35%] top-[30%] w-[100px] h-[60px] rounded-lg border-2 border-[#E5E7EB] bg-white shadow-sm flex flex-col">
                      <div className="bg-purple-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-t-md">LLM</div>
                      <div className="flex-1 flex items-center justify-center text-[10px] text-[#333] px-1 text-center">Qualify Lead</div>
                    </div>
                    <div className="absolute right-[5%] top-[30%] w-[100px] h-[60px] rounded-lg border-2 border-[#E5E7EB] bg-white shadow-sm flex flex-col">
                      <div className="bg-red-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-t-md">Email</div>
                      <div className="flex-1 flex items-center justify-center text-[10px] text-[#333] px-1 text-center">Send Outreach</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Change Summary */}
          <div className="rounded-lg bg-[#F5F7FA] border border-[#E5E7EB] p-3 mx-6">
            <h4 className="text-sm font-semibold text-[#1F2937] mb-2">Change Summary</h4>
            <div className="space-y-1 text-xs">
              {projectType === "code" ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#22C55E] flex-shrink-0" />
                    <span className="text-[#333]"><span className="font-medium">Added:</span> enrichData() helper function</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#F59E0B] flex-shrink-0" />
                    <span className="text-[#333]"><span className="font-medium">Modified:</span> processData() - added enrichment pipeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#DC2626] flex-shrink-0" />
                    <span className="text-[#333]"><span className="font-medium">Removed:</span> direct transform() call</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#22C55E] flex-shrink-0" />
                    <span className="text-[#333]"><span className="font-medium">Added:</span> "Lead Scoring" node</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#F59E0B] flex-shrink-0" />
                    <span className="text-[#333]"><span className="font-medium">Modified:</span> "Qualify Lead" node (updated prompt)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#F59E0B] flex-shrink-0" />
                    <span className="text-[#333]"><span className="font-medium">Modified:</span> "Slack Notify" node (updated config)</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="flex flex-col gap-3 px-6 py-4 border-t border-[#E5E7EB] bg-white">
            <p className="text-xs text-[#F59E0B]">This will overwrite current version. This action can be undone.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Download className="h-3 w-3" />
                Export Diff
              </Button>
              <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowVisualDiff(false)}>Cancel</Button>
              <Button size="sm" className="bg-[#ee3224] hover:bg-[#cc2a1e] text-xs">Restore {compareVersion}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Progressive Disclosure Modal */}
      <Dialog open={showProgressiveDisclosure} onOpenChange={setShowProgressiveDisclosure}>
        <DialogContent className="max-w-[500px] p-0 overflow-hidden">
          {/* Modal Header */}
          <div className="text-center pt-8 pb-4 px-8">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-[#ee3224]" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#1F2937]">
                You're Ready for Visual Editing!
              </DialogTitle>
              <DialogDescription className="text-sm text-[#333] mt-3">
                Great news! Your agent is built. You can now:
              </DialogDescription>
            </DialogHeader>
          </div>
          
          {/* Modal Body */}
          <div className="px-8 pb-4">
            <ul className="space-y-2 text-sm text-[#333]">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#22C55E]" />
                See the visual workflow behind your agent
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#22C55E]" />
                Customize individual steps with more control
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#22C55E]" />
                Add conditional logic and branching
              </li>
            </ul>
            <p className="text-sm text-[#6B7280] italic mt-4">
              Your conversation history is preserved. Switch back anytime.
            </p>
          </div>
          
          {/* Modal Footer */}
          <div className="px-8 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB] flex flex-col gap-2">
            <Button 
              className="w-full bg-[#ee3224] hover:bg-[#cc2a1e]"
              onClick={() => {
                setShowProgressiveDisclosure(false)
                setMode("workflow")
              }}
            >
              Got It, Show Me the Workflow
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowProgressiveDisclosure(false)}
            >
              Stay in Build with AI
            </Button>
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
