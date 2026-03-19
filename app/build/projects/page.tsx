"use client"
// @refresh reset - Force complete HMR refresh
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusTag } from "@/components/ui/status-tag"
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
  Folder,
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
  { id: 1, user: "Zoey", initials: "ZD", action: "updated workflow in", project: "Enterprise Sales Agent", projectId: "proj-001", timestamp: "2 hours ago", isCurrentUser: true },
  { id: 2, user: "Alex", initials: "AK", action: "deployed", project: "Customer Support Bot", projectId: "proj-003", timestamp: "1 day ago", isCurrentUser: false },
  { id: 3, user: "Sarah", initials: "SC", action: "added knowledge base to", project: "Data Pipeline v2", projectId: "proj-002", timestamp: "5 hours ago", isCurrentUser: false },
  { id: 4, user: "Michael", initials: "MJ", action: "created new API endpoint in", project: "Analytics Dashboard API", projectId: "proj-004", timestamp: "3 hours ago", isCurrentUser: false },
  { id: 5, user: "Zoey", initials: "ZD", action: "commented on", project: "Invoice Processor", projectId: "proj-005", timestamp: "2 days ago", isCurrentUser: true },
  { id: 6, user: "Alex", initials: "AK", action: "updated connections in", project: "Notification Service", projectId: "proj-006", timestamp: "30 minutes ago", isCurrentUser: false },
  { id: 7, user: "Sarah", initials: "SC", action: "resolved bug in", project: "Data Pipeline v2", projectId: "proj-002", timestamp: "6 hours ago", isCurrentUser: false },
]

// Helper functions
const getStatusBadge = (status: string) => {
  const statusMap: Record<string, string> = {
    deployed: "Deployed",
    ready: "Ready",
    building: "Building",
    blocked: "Blocked",
  }
  const label = statusMap[status]
  return label ? <StatusTag label={label} /> : null
}

const getEnvironmentBadge = (env: string) => {
  const envMap: Record<string, string> = {
    production: "Production",
    staging: "Staging",
    development: "Development",
  }
  const label = envMap[env]
  return label ? <StatusTag label={label} /> : null
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
  const readyCount = projects.filter(p => p.status === "ready").length
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
      <>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-[#ee3224]" />
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
                    <div className="grid grid-cols-3 gap-4">
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
                            <span className={`text-sm font-medium ${selectedTemplate === template.id ? "text-[#ee3224]" : "text-[#1F2937]"}`}>{template.name}</span>
                            <span className="text-xs text-[#6B7280] mt-0.5">{template.description}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-8 py-4 bg-[#F5F7FA] border-t border-[#E5E7EB]">
                  <Button variant="outline" onClick={() => setShowNewProject(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                    onClick={handleCreateProject}
                    disabled={!newProjectDescription.trim() && !selectedTemplate}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Building
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Filters Row */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={environmentFilter} onValueChange={(v) => setEnvironmentFilter(v as Environment)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as Status)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="building">Building</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="deployed">Deployed</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || environmentFilter !== "all" || statusFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "dashboard" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleViewChange("dashboard")}
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleViewChange("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleViewChange("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
          {viewMode === "dashboard" && (
            <div className="space-y-6">
              {/* Metrics Row */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleMetricClick("all")}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Projects</p>
                        <p className="text-2xl font-semibold">{totalProjects}</p>
                      </div>
                      <Folder className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleMetricClick("building")}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                        <p className="text-2xl font-semibold text-amber-600">{inProgressCount}</p>
                      </div>
                      <PlayCircle className="h-8 w-8 text-amber-600/50" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleMetricClick("ready")}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Ready to Deploy</p>
                        <p className="text-2xl font-semibold text-emerald-600">{readyCount}</p>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-emerald-600/50" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleMetricClick("blocked")}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Blocked</p>
                        <p className="text-2xl font-semibold text-red-600">{blockedCount}</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-red-600/50" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-3 gap-6">
                {/* Recent Projects */}
                <div className="col-span-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium">Recent Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {filteredProjects.slice(0, 5).map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors group"
                          onClick={() => handleOpenProject(project.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                              project.mode === "workflow" ? "bg-violet-100" : "bg-blue-100"
                            }`}>
                              {project.mode === "workflow" ? (
                                <Workflow className="h-5 w-5 text-violet-600" />
                              ) : (
                                <Code2 className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium group-hover:text-[#ee3224] transition-colors">{project.name}</p>
                              <p className="text-xs text-muted-foreground">{project.lastActivity}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(project.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" /> Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Timeline */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium">Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        {activityTimeline.map((activity) => (
                          <div key={activity.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className={`text-xs ${activity.isCurrentUser ? "bg-[#ee3224]/10 text-[#ee3224]" : "bg-muted"}`}>
                                {activity.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-sm">
                              <p>
                                <span className="font-medium">{activity.user}</span>{" "}
                                <span className="text-muted-foreground">{activity.action}</span>{" "}
                                <span className="font-medium text-[#ee3224] cursor-pointer hover:underline" onClick={() => handleOpenProject(activity.projectId)}>
                                  {activity.project}
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {viewMode === "grid" && (
            <div className="grid grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-[#ee3224] transition-all duration-200 group"
                  onClick={() => handleOpenProject(project.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        project.mode === "workflow" ? "bg-violet-100" : "bg-blue-100"
                      }`}>
                        {project.mode === "workflow" ? (
                          <Workflow className="h-5 w-5 text-violet-600" />
                        ) : (
                          <Code2 className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                          <DropdownMenuItem><Rocket className="mr-2 h-4 w-4" /> Deploy</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="font-medium mb-1 group-hover:text-[#ee3224] transition-colors">{project.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusBadge(project.status)}
                      {getEnvironmentBadge(project.environment)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px] bg-muted">{project.owner.initials}</AvatarFallback>
                        </Avatar>
                        <span>{project.owner.name}</span>
                      </div>
                      <span>{project.lastActivity}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "list" && (
            <Card>
              <CardContent className="p-0">
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
                          Project <SortIcon field="name" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("owner")}>
                        <div className="flex items-center">
                          Owner <SortIcon field="owner" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("environment")}>
                        <div className="flex items-center">
                          Environment <SortIcon field="environment" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("progress")}>
                        <div className="flex items-center">
                          Progress <SortIcon field="progress" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                        <div className="flex items-center">
                          Status <SortIcon field="status" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("dueDate")}>
                        <div className="flex items-center">
                          Due Date <SortIcon field="dueDate" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("lastActivity")}>
                        <div className="flex items-center">
                          Last Activity <SortIcon field="lastActivity" />
                        </div>
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedProjects.map((project) => (
                      <TableRow 
                        key={project.id} 
                        className="cursor-pointer group"
                        onClick={() => handleOpenProject(project.id)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedProjects.includes(project.id)}
                            onCheckedChange={() => handleSelectProject(project.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                              project.mode === "workflow" ? "bg-violet-100" : "bg-blue-100"
                            }`}>
                              {project.mode === "workflow" ? (
                                <Workflow className="h-4 w-4 text-violet-600" />
                              ) : (
                                <Code2 className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium group-hover:text-[#ee3224] transition-colors">{project.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-muted">{project.owner.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{project.owner.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getEnvironmentBadge(project.environment)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 w-32">
                            <Progress value={project.progress} className="h-1.5 flex-1" />
                            <span className="text-xs font-medium w-8">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
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
                        <TableCell className="text-muted-foreground text-sm">{project.lastActivity}</TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                              <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                              <DropdownMenuItem><Rocket className="mr-2 h-4 w-4" /> Deploy</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t">
                    <p className="text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * projectsPerPage + 1} to {Math.min(currentPage * projectsPerPage, sortedProjects.length)} of {sortedProjects.length} projects
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">Page {currentPage} of {totalPages}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </>
    </AppLayout>
  )
}
