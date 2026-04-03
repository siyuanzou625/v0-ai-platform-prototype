"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Plus,
  Workflow,
  Code2,
  Clock,
  MoreHorizontal,
  FolderOpen,
  LayoutDashboard,
  LayoutGrid,
  List,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  ArrowUpDown,
  Share2,
  Rocket,
  Settings,
  Trash2,
  Pencil,
  Download,
  ExternalLink,
  Check,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Mail,
  BarChart3,
  Calendar,
  SearchIcon,
  Megaphone,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type ViewMode = "dashboard" | "grid" | "list"
type Environment = "all" | "development" | "staging" | "production"
type Status = "all" | "building" | "ready" | "deployed" | "blocked"
type SortField = "name" | "owner" | "environment" | "progress" | "status" | "dueDate" | "lastActivity"
type SortDirection = "asc" | "desc"

// Enhanced mock projects data
const projects = [
  {
    id: "proj-007",
    name: "Code Review Agent",
    description: "Automates PR checks against internal coding standards and triages bugs by severity",
    mode: "workflow" as const,
    owner: { name: "Zoey", initials: "ZD" },
    environment: "production" as const,
    status: "building" as const,
    progress: 80,
    nextMilestone: "Deploy to Internal GitHub",
    dueDate: "2025-03-28",
    dueDateStatus: "upcoming" as const,
    lastActivity: "Just now",
    lastActivityTimestamp: Date.now(),
    members: [
      { name: "Zoey", initials: "ZD" },
      { name: "Sarah Chen", initials: "SC" },
    ],
    knowledgeBases: 2,
    connections: 4,
    blockedReason: null,
  },
  {
    id: "proj-001",
    name: "Enterprise Sales Agent",
    description: "Automating lead qualification and outreach for enterprise sales teams",
    mode: "workflow" as const,
    owner: { name: "Zoey", initials: "ZD" },
    environment: "production" as const,
    status: "deployed" as const,
    progress: 100,
    nextMilestone: "Monitor Performance",
    dueDate: "2025-03-10",
    dueDateStatus: "complete" as const,
    lastActivity: "2 hours ago",
    lastActivityTimestamp: Date.now() - 2 * 60 * 60 * 1000,
    members: [
      { name: "Zoey", initials: "ZD" },
      { name: "Sarah Chen", initials: "SC" },
      { name: "Mike Johnson", initials: "MJ" },
    ],
    knowledgeBases: 2,
    connections: 4,
    blockedReason: null,
  },
  {
    id: "proj-002",
    name: "Data Pipeline v2",
    description: "ETL workflow for processing customer analytics data",
    mode: "code" as const,
    owner: { name: "Sarah", initials: "SC" },
    environment: "staging" as const,
    status: "building" as const,
    progress: 75,
    nextMilestone: "Add Knowledge Base",
    dueDate: "2025-03-20",
    dueDateStatus: "upcoming" as const,
    lastActivity: "5 hours ago",
    lastActivityTimestamp: Date.now() - 5 * 60 * 60 * 1000,
    members: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Alex Kim", initials: "AK" },
    ],
    knowledgeBases: 1,
    connections: 3,
    blockedReason: null,
  },
  {
    id: "proj-003",
    name: "Customer Support Bot",
    description: "AI-powered customer service automation with ticket routing",
    mode: "workflow" as const,
    owner: { name: "Alex", initials: "AK" },
    environment: "production" as const,
    status: "deployed" as const,
    progress: 100,
    nextMilestone: "A/B Testing",
    dueDate: "2025-03-05",
    dueDateStatus: "complete" as const,
    lastActivity: "1 day ago",
    lastActivityTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    members: [
      { name: "Alex Kim", initials: "AK" },
      { name: "Jordan Lee", initials: "JL" },
      { name: "Taylor Swift", initials: "TS" },
      { name: "Chris Martin", initials: "CM" },
      { name: "Emma Watson", initials: "EW" },
    ],
    knowledgeBases: 3,
    connections: 6,
    blockedReason: null,
  },
  {
    id: "proj-004",
    name: "Analytics Dashboard API",
    description: "REST API for real-time analytics data visualization",
    mode: "code" as const,
    owner: { name: "Michael", initials: "MJ" },
    environment: "development" as const,
    status: "building" as const,
    progress: 45,
    nextMilestone: "Complete API Endpoints",
    dueDate: "2025-03-25",
    dueDateStatus: "upcoming" as const,
    lastActivity: "3 hours ago",
    lastActivityTimestamp: Date.now() - 3 * 60 * 60 * 1000,
    members: [
      { name: "Michael Johnson", initials: "MJ" },
      { name: "Lisa Park", initials: "LP" },
    ],
    knowledgeBases: 0,
    connections: 2,
    blockedReason: null,
  },
  {
    id: "proj-005",
    name: "Invoice Processor",
    description: "Automated invoice parsing and accounting system integration",
    mode: "workflow" as const,
    owner: { name: "Zoey", initials: "ZD" },
    environment: "staging" as const,
    status: "blocked" as const,
    progress: 60,
    nextMilestone: "Resolve API Access",
    dueDate: "2025-03-15",
    dueDateStatus: "at-risk" as const,
    lastActivity: "2 days ago",
    lastActivityTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    members: [
      { name: "Zoey", initials: "ZD" },
      { name: "David Brown", initials: "DB" },
      { name: "Nina Patel", initials: "NP" },
    ],
    knowledgeBases: 1,
    connections: 3,
    blockedReason: "Awaiting API access approval from Finance team",
  },
  {
    id: "proj-006",
    name: "Notification Service",
    description: "Multi-channel notification system (Email, SMS, Slack, Push)",
    mode: "code" as const,
    owner: { name: "Alex", initials: "AK" },
    environment: "production" as const,
    status: "ready" as const,
    progress: 90,
    nextMilestone: "Deploy to Production",
    dueDate: "2025-03-12",
    dueDateStatus: "upcoming" as const,
    lastActivity: "30 minutes ago",
    lastActivityTimestamp: Date.now() - 30 * 60 * 1000,
    members: [
      { name: "Alex Kim", initials: "AK" },
      { name: "Ryan Garcia", initials: "RG" },
      { name: "Sophie Turner", initials: "ST" },
      { name: "Mark Wilson", initials: "MW" },
    ],
    knowledgeBases: 1,
    connections: 5,
    blockedReason: null,
  },
]

// Activity timeline entries
const activityTimeline = [
  { id: 1, user: "Zoey", initials: "ZD", action: "pushed update to", project: "Code Review Agent", projectId: "proj-007", timestamp: "20 minutes ago", isCurrentUser: true },
  { id: 2, user: "Michael", initials: "MJ", action: "commented \"This caught a bug I missed for weeks!\" on", project: "Code Review Agent", projectId: "proj-007", timestamp: "45 minutes ago", isCurrentUser: false },
  { id: 3, user: "Alex", initials: "AK", action: "forked", project: "Code Review Agent", projectId: "proj-007", timestamp: "1 hour ago", isCurrentUser: false },
  { id: 4, user: "Sarah", initials: "SC", action: "left a 5-star rating on", project: "Code Review Agent", projectId: "proj-007", timestamp: "2 hours ago", isCurrentUser: false },
  { id: 5, user: "Tom", initials: "TS", action: "commented \"Can we extend this to Python files?\" on", project: "Code Review Agent", projectId: "proj-007", timestamp: "3 hours ago", isCurrentUser: false },
  { id: 6, user: "Zoey", initials: "ZD", action: "updated workflow in", project: "Enterprise Sales Agent", projectId: "proj-001", timestamp: "2 hours ago", isCurrentUser: true },
  { id: 7, user: "Alex", initials: "AK", action: "deployed", project: "Customer Support Bot", projectId: "proj-003", timestamp: "1 day ago", isCurrentUser: false },
]

// Helper functions
const getProgressBarColor = (status: string) => {
  switch (status) {
    case "deployed":
    case "ready":
      return "[&>div]:bg-emerald-500"
    case "building":
      return "[&>div]:bg-orange-500"
    case "blocked":
      return "[&>div]:bg-red-500"
    default:
      return "[&>div]:bg-[#ee3224]"
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "deployed":
      return (
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Deployed
        </Badge>
      )
    case "ready":
      return (
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border border-emerald-200">
          <Check className="mr-1 h-3 w-3" />
          Ready
        </Badge>
      )
    case "building":
      return (
        <Badge variant="secondary" className="bg-orange-50 text-orange-600 border border-orange-200">
          <PlayCircle className="mr-1 h-3 w-3" />
          Building
        </Badge>
      )
    case "blocked":
      return (
        <Badge variant="secondary" className="bg-red-50 text-red-600 border border-red-200">
          <AlertCircle className="mr-1 h-3 w-3" />
          Blocked
        </Badge>
      )
    default:
      return null
  }
}

const getEnvironmentBadge = (env: string) => {
  switch (env) {
    case "production":
      return <Badge variant="outline" className="text-emerald-600 border-emerald-300">Production</Badge>
    case "staging":
      return <Badge variant="outline" className="text-amber-600 border-amber-300">Staging</Badge>
    case "development":
      return <Badge variant="outline" className="text-blue-600 border-blue-300">Development</Badge>
    default:
      return null
  }
}

const getDueDateColor = (status: string) => {
  switch (status) {
    case "complete": return "text-emerald-600"
    case "at-risk": return "text-amber-600"
    case "overdue": return "text-red-600"
    default: return "text-muted-foreground"
  }
}

export default function ProjectsPage() {
  const router = useRouter()
  
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard")
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [environmentFilter, setEnvironmentFilter] = useState<Environment>("all")
  const [statusFilter, setStatusFilter] = useState<Status>("all")
  
  // Sort state (for list view)
  const [sortField, setSortField] = useState<SortField>("lastActivity")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  
  // Selection state (for list view)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  
  // Pagination state (for list view)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 10
  
  // New project dialog
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newProjectMode, setNewProjectMode] = useState<"build-ai" | "workflow" | "code">("build-ai")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  
  // Templates for Build with AI
  const templates = [
    { id: "meeting-notes", name: "Meeting Notes Agent", description: "Auto-summarize meetings", icon: FileText, preset: "I want an agent that summarizes my meeting recordings and sends the notes to my team on Slack" },
    { id: "email-triage", name: "Email Triage Agent", description: "Prioritize and draft emails", icon: Mail, preset: "I want an agent that reads my emails, prioritizes them, and drafts responses" },
    { id: "data-analyst", name: "Data Analyst Agent", description: "Analyze and visualize data", icon: BarChart3, preset: "I want an agent that analyzes my data and creates visualizations" },
    { id: "calendar", name: "Calendar Optimizer", description: "Schedule and manage meetings", icon: Calendar, preset: "I want an agent that optimizes my calendar and schedules meetings efficiently" },
    { id: "research", name: "Research Assistant", description: "Deep dive into any topic", icon: SearchIcon, preset: "I want an agent that researches topics and provides comprehensive summaries" },
    { id: "social-media", name: "Social Media Manager", description: "Post across platforms", icon: Megaphone, preset: "I want an agent that manages my social media posts across multiple platforms" },
  ]

  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem("projectsViewMode") as ViewMode
    if (savedView && ["dashboard", "grid", "list"].includes(savedView)) {
      setViewMode(savedView)
    }
  }, [])

  // Save view preference
  const handleViewChange = (view: ViewMode) => {
    setViewMode(view)
    localStorage.setItem("projectsViewMode", view)
  }

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesEnv = environmentFilter === "all" || p.environment === environmentFilter
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesEnv && matchesStatus
  })

  // Sort projects (for list view)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let comparison = 0
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "owner":
        comparison = a.owner.name.localeCompare(b.owner.name)
        break
      case "environment":
        comparison = a.environment.localeCompare(b.environment)
        break
      case "progress":
        comparison = a.progress - b.progress
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
      case "dueDate":
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        break
      case "lastActivity":
        comparison = b.lastActivityTimestamp - a.lastActivityTimestamp
        break
    }
    return sortDirection === "asc" ? comparison : -comparison
  })

  // Paginated projects (for list view)
  const paginatedProjects = sortedProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  )
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage)

  // Summary metrics
  const totalProjects = projects.length
  const inProgressCount = projects.filter(p => p.status === "building").length
  const readyCount = projects.filter(p => p.status === "ready" || p.status === "deployed").length
  const blockedCount = projects.filter(p => p.status === "blocked").length

  const handleOpenProject = (projectId: string) => {
    router.push(`/build/workspace?id=${projectId}`)
  }

  const handleCreateProject = () => {
    setShowNewProject(false)
    const description = newProjectDescription || (selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.preset : "")
    const templateId = selectedTemplate
    setNewProjectName("")
    setNewProjectDescription("")
    setSelectedTemplate(null)
    router.push(`/build/workspace?id=new&mode=${newProjectMode}${templateId ? `&template=${templateId}` : ""}${description ? `&prompt=${encodeURIComponent(description)}` : ""}`)
  }
  
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setNewProjectDescription(template.preset)
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = () => {
    if (selectedProjects.length === paginatedProjects.length) {
      setSelectedProjects([])
    } else {
      setSelectedProjects(paginatedProjects.map(p => p.id))
    }
  }

  const handleSelectProject = (id: string) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter(p => p !== id))
    } else {
      setSelectedProjects([...selectedProjects, id])
    }
  }

  const handleMetricClick = (status: Status) => {
    setStatusFilter(status)
    if (viewMode === "dashboard") {
      handleViewChange("grid")
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setEnvironmentFilter("all")
    setStatusFilter("all")
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-[#F5F7FA]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-border px-6 py-6 shadow-sm">
          {/* Row 1: Title, Description & New Agent Button */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                Create and manage your AI agents and workflows in one place.
              </p>
            </div>
            <Dialog open={showNewProject} onOpenChange={(open) => {
              setShowNewProject(open)
              if (!open) {
                setNewProjectName("")
                setNewProjectDescription("")
                setSelectedTemplate(null)
                setNewProjectMode("build-ai")
              }
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
                  <Plus className="h-4 w-4" />
                  New Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[700px] p-0 overflow-hidden" aria-describedby={undefined}>
                {/* Modal Header */}
                <div className="text-center pt-8 pb-4 px-8">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-[#ee3224]" />
                    </div>
                  </div>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-[#1F2937]">
                      Build Your AI Agent with Natural Language
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#6B7280] mt-2">
                      Tell me what you want. I'll build it - no coding required.
                    </DialogDescription>
                  </DialogHeader>
                </div>
                
                {/* Modal Body */}
                <div className="px-8 pb-6 space-y-6">
                  {/* Conversation Input */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#333] flex items-center gap-1.5">
                      Describe Your Agent:
                    </Label>
                    <Textarea
                      placeholder="I want an agent that summarizes my meeting recordings and sends the notes to my team on Slack..."
                      className="min-h-[120px] resize-none border-[#E5E7EB] focus:border-[#ee3224] focus:ring-[#ee3224]/20"
                      value={newProjectDescription}
                      onChange={(e) => {
                        setNewProjectDescription(e.target.value)
                        setSelectedTemplate(null)
                      }}
                    />
                  </div>
                  
                  {/* Template Suggestions */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-[#333] flex items-center gap-1.5">
                      Or Choose a Template:
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {templates.map((template) => {
                        const IconComponent = template.icon
                        return (
                          <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template.id)}
                            className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                              selectedTemplate === template.id
                                ? "border-[#ee3224] bg-[#ee3224]/5"
                                : "border-[#E5E7EB] hover:border-[#ee3224] bg-white"
                            }`}
                          >
                            <IconComponent className={`h-5 w-5 mb-2 ${selectedTemplate === template.id ? "text-[#ee3224]" : "text-[#6B7280]"}`} />
                            <span className="text-sm font-medium text-[#1F2937]">{template.name}</span>
                            <span className="text-xs text-[#6B7280] mt-0.5">{template.description}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="px-8 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
                  <Button
                    className="w-full h-12 bg-[#ee3224] hover:bg-[#cc2a1e] text-white font-medium"
                    onClick={handleCreateProject}
                    disabled={!newProjectDescription.trim()}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Build My Agent
                  </Button>
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => {
                        setNewProjectMode("workflow")
                        setShowNewProject(false)
                        router.push("/build/workspace?id=new&mode=workflow")
                      }}
                      className="text-sm text-[#6B7280] hover:text-[#ee3224] transition-colors"
                    >
                      Skip to Visual Editor
                    </button>
                    <span className="text-xs text-[#9CA3AF]">
                      You can always switch to visual editor or code later.
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Row 2: Search + Filters */}
          <div className="flex items-center gap-3">
            <div className="relative w-[280px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={environmentFilter} onValueChange={(v) => setEnvironmentFilter(v as Environment)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as Status)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="building">Building</SelectItem>
                <SelectItem value="ready">Ready to Deploy</SelectItem>
                <SelectItem value="deployed">Deployed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            {(searchQuery || environmentFilter !== "all" || statusFilter !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
            
            {/* View Toggle */}
            <div className="flex items-center rounded-lg bg-[#F5F7FA] p-1 ml-auto">
              <button
                onClick={() => handleViewChange("dashboard")}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                  viewMode === "dashboard"
                    ? "bg-[#ee3224] text-white shadow-sm"
                    : "text-[#333] hover:bg-white/50"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </button>
              <button
                onClick={() => handleViewChange("grid")}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                  viewMode === "grid"
                    ? "bg-[#ee3224] text-white shadow-sm"
                    : "text-[#333] hover:bg-white/50"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </button>
              <button
                onClick={() => handleViewChange("list")}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                  viewMode === "list"
                    ? "bg-[#ee3224] text-white shadow-sm"
                    : "text-[#333] hover:bg-white/50"
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Dashboard View */}
            {viewMode === "dashboard" && (
              <div className="space-y-3">
                {/* Summary Metrics */}
                <div className="grid grid-cols-4 gap-2">
                  <Card 
                    className="cursor-pointer border border-[#E5E7EB] hover:border-blue-500/30 hover:shadow-md transition-all"
                    onClick={() => handleMetricClick("all")}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-500 font-medium">Total Projects</p>
                          <p className="text-3xl font-bold text-foreground">6</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                          <Briefcase className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card 
                    className="cursor-pointer border border-[#E5E7EB] hover:border-orange-500/30 hover:shadow-md transition-all"
                    onClick={() => handleMetricClick("building")}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-500 font-medium">Building</p>
                          <p className="text-3xl font-bold text-foreground">{inProgressCount}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                          <PlayCircle className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card 
                    className="cursor-pointer border border-[#E5E7EB] hover:border-emerald-500/30 hover:shadow-md transition-all"
                    onClick={() => handleMetricClick("ready")}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-emerald-500 font-medium">Deployed</p>
                          <p className="text-3xl font-bold text-foreground">2</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card 
                    className="cursor-pointer border border-[#E5E7EB] hover:border-red-500/30 hover:shadow-md transition-all"
                    onClick={() => handleMetricClick("blocked")}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-500 font-medium">Blocked</p>
                          <p className="text-3xl font-bold text-foreground">{blockedCount}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                          <AlertCircle className="h-6 w-6 text-red-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Two Column Layout: Activity + Projects */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Team Activity Timeline */}
                  <Card className="col-span-1 border border-[#E5E7EB]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {activityTimeline.map((activity) => (
                          <div 
                            key={activity.id} 
                            className="flex items-start gap-3 px-4 py-3 hover:bg-[#F5F7FA] cursor-pointer transition-colors"
                            onClick={() => handleOpenProject(activity.projectId)}
                          >
                            <Avatar className={`h-8 w-8 ${activity.isCurrentUser ? "ring-2 ring-[#ee3224]" : ""}`}>
                              <AvatarFallback className="text-xs bg-muted">{activity.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">
                                <span className="font-medium">{activity.user}</span>{" "}
                                <span className="text-muted-foreground">{activity.action}</span>{" "}
                                <span className="font-medium text-[#ee3224]">{activity.project}</span>
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{activity.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-border">
                        <Button variant="ghost" className="w-full text-sm text-muted-foreground">
                          View Full Activity Log
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Progress Grid */}
                  <div className="col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-semibold text-foreground">Project Progress</h2>
                      <Button variant="ghost" size="sm" onClick={() => handleViewChange("grid")}>
                        View all
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredProjects.slice(0, 6).map((project) => (
                        <Card 
                          key={project.id}
                          className="group cursor-pointer border border-[#E5E7EB] hover:border-[#ee3224]/30 hover:shadow-md transition-all"
                          onClick={() => handleOpenProject(project.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`flex h-8 w-8 items-center justify-center rounded ${
                                  project.mode === "workflow" ? "bg-[#ee3224]/10" : "bg-blue-500/10"
                                }`}>
                                  {project.mode === "workflow" ? (
                                    <Workflow className="h-4 w-4 text-[#ee3224]" />
                                  ) : (
                                    <Code2 className="h-4 w-4 text-blue-500" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="text-sm font-semibold text-foreground group-hover:text-[#ee3224] transition-colors line-clamp-1">
                                    {project.name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground">{project.owner.name}</p>
                                </div>
                              </div>
                              {getStatusBadge(project.status)}
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <Progress value={project.progress} className={`h-1.5 flex-1 ${getProgressBarColor(project.status)}`} />
                              <span className="text-xs font-medium w-8 text-right">{project.progress}%</span>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs text-muted-foreground">Next: {project.nextMilestone}</p>
                              <p className={`text-xs ${getDueDateColor(project.dueDateStatus)}`}>
                                {project.dueDateStatus === "complete" && <Check className="inline h-3 w-3 mr-0.5" />}
                                Due {project.dueDate}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group cursor-pointer border border-[#E5E7EB] bg-white shadow-sm transition-all hover:border-[#ee3224]/30 hover:shadow-md"
                    onClick={() => handleOpenProject(project.id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded ${
                            project.mode === "workflow" ? "bg-[#ee3224]/10" : "bg-blue-500/10"
                          }`}>
                            {project.mode === "workflow" ? (
                              <Workflow className="h-5 w-5 text-[#ee3224]" />
                            ) : (
                              <Code2 className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-[#ee3224] transition-colors line-clamp-1">
                              {project.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              {getEnvironmentBadge(project.environment)}
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Rocket className="mr-2 h-4 w-4" />
                              Deploy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      {/* Progress */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{project.progress}%</span>
                            {getStatusBadge(project.status)}
                          </div>
                        </div>
                        <Progress value={project.progress} className={`h-1.5 ${getProgressBarColor(project.status)}`} />
                      </div>

                      {/* Owner and Team */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-muted">{project.owner.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{project.owner.name}</span>
                        </div>
                        <div className="flex items-center -space-x-2">
                          {project.members.slice(0, 3).map((member, idx) => (
                            <Avatar key={idx} className="h-6 w-6 border-2 border-white">
                              <AvatarFallback className="text-[10px] bg-muted">{member.initials}</AvatarFallback>
                            </Avatar>
                          ))}
                          {project.members.length > 3 && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-muted text-[10px] font-medium">
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span>{project.knowledgeBases} KB</span>
                          <span>{project.connections} connections</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {project.lastActivity}
                        </div>
                      </div>

                      {/* Blocked Reason */}
                      {project.blockedReason && (
                        <div className="mt-3 rounded bg-red-50 px-2 py-1.5 text-xs text-red-600">
                          {project.blockedReason}
                        </div>
                      )}

                      
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-2">
                {/* Bulk Actions */}
                {selectedProjects.length > 0 && (
                  <div className="flex items-center gap-3 rounded-lg bg-[#ee3224]/5 border border-[#ee3224]/20 p-3">
                    <span className="text-sm font-medium">{selectedProjects.length} selected</span>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-3 w-3" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Rocket className="mr-2 h-3 w-3" />
                      Deploy
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                )}

                {/* Table */}
                <Card className="border border-[#E5E7EB]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox 
                            checked={selectedProjects.length === paginatedProjects.length && paginatedProjects.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                          <div className="flex items-center">
                            Project Name
                            <SortIcon field="name" />
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("owner")}>
                          <div className="flex items-center">
                            Owner
                            <SortIcon field="owner" />
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("environment")}>
                          <div className="flex items-center">
                            Environment
                            <SortIcon field="environment" />
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("progress")}>
                          <div className="flex items-center">
                            Progress
                            <SortIcon field="progress" />
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                          <div className="flex items-center">
                            Status
                            <SortIcon field="status" />
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("dueDate")}>
                          <div className="flex items-center">
                            Due Date
                            <SortIcon field="dueDate" />
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("lastActivity")}>
                          <div className="flex items-center">
                            Last Activity
                            <SortIcon field="lastActivity" />
                          </div>
                        </TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedProjects.map((project) => (
                        <TableRow 
                          key={project.id} 
                          className="cursor-pointer hover:bg-[#F5F7FA] group"
                          onClick={() => handleOpenProject(project.id)}
                        >
                          <TableCell className="py-4" onClick={(e) => e.stopPropagation()}>
                            <Checkbox 
                              checked={selectedProjects.includes(project.id)}
                              onCheckedChange={() => handleSelectProject(project.id)}
                            />
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2">
                              <div className={`flex h-8 w-8 items-center justify-center rounded ${
                                project.mode === "workflow" ? "bg-[#ee3224]/10" : "bg-blue-500/10"
                              }`}>
                                {project.mode === "workflow" ? (
                                  <Workflow className="h-4 w-4 text-[#ee3224]" />
                                ) : (
                                  <Code2 className="h-4 w-4 text-blue-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-foreground group-hover:text-[#ee3224] transition-colors">
                                  {project.name}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs bg-muted">{project.owner.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{project.owner.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">{getEnvironmentBadge(project.environment)}</TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2 w-32">
                              <Progress value={project.progress} className={`h-1.5 flex-1 ${getProgressBarColor(project.status)}`} />
                              <span className="text-xs font-medium w-8">{project.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer">
                                  {getStatusBadge(project.status)}
                                </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Building</DropdownMenuItem>
                                <DropdownMenuItem>Ready to Deploy</DropdownMenuItem>
                                <DropdownMenuItem>Deployed</DropdownMenuItem>
                                <DropdownMenuItem>Blocked</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell>
                            <span className={getDueDateColor(project.dueDateStatus)}>
                              {project.dueDateStatus === "complete" && <Check className="inline h-3 w-3 mr-0.5" />}
                              {project.dueDate}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{project.lastActivity}</span>
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenProject(project.id)}>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Open
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Rocket className="mr-2 h-4 w-4" />
                                  Deploy
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination + Export */}
                  <div className="flex items-center justify-between border-t border-border p-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground">No projects found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or create a new project.
                </p>
                <Button 
                  className="mt-4 gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]"
                  onClick={() => setShowNewProject(true)}
                >
                  <Plus className="h-4 w-4" />
                  New Agent
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
