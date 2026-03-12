"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Search,
  Plus,
  Workflow,
  Code2,
  Clock,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock projects data
const projects = [
  {
    id: "1",
    name: "Enterprise Sales Agent",
    description: "AI-powered sales assistant that qualifies leads and schedules meetings automatically.",
    mode: "workflow",
    lastActivity: "2 hours ago",
    members: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Mike Johnson", initials: "MJ" },
      { name: "Emily Davis", initials: "ED" },
    ],
  },
  {
    id: "2",
    name: "Data Pipeline v2",
    description: "ETL pipeline for processing customer data with real-time validation.",
    mode: "code",
    lastActivity: "5 hours ago",
    members: [
      { name: "Alex Kim", initials: "AK" },
      { name: "Jordan Lee", initials: "JL" },
    ],
  },
  {
    id: "3",
    name: "Customer Support Bot",
    description: "Multi-channel support agent handling tickets via email, chat, and voice.",
    mode: "workflow",
    lastActivity: "1 day ago",
    members: [
      { name: "Taylor Swift", initials: "TS" },
      { name: "Chris Martin", initials: "CM" },
      { name: "Emma Watson", initials: "EW" },
      { name: "John Doe", initials: "JD" },
    ],
  },
  {
    id: "4",
    name: "Analytics Dashboard API",
    description: "Backend service for real-time analytics and reporting dashboards.",
    mode: "code",
    lastActivity: "3 days ago",
    members: [
      { name: "Lisa Park", initials: "LP" },
    ],
  },
  {
    id: "5",
    name: "Invoice Processor",
    description: "Automated invoice extraction and validation workflow using OCR.",
    mode: "workflow",
    lastActivity: "1 week ago",
    members: [
      { name: "David Brown", initials: "DB" },
      { name: "Nina Patel", initials: "NP" },
    ],
  },
  {
    id: "6",
    name: "Notification Service",
    description: "Centralized notification system for email, SMS, and push notifications.",
    mode: "code",
    lastActivity: "2 weeks ago",
    members: [
      { name: "Ryan Garcia", initials: "RG" },
      { name: "Sophie Turner", initials: "ST" },
      { name: "Mark Wilson", initials: "MW" },
    ],
  },
]



export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newProjectMode, setNewProjectMode] = useState<"workflow" | "code">("workflow")

  

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenProject = (projectId: string) => {
    router.push(`/layer4/workspace?id=${projectId}`)
  }

  const handleCreateProject = () => {
    setShowNewProject(false)
    setNewProjectName("")
    setNewProjectDescription("")
    router.push(`/layer4/workspace?id=new&mode=${newProjectMode}`)
  }

  

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col overflow-auto bg-[#F5F7FA]">
        {/* My Projects Section */}
        <div className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-foreground">My Projects</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="w-64 pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
                    <Plus className="h-4 w-4" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Set up a new AI agent project with your preferred development mode.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        placeholder="Enter project name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Description</Label>
                      <Textarea
                        id="projectDescription"
                        placeholder="Describe your project..."
                        className="resize-none"
                        rows={3}
                        value={newProjectDescription}
                        onChange={(e) => setNewProjectDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Development Mode</Label>
                      <RadioGroup
                        value={newProjectMode}
                        onValueChange={(v) => setNewProjectMode(v as "workflow" | "code")}
                        className="grid grid-cols-2 gap-3"
                      >
                        <Label
                          htmlFor="mode-workflow"
                          className={`flex cursor-pointer flex-col items-center gap-2 rounded border-2 p-4 transition-colors ${
                            newProjectMode === "workflow"
                              ? "border-[#ee3224] bg-[#ee3224]/5"
                              : "border-border hover:border-[#ee3224]/50"
                          }`}
                        >
                          <RadioGroupItem value="workflow" id="mode-workflow" className="sr-only" />
                          <Workflow className={`h-6 w-6 ${newProjectMode === "workflow" ? "text-[#ee3224]" : "text-muted-foreground"}`} />
                          <span className={`text-sm font-medium ${newProjectMode === "workflow" ? "text-[#ee3224]" : "text-foreground"}`}>
                            Workflow
                          </span>
                          <span className="text-xs text-muted-foreground text-center">
                            Visual drag-and-drop builder
                          </span>
                        </Label>
                        <Label
                          htmlFor="mode-code"
                          className={`flex cursor-pointer flex-col items-center gap-2 rounded border-2 p-4 transition-colors ${
                            newProjectMode === "code"
                              ? "border-[#ee3224] bg-[#ee3224]/5"
                              : "border-border hover:border-[#ee3224]/50"
                          }`}
                        >
                          <RadioGroupItem value="code" id="mode-code" className="sr-only" />
                          <Code2 className={`h-6 w-6 ${newProjectMode === "code" ? "text-[#ee3224]" : "text-muted-foreground"}`} />
                          <span className={`text-sm font-medium ${newProjectMode === "code" ? "text-[#ee3224]" : "text-foreground"}`}>
                            Code
                          </span>
                          <span className="text-xs text-muted-foreground text-center">
                            Full IDE experience
                          </span>
                        </Label>
                      </RadioGroup>
                    </div>
                    <Button
                      className="w-full bg-[#ee3224] hover:bg-[#cc2a1e]"
                      onClick={handleCreateProject}
                      disabled={!newProjectName.trim()}
                    >
                      Create Project
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Project Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <h3 className="font-semibold text-foreground group-hover:text-[#ee3224] transition-colors">
                          {project.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={`mt-1 text-xs ${
                            project.mode === "workflow"
                              ? "bg-[#ee3224]/10 text-[#ee3224]"
                              : "bg-blue-500/10 text-blue-600"
                          }`}
                        >
                          {project.mode === "workflow" ? "Workflow Project" : "Code Project"}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {project.members.slice(0, 3).map((member, idx) => (
                        <Avatar key={idx} className="h-7 w-7 border-2 border-white">
                          <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-muted text-xs font-medium text-muted-foreground">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {project.lastActivity}
                    </div>
                  </div>

                  <Button
                    className="mt-4 w-full bg-[#ee3224] hover:bg-[#cc2a1e]"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenProject(project.id)
                    }}
                  >
                    Open
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
