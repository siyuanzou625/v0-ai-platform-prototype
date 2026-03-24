"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
  Cpu,
  Monitor,
  Brain,
  MemoryStick,
  Battery,
  Scale,
  Zap,
  Leaf,
  Sliders,
  RefreshCw,
  Search,
  MoreHorizontal,
  Play,
  Pause,
  Square,
  Eye,
  AlertTriangle,
  Lightbulb,
  Computer,
  Cloud,
  ArrowLeftRight,
  Lock,
  FileText,
  Check,
  History,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// System Overview Metrics
const systemMetrics = {
  cpu: { usage: 42, trend: "+5%", cores: "8 of 12 cores active" },
  gpu: { usage: 67, trend: "+12%", info: "NVIDIA RTX 4090 - 8GB VRAM used" },
  npu: { usage: 34, trend: "Stable", info: "NPU handling AI inference tasks" },
  memory: { used: 8.2, total: 16, trend: "51% utilized", available: "7.8GB available for new agents" },
  idle: { value: 49, trend: "Sufficient headroom", info: "New agents will run without queuing" },
}

// Allocation segments for bar chart
const allocationSegments = [
  { name: "Briefly AI", percentage: 35, color: "#ee3224" },
  { name: "Meeting Notes Agent", percentage: 25, color: "#F59E0B" },
  { name: "InboxIQ AI", percentage: 20, color: "#3B82F6" },
  { name: "Research Assistant", percentage: 15, color: "#8B5CF6" },
  { name: "Idle/Available", percentage: 5, color: "#E5E7EB" },
]

// Active Agents data
const activeAgents = [
  { id: 1, name: "Briefly AI", status: "running", cpu: 15, gpu: 25, npu: 45, priority: "high", lastActivity: "2 min ago" },
  { id: 2, name: "Meeting Notes Agent", status: "running", cpu: 12, gpu: 30, npu: 38, priority: "high", lastActivity: "5 min ago" },
  { id: 3, name: "InboxIQ AI", status: "running", cpu: 8, gpu: 12, npu: 15, priority: "medium", lastActivity: "10 min ago" },
  { id: 4, name: "Research Assistant", status: "idle", cpu: 2, gpu: 0, npu: 0, priority: "medium", lastActivity: "1 hour ago" },
  { id: 5, name: "FocusFlow AI", status: "paused", cpu: 0, gpu: 0, npu: 0, priority: "low", lastActivity: "3 hours ago" },
  { id: 6, name: "LocalLens AI", status: "overloaded", cpu: 45, gpu: 50, npu: 60, priority: "high", lastActivity: "1 min ago" },
]

// Resource Allocation data
const resourceAllocations = [
  { id: 1, name: "Briefly AI", status: "running", usage: 87, cpu: 25, gpu: 30, npu: 45 },
  { id: 2, name: "Meeting Notes Agent", status: "running", usage: 92, cpu: 20, gpu: 35, npu: 40 },
  { id: 3, name: "InboxIQ AI", status: "running", usage: 65, cpu: 15, gpu: 20, npu: 15 },
  { id: 4, name: "Research Assistant", status: "idle", usage: 12, cpu: 10, gpu: 0, npu: 0 },
]

// Permission Matrix data
const permissionData = [
  { id: 1, name: "Briefly AI", cpu: true, gpu: true, npu: true, files: true, network: true, camera: true },
  { id: 2, name: "Meeting Notes Agent", cpu: true, gpu: true, npu: true, files: true, network: true, camera: true },
  { id: 3, name: "InboxIQ AI", cpu: true, gpu: false, npu: false, files: false, network: true, camera: false },
  { id: 4, name: "Research Assistant", cpu: true, gpu: true, npu: false, files: true, network: true, camera: false },
  { id: 5, name: "FocusFlow AI", cpu: true, gpu: false, npu: false, files: false, network: false, camera: false },
  { id: 6, name: "LocalLens AI", cpu: true, gpu: true, npu: true, files: true, network: true, camera: false },
]

// Circular Progress Component
function CircularProgress({ value, color = "#ee3224", size = 48 }: { value: number; color?: string; size?: number }) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="4"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

// Mini Sparkline Component
function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 40
  const height = 16
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="inline-block ml-2">
      <polyline
        points={points}
        fill="none"
        stroke="#ee3224"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; dot: string }> = {
    running: { bg: "bg-[#DCFCE7]", text: "text-[#166534]", dot: "bg-[#22C55E]" },
    idle: { bg: "bg-[#F3F4F6]", text: "text-[#374151]", dot: "bg-[#6B7280]" },
    paused: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", dot: "bg-[#F59E0B]" },
    overloaded: { bg: "bg-[#F5F7FA]", text: "text-[#ee3224]", dot: "bg-[#ee3224]" },
  }
  const style = styles[status] || styles.idle
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${style.dot} ${status === "running" ? "animate-pulse" : ""}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
}

// Priority Badge Component
function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    high: "bg-[#F5F7FA] text-[#ee3224]",
    medium: "bg-[#FEF3C7] text-[#92400E]",
    low: "bg-[#F3F4F6] text-[#374151]",
  }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${styles[priority] || styles.medium}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  )
}

// Usage Color helper
function getUsageColor(value: number): string {
  if (value <= 50) return "text-[#22C55E]"
  if (value <= 80) return "text-[#F59E0B]"
  return "text-[#ee3224]"
}

export default function ExecutionControlPage() {
  const { toast } = useToast()
  const [executionMode, setExecutionMode] = useState("balanced")
  const [autoOptimize, setAutoOptimize] = useState(true)
  const [advancedMode, setAdvancedMode] = useState(true)
  const [autoScaling, setAutoScaling] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [lastUpdated, setLastUpdated] = useState(5)
  const [npuMode, setNpuMode] = useState("auto")
  const [executionStrategy, setExecutionStrategy] = useState("local")
  const [permissionPreset, setPermissionPreset] = useState("standard")
  const [selectedAgents, setSelectedAgents] = useState<number[]>([])
  const [showAppliedInsights, setShowAppliedInsights] = useState(false)
  
  // Load advanced mode preference from localStorage
  useEffect(() => {
    const savedAdvancedMode = localStorage.getItem("advancedMode")
    if (savedAdvancedMode !== null) {
      setAdvancedMode(savedAdvancedMode === "true")
    }
  }, [])
  
  // Save advanced mode preference to localStorage
  const handleAdvancedModeToggle = (checked: boolean) => {
    setAdvancedMode(checked)
    localStorage.setItem("advancedMode", String(checked))
    toast({
      title: checked ? "Advanced Mode enabled" : "Advanced Mode disabled",
      description: checked ? "All advanced controls are now visible" : "Showing simplified view",
    })
  }
  
  // Filter agents based on status (different options in basic vs advanced mode)
  const filteredAgents = activeAgents.filter(agent => {
    if (statusFilter !== "all" && agent.status !== statusFilter) return false
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleRefresh = () => {
    setLastUpdated(0)
    setTimeout(() => setLastUpdated(5), 1000)
  }
  
  const handlePresetClick = (preset: string) => {
    setExecutionMode(preset)
    toast({
      title: "Resources rebalanced",
      description: `Applied ${preset} preset to all agents`,
    })
  }
  
  const toggleAgentSelection = (agentId: number) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    )
  }
  
  const toggleAllAgents = () => {
    if (selectedAgents.length === filteredAgents.length) {
      setSelectedAgents([])
    } else {
      setSelectedAgents(filteredAgents.map(a => a.id))
    }
  }

  // Mock sparkline data for each agent
  const sparklineData: Record<number, number[]> = {
    1: [12, 15, 18, 14, 15],
    2: [8, 12, 15, 11, 12],
    3: [5, 8, 10, 7, 8],
    4: [2, 3, 2, 1, 2],
    5: [0, 0, 0, 0, 0],
    6: [35, 42, 48, 44, 45],
  }

  return (
    <AppLayout>
      <TooltipProvider delayDuration={500}>
        <>
          {/* Page Header */}
          <div className="sticky top-0 z-10 bg-white px-8 py-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-[#ee3224]" />
                  <h1 className="text-2xl font-semibold text-[#1F2937]">Execution Control</h1>
                </div>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Manage compute resources and runtime behavior of AI agents
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto bg-[#F5F7FA]">
            <div className="px-8 py-6 space-y-8">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Execution Mode */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6B7280]">Execution Mode</label>
                <Select value={executionMode} onValueChange={setExecutionMode}>
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4" />
                        Balanced
                      </div>
                    </SelectItem>
                    <SelectItem value="performance">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Performance
                      </div>
                    </SelectItem>
                    <SelectItem value="efficiency">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        Efficiency
                      </div>
                    </SelectItem>
                    <SelectItem value="custom">
                      <div className="flex items-center gap-2">
                        <Sliders className="h-4 w-4" />
                        Custom
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Auto-Optimize Toggle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6B7280]">Auto-Optimize</label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={autoOptimize}
                    onCheckedChange={setAutoOptimize}
                    className="data-[state=checked]:bg-[#ee3224]"
                  />
                  <span className="text-sm text-[#333]">{autoOptimize ? "ON" : "OFF"}</span>
                </div>
              </div>
              
              {/* Advanced Mode Toggle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6B7280]">Advanced Mode</label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={advancedMode}
                    onCheckedChange={handleAdvancedModeToggle}
                    className="data-[state=checked]:bg-[#ee3224]"
                    aria-label="Advanced Mode"
                  />
                  <span className="text-sm text-[#333]">{advancedMode ? "ON" : "OFF"}</span>
                </div>
              </div>
            </div>

            {/* Section A: System Overview */}
          <section aria-hidden={false}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1F2937]">System Overview</h2>
                <p className="text-sm text-[#6B7280]">Real-time hardware utilization across all agents</p>
              </div>
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-[#333] transition-colors"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${lastUpdated === 0 ? "animate-spin" : ""}`} />
                Last updated: {lastUpdated}s ago
              </button>
            </div>

            {/* Metric Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
              {/* CPU Usage */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="h-5 w-5 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">CPU Usage</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1F2937]">{systemMetrics.cpu.usage}%</p>
                      <p className="text-xs text-[#22C55E] flex items-center gap-1 mt-1">
                        <span>↑</span> {systemMetrics.cpu.trend} vs last min
                      </p>
                    </div>
                    {advancedMode ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <CircularProgress value={systemMetrics.cpu.usage} />
                        </TooltipTrigger>
                        <TooltipContent>{systemMetrics.cpu.cores}</TooltipContent>
                      </Tooltip>
                    ) : (
                      <CircularProgress value={systemMetrics.cpu.usage} />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* GPU Usage */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Monitor className="h-5 w-5 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">GPU Usage</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1F2937]">{systemMetrics.gpu.usage}%</p>
                      <p className="text-xs text-[#F59E0B] flex items-center gap-1 mt-1">
                        <span>↑</span> {systemMetrics.gpu.trend} vs last min
                      </p>
                    </div>
                    {advancedMode ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <CircularProgress value={systemMetrics.gpu.usage} />
                        </TooltipTrigger>
                        <TooltipContent>{systemMetrics.gpu.info}</TooltipContent>
                      </Tooltip>
                    ) : (
                      <CircularProgress value={systemMetrics.gpu.usage} />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* NPU Usage */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="h-5 w-5 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">NPU Usage</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1F2937]">{systemMetrics.npu.usage}%</p>
                      <p className="text-xs text-[#ee3224] flex items-center gap-1 mt-1">
                        <span>●</span> AI Acceleration Active
                      </p>
                    </div>
                    {advancedMode ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <CircularProgress value={systemMetrics.npu.usage} />
                        </TooltipTrigger>
                        <TooltipContent>{systemMetrics.npu.info}</TooltipContent>
                      </Tooltip>
                    ) : (
                      <CircularProgress value={systemMetrics.npu.usage} />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Memory Usage */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MemoryStick className="h-5 w-5 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Memory Usage</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1F2937]">{systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB</p>
                      <p className="text-xs text-[#6B7280] mt-1">{systemMetrics.memory.trend}</p>
                      {advancedMode ? (
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <div className="mt-2 h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#ee3224] rounded-full transition-all"
                                style={{ width: `${(systemMetrics.memory.used / systemMetrics.memory.total) * 100}%` }}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{systemMetrics.memory.available}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <div className="mt-2 h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#ee3224] rounded-full transition-all"
                            style={{ width: `${(systemMetrics.memory.used / systemMetrics.memory.total) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Idle Capacity */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Battery className="h-5 w-5 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Idle Capacity</span>
                      </div>
                      <p className="text-2xl font-bold text-[#22C55E]">{systemMetrics.idle.value}%</p>
                      <p className="text-xs text-[#22C55E] mt-1">{systemMetrics.idle.trend}</p>
                    </div>
                    {advancedMode ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <CircularProgress value={systemMetrics.idle.value} color="#22C55E" />
                        </TooltipTrigger>
                        <TooltipContent>{systemMetrics.idle.info}</TooltipContent>
                      </Tooltip>
                    ) : (
                      <CircularProgress value={systemMetrics.idle.value} color="#22C55E" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Allocation Bar Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-[#1F2937] mb-4">Compute Allocation by Agent</h3>
                <div className="h-8 w-full flex rounded-lg overflow-hidden">
                  {allocationSegments.map((segment, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger 
                        className={`h-full transition-opacity hover:opacity-80 ${advancedMode ? "cursor-pointer" : ""}`}
                        style={{ width: `${segment.percentage}%`, backgroundColor: segment.color }}
                        onClick={() => {
                          if (advancedMode) {
                            // Scroll to agent in table
                            const element = document.getElementById(`agent-row-${idx + 1}`)
                            element?.scrollIntoView({ behavior: "smooth", block: "center" })
                          }
                        }}
                      />
                      <TooltipContent>{segment.name}: {segment.percentage}%</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  {allocationSegments.map((segment, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <div className="h-3 w-3 rounded" style={{ backgroundColor: segment.color }} />
                      <span className="text-[#6B7280]">{segment.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section B: Active Agents */}
          <section aria-hidden={false}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1F2937]">Active Agents</h2>
                <p className="text-sm text-[#6B7280]">Monitor and control running AI agents</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                  <Input
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-48"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    {advancedMode && (
                      <>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="overloaded">Overloaded</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {advancedMode && selectedAgents.length > 0 && (
                  <Button variant="outline" className="border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/10">
                    Pause Selected ({selectedAgents.length})
                  </Button>
                )}
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F5F7FA]">
                    {advancedMode && (
                      <TableHead className="w-10">
                        <Checkbox 
                          checked={selectedAgents.length === filteredAgents.length && filteredAgents.length > 0}
                          onCheckedChange={toggleAllAgents}
                        />
                      </TableHead>
                    )}
                    <TableHead className="font-semibold text-[#333]">Agent Name</TableHead>
                    <TableHead className="font-semibold text-[#333]">Status</TableHead>
                    {advancedMode && (
                      <>
                        <TableHead className="font-semibold text-[#333]">CPU %</TableHead>
                        <TableHead className="font-semibold text-[#333]">GPU %</TableHead>
                        <TableHead className="font-semibold text-[#333]">NPU %</TableHead>
                      </>
                    )}
                    <TableHead className="font-semibold text-[#333]">Priority</TableHead>
                    <TableHead className="font-semibold text-[#333]">Last Activity</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id} id={`agent-row-${agent.id}`} className="hover:bg-[#F5F7FA] h-16">
                      {advancedMode && (
                        <TableCell>
                          <Checkbox 
                            checked={selectedAgents.includes(agent.id)}
                            onCheckedChange={() => toggleAgentSelection(agent.id)}
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-[#ee3224]/10 flex items-center justify-center">
                            <Brain className="h-4 w-4 text-[#ee3224]" />
                          </div>
                          <span className="font-medium text-[#1F2937]">{agent.name}</span>
                        </div>
                      </TableCell>
                      <TableCell><StatusBadge status={agent.status} /></TableCell>
                      {advancedMode && (
                        <>
                          <TableCell className={getUsageColor(agent.cpu)}>
                            {agent.cpu}%
                            <MiniSparkline data={sparklineData[agent.id]} />
                          </TableCell>
                          <TableCell className={getUsageColor(agent.gpu)}>
                            {agent.gpu}%
                            <MiniSparkline data={sparklineData[agent.id].map(v => v * 1.5)} />
                          </TableCell>
                          <TableCell className={getUsageColor(agent.npu)}>
                            {agent.npu}%
                            <MiniSparkline data={sparklineData[agent.id].map(v => v * 2)} />
                          </TableCell>
                        </>
                      )}
                      <TableCell><PriorityBadge priority={agent.priority} /></TableCell>
                      <TableCell className="text-[#6B7280] text-sm">{agent.lastActivity}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {agent.status === "running" ? (
                              <DropdownMenuItem><Pause className="h-4 w-4 mr-2" /> Pause Agent</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem><Play className="h-4 w-4 mr-2" /> Resume Agent</DropdownMenuItem>
                            )}
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem>
                            {advancedMode && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Sliders className="h-4 w-4 mr-2" /> Limit Resources</DropdownMenuItem>
                                <DropdownMenuItem><Scale className="h-4 w-4 mr-2" /> Change Priority</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-[#ee3224]"><Square className="h-4 w-4 mr-2" /> Stop Agent</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB]">
                <span className="text-sm text-[#6B7280]">Showing 1-{filteredAgents.length} of {activeAgents.length} agents</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Section C: Resource Allocation */}
          <section aria-hidden={false}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1F2937]">Resource Allocation</h2>
                <p className="text-sm text-[#6B7280]">Set resource limits for each agent</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={autoScaling}
                    onCheckedChange={setAutoScaling}
                    className="data-[state=checked]:bg-[#ee3224]"
                  />
                  <span className="text-sm text-[#333]">Auto-Scaling</span>
                </div>
                {advancedMode && (
                  <div className="text-xs text-[#6B7280]">
                    12 cores available | 24GB VRAM
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {resourceAllocations.map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#ee3224] flex items-center justify-center">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1F2937]">{agent.name}</h4>
                          <div className="flex items-center gap-2">
                            <StatusBadge status={agent.status} />
                            <span className="text-xs text-[#6B7280]">Using {agent.usage}% of allocated</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {advancedMode ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-[#333] w-10">CPU</span>
                          <Slider defaultValue={[agent.cpu]} max={100} step={1} className="flex-1" />
                          <span className="text-sm font-semibold text-[#ee3224] w-12 text-right">{agent.cpu}%</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-[#333] w-10">GPU</span>
                          <Slider defaultValue={[agent.gpu]} max={100} step={1} className="flex-1" />
                          <span className="text-sm font-semibold text-[#ee3224] w-12 text-right">{agent.gpu}%</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-[#333] w-10">NPU</span>
                          <Slider defaultValue={[agent.npu]} max={100} step={1} className="flex-1" />
                          <span className="text-sm font-semibold text-[#ee3224] w-12 text-right">{agent.npu}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`flex-1 ${executionMode === "balanced" ? "border-[#ee3224] text-[#ee3224]" : ""}`}
                          onClick={() => handlePresetClick("balanced")}
                        >
                          Balanced
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`flex-1 ${executionMode === "performance" ? "border-[#ee3224] text-[#ee3224]" : ""}`}
                          onClick={() => handlePresetClick("performance")}
                        >
                          Performance
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`flex-1 ${executionMode === "efficiency" ? "border-[#ee3224] text-[#ee3224]" : ""}`}
                          onClick={() => handlePresetClick("efficiency")}
                        >
                          Efficiency
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section D: Hardware Access & Permissions */}
          <section aria-hidden={false}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1F2937]">Hardware Access & Permissions</h2>
                <p className="text-sm text-[#6B7280]">Control which agents can access hardware components</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={permissionPreset} onValueChange={setPermissionPreset}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Access</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
                    {advancedMode && <SelectItem value="custom">Custom</SelectItem>}
                  </SelectContent>
                </Select>
                {advancedMode && (
                  <Button variant="outline" className="border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/10 gap-2">
                    <FileText className="h-4 w-4" />
                    Export Audit Log
                  </Button>
                )}
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F5F7FA]">
                    <TableHead className="font-semibold text-[#333]">Agent Name</TableHead>
                    <TableHead className="font-semibold text-[#333] text-center">CPU Access</TableHead>
                    <TableHead className="font-semibold text-[#333] text-center">GPU Access</TableHead>
                    {advancedMode && (
                      <TableHead className="font-semibold text-[#333] text-center">NPU Access</TableHead>
                    )}
                    {advancedMode && (
                      <>
                        <TableHead className="font-semibold text-[#333] text-center">Local Files</TableHead>
                        <TableHead className="font-semibold text-[#333] text-center">Network</TableHead>
                        <TableHead className="font-semibold text-[#333] text-center">
                          <div className="flex items-center justify-center gap-1">
                            Camera/Mic
                            <button className="text-[#ee3224] text-[10px] hover:underline">View Access Log</button>
                          </div>
                        </TableHead>
                      </>
                    )}
                    {!advancedMode && (
                      <TableHead className="font-semibold text-[#333] text-center">Network</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionData.map((agent) => (
                    <TableRow key={agent.id} className="hover:bg-[#F5F7FA] h-14">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Brain className="h-4 w-4 text-[#ee3224]" />
                          <span className="font-medium text-[#1F2937]">{agent.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={agent.cpu} className="data-[state=checked]:bg-[#ee3224]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={agent.gpu} className="data-[state=checked]:bg-[#ee3224]" />
                      </TableCell>
                      {advancedMode && (
                        <TableCell className="text-center bg-[#F5F7FA]">
                          <Switch checked={agent.npu} className="data-[state=checked]:bg-[#ee3224]" />
                        </TableCell>
                      )}
                      {advancedMode && (
                        <>
                          <TableCell className="text-center">
                            <Switch checked={agent.files} className="data-[state=checked]:bg-[#ee3224]" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={agent.network} className="data-[state=checked]:bg-[#ee3224]" />
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Switch checked={agent.camera} className="data-[state=checked]:bg-[#ee3224]" />
                              {!agent.camera && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Lock className="h-3 w-3 text-[#6B7280] cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent>Camera/Mic access restricted by admin policy</TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                        </>
                      )}
                      {!advancedMode && (
                        <TableCell className="text-center">
                          <Switch checked={agent.network} className="data-[state=checked]:bg-[#ee3224]" />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          {/* Section E: AI Optimization Insights */}
          <section aria-hidden={false}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1F2937]">AI Optimization Insights</h2>
                <p className="text-sm text-[#6B7280]">AI-powered suggestions to improve performance and efficiency</p>
              </div>
              {advancedMode && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={showAppliedInsights}
                      onCheckedChange={setShowAppliedInsights}
                      className="data-[state=checked]:bg-[#ee3224]" 
                    />
                    <span className="text-sm text-[#333]">Show Applied Insights</span>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-[#ee3224] hover:underline">
                    <History className="h-4 w-4" />
                    View History
                  </button>
                </div>
              )}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {/* Optimization Suggestion */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-12 w-12 rounded-full bg-[#F5F7FA] flex items-center justify-center">
                      <Zap className="h-6 w-6 text-[#ee3224]" />
                    </div>
                    <Badge className="bg-[#22C55E] text-white text-[10px]">High Impact</Badge>
                  </div>
                  <h4 className="font-semibold text-[#1F2937] mb-2">Optimization Suggestion</h4>
                  <p className="text-sm text-[#333] mb-2">Move &apos;Sales Agent&apos; to NPU to reduce latency by 18%</p>
                  <p className="text-xs text-[#6B7280] mb-4">
                    {advancedMode 
                      ? "NPU inference reduces CPU load by 40% while maintaining accuracy. Estimated latency improvement: 180ms → 147ms."
                      : "This will make your agent faster."}
                  </p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#ee3224] hover:bg-[#cc2a1e] h-10">Apply Suggestion</Button>
                    {advancedMode && (
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resource Conflict */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-12 w-12 rounded-full bg-[#FFFBEB] flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-[#F59E0B]" />
                    </div>
                    <Badge className="bg-[#F59E0B] text-white text-[10px]">Medium Impact</Badge>
                  </div>
                  <h4 className="font-semibold text-[#1F2937] mb-2">Resource Conflict</h4>
                  <p className="text-sm text-[#333] mb-2">2 agents competing for GPU resources</p>
                  <p className="text-xs text-[#6B7280] mb-4">
                    {advancedMode 
                      ? "Briefly AI and LocalLens AI are both requesting >40% GPU. Consider time-slicing or priority adjustment."
                      : "Some agents need the same resources."}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10 h-10">Resolve Automatically</Button>
                    {advancedMode && (
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Efficiency Tip */}
              <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-12 w-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-[#3B82F6]" />
                    </div>
                    <Badge className="bg-[#3B82F6] text-white text-[10px]">Low Impact</Badge>
                  </div>
                  <h4 className="font-semibold text-[#1F2937] mb-2">Efficiency Tip</h4>
                  <p className="text-sm text-[#333] mb-2">Idle agent consuming unnecessary CPU resources</p>
                  <p className="text-xs text-[#6B7280] mb-4">
                    {advancedMode 
                      ? "Research Assistant has been idle for 1 hour but maintaining 2% CPU. Auto-pause would save ~0.5W power."
                      : "An idle agent is using resources."}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 h-10">Auto-Pause</Button>
                    {advancedMode && (
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section F: Execution Strategy (Advanced Mode Only) */}
          <section 
            className={`transition-all duration-200 ${advancedMode ? "opacity-100" : "hidden"}`}
            aria-hidden={!advancedMode}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1F2937]">Execution Strategy</h2>
                <p className="text-sm text-[#6B7280]">Configure where and how agents execute</p>
                <p className="text-xs text-[#6B7280] italic mt-1">Local-first execution enabled. Cloud integration coming soon.</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 mb-6">
              {/* Run Locally */}
              <Card 
                className={`cursor-pointer transition-all ${executionStrategy === "local" ? "border-[#ee3224] shadow-md" : "hover:shadow-md"}`}
                onClick={() => setExecutionStrategy("local")}
              >
                <CardContent className="p-5 text-center">
                  <div className="flex justify-center mb-3">
                    <Computer className={`h-10 w-10 ${executionStrategy === "local" ? "text-[#ee3224]" : "text-[#6B7280]"}`} />
                  </div>
                  <h4 className="font-semibold text-[#1F2937] mb-1">Run Locally</h4>
                  <p className="text-sm text-[#6B7280] mb-3">All agents execute on this AI PC</p>
                  {executionStrategy === "local" && (
                    <Badge className="bg-[#22C55E] text-white">Active</Badge>
                  )}
                  <div className="mt-3 flex justify-center">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${executionStrategy === "local" ? "border-[#ee3224]" : "border-[#E5E7EB]"}`}>
                      {executionStrategy === "local" && <div className="h-3 w-3 rounded-full bg-[#ee3224]" />}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Run on Cloud */}
              <Card 
                className="cursor-pointer transition-all border-[#ee3224] shadow-md"
                onClick={() => setExecutionStrategy("cloud")}
              >
                <CardContent className="p-5 text-center">
                  <div className="flex justify-center mb-3">
                    <Cloud className="h-10 w-10 text-[#ee3224]" />
                  </div>
                  <h4 className="font-semibold text-[#1F2937] mb-1">Run on Cloud</h4>
                  <p className="text-sm text-[#6B7280] mb-3">Agents execute on cloud infrastructure</p>
                  <Badge className="bg-[#22C55E] text-white">Active</Badge>
                  <div className="mt-3 flex justify-center">
                    <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center border-[#ee3224]">
                      <div className="h-3 w-3 rounded-full bg-[#ee3224]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hybrid Mode */}
              <Card 
                className="cursor-pointer transition-all border-[#ee3224] shadow-md"
                onClick={() => setExecutionStrategy("hybrid")}
              >
                <CardContent className="p-5 text-center">
                  <div className="flex justify-center mb-3">
                    <ArrowLeftRight className="h-10 w-10 text-[#ee3224]" />
                  </div>
                  <h4 className="font-semibold text-[#1F2937] mb-1">Hybrid Mode</h4>
                  <p className="text-sm text-[#6B7280] mb-3">Smart distribution between local and cloud</p>
                  <Badge className="bg-[#22C55E] text-white">Active</Badge>
                  <div className="mt-3 flex justify-center">
                    <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center border-[#ee3224]">
                      <div className="h-3 w-3 rounded-full bg-[#ee3224]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* NPU Mode Toggle */}
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-[#333]">NPU Acceleration</h4>
                    <p className="text-xs text-[#6B7280]">Auto: NPU used when available. Force: Always prioritize NPU.</p>
                  </div>
                  <div className="flex rounded-lg overflow-hidden border border-[#E5E7EB]">
                    <button 
                      className={`px-4 py-2 text-sm font-medium transition-colors ${npuMode === "off" ? "bg-[#ee3224] text-white" : "bg-white text-[#333] hover:bg-[#F5F7FA]"}`}
                      onClick={() => setNpuMode("off")}
                    >
                      Off
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium transition-colors ${npuMode === "auto" ? "bg-[#ee3224] text-white" : "bg-white text-[#333] hover:bg-[#F5F7FA]"}`}
                      onClick={() => setNpuMode("auto")}
                    >
                      Auto
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium transition-colors ${npuMode === "force" ? "bg-[#ee3224] text-white" : "bg-white text-[#333] hover:bg-[#F5F7FA]"}`}
                      onClick={() => setNpuMode("force")}
                    >
                      Force Acceleration
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
            </div>
          </div>
        </>
      </TooltipProvider>
    </AppLayout>
  )
}
