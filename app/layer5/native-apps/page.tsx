"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  Search,
  RefreshCw,
  Download,
  Users,
  Gauge,
  AlertCircle,
  ShieldCheck,
  Smile,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  PlayCircle,
  FlaskConical,
  ArrowLeftCircle,
  Bell,
  X,
  MoreHorizontal,
  Monitor,
  Tablet,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Lock,
  Globe,
  CheckCircle,
  Clock,
  Calendar,
  FileText,
  Settings,
  Pause,
  Rocket,
} from "lucide-react"

// Mock Data
const summaryMetrics = {
  activeSessions: { value: "12,847", trend: "up", trendValue: "12.3%", comparison: "Last 24 hours" },
  avgLoadTime: { value: "1.24s", trend: "down", trendValue: "8.2%", comparison: "Target: <2.0s" },
  errorRate: { value: "0.28%", trend: "down", trendValue: "0.05%", comparison: "Threshold: <1.0%" },
  crashFree: { value: "99.7%", trend: "stable", trendValue: "Stable", comparison: "Industry: 99.5%" },
  satisfaction: { value: "4.6/5.0", trend: "up", trendValue: "0.2 pts", comparison: "Based on 3,421 ratings" },
}

const loadTimeDistribution = [
  { range: "0-1s", percentage: 42, count: 5396, color: "#22C55E" },
  { range: "1-2s", percentage: 31, count: 3982, color: "#22C55E" },
  { range: "2-3s", percentage: 15, count: 1927, color: "#F59E0B" },
  { range: "3-5s", percentage: 8, count: 1028, color: "#F59E0B" },
  { range: "5s+", percentage: 4, count: 514, color: "#ee3224" },
]

const errorRateTimeline = [
  { date: "Mar 6", rate: 0.31, errors: 127, users: 89 },
  { date: "Mar 7", rate: 0.29, errors: 118, users: 82 },
  { date: "Mar 8", rate: 0.45, errors: 183, users: 134, event: "v2.3.1 deployed" },
  { date: "Mar 9", rate: 0.33, errors: 134, users: 95 },
  { date: "Mar 10", rate: 0.28, errors: 114, users: 78 },
  { date: "Mar 11", rate: 0.26, errors: 106, users: 71 },
  { date: "Mar 12", rate: 0.28, errors: 114, users: 79 },
]

const interactionLatency = [
  { feature: "Search", fast: 78, medium: 15, slow: 5, critical: 2 },
  { feature: "Form Submit", fast: 65, medium: 22, slow: 10, critical: 3 },
  { feature: "Navigation", fast: 85, medium: 10, slow: 4, critical: 1 },
  { feature: "File Upload", fast: 45, medium: 30, slow: 18, critical: 7 },
  { feature: "AI Query", fast: 34, medium: 41, slow: 18, critical: 7 },
]

const retentionCohorts = [
  { week: "Feb 12", day1: 100, day3: 84, day7: 72, day14: 58, day30: 45 },
  { week: "Feb 19", day1: 100, day3: 81, day7: 69, day14: 55, day30: null },
  { week: "Feb 26", day1: 100, day3: 86, day7: 71, day14: 60, day30: null },
  { week: "Mar 4", day1: 100, day3: 83, day7: 68, day14: null, day30: null },
  { week: "Mar 11", day1: 100, day3: null, day7: null, day14: null, day30: null },
]

const nativeApps = [
  {
    id: "app-001",
    name: "Enterprise Sales Agent",
    platform: ["Web", "Desktop"],
    version: "v2.1.0",
    environment: "production",
    loadTime: 1.18,
    errorRate: 0.21,
    errorTrend: "down",
    activeUsers: 3247,
    userTrend: "up",
    lastDeployed: "Mar 10, 2025 2:30 PM",
    owner: { name: "Sarah Chen", initials: "SC" },
  },
  {
    id: "app-002",
    name: "Data Pipeline v2",
    platform: ["Desktop"],
    version: "v1.8.3",
    environment: "staging",
    loadTime: 2.34,
    errorRate: 0.67,
    errorTrend: "stable",
    activeUsers: 892,
    userTrend: "stable",
    lastDeployed: "Mar 11, 2025 9:15 AM",
    owner: { name: "Mike Johnson", initials: "MJ" },
  },
  {
    id: "app-003",
    name: "Customer Support Bot",
    platform: ["Web", "Mobile"],
    version: "v3.0.1",
    environment: "production",
    loadTime: 0.94,
    errorRate: 0.15,
    errorTrend: "down",
    activeUsers: 5621,
    userTrend: "up",
    lastDeployed: "Mar 9, 2025 4:45 PM",
    owner: { name: "Emily Davis", initials: "ED" },
  },
  {
    id: "app-004",
    name: "Analytics Dashboard API",
    platform: ["Web"],
    version: "v0.9.2",
    environment: "development",
    loadTime: 3.12,
    errorRate: 1.24,
    errorTrend: "up",
    activeUsers: 124,
    userTrend: "down",
    lastDeployed: "Mar 12, 2025 11:00 AM",
    owner: { name: "Alex Kim", initials: "AK" },
  },
  {
    id: "app-005",
    name: "Invoice Processor",
    platform: ["Desktop", "Mobile"],
    version: "v1.5.0",
    environment: "production",
    loadTime: 1.45,
    errorRate: 0.38,
    errorTrend: "stable",
    activeUsers: 1847,
    userTrend: "stable",
    lastDeployed: "Mar 8, 2025 1:20 PM",
    owner: { name: "Jordan Lee", initials: "JL" },
  },
  {
    id: "app-006",
    name: "Notification Service",
    platform: ["Web", "Mobile"],
    version: "v2.0.0",
    environment: "production",
    loadTime: 0.87,
    errorRate: 0.09,
    errorTrend: "down",
    activeUsers: 8934,
    userTrend: "up",
    lastDeployed: "Mar 11, 2025 3:00 PM",
    owner: { name: "Taylor Swift", initials: "TS" },
  },
]

const complianceStatus = {
  accessibility: { status: "verified", percentage: 98.7, issues: 3 },
  localization: { status: "in-progress", completed: 12, total: 15, missing: ["Arabic", "Hindi", "Vietnamese"] },
  dataResidency: { status: "compliant", regions: ["US-East", "EU-West", "APAC-Singapore"] },
  security: { status: "passed", lastScan: "Mar 11, 2025", nextScan: "Mar 18, 2025" },
}

export default function NativeAppsDashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState<string[]>(["All"])
  const [environmentFilter, setEnvironmentFilter] = useState("all")
  const [timeRange, setTimeRange] = useState("24h")
  const [selectedApps, setSelectedApps] = useState<string[]>([])
  const [showAppDetailModal, setShowAppDetailModal] = useState(false)
  const [selectedApp, setSelectedApp] = useState<typeof nativeApps[0] | null>(null)
  const [detailTab, setDetailTab] = useState("overview")

  const togglePlatformFilter = (platform: string) => {
    if (platform === "All") {
      setPlatformFilter(["All"])
    } else {
      const newFilters = platformFilter.filter(p => p !== "All")
      if (newFilters.includes(platform)) {
        const updated = newFilters.filter(p => p !== platform)
        setPlatformFilter(updated.length === 0 ? ["All"] : updated)
      } else {
        setPlatformFilter([...newFilters, platform])
      }
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPlatformFilter(["All"])
    setEnvironmentFilter("all")
    setTimeRange("24h")
  }

  const hasActiveFilters = searchQuery || !platformFilter.includes("All") || environmentFilter !== "all" || timeRange !== "24h"

  const filteredApps = nativeApps.filter(app => {
    if (searchQuery && !app.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (!platformFilter.includes("All")) {
      const hasMatchingPlatform = app.platform.some(p => platformFilter.includes(p))
      if (!hasMatchingPlatform) return false
    }
    if (environmentFilter !== "all" && app.environment !== environmentFilter) return false
    return true
  })

  const openAppDetail = (app: typeof nativeApps[0]) => {
    setSelectedApp(app)
    setDetailTab("overview")
    setShowAppDetailModal(true)
  }

  const getLoadTimeColor = (time: number) => {
    if (time < 2) return "text-emerald-600"
    if (time < 3) return "text-amber-600"
    return "text-[#ee3224]"
  }

  const getErrorRateColor = (rate: number) => {
    if (rate < 0.5) return "text-emerald-600"
    if (rate < 1) return "text-amber-600"
    return "text-[#ee3224]"
  }

  const getEnvBadge = (env: string) => {
    switch (env) {
      case "production": return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Production</Badge>
      case "staging": return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Staging</Badge>
      case "development": return <Badge className="bg-gray-500/10 text-gray-600 border-gray-200">Development</Badge>
      default: return null
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3" />
      case "down": return <TrendingDown className="h-3 w-3" />
      default: return <Minus className="h-3 w-3" />
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header & Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => router.push("/use/installed-apps")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>Use</span>
                <span>/</span>
                <span className="text-foreground">Native Applications</span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground">Native Applications Monitoring</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px] max-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search native apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#E5E7EB]"
                />
              </div>
              
              <div className="flex items-center gap-2">
                {["All", "Web", "Desktop", "Mobile"].map((platform) => (
                  <Button
                    key={platform}
                    variant={platformFilter.includes(platform) ? "default" : "outline"}
                    size="sm"
                    className={platformFilter.includes(platform) ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : "border-[#E5E7EB]"}
                    onClick={() => togglePlatformFilter(platform)}
                  >
                    {platform}
                  </Button>
                ))}
              </div>

              <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
                <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px] border-[#E5E7EB]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
                <span className="text-xs text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {!platformFilter.includes("All") && platformFilter.map(p => (
                  <Badge key={p} variant="secondary" className="gap-1">
                    {p}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => togglePlatformFilter(p)} />
                  </Badge>
                ))}
                {environmentFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {environmentFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setEnvironmentFilter("all")} />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="text-xs h-6" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { key: "activeSessions", icon: Users, title: "Active Sessions", ...summaryMetrics.activeSessions },
            { key: "avgLoadTime", icon: Gauge, title: "Avg Load Time", ...summaryMetrics.avgLoadTime },
            { key: "errorRate", icon: AlertCircle, title: "Error Rate", ...summaryMetrics.errorRate },
            { key: "crashFree", icon: ShieldCheck, title: "Crash-Free Sessions", ...summaryMetrics.crashFree },
            { key: "satisfaction", icon: Smile, title: "User Satisfaction", ...summaryMetrics.satisfaction },
          ].map((metric) => (
            <Card
              key={metric.key}
              className="cursor-pointer border-[#E5E7EB] transition-all hover:border-[#ee3224] hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{metric.title}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`flex items-center gap-1 text-xs ${
                    metric.trend === "up" ? "text-emerald-600" : metric.trend === "down" ? "text-emerald-600" : "text-muted-foreground"
                  }`}>
                    {metric.trend === "up" && <TrendingUp className="h-3 w-3" />}
                    {metric.trend === "down" && <TrendingDown className="h-3 w-3" />}
                    {metric.trend === "stable" && <Minus className="h-3 w-3" />}
                    {metric.trendValue}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{metric.comparison}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Analytics Section */}
        <div className="grid grid-cols-[1fr_340px] gap-6">
          {/* Left: Performance Charts */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Performance Analytics</h2>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>

            {/* Load Time Distribution */}
            <Card className="border-[#E5E7EB]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Page Load Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loadTimeDistribution.map((bucket) => (
                    <div key={bucket.range} className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-12">{bucket.range}</span>
                      <div className="flex-1 h-8 bg-[#F5F7FA] rounded relative overflow-hidden">
                        <div
                          className="h-full rounded transition-all"
                          style={{ width: `${bucket.percentage}%`, backgroundColor: bucket.color }}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium">
                          {bucket.percentage}% ({bucket.count.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Error Rate Timeline */}
            <Card className="border-[#E5E7EB]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Error Rate Over Time (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-muted-foreground">
                    <span>1.5%</span>
                    <span>1.0%</span>
                    <span>0.5%</span>
                    <span>0%</span>
                  </div>
                  {/* Chart area */}
                  <div className="ml-12 h-full relative">
                    {/* Threshold line */}
                    <div className="absolute left-0 right-0 top-[33%] border-t-2 border-dashed border-gray-300" />
                    <span className="absolute right-0 top-[33%] -translate-y-full text-xs text-muted-foreground">Threshold: 1.0%</span>
                    
                    {/* Line chart */}
                    <svg className="absolute inset-0 w-full h-[calc(100%-32px)]" viewBox="0 0 700 150" preserveAspectRatio="none">
                      <path
                        d={`M 50 ${150 - (0.31 / 1.5) * 150} L 150 ${150 - (0.29 / 1.5) * 150} L 250 ${150 - (0.45 / 1.5) * 150} L 350 ${150 - (0.33 / 1.5) * 150} L 450 ${150 - (0.28 / 1.5) * 150} L 550 ${150 - (0.26 / 1.5) * 150} L 650 ${150 - (0.28 / 1.5) * 150}`}
                        fill="none"
                        stroke="#ee3224"
                        strokeWidth="2"
                      />
                      {/* Event markers */}
                      {errorRateTimeline.map((point, idx) => {
                        const x = 50 + idx * 100
                        const y = 150 - (point.rate / 1.5) * 150
                        return (
                          <g key={idx}>
                            <circle cx={x} cy={y} r="4" fill={point.event ? "#F59E0B" : "#ee3224"} />
                            <title>{`${point.date}: ${point.rate}% (${point.errors} errors, ${point.users} users)${point.event ? ` - ${point.event}` : ""}`}</title>
                          </g>
                        )
                      })}
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-4">
                      {errorRateTimeline.map((point) => (
                        <span key={point.date}>{point.date}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interaction Latency Heatmap */}
            <Card className="border-[#E5E7EB]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Interaction Latency by Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB]">
                        <th className="text-left py-2 font-medium text-muted-foreground">Feature</th>
                        <th className="text-center py-2 font-medium text-muted-foreground">{"<200ms"}</th>
                        <th className="text-center py-2 font-medium text-muted-foreground">200-500ms</th>
                        <th className="text-center py-2 font-medium text-muted-foreground">500ms-1s</th>
                        <th className="text-center py-2 font-medium text-muted-foreground">{">1s"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interactionLatency.map((row) => (
                        <tr key={row.feature} className="border-b border-[#E5E7EB] hover:bg-[#F5F7FA] cursor-pointer">
                          <td className="py-2 font-medium">{row.feature}</td>
                          <td className="text-center py-2">
                            <span className="inline-block px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: `rgba(34, 197, 94, ${row.fast / 100})`, color: row.fast > 50 ? "white" : "#22C55E" }}>
                              {row.fast}%
                            </span>
                          </td>
                          <td className="text-center py-2">
                            <span className="inline-block px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: `rgba(245, 158, 11, ${row.medium / 100})`, color: row.medium > 30 ? "white" : "#F59E0B" }}>
                              {row.medium}%
                            </span>
                          </td>
                          <td className="text-center py-2">
                            <span className="inline-block px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: `rgba(238, 50, 36, ${row.slow / 100})`, color: row.slow > 15 ? "white" : "#ee3224" }}>
                              {row.slow}%
                            </span>
                          </td>
                          <td className="text-center py-2">
                            <span className="inline-block px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: `rgba(238, 50, 36, ${row.critical / 100 + 0.2})`, color: "white" }}>
                              {row.critical}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Quick Actions Panel */}
          <Card className="border-[#E5E7EB] h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 rounded border border-[#E5E7EB] hover:border-[#ee3224]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <PlayCircle className="h-4 w-4 text-[#ee3224]" />
                    <span className="text-sm font-medium">View Session Replay</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Watch real user sessions to identify UX issues</p>
                  <Button variant="outline" size="sm" className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                    Open Session Replay
                  </Button>
                </div>

                <div className="p-3 rounded border border-[#E5E7EB] hover:border-[#ee3224]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <FlaskConical className="h-4 w-4 text-[#ee3224]" />
                    <span className="text-sm font-medium">A/B Test Configuration</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Test performance improvements with controlled rollout</p>
                  <Button variant="outline" size="sm" className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                    Configure A/B Test
                  </Button>
                </div>

                <div className="p-3 rounded border border-[#E5E7EB] hover:border-[#ee3224]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowLeftCircle className="h-4 w-4 text-[#ee3224]" />
                    <span className="text-sm font-medium">Rollback Version</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Revert to previous stable version if issues detected</p>
                  <Button variant="outline" size="sm" className="w-full border-[#E5E7EB]" disabled>
                    Rollback to v2.3.0
                  </Button>
                </div>

                <div className="p-3 rounded border border-[#E5E7EB] hover:border-[#ee3224]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Bell className="h-4 w-4 text-[#ee3224]" />
                    <span className="text-sm font-medium">Performance Budget Alert</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Set alerts for load time or error rate thresholds</p>
                  <Button variant="outline" size="sm" className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                    Configure Alerts
                  </Button>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB]">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Last updated: 2 minutes ago
                </p>
                <Button variant="link" className="text-xs text-[#ee3224] p-0 h-auto mt-1">
                  View full performance report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Engagement Analytics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">User Engagement Analytics</h2>
            <Button variant="outline" size="sm" className="gap-2 border-[#E5E7EB]">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Engagement Metrics Row */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-[#E5E7EB] cursor-pointer hover:border-[#ee3224] transition-colors">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">7-Day Retention</p>
                <p className="text-2xl font-bold text-foreground mt-1">68.4%</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.1% vs last week
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E5E7EB] cursor-pointer hover:border-[#ee3224] transition-colors">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Top Feature Adoption</p>
                <p className="text-2xl font-bold text-foreground mt-1">AI Query: 82%</p>
                <p className="text-xs text-muted-foreground mt-1">Search: 76%</p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E7EB] cursor-pointer hover:border-[#ee3224] transition-colors">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                <p className="text-2xl font-bold text-foreground mt-1">4m 32s</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +18s vs last week
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E5E7EB] cursor-pointer hover:border-[#ee3224] transition-colors">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Funnel Completion</p>
                <p className="text-2xl font-bold text-foreground mt-1">34.2%</p>
                <p className="text-xs text-muted-foreground mt-1">Sign-up to First AI Query</p>
              </CardContent>
            </Card>
          </div>

          {/* Retention Cohort Heatmap */}
          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">User Retention by Cohort (Weekly)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="text-left py-2 font-medium text-muted-foreground">Cohort Week</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Day 1</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Day 3</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Day 7</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Day 14</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Day 30</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retentionCohorts.map((cohort) => (
                      <tr key={cohort.week} className="border-b border-[#E5E7EB]">
                        <td className="py-2 font-medium">Week of {cohort.week}</td>
                        {[cohort.day1, cohort.day3, cohort.day7, cohort.day14, cohort.day30].map((value, idx) => (
                          <td key={idx} className="text-center py-2">
                            {value !== null ? (
                              <span
                                className="inline-block px-3 py-1 rounded text-xs font-medium"
                                style={{
                                  backgroundColor: `rgba(34, 197, 94, ${value / 100})`,
                                  color: value > 50 ? "white" : "#22C55E"
                                }}
                              >
                                {value}%
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Compliance Section */}
        <div className="grid grid-cols-[1fr_400px] gap-6">
          {/* Left: Compliance Status Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Enterprise Compliance & Governance</h2>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-[#E5E7EB]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Accessibility Compliance</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">98.7% of components meet WCAG 2.1 AA standards</p>
                  <p className="text-xs text-amber-600 mt-1">3 minor issues detected in navigation menu</p>
                  <Button variant="link" className="text-xs text-[#ee3224] p-0 h-auto mt-2">
                    View Accessibility Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#E5E7EB]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Localization Coverage</span>
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 gap-1">
                      <Clock className="h-3 w-3" />
                      In Progress
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">12 of 15 target languages fully localized</p>
                  <Progress value={80} className="h-1.5 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Missing: Arabic, Hindi, Vietnamese</p>
                  <Button variant="link" className="text-xs text-[#ee3224] p-0 h-auto mt-2">
                    Manage Translations
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#E5E7EB]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Data Residency</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Compliant
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">All user data stored in approved regions</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {complianceStatus.dataResidency.regions.map((region) => (
                      <Badge key={region} variant="secondary" className="text-xs">{region}</Badge>
                    ))}
                  </div>
                  <Button variant="link" className="text-xs text-[#ee3224] p-0 h-auto mt-2">
                    View Data Map
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#E5E7EB]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Security Scan</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 gap-1">
                      <Lock className="h-3 w-3" />
                      Passed
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Last scan: Mar 11, 2025 - No critical vulnerabilities</p>
                  <p className="text-xs text-muted-foreground mt-1">Next scan: Mar 18, 2025</p>
                  <Button variant="outline" size="sm" className="mt-2 text-xs border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                    Run Manual Scan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right: Audit Controls Panel */}
          <Card className="border-[#E5E7EB] h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Audit & Governance Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded border border-[#E5E7EB]">
                <p className="text-sm font-medium mb-1">Export Compliance Report</p>
                <p className="text-xs text-muted-foreground mb-2">Generate SOC2/GDPR compliance report for audit</p>
                <Button variant="outline" size="sm" className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                  Export Report
                </Button>
              </div>
              <div className="p-3 rounded border border-[#E5E7EB]">
                <p className="text-sm font-medium mb-1">Access Review</p>
                <p className="text-xs text-muted-foreground mb-2">Review team member access permissions</p>
                <Button variant="outline" size="sm" className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                  Review Access
                </Button>
              </div>
              <div className="p-3 rounded border border-[#E5E7EB]">
                <p className="text-sm font-medium mb-1">Change Approval Workflow</p>
                <p className="text-xs text-muted-foreground mb-2">Configure deployment approval requirements</p>
                <Button variant="outline" size="sm" className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                  Configure Workflow
                </Button>
              </div>
              <div className="p-3 rounded border border-[#E5E7EB]">
                <p className="text-sm font-medium mb-1">Audit Log Export</p>
                <p className="text-xs text-muted-foreground mb-2">Download audit logs for external review</p>
                <Button variant="outline" size="sm" className="w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                  Export Logs
                </Button>
              </div>
              <div className="pt-3 border-t border-[#E5E7EB] text-xs text-muted-foreground">
                <p>Compliance last verified: Mar 10, 2025</p>
                <p className="flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3" />
                  Next review due: Apr 10, 2025
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Native Apps List Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Deployed Native Applications</h2>
              <Badge variant="secondary">({filteredApps.length} apps)</Badge>
            </div>
<Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                  Add New App
                  </Button>
          </div>

          <Card className="border-[#E5E7EB]">
            <Table>
              <TableHeader>
                <TableRow className="border-[#E5E7EB]">
                  <TableHead className="w-10">
                    <Checkbox
                      checked={selectedApps.length === filteredApps.length}
                      onCheckedChange={(checked) => {
                        setSelectedApps(checked ? filteredApps.map(a => a.id) : [])
                      }}
                    />
                  </TableHead>
                  <TableHead>App Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Load Time</TableHead>
                  <TableHead>Error Rate</TableHead>
                  <TableHead>Active Users</TableHead>
                  <TableHead>Last Deployed</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApps.map((app) => (
                  <TableRow
                    key={app.id}
                    className="border-[#E5E7EB] hover:bg-[#F5F7FA] cursor-pointer"
                    onClick={() => openAppDetail(app)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedApps.includes(app.id)}
                        onCheckedChange={(checked) => {
                          setSelectedApps(checked
                            ? [...selectedApps, app.id]
                            : selectedApps.filter(id => id !== app.id)
                          )
                        }}
                      />
                    </TableCell>
<TableCell>
                  <span className="font-medium">{app.name}</span>
                  </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {app.platform.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{app.version}</span>
                        {getEnvBadge(app.environment)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getLoadTimeColor(app.loadTime)}`}>
                        {app.loadTime}s
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={`font-medium ${getErrorRateColor(app.errorRate)}`}>
                          {app.errorRate}%
                        </span>
                        <span className={app.errorTrend === "down" ? "text-emerald-600" : app.errorTrend === "up" ? "text-[#ee3224]" : "text-muted-foreground"}>
                          {getTrendIcon(app.errorTrend)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{app.activeUsers.toLocaleString()}</span>
                        <span className={app.userTrend === "up" ? "text-emerald-600" : app.userTrend === "down" ? "text-[#ee3224]" : "text-muted-foreground"}>
                          {getTrendIcon(app.userTrend)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.lastDeployed}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openAppDetail(app)}>
                            <Monitor className="h-4 w-4 mr-2" />
                            Monitor
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ArrowLeftCircle className="h-4 w-4 mr-2" />
                            Rollback
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between p-4 border-t border-[#E5E7EB]">
              <span className="text-sm text-muted-foreground">
                Showing 1-{filteredApps.length} of {filteredApps.length} apps
              </span>
              {selectedApps.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{selectedApps.length} selected</span>
                  <Button variant="outline" size="sm" className="border-[#E5E7EB]">Deploy Selected</Button>
                  <Button variant="outline" size="sm" className="border-[#E5E7EB]">Pause Selected</Button>
                </div>
              )}
              <Button variant="ghost" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export Table as CSV
              </Button>
            </div>
          </Card>
        </div>

        {/* App Detail Modal */}
        <Dialog open={showAppDetailModal} onOpenChange={setShowAppDetailModal}>
          <DialogContent className="max-w-[1200px] max-h-[90vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
<DialogHeader>
                  <div className="flex items-center gap-3">
                  <div>
                  <DialogTitle className="text-xl">{selectedApp?.name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedApp?.platform.map((p) => (
                      <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                    ))}
                    {selectedApp && getEnvBadge(selectedApp.environment)}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <Tabs value={detailTab} onValueChange={setDetailTab} className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="w-full justify-start border-b border-[#E5E7EB] rounded-none bg-transparent p-0">
                {["Overview", "Performance", "Engagement", "Errors", "Sessions", "Settings"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <ScrollArea className="flex-1">
                <TabsContent value="overview" className="p-4 mt-0">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">App Metadata</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Owner</span>
                            <span className="font-medium">{selectedApp?.owner.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Version</span>
                            <span className="font-mono">{selectedApp?.version}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Deployed</span>
                            <span>{selectedApp?.lastDeployed}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Metrics</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded border border-[#E5E7EB]">
                            <p className="text-xs text-muted-foreground">Load Time</p>
                            <p className={`text-lg font-bold ${getLoadTimeColor(selectedApp?.loadTime || 0)}`}>
                              {selectedApp?.loadTime}s
                            </p>
                          </div>
                          <div className="p-3 rounded border border-[#E5E7EB]">
                            <p className="text-xs text-muted-foreground">Error Rate</p>
                            <p className={`text-lg font-bold ${getErrorRateColor(selectedApp?.errorRate || 0)}`}>
                              {selectedApp?.errorRate}%
                            </p>
                          </div>
                          <div className="p-3 rounded border border-[#E5E7EB]">
                            <p className="text-xs text-muted-foreground">Active Users</p>
                            <p className="text-lg font-bold">{selectedApp?.activeUsers.toLocaleString()}</p>
                          </div>
                          <div className="p-3 rounded border border-[#E5E7EB]">
                            <p className="text-xs text-muted-foreground">Satisfaction</p>
                            <p className="text-lg font-bold">4.6/5.0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Health Summary</h3>
                      <Card className="border-[#E5E7EB]">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Healthy
                            </Badge>
                            <span className="text-sm text-muted-foreground">All systems operational</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>Load time within target</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>Error rate below threshold</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>No active incidents</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="p-4 mt-0">
                  <div className="text-center py-8 text-muted-foreground">
                    Performance waterfall charts, Core Web Vitals, and resource timing breakdown would be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="engagement" className="p-4 mt-0">
                  <div className="text-center py-8 text-muted-foreground">
                    User journey maps, feature usage heatmaps, and retention curves would be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="errors" className="p-4 mt-0">
                  <div className="text-center py-8 text-muted-foreground">
                    Error breakdown by type, error timeline, and stack trace viewer would be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="sessions" className="p-4 mt-0">
                  <div className="text-center py-8 text-muted-foreground">
                    Session list with replay functionality would be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="p-4 mt-0">
                  <div className="text-center py-8 text-muted-foreground">
                    Monitoring configuration, sampling rules, and integration settings would be displayed here.
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
              <Button variant="outline" className="gap-2 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                <ExternalLink className="h-4 w-4" />
                Edit in Builder
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2 border-[#E5E7EB] text-[#ee3224] hover:bg-[#ee3224]/5">
                  <Pause className="h-4 w-4" />
                  Pause App
                </Button>
                <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
                  <Rocket className="h-4 w-4" />
                  Deploy New Version
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
