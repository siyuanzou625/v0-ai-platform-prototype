"use client"

// IMPORTANT: This file uses AvatarFallback only (NOT AvatarImage)
// Owner is an object: { name: string, initials: string }

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusTag } from "@/components/ui/status-tag"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  MoreHorizontal,
  FolderOpen,
  LayoutGrid,
  List,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
} from "lucide-react"

// Project owner type
interface ProjectOwner {
  name: string
  initials: string
}

// Project type
interface Project {
  id: number
  name: string
  description: string
  status: string
  environment: string
  owner: ProjectOwner
  progress: number
  dueDate: string
  lastActivity: string
}

// Mock project data
const projects: Project[] = [
  {
    id: 1,
    name: "Customer Support Bot",
    description: "AI-powered customer service automation",
    status: "deployed",
    environment: "production",
    owner: { name: "Zoey", initials: "ZD" },
    progress: 100,
    dueDate: "2025-03-15",
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "Sales Analytics Dashboard",
    description: "Real-time sales metrics and insights",
    status: "building",
    environment: "staging",
    owner: { name: "Alex", initials: "AC" },
    progress: 65,
    dueDate: "2025-03-20",
    lastActivity: "1 day ago",
  },
  {
    id: 3,
    name: "Inventory Management System",
    description: "Automated inventory tracking solution",
    status: "ready",
    environment: "development",
    owner: { name: "Jordan", initials: "JM" },
    progress: 90,
    dueDate: "2025-03-25",
    lastActivity: "3 hours ago",
  },
  {
    id: 4,
    name: "HR Onboarding Portal",
    description: "Employee onboarding workflow automation",
    status: "blocked",
    environment: "staging",
    owner: { name: "Taylor", initials: "TS" },
    progress: 45,
    dueDate: "2025-04-01",
    lastActivity: "5 days ago",
  },
]

// Status badge helper
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

// Environment badge helper
const getEnvironmentBadge = (env: string) => {
  const envMap: Record<string, string> = {
    production: "Production",
    staging: "Staging",
    development: "Development",
  }
  const label = envMap[env]
  return label ? <StatusTag label={label} /> : null
}

export default function ProjectsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleProjectClick = (projectId: number) => {
    router.push(`/build/projects/${projectId}`)
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="sticky top-0 z-10 bg-white px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-[#ee3224]" />
              <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage and monitor your AI projects
            </p>
          </div>
          <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[#F5F7FA] px-8 py-6">
        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="card-interactive group cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground card-title-text truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Deploy
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {getStatusBadge(project.status)}
                    {getEnvironmentBadge(project.environment)}
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-[#ee3224]/10 text-[#ee3224]">
                            {project.owner.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {project.owner.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {project.lastActivity}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Progress value={project.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-[#ee3224]/10 text-[#ee3224]">
                            {project.owner.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{project.owner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getEnvironmentBadge(project.environment)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-16 h-1.5" />
                        <span className="text-xs text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {project.lastActivity}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
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
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
