"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusTag } from "@/components/ui/status-tag"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Terminal,
  FolderKanban,
  Bot,
  ExternalLink
} from "lucide-react"

type ProjectData = {
  id: string
  name: string
  description: string
  status: string
  environment: string
  version: string
  agentCount: number
  workflowCount: number
  members: { name: string; initials: string }[]
  lastUpdated: string
  conversations: number
  avgResponseTime: string
  successRate: string
}

const PROJECT_DATA: Record<string, ProjectData> = {
  "proj-001": { 
    id: "proj-001", 
    name: "Customer Support Bot", 
    description: "AI-powered customer support agent with multi-channel integration and sentiment analysis.", 
    status: "active", 
    environment: "production",
    version: "2.1.0",
    agentCount: 3,
    workflowCount: 5,
    members: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Mike Johnson", initials: "MJ" },
      { name: "Emily Davis", initials: "ED" },
    ],
    lastUpdated: "2 hours ago",
    conversations: 12847,
    avgResponseTime: "1.2s",
    successRate: "94.5%"
  },
  "proj-002": { 
    id: "proj-002", 
    name: "Sales Assistant", 
    description: "Lead qualification and outreach automation with CRM integration.",
    status: "draft", 
    environment: "development",
    version: "1.0.0",
    agentCount: 2,
    workflowCount: 3,
    members: [
      { name: "Alex Kim", initials: "AK" },
      { name: "Jordan Lee", initials: "JL" },
    ],
    lastUpdated: "1 day ago",
    conversations: 45,
    avgResponseTime: "0.8s",
    successRate: "89.2%"
  },
  "proj-003": { 
    id: "proj-003", 
    name: "HR Onboarding Agent", 
    description: "Employee onboarding automation with document processing and task management.",
    status: "active", 
    environment: "staging",
    version: "1.5.2",
    agentCount: 1,
    workflowCount: 8,
    members: [
      { name: "Lisa Park", initials: "LP" },
      { name: "David Brown", initials: "DB" },
      { name: "Nina Patel", initials: "NP" },
      { name: "Ryan Garcia", initials: "RG" },
    ],
    lastUpdated: "3 days ago",
    conversations: 567,
    avgResponseTime: "2.1s",
    successRate: "91.8%"
  },
  "proj-004": { 
    id: "proj-004", 
    name: "Data Analytics Dashboard", 
    description: "Real-time analytics and reporting agent with natural language queries.",
    status: "paused", 
    environment: "production",
    version: "3.0.1",
    agentCount: 2,
    workflowCount: 4,
    members: [
      { name: "Sophie Turner", initials: "ST" },
    ],
    lastUpdated: "1 week ago",
    conversations: 2890,
    avgResponseTime: "1.5s",
    successRate: "96.1%"
  },
  "proj-005": { 
    id: "proj-005", 
    name: "Content Generator", 
    description: "AI content creation assistant for marketing and social media.",
    status: "active", 
    environment: "production",
    version: "2.0.0",
    agentCount: 4,
    workflowCount: 6,
    members: [
      { name: "Mark Wilson", initials: "MW" },
      { name: "Sarah Chen", initials: "SC" },
    ],
    lastUpdated: "5 hours ago",
    conversations: 892,
    avgResponseTime: "1.8s",
    successRate: "93.4%"
  },
  "proj-006": { 
    id: "proj-006", 
    name: "Code Review Assistant", 
    description: "Automated code review and documentation generator for development teams.",
    status: "draft", 
    environment: "development",
    version: "0.9.0",
    agentCount: 1,
    workflowCount: 2,
    members: [
      { name: "Alex Kim", initials: "AK" },
    ],
    lastUpdated: "4 days ago",
    conversations: 0,
    avgResponseTime: "-",
    successRate: "-"
  },
}

// Activity feed mock data
const activityFeed = [
  { id: 1, action: "Workflow updated", user: "Sarah Chen", time: "2 hours ago", icon: GitBranch },
  { id: 2, action: "Agent deployed to production", user: "Mike Johnson", time: "5 hours ago", icon: Zap },
  { id: 3, action: "New team member added", user: "Emily Davis", time: "1 day ago", icon: Users },
  { id: 4, action: "Version 2.1.0 released", user: "Sarah Chen", time: "2 days ago", icon: Activity },
]

// Get status badge
const getStatusLabel = (status: string) => {
  const statusMap: Record<string, string> = {
    active: "Active",
    draft: "Draft",
    paused: "Paused",
  }
  return statusMap[status] || status
}

// Get environment badge style
const getEnvBadgeStyle = (env: string) => {
  switch (env) {
    case "production": return "bg-emerald-50 text-emerald-700"
    case "staging": return "bg-amber-50 text-amber-700"
    case "development": return "bg-blue-50 text-blue-700"
    default: return "bg-gray-50 text-gray-700"
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const project = PROJECT_DATA[projectId]

  if (!project) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full p-8">
          <FolderKanban className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground">Project Not Found</h2>
          <p className="text-muted-foreground mt-2">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => router.push("/build/projects")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </AppLayout>
    )
  }

  const handleOpenWorkflowBuilder = () => {
    router.push(`/layer4/workflow?project=${projectId}`)
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.push("/build/projects")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground">{project.name}</h1>
                  <StatusTag label={getStatusLabel(project.status)} />
                  <span className={`text-xs px-2 py-0.5 rounded ${getEnvBadgeStyle(project.environment)}`}>
                    {project.environment}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#6B7280]">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button 
                className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                onClick={handleOpenWorkflowBuilder}
              >
                <Play className="h-4 w-4 mr-2" />
                Open Builder
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-8 py-6 bg-[#F5F7FA] border-b border-[#E5E7EB]">
          <div className="grid grid-cols-4 gap-4">
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{project.conversations.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Conversations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                    <Zap className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{project.avgResponseTime}</p>
                    <p className="text-xs text-muted-foreground">Avg Response Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                    <BarChart3 className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{project.successRate}</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#E5E7EB]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50">
                    <GitBranch className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{project.version}</p>
                    <p className="text-xs text-muted-foreground">Current Version</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 overflow-auto bg-[#F5F7FA]">
          <div className="px-8 py-6">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Activity Feed */}
                  <div className="col-span-2">
                    <Card className="border border-[#E5E7EB]">
                      <CardHeader className="py-4 px-5">
                        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent className="px-5 pb-5">
                        <div className="space-y-4">
                          {activityFeed.map((item) => (
                            <div key={item.id} className="flex items-start gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                                <item.icon className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{item.action}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.user} • {item.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-6">
                    <Card className="border border-[#E5E7EB]">
                      <CardHeader className="py-4 px-5">
                        <CardTitle className="text-base font-semibold">Project Info</CardTitle>
                      </CardHeader>
                      <CardContent className="px-5 pb-5 space-y-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Team Members</p>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {project.members.slice(0, 4).map((member, idx) => (
                                <Avatar key={idx} className="h-7 w-7 border-2 border-white">
                                  <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            {project.members.length > 4 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.members.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Resources</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Bot className="h-4 w-4 text-muted-foreground" />
                              {project.agentCount} agents
                            </span>
                            <span className="flex items-center gap-1">
                              <GitBranch className="h-4 w-4 text-muted-foreground" />
                              {project.workflowCount} workflows
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                          <p className="text-sm flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {project.lastUpdated}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-[#E5E7EB] bg-[#ee3224]/5">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee3224]/10">
                            <Play className="h-5 w-5 text-[#ee3224]" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Open Visual Builder</p>
                            <p className="text-xs text-muted-foreground">Edit workflows visually</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-[#ee3224] hover:bg-[#cc2a1e]"
                          onClick={handleOpenWorkflowBuilder}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Launch Builder
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="workflows" className="mt-6">
                <Card className="border border-[#E5E7EB]">
                  <CardContent className="p-8 text-center">
                    <GitBranch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium">Workflows</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      View and manage your project workflows
                    </p>
                    <Button 
                      className="mt-4 bg-[#ee3224] hover:bg-[#cc2a1e]"
                      onClick={handleOpenWorkflowBuilder}
                    >
                      Open Workflow Builder
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card className="border border-[#E5E7EB]">
                  <CardContent className="p-8 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium">Analytics Dashboard</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      View detailed analytics and performance metrics
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs" className="mt-6">
                <Card className="border border-[#E5E7EB]">
                  <CardContent className="p-8 text-center">
                    <Terminal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium">Execution Logs</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      View real-time logs and debugging information
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card className="border border-[#E5E7EB]">
                  <CardContent className="p-8 text-center">
                    <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium">Project Settings</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure project settings and integrations
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
