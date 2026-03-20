"use client"

import { useParams, useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusTag } from "@/components/ui/status-tag"
import { 
  ArrowLeft, 
  Play, 
  Settings, 
  GitBranch, 
  Clock, 
  Users, 
  Activity,
  MessageSquare,
  Zap,
  BarChart3,
  FileText,
  Terminal
} from "lucide-react"

type ProjectData = {
  id: number
  title: string
  description: string
  statusLabel: string
  envLabel: string
  ownerInitials: string
  ownerDisplayName: string
  lastUpdated: string
  version: string
  conversations: number
  avgResponseTime: string
  successRate: string
}

const PROJECT_DATA: Record<string, ProjectData> = {
  "1": { 
    id: 1, 
    title: "Customer Support Bot", 
    description: "AI-powered support agent that handles customer inquiries, troubleshooting, and ticket routing with natural language understanding.", 
    statusLabel: "Active", 
    envLabel: "Production", 
    ownerInitials: "ZD", 
    ownerDisplayName: "Zoey",
    lastUpdated: "2 hours ago",
    version: "v2.4.1",
    conversations: 12847,
    avgResponseTime: "1.2s",
    successRate: "94.5%"
  },
  "2": { 
    id: 2, 
    title: "Sales Assistant", 
    description: "Lead qualification bot that engages prospects, qualifies leads, and schedules meetings with sales representatives.", 
    statusLabel: "Draft", 
    envLabel: "Development", 
    ownerInitials: "AP", 
    ownerDisplayName: "Alex",
    lastUpdated: "1 day ago",
    version: "v0.8.0",
    conversations: 234,
    avgResponseTime: "0.9s",
    successRate: "87.2%"
  },
  "3": { 
    id: 3, 
    title: "HR Onboarding", 
    description: "Employee onboarding automation that guides new hires through paperwork, training schedules, and company policies.", 
    statusLabel: "Active", 
    envLabel: "Staging", 
    ownerInitials: "MJ", 
    ownerDisplayName: "Maria",
    lastUpdated: "5 hours ago",
    version: "v1.2.0",
    conversations: 892,
    avgResponseTime: "1.5s",
    successRate: "91.8%"
  },
  "4": { 
    id: 4, 
    title: "Data Analyzer", 
    description: "Analytics dashboard agent that answers data questions, generates reports, and provides business insights.", 
    statusLabel: "Paused", 
    envLabel: "Production", 
    ownerInitials: "RK", 
    ownerDisplayName: "Raj",
    lastUpdated: "3 days ago",
    version: "v1.0.5",
    conversations: 4521,
    avgResponseTime: "2.1s",
    successRate: "89.3%"
  },
}

const recentActivity = [
  { id: 1, action: "Deployment completed", time: "2 hours ago", type: "deploy" },
  { id: 2, action: "Config updated", time: "5 hours ago", type: "config" },
  { id: 3, action: "New version published", time: "1 day ago", type: "version" },
  { id: 4, action: "Error rate spike detected", time: "2 days ago", type: "alert" },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const project = PROJECT_DATA[projectId]
  
  if (!project) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h1 className="text-2xl font-semibold text-[#1F2937]">Project Not Found</h1>
          <p className="text-muted-foreground">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/build/projects")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
          </Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.push("/build/projects")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-[#1F2937]">{project.title}</h1>
              <StatusTag label={project.statusLabel} />
              <StatusTag label={project.envLabel} variant="category" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
            <Button className="bg-[#ee3224] hover:bg-[#ee3224]/90" size="sm">
              <Play className="h-4 w-4 mr-2" /> Run
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#ee3224]/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-[#ee3224]" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#1F2937]">{project.conversations.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Conversations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#1F2937]">{project.avgResponseTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-violet-50 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#1F2937]">{project.successRate}</p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <GitBranch className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#1F2937]">{project.version}</p>
                  <p className="text-xs text-muted-foreground">Current Version</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#F5F7FA] border border-[#E5E7EB]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Activity Feed */}
              <Card className="lg:col-span-2 border border-[#E5E7EB]">
                <CardHeader className="py-4 px-5">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#F5F7FA]">
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-[#E5E7EB]">
                          {activity.type === "deploy" && <Play className="h-4 w-4 text-emerald-600" />}
                          {activity.type === "config" && <Settings className="h-4 w-4 text-violet-600" />}
                          {activity.type === "version" && <GitBranch className="h-4 w-4 text-[#ee3224]" />}
                          {activity.type === "alert" && <Zap className="h-4 w-4 text-amber-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1F2937]">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card className="border border-[#E5E7EB]">
                <CardHeader className="py-4 px-5">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                      <span className="text-sm text-muted-foreground">Owner</span>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-[#ee3224]/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-[#ee3224]">{project.ownerInitials}</span>
                        </div>
                        <span className="text-sm font-medium">{project.ownerDisplayName}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                      <span className="text-sm text-muted-foreground">Last Updated</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {project.lastUpdated}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                      <span className="text-sm text-muted-foreground">Environment</span>
                      <StatusTag label={project.envLabel} variant="category" />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <StatusTag label={project.statusLabel} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversations" className="mt-6">
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-[#1F2937]">Conversation History</h3>
                <p className="text-sm text-muted-foreground mt-2">View and analyze past conversations with your agent.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-[#1F2937]">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground mt-2">Track performance metrics and usage patterns.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-6">
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-8 text-center">
                <Terminal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-[#1F2937]">System Logs</h3>
                <p className="text-sm text-muted-foreground mt-2">View execution logs and debug information.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-8 text-center">
                <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-[#1F2937]">Project Settings</h3>
                <p className="text-sm text-muted-foreground mt-2">Configure your project settings and integrations.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
