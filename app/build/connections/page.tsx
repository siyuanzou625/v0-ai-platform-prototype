"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Link2,
  Plus,
  LayoutGrid,
  List,
  MoreHorizontal,
  ExternalLink,
  Trash2,
  Edit,
  Play,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  Download,
  Key,
  Shield,
  Users,
  Settings,
  FileText,
  Activity,
  AlertTriangle,
  Upload,
  Lock,
  Filter,
  User,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Provider icons mapping
const providerIcons: Record<string, string> = {
  "google-workspace": "https://www.gstatic.com/images/branding/product/2x/hh_drive_96dp.png",
  "slack": "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png",
  "salesforce": "https://c1.sfdcstatic.com/content/dam/sfdc-docs/www/logos/logo-salesforce.svg",
  "snowflake": "https://www.snowflake.com/wp-content/themes/snowflake/assets/img/brand-guidelines/logo-sno-blue-example.svg",
  "github": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  "notion": "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  "custom-webhook": "",
  "postgresql": "https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg",
}

// Mock connections data
const connections = [
  {
    id: "conn-001",
    provider: "google-workspace",
    displayName: "Google Workspace - Prod",
    type: "oauth2",
    status: "connected",
    environment: "production",
    scopes: ["gmail.readonly", "calendar.events.write", "drive.read"],
    lastUsed: "2 hours ago",
    usedByWorkflows: 3,
    health: { uptime: 99.8, errorRate: 0.02, lastCheck: "2025-03-12T08:00:00Z" },
    created: "Jan 15, 2025",
    createdBy: "John Doe",
  },
  {
    id: "conn-002",
    provider: "slack",
    displayName: "Slack Bot - Dev",
    type: "oauth2",
    status: "connected",
    environment: "development",
    scopes: ["chat:write", "channels:read"],
    lastUsed: "30 minutes ago",
    usedByWorkflows: 1,
    health: { uptime: 100, errorRate: 0, lastCheck: "2025-03-12T16:00:00Z" },
    created: "Feb 1, 2025",
    createdBy: "Jane Smith",
  },
  {
    id: "conn-003",
    provider: "salesforce",
    displayName: "Salesforce - Staging",
    type: "api-key",
    status: "expired",
    environment: "staging",
    scopes: ["lead.read", "opportunity.write"],
    lastUsed: "2 weeks ago",
    usedByWorkflows: 2,
    health: { uptime: 0, errorRate: 1.0, lastCheck: "2025-03-12T08:00:00Z" },
    created: "Dec 20, 2024",
    createdBy: "John Doe",
  },
  {
    id: "conn-004",
    provider: "snowflake",
    displayName: "Snowflake Database",
    type: "database",
    status: "connected",
    environment: "production",
    scopes: ["read", "write"],
    lastUsed: "5 hours ago",
    usedByWorkflows: 4,
    health: { uptime: 99.9, errorRate: 0.01, lastCheck: "2025-03-12T15:00:00Z" },
    created: "Jan 10, 2025",
    createdBy: "Admin",
  },
  {
    id: "conn-005",
    provider: "github",
    displayName: "GitHub API",
    type: "api-key",
    status: "connected",
    environment: "development",
    scopes: ["repo", "workflow"],
    lastUsed: "1 day ago",
    usedByWorkflows: 2,
    health: { uptime: 99.5, errorRate: 0.05, lastCheck: "2025-03-12T12:00:00Z" },
    created: "Feb 5, 2025",
    createdBy: "Jane Smith",
  },
  {
    id: "conn-006",
    provider: "notion",
    displayName: "Notion Integration",
    type: "oauth2",
    status: "warning",
    environment: "production",
    scopes: ["read", "write"],
    lastUsed: "3 days ago",
    usedByWorkflows: 1,
    health: { uptime: 98.2, errorRate: 0.15, lastCheck: "2025-03-12T10:00:00Z" },
    created: "Feb 20, 2025",
    createdBy: "John Doe",
  },
  {
    id: "conn-007",
    provider: "custom-webhook",
    displayName: "Custom Webhook - Payments",
    type: "webhook",
    status: "connected",
    environment: "production",
    scopes: ["post"],
    lastUsed: "1 hour ago",
    usedByWorkflows: 3,
    health: { uptime: 99.7, errorRate: 0.03, lastCheck: "2025-03-12T15:00:00Z" },
    created: "Mar 1, 2025",
    createdBy: "Admin",
  },
  {
    id: "conn-008",
    provider: "postgresql",
    displayName: "PostgreSQL - Analytics",
    type: "database",
    status: "error",
    environment: "staging",
    scopes: ["read"],
    lastUsed: "1 week ago",
    usedByWorkflows: 1,
    health: { uptime: 0, errorRate: 1.0, lastCheck: "2025-03-12T08:00:00Z" },
    created: "Feb 15, 2025",
    createdBy: "Jane Smith",
  },
]

// Mock usage logs
const usageLogs = [
  { timestamp: "2025-03-12T16:45:00Z", eventType: "API Call", status: "success", details: "GET /api/calendar/events", workflow: "Daily Standup Bot" },
  { timestamp: "2025-03-12T16:30:00Z", eventType: "API Call", status: "success", details: "POST /api/mail/send", workflow: "Email Notifier" },
  { timestamp: "2025-03-12T16:15:00Z", eventType: "Authentication", status: "success", details: "Token refresh completed", workflow: "System" },
  { timestamp: "2025-03-12T15:00:00Z", eventType: "API Call", status: "error", details: "Rate limit exceeded", workflow: "Data Sync Agent" },
  { timestamp: "2025-03-12T14:30:00Z", eventType: "API Call", status: "success", details: "GET /api/drive/files", workflow: "File Monitor" },
]

// Mock audit log data
const auditLogData = [
  { id: "audit-001", timestamp: "2025-03-12T14:30:00Z", event: "Credential Used", user: "Zoey Doyle", userInitials: "ZD", project: "Enterprise Sales Agent", ipAddress: "192.168.1.100", status: "success" },
  { id: "audit-002", timestamp: "2025-03-12T11:00:00Z", event: "Credential Used", user: "Alex Chen", userInitials: "AC", project: "Customer Support Bot", ipAddress: "192.168.1.105", status: "success" },
  { id: "audit-003", timestamp: "2025-03-11T16:15:00Z", event: "Config Updated", user: "Zoey Doyle", userInitials: "ZD", project: "-", ipAddress: "192.168.1.100", status: "success" },
  { id: "audit-004", timestamp: "2025-03-10T09:00:00Z", event: "Credential Used", user: "Zoey Doyle", userInitials: "ZD", project: "Enterprise Sales Agent", ipAddress: "192.168.1.100", status: "success" },
  { id: "audit-005", timestamp: "2025-03-09T15:00:00Z", event: "Test Connection", user: "Alex Chen", userInitials: "AC", project: "-", ipAddress: "192.168.1.105", status: "success" },
  { id: "audit-006", timestamp: "2025-03-08T10:30:00Z", event: "Access Granted", user: "Zoey Doyle", userInitials: "ZD", project: "-", ipAddress: "192.168.1.100", status: "success" },
  { id: "audit-007", timestamp: "2025-03-07T14:15:00Z", event: "Credential Used", user: "Sarah Kim", userInitials: "SK", project: "Data Pipeline v2", ipAddress: "192.168.1.110", status: "rate_limited" },
  { id: "audit-008", timestamp: "2025-03-06T11:00:00Z", event: "Config Updated", user: "Zoey Doyle", userInitials: "ZD", project: "-", ipAddress: "192.168.1.100", status: "success" },
  { id: "audit-009", timestamp: "2025-03-05T09:45:00Z", event: "Credential Used", user: "Alex Chen", userInitials: "AC", project: "Enterprise Sales Agent", ipAddress: "192.168.1.105", status: "failed" },
  { id: "audit-010", timestamp: "2025-03-04T15:30:00Z", event: "Access Revoked", user: "Zoey Doyle", userInitials: "ZD", project: "-", ipAddress: "192.168.1.100", status: "success" },
]

// Popular providers for create modal
const popularProviders = [
  { id: "google-workspace", name: "Google Workspace", icon: "G" },
  { id: "microsoft-365", name: "Microsoft 365", icon: "M" },
  { id: "slack", name: "Slack", icon: "S" },
  { id: "salesforce", name: "Salesforce", icon: "SF" },
  { id: "github", name: "GitHub", icon: "GH" },
  { id: "notion", name: "Notion", icon: "N" },
  { id: "zoom", name: "Zoom", icon: "Z" },
  { id: "snowflake", name: "Snowflake", icon: "SF" },
  { id: "postgresql", name: "PostgreSQL", icon: "PG" },
  { id: "mongodb", name: "MongoDB", icon: "MG" },
  { id: "custom-webhook", name: "Custom API/Webhook", icon: "+" },
]

export default function ConnectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedConnections, setSelectedConnections] = useState<string[]>([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedConnection, setSelectedConnection] = useState<typeof connections[0] | null>(null)
  const [detailTab, setDetailTab] = useState("overview")
  const [createStep, setCreateStep] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [authMethod, setAuthMethod] = useState("oauth2")
  const [testResult, setTestResult] = useState<"idle" | "testing" | "success" | "failure">("idle")

  // Filter connections
  const filteredConnections = connections.filter((conn) => {
    const matchesSearch = conn.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.provider.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || conn.status === statusFilter
    const matchesType = typeFilter === "all" || conn.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-green-500"
      case "warning": return "bg-orange-500"
      case "expired": return "bg-red-500"
      case "error": return "bg-red-500"
      default: return "bg-gray-400"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "connected": return "default"
      case "warning": return "secondary"
      case "expired": return "destructive"
      case "error": return "destructive"
      default: return "outline"
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "oauth2": return "OAuth 2.0"
      case "api-key": return "API Key"
      case "webhook": return "Webhook"
      case "database": return "Database"
      default: return type
    }
  }

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "production": return "bg-green-100 text-green-800"
      case "staging": return "bg-orange-100 text-orange-800"
      case "development": return "bg-slate-100 text-slate-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleTestConnection = () => {
    setTestResult("testing")
    setTimeout(() => {
      setTestResult(Math.random() > 0.3 ? "success" : "failure")
    }, 2000)
  }

  const openDetailView = (conn: typeof connections[0]) => {
    setSelectedConnection(conn)
    setDetailTab("overview")
    setDetailModalOpen(true)
  }

  return (
    <AppLayout>
      <>
        {/* Page Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-[#ee3224]" />
                <h1 className="text-2xl font-semibold text-foreground">Connections</h1>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                Securely connect your favorite tools and services to power your workflows.
              </p>
            </div>
            <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => { setCreateModalOpen(true); setCreateStep(1); setSelectedProvider(null); }}>
              <Plus className="h-4 w-4" />
              New Connection
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-[#E5E7EB]">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search connections..."
                className="pl-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                <SelectItem value="api-key">API Key</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="database">Database</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center rounded-lg border border-[#E5E7EB] bg-white p-1 ml-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                  viewMode === "grid"
                    ? "bg-[#ee3224] text-white shadow-sm"
                    : "bg-white text-[#333] hover:bg-[#F5F7FA]"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                  viewMode === "list"
                    ? "bg-[#ee3224] text-white shadow-sm"
                    : "bg-white text-[#333] hover:bg-[#F5F7FA]"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-[#F5F7FA]">
          <div className="p-6 space-y-6">
        {/* Connection Count */}
        <div className="text-sm text-muted-foreground">
          {filteredConnections.length} connection{filteredConnections.length !== 1 ? "s" : ""}
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.map((conn) => (
              <Card
                key={conn.id}
                className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
                onClick={() => openDetailView(conn)}
              >
                <CardContent className="py-2.5 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-100 text-sm font-semibold text-slate-600">
                        {conn.provider === "custom-webhook" ? (
                          <Link2 className="h-4 w-4 text-slate-600" />
                        ) : (
                          conn.provider.charAt(0).toUpperCase()
                        )}
                      </div>
                      <h3 className="card-title-text font-medium text-foreground transition-colors duration-150">{conn.displayName}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(conn.status)}`} />
                      <span className="text-xs text-muted-foreground capitalize">{conn.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{getTypeBadge(conn.type)}</Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F5F7FA] text-[#6B7280]">
                            <Lock className="h-3 w-3" />
                            <span className="text-[11px]">Never in Git</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Credentials are encrypted and never synced to version control</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {conn.lastUsed}
                    </span>
                    <span>{conn.usedByWorkflows} workflow{conn.usedByWorkflows !== 1 ? "s" : ""} · {conn.scopes.length} permission{conn.scopes.length !== 1 ? "s" : ""}</span>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedConnections.length === filteredConnections.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedConnections(filteredConnections.map(c => c.id))
                        } else {
                          setSelectedConnections([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Connection</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Used By</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConnections.map((conn) => (
                  <TableRow
                    key={conn.id}
                    className="cursor-pointer hover:bg-[#F5F7FA]"
                    onClick={() => openDetailView(conn)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedConnections.includes(conn.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedConnections([...selectedConnections, conn.id])
                          } else {
                            setSelectedConnections(selectedConnections.filter(id => id !== conn.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                          {conn.provider.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{conn.displayName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{getTypeBadge(conn.type)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(conn.status)}`} />
                        <span className="text-sm capitalize">{conn.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F5F7FA] text-[#6B7280]">
                              <Lock className="h-3 w-3" />
                              <span className="text-[11px]">Never in Git</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Credentials are encrypted and never synced to version control</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getEnvironmentColor(conn.environment)}`}>
                        {conn.environment.charAt(0).toUpperCase() + conn.environment.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{conn.lastUsed}</TableCell>
                    <TableCell className="text-muted-foreground">{conn.usedByWorkflows} workflow{conn.usedByWorkflows !== 1 ? "s" : ""}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleTestConnection()}>
                            <Play className="h-4 w-4 mr-2" />
                            Test Connection
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDetailView(conn)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDetailView(conn)}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-[#ee3224]">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Revoke
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Empty State */}
        {filteredConnections.length === 0 && (
          <Card className="py-16">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Link2 className="h-8 w-8 text-[#C0C6CA]" />
              </div>
              <h3 className="text-lg font-medium mb-1">No connections found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Connect your favorite tools to power your AI agents and workflows"}
              </p>
              <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-4 w-4" />
                New Connection
              </Button>
            </div>
          </Card>
        )}

        {/* Create Connection Modal */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Create New Connection</DialogTitle>
            </DialogHeader>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-2 py-4 border-b">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      createStep >= step
                        ? "bg-[#ee3224] text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-8 h-0.5 mx-1 ${createStep > step ? "bg-[#ee3224]" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>

            <ScrollArea className="flex-1 pr-4">
              {/* Step 1: Select Provider */}
              {createStep === 1 && (
                <div className="space-y-4 py-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search providers..." className="pl-10" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {popularProviders.map((provider) => (
                      <Card
                        key={provider.id}
                        className={`cursor-pointer p-4 transition-all duration-150 ease-out border border-[#E5E7EB] bg-white hover:border-[#ee3224] hover:shadow-md hover:-translate-y-0.5 ${
                          selectedProvider === provider.id ? "border-[#ee3224] bg-[#F5F7FA]" : ""
                        }`}
                        onClick={() => setSelectedProvider(provider.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded bg-muted font-semibold">
                            {provider.icon}
                          </div>
                          <span className="text-sm font-medium">{provider.name}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Authentication Method */}
              {createStep === 2 && (
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    {[
                      { value: "oauth2", label: "OAuth 2.0", description: "Recommended for most integrations" },
                      { value: "api-key", label: "API Key", description: "Simple key-based authentication" },
                      { value: "service-account", label: "Service Account JSON", description: "For Google Cloud services" },
                      { value: "basic", label: "Basic Auth", description: "Username and password authentication" },
                      { value: "webhook", label: "Webhook", description: "For custom API endpoints" },
                    ].map((method) => (
                      <Card
                        key={method.value}
                        className={`cursor-pointer p-4 transition-all duration-150 ease-out border border-[#E5E7EB] bg-white hover:border-[#ee3224] hover:shadow-md hover:-translate-y-0.5 ${
                          authMethod === method.value ? "border-[#ee3224] bg-[#F5F7FA]" : ""
                        }`}
                        onClick={() => setAuthMethod(method.value)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-4 w-4 rounded-full border-2 ${
                            authMethod === method.value ? "border-[#ee3224] bg-[#ee3224]" : "border-muted-foreground"
                          }`}>
                            {authMethod === method.value && (
                              <div className="h-full w-full flex items-center justify-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Dynamic fields based on auth method */}
                  <div className="space-y-4 pt-4 border-t">
                    {authMethod === "oauth2" && (
                      <>
                        <div className="space-y-2">
                          <Label>Client ID</Label>
                          <Input placeholder="Enter client ID" />
                        </div>
                        <div className="space-y-2">
                          <Label>Client Secret</Label>
                          <Input type="password" placeholder="Enter client secret" />
                        </div>
                        <div className="space-y-2">
                          <Label>Redirect URI</Label>
                          <Input value="https://platform.example.com/oauth/callback" readOnly className="bg-muted" />
                        </div>
                      </>
                    )}
                    {authMethod === "api-key" && (
                      <>
                        <div className="space-y-2">
                          <Label>API Key</Label>
                          <Input type="password" placeholder="Enter API key" />
                        </div>
                        <div className="space-y-2">
                          <Label>Key Name/Label</Label>
                          <Input placeholder="e.g., Production API Key" />
                        </div>
                      </>
                    )}
                    {authMethod === "service-account" && (
                      <div className="space-y-2">
                        <Label>Service Account JSON</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Drop JSON file here or click to upload</p>
                        </div>
                      </div>
                    )}
                    {authMethod === "basic" && (
                      <>
                        <div className="space-y-2">
                          <Label>Username</Label>
                          <Input placeholder="Enter username" />
                        </div>
                        <div className="space-y-2">
                          <Label>Password</Label>
                          <Input type="password" placeholder="Enter password" />
                        </div>
                      </>
                    )}
                    {authMethod === "webhook" && (
                      <>
                        <div className="space-y-2">
                          <Label>Webhook URL</Label>
                          <Input placeholder="https://api.example.com/webhook" />
                        </div>
                        <div className="space-y-2">
                          <Label>Method</Label>
                          <Select defaultValue="POST">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GET">GET</SelectItem>
                              <SelectItem value="POST">POST</SelectItem>
                              <SelectItem value="PUT">PUT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Configuration & Scopes */}
              {createStep === 3 && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Connection Alias *</Label>
                    <Input placeholder="e.g., Prod Slack Bot" />
                  </div>
                  <div className="space-y-2">
                    <Label>Environment *</Label>
                    <Select defaultValue="development">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description (optional)</Label>
                    <Textarea placeholder="Internal notes and team context..." />
                  </div>
                  {authMethod === "oauth2" && (
                    <div className="space-y-2">
                      <Label>Scopes/Permissions</Label>
                      <div className="space-y-2 border rounded-lg p-4">
                        {["Read emails", "Send emails", "Read calendar", "Write calendar", "Access Drive"].map((scope) => (
                          <div key={scope} className="flex items-center gap-2">
                            <Checkbox id={scope} />
                            <label htmlFor={scope} className="text-sm">{scope}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Testing */}
              {createStep === 4 && (
                <div className="space-y-4 py-4">
                  <div className="text-center py-8">
                    <Button
                      variant="outline"
                      className="gap-2 border-[#ee3224] text-[#ee3224] hover:bg-[#F5F7FA]"
                      onClick={handleTestConnection}
                      disabled={testResult === "testing"}
                    >
                      {testResult === "testing" ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      Test Connection
                    </Button>
                  </div>
                  {testResult === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Connection validated</p>
                        <p className="text-sm text-green-700">Successfully connected to the service</p>
                      </div>
                    </div>
                  )}
                  {testResult === "failure" && (
                    <div className="flex items-center gap-3 p-4 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg">
                      <XCircle className="h-5 w-5 text-[#ee3224]" />
                      <div className="flex-1">
                        <p className="font-medium text-[#333]">Connection failed</p>
                        <p className="text-sm text-[#6B7280]">Invalid credentials or service unavailable</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleTestConnection}>Retry</Button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Governance */}
              {createStep === 5 && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Compliance Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {["PII", "PCI", "HIPAA", "Confidential", "Public", "Internal"].map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Who can use this connection?</Label>
                    <Select defaultValue="me">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="me">Only me</SelectItem>
                        <SelectItem value="team">Specific team members</SelectItem>
                        <SelectItem value="org">Entire organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Audit Logging</p>
                      <p className="text-sm text-muted-foreground">Log all usage of this connection</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Data Residency</Label>
                    <Select defaultValue="us-east">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-east">US-East</SelectItem>
                        <SelectItem value="eu-west">EU-West</SelectItem>
                        <SelectItem value="apac-singapore">APAC-Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </ScrollArea>

            <DialogFooter className="border-t pt-4">
              <Button variant="ghost" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
              <div className="flex gap-2">
                {createStep > 1 && (
                  <Button variant="outline" onClick={() => setCreateStep(createStep - 1)}>Previous</Button>
                )}
                {createStep < 5 ? (
                  <Button
                    className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                    onClick={() => setCreateStep(createStep + 1)}
                    disabled={createStep === 1 && !selectedProvider}
                  >
                    Next
                  </Button>
                ) : (
                  <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => setCreateModalOpen(false)}>
                    Save Connection
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Connection Detail Modal */}
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="max-w-[900px] w-[95vw] min-w-[600px] max-h-[90vh] h-[85vh] flex flex-col p-0 overflow-hidden" aria-describedby={undefined}>
            <DialogTitle className="sr-only">Connection Details</DialogTitle>
            <DialogDescription className="sr-only">View and manage connection settings, usage, and logs</DialogDescription>
            {selectedConnection && (
              <>
                {/* Header */}
                <div className="p-6 border-b flex-shrink-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4 min-w-0">
                      <Button variant="ghost" size="icon" onClick={() => setDetailModalOpen(false)} className="flex-shrink-0">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-semibold flex-shrink-0">
                        {selectedConnection.provider.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <span className="truncate">{selectedConnection.displayName}</span>
                          <Edit className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground flex-shrink-0" />
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getStatusBadgeVariant(selectedConnection.status)} className="capitalize">
                            {selectedConnection.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">Last checked: 5 min ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#ee3224] text-[#ee3224] hover:bg-[#F5F7FA]">
                        <Play className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button variant="outline" size="sm" className="text-[#ee3224] hover:bg-[#F5F7FA]">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={detailTab} onValueChange={setDetailTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  <TabsList className="px-6 border-b rounded-none justify-start h-auto py-0 bg-transparent flex-shrink-0">
<TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Overview</TabsTrigger>
  <TabsTrigger value="usage" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Usage</TabsTrigger>
  <TabsTrigger value="audit" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Audit Log</TabsTrigger>
  <TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Settings</TabsTrigger>
  </TabsList>

                  <div className="flex-1 overflow-auto min-h-0 w-full">
                    <TabsContent value="overview" className="p-6 m-0 space-y-6 w-full">
                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-3">
                        <Card className="flex-1 min-w-[140px]">
                          <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Total Uses</p>
                            <p className="text-xl font-semibold mt-0.5">1,247</p>
                          </CardContent>
                        </Card>
                        <Card className="flex-1 min-w-[140px]">
                          <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Uses (7d)</p>
                            <p className="text-xl font-semibold mt-0.5">328</p>
                          </CardContent>
                        </Card>
                        <Card className="flex-1 min-w-[140px]">
                          <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Last Success</p>
                            <p className="text-xl font-semibold mt-0.5">2h ago</p>
                          </CardContent>
                        </Card>
                        <Card className="flex-1 min-w-[140px]">
                          <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Errors (7d)</p>
                            <p className="text-xl font-semibold text-green-600 mt-0.5">3</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Connection Meta */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-sm font-semibold">Connection Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2.5 px-4 pb-4 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Provider</span>
                              <span className="font-medium capitalize">{selectedConnection.provider.replace("-", " ")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Auth Method</span>
                              <span className="font-medium">{getTypeBadge(selectedConnection.type)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Environment</span>
                              <Badge className={`text-xs ${getEnvironmentColor(selectedConnection.environment)}`}>
                                {selectedConnection.environment}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Created</span>
                              <span className="font-medium">{selectedConnection.created}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Created By</span>
                              <span className="font-medium">{selectedConnection.createdBy}</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-sm font-semibold">Health Status</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2.5 px-4 pb-4 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Uptime (7d)</span>
                              <span className="font-medium text-green-600">{selectedConnection.health.uptime}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Error Rate (7d)</span>
                              <span className="font-medium">{(selectedConnection.health.errorRate * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Last Health Check</span>
                              <span className="font-medium">5 min ago</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Scopes */}
                      <Card>
                        <CardHeader className="flex-row items-center justify-between">
                          <CardTitle className="text-sm">Permissions/Scopes</CardTitle>
                          <Button variant="outline" size="sm">Modify Scopes</Button>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {selectedConnection.scopes.map((scope) => (
                              <Badge key={scope} variant="outline">{scope}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="usage" className="p-6 m-0 space-y-6 min-w-0">
                      {/* Workflows Using This Connection */}
                      <Card className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Workflows Using This Connection</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                              <thead className="border-b bg-muted/50">
                                <tr>
                                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Workflow Name</th>
                                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Project</th>
                                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Owner</th>
                                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Last Used</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="px-4 py-3 text-sm font-medium">Daily Standup Bot</td>
                                  <td className="px-4 py-3 text-sm">Team Automation</td>
                                  <td className="px-4 py-3 text-sm">John Doe</td>
                                  <td className="px-4 py-3 text-sm">2 hours ago</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="px-4 py-3 text-sm font-medium">Email Notifier</td>
                                  <td className="px-4 py-3 text-sm">Notifications</td>
                                  <td className="px-4 py-3 text-sm">Jane Smith</td>
                                  <td className="px-4 py-3 text-sm">1 day ago</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium">Data Sync Agent</td>
                                  <td className="px-4 py-3 text-sm">Data Pipeline</td>
                                  <td className="px-4 py-3 text-sm">Admin</td>
                                  <td className="px-4 py-3 text-sm">3 hours ago</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Rate Limit Status */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Rate Limit Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between text-sm gap-4">
                            <span className="text-muted-foreground">Current Usage</span>
                            <span className="font-medium">847 / 1,000 requests/hour</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: "84.7%" }} />
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                            <span className="text-sm text-orange-800">Approaching rate limit (84.7% used)</span>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="audit" className="p-6 m-0 space-y-4 min-w-0">
                      {/* Audit Log Header */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-[#1F2937]" />
                          <h3 className="text-base font-semibold text-[#1F2937]">Audit Log</h3>
                        </div>
                        <p className="text-sm text-[#6B7280]">All credential access is logged for compliance (SOC2, GDPR)</p>
                      </div>

                      {/* Filter Bar */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-36">
                            <SelectValue placeholder="Event Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="credential_used">Credential Used</SelectItem>
                            <SelectItem value="config_updated">Config Updated</SelectItem>
                            <SelectItem value="test_connection">Test Connection</SelectItem>
                            <SelectItem value="access_granted">Access Granted</SelectItem>
                            <SelectItem value="access_revoked">Access Revoked</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="7d">
                          <SelectTrigger className="w-36">
                            <SelectValue placeholder="Date Range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24h">Last 24 Hours</SelectItem>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="User" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="zoey">Zoey Doyle</SelectItem>
                            <SelectItem value="alex">Alex Chen</SelectItem>
                            <SelectItem value="sarah">Sarah Kim</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative flex-1 min-w-[200px]">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input placeholder="Search by project or IP..." className="pl-9" />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 border-[#ee3224] text-[#ee3224]">
                          <Download className="h-4 w-4" />
                          Export Audit Log (CSV)
                        </Button>
                      </div>

                      {/* Audit Log Table */}
                      <Card className="overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[950px]">
                            <thead className="border-b bg-muted/50">
                              <tr>
                                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 w-[160px]">Timestamp</th>
                                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 w-[140px]">Event</th>
                                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 w-[150px]">User</th>
                                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 w-[180px]">Project</th>
                                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 w-[140px]">IP Address</th>
                                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 w-[100px]">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {auditLogData.map((log) => (
                                <tr key={log.id} className="border-b last:border-0 hover:bg-[#F5F7FA] cursor-pointer">
                                  <td className="px-4 py-3 text-sm text-muted-foreground">
                                    {new Date(log.timestamp).toLocaleDateString("en-US", { 
                                      month: "short", 
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "2-digit"
                                    })}
                                  </td>
                                  <td className="px-4 py-3">
                                    <Badge variant="outline" className="text-xs font-normal">
                                      {log.event}
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-[10px] bg-muted">
                                          {log.userInitials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm">{log.user}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    {log.project !== "-" ? (
                                      <span className="text-[#ee3224] hover:underline cursor-pointer">{log.project}</span>
                                    ) : (
                                      <span className="text-muted-foreground">-</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{log.ipAddress}</td>
                                  <td className="px-4 py-3">
                                    <Badge 
                                      variant={log.status === "success" ? "default" : log.status === "rate_limited" ? "secondary" : "destructive"}
                                      className={log.status === "success" ? "bg-green-500" : log.status === "rate_limited" ? "bg-orange-500 text-white" : ""}
                                    >
                                      {log.status === "success" ? "Success" : log.status === "rate_limited" ? "Rate Limited" : "Failed"}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card>

                      {/* Compliance Notice */}
                      <div className="rounded-lg bg-[#F5F7FA] border border-[#E5E7EB] p-4">
                        <div className="flex gap-3">
                          <Shield className="h-4 w-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-[#6B7280]">
                            All credential access is logged for compliance (SOC2, GDPR). Credentials are encrypted at rest (AES-256) and never synced to Git. Logs retained for 90 days.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="p-6 m-0 space-y-6 pb-10 min-w-0">
                      {/* Credentials */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            Credentials
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Rotate Credentials</p>
                              <p className="text-sm text-muted-foreground">Last rotated: 45 days ago</p>
                            </div>
                            <Button variant="outline" className="border-[#ee3224] text-[#ee3224]">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Rotate
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Access Control */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Access Control
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Current Access</p>
                              <p className="text-sm text-muted-foreground">Only me</p>
                            </div>
                            <Button variant="outline" size="sm">Modify Access</Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Compliance */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Compliance Tags
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <Badge variant="outline">Internal</Badge>
                              <Badge variant="outline">PII</Badge>
                            </div>
                            <Button variant="outline" size="sm">Edit Tags</Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Audit Logging */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Audit Logging</p>
                              <p className="text-sm text-muted-foreground">Log all usage of this connection</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Danger Zone */}
                      <Card className="border-[#ee3224]">
                        <CardHeader>
                          <CardTitle className="text-sm text-[#ee3224]">Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Delete Connection</p>
                              <p className="text-sm text-muted-foreground">
                                This will break {selectedConnection.usedByWorkflows} workflow{selectedConnection.usedByWorkflows !== 1 ? "s" : ""} using this connection
                              </p>
                            </div>
                            <Button variant="destructive">Delete Connection</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
          </div>
        </div>
      </>
    </AppLayout>
  )
}
