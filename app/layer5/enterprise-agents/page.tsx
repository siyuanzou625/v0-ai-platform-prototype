"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Users,
  Bot,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react"

const enterpriseAgents = [
  {
    id: 1,
    name: "Customer Support Bot",
    department: "Support",
    status: "running",
    tasksToday: 1247,
    efficiency: 94,
    avgResponseTime: "1.2s",
  },
  {
    id: 2,
    name: "HR Onboarding Assistant",
    department: "HR",
    status: "running",
    tasksToday: 89,
    efficiency: 98,
    avgResponseTime: "0.8s",
  },
  {
    id: 3,
    name: "Sales Lead Qualifier",
    department: "Sales",
    status: "running",
    tasksToday: 342,
    efficiency: 87,
    avgResponseTime: "2.1s",
  },
  {
    id: 4,
    name: "Finance Report Generator",
    department: "Finance",
    status: "paused",
    tasksToday: 56,
    efficiency: 96,
    avgResponseTime: "3.5s",
  },
  {
    id: 5,
    name: "IT Helpdesk Agent",
    department: "IT",
    status: "running",
    tasksToday: 567,
    efficiency: 91,
    avgResponseTime: "1.8s",
  },
  {
    id: 6,
    name: "Legal Document Reviewer",
    department: "Legal",
    status: "running",
    tasksToday: 23,
    efficiency: 99,
    avgResponseTime: "4.2s",
  },
]

const performanceMetrics = [
  { label: "Total Tasks Today", value: "2,324", change: "+12%", trend: "up" },
  { label: "Avg Response Time", value: "1.8s", change: "-8%", trend: "down" },
  { label: "Success Rate", value: "96.4%", change: "+2%", trend: "up" },
  { label: "Cost Savings", value: "$45,200", change: "+18%", trend: "up" },
]

export default function EnterpriseAgentsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Enterprise AI Agents</h1>
            <p className="text-muted-foreground">
              Manage and monitor AI agents across your organization
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-1 h-4 w-4" /> Refresh
            </Button>
            <Button size="sm" className="gap-2">
              <Bot className="h-4 w-4" /> Deploy Agent
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {performanceMetrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <Badge
                    variant="secondary"
                    className={metric.trend === "up" ? "bg-chart-3/20 text-chart-3" : "bg-chart-2/20 text-chart-2"}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <p className="mt-2 text-2xl font-semibold text-foreground">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agent Dashboard */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Active Enterprise Agents</CardTitle>
              <CardDescription>Real-time status of all deployed agents</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-chart-3" /> 5 Running
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-chart-4" /> 1 Paused
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enterpriseAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded border border-border p-4 transition-colors hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{agent.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {agent.department}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" /> {agent.tasksToday} tasks today
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {agent.avgResponseTime} avg
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-32">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span className="font-medium text-foreground">{agent.efficiency}%</span>
                      </div>
                      <Progress value={agent.efficiency} className="h-2" />
                    </div>
                    <Badge
                      className={
                        agent.status === "running"
                          ? "bg-chart-3 text-primary-foreground"
                          : "bg-chart-4 text-primary-foreground"
                      }
                    >
                      {agent.status === "running" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Running
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Pause className="h-3 w-3" /> Paused
                        </span>
                      )}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {agent.status === "running" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Department Distribution</CardTitle>
              <CardDescription>Agent usage by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "Support", agents: 3, tasks: 4521, color: "bg-primary" },
                  { dept: "Sales", agents: 2, tasks: 2341, color: "bg-chart-2" },
                  { dept: "IT", agents: 2, tasks: 1892, color: "bg-chart-3" },
                  { dept: "HR", agents: 1, tasks: 567, color: "bg-chart-4" },
                  { dept: "Finance", agents: 1, tasks: 234, color: "bg-chart-5" },
                ].map((dept) => (
                  <div key={dept.dept} className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full ${dept.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{dept.dept}</span>
                        <span className="text-sm text-muted-foreground">{dept.tasks} tasks</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-secondary">
                        <div
                          className={`h-2 rounded-full ${dept.color}`}
                          style={{ width: `${(dept.tasks / 4521) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Security & Compliance</CardTitle>
              <CardDescription>Enterprise security status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-chart-3" />
                    <span className="text-sm font-medium text-foreground">Data Encryption</span>
                  </div>
                  <Badge className="bg-chart-3">Active</Badge>
                </div>
                <div className="flex items-center justify-between rounded border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-chart-3" />
                    <span className="text-sm font-medium text-foreground">Access Control</span>
                  </div>
                  <Badge className="bg-chart-3">Active</Badge>
                </div>
                <div className="flex items-center justify-between rounded border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-chart-3" />
                    <span className="text-sm font-medium text-foreground">Audit Logging</span>
                  </div>
                  <Badge className="bg-chart-3">Active</Badge>
                </div>
                <div className="flex items-center justify-between rounded border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-chart-4" />
                    <span className="text-sm font-medium text-foreground">SOC 2 Compliance</span>
                  </div>
                  <Badge className="bg-chart-4">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
