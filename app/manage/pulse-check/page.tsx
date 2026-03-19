"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Activity,
  Download,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  FileText,
  MoreHorizontal,
  Eye,
  Pencil,
  Pause,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data
const pulseMetrics = {
  totalInstalls: 45200,
  wau: 12400,
  mau: 28700,
  avgSessionDuration: "4m 32s",
  errorRate: 0.28,
  uptime: 99.94,
}

const assets = [
  { id: "asset-001", name: "Briefly AI", type: "Agent", installs: 12400, wau: 3200, avgSession: "6m 12s", errorRate: 0.21, uptime: 99.97, owner: "Personal", installsTrend: 8, wauTrend: 5 },
  { id: "asset-002", name: "InboxIQ AI", type: "Agent", installs: 18200, wau: 5600, avgSession: "4m 45s", errorRate: 0.09, uptime: 99.99, owner: "Personal", installsTrend: 12, wauTrend: 10 },
  { id: "asset-003", name: "MindLink AI", type: "Agent", installs: 5600, wau: 1800, avgSession: "5m 23s", errorRate: 0.38, uptime: 99.94, owner: "Personal", installsTrend: 6, wauTrend: 3 },
  { id: "asset-004", name: "FocusFlow AI", type: "Agent", installs: 4300, wau: 1400, avgSession: "3m 56s", errorRate: 0.42, uptime: 99.91, owner: "Team", installsTrend: -2, wauTrend: -1 },
  { id: "asset-005", name: "LocalLens AI", type: "Agent", installs: 2100, wau: 892, avgSession: "2m 34s", errorRate: 0.67, uptime: 99.87, owner: "Personal", installsTrend: 4, wauTrend: 2 },
  { id: "asset-006", name: "SlideCraft AI", type: "Agent", installs: 6800, wau: 2100, avgSession: "4m 18s", errorRate: 0.15, uptime: 99.96, owner: "Team", installsTrend: 15, wauTrend: 8 },
]

const activeUsersData = [
  { day: 1, wau: 10200, mau: 25100 },
  { day: 5, wau: 11100, mau: 26300 },
  { day: 10, wau: 11800, mau: 27200 },
  { day: 15, wau: 12000, mau: 27800 },
  { day: 20, wau: 12200, mau: 28100 },
  { day: 25, wau: 12300, mau: 28500 },
  { day: 30, wau: 12400, mau: 28700 },
]

const errorLatencyData = [
  { day: 1, errorRate: 0.31, latency: 1245 },
  { day: 5, errorRate: 0.29, latency: 1189 },
  { day: 10, errorRate: 0.45, latency: 1567 },
  { day: 15, errorRate: 0.33, latency: 1234 },
  { day: 20, errorRate: 0.28, latency: 1156 },
  { day: 25, errorRate: 0.26, latency: 1098 },
  { day: 30, errorRate: 0.28, latency: 1123 },
]

const retentionData = [
  { cohort: "Week of Feb 12", day1: 100, day3: 84, day7: 72, day14: 58, day30: 45 },
  { cohort: "Week of Feb 19", day1: 100, day3: 81, day7: 69, day14: 55, day30: null },
  { cohort: "Week of Feb 26", day1: 100, day3: 86, day7: 71, day14: 60, day30: null },
  { cohort: "Week of Mar 4", day1: 100, day3: 83, day7: 68, day14: null, day30: null },
  { cohort: "Week of Mar 11", day1: 100, day3: null, day7: null, day14: null, day30: null },
]

export default function PulsePage() {
  const [selectedAsset, setSelectedAsset] = useState("all")
  const [dateRange, setDateRange] = useState("30days")
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [assetDetailOpen, setAssetDetailOpen] = useState(false)
  const [selectedAssetDetail, setSelectedAssetDetail] = useState<typeof assets[0] | null>(null)
  const [activeDetailTab, setActiveDetailTab] = useState("overview")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredAssets = assets.filter(asset => {
    if (ownerFilter === "all") return true
    return asset.owner.toLowerCase() === ownerFilter
  })

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn as keyof typeof a]
    const bVal = b[sortColumn as keyof typeof b]
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal
    }
    return 0
  })

  const openAssetDetail = (asset: typeof assets[0]) => {
    setSelectedAssetDetail(asset)
    setAssetDetailOpen(true)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getRetentionColor = (value: number | null) => {
    if (value === null) return "bg-muted"
    if (value >= 60) return "bg-emerald-500 text-white"
    if (value >= 40) return "bg-emerald-400 text-white"
    if (value >= 20) return "bg-emerald-300"
    return "bg-muted"
  }

  return (
    <AppLayout>
      <TooltipProvider>
        <div className="flex h-[calc(100vh-4rem)] flex-col overflow-auto bg-[#F5F7FA]">
          {/* Page Header */}
          <div className="border-b border-border bg-white px-6 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#ee3224]" />
                  <h1 className="text-xl font-semibold text-foreground">Pulse Check</h1>
                </div>
                <p className="mt-2 text-sm text-[#6B7280] max-w-[600px]">
                  Monitor the performance and health of your deployed agents.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Assets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  {assets.map(asset => (
                    <SelectItem key={asset.id} value={asset.id}>{asset.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/10">
                <FileText className="h-4 w-4" />
              Export Report
            </Button>
            </div>
          </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6">
          {/* Portfolio Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +12%
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{formatNumber(pulseMetrics.totalInstalls)}</p>
                <p className="text-xs text-muted-foreground">Total Installs</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +8%
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{formatNumber(pulseMetrics.wau)}</p>
                <p className="text-xs text-muted-foreground">Weekly Active Users</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +5%
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{formatNumber(pulseMetrics.mau)}</p>
                <p className="text-xs text-muted-foreground">Monthly Active Users</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-xs text-red-600">
                    <TrendingDown className="h-3 w-3" />
                    -3%
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{pulseMetrics.avgSessionDuration}</p>
                <p className="text-xs text-muted-foreground">Avg Session Duration</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingDown className="h-3 w-3" />
                    -0.05%
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{pulseMetrics.errorRate}%</p>
                <p className="text-xs text-muted-foreground">Error Rate</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +0.02%
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{pulseMetrics.uptime}%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Active Users Over Time */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Active Users (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ee3224]" />
                    <span className="text-muted-foreground">WAU</span>
                  </div>
                </div>
                <div className="relative h-48 flex">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2 py-1">
                    <span>13K</span>
                    <span>12K</span>
                    <span>11K</span>
                    <span>10K</span>
                    <span>9K</span>
                  </div>
                  <div className="flex-1 relative">
                    <svg className="h-full w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="0" x2="400" y2="0" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="75" x2="400" y2="75" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#E5E7EB" />
                      
                      {/* WAU line (solid) - dynamically generated */}
                      <path
                        d={activeUsersData.map((d, i) => {
                          const x = (i / (activeUsersData.length - 1)) * 400
                          const y = 150 - ((d.wau - 9000) / 4000) * 150
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                        }).join(' ')}
                        fill="none"
                        stroke="#ee3224"
                        strokeWidth="2"
                      />
                      
                      {/* Data points WAU */}
                      {activeUsersData.map((d, i) => (
                        <circle
                          key={`wau-${i}`}
                          cx={(i / (activeUsersData.length - 1)) * 400}
                          cy={150 - ((d.wau - 9000) / 4000) * 150}
                          r="4"
                          fill="#ee3224"
                        />
                      ))}
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2 ml-8">
                  <span>Day 1</span>
                  <span>Day 10</span>
                  <span>Day 20</span>
                  <span>Day 30</span>
                </div>
              </CardContent>
            </Card>

            {/* P95 Latency */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">P95 Latency (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ee3224]" />
                    <span className="text-muted-foreground">P95 Latency (ms)</span>
                  </div>
                </div>
                <div className="relative h-48 flex">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2 py-1">
                    <span>1700</span>
                    <span>1500</span>
                    <span>1300</span>
                    <span>1100</span>
                    <span>900</span>
                  </div>
                  <div className="flex-1 relative">
                    <svg className="h-full w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="0" x2="400" y2="0" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="75" x2="400" y2="75" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="#E5E7EB" strokeDasharray="4" />
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#E5E7EB" />
                      
                      {/* P95 Latency line - dynamically generated */}
                      <path
                        d={errorLatencyData.map((d, i) => {
                          const x = (i / (errorLatencyData.length - 1)) * 400
                          const y = 150 - ((d.latency - 900) / 800) * 150
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                        }).join(' ')}
                        fill="none"
                        stroke="#ee3224"
                        strokeWidth="2"
                      />
                      
                      {/* Data points */}
                      {errorLatencyData.map((d, i) => (
                        <circle
                          key={i}
                          cx={(i / (errorLatencyData.length - 1)) * 400}
                          cy={150 - ((d.latency - 900) / 800) * 150}
                          r="4"
                          fill="#ee3224"
                        />
                      ))}
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2 ml-8">
                  <span>Day 1</span>
                  <span>Day 10</span>
                  <span>Day 20</span>
                  <span>Day 30</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Retention Cohort Analysis */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">User Retention by Cohort (Weekly)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Cohort</TableHead>
                      <TableHead className="text-center">Day 1</TableHead>
                      <TableHead className="text-center">Day 3</TableHead>
                      <TableHead className="text-center">Day 7</TableHead>
                      <TableHead className="text-center">Day 14</TableHead>
                      <TableHead className="text-center">Day 30</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retentionData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{row.cohort}</TableCell>
                        {[row.day1, row.day3, row.day7, row.day14, row.day30].map((val, i) => (
                          <TableCell key={i} className="text-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className={`inline-flex items-center justify-center rounded px-3 py-1 text-sm font-medium ${getRetentionColor(val)}`}>
                                  {val !== null ? `${val}%` : "N/A"}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {val !== null ? `${val}% of cohort still active` : "Data not yet available"}
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Asset Performance Table */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold">Asset Performance</CardTitle>
                  <Badge variant="secondary">{assets.length} assets</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={ownerFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOwnerFilter("all")}
                    className={ownerFilter === "all" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                  >
                    All
                  </Button>
                  <Button
                    variant={ownerFilter === "personal" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOwnerFilter("personal")}
                    className={ownerFilter === "personal" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                  >
                    Personal
                  </Button>
                  <Button
                    variant={ownerFilter === "team" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOwnerFilter("team")}
                    className={ownerFilter === "team" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                  >
                    Team
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48">Asset Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("installs")}>
                        <div className="flex items-center gap-1">
                          Installs
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("wau")}>
                        <div className="flex items-center gap-1">
                          WAU
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Avg Session</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("errorRate")}>
                        <div className="flex items-center gap-1">
                          Error Rate
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("uptime")}>
                        <div className="flex items-center gap-1">
                          Uptime
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAssets.map((asset) => (
                      <TableRow 
                        key={asset.id} 
                        className="cursor-pointer hover:bg-[#F5F7FA]"
                        onClick={() => openAssetDetail(asset)}
                      >
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{asset.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {formatNumber(asset.installs)}
                            {asset.installsTrend > 0 ? (
                              <TrendingUp className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {formatNumber(asset.wau)}
                            {asset.wauTrend > 0 ? (
                              <TrendingUp className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{asset.avgSession}</TableCell>
                        <TableCell>
                          <span className={asset.errorRate > 0.5 ? "text-amber-600" : "text-emerald-600"}>
                            {asset.errorRate}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={asset.uptime < 99.9 ? "text-amber-600" : "text-emerald-600"}>
                            {asset.uptime}%
                          </span>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openAssetDetail(asset)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E7EB]">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedAssets.length} of {assets.length} assets
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">Page {currentPage}</span>
                  <Button variant="outline" size="sm" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Detail Modal */}
          <Dialog open={assetDetailOpen} onOpenChange={setAssetDetailOpen}>
            <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ee3224]/10">
                    <Activity className="h-5 w-5 text-[#ee3224]" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedAssetDetail?.name}</DialogTitle>
                    <Badge variant="outline" className="mt-1">{selectedAssetDetail?.type}</Badge>
                  </div>
                </div>
              </DialogHeader>
              
              <Tabs value={activeDetailTab} onValueChange={setActiveDetailTab} className="flex-1 overflow-hidden">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="retention">Retention</TabsTrigger>
                  <TabsTrigger value="errors">Errors</TabsTrigger>
                  <TabsTrigger value="versions">Versions</TabsTrigger>
                </TabsList>
                
                <div className="overflow-y-auto mt-4 flex-1">
                  <TabsContent value="overview" className="mt-0 space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Installs</p>
                          <p className="text-2xl font-bold">{formatNumber(selectedAssetDetail?.installs || 0)}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">WAU</p>
                          <p className="text-2xl font-bold">{formatNumber(selectedAssetDetail?.wau || 0)}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Error Rate</p>
                          <p className="text-2xl font-bold">{selectedAssetDetail?.errorRate}%</p>
                        </CardContent>
                      </Card>
                    </div>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">
                          AI-powered assistant for productivity and workflow automation. Deployed and actively serving users.
                        </p>
                        <div className="mt-4 grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Owner</span>
                            <span>{selectedAssetDetail?.owner}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated</span>
                            <span>Mar 10, 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <Badge className="bg-emerald-500">Active</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="mt-0">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-4">Performance Metrics</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm text-muted-foreground">P95 Latency</p>
                            <p className="text-xl font-bold">1,123ms</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">P99 Latency</p>
                            <p className="text-xl font-bold">1,892ms</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Avg Load Time</p>
                            <p className="text-xl font-bold">856ms</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Uptime</p>
                            <p className="text-xl font-bold">{selectedAssetDetail?.uptime}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="retention" className="mt-0">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-4">Retention Analysis</h4>
                        <p className="text-sm text-muted-foreground">Cohort retention data for this specific asset.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="errors" className="mt-0">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-4">Error Breakdown</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-muted rounded">
                            <span>TypeError: Cannot read property</span>
                            <Badge variant="outline">42 occurrences</Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted rounded">
                            <span>NetworkError: Connection timeout</span>
                            <Badge variant="outline">18 occurrences</Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted rounded">
                            <span>ValidationError: Invalid input</span>
                            <Badge variant="outline">7 occurrences</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="versions" className="mt-0">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-4">Version History</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Version</TableHead>
                              <TableHead>Released</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>v2.3.1</TableCell>
                              <TableCell>Mar 10, 2025</TableCell>
                              <TableCell><Badge className="bg-emerald-500">Current</Badge></TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>v2.3.0</TableCell>
                              <TableCell>Mar 5, 2025</TableCell>
                              <TableCell><Badge variant="outline">Previous</Badge></TableCell>
                              <TableCell><Button variant="ghost" size="sm">Rollback</Button></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>v2.2.0</TableCell>
                              <TableCell>Feb 28, 2025</TableCell>
                              <TableCell><Badge variant="outline">Archived</Badge></TableCell>
                              <TableCell><Button variant="ghost" size="sm">Rollback</Button></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
              
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                <Button variant="outline" className="border-[#ee3224] text-[#ee3224]">
                  Edit in Builder
                </Button>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Pause Asset
                </Button>
                <Button variant="ghost" onClick={() => setAssetDetailOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </TooltipProvider>
    </AppLayout>
  )
}
