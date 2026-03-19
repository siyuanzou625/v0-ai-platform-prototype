"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusTag } from "@/components/ui/status-tag"
import { Plus, Search, LayoutGrid, List, FolderOpen, Clock, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProjectItem {
  id: number
  title: string
  subtitle: string
  status: string
  environment: string
  updatedAt: string
  ownerName: string
  ownerInitials: string
}

const allProjects: ProjectItem[] = [
  { id: 1, title: "Customer Support Agent", subtitle: "AI-powered customer support automation", status: "deployed", environment: "production", updatedAt: "2 hours ago", ownerName: "Zoey Davis", ownerInitials: "ZD" },
  { id: 2, title: "Sales Assistant Bot", subtitle: "Automated sales qualification and scheduling", status: "building", environment: "staging", updatedAt: "5 hours ago", ownerName: "Marcus Chen", ownerInitials: "MC" },
  { id: 3, title: "Document Analyzer", subtitle: "Extract insights from documents using AI", status: "ready", environment: "development", updatedAt: "1 day ago", ownerName: "Sarah Kim", ownerInitials: "SK" },
  { id: 4, title: "Email Classifier", subtitle: "Automatically categorize and route emails", status: "blocked", environment: "staging", updatedAt: "3 days ago", ownerName: "James Wilson", ownerInitials: "JW" },
]

function formatStatus(s: string): string {
  const map: Record<string, string> = { deployed: "Deployed", building: "Building", ready: "Ready", blocked: "Blocked" }
  return map[s] || s
}

function formatEnv(e: string): string {
  const map: Record<string, string> = { production: "Production", staging: "Staging", development: "Development" }
  return map[e] || e
}

export default function ProjectsPage() {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filtered = allProjects.filter(proj =>
    proj.title.toLowerCase().includes(searchText.toLowerCase()) ||
    proj.subtitle.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="flex-1 overflow-auto bg-[#F5F7FA]">
        <div className="bg-white border-b border-[#E5E7EB]">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1F2937]">Projects</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your AI agent projects</p>
              </div>
              <Button className="bg-[#ee3224] hover:bg-[#ee3224]/90">
                <Plus className="h-4 w-4 mr-2" />New Project
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-10" value={searchText} onChange={e => setSearchText(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("grid")}><LayoutGrid className="h-4 w-4" /></Button>
                <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 py-6">
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filtered.map(proj => (
              <Card key={proj.id} className="card-interactive border border-[#E5E7EB] bg-white shadow-sm cursor-pointer" onClick={() => router.push(`/build/projects/${proj.id}`)}>
                <CardHeader className="py-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#ee3224]/10 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                      </div>
                      <div>
                        <CardTitle className="card-title-text text-base">{proj.title}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">{proj.subtitle}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="py-3 px-5 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <StatusTag label={formatStatus(proj.status)} />
                    <StatusTag label={formatEnv(proj.environment)} />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                        <span className="text-[10px] text-[#ee3224] font-medium">{proj.ownerInitials}</span>
                      </div>
                      <span>{proj.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{proj.updatedAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium text-[#1F2937]">No projects found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or create a new project</p>
              <Button className="mt-4 bg-[#ee3224] hover:bg-[#ee3224]/90"><Plus className="h-4 w-4 mr-2" />Create Project</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
