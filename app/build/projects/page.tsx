"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusTag } from "@/components/ui/status-tag"
import { Search, Plus, LayoutGrid, List, FolderOpen } from "lucide-react"

const items = [
  { id: 1, title: "Customer Support Bot", subtitle: "AI-powered support automation", stat: "Active", env: "Production", user: "Zoey D", initials: "ZD", pct: 75, deadline: "Mar 30, 2025" },
  { id: 2, title: "Sales Analytics Dashboard", subtitle: "Real-time sales metrics", stat: "In Review", env: "Staging", user: "Marcus T", initials: "MT", pct: 90, deadline: "Apr 5, 2025" },
  { id: 3, title: "Content Generator", subtitle: "AI content creation tool", stat: "Draft", env: "Development", user: "Sarah L", initials: "SL", pct: 30, deadline: "Apr 15, 2025" },
  { id: 4, title: "Email Automation", subtitle: "Smart email sequences", stat: "Active", env: "Production", user: "James W", initials: "JW", pct: 100, deadline: "Mar 20, 2025" },
  { id: 5, title: "Data Pipeline", subtitle: "ETL workflow automation", stat: "Paused", env: "Staging", user: "Nina K", initials: "NK", pct: 45, deadline: "Apr 10, 2025" },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [mode, setMode] = useState<"grid" | "list">("grid")

  const results = items.filter(x =>
    x.title.toLowerCase().includes(query.toLowerCase()) ||
    x.subtitle.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-white">
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
                <Input placeholder="Search projects..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
              </div>
              <div className="flex items-center gap-1 border rounded-md p-1">
                <button onClick={() => setMode("grid")} className={`p-1.5 rounded ${mode === "grid" ? "bg-[#F5F7FA]" : ""}`}>
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button onClick={() => setMode("list")} className={`p-1.5 rounded ${mode === "list" ? "bg-[#F5F7FA]" : ""}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#F5F7FA]">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            {mode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((item) => (
                  <Card key={item.id} className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm cursor-pointer" onClick={() => router.push(`/build/projects/${item.id}`)}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-[#ee3224]/10 flex items-center justify-center">
                            <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#1F2937] card-title-text">{item.title}</h3>
                            <p className="text-xs text-[#6B7280]">{item.subtitle}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <StatusTag label={item.stat} />
                        <StatusTag label={item.env} variant="category" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280]">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#ee3224]/10 flex items-center justify-center text-[#ee3224] text-[10px] font-medium">{item.initials}</div>
                          <span>{item.user}</span>
                        </div>
                        <span>Due {item.deadline}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-[#E5E7EB] bg-white">
                <div className="divide-y divide-[#E5E7EB]">
                  {results.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-[#F5F7FA] cursor-pointer transition-colors" onClick={() => router.push(`/build/projects/${item.id}`)}>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-[#ee3224]/10 flex items-center justify-center">
                          <FolderOpen className="h-5 w-5 text-[#ee3224]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1F2937]">{item.title}</h3>
                          <p className="text-xs text-[#6B7280]">{item.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusTag label={item.stat} />
                        <StatusTag label={item.env} variant="category" />
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#ee3224]/10 flex items-center justify-center text-[#ee3224] text-[10px] font-medium">{item.initials}</div>
                          <span className="text-sm text-[#6B7280]">{item.user}</span>
                        </div>
                        <span className="text-xs text-[#6B7280]">Due {item.deadline}</span>
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
