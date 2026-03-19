"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  LayoutGrid,
  List,
  Search,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  Pencil,
  X,
  Send,
  ExternalLink,
  AlertCircle,
  Mic,
  Mail,
  Network,
  Target,
  BookOpen,
  PenTool,
  Heart,
  Plane,
  GraduationCap,
  Briefcase,
  Headphones,
  UserPlus,
  Shield,
  BarChart3,
  Presentation,
} from "lucide-react"

// Type definitions
type AppStatus = "ready" | "updating" | "offline"
type AppSource = "Built-In" | "My Agent" | "Team"

interface AppData {
  id: string
  name: string
  tagline: string
  category: string
  source: AppSource
  status: AppStatus
  icon: string
  lastUsed: string
  owner?: string
  editable?: boolean
  requiresAccess?: boolean
  quickActions: string[]
  welcomeMessage: string
}

interface RecentApp {
  appId: string
  name: string
  lastUsed: string
  taskInProgress: string
  progress: number | null
  icon: string
}

// Built-In Apps Data
const builtInApps: AppData[] = [
  {
    id: "app-001",
    name: "Briefly AI",
    tagline: "Meetings, summarized.",
    category: "Productivity",
    source: "Built-In",
    status: "ready",
    icon: "Mic",
    lastUsed: "2 hours ago",
    quickActions: ["Start Live Transcription", "Upload Recording", "View Past Summaries", "Export to Email"],
    welcomeMessage: "Ready to summarize your next meeting. Upload a recording or start live transcription."
  },
  {
    id: "app-002",
    name: "InboxIQ AI",
    tagline: "Your inbox, intelligently managed.",
    category: "Productivity",
    source: "Built-In",
    status: "ready",
    icon: "Mail",
    lastUsed: "5 hours ago",
    quickActions: ["Summarize Unread", "Draft Reply to Top 3", "Flag Urgent Emails", "Clean Up Inbox"],
    welcomeMessage: "Your inbox, intelligently managed. What would you like to do?"
  },
  {
    id: "app-003",
    name: "MindLink AI",
    tagline: "Connect your ideas.",
    category: "Knowledge",
    source: "Built-In",
    status: "ready",
    icon: "Network",
    lastUsed: "1 day ago",
    quickActions: ["Summarize Web Page", "Link Related Notes", "Create Knowledge Graph", "Export to Presentation"],
    welcomeMessage: "Connect your ideas. What content would you like to organize?"
  },
  {
    id: "app-004",
    name: "FocusFlow AI",
    tagline: "Work smarter, not harder.",
    category: "Productivity",
    source: "Built-In",
    status: "updating",
    icon: "Target",
    lastUsed: "2 days ago",
    quickActions: ["Show Priority Tasks", "Schedule Focus Time", "Weekly Productivity Report", "Balance Workload"],
    welcomeMessage: "Work smarter, not harder. What's on your plate today?"
  },
  {
    id: "app-005",
    name: "LocalLens AI",
    tagline: "Find anything. Privately.",
    category: "Knowledge",
    source: "Built-In",
    status: "ready",
    icon: "Search",
    lastUsed: "3 days ago",
    quickActions: ["Search Recent Files", "Find Photos from Last Month", "Locate Email Attachments", "Search Across All Apps"],
    welcomeMessage: "Find anything. Privately. What are you looking for?"
  },
  {
    id: "app-006",
    name: "SlideCraft AI",
    tagline: "From notes to slides, instantly.",
    category: "Content",
    source: "Built-In",
    status: "ready",
    icon: "Presentation",
    lastUsed: "4 days ago",
    quickActions: ["Convert Document to Slides", "Suggest Visuals", "Generate Speaker Notes", "Refine for Clarity"],
    welcomeMessage: "From notes to slides, instantly. What would you like to present?"
  },
]

// Personal Agents Data
const personalAgents: AppData[] = [
  {
    id: "agent-001",
    name: "Research Assistant",
    tagline: "Deep dive into any topic.",
    category: "Personal Assistants",
    source: "My Agent",
    status: "ready",
    icon: "BookOpen",
    owner: "Current User",
    lastUsed: "1 day ago",
    editable: true,
    quickActions: ["Research Topic", "Summarize Sources", "Create Bibliography", "Fact Check"],
    welcomeMessage: "Ready to help you research. What topic would you like to explore?"
  },
  {
    id: "agent-002",
    name: "Writing Coach",
    tagline: "Improve your writing style.",
    category: "Personal Assistants",
    source: "My Agent",
    status: "ready",
    icon: "PenTool",
    owner: "Current User",
    lastUsed: "3 days ago",
    editable: true,
    quickActions: ["Review Draft", "Suggest Improvements", "Check Grammar", "Adjust Tone"],
    welcomeMessage: "Let's improve your writing together. Paste your text to get started."
  },
  {
    id: "agent-003",
    name: "Fitness Bot",
    tagline: "Your personal health companion.",
    category: "Personal Assistants",
    source: "My Agent",
    status: "ready",
    icon: "Heart",
    owner: "Current User",
    lastUsed: "1 week ago",
    editable: true,
    quickActions: ["Log Workout", "Suggest Exercise", "Track Progress", "Meal Ideas"],
    welcomeMessage: "Ready to help you stay healthy. What's your fitness goal today?"
  },
  {
    id: "agent-004",
    name: "Travel Planner",
    tagline: "Plan trips with AI precision.",
    category: "Personal Assistants",
    source: "My Agent",
    status: "ready",
    icon: "Plane",
    owner: "Current User",
    lastUsed: "2 weeks ago",
    editable: true,
    quickActions: ["Plan Itinerary", "Find Flights", "Book Hotels", "Local Recommendations"],
    welcomeMessage: "Where would you like to go? I'll help plan the perfect trip."
  },
  {
    id: "agent-005",
    name: "Learning Companion",
    tagline: "Master new skills faster.",
    category: "Personal Assistants",
    source: "My Agent",
    status: "ready",
    icon: "GraduationCap",
    owner: "Current User",
    lastUsed: "3 weeks ago",
    editable: true,
    quickActions: ["Create Study Plan", "Quiz Me", "Explain Concept", "Track Progress"],
    welcomeMessage: "What would you like to learn today? I'll create a personalized path."
  },
]

// Enterprise Agents Data
const enterpriseAgents: AppData[] = [
  {
    id: "ent-001",
    name: "Sales Qualifier",
    tagline: "Automate lead qualification.",
    category: "Work Tools",
    source: "Team",
    status: "ready",
    icon: "Briefcase",
    owner: "Sales Team",
    lastUsed: "1 week ago",
    requiresAccess: false,
    quickActions: ["Qualify Lead", "Score Prospect", "Generate Report", "Schedule Follow-up"],
    welcomeMessage: "Ready to qualify leads. Paste lead information to get started."
  },
  {
    id: "ent-002",
    name: "Support Router",
    tagline: "Intelligent ticket routing.",
    category: "Work Tools",
    source: "Team",
    status: "ready",
    icon: "Headphones",
    owner: "Support Team",
    lastUsed: "2 weeks ago",
    requiresAccess: false,
    quickActions: ["Route Ticket", "Suggest Response", "Escalate Issue", "View Analytics"],
    welcomeMessage: "Paste a support ticket and I'll route it to the right team."
  },
  {
    id: "ent-003",
    name: "HR Onboarding Bot",
    tagline: "Streamline new hire setup.",
    category: "Work Tools",
    source: "Team",
    status: "ready",
    icon: "UserPlus",
    owner: "HR Team",
    lastUsed: "1 month ago",
    requiresAccess: false,
    quickActions: ["Start Onboarding", "Check Checklist", "Schedule Training", "Send Welcome Kit"],
    welcomeMessage: "Welcome! Let's get your new hire set up. Enter their details to begin."
  },
  {
    id: "ent-004",
    name: "Compliance Checker",
    tagline: "Ensure regulatory compliance.",
    category: "Work Tools",
    source: "Team",
    status: "ready",
    icon: "Shield",
    owner: "Legal Team",
    lastUsed: "3 days ago",
    requiresAccess: false,
    quickActions: ["Check Document", "Audit Trail", "Flag Issues", "Generate Report"],
    welcomeMessage: "Upload a document and I'll check it for compliance issues."
  },
  {
    id: "ent-005",
    name: "Data Analyst",
    tagline: "Insights from your data.",
    category: "Work Tools",
    source: "Team",
    status: "ready",
    icon: "BarChart3",
    owner: "Analytics Team",
    lastUsed: "5 days ago",
    requiresAccess: false,
    quickActions: ["Analyze Dataset", "Create Visualization", "Find Trends", "Export Report"],
    welcomeMessage: "Ready to analyze your data. Upload a file or describe what you need."
  },
]

// Recently Used Apps
const recentlyUsed: RecentApp[] = [
  { appId: "app-001", name: "Briefly AI", lastUsed: "2 hours ago", taskInProgress: "Meeting summary in progress", progress: 65, icon: "Mic" },
  { appId: "app-002", name: "InboxIQ AI", lastUsed: "5 hours ago", taskInProgress: "3 drafts pending review", progress: null, icon: "Mail" },
  { appId: "app-003", name: "MindLink AI", lastUsed: "1 day ago", taskInProgress: "Knowledge graph updated", progress: 100, icon: "Network" },
  { appId: "app-004", name: "FocusFlow AI", lastUsed: "2 days ago", taskInProgress: "Weekly review ready", progress: 100, icon: "Target" },
  { appId: "app-005", name: "LocalLens AI", lastUsed: "3 days ago", taskInProgress: "Search history available", progress: null, icon: "Search" },
]

// Favorites (user-pinned apps)
const defaultFavorites = ["app-001", "agent-001", "ent-004"]

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mic,
  Mail,
  Network,
  Target,
  Search,
  Presentation,
  BookOpen,
  PenTool,
  Heart,
  Plane,
  GraduationCap,
  Briefcase,
  Headphones,
  UserPlus,
  Shield,
  BarChart3,
}

// Get status color
const getStatusColor = (status: AppStatus) => {
  switch (status) {
    case "ready": return "bg-emerald-500"
    case "updating": return "bg-amber-500"
    case "offline": return "bg-gray-400"
  }
}

// Get source badge style
const getSourceBadgeStyle = (source: AppSource) => {
  switch (source) {
    case "Built-In": return "bg-[#F5F7FA] text-[#374151]"
    case "My Agent": return "bg-blue-50 text-blue-600"
    case "Team": return "bg-purple-50 text-purple-600"
  }
}

export default function MyAppsPage() {
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // View and filter state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<AppSource[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>(["meeting notes", "sales report", "inbox"])
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  
  // Category collapse state
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({})
  
  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(defaultFavorites)
  
  // App launch modal state
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null)
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.key === "Escape" && selectedApp) {
        setSelectedApp(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedApp])
  
  // Get all apps
  const allApps = [...builtInApps, ...personalAgents, ...enterpriseAgents]
  
  // Filter apps
  const filteredApps = allApps.filter(app => {
    const matchesSearch = !searchQuery || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(app.source)
    return matchesSearch && matchesFilter
  })
  
  // Get apps by category
  const productivityApps = filteredApps.filter(app => app.source === "Built-In")
  const personalApps = filteredApps.filter(app => app.source === "My Agent")
  const workApps = filteredApps.filter(app => app.source === "Team")
  const favoriteApps = allApps.filter(app => favorites.includes(app.id))
  
  // Toggle filter
  const toggleFilter = (source: AppSource) => {
    setActiveFilters(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }
  
  // Toggle category collapse
  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({ ...prev, [category]: !prev[category] }))
  }
  
  // Toggle favorite
  const toggleFavorite = (appId: string) => {
    setFavorites(prev => 
      prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    )
  }
  
  // Launch app
  const launchApp = (app: AppData, resume = false) => {
    setSelectedApp(app)
    setChatMessages([
      { role: "assistant", content: app.welcomeMessage }
    ])
    if (resume) {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Resuming your previous session..." }])
    }
  }
  
  // Send chat message
  const sendMessage = () => {
    if (!chatInput.trim() || !selectedApp) return
    
    const userMessage = chatInput.trim()
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }])
    setChatInput("")
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const responses: Record<string, string> = {
        "app-001": "I've analyzed your meeting from March 12. Key decisions: 1) Q2 budget approved, 2) New hire starting April 1. Action items: 3 tasks assigned to you.",
        "app-002": "You have 47 unread emails. Top 3 require attention: 1) Budget approval from Finance (due today), 2) Client meeting request, 3) Team feedback deadline.",
        "app-003": "I found 12 related notes about 'Q2 Planning'. Would you like me to create a structured outline or connect them to your meeting notes?",
        "app-004": "Based on your deadlines, here are your top 3 priorities: 1) Complete project proposal (due tomorrow), 2) Review team feedback (due EOD), 3) Schedule client call (flexible).",
        "app-005": "I found 8 files matching your search edited last week. 3 are in Downloads, 4 in Documents, 1 attached to an email from Sarah.",
        "app-006": "I've created 12 slides from your document. Suggested improvements: 1) Add chart on slide 5, 2) Simplify text on slide 8, 3) Include summary slide at end.",
      }
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: responses[selectedApp.id] || "I understand. How can I help you with that?"
      }])
    }, 1500)
  }
  
  // Handle search submit
  const handleSearchSubmit = () => {
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 4)])
    }
    setShowRecentSearches(false)
  }
  
  // App Card Component
  const AppCard = ({ app, showEditButton = false }: { app: AppData; showEditButton?: boolean }) => {
    const IconComponent = iconMap[app.icon] || Briefcase
    const isFavorite = favorites.includes(app.id)
    
    return (
      <Card 
        className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
      >
        <CardContent className="py-2.5 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-100">
                <IconComponent className="h-4 w-4 text-slate-600" />
              </div>
              <h3 className="card-title-text font-semibold text-foreground transition-colors duration-150 truncate">{app.name}</h3>
            </div>
            <div className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${getStatusColor(app.status)}`} />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={(e) => { e.stopPropagation(); toggleFavorite(app.id) }}
              >
                <Star className={`h-4 w-4 ${isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
              </Button>
              {showEditButton && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={(e) => { e.stopPropagation(); router.push("/build/projects") }}
                >
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground truncate">{app.tagline}</p>
          
          <div className="mt-2 flex items-center justify-between">
            <Badge variant="secondary" className={`text-xs ${getSourceBadgeStyle(app.source)}`}>
              {app.source}
            </Badge>
            {app.owner && app.source === "Team" && (
              <span className="text-xs text-muted-foreground">Owned by: {app.owner}</span>
            )}
          </div>
          

        </CardContent>
      </Card>
    )
  }
  
  // Category Section Component
  const CategorySection = ({ 
    title, 
    apps, 
    categoryKey,
    showEditButton = false 
  }: { 
    title: string
    apps: AppData[]
    categoryKey: string
    showEditButton?: boolean
  }) => {
    const isCollapsed = collapsedCategories[categoryKey]
    
    if (apps.length === 0) return null
    
    return (
      <div className="mb-6">
        <button 
          className="flex items-center gap-2 w-full text-left mb-4 group"
          onClick={() => toggleCategory(categoryKey)}
        >
          {isCollapsed ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-lg font-semibold text-foreground">{title}</span>
          <Badge variant="secondary" className="bg-[#F5F7FA] text-muted-foreground text-xs">
            {apps.length} apps
          </Badge>
        </button>
        
        {!isCollapsed && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {apps.map(app => (
              <AppCard key={app.id} app={app} showEditButton={showEditButton} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <AppLayout>
      <>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-[#ee3224]" />
                <h1 className="text-2xl font-semibold text-foreground">Installed Apps</h1>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                Launch and use your installed AI applications with one click.
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {/* Controls Row: Search + Filter Chips + View Toggle */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search apps... (Cmd/Ctrl+K)"
                  className="pl-10 pr-8 bg-white border-[#E5E7EB]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowRecentSearches(true)}
                  onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
                
                {/* Recent Searches Dropdown */}
                {showRecentSearches && recentSearches.length > 0 && !searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded shadow-md z-10">
                    <div className="p-2">
                      <p className="text-xs text-muted-foreground px-2 mb-1">Recent Searches</p>
                      {recentSearches.map((search, idx) => (
                        <button
                          key={idx}
                          className="w-full text-left px-2 py-1.5 text-sm text-foreground hover:bg-[#F5F7FA] rounded"
                          onClick={() => setSearchQuery(search)}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Filter Chips */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFilters([])}
                  className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors ${
                    activeFilters.length === 0
                      ? "bg-[#ee3224] text-white border-[#ee3224]"
                      : "bg-white text-[#333] border-[#E5E7EB] hover:bg-[#F5F7FA]"
                  }`}
                >
                  All
                </button>
                {(["Built-In", "My Agent", "Team"] as AppSource[]).map(source => (
                  <button
                    key={source}
                    onClick={() => toggleFilter(source)}
                    className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors ${
                      activeFilters.includes(source)
                        ? "bg-[#ee3224] text-white border-[#ee3224]"
                        : "bg-white text-[#333] border-[#E5E7EB] hover:bg-[#F5F7FA]"
                    }`}
                  >
                    {source === "My Agent" ? "My Agents" : source === "Team" ? "Team Agents" : source}
                  </button>
                ))}
                {activeFilters.length > 0 && (
                  <button 
                    onClick={() => setActiveFilters([])}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* View Toggle */}
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
            {viewMode === "grid" ? (
              <>
                {/* Continue Section (Recently Used) */}
                {!searchQuery && activeFilters.length === 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <h2 className="text-lg font-semibold text-foreground">Continue</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                      {recentlyUsed.map(recent => {
                        const app = allApps.find(a => a.id === recent.appId)
                        if (!app) return null
                        const IconComponent = iconMap[recent.icon] || Briefcase
                        
                        return (
                          <Card 
                            key={recent.appId}
                            className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
                          >
                            <CardContent className="py-2.5 px-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-100">
                                  <IconComponent className="h-4 w-4 text-slate-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="card-title-text font-semibold text-foreground transition-colors duration-150 truncate">{recent.name}</h3>
                                  <p className="text-xs text-muted-foreground">{recent.lastUsed}</p>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground truncate">{recent.taskInProgress}</p>
                              {recent.progress !== null && recent.progress < 100 && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Progress value={recent.progress} className="h-1.5 flex-1" />
                                  <span className="text-xs font-medium text-muted-foreground w-8 text-right">{recent.progress}%</span>
                                </div>
                              )}

                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )}
                
                {/* Favorites Section */}
                {favoriteApps.length > 0 && !searchQuery && activeFilters.length === 0 && (
                  <CategorySection 
                    title="Favorites" 
                    apps={favoriteApps} 
                    categoryKey="favorites"
                  />
                )}
                
                {/* Productivity (Built-In Apps) */}
                <CategorySection 
                  title="Productivity" 
                  apps={productivityApps} 
                  categoryKey="productivity"
                />
                
                {/* Personal Assistants */}
                <CategorySection 
                  title="Personal Assistants" 
                  apps={personalApps} 
                  categoryKey="personal"
                  showEditButton
                />
                
                {/* Work Tools */}
                <CategorySection 
                  title="Work Tools" 
                  apps={workApps} 
                  categoryKey="work"
                />
                
                {/* No Results */}
                {filteredApps.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No apps match '{searchQuery}'</h3>
                    <p className="text-muted-foreground">Try browsing categories or adjusting your filters.</p>
                  </div>
                )}
              </>
            ) : (
              /* List View */
              <Card className="border border-[#E5E7EB]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5F7FA]">
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>App Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApps.map(app => {
                      const IconComponent = iconMap[app.icon] || Briefcase
                      const isFavorite = favorites.includes(app.id)
                      
                      return (
                        <TableRow 
                          key={app.id}
                          className="group hover:bg-[#F5F7FA] hover:border-l-2 hover:border-l-[#ee3224]"
                        >
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E5E7EB]">
                                <IconComponent className="h-4 w-4 text-[#ee3224]" />
                              </div>
                              <span className="font-medium">{app.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{app.category}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={`text-xs ${getSourceBadgeStyle(app.source)}`}>
                              {app.source}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(app.status)}`} />
                              <span className="text-sm capitalize">{app.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{app.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white"
                                onClick={() => launchApp(app)}
                              >
                                Launch
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleFavorite(app.id)}
                              >
                                <Star className={`h-4 w-4 ${isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        </ScrollArea>
        
        {/* App Launch Modal */}
        <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
          <DialogContent className="max-w-[900px] h-[80vh] flex flex-col p-0" aria-describedby={undefined}>
            {selectedApp && (
              <>
                {/* Modal Header */}
                <DialogHeader className="px-6 py-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const IconComponent = iconMap[selectedApp.icon] || Briefcase
                        return (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E5E7EB]">
                            <IconComponent className="h-5 w-5 text-[#ee3224]" />
                          </div>
                        )
                      })()}
                      <div>
                        <div className="flex items-center gap-2">
                          <DialogTitle className="text-lg">{selectedApp.name}</DialogTitle>
                          <Badge variant="secondary" className={`text-xs ${getSourceBadgeStyle(selectedApp.source)}`}>
                            {selectedApp.source}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(selectedApp.status)}`} />
                          <span className="capitalize">{selectedApp.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                
                {/* Chat Interface */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                      {chatMessages.map((msg, idx) => (
                        <div 
                          key={idx}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[70%] rounded-lg px-4 py-3 ${
                              msg.role === "user" 
                                ? "bg-[#F5F7FA] text-foreground" 
                                : "bg-white border border-[#E5E7EB] text-foreground"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-3">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  {/* Quick Actions */}
                  <div className="px-6 py-3 border-t border-[#E5E7EB] bg-[#F5F7FA]">
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.quickActions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-xs border-[#E5E7EB] bg-white hover:border-[#ee3224] hover:text-[#ee3224]"
                          onClick={() => setChatInput(action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Input Area */}
                  <div className="px-6 py-4 border-t border-[#E5E7EB]">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1 border-[#E5E7EB]"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      />
                      <Button 
                        className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                        onClick={sendMessage}
                        disabled={!chatInput.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="px-6 py-3 border-t border-[#E5E7EB] flex items-center justify-between bg-[#F5F7FA]">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="gap-2 border-[#ee3224] text-[#ee3224]">
                      <ExternalLink className="h-4 w-4" />
                      Open in Full Window
                    </Button>
                    <button className="text-sm text-[#ee3224] hover:underline">View Details</button>
                  </div>
                  <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Report Issue
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </>
    </AppLayout>
  )
}
