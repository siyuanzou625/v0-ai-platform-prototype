"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Layers,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Smartphone,
  User,
  Building,
  RefreshCw,
  Search,
  Download,
  X,
  Clock,
  ArrowRight,
  Settings,
  ExternalLink,
} from "lucide-react"

// Portfolio metrics
const portfolioMetrics = {
  totalDeployed: 24,
  healthy: 21,
  attentionNeeded: 3,
  costToday: 47.20,
  lastUpdated: "2025-03-12T14:30:00Z",
}

// App type metrics
const appTypeMetrics = {
  nativeApps: {
    deployed: 8,
    avgLoadTime: "1.2s",
    errorRate: "0.3%",
    status: "healthy",
  },
  personalAgents: {
    active: 12,
    avgTokens: 450,
    satisfaction: 4.7,
    status: "warning",
    warningCount: 2,
  },
  enterpriseAgents: {
    running: 3,
    sla: "99.95%",
    compliance: "verified",
    status: "warning",
    warningCount: 1,
  },
  crossDevice: {
    synced: 5,
    avgSyncLatency: "245ms",
    handoffSuccess: "98.2%",
    status: "healthy",
  },
}

// Timeline events
const timelineEvents = [
  { time: "02:00", status: "ok", label: "All systems operational", x: 50 },
  { time: "06:00", status: "warning", label: "Native Apps latency spike", affectedType: "nativeApps", x: 200 },
  { time: "10:00", status: "critical", label: "Enterprise Agent SLA breach", affectedType: "enterpriseAgents", x: 350 },
  { time: "14:00", status: "warning", label: "Cross-Device sync delay", affectedType: "crossDevice", x: 500 },
  { time: "18:00", status: "ok", label: "All systems operational", x: 650 },
  { time: "22:00", status: "warning", label: "Personal Agent token limit warning", affectedType: "personalAgents", x: 800 },
]

// Activity feed
const activityFeed = [
  { id: 1, user: "Zoey", initials: "ZD", action: "deployed", app: "Enterprise Sales Agent", environment: "Production", timestamp: "2 hours ago", status: "success" },
  { id: 2, user: "Alex", initials: "AK", action: "updated configuration", app: "Personal Support Bot", environment: "Production", timestamp: "5 hours ago", status: "success" },
  { id: 3, user: "System", initials: "SY", action: "detected high latency", app: "Native App Dashboard", environment: "Production", timestamp: "1 day ago", status: "warning" },
  { id: 4, user: "Sarah", initials: "SC", action: "resolved SLA breach", app: "Enterprise Data Pipeline", environment: "Production", timestamp: "1 day ago", status: "success" },
  { id: 5, user: "System", initials: "SY", action: "sync failed", app: "Cross-Device Handoff", environment: "Production", timestamp: "2 days ago", status: "error" },
  { id: 6, user: "Michael", initials: "MJ", action: "added new template", app: "Personal Agent Template", environment: "Development", timestamp: "3 days ago", status: "success" },
  { id: 7, user: "System", initials: "SY", action: "completed backup", app: "All Enterprise Agents", environment: "Production", timestamp: "3 days ago", status: "success" },
]

// Mock incident data
const mockIncident = {
  title: "Enterprise Agent SLA Breach",
  severity: "critical",
  affectedApps: ["Enterprise Sales Agent", "Data Pipeline v2"],
  rootCause: "Database connection pool exhausted during peak load",
  detected: "2025-03-12 10:15 AM",
  alerted: "2025-03-12 10:17 AM",
  resolved: "2025-03-12 11:30 AM",
  resolutionSteps: [
    "Increased connection pool size from 50 to 100",
    "Restarted affected agent instances",
    "Added auto-scaling rule for future peak loads",
  ],
}

export default function Layer5OverviewPage() {
  const router = useRouter()
  const [appTypeFilter, setAppTypeFilter] = useState("all")
  const [environmentFilter, setEnvironmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRangeFilter, setDateRangeFilter] = useState("24h")
  const [searchQuery, setSearchQuery] = useState("")
  const [showIncidentModal, setShowIncidentModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<typeof timelineEvents[0] | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const hasActiveFilters = appTypeFilter !== "all" || environmentFilter !== "all" || statusFilter !== "all" || searchQuery !== ""

  const clearFilters = () => {
    setAppTypeFilter("all")
    setEnvironmentFilter("all")
    setStatusFilter("all")
    setSearchQuery("")
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleTimelineEventClick = (event: typeof timelineEvents[0]) => {
    if (event.status !== "ok") {
      setSelectedEvent(event)
      setShowIncidentModal(true)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
      case "healthy":
      case "success":
        return "#22C55E"
      case "warning":
        return "#F59E0B"
      case "critical":
      case "error":
        return "#ee3224"
      default:
        return "#6B7280"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200">Success</Badge>
      case "warning":
        return <Badge className="bg-amber-50 text-amber-600 border border-amber-200">Warning</Badge>
      case "error":
        return <Badge className="bg-red-50 text-red-600 border border-red-200">Error</Badge>
      default:
        return null
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Top Header Bar */}
        <div className="border-b border-[#E5E7EB] bg-white px-6 py-4">
          {/* Breadcrumb */}
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">Layer 5 / </span>
            <span className="text-sm font-medium text-foreground">Overview</span>
          </div>

          {/* Global Filter Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={appTypeFilter} onValueChange={setAppTypeFilter}>
              <SelectTrigger className="w-[160px] h-9 border-[#E5E7EB]">
                <SelectValue placeholder="App Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="native">Native Apps</SelectItem>
                <SelectItem value="personal">Personal Agents</SelectItem>
                <SelectItem value="enterprise">Enterprise Agents</SelectItem>
                <SelectItem value="crossdevice">Cross-Device</SelectItem>
              </SelectContent>
            </Select>

            <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
              <SelectTrigger className="w-[140px] h-9 border-[#E5E7EB]">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-9 border-[#E5E7EB]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
              <SelectTrigger className="w-[140px] h-9 border-[#E5E7EB]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-[200px] max-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search apps by name, owner, or tag"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 border-[#E5E7EB]"
              />
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}

            <div className="flex-1" />

            <Button variant="outline" size="sm" className="h-9 border-[#E5E7EB]" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button variant="outline" size="sm" className="h-9 border-[#E5E7EB]">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>

            <Avatar className="h-9 w-9 border border-[#E5E7EB]">
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">ZD</AvatarFallback>
            </Avatar>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-3">
              {appTypeFilter !== "all" && (
                <Badge variant="secondary" className="bg-[#F5F7FA] text-foreground">
                  Type: {appTypeFilter}
                  <button onClick={() => setAppTypeFilter("all")} className="ml-1.5 hover:text-[#ee3224]">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {environmentFilter !== "all" && (
                <Badge variant="secondary" className="bg-[#F5F7FA] text-foreground">
                  Env: {environmentFilter}
                  <button onClick={() => setEnvironmentFilter("all")} className="ml-1.5 hover:text-[#ee3224]">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="bg-[#F5F7FA] text-foreground">
                  Status: {statusFilter}
                  <button onClick={() => setStatusFilter("all")} className="ml-1.5 hover:text-[#ee3224]">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="bg-[#F5F7FA] text-foreground">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-1.5 hover:text-[#ee3224]">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Section 1: Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Deployed */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <Layers className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Deployed</p>
                  <p className="text-3xl font-bold text-foreground">{portfolioMetrics.totalDeployed}</p>
                  <button className="mt-3 text-sm font-medium text-[#ee3224] group-hover:underline flex items-center gap-1">
                    View All <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </CardContent>
              </Card>

              {/* Healthy */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-emerald-50">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Healthy</p>
                  <p className="text-3xl font-bold text-foreground">{portfolioMetrics.healthy}</p>
                  <button 
                    className="mt-3 text-sm font-medium text-[#ee3224] group-hover:underline flex items-center gap-1"
                    onClick={() => setStatusFilter("healthy")}
                  >
                    View Healthy <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </CardContent>
              </Card>

              {/* Attention Needed */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-red-50">
                      <AlertTriangle className="h-5 w-5 text-[#ee3224]" />
                    </div>
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ee3224]" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Attention Needed</p>
                  <p className="text-3xl font-bold text-foreground">{portfolioMetrics.attentionNeeded}</p>
                  <button 
                    className="mt-3 text-sm font-medium text-[#ee3224] group-hover:underline flex items-center gap-1"
                    onClick={() => setStatusFilter("warning")}
                  >
                    Fix Issues <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </CardContent>
              </Card>

              {/* Cost Today */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <DollarSign className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Cost Today</p>
                  <p className="text-3xl font-bold text-foreground">${portfolioMetrics.costToday.toFixed(2)}</p>
                  <button className="mt-3 text-sm font-medium text-[#ee3224] group-hover:underline flex items-center gap-1">
                    Cost Report <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Section 2: Cross-Type Health Timeline */}
            <Card className="border border-[#E5E7EB] bg-white shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">System Health Timeline (Last 24 Hours)</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span className="text-muted-foreground">All systems operational</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <span className="text-muted-foreground">Minor issue detected</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ee3224]" />
                        <span className="text-muted-foreground">Critical alert</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Timeline Chart */}
                <div className="relative h-32 mt-4">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-8 w-20 flex flex-col justify-between text-xs text-muted-foreground">
                    <span>Critical</span>
                    <span>Minor</span>
                    <span>All OK</span>
                  </div>

                  {/* Chart area */}
                  <div className="ml-24 mr-4 h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div className="border-b border-dashed border-[#E5E7EB]" />
                      <div className="border-b border-dashed border-[#E5E7EB]" />
                      <div className="border-b border-[#E5E7EB]" />
                    </div>

                    {/* Timeline line */}
                    <svg className="absolute inset-0 w-full h-[calc(100%-32px)]" viewBox="0 0 900 80" preserveAspectRatio="none">
                      <path
                        d="M 50 60 L 200 40 L 350 10 L 500 40 L 650 60 L 800 40"
                        fill="none"
                        stroke="#ee3224"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Event markers */}
                    {timelineEvents.map((event, idx) => {
                      const yPos = event.status === "ok" ? 60 : event.status === "warning" ? 40 : 10
                      return (
                        <div
                          key={idx}
                          className="absolute cursor-pointer transition-transform hover:scale-125 group/marker"
                          style={{
                            left: `${(event.x / 900) * 100}%`,
                            top: `${(yPos / 80) * (100 - 40)}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          onClick={() => handleTimelineEventClick(event)}
                        >
                          <div
                            className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: getStatusColor(event.status) }}
                          />
                          {/* Hover Tooltip */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none z-10">
                            <div className="bg-foreground text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap max-w-[200px]">
                              <p className="font-medium">{event.time}</p>
                              <p className="text-white/80">{event.label}</p>
                              {event.status !== "ok" && (
                                <p className="text-white/60 text-[10px] mt-1">Click for details</p>
                              )}
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
                          </div>
                        </div>
                      )
                    })}

                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground pt-2">
                      <span>00:00</span>
                      <span>04:00</span>
                      <span>08:00</span>
                      <span>12:00</span>
                      <span>16:00</span>
                      <span>20:00</span>
                      <span>24:00</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#E5E7EB]">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#E5E7EB]"
                    onClick={() => router.push("/layer5/incidents")}
                  >
                    View Incident Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#E5E7EB]"
                    onClick={() => {
                      // Create a simple export notification - in production would generate PNG/PDF
                      const format = window.confirm("Click OK to export as PNG, Cancel for PDF") ? "PNG" : "PDF"
                      alert(`Exporting timeline as ${format}. In production, this would download the chart.`)
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Timeline
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Type-Specific Quick View Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Native Apps */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50">
                      <Smartphone className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">Native Applications</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deployed</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{appTypeMetrics.nativeApps.deployed}</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg Load</span>
                      <span className="font-medium">{appTypeMetrics.nativeApps.avgLoadTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Error Rate</span>
                      <span className="font-medium">{appTypeMetrics.nativeApps.errorRate}</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-600 mb-4">All systems operational</p>
                  <Button
                    variant="outline"
                    className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white transition-colors"
                    onClick={() => router.push("/layer5/native-apps")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>

              {/* Personal Agents */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-50">
                      <User className="h-5 w-5 text-purple-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">Personal Agents</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{appTypeMetrics.personalAgents.active}</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg Tokens</span>
                      <span className="font-medium">{appTypeMetrics.personalAgents.avgTokens}/conv</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Satisfaction</span>
                      <span className="font-medium">{appTypeMetrics.personalAgents.satisfaction} stars</span>
                    </div>
                  </div>
                  <p className="text-xs text-amber-600 mb-4">{appTypeMetrics.personalAgents.warningCount} agents need retraining</p>
                  <Button
                    variant="outline"
                    className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white transition-colors"
                    onClick={() => router.push("/layer5/personal-agents")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Agents */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-orange-50">
                      <Building className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">Enterprise Agents</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Running</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{appTypeMetrics.enterpriseAgents.running}</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">SLA</span>
                      <span className="font-medium">{appTypeMetrics.enterpriseAgents.sla}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Compliance</span>
                      <span className="font-medium capitalize">{appTypeMetrics.enterpriseAgents.compliance}</span>
                    </div>
                  </div>
                  <p className="text-xs text-amber-600 mb-4">{appTypeMetrics.enterpriseAgents.warningCount} SLA warning (response time)</p>
                  <Button
                    variant="outline"
                    className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white transition-colors"
                    onClick={() => router.push("/layer5/enterprise-agents")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>

              {/* Cross-Device */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#ee3224]/30 group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-teal-50">
                      <RefreshCw className="h-5 w-5 text-teal-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">Cross-Device Services</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Synced</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{appTypeMetrics.crossDevice.synced}</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg Sync</span>
                      <span className="font-medium">{appTypeMetrics.crossDevice.avgSyncLatency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Handoff</span>
                      <span className="font-medium">{appTypeMetrics.crossDevice.handoffSuccess}</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-600 mb-4">All devices synchronized</p>
                  <Button
                    variant="outline"
                    className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white transition-colors"
                    onClick={() => router.push("/layer5/cross-device")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Section 4: Recent Activity Feed */}
            <Card className="border border-[#E5E7EB] bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Recent Activity (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {activityFeed.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 rounded transition-colors hover:bg-[#F5F7FA] cursor-pointer"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-medium text-[#ee3224]">{activity.app}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{activity.environment}</span>
                        </div>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-[#ee3224] hover:text-[#ee3224] hover:bg-[#ee3224]/5">
                  View Full Activity Log
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>

      {/* Incident Detail Modal */}
      <Dialog open={showIncidentModal} onOpenChange={setShowIncidentModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle>{mockIncident.title}</DialogTitle>
              <Badge className="bg-red-50 text-[#ee3224] border border-red-200">Critical</Badge>
            </div>
            <DialogDescription>
              Incident details and resolution information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Affected Applications */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Affected Applications</h4>
              <div className="flex flex-wrap gap-2">
                {mockIncident.affectedApps.map((app, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-[#F5F7FA]">
                    {app}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Root Cause */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Root Cause</h4>
              <p className="text-sm text-muted-foreground bg-[#F5F7FA] p-3 rounded">
                {mockIncident.rootCause}
              </p>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Detected</span>
                  <span className="font-mono">{mockIncident.detected}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Alerted</span>
                  <span className="font-mono">{mockIncident.alerted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Resolved</span>
                  <span className="font-mono text-emerald-600">{mockIncident.resolved}</span>
                </div>
              </div>
            </div>

            {/* Resolution Steps */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Resolution Steps</h4>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                {mockIncident.resolutionSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Related Logs */}
            <div>
              <Button variant="link" className="p-0 h-auto text-[#ee3224]">
                View full logs in monitoring panel
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E5E7EB]">
            <Button variant="ghost" onClick={() => setShowIncidentModal(false)}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#E5E7EB]">
                Escalate
              </Button>
              <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                Mark as Resolved
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
