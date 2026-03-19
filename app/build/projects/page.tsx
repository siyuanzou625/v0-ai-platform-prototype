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

const projectsData = [
  {
    id: 1,
    name: "Customer Support Agent",
    desc: "AI-powered customer support automation",
    stat: "deployed",
    env: "production",
    time: "2 hours ago",
    userName: "Zoey Davis",
    userInit: "ZD",
  },
  {
    id: 2,
    name: "Sales Assistant Bot",
    desc: "Automated sales qualification and scheduling",
    stat: "building",
    env: "staging",
    time: "5 hours ago",
    userName: "Marcus Chen",
    userInit: "MC",
  },
  {
    id: 3,
    name: "Document Analyzer",
    desc: "Extract insights from documents using AI",
    stat: "ready",
    env: "development",
    time: "1 day ago",
    userName: "Sarah Kim",
    userInit: "SK",
  },
  {
    id: 4,
    name: "Email Classifier",
    desc: "Automatically categorize and route emails",
    stat: "blocked",
    env: "staging",
    time: "3 days ago",
    userName: "James Wilson",
    userInit: "JW",
  },
]

const getStatusLabel = (s: string) => {
  if (s === "deployed") return "Deployed"
  if (s === "building") return "Building"
  if (s === "ready") return "Ready"
  return "Blocked"
}

const getEnvLabel = (e: string) => {
  if (e === "production") return "Production"
  if (e === "staging") return "Staging"
  return "Development"
}

export default function ProjectsPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [mode, setMode] = useState<"grid" | "list">("grid")

  const items = projectsData.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="flex-1 overflow-auto bg-[#F5F7FA]">
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
            <div className="flex items-center justify-between">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={mode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={mode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <div
            className={
              mode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {items.map((p) => (
              <Card
                key={p.id}
                className="card-interactive border border-[#E5E7EB] bg-white shadow-sm cursor-pointer"
                onClick={() => router.push(`/build/projects/${p.id}`)}
              >
                <CardHeader className="py-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#ee3224]/10 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                      </div>
                      <div>
                        <CardTitle className="card-title-text text-base">
                          {p.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {p.desc}
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
                  <div className="flex items-center gap-3">
                    <StatusTag label={getStatusLabel(p.stat)} />
                    <StatusTag label={getEnvLabel(p.env)} />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                        <span className="text-[10px] text-[#ee3224] font-medium">
                          {p.userInit}
                        </span>
                      </div>
                      <span>{p.userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{p.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {items.length === 0 && (
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
