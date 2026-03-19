"use client"

/**
 * Projects Page - Completely rewritten to fix cache issues
 * This file uses ONLY AvatarFallback (not AvatarImage)
 * The owner property is an object with name and initials
 */

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

type OwnerInfo = {
  name: string
  initials: string
}

type ProjectData = {
  id: number
  name: string
  description: string
  status: string
  environment: string
  owner: OwnerInfo
  progress: number
  dueDate: string
  lastActivity: string
}

const projectList: ProjectData[] = [
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

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    deployed: "Deployed",
    ready: "Ready",
    building: "Building",
    blocked: "Blocked",
  }
  return labels[status] ? <StatusTag label={labels[status]} /> : null
}

function EnvBadge({ env }: { env: string }) {
  const labels: Record<string, string> = {
    production: "Production",
    staging: "Staging",
    development: "Development",
  }
  return labels[env] ? <StatusTag label={labels[env]} /> : null
}

function OwnerAvatar({ owner }: { owner: OwnerInfo }) {
  return (
    <Avatar className="h-6 w-6">
      <AvatarFallback className="text-xs bg-[#ee3224]/10 text-[#ee3224]">
        {owner.initials}
      </AvatarFallback>
    </Avatar>
  )
}

export default function ProjectsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = projectList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppLayout>
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

      <div className="flex-1 overflow-auto bg-[#F5F7FA] px-8 py-6">
        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((proj) => (
              <Card
                key={proj.id}
                className="card-interactive group cursor-pointer"
                onClick={() => router.push(`/build/projects/${proj.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground card-title-text truncate">
                        {proj.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {proj.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                        <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                        <DropdownMenuItem><ExternalLink className="mr-2 h-4 w-4" />Deploy</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <StatusBadge status={proj.status} />
                    <EnvBadge env={proj.environment} />
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <OwnerAvatar owner={proj.owner} />
                        <span className="text-sm text-muted-foreground">{proj.owner.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{proj.lastActivity}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Progress value={proj.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{proj.progress}%</span>
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
                {filtered.map((proj) => (
                  <TableRow
                    key={proj.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/build/projects/${proj.id}`)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{proj.name}</p>
                        <p className="text-sm text-muted-foreground">{proj.description}</p>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={proj.status} /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <OwnerAvatar owner={proj.owner} />
                        <span className="text-sm">{proj.owner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell><EnvBadge env={proj.environment} /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={proj.progress} className="w-16 h-1.5" />
                        <span className="text-xs text-muted-foreground">{proj.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{proj.lastActivity}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                          <DropdownMenuItem><ExternalLink className="mr-2 h-4 w-4" />Deploy</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
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
