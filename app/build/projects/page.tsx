"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusTag } from "@/components/ui/status-tag"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  FolderOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Check,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  Users,
  Rocket,
  GitBranch,
  Activity,
} from "lucide-react"

interface ProjectOwner {
  name: string
  initials: string
}

interface Project {
  id: number
  name: string
  description: string
  status: string
  progress: number
  dueDate: string
  owner: ProjectOwner
  environment: string
  lastActivity: string
  agents: number
  workflows: number
}

const projects: Project[] = [
  {
    id: 1,
    name: "Customer Support AI",
    description: "Automated customer support with intelligent routing",
    status: "deployed",
    progress: 100,
    dueDate: "2025-01-15",
    owner: { name: "Zoey", initials: "ZD" },
    environment: "production",
    lastActivity: "2 hours ago",
    agents: 3,
    workflows: 5,
  },
  {
    id: 2,
    name: "Sales Analytics Dashboard",
    description: "Real-time sales metrics and forecasting",
    status: "building",
    progress: 65,
    dueDate: "2025-02-01",
    owner: { name: "Alex", initials: "AC" },
    environment: "staging",
    lastActivity: "30 minutes ago",
    agents: 2,
    workflows: 3,
  },
  {
    id: 3,
    name: "HR Onboarding Bot",
    description: "Streamlined employee onboarding experience",
    status: "ready",
    progress: 100,
    dueDate: "2025-01-20",
    owner: { name: "Sam", initials: "SR" },
    environment: "production",
    lastActivity: "1 day ago",
    agents: 1,
    workflows: 4,
  },
  {
    id: 4,
    name: "Marketing Campaign Manager",
    description: "AI-powered campaign optimization",
    status: "blocked",
    progress: 40,
    dueDate: "2025-02-15",
    owner: { name: "Jordan", initials: "JM" },
    environment: "development",
    lastActivity: "3 hours ago",
    agents: 4,
    workflows: 6,
  },
  {
    id: 5,
    name: "Inventory Management System",
    description: "Smart inventory tracking and reordering",
    status: "deployed",
    progress: 100,
    dueDate: "2025-01-10",
    owner: { name: "Taylor", initials: "TW" },
    environment: "production",
    lastActivity: "5 hours ago",
    agents: 2,
    workflows: 3,
  },
]

const recentActivity = [
  { id: 1, action: "Deployed", project: "Customer Support AI", time: "2 hours ago", user: "Zoey", initials: "ZD" },
  { id: 2, action: "Updated", project: "Sales Analytics Dashboard", time: "30 min ago", user: "Alex", initials: "AC" },
  { id: 3, action: "Created", project: "HR Onboarding Bot", time: "1 day ago", user: "Sam", initials: "SR" },
]

const getStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    deployed: "Deployed",
    ready: "Ready",
    building: "Building",
    blocked: "Blocked",
  }
  return map[status] || status
}

const getEnvironmentLabel = (env: string): string => {
  const map: Record<string, string> = {
    production: "Production",
    staging: "Staging",
    development: "Development",
  }
  return map[env] || env
}

export default function ProjectsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: projects.length,
    deployed: projects.filter((p) => p.status === "deployed").length,
    inProgress: projects.filter((p) => p.status === "building").length,
    blocked: projects.filter((p) => p.status === "blocked").length,
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="bg-white -mx-6 -mt-6 px-6 py-6 border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-[#1F2937]">Projects</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage and monitor your AI projects
                </p>
              </div>
              <Button className="gap-2 bg-[#ee3224] hover:bg-[#ee3224]/90">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-9 bg-[#F5F7FA] border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-[#F5F7FA] border-0">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="deployed">Deployed</SelectItem>
                  <SelectItem value="building">Building</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center border rounded-md bg-[#F5F7FA]">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="hover:-translate-y-0.5 hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                    <p className="text-2xl font-semibold group-hover:text-[#ee3224] transition-colors">{stats.total}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                    <FolderOpen className="h-5 w-5 text-[#6B7280]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-0.5 hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Deployed</p>
                    <p className="text-2xl font-semibold group-hover:text-[#ee3224] transition-colors">{stats.deployed}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-0.5 hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-semibold group-hover:text-[#ee3224] transition-colors">{stats.inProgress}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <PlayCircle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-0.5 hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Blocked</p>
                    <p className="text-2xl font-semibold group-hover:text-[#ee3224] transition-colors">{stats.blocked}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:-translate-y-0.5 hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer group"
                  onClick={() => router.push(`/build/projects/${project.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base font-medium group-hover:text-[#ee3224] transition-colors">
                          {project.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <StatusTag label={getStatusLabel(project.status)} />
                      <StatusTag label={getEnvironmentLabel(project.environment)} />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-[#ee3224]/10 text-[#ee3224]">
                              {project.owner.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-muted-foreground">{project.owner.name}</span>
                        </div>
                        <span className="text-muted-foreground">{project.lastActivity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow
                      key={project.id}
                      className="cursor-pointer hover:bg-[#F5F7FA]"
                      onClick={() => router.push(`/build/projects/${project.id}`)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusTag label={getStatusLabel(project.status)} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-[#ee3224]/10 text-[#ee3224]">
                              {project.owner.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span>{project.owner.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusTag label={getEnvironmentLabel(project.environment)} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="w-20 h-1.5" />
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{project.lastActivity}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-[#ee3224]/10 text-[#ee3224]">
                        {activity.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action.toLowerCase()}</span>{" "}
                        <span className="font-medium">{activity.project}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
