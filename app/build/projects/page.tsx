"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusTag } from "@/components/ui/status-tag"
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  FolderOpen,
  Clock,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Project type definition
interface ProjectData {
  id: number
  name: string
  description: string
  status: "deployed" | "building" | "ready" | "blocked"
  environment: "production" | "staging" | "development"
  lastActivity: string
  ownerName: string
  ownerInitials: string
}

// Sample projects data
const projectsData: ProjectData[] = [
  {
    id: 1,
    name: "Customer Support Agent",
    description: "AI-powered customer support automation",
    status: "deployed",
    environment: "production",
    lastActivity: "2 hours ago",
    ownerName: "Zoey Davis",
    ownerInitials: "ZD",
  },
  {
    id: 2,
    name: "Sales Assistant Bot",
    description: "Automated sales qualification and scheduling",
    status: "building",
    environment: "staging",
    lastActivity: "5 hours ago",
    ownerName: "Marcus Chen",
    ownerInitials: "MC",
  },
  {
    id: 3,
    name: "Document Analyzer",
    description: "Extract insights from documents using AI",
    status: "ready",
    environment: "development",
    lastActivity: "1 day ago",
    ownerName: "Sarah Kim",
    ownerInitials: "SK",
  },
  {
    id: 4,
    name: "Email Classifier",
    description: "Automatically categorize and route emails",
    status: "blocked",
    environment: "staging",
    lastActivity: "3 days ago",
    ownerName: "James Wilson",
    ownerInitials: "JW",
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProjects = projectsData.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="flex-1 overflow-auto bg-[#F5F7FA]">
        {/* Header Section */}
        <div className="bg-white border-b border-[#E5E7EB]">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1F2937]">Projects</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your AI agent projects
                </p>
              </div>
              <Button className="bg-[#ee3224] hover:bg-[#ee3224]/90">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Search and View Toggle */}
            <div className="flex items-center justify-between">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="card-interactive border border-[#E5E7EB] bg-white shadow-sm cursor-pointer"
                onClick={() => router.push(`/build/projects/${project.id}`)}
              >
                <CardHeader className="py-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#ee3224]/10 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                      </div>
                      <div>
                        <CardTitle className="card-title-text text-base">
                          {project.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="py-3 px-5 border-t border-[#E5E7EB]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <StatusTag
                        label={
                          project.status === "deployed"
                            ? "Deployed"
                            : project.status === "building"
                            ? "Building"
                            : project.status === "ready"
                            ? "Ready"
                            : "Blocked"
                        }
                      />
                      <StatusTag
                        label={
                          project.environment === "production"
                            ? "Production"
                            : project.environment === "staging"
                            ? "Staging"
                            : "Development"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                        <span className="text-[10px] text-[#ee3224] font-medium">
                          {project.ownerInitials}
                        </span>
                      </div>
                      <span>{project.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{project.lastActivity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium text-[#1F2937]">
                No projects found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or create a new project
              </p>
              <Button className="mt-4 bg-[#ee3224] hover:bg-[#ee3224]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
