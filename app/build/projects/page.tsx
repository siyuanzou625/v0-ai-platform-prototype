"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusTag } from "@/components/ui/status-tag"
import { Search, Plus, LayoutGrid, List } from "lucide-react"

interface ProjectData {
  id: number
  name: string
  desc: string
  status: string
  env: string
  userInitials: string
  userName: string
}

const DATA: ProjectData[] = [
  { id: 1, name: "Customer Support Bot", desc: "AI-powered support agent", status: "Active", env: "Production", userInitials: "ZD", userName: "Zoey" },
  { id: 2, name: "Sales Assistant", desc: "Lead qualification bot", status: "Draft", env: "Development", userInitials: "AP", userName: "Alex" },
  { id: 3, name: "HR Onboarding", desc: "Employee onboarding automation", status: "Active", env: "Staging", userInitials: "MJ", userName: "Maria" },
  { id: 4, name: "Data Analyzer", desc: "Analytics dashboard agent", status: "Paused", env: "Production", userInitials: "RK", userName: "Raj" },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  const filtered = DATA.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2937]">Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your AI projects</p>
          </div>
          <Button className="bg-[#ee3224] hover:bg-[#ee3224]/90">
            <Plus className="h-4 w-4 mr-2" /> New Project
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex border rounded-md">
            <Button
              variant={viewType === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewType("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewType("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={viewType === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3"}>
          {filtered.map((proj) => (
            <Card
              key={proj.id}
              className="cursor-pointer hover:shadow-md transition-shadow border border-[#E5E7EB]"
              onClick={() => router.push(`/build/projects/${proj.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-[#1F2937]">{proj.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{proj.desc}</p>
                  </div>
                  <StatusTag label={proj.status} />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-[#ee3224]">{proj.userInitials}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{proj.userName}</span>
                  </div>
                  <StatusTag label={proj.env} variant="category" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found matching your search.
          </div>
        )}
      </div>
    </AppLayout>
  )
}
