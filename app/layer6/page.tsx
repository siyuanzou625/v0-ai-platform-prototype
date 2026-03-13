"use client"

import { useState, useEffect, useCallback } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  Search,
  Store,
  LayoutGrid,
  List,
  CheckCircle2,
  Star,
  Download,
  Lock,
  X,
  Share2,
  Flag,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  Book,
  GraduationCap,
  Video,
  FileCode,
  Megaphone,
  HelpCircle,
  ChevronDown,
  Users,
  ExternalLink,
  Copy,
  CheckCheck,
  Clock,
  ArrowUpRight,
  Plus,
} from "lucide-react"

// Asset types
type AssetType = "Agent" | "Template" | "Plugin"
type AssetCategory = "Productivity" | "Knowledge" | "Development" | "Enterprise"
type AssetPrice = "Free" | string
type CreatorTier = "Platinum" | "Gold" | "Silver" | "Bronze"

interface Asset {
  id: string
  name: string
  type: AssetType
  category: AssetCategory
  creator: string
  creatorInitials: string
  verified: boolean
  tier: CreatorTier
  rating: number
  reviews: number
  installs: string
  price: AssetPrice
  license: string
  tags: string[]
  description: string
  compatibility: string[]
  enterpriseOnly?: boolean
  lastUpdated: string
  version: string
}

interface Discussion {
  id: string
  assetId: string
  title: string
  author: string
  authorInitials: string
  authorTier: CreatorTier
  timestamp: string
  type: "Q&A" | "Ideas" | "Bugs" | "Showcases"
  upvotes: number
  replies: number
  acceptedAnswer: boolean
  excerpt: string
  isCreator?: boolean
}

interface GlobalDiscussion {
  id: string
  title: string
  assetBadge: string
  author: string
  authorInitials: string
  timestamp: string
  upvotes: number
  replies: number
}

// Mock asset data
const assets: Asset[] = [
  {
    id: "asset-001",
    name: "Briefly AI",
    type: "Agent",
    category: "Productivity",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.7,
    reviews: 342,
    installs: "12.4K",
    price: "Free",
    license: "MIT",
    tags: ["Meetings", "Transcription", "Offline"],
    description: "Real-time meeting transcription, auto-summaries, and action item extraction",
    compatibility: ["Desktop", "Web"],
    lastUpdated: "2025-03-10",
    version: "2.4.1",
  },
  {
    id: "asset-002",
    name: "InboxIQ AI",
    type: "Agent",
    category: "Productivity",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.9,
    reviews: 521,
    installs: "18.2K",
    price: "Free",
    license: "MIT",
    tags: ["Email", "Drafting", "Privacy"],
    description: "Privately triage, summarize, and draft email responses with context-aware AI",
    compatibility: ["Web", "Desktop", "Mobile"],
    lastUpdated: "2025-03-11",
    version: "3.1.0",
  },
  {
    id: "asset-003",
    name: "MindLink AI",
    type: "Agent",
    category: "Knowledge",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.8,
    reviews: 289,
    installs: "9.7K",
    price: "Free",
    license: "MIT",
    tags: ["Notes", "Knowledge", "Graph"],
    description: "Bi-directional sync with Notion, Obsidian, and other knowledge bases",
    compatibility: ["Desktop", "Web"],
    lastUpdated: "2025-03-09",
    version: "1.8.3",
  },
  {
    id: "asset-004",
    name: "FocusFlow AI",
    type: "Agent",
    category: "Productivity",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.6,
    reviews: 198,
    installs: "7.3K",
    price: "Free",
    license: "MIT",
    tags: ["Focus", "Productivity", "Wellness"],
    description: "Smart focus sessions with distraction blocking and productivity insights",
    compatibility: ["Desktop", "Mobile"],
    lastUpdated: "2025-03-08",
    version: "2.0.5",
  },
  {
    id: "asset-005",
    name: "LocalLens AI",
    type: "Agent",
    category: "Knowledge",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.5,
    reviews: 156,
    installs: "5.1K",
    price: "Free",
    license: "MIT",
    tags: ["Local", "Search", "Privacy"],
    description: "Search and analyze local files with on-device AI processing",
    compatibility: ["Desktop"],
    lastUpdated: "2025-03-07",
    version: "1.5.2",
  },
  {
    id: "asset-006",
    name: "SlideCraft AI",
    type: "Agent",
    category: "Productivity",
    creator: "Platform Team",
    creatorInitials: "PT",
    verified: true,
    tier: "Platinum",
    rating: 4.7,
    reviews: 267,
    installs: "8.9K",
    price: "Free",
    license: "MIT",
    tags: ["Presentations", "Design", "Export"],
    description: "Generate professional presentations from briefs with smart layouts",
    compatibility: ["Web", "Desktop"],
    lastUpdated: "2025-03-06",
    version: "2.2.0",
  },
  {
    id: "asset-007",
    name: "Research Companion",
    type: "Agent",
    category: "Knowledge",
    creator: "Academic Labs",
    creatorInitials: "AL",
    verified: false,
    tier: "Silver",
    rating: 4.3,
    reviews: 156,
    installs: "5.6K",
    price: "Free",
    license: "Apache 2.0",
    tags: ["Research", "Citations", "PDF"],
    description: "Deep dive into any topic with AI-assisted literature review",
    compatibility: ["Web"],
    lastUpdated: "2025-03-05",
    version: "1.2.4",
  },
  {
    id: "asset-008",
    name: "Code Reviewer",
    type: "Agent",
    category: "Development",
    creator: "DevTools Inc",
    creatorInitials: "DT",
    verified: false,
    tier: "Gold",
    rating: 4.4,
    reviews: 203,
    installs: "6.2K",
    price: "Free",
    license: "MIT",
    tags: ["Code", "Review", "GitHub"],
    description: "Automated code review with security scanning and best practices",
    compatibility: ["Web", "Desktop"],
    lastUpdated: "2025-03-04",
    version: "1.6.1",
  },
  {
    id: "asset-009",
    name: "Social Media Scheduler",
    type: "Agent",
    category: "Productivity",
    creator: "Marketing Pro",
    creatorInitials: "MP",
    verified: false,
    tier: "Silver",
    rating: 4.2,
    reviews: 134,
    installs: "4.8K",
    price: "$4.99/mo",
    license: "Commercial",
    tags: ["Social", "Scheduling", "Analytics"],
    description: "Schedule and analyze social media posts across platforms",
    compatibility: ["Web", "Mobile"],
    lastUpdated: "2025-03-03",
    version: "2.1.0",
  },
  {
    id: "asset-010",
    name: "Sales Qualifier",
    type: "Agent",
    category: "Enterprise",
    creator: "Sales Team",
    creatorInitials: "ST",
    verified: true,
    tier: "Gold",
    rating: 4.5,
    reviews: 89,
    installs: "1.2K",
    price: "Enterprise License",
    license: "Proprietary",
    tags: ["CRM", "Leads", "Automation"],
    description: "Automate lead qualification and outreach for enterprise sales teams",
    compatibility: ["Web", "Desktop"],
    enterpriseOnly: true,
    lastUpdated: "2025-03-08",
    version: "3.0.2",
  },
  {
    id: "asset-011",
    name: "Compliance Checker",
    type: "Agent",
    category: "Enterprise",
    creator: "Legal Tech",
    creatorInitials: "LT",
    verified: true,
    tier: "Gold",
    rating: 4.6,
    reviews: 67,
    installs: "890",
    price: "Enterprise License",
    license: "Proprietary",
    tags: ["Compliance", "Legal", "Audit"],
    description: "Automated compliance monitoring and policy enforcement",
    compatibility: ["Web", "Desktop"],
    enterpriseOnly: true,
    lastUpdated: "2025-03-02",
    version: "2.3.1",
  },
  {
    id: "asset-012",
    name: "HR Onboarding Bot",
    type: "Agent",
    category: "Enterprise",
    creator: "HR Solutions",
    creatorInitials: "HR",
    verified: true,
    tier: "Silver",
    rating: 4.4,
    reviews: 45,
    installs: "650",
    price: "Enterprise License",
    license: "Proprietary",
    tags: ["HR", "Onboarding", "Training"],
    description: "Streamline employee onboarding with interactive AI guidance",
    compatibility: ["Web"],
    enterpriseOnly: true,
    lastUpdated: "2025-03-01",
    version: "1.4.0",
  },
]

// Mock discussions data
const assetDiscussions: Discussion[] = [
  {
    id: "disc-001",
    assetId: "asset-001",
    title: "How to export summaries to Notion?",
    author: "John Doe",
    authorInitials: "JD",
    authorTier: "Silver",
    timestamp: "2 hours ago",
    type: "Q&A",
    upvotes: 12,
    replies: 3,
    acceptedAnswer: true,
    excerpt: "I love Briefly AI but can't find the Notion integration...",
  },
  {
    id: "disc-002",
    assetId: "asset-001",
    title: "Feature Request: Multi-language support",
    author: "Maria Garcia",
    authorInitials: "MG",
    authorTier: "Bronze",
    timestamp: "1 day ago",
    type: "Ideas",
    upvotes: 45,
    replies: 8,
    acceptedAnswer: false,
    excerpt: "Would be great to have transcription in Spanish and French...",
  },
  {
    id: "disc-003",
    assetId: "asset-001",
    title: "Bug: Audio lag on M1 Macs",
    author: "Alex Chen",
    authorInitials: "AC",
    authorTier: "Gold",
    timestamp: "3 days ago",
    type: "Bugs",
    upvotes: 8,
    replies: 2,
    acceptedAnswer: false,
    excerpt: "Experiencing 2-second lag during live transcription...",
    isCreator: true,
  },
]

// Global discussions
const globalDiscussions: GlobalDiscussion[] = [
  {
    id: "global-001",
    title: "Best practices for RAG agent optimization?",
    assetBadge: "General",
    author: "Sarah Kim",
    authorInitials: "SK",
    timestamp: "30 minutes ago",
    upvotes: 23,
    replies: 7,
  },
  {
    id: "global-002",
    title: "Briefly AI vs Traditional Recording Tools",
    assetBadge: "Briefly AI",
    author: "Mike Ross",
    authorInitials: "MR",
    timestamp: "2 hours ago",
    upvotes: 15,
    replies: 4,
  },
  {
    id: "global-003",
    title: "Enterprise licensing questions",
    assetBadge: "Sales Qualifier",
    author: "Jennifer Lee",
    authorInitials: "JL",
    timestamp: "5 hours ago",
    upvotes: 5,
    replies: 1,
  },
  {
    id: "global-004",
    title: "How to build custom integrations?",
    assetBadge: "Development",
    author: "Chris Taylor",
    authorInitials: "CT",
    timestamp: "1 day ago",
    upvotes: 18,
    replies: 6,
  },
  {
    id: "global-005",
    title: "Showcase: My automated research workflow",
    assetBadge: "Research Companion",
    author: "Emma Wilson",
    authorInitials: "EW",
    timestamp: "2 days ago",
    upvotes: 42,
    replies: 12,
  },
]

// Version history mock
const versionHistory = [
  { version: "2.4.1", date: "Mar 10, 2025", summary: "Bug fixes and performance improvements", size: "12.4 MB", current: true },
  { version: "2.4.0", date: "Mar 5, 2025", summary: "Added multi-language transcription support", size: "12.2 MB", current: false },
  { version: "2.3.2", date: "Feb 28, 2025", summary: "Fixed audio sync issues on M1 Macs", size: "12.1 MB", current: false },
  { version: "2.3.1", date: "Feb 20, 2025", summary: "Improved Notion export formatting", size: "12.0 MB", current: false },
  { version: "2.3.0", date: "Feb 15, 2025", summary: "Added action item detection", size: "11.8 MB", current: false },
]

// Tier badge colors
const getTierColor = (tier: CreatorTier) => {
  switch (tier) {
    case "Platinum": return "bg-slate-100 text-slate-700 border-slate-300"
    case "Gold": return "bg-amber-50 text-amber-700 border-amber-300"
    case "Silver": return "bg-gray-100 text-gray-600 border-gray-300"
    case "Bronze": return "bg-orange-50 text-orange-700 border-orange-300"
  }
}

// Discussion type colors
const getDiscussionTypeColor = (type: Discussion["type"]) => {
  switch (type) {
    case "Q&A": return "bg-blue-50 text-blue-600 border-blue-200"
    case "Ideas": return "bg-purple-50 text-purple-600 border-purple-200"
    case "Bugs": return "bg-red-50 text-red-600 border-red-200"
    case "Showcases": return "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
}

export default function DiscoverPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [assetTypeFilter, setAssetTypeFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [priceFilter, setPriceFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("trending")
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [showAssetModal, setShowAssetModal] = useState(false)
  const [showCommunityPanel, setShowCommunityPanel] = useState(false)
  const [assetModalTab, setAssetModalTab] = useState("overview")
  const [communityTab, setCommunityTab] = useState("trending")
  const [discussionTypeFilter, setDiscussionTypeFilter] = useState<string>("all")
  const [installingAsset, setInstallingAsset] = useState<string | null>(null)
  const [installedAssets, setInstalledAssets] = useState<string[]>(["asset-001", "asset-002"])
  const [copiedCode, setCopiedCode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const assetsPerPage = 12

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        document.getElementById("global-search")?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = searchQuery === "" || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = assetTypeFilter === "all" || asset.type.toLowerCase() === assetTypeFilter
    const matchesCategory = categoryFilter === "all" || asset.category.toLowerCase() === categoryFilter
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && asset.price === "Free") ||
      (priceFilter === "paid" && asset.price !== "Free" && !asset.enterpriseOnly) ||
      (priceFilter === "enterprise" && asset.enterpriseOnly)
    return matchesSearch && matchesType && matchesCategory && matchesPrice
  })

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case "trending": return parseFloat(b.installs.replace("K", "000")) - parseFloat(a.installs.replace("K", "000"))
      case "newest": return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "toprated": return b.rating - a.rating
      case "mostinstalled": return parseFloat(b.installs.replace("K", "000")) - parseFloat(a.installs.replace("K", "000"))
      default: return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedAssets.length / assetsPerPage)
  const paginatedAssets = sortedAssets.slice((currentPage - 1) * assetsPerPage, currentPage * assetsPerPage)

  // Handle asset click
  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset)
    setAssetModalTab("overview")
    setShowAssetModal(true)
  }

  // Handle install
  const handleInstall = useCallback((assetId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (installedAssets.includes(assetId)) return
    
    setInstallingAsset(assetId)
    setTimeout(() => {
      setInstalledAssets(prev => [...prev, assetId])
      setInstallingAsset(null)
    }, 2000)
  }, [installedAssets])

  // Copy code
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Get discussions for selected asset
  const currentAssetDiscussions = selectedAsset 
    ? assetDiscussions.filter(d => d.assetId === selectedAsset.id)
    : []

  // Check if any filters are active
  const hasActiveFilters = assetTypeFilter !== "all" || categoryFilter !== "all" || priceFilter !== "all" || searchQuery !== ""

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Top Utility Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[#E5E7EB] bg-white px-6 py-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Discover</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground">AI Asset Marketplace</span>
          </div>

          {/* Global Search */}
          <div className="relative w-[400px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="global-search"
              placeholder="Search assets, docs, discussions... (Cmd/Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 border-[#E5E7EB]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  Resources
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem className="gap-2">
                  <Book className="h-4 w-4" />
                  Documentation
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Tutorials
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Video className="h-4 w-4" />
                  Webinars & Events
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <FileCode className="h-4 w-4" />
                  API Reference
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Megaphone className="h-4 w-4" />
                  Release Notes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Contact Support
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Community */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1.5"
              onClick={() => setShowCommunityPanel(true)}
            >
              <Users className="h-4 w-4" />
              Community
            </Button>

            {/* User Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#ee3224] text-white text-xs">ZD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Creator Studio</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-[#F5F7FA] p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Store className="h-6 w-6 text-[#ee3224]" />
                <h1 className="text-2xl font-semibold text-foreground">Discover AI Assets</h1>
              </div>
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center rounded-lg border border-[#E5E7EB] bg-white p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "grid" ? "bg-[#ee3224] text-white" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "list" ? "bg-[#ee3224] text-white" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <List className="h-4 w-4" />
                    List
                  </button>
                </div>
                <Button variant="outline" className="gap-2 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224]/5">
                  <Plus className="h-4 w-4" />
                  Publish Asset
                </Button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={assetTypeFilter} onValueChange={setAssetTypeFilter}>
                <SelectTrigger className="w-[130px] border-[#E5E7EB] bg-white">
                  <SelectValue placeholder="Asset Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="agent">Agents</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="plugin">Plugins</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] border-[#E5E7EB] bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="knowledge">Knowledge</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-[130px] border-[#E5E7EB] bg-white">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px] border-[#E5E7EB] bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="toprated">Top Rated</SelectItem>
                  <SelectItem value="mostinstalled">Most Installed</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAssetTypeFilter("all")
                    setCategoryFilter("all")
                    setPriceFilter("all")
                    setSearchQuery("")
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Reset All
                </Button>
              )}
            </div>

            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-3">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {assetTypeFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Type: {assetTypeFilter}
                    <button onClick={() => setAssetTypeFilter("all")} className="ml-1 hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Category: {categoryFilter}
                    <button onClick={() => setCategoryFilter("all")} className="ml-1 hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {priceFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Price: {priceFilter}
                    <button onClick={() => setPriceFilter("all")} className="ml-1 hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Asset Grid */}
          {filteredAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No assets match your search</h3>
              <p className="text-muted-foreground mb-4">Try browsing categories or starting a discussion</p>
              <Button variant="outline" onClick={() => setShowCommunityPanel(true)}>
                Browse Community
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paginatedAssets.map((asset) => (
                <Card
                  key={asset.id}
                  className="group cursor-pointer border border-[#E5E7EB] bg-white shadow-sm transition-all hover:border-[#ee3224]/30 hover:shadow-md"
                  onClick={() => handleAssetClick(asset)}
                >
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F7FA] text-lg font-semibold text-foreground">
                        {asset.name.substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground truncate group-hover:text-[#ee3224] transition-colors">
                            {asset.name}
                          </h3>
                          {asset.verified && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          )}
                          {asset.enterpriseOnly && (
                            <Lock className="h-4 w-4 text-amber-500 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[10px] bg-muted">{asset.creatorInitials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{asset.creator}</span>
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${getTierColor(asset.tier)}`}>
                            {asset.tier}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {asset.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-foreground">{asset.rating}</span>
                        <span>({asset.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>{asset.installs}</span>
                      </div>
                      <div className="font-medium text-foreground">
                        {asset.price}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 h-5 bg-[#F5F7FA]">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-2">
                      <Button
                        className={`flex-1 ${
                          installedAssets.includes(asset.id)
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-[#ee3224] hover:bg-[#cc2a1e]"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (installedAssets.includes(asset.id)) {
                            // Open in My Apps
                          } else if (asset.enterpriseOnly) {
                            alert("Enterprise license required. Contact sales for access.")
                          } else {
                            handleInstall(asset.id, e)
                          }
                        }}
                        disabled={installingAsset === asset.id}
                      >
                        {installingAsset === asset.id ? (
                          "Installing..."
                        ) : installedAssets.includes(asset.id) ? (
                          "Open"
                        ) : asset.enterpriseOnly ? (
                          <>
                            <Lock className="h-4 w-4 mr-1" />
                            Request Access
                          </>
                        ) : (
                          "Install"
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAssetClick(asset)
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* List View */
            <Card className="border border-[#E5E7EB] bg-white">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-[#F5F7FA]">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Asset</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Installs</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssets.map((asset) => (
                      <tr
                        key={asset.id}
                        className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F5F7FA] cursor-pointer transition-colors"
                        onClick={() => handleAssetClick(asset)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FA] text-sm font-semibold">
                              {asset.name.substring(0, 2)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{asset.name}</span>
                                {asset.verified && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                {asset.enterpriseOnly && <Lock className="h-4 w-4 text-amber-500" />}
                              </div>
                              <span className="text-xs text-muted-foreground">{asset.creator}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">{asset.type}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm">{asset.rating}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{asset.installs}</td>
                        <td className="px-4 py-3 text-sm font-medium">{asset.price}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            size="sm"
                            className={
                              installedAssets.includes(asset.id)
                                ? "bg-emerald-500 hover:bg-emerald-600"
                                : "bg-[#ee3224] hover:bg-[#cc2a1e]"
                            }
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!installedAssets.includes(asset.id) && !asset.enterpriseOnly) {
                                handleInstall(asset.id, e)
                              }
                            }}
                            disabled={installingAsset === asset.id}
                          >
                            {installingAsset === asset.id
                              ? "..."
                              : installedAssets.includes(asset.id)
                              ? "Open"
                              : "Install"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {filteredAssets.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * assetsPerPage + 1}-{Math.min(currentPage * assetsPerPage, sortedAssets.length)} of {sortedAssets.length} assets
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={currentPage === page ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Asset Detail Modal */}
      <Dialog open={showAssetModal} onOpenChange={setShowAssetModal}>
        <DialogContent className="max-w-[900px] max-h-[85vh] overflow-hidden p-0">
          {selectedAsset && (
            <>
              {/* Modal Header */}
              <DialogHeader className="p-6 pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5F7FA] text-xl font-semibold">
                      {selectedAsset.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <DialogTitle className="text-xl">{selectedAsset.name}</DialogTitle>
                        {selectedAsset.verified && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                        <Badge variant="outline" className="text-xs">v{selectedAsset.version}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {selectedAsset.enterpriseOnly ? (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            <Lock className="h-3 w-3 mr-1" />
                            Enterprise Only
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5" />
                            Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              {/* Modal Tabs */}
              <Tabs value={assetModalTab} onValueChange={setAssetModalTab} className="flex-1">
                <div className="border-b border-[#E5E7EB] px-6">
                  <TabsList className="h-12 bg-transparent p-0 gap-6">
                    <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-3">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="documentation" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-3">
                      Documentation
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-3">
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger value="discussions" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-3">
                      Discussions
                    </TabsTrigger>
                    <TabsTrigger value="versions" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-3">
                      Versions
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-[calc(85vh-180px)]">
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="p-6 m-0">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2 space-y-6">
                        {/* Hero */}
                        <div className="aspect-video rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                          <span className="text-4xl font-bold text-muted-foreground/30">{selectedAsset.name}</span>
                        </div>

                        {/* Description */}
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Description</h3>
                          <p className="text-muted-foreground leading-relaxed">{selectedAsset.description}</p>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Key Features</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              Real-time processing with low latency
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              Privacy-first with on-device AI
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              Seamless integration with popular tools
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              Enterprise-grade security and compliance
                            </li>
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Requirements</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedAsset.compatibility.map((c) => (
                              <Badge key={c} variant="outline">{c}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-4">
                        <Button
                          className={`w-full ${
                            installedAssets.includes(selectedAsset.id)
                              ? "bg-emerald-500 hover:bg-emerald-600"
                              : "bg-[#ee3224] hover:bg-[#cc2a1e]"
                          }`}
                          onClick={() => {
                            if (!installedAssets.includes(selectedAsset.id)) {
                              handleInstall(selectedAsset.id)
                            }
                          }}
                          disabled={installingAsset === selectedAsset.id}
                        >
                          {installingAsset === selectedAsset.id
                            ? "Installing..."
                            : installedAssets.includes(selectedAsset.id)
                            ? "Open in My Apps"
                            : "Install"}
                        </Button>

                        <Card className="border-[#E5E7EB]">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Price</span>
                              <span className="font-medium">{selectedAsset.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">License</span>
                              <span className="font-medium">{selectedAsset.license}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Version</span>
                              <span className="font-medium">{selectedAsset.version}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Updated</span>
                              <span className="font-medium">{selectedAsset.lastUpdated}</span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Creator Info */}
                        <Card className="border-[#E5E7EB]">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-muted">{selectedAsset.creatorInitials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{selectedAsset.creator}</p>
                                <Badge variant="outline" className={`text-[10px] ${getTierColor(selectedAsset.tier)}`}>
                                  {selectedAsset.tier} Creator
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                              Follow
                            </Button>
                          </CardContent>
                        </Card>

                        {/* Metrics */}
                        <Card className="border-[#E5E7EB]">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="font-medium">{selectedAsset.rating}</span>
                              <span className="text-muted-foreground">({selectedAsset.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <span>{selectedAsset.installs} installs</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Documentation Tab */}
                  <TabsContent value="documentation" className="p-6 m-0">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Contents</p>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-[#ee3224]">Quick Start</Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">Installation</Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">Configuration</Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">API Reference</Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">Examples</Button>
                      </div>
                      <div className="col-span-3 space-y-4">
                        <h2 className="text-xl font-semibold">Quick Start</h2>
                        <p className="text-muted-foreground">Get started with {selectedAsset.name} in minutes.</p>
                        
                        <div className="relative">
                          <pre className="bg-[#1e1e1e] text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{`// Install the agent
npm install @ai-agent-os/${selectedAsset.name.toLowerCase().replace(/\s/g, "-")}

// Initialize in your workflow
import { ${selectedAsset.name.replace(/\s/g, "")} } from "@ai-agent-os/${selectedAsset.name.toLowerCase().replace(/\s/g, "-")}";

const agent = new ${selectedAsset.name.replace(/\s/g, "")}({
  apiKey: process.env.AGENT_API_KEY,
  mode: "production"
});

await agent.start();`}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => handleCopyCode("npm install ...")}
                          >
                            {copiedCode ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F5F7FA] border border-[#E5E7EB]">
                          <span className="text-sm text-muted-foreground">Was this helpful?</span>
                          <Button variant="ghost" size="sm"><ThumbsUp className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Reviews Tab */}
                  <TabsContent value="reviews" className="p-6 m-0">
                    <div className="flex items-start gap-8 mb-6">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-foreground">{selectedAsset.rating}</p>
                        <div className="flex items-center gap-1 my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${star <= Math.round(selectedAsset.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedAsset.reviews} reviews</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-3">{rating}</span>
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400"
                                style={{ width: `${rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="mb-6 bg-[#ee3224] hover:bg-[#cc2a1e]">Write a Review</Button>

                    <div className="space-y-4">
                      {[
                        { name: "Alice Smith", initials: "AS", rating: 5, date: "2 days ago", text: "Incredible tool! Has completely transformed how I take meeting notes." },
                        { name: "Bob Johnson", initials: "BJ", rating: 4, date: "1 week ago", text: "Very useful, but would love to see more language support." },
                        { name: "Carol Davis", initials: "CD", rating: 5, date: "2 weeks ago", text: "Best transcription tool I've used. The summaries are spot-on." },
                      ].map((review, idx) => (
                        <Card key={idx} className="border-[#E5E7EB]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarFallback className="bg-muted text-xs">{review.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-foreground">{review.name}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`h-3 w-3 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.text}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Discussions Tab */}
                  <TabsContent value="discussions" className="p-6 m-0">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Discussions about {selectedAsset.name}</h3>
                      <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">Start New Discussion</Button>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {["all", "Q&A", "Ideas", "Bugs", "Showcases"].map((type) => (
                        <Button
                          key={type}
                          variant={discussionTypeFilter === type ? "default" : "outline"}
                          size="sm"
                          className={discussionTypeFilter === type ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                          onClick={() => setDiscussionTypeFilter(type)}
                        >
                          {type === "all" ? "All" : type}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {currentAssetDiscussions
                        .filter(d => discussionTypeFilter === "all" || d.type === discussionTypeFilter)
                        .map((discussion) => (
                          <Card key={discussion.id} className="border-[#E5E7EB] cursor-pointer hover:border-[#ee3224]/30 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className={`text-[10px] ${getDiscussionTypeColor(discussion.type)}`}>
                                      {discussion.type}
                                    </Badge>
                                    {discussion.acceptedAnswer && (
                                      <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Answered
                                      </Badge>
                                    )}
                                    {discussion.isCreator && (
                                      <Badge variant="outline" className="text-[10px] bg-[#ee3224]/10 text-[#ee3224] border-[#ee3224]/30">
                                        Creator
                                      </Badge>
                                    )}
                                  </div>
                                  <h4 className="font-medium text-foreground mb-1">{discussion.title}</h4>
                                  <p className="text-sm text-muted-foreground line-clamp-1">{discussion.excerpt}</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground ml-4">
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                    {discussion.upvotes}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    {discussion.replies}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-[10px] bg-muted">{discussion.authorInitials}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{discussion.author}</span>
                                <span className="text-xs text-muted-foreground">·</span>
                                <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  {/* Versions Tab */}
                  <TabsContent value="versions" className="p-6 m-0">
                    <h3 className="font-semibold mb-4">Version History</h3>
                    <div className="space-y-3">
                      {versionHistory.map((version) => (
                        <Card key={version.version} className={`border-[#E5E7EB] ${version.current ? "ring-2 ring-[#ee3224]/20" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-foreground">v{version.version}</span>
                                  {version.current && (
                                    <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">Current</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{version.summary}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {version.date}
                                  </div>
                                  <span>{version.size}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Release Notes</Button>
                                {!version.current && (
                                  <Button variant="outline" size="sm">Install</Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>

              {/* Modal Footer */}
              <div className="border-t border-[#E5E7EB] p-4 flex items-center justify-between bg-white">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Add to Collection</Button>
                  <Button variant="outline" size="sm">Notify on Update</Button>
                </div>
                <Button
                  className={
                    installedAssets.includes(selectedAsset.id)
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-[#ee3224] hover:bg-[#cc2a1e]"
                  }
                  onClick={() => {
                    if (!installedAssets.includes(selectedAsset.id)) {
                      handleInstall(selectedAsset.id)
                    }
                  }}
                  disabled={installingAsset === selectedAsset.id}
                >
                  {installingAsset === selectedAsset.id
                    ? "Installing..."
                    : installedAssets.includes(selectedAsset.id)
                    ? "Open in My Apps"
                    : "Install Now"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Community Slide-Over Panel */}
      <Sheet open={showCommunityPanel} onOpenChange={setShowCommunityPanel}>
        <SheetContent className="w-[400px] p-0">
          <SheetHeader className="p-4 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <SheetTitle>Community Discussions</SheetTitle>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10 border-[#E5E7EB]" />
            </div>
          </SheetHeader>

          <Tabs value={communityTab} onValueChange={setCommunityTab} className="flex-1">
            <div className="border-b border-[#E5E7EB] px-4">
              <TabsList className="h-10 bg-transparent p-0 gap-4">
                <TabsTrigger value="trending" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-2 text-sm">
                  Trending
                </TabsTrigger>
                <TabsTrigger value="my" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-2 text-sm">
                  My Discussions
                </TabsTrigger>
                <TabsTrigger value="following" className="data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none bg-transparent px-0 pb-2 text-sm">
                  Following
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(100vh-200px)]">
              <TabsContent value="trending" className="p-4 m-0 space-y-3">
                {globalDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="border-[#E5E7EB] cursor-pointer hover:border-[#ee3224]/30 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-muted">{discussion.authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">{discussion.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{discussion.assetBadge}</Badge>
                            <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {discussion.upvotes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {discussion.replies}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="my" className="p-4 m-0">
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm">No discussions yet</p>
                  <p className="text-xs mt-1">Start a discussion to see it here</p>
                </div>
              </TabsContent>

              <TabsContent value="following" className="p-4 m-0">
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm">Not following any discussions</p>
                  <p className="text-xs mt-1">Follow discussions to track updates</p>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Panel Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E7EB] bg-white">
            <Button className="w-full bg-[#ee3224] hover:bg-[#cc2a1e]">
              <Plus className="h-4 w-4 mr-2" />
              Start New Discussion
            </Button>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">Documentation</a>
              <a href="#" className="hover:text-foreground">Tutorials</a>
              <a href="#" className="hover:text-foreground">Support</a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </AppLayout>
  )
}
