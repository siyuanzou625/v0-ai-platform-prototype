"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Store,
  Bot,
  FileText,
  Puzzle,
  CheckCircle2,
  Star,
  Download,
  Lock,
  X,
  Share2,
  Flag,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  Book,
  GraduationCap,
  Video,
  FileCode,
  Megaphone,
  HelpCircle,
  ChevronDown,
  Users,
  ExternalLink,
  Copy,
  CheckCheck,
  Clock,
  GitBranch,
  Calendar,
  Tag,
  Shield,
  Zap,
} from "lucide-react"

// Types
type CreatorTier = "Platinum" | "Gold" | "Silver" | "Bronze"

interface Agent {
  id: string
  name: string
  tagline: string
  category: string
  creator: string
  creatorInitials: string
  verified: boolean
  tier: CreatorTier
  rating: number
  reviews: number
  installs: string
  price: string
  tags: string[]
  description: string
  compatibility: string[]
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  complexity: string
  industry: string
  creator: string
  creatorInitials: string
  featured: boolean
  forks: number
  uses: string
  lastUpdated: string
  tags: string[]
  preview: string
}

interface Plugin {
  id: string
  name: string
  description: string
  category: string
  platform: string
  creator: string
  creatorInitials: string
  verified: boolean
  tier: CreatorTier
  downloads: string
  version: string
  compatible: boolean
  permissions: string[]
  tags: string[]
}

// Mock Agent Data (9 agents)
const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Briefly AI",
    tagline: "Meetings, summarized.",
    category: "Productivity",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.7,
    reviews: 342,
    installs: "12.4K",
    price: "Free",
    tags: ["Meetings", "Transcription", "Offline"],
    description: "Real-time meeting transcription, auto-summaries, and action item extraction",
    compatibility: ["Desktop", "Web"],
  },
  {
    id: "agent-002",
    name: "InboxIQ AI",
    tagline: "Your inbox, intelligently managed.",
    category: "Productivity",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.9,
    reviews: 521,
    installs: "18.2K",
    price: "Free",
    tags: ["Email", "Drafting", "Privacy"],
    description: "Privately triage, summarize, and draft email responses with context-aware AI",
    compatibility: ["Web", "Desktop", "Mobile"],
  },
  {
    id: "agent-003",
    name: "MindLink AI",
    tagline: "Connect your ideas.",
    category: "Knowledge",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.5,
    reviews: 189,
    installs: "5.6K",
    price: "Free",
    tags: ["Notes", "Knowledge Graph", "Search"],
    description: "Auto-summarize content and link related notes into a personal knowledge graph",
    compatibility: ["Desktop", "Web", "Mobile"],
  },
  {
    id: "agent-004",
    name: "FocusFlow AI",
    tagline: "Work smarter, not harder.",
    category: "Productivity",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.3,
    reviews: 156,
    installs: "4.3K",
    price: "Free",
    tags: ["Tasks", "Time Management", "Productivity"],
    description: "Smart task management and time optimization based on your work patterns",
    compatibility: ["Desktop", "Mobile"],
  },
  {
    id: "agent-005",
    name: "LocalLens AI",
    tagline: "Find anything. Privately.",
    category: "Knowledge",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.1,
    reviews: 98,
    installs: "2.1K",
    price: "Free",
    tags: ["Search", "Privacy", "Local"],
    description: "Private, on-device semantic search across all your files, emails, and messages",
    compatibility: ["Desktop", "Web", "Mobile"],
  },
  {
    id: "agent-006",
    name: "SlideCraft AI",
    tagline: "From notes to slides, instantly.",
    category: "Content",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.8,
    reviews: 267,
    installs: "6.8K",
    price: "Free",
    tags: ["Presentations", "Design", "Automation"],
    description: "Generate beautiful presentations from your notes with AI-powered design",
    compatibility: ["Web", "Desktop"],
  },
  {
    id: "agent-007",
    name: "Research Companion",
    tagline: "Deep dive into any topic.",
    category: "Knowledge",
    creator: "Academic Labs",
    creatorInitials: "AL",
    verified: false,
    tier: "Silver",
    rating: 4.3,
    reviews: 156,
    installs: "5.6K",
    price: "Free",
    tags: ["Research", "Citations", "Academic"],
    description: "AI-powered literature review and research synthesis tool",
    compatibility: ["Web"],
  },
  {
    id: "agent-008",
    name: "Code Reviewer",
    tagline: "AI-powered code analysis.",
    category: "Development",
    creator: "DevTools Inc",
    creatorInitials: "DT",
    verified: false,
    tier: "Gold",
    rating: 4.6,
    reviews: 203,
    installs: "3.2K",
    price: "Free",
    tags: ["Code", "Review", "GitHub"],
    description: "Automated code review with security scanning and best practices",
    compatibility: ["Web", "Desktop"],
  },
  {
    id: "agent-009",
    name: "Social Media Scheduler",
    tagline: "Auto-post across platforms.",
    category: "Content",
    creator: "Marketing Pro",
    creatorInitials: "MP",
    verified: false,
    tier: "Silver",
    rating: 4.2,
    reviews: 134,
    installs: "2.8K",
    price: "$4.99/mo",
    tags: ["Social", "Scheduling", "Analytics"],
    description: "Schedule and analyze social media posts across multiple platforms",
    compatibility: ["Web", "Mobile"],
  },
]

// Mock Template Data (9 templates)
const templates: Template[] = [
  {
    id: "template-001",
    name: "Meeting Notes Automation",
    description: "Auto-summarize and distribute meeting notes to all participants",
    category: "Workflow",
    complexity: "No-Code",
    industry: "General",
    creator: "Platform Team",
    creatorInitials: "PT",
    featured: true,
    forks: 234,
    uses: "1.2K",
    lastUpdated: "2d ago",
    tags: ["No-Code", "Meetings", "Slack"],
    preview: "trigger: meeting_end -> summarize -> notify_slack",
  },
  {
    id: "template-002",
    name: "Email Triage Workflow",
    description: "Categorize and prioritize incoming emails automatically",
    category: "Automation",
    complexity: "No-Code",
    industry: "General",
    creator: "Platform Team",
    creatorInitials: "PT",
    featured: true,
    forks: 312,
    uses: "2.3K",
    lastUpdated: "5d ago",
    tags: ["No-Code", "Email", "Priority"],
    preview: "trigger: new_email -> classify -> route_to_folder",
  },
  {
    id: "template-003",
    name: "Lead Qualification Pipeline",
    description: "Score and route sales leads based on custom criteria",
    category: "Data Pipeline",
    complexity: "Low-Code",
    industry: "Sales",
    creator: "Sales Ops",
    creatorInitials: "SO",
    featured: false,
    forks: 156,
    uses: "892",
    lastUpdated: "1w ago",
    tags: ["Low-Code", "CRM", "Salesforce"],
    preview: "trigger: new_lead -> score -> if(score > 80) -> assign_rep",
  },
  {
    id: "template-004",
    name: "Customer Support Router",
    description: "Auto-assign support tickets to the right team members",
    category: "Automation",
    complexity: "Low-Code",
    industry: "Support",
    creator: "Support Team",
    creatorInitials: "ST",
    featured: true,
    forks: 189,
    uses: "1.5K",
    lastUpdated: "3d ago",
    tags: ["Low-Code", "Zendesk", "Routing"],
    preview: "trigger: new_ticket -> categorize -> assign_by_skill",
  },
  {
    id: "template-005",
    name: "Data ETL Pipeline",
    description: "Extract, transform, and load data from multiple sources",
    category: "Data Pipeline",
    complexity: "High-Code",
    industry: "General",
    creator: "Data Team",
    creatorInitials: "DT",
    featured: false,
    forks: 98,
    uses: "456",
    lastUpdated: "1w ago",
    tags: ["High-Code", "PostgreSQL", "API"],
    preview: "sources: [api, db, csv] -> transform -> load_warehouse",
  },
  {
    id: "template-006",
    name: "Weekly Report Generator",
    description: "Aggregate metrics and send weekly summary reports",
    category: "Reporting",
    complexity: "No-Code",
    industry: "General",
    creator: "Platform Team",
    creatorInitials: "PT",
    featured: true,
    forks: 423,
    uses: "3.1K",
    lastUpdated: "4d ago",
    tags: ["No-Code", "Reports", "Email"],
    preview: "schedule: weekly -> aggregate_metrics -> send_report",
  },
  {
    id: "template-007",
    name: "Social Media Cross-Post",
    description: "Publish content to multiple social platforms simultaneously",
    category: "Automation",
    complexity: "No-Code",
    industry: "Marketing",
    creator: "Marketing Hub",
    creatorInitials: "MH",
    featured: false,
    forks: 87,
    uses: "678",
    lastUpdated: "2w ago",
    tags: ["No-Code", "Social", "Buffer"],
    preview: "trigger: new_post -> adapt_format -> publish_all",
  },
  {
    id: "template-008",
    name: "Invoice Processing Flow",
    description: "Parse, categorize, and process incoming invoices",
    category: "Data Pipeline",
    complexity: "Low-Code",
    industry: "Finance",
    creator: "Finance Ops",
    creatorInitials: "FO",
    featured: false,
    forks: 45,
    uses: "234",
    lastUpdated: "3w ago",
    tags: ["Low-Code", "OCR", "QuickBooks"],
    preview: "trigger: new_invoice -> extract_data -> validate -> sync",
  },
  {
    id: "template-009",
    name: "Employee Onboarding Checklist",
    description: "Automated new hire setup and task assignment",
    category: "Workflow",
    complexity: "No-Code",
    industry: "HR",
    creator: "HR Solutions",
    creatorInitials: "HR",
    featured: false,
    forks: 267,
    uses: "1.8K",
    lastUpdated: "1w ago",
    tags: ["No-Code", "HR", "Onboarding"],
    preview: "trigger: new_hire -> create_accounts -> assign_tasks",
  },
]

// Mock Plugin Data (9 plugins)
const plugins: Plugin[] = [
  {
    id: "plugin-001",
    name: "Slack Connector",
    description: "Send notifications and messages to Slack channels",
    category: "Integration",
    platform: "Cross-Platform",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    downloads: "45.2K",
    version: "v2.1.0",
    compatible: true,
    permissions: ["Send Messages", "Read Channels"],
    tags: ["Slack", "Notifications", "OAuth"],
  },
  {
    id: "plugin-002",
    name: "Google Workspace Integration",
    description: "Connect to Gmail, Calendar, and Drive",
    category: "Integration",
    platform: "Web",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    downloads: "38.7K",
    version: "v3.0.1",
    compatible: true,
    permissions: ["Gmail Access", "Calendar Access", "Drive Access"],
    tags: ["Google", "Email", "Calendar"],
  },
  {
    id: "plugin-003",
    name: "Salesforce API Wrapper",
    description: "CRUD operations on Salesforce objects",
    category: "Data Source",
    platform: "Web",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    downloads: "12.3K",
    version: "v1.8.3",
    compatible: true,
    permissions: ["Salesforce API Access"],
    tags: ["Salesforce", "CRM", "REST API"],
  },
  {
    id: "plugin-004",
    name: "PostgreSQL Connector",
    description: "Query and write to PostgreSQL databases",
    category: "Data Source",
    platform: "Cross-Platform",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    downloads: "23.1K",
    version: "v2.0.0",
    compatible: true,
    permissions: ["Database Access"],
    tags: ["PostgreSQL", "Database", "SQL"],
  },
  {
    id: "plugin-005",
    name: "OpenAI API Plugin",
    description: "Access GPT models for text generation",
    category: "Utility",
    platform: "Cross-Platform",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    downloads: "67.8K",
    version: "v1.5.2",
    compatible: true,
    permissions: ["API Key Storage"],
    tags: ["OpenAI", "GPT", "LLM"],
  },
  {
    id: "plugin-006",
    name: "Webhook Trigger",
    description: "Receive and process webhook payloads",
    category: "Integration",
    platform: "Cross-Platform",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    downloads: "34.5K",
    version: "v1.2.0",
    compatible: true,
    permissions: ["Webhook Endpoint"],
    tags: ["Webhooks", "HTTP", "Triggers"],
  },
  {
    id: "plugin-007",
    name: "Notion Integration",
    description: "Read and write Notion pages and databases",
    category: "Integration",
    platform: "Web",
    creator: "Community Dev",
    creatorInitials: "CD",
    verified: false,
    tier: "Gold",
    downloads: "8.9K",
    version: "v1.1.0",
    compatible: true,
    permissions: ["Notion API Access"],
    tags: ["Notion", "Pages", "Databases"],
  },
  {
    id: "plugin-008",
    name: "Stripe Payment Processor",
    description: "Handle payments and subscriptions",
    category: "Output",
    platform: "Web",
    creator: "FinTech Labs",
    creatorInitials: "FL",
    verified: false,
    tier: "Gold",
    downloads: "5.6K",
    version: "v2.3.1",
    compatible: true,
    permissions: ["Stripe API Access", "Payment Processing"],
    tags: ["Stripe", "Payments", "Subscriptions"],
  },
  {
    id: "plugin-009",
    name: "Twilio SMS Gateway",
    description: "Send and receive SMS messages",
    category: "Output",
    platform: "Cross-Platform",
    creator: "Comm Tools",
    creatorInitials: "CT",
    verified: false,
    tier: "Silver",
    downloads: "11.2K",
    version: "v1.4.0",
    compatible: true,
    permissions: ["Twilio API Access", "SMS Send/Receive"],
    tags: ["Twilio", "SMS", "Messaging"],
  },
]

// Tier badge colors
const getTierColor = (tier: CreatorTier) => {
  switch (tier) {
    case "Platinum": return "bg-slate-100 text-slate-700 border-slate-300"
    case "Gold": return "bg-amber-50 text-amber-700 border-amber-300"
    case "Silver": return "bg-gray-100 text-gray-600 border-gray-300"
    case "Bronze": return "bg-orange-50 text-orange-700 border-orange-300"
  }
}

// Complexity badge colors
const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case "No-Code": return "bg-emerald-50 text-emerald-600 border-emerald-200"
    case "Low-Code": return "bg-blue-50 text-blue-600 border-blue-200"
    case "High-Code": return "bg-purple-50 text-purple-600 border-purple-200"
    default: return "bg-gray-50 text-gray-600 border-gray-200"
  }
}

export default function DiscoverPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"agents" | "templates" | "plugins">("agents")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCommunityPanel, setShowCommunityPanel] = useState(false)
  const [communityTab, setCommunityTab] = useState("trending")
  const [installingId, setInstallingId] = useState<string | null>(null)
  const [installedIds, setInstalledIds] = useState<string[]>(["agent-001", "agent-002", "template-001", "plugin-001"])
  const [currentPage, setCurrentPage] = useState(1)
  
  // Agent filters
  const [agentCategory, setAgentCategory] = useState("all")
  const [agentPrice, setAgentPrice] = useState("all")
  const [agentCompatibility, setAgentCompatibility] = useState("all")
  const [agentRating, setAgentRating] = useState("all")
  const [agentSort, setAgentSort] = useState("trending")
  
  // Template filters
  const [templateCategory, setTemplateCategory] = useState("all")
  const [templateComplexity, setTemplateComplexity] = useState("all")
  const [templateIndustry, setTemplateIndustry] = useState("all")
  const [templateSort, setTemplateSort] = useState("popular")
  
  // Plugin filters
  const [pluginCategory, setPluginCategory] = useState("all")
  const [pluginPlatform, setPluginPlatform] = useState("all")
  const [pluginCompatibility, setPluginCompatibility] = useState("all")
  const [pluginSort, setPluginSort] = useState("popular")

  // Modal state
  const [selectedAsset, setSelectedAsset] = useState<Agent | Template | Plugin | null>(null)
  const [showAssetModal, setShowAssetModal] = useState(false)
  const [assetModalTab, setAssetModalTab] = useState("overview")

  // Save tab to localStorage and sync with URL
  useEffect(() => {
    const savedTab = localStorage.getItem("discover-tab")
    const hash = window.location.hash.replace("#", "")
    if (hash === "agents" || hash === "templates" || hash === "plugins") {
      setActiveTab(hash)
    } else if (savedTab === "agents" || savedTab === "templates" || savedTab === "plugins") {
      setActiveTab(savedTab)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("discover-tab", activeTab)
    window.history.replaceState(null, "", `#${activeTab}`)
  }, [activeTab])

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        document.getElementById("global-search")?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Reset filters when switching tabs
  const handleTabChange = (tab: "agents" | "templates" | "plugins") => {
    setActiveTab(tab)
    setSearchQuery("")
    setCurrentPage(1)
    // Reset filters for the new tab
    if (tab === "agents") {
      setAgentCategory("all")
      setAgentPrice("all")
      setAgentCompatibility("all")
      setAgentRating("all")
    } else if (tab === "templates") {
      setTemplateCategory("all")
      setTemplateComplexity("all")
      setTemplateIndustry("all")
    } else {
      setPluginCategory("all")
      setPluginPlatform("all")
      setPluginCompatibility("all")
    }
  }

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = searchQuery === "" || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = agentCategory === "all" || agent.category.toLowerCase() === agentCategory
    const matchesPrice = agentPrice === "all" || 
      (agentPrice === "free" && agent.price === "Free") ||
      (agentPrice === "paid" && agent.price !== "Free")
    const matchesCompatibility = agentCompatibility === "all" || 
      agent.compatibility.some(c => c.toLowerCase() === agentCompatibility)
    const matchesRating = agentRating === "all" || 
      (agentRating === "4" && agent.rating >= 4) ||
      (agentRating === "3" && agent.rating >= 3)
    return matchesSearch && matchesCategory && matchesPrice && matchesCompatibility && matchesRating
  }).sort((a, b) => {
    switch (agentSort) {
      case "newest": return 0 // Would use dates in real implementation
      case "toprated": return b.rating - a.rating
      case "mostinstalled": return parseFloat(b.installs) - parseFloat(a.installs)
      default: return parseFloat(b.installs) - parseFloat(a.installs)
    }
  })

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = templateCategory === "all" || template.category.toLowerCase() === templateCategory.toLowerCase()
    const matchesComplexity = templateComplexity === "all" || template.complexity.toLowerCase().replace("-", "") === templateComplexity
    const matchesIndustry = templateIndustry === "all" || template.industry.toLowerCase() === templateIndustry
    return matchesSearch && matchesCategory && matchesComplexity && matchesIndustry
  }).sort((a, b) => {
    switch (templateSort) {
      case "newest": return 0
      case "mostforked": return b.forks - a.forks
      case "editorspicks": return a.featured ? -1 : 1
      default: return parseFloat(b.uses) - parseFloat(a.uses)
    }
  })

  // Filter plugins
  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch = searchQuery === "" || 
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = pluginCategory === "all" || plugin.category.toLowerCase() === pluginCategory.toLowerCase()
    const matchesPlatform = pluginPlatform === "all" || plugin.platform.toLowerCase().replace("-", "") === pluginPlatform
    const matchesCompatibility = pluginCompatibility === "all" || plugin.compatible
    return matchesSearch && matchesCategory && matchesPlatform && matchesCompatibility
  }).sort((a, b) => {
    switch (pluginSort) {
      case "newest": return 0
      case "mostcompatible": return a.compatible ? -1 : 1
      case "recentlyupdated": return 0
      default: return parseFloat(b.downloads) - parseFloat(a.downloads)
    }
  })

  // Handle install
  const handleInstall = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (installedIds.includes(id)) return
    setInstallingId(id)
    setTimeout(() => {
      setInstalledIds(prev => [...prev, id])
      setInstallingId(null)
    }, 1500)
  }

  // Open asset modal
  const openAssetModal = (asset: Agent | Template | Plugin) => {
    setSelectedAsset(asset)
    setAssetModalTab("overview")
    setShowAssetModal(true)
  }

  // Global discussions mock data
  const globalDiscussions = [
    { id: "1", title: "Best practices for RAG agent optimization?", assetBadge: "General", author: "Sarah K.", authorInitials: "SK", timestamp: "30 min ago", upvotes: 23, replies: 7 },
    { id: "2", title: "Briefly AI vs Traditional Recording Tools", assetBadge: "Briefly AI", author: "Mike R.", authorInitials: "MR", timestamp: "2 hours ago", upvotes: 15, replies: 4 },
    { id: "3", title: "How to build custom integrations?", assetBadge: "Development", author: "Chris T.", authorInitials: "CT", timestamp: "1 day ago", upvotes: 18, replies: 6 },
  ]

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Top Utility Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[#E5E7EB] bg-white px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Store className="h-4 w-4 text-[#ee3224]" />
            <span className="font-semibold text-foreground">Discover</span>
          </div>

          <div className="relative w-[400px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="global-search"
              placeholder="Search assets... (Cmd/Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 border-[#E5E7EB]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  Resources
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem className="gap-2"><Book className="h-4 w-4" />Documentation</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><GraduationCap className="h-4 w-4" />Tutorials</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><Video className="h-4 w-4" />Webinars & Events</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><FileCode className="h-4 w-4" />API Reference</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><Megaphone className="h-4 w-4" />Release Notes</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2"><HelpCircle className="h-4 w-4" />Contact Support</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" onClick={() => setShowCommunityPanel(true)}>
              Community
            </Button>

            <Button variant="outline" size="sm" className="border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
              Publish Asset
            </Button>
          </div>
        </div>

        {/* Page Header with Tabs */}
        <div className="border-b border-[#E5E7EB] bg-white px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Discover</h1>
              <p className="text-sm text-muted-foreground mt-1">Browse and install AI agents, templates, and plugins</p>
            </div>
          </div>

          {/* Three-Tab Navigation */}
          <div className="flex items-center gap-1 rounded-lg bg-[#F5F7FA] p-1 w-fit">
            <button
              onClick={() => handleTabChange("agents")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "agents" ? "bg-[#ee3224] text-white shadow-sm" : "text-[#333] hover:bg-white/50"
              }`}
            >
              <Bot className="h-4 w-4" />
              Agent Marketplace
            </button>
            <button
              onClick={() => handleTabChange("templates")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "templates" ? "bg-[#ee3224] text-white shadow-sm" : "text-[#333] hover:bg-white/50"
              }`}
            >
              <FileText className="h-4 w-4" />
              Template Library
            </button>
            <button
              onClick={() => handleTabChange("plugins")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "plugins" ? "bg-[#ee3224] text-white shadow-sm" : "text-[#333] hover:bg-white/50"
              }`}
            >
              <Puzzle className="h-4 w-4" />
              Plugin Store
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {/* TAB 1: Agent Marketplace */}
            {activeTab === "agents" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Agent Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Select value={agentCategory} onValueChange={setAgentCategory}>
                    <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="knowledge">Knowledge</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={agentPrice} onValueChange={setAgentPrice}>
                    <SelectTrigger className="w-[120px] border-[#E5E7EB]">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={agentCompatibility} onValueChange={setAgentCompatibility}>
                    <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={agentRating} onValueChange={setAgentRating}>
                    <SelectTrigger className="w-[120px] border-[#E5E7EB]">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex-1" />

                  <Select value={agentSort} onValueChange={setAgentSort}>
                    <SelectTrigger className="w-[150px] border-[#E5E7EB]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="toprated">Top Rated</SelectItem>
                      <SelectItem value="mostinstalled">Most Installed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Agent Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAgents.map((agent) => (
                    <Card
                      key={agent.id}
                      className="group cursor-pointer border border-[#E5E7EB] bg-white shadow-sm transition-all hover:border-[#ee3224]/30 hover:shadow-md"
                      onClick={() => openAssetModal(agent)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#E5E7EB]">
                            <Bot className="h-6 w-6 text-[#ee3224]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground truncate">{agent.name}</h3>
                              {agent.verified && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{agent.tagline}</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{agent.description}</p>

                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-muted">{agent.creatorInitials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{agent.creator}</span>
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getTierColor(agent.tier)}`}>
                            {agent.tier}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>{agent.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-3.5 w-3.5" />
                            <span>{agent.installs}</span>
                          </div>
                          <span className={agent.price === "Free" ? "text-emerald-600 font-medium" : "text-foreground"}>
                            {agent.price}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {agent.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-[#F5F7FA] text-muted-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className={`flex-1 ${installedIds.includes(agent.id) ? "bg-emerald-500 hover:bg-emerald-600" : "bg-[#ee3224] hover:bg-[#cc2a1e]"}`}
                            onClick={(e) => handleInstall(agent.id, e)}
                            disabled={installingId === agent.id}
                          >
                            {installingId === agent.id ? "Installing..." : installedIds.includes(agent.id) ? "Installed" : "Install"}
                          </Button>
                          <Button variant="outline" className="border-[#E5E7EB]" onClick={(e) => { e.stopPropagation(); openAssetModal(agent) }}>
                            Preview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-muted-foreground">Showing 1-{filteredAgents.length} of 127 agents</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" className="bg-[#ee3224] text-white border-[#ee3224]">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Template Library */}
            {activeTab === "templates" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Template Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Select value={templateCategory} onValueChange={setTemplateCategory}>
                    <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="workflow">Workflow</SelectItem>
                      <SelectItem value="automation">Automation</SelectItem>
                      <SelectItem value="data pipeline">Data Pipeline</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                      <SelectItem value="reporting">Reporting</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={templateComplexity} onValueChange={setTemplateComplexity}>
                    <SelectTrigger className="w-[130px] border-[#E5E7EB]">
                      <SelectValue placeholder="Complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="nocode">No-Code</SelectItem>
                      <SelectItem value="lowcode">Low-Code</SelectItem>
                      <SelectItem value="highcode">High-Code</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={templateIndustry} onValueChange={setTemplateIndustry}>
                    <SelectTrigger className="w-[130px] border-[#E5E7EB]">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex-1" />

                  <Select value={templateSort} onValueChange={setTemplateSort}>
                    <SelectTrigger className="w-[150px] border-[#E5E7EB]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="mostforked">Most Forked</SelectItem>
                      <SelectItem value="editorspicks">Editor's Picks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="group cursor-pointer border border-[#E5E7EB] bg-white shadow-sm transition-all hover:border-[#ee3224]/30 hover:shadow-md"
                      onClick={() => openAssetModal(template)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#E5E7EB]">
                            <FileText className="h-6 w-6 text-[#ee3224]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground truncate">{template.name}</h3>
                              {template.featured && <Star className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />}
                            </div>
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 mt-1 ${getComplexityColor(template.complexity)}`}>
                              {template.complexity}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{template.description}</p>

                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-muted">{template.creatorInitials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{template.creator}</span>
                          <button className="text-xs text-[#ee3224] hover:underline ml-auto">View Profile</button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-3.5 w-3.5" />
                            <span>{template.forks}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>{template.uses}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{template.lastUpdated}</span>
                          </div>
                        </div>

                        {/* Preview Section */}
                        <div className="bg-[#F5F7FA] rounded p-2 mb-3 font-mono text-xs text-muted-foreground overflow-hidden">
                          {template.preview}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {template.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-[#F5F7FA] text-muted-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className={`flex-1 ${installedIds.includes(template.id) ? "bg-emerald-500 hover:bg-emerald-600" : "bg-[#ee3224] hover:bg-[#cc2a1e]"}`}
                            onClick={(e) => handleInstall(template.id, e)}
                            disabled={installingId === template.id}
                          >
                            {installingId === template.id ? "Loading..." : installedIds.includes(template.id) ? "Open" : "Use Template"}
                          </Button>
                          <Button variant="outline" className="border-[#E5E7EB]" onClick={(e) => { e.stopPropagation(); openAssetModal(template) }}>
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-muted-foreground">Showing 1-{filteredTemplates.length} of 89 templates</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" className="bg-[#ee3224] text-white border-[#ee3224]">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Plugin Store */}
            {activeTab === "plugins" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Plugin Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Select value={pluginCategory} onValueChange={setPluginCategory}>
                    <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                      <SelectItem value="data source">Data Source</SelectItem>
                      <SelectItem value="output">Output</SelectItem>
                      <SelectItem value="authentication">Authentication</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={pluginPlatform} onValueChange={setPluginPlatform}>
                    <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="crossplatform">Cross-Platform</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={pluginCompatibility} onValueChange={setPluginCompatibility}>
                    <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                      <SelectValue placeholder="Compatibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Versions</SelectItem>
                      <SelectItem value="v1">v1.x</SelectItem>
                      <SelectItem value="v2">v2.x</SelectItem>
                      <SelectItem value="latest">Latest</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex-1" />

                  <Select value={pluginSort} onValueChange={setPluginSort}>
                    <SelectTrigger className="w-[160px] border-[#E5E7EB]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="mostcompatible">Most Compatible</SelectItem>
                      <SelectItem value="recentlyupdated">Recently Updated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Plugin Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPlugins.map((plugin) => (
                    <Card
                      key={plugin.id}
                      className="group cursor-pointer border border-[#E5E7EB] bg-white shadow-sm transition-all hover:border-[#ee3224]/30 hover:shadow-md"
                      onClick={() => openAssetModal(plugin)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#E5E7EB]">
                            <Puzzle className="h-6 w-6 text-[#ee3224]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground truncate">{plugin.name}</h3>
                              {plugin.verified && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground">{plugin.category}</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{plugin.description}</p>

                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-muted">{plugin.creatorInitials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{plugin.creator}</span>
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getTierColor(plugin.tier)}`}>
                            {plugin.tier}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Download className="h-3.5 w-3.5" />
                            <span>{plugin.downloads}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{plugin.version}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {plugin.compatible ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-emerald-600">Compatible</span>
                              </>
                            ) : (
                              <span className="text-amber-600">Check version</span>
                            )}
                          </div>
                        </div>

                        {/* Technical Specs */}
                        <div className="bg-[#F5F7FA] rounded p-2 mb-3 text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <Shield className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Permissions:</span>
                            <span className="font-medium">{plugin.permissions.length}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Platform:</span>
                            <span className="font-medium">{plugin.platform}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {plugin.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-[#F5F7FA] text-muted-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className={`flex-1 ${installedIds.includes(plugin.id) ? "bg-emerald-500 hover:bg-emerald-600" : "bg-[#ee3224] hover:bg-[#cc2a1e]"}`}
                            onClick={(e) => handleInstall(plugin.id, e)}
                            disabled={installingId === plugin.id}
                          >
                            {installingId === plugin.id ? "Installing..." : installedIds.includes(plugin.id) ? "Installed" : "Install Plugin"}
                          </Button>
                          <Button variant="outline" className="border-[#E5E7EB]" onClick={(e) => { e.stopPropagation(); openAssetModal(plugin) }}>
                            View Docs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-muted-foreground">Showing 1-{filteredPlugins.length} of 234 plugins</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" className="bg-[#ee3224] text-white border-[#ee3224]">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Asset Detail Modal */}
        <Dialog open={showAssetModal} onOpenChange={setShowAssetModal}>
          <DialogContent className="max-w-[900px] max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader className="pb-4 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#E5E7EB]">
                    {activeTab === "agents" && <Bot className="h-6 w-6 text-[#ee3224]" />}
                    {activeTab === "templates" && <FileText className="h-6 w-6 text-[#ee3224]" />}
                    {activeTab === "plugins" && <Puzzle className="h-6 w-6 text-[#ee3224]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <DialogTitle className="text-xl">{selectedAsset && "name" in selectedAsset ? selectedAsset.name : ""}</DialogTitle>
                      {"verified" in (selectedAsset || {}) && (selectedAsset as Agent | Plugin)?.verified && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {"version" in (selectedAsset || {}) ? (selectedAsset as Plugin).version : "v2.4.1"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5" />
                    Available
                  </Badge>
                  <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Flag className="h-4 w-4" /></Button>
                </div>
              </div>
            </DialogHeader>

            <Tabs value={assetModalTab} onValueChange={setAssetModalTab} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="w-full justify-start border-b border-[#E5E7EB] rounded-none bg-transparent h-auto p-0">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent">Overview</TabsTrigger>
                <TabsTrigger value="documentation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent">Documentation</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent">Reviews</TabsTrigger>
                <TabsTrigger value="discussions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent">Discussions</TabsTrigger>
                <TabsTrigger value="versions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent">Versions</TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1">
                <TabsContent value="overview" className="p-4 m-0 space-y-4">
                  <div className="aspect-video bg-[#F5F7FA] rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Screenshot Carousel</p>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <h3>Description</h3>
                    <p className="text-muted-foreground">{selectedAsset && "description" in selectedAsset ? selectedAsset.description : ""}</p>
                    <h3>Key Features</h3>
                    <ul>
                      <li>Real-time processing with low latency</li>
                      <li>Privacy-first design with on-device processing</li>
                      <li>Seamless integration with existing workflows</li>
                      <li>Cross-platform compatibility</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="documentation" className="p-4 m-0">
                  <div className="prose prose-sm max-w-none">
                    <h3>Quick Start</h3>
                    <p className="text-muted-foreground">Get started with this asset in minutes.</p>
                    <pre className="bg-[#F5F7FA] p-4 rounded-lg overflow-x-auto">
                      <code>// Example usage code here</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-4 m-0">
                  <div className="flex items-center gap-6 mb-6 p-4 bg-[#F5F7FA] rounded-lg">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-foreground">4.7</p>
                      <div className="flex items-center gap-0.5 justify-center my-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className={`h-4 w-4 ${i <= 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />)}
                      </div>
                      <p className="text-sm text-muted-foreground">342 reviews</p>
                    </div>
                    <div className="flex-1 space-y-1">
                      {[5,4,3,2,1].map(rating => (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-sm w-3">{rating}</span>
                          <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : 5}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">Write a Review</Button>
                </TabsContent>

                <TabsContent value="discussions" className="p-4 m-0">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">Discussions about this asset</p>
                    <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">Start New Discussion</Button>
                  </div>
                  <div className="space-y-3">
                    {[1,2,3].map(i => (
                      <Card key={i} className="border-[#E5E7EB]">
                        <CardContent className="p-4">
                          <h4 className="font-medium">Sample discussion title {i}</h4>
                          <p className="text-sm text-muted-foreground mt-1">Discussion excerpt goes here...</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> 12</span>
                            <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> 5</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="versions" className="p-4 m-0">
                  <div className="space-y-2">
                    {[
                      { version: "v2.4.1", date: "Mar 10, 2025", summary: "Bug fixes and performance improvements", current: true },
                      { version: "v2.4.0", date: "Mar 5, 2025", summary: "Added multi-language support", current: false },
                      { version: "v2.3.2", date: "Feb 28, 2025", summary: "Fixed sync issues", current: false },
                    ].map((v, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${v.current ? "bg-emerald-50 border border-emerald-200" : "bg-[#F5F7FA]"}`}>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{v.version}</span>
                            {v.current && <Badge className="bg-emerald-500 text-white">Current</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{v.summary}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{v.date}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-[#E5E7EB]">Add to Collection</Button>
                <Button variant="outline" className="border-[#E5E7EB]">Notify on Update</Button>
              </div>
              <Button className="bg-[#ee3224] hover:bg-[#cc2a1e] px-6">
                {activeTab === "agents" ? "Install Agent" : activeTab === "templates" ? "Use Template" : "Install Plugin"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Community Slide-Over Panel */}
        <Sheet open={showCommunityPanel} onOpenChange={setShowCommunityPanel}>
          <SheetContent className="w-[400px] p-0">
            <SheetHeader className="p-4 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <SheetTitle>Community Discussions</SheetTitle>
              </div>
              <Input placeholder="Search discussions..." className="mt-2 border-[#E5E7EB]" />
            </SheetHeader>

            <div className="border-b border-[#E5E7EB]">
              <div className="flex">
                {["trending", "my", "following"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCommunityTab(tab)}
                    className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                      communityTab === tab ? "border-[#ee3224] text-[#ee3224]" : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {tab === "my" ? "My Discussions" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1 h-[calc(100vh-220px)]">
              <div className="p-4 space-y-3">
                {globalDiscussions.map((disc) => (
                  <Card key={disc.id} className="border-[#E5E7EB] cursor-pointer hover:border-[#ee3224]/30 transition-colors">
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm line-clamp-2">{disc.title}</h4>
                      <Badge variant="secondary" className="text-[10px] mt-1 bg-[#F5F7FA]">{disc.assetBadge}</Badge>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">{disc.authorInitials}</AvatarFallback>
                        </Avatar>
                        <span>{disc.author}</span>
                        <span>{disc.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {disc.upvotes}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {disc.replies}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-[#E5E7EB]">
              <Button className="w-full bg-[#ee3224] hover:bg-[#cc2a1e]">Start New Discussion</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  )
}
