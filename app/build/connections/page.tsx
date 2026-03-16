"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
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
} from "lucide-react"
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
      case "development": return "bg-blue-100 text-blue-800"
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
      <div className="flex flex-col gap-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Connections</h1>
            </div>
            <p className="mt-2 text-sm text-[#6B7280] max-w-[600px]">
              Securely connect your favorite tools and services to power your workflows.
            </p>
          </div>
          <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => { setCreateModalOpen(true); setCreateStep(1); setSelectedProvider(null); }}>
            <Plus className="h-4 w-4" />
            New Connection
          </Button>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search connections..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
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
              <SelectTrigger className="w-36">
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
            <div className="flex items-center gap-1 border rounded-md">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

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
                className="cursor-pointer transition-all hover:shadow-md hover:border-[#ee3224]"
                onClick={() => openDetailView(conn)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-semibold">
                        {conn.provider === "custom-webhook" ? (
                          <Link2 className="h-6 w-6 text-muted-foreground" />
                        ) : (
                          conn.provider.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{conn.displayName}</h3>
                        <div className={`h-2 w-2 rounded-full inline-block mr-1.5 ${getStatusColor(conn.status)}`} />
                        <span className="text-xs text-muted-foreground capitalize">{conn.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{getTypeBadge(conn.type)}</Badge>
                    <Badge className={`text-xs ${getEnvironmentColor(conn.environment)}`}>
                      {conn.environment.charAt(0).toUpperCase() + conn.environment.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {conn.lastUsed}
                    </span>
                    <span>{conn.usedByWorkflows} workflow{conn.usedByWorkflows !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {conn.scopes.length} permission{conn.scopes.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                    <Button variant="ghost" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); handleTestConnection(); }}>
                      <Play className="h-3 w-3 mr-1" />
                      Test
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); openDetailView(conn); }}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#ee3224] hover:text-[#ee3224] hover:bg-red-50" onClick={(e) => e.stopPropagation()}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
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
          <DialogContent className="max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col">
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
                  <div className="grid grid-cols-3 gap-3">
                    {popularProviders.map((provider) => (
                      <Card
                        key={provider.id}
                        className={`cursor-pointer p-4 transition-all hover:border-[#ee3224] ${
                          selectedProvider === provider.id ? "border-[#ee3224] bg-red-50" : ""
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
                        className={`cursor-pointer p-4 transition-all hover:border-[#ee3224] ${
                          authMethod === method.value ? "border-[#ee3224] bg-red-50" : ""
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
                      className="gap-2 border-[#ee3224] text-[#ee3224] hover:bg-red-50"
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
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <div className="flex-1">
                        <p className="font-medium text-red-800">Connection failed</p>
                        <p className="text-sm text-red-700">Invalid credentials or service unavailable</p>
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
          <DialogContent className="max-w-[1200px] w-[95vw] max-h-[90vh] h-[85vh] overflow-hidden flex flex-col p-0">
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
                      <Button variant="outline" size="sm" className="border-[#ee3224] text-[#ee3224] hover:bg-red-50">
                        <Play className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button variant="outline" size="sm" className="text-[#ee3224] hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={detailTab} onValueChange={setDetailTab} className="flex-1 flex flex-col overflow-hidden">
                  <TabsList className="px-6 border-b rounded-none justify-start h-auto py-0 bg-transparent">
                    <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Overview</TabsTrigger>
                    <TabsTrigger value="usage" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Usage</TabsTrigger>
                    <TabsTrigger value="logs" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Logs</TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none py-3">Settings</TabsTrigger>
                  </TabsList>

                  <ScrollArea className="flex-1 h-full">
                    <TabsContent value="overview" className="p-6 m-0 space-y-6">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Total Uses</p>
                            <p className="text-2xl font-semibold">1,247</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Uses (7d)</p>
                            <p className="text-2xl font-semibold">328</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Last Success</p>
                            <p className="text-2xl font-semibold">2h ago</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Errors (7d)</p>
                            <p className="text-2xl font-semibold text-green-600">3</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Connection Meta */}
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Connection Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Provider</span>
                              <span className="font-medium capitalize">{selectedConnection.provider.replace("-", " ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Auth Method</span>
                              <span className="font-medium">{getTypeBadge(selectedConnection.type)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Environment</span>
                              <Badge className={getEnvironmentColor(selectedConnection.environment)}>
                                {selectedConnection.environment}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Created</span>
                              <span className="font-medium">{selectedConnection.created}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Created By</span>
                              <span className="font-medium">{selectedConnection.createdBy}</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Health Status</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Uptime (7d)</span>
                              <span className="font-medium text-green-600">{selectedConnection.health.uptime}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Error Rate (7d)</span>
                              <span className="font-medium">{(selectedConnection.health.errorRate * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
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

                    <TabsContent value="usage" className="p-6 m-0 space-y-6">
                      {/* Workflows Using This Connection */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Workflows Using This Connection</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-x-auto">
                          <Table className="min-w-[500px]">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="whitespace-nowrap">Workflow Name</TableHead>
                                <TableHead className="whitespace-nowrap">Project</TableHead>
                                <TableHead className="whitespace-nowrap">Owner</TableHead>
                                <TableHead className="whitespace-nowrap">Last Used</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Daily Standup Bot</TableCell>
                                <TableCell className="whitespace-nowrap">Team Automation</TableCell>
                                <TableCell className="whitespace-nowrap">John Doe</TableCell>
                                <TableCell className="whitespace-nowrap">2 hours ago</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Email Notifier</TableCell>
                                <TableCell className="whitespace-nowrap">Notifications</TableCell>
                                <TableCell className="whitespace-nowrap">Jane Smith</TableCell>
                                <TableCell className="whitespace-nowrap">1 day ago</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Data Sync Agent</TableCell>
                                <TableCell className="whitespace-nowrap">Data Pipeline</TableCell>
                                <TableCell className="whitespace-nowrap">Admin</TableCell>
                                <TableCell className="whitespace-nowrap">3 hours ago</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      {/* Rate Limit Status */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Rate Limit Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Usage</span>
                            <span className="font-medium">847 / 1,000 requests/hour</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: "84.7%" }} />
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <span className="text-sm text-orange-800">Approaching rate limit (84.7% used)</span>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="logs" className="p-6 m-0 space-y-4">
                      {/* Filter Bar */}
                      <div className="flex items-center gap-4">
                        <Select defaultValue="24h">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24h">Last 24 hours</SelectItem>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="auth">Authentication</SelectItem>
                            <SelectItem value="api">API Call</SelectItem>
                            <SelectItem value="error">Error</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex-1" />
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export Logs
                        </Button>
                      </div>

                      {/* Logs Table */}
                      <Card className="overflow-hidden">
                        <div className="overflow-x-auto">
                        <Table className="min-w-[800px]">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="whitespace-nowrap">Timestamp</TableHead>
                              <TableHead className="whitespace-nowrap">Event Type</TableHead>
                              <TableHead className="whitespace-nowrap">Status</TableHead>
                              <TableHead className="whitespace-nowrap min-w-[200px]">Details</TableHead>
                              <TableHead className="whitespace-nowrap">Workflow</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {usageLogs.map((log, i) => (
                              <TableRow key={i}>
                                <TableCell className="text-muted-foreground whitespace-nowrap">
                                  {new Date(log.timestamp).toLocaleString()}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">{log.eventType}</TableCell>
                                <TableCell>
                                  <Badge variant={log.status === "success" ? "default" : "destructive"}>
                                    {log.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-xs">{log.details}</TableCell>
                                <TableCell className="whitespace-nowrap">{log.workflow}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        </div>
                      </Card>
                      <p className="text-xs text-muted-foreground">Logs retained for 90 days per compliance policy</p>
                    </TabsContent>

                    <TabsContent value="settings" className="p-6 m-0 space-y-6 pb-10">
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
                  </ScrollArea>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
