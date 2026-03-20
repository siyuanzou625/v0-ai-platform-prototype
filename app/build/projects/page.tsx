"use client"
// FRESH BUILD - v2 - No Avatar components used
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusTag } from "@/components/ui/status-tag"
import { Search, Plus, LayoutGrid, List } from "lucide-react"

type TProjectItem = {
  id: number
  title: string
  description: string
  statusLabel: string
  envLabel: string
  ownerInitials: string
  ownerDisplayName: string
}

const PROJECT_LIST: TProjectItem[] = [
  { id: 1, title: "Customer Support Bot", description: "AI-powered support agent", statusLabel: "Active", envLabel: "Production", ownerInitials: "ZD", ownerDisplayName: "Zoey" },
  { id: 2, title: "Sales Assistant", description: "Lead qualification bot", statusLabel: "Draft", envLabel: "Development", ownerInitials: "AP", ownerDisplayName: "Alex" },
  { id: 3, title: "HR Onboarding", description: "Employee onboarding automation", statusLabel: "Active", envLabel: "Staging", ownerInitials: "MJ", ownerDisplayName: "Maria" },
  { id: 4, title: "Data Analyzer", description: "Analytics dashboard agent", statusLabel: "Paused", envLabel: "Production", ownerInitials: "RK", ownerDisplayName: "Raj" },
]

export default function BuildProjectsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  const filteredProjects = PROJECT_LIST.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredProjects.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow border border-[#E5E7EB]"
              onClick={() => router.push(`/build/projects/${item.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-[#1F2937]">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <StatusTag label={item.statusLabel} />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-[#ee3224]">{item.ownerInitials}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.ownerDisplayName}</span>
                  </div>
                  <StatusTag label={item.envLabel} variant="category" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found matching your search.
          </div>
        )}
      </div>
    </AppLayout>
  )
}
