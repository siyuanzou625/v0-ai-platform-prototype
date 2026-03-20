"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusTag } from "@/components/ui/status-tag"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Clock,
  MoreHorizontal,
  FolderKanban,
  Bot,
  Play,
  Users,
  GitBranch,
  Activity,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock projects data matching Knowledge page structure
const projects = [
  {
    id: "proj-001",
    name: "Customer Support Bot",
    description: "AI-powered customer support agent with multi-channel integration and sentiment analysis.",
    status: "active",
    environment: "production",
    version: "2.1.0",
    agentCount: 3,
    workflowCount: 5,
    members: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Mike Johnson", initials: "MJ" },
      { name: "Emily Davis", initials: "ED" },
    ],
    lastUpdated: "2 hours ago",
    conversations: 1234,
  },
  {
    id: "proj-002",
    name: "Sales Assistant",
    description: "Lead qualification and outreach automation with CRM integration.",
    status: "draft",
    environment: "development",
    version: "1.0.0",
    agentCount: 2,
    workflowCount: 3,
    members: [
      { name: "Alex Kim", initials: "AK" },
      { name: "Jordan Lee", initials: "JL" },
    ],
    lastUpdated: "1 day ago",
    conversations: 45,
  },
  {
    id: "proj-003",
    name: "HR Onboarding Agent",
    description: "Employee onboarding automation with document processing and task management.",
    status: "active",
    environment: "staging",
    version: "1.5.2",
    agentCount: 1,
    workflowCount: 8,
    members: [
      { name: "Lisa Park", initials: "LP" },
      { name: "David Brown", initials: "DB" },
      { name: "Nina Patel", initials: "NP" },
      { name: "Ryan Garcia", initials: "RG" },
    ],
    lastUpdated: "3 days ago",
    conversations: 567,
  },
  {
    id: "proj-004",
    name: "Data Analytics Dashboard",
    description: "Real-time analytics and reporting agent with natural language queries.",
    status: "paused",
    environment: "production",
    version: "3.0.1",
    agentCount: 2,
    workflowCount: 4,
    members: [
      { name: "Sophie Turner", initials: "ST" },
    ],
    lastUpdated: "1 week ago",
    conversations: 2890,
  },
  {
    id: "proj-005",
    name: "Content Generator",
    description: "AI content creation assistant for marketing and social media.",
    status: "active",
    environment: "production",
    version: "2.0.0",
    agentCount: 4,
    workflowCount: 6,
    members: [
      { name: "Mark Wilson", initials: "MW" },
      { name: "Sarah Chen", initials: "SC" },
    ],
    lastUpdated: "5 hours ago",
    conversations: 892,
  },
  {
    id: "proj-006",
    name: "Code Review Assistant",
    description: "Automated code review and documentation generator for development teams.",
    status: "draft",
    environment: "development",
    version: "0.9.0",
    agentCount: 1,
    workflowCount: 2,
    members: [
      { name: "Alex Kim", initials: "AK" },
    ],
    lastUpdated: "4 days ago",
    conversations: 0,
  },
]

// Get status badge
const getStatusBadge = (status: string) => {
  const statusMap: Record<string, string> = {
    active: "Active",
    draft: "Draft",
    paused: "Paused",
  }
  return <StatusTag label={statusMap[status] || status} />
}

// Get environment badge style
const getEnvBadgeStyle = (env: string) => {
  switch (env) {
    case "production": return "bg-emerald-50 text-emerald-700 border-emerald-200"
    case "staging": return "bg-amber-50 text-amber-700 border-amber-200"
    case "development": return "bg-blue-50 text-blue-700 border-blue-200"
    default: return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [envFilter, setEnvFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Project creation states
  const [showNewProject, setShowNewProject] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")

  const filteredProjects = projects
    .filter((proj) => {
      const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || proj.status === statusFilter
      const matchesEnv = envFilter === "all" || proj.environment === envFilter
      return matchesSearch && matchesStatus && matchesEnv
    })
    .sort((a, b) => {
      if (sortBy === "recent") return 0
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "conversations") return b.conversations - a.conversations
      return 0
    })

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setEnvFilter("all")
    setSortBy("recent")
  }

  const hasActiveFilters = searchQuery || statusFilter !== "all" || envFilter !== "all"

  const handleOpenProject = (projectId: string) => {
    router.push(`/layer4/workflow?project=${projectId}`)
  }

  const handleCreateProject = () => {
    setShowNewProject(false)
    setProjectName("")
    setProjectDescription("")
    // In real app, would POST to API and redirect
  }

  return (
    <AppLayout>
      <>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-[#ee3224]" />
                <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                Build and manage AI agent projects with visual workflows.
              </p>
            </div>
            <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Set up a new AI agent project with visual workflow builder.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name <span className="text-[#ee3224]">*</span></Label>
                    <Input
                      id="projectName"
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">Description</Label>
                    <Textarea
                      id="projectDescription"
                      placeholder="Describe your project..."
                      className="resize-none"
                      rows={3}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Environment</Label>
                    <Select defaultValue="development">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowNewProject(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                    onClick={handleCreateProject}
                    disabled={!projectName.trim()}
                  >
                    Create Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-[89px] z-10 border-b border-[#E5E7EB] bg-white px-8 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-9 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={envFilter} onValueChange={setEnvFilter}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="conversations">Most Active</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-[#F5F7FA]">
          <div className="px-8 py-6 space-y-6">
            {/* Project Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((proj) => (
                <Card
                  key={proj.id}
                  className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm cursor-pointer"
                  onClick={() => handleOpenProject(proj.id)}
                >
                  <CardContent className="py-3 px-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-100">
                          <FolderKanban className="h-4 w-4 text-slate-600" />
                        </div>
                        <h3 className="card-title-text font-semibold text-foreground transition-colors duration-150 line-clamp-1">
                          {proj.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(proj.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleOpenProject(proj.id) }}>
                              <Play className="h-4 w-4 mr-2" />
                              Open Builder
                            </DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Metadata */}
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bot className="h-3 w-3" />
                        {proj.agentCount} agents
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3" />
                        {proj.workflowCount} workflows
                      </span>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${getEnvBadgeStyle(proj.environment)}`}>
                        {proj.environment}
                      </Badge>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center -space-x-2">
                        {proj.members.slice(0, 3).map((member, idx) => (
                          <Avatar key={idx} className="h-6 w-6 border-2 border-white">
                            <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {proj.members.length > 3 && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-muted text-[10px] font-medium text-muted-foreground">
                            +{proj.members.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          <span>{proj.conversations.toLocaleString()} conversations</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {proj.lastUpdated}
                        </div>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FolderKanban className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No projects found</p>
                <p className="text-sm mt-1">Try adjusting your filters or create a new project.</p>
              </div>
            )}
          </div>
        </div>
      </>
    </AppLayout>
  )
}
