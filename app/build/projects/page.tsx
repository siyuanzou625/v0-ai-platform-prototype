"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusTag } from "@/components/ui/status-tag"
import { Search, Plus, LayoutGrid, List, FolderOpen } from "lucide-react"

interface ProjectData {
  id: number
  name: string
  desc: string
  status: string
  env: string
  ownerName: string
  ownerInitials: string
  progress: number
  due: string
}

const projectList: ProjectData[] = [
  { id: 1, name: "Customer Support Bot", desc: "AI-powered support automation", status: "Active", env: "Production", ownerName: "Zoey D", ownerInitials: "ZD", progress: 75, due: "Mar 30, 2025" },
  { id: 2, name: "Sales Analytics Dashboard", desc: "Real-time sales metrics", status: "In Review", env: "Staging", ownerName: "Marcus T", ownerInitials: "MT", progress: 90, due: "Apr 5, 2025" },
  { id: 3, name: "Content Generator", desc: "AI content creation tool", status: "Draft", env: "Development", ownerName: "Sarah L", ownerInitials: "SL", progress: 30, due: "Apr 15, 2025" },
  { id: 4, name: "Email Automation", desc: "Smart email sequences", status: "Active", env: "Production", ownerName: "James W", ownerInitials: "JW", progress: 100, due: "Mar 20, 2025" },
  { id: 5, name: "Data Pipeline", desc: "ETL workflow automation", status: "Paused", env: "Staging", ownerName: "Nina K", ownerInitials: "NK", progress: 45, due: "Apr 10, 2025" },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filtered = projectList.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-[#1F2937]">Projects</h1>
                <p className="text-sm text-[#6B7280] mt-1">Manage your AI projects</p>
              </div>
              <Button className="bg-[#ee3224] hover:bg-[#ee3224]/90 text-white">
                <Plus className="h-4 w-4 mr-2" /> New Project
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                <Input
                  placeholder="Search projects..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-1 border rounded-md p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${viewMode === "grid" ? "bg-[#F5F7FA]" : ""}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${viewMode === "list" ? "bg-[#F5F7FA]" : ""}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#F5F7FA]">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            {viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <Card
                    key={p.id}
                    className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm cursor-pointer"
                    onClick={() => router.push(`/build/projects/${p.id}`)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-[#ee3224]/10 flex items-center justify-center">
                            <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#1F2937] card-title-text">{p.name}</h3>
                            <p className="text-xs text-[#6B7280]">{p.desc}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <StatusTag label={p.status} />
                        <StatusTag label={p.env} variant="category" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280]">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#ee3224]/10 flex items-center justify-center text-[#ee3224] text-[10px] font-medium">
                            {p.ownerInitials}
                          </div>
                          <span>{p.ownerName}</span>
                        </div>
                        <span>Due {p.due}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-[#E5E7EB] bg-white">
                <div className="divide-y divide-[#E5E7EB]">
                  {filtered.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-4 hover:bg-[#F5F7FA] cursor-pointer transition-colors"
                      onClick={() => router.push(`/build/projects/${p.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-[#ee3224]/10 flex items-center justify-center">
                          <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1F2937]">{p.name}</h3>
                          <p className="text-xs text-[#6B7280]">{p.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusTag label={p.status} />
                        <StatusTag label={p.env} variant="category" />
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#ee3224]/10 flex items-center justify-center text-[#ee3224] text-[10px] font-medium">
                            {p.ownerInitials}
                          </div>
                          <span className="text-sm text-[#6B7280]">{p.ownerName}</span>
                        </div>
                        <span className="text-xs text-[#6B7280]">Due {p.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
