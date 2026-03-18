"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Puzzle,
  Download,
  Star,
  ExternalLink,
  Settings,
  Power,
  CheckCircle,
  AlertCircle,
  Code,
  Database,
  Cloud,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Image,
  Filter,
  X,
  ArrowUp,
  Flag,
  Reply,
  Eye,
  Tag,
  Plus,
  Check,
} from "lucide-react"

const plugins = [
  {
    id: 1,
    name: "OpenAI GPT-4",
    description: "Advanced language model integration",
    author: "OpenAI",
    authorId: "openai",
    category: "AI Models",
    icon: Code,
    downloads: "125K",
    rating: 4.9,
    installed: true,
    enabled: true,
    version: "2.1.0",
    commentCount: 156,
  },
  {
    id: 2,
    name: "Anthropic Claude",
    description: "Claude AI model connector",
    author: "Anthropic",
    authorId: "anthropic",
    category: "AI Models",
    icon: Code,
    downloads: "89K",
    rating: 4.8,
    installed: true,
    enabled: true,
    version: "1.3.0",
    commentCount: 89,
  },
  {
    id: 3,
    name: "PostgreSQL Connector",
    description: "Database integration for PostgreSQL",
    author: "DB Tools",
    authorId: "dbtools",
    category: "Databases",
    icon: Database,
    downloads: "67K",
    rating: 4.7,
    installed: true,
    enabled: false,
    version: "3.0.1",
    commentCount: 45,
  },
  {
    id: 4,
    name: "AWS S3 Storage",
    description: "Cloud storage integration",
    author: "AWS",
    authorId: "aws",
    category: "Cloud",
    icon: Cloud,
    downloads: "54K",
    rating: 4.6,
    installed: false,
    enabled: false,
    version: "1.8.0",
    commentCount: 32,
  },
  {
    id: 5,
    name: "Gmail Integration",
    description: "Email sending and receiving",
    author: "Google",
    authorId: "google",
    category: "Communication",
    icon: Mail,
    downloads: "92K",
    rating: 4.8,
    installed: true,
    enabled: true,
    version: "2.4.0",
    commentCount: 78,
  },
  {
    id: 6,
    name: "Google Calendar",
    description: "Calendar management and scheduling",
    author: "Google",
    authorId: "google",
    category: "Productivity",
    icon: Calendar,
    downloads: "78K",
    rating: 4.7,
    installed: false,
    enabled: false,
    version: "1.6.0",
    commentCount: 41,
  },
  {
    id: 7,
    name: "Slack Connector",
    description: "Team messaging integration",
    author: "Slack",
    authorId: "slack",
    category: "Communication",
    icon: MessageSquare,
    downloads: "85K",
    rating: 4.8,
    installed: true,
    enabled: true,
    version: "2.2.0",
    commentCount: 67,
  },
  {
    id: 8,
    name: "Notion API",
    description: "Document and knowledge base sync",
    author: "Notion",
    authorId: "notion",
    category: "Productivity",
    icon: FileText,
    downloads: "45K",
    rating: 4.6,
    installed: false,
    enabled: false,
    version: "1.4.0",
    commentCount: 28,
  },
  {
    id: 9,
    name: "DALL-E 3",
    description: "AI image generation",
    author: "OpenAI",
    authorId: "openai",
    category: "AI Models",
    icon: Image,
    downloads: "112K",
    rating: 4.9,
    installed: true,
    enabled: true,
    version: "1.0.0",
    commentCount: 134,
  },
]

// Mock discussions for plugins
const mockDiscussions = [
  {
    id: 1,
    title: "How to handle rate limiting?",
    category: "qa",
    upvotes: 24,
    replyCount: 5,
    viewCount: 312,
    isAnswered: true,
    author: { name: "Dev User", avatar: "/avatars/dev.jpg", isCreator: false },
    timestamp: "4 hours ago",
    content: "I'm hitting rate limits when making multiple API calls. What's the recommended way to handle this gracefully?",
    replies: [
      {
        id: 101,
        author: { name: "OpenAI", avatar: "/avatars/openai.jpg", isCreator: true },
        content: "We recommend implementing exponential backoff with jitter. Check our rate limiting guide in the documentation for code examples.",
        timestamp: "3 hours ago",
        upvotes: 18,
      },
    ],
  },
  {
    id: 2,
    title: "Feature Request: Streaming responses",
    category: "idea",
    upvotes: 56,
    replyCount: 12,
    viewCount: 489,
    isAnswered: false,
    author: { name: "AI Builder", avatar: "/avatars/ai.jpg", isCreator: false },
    timestamp: "2 days ago",
    content: "It would be great to have native streaming support for responses. Currently we have to poll for completions.",
    replies: [],
  },
  {
    id: 3,
    title: "Bug: Connection drops after 30 seconds",
    category: "bug",
    upvotes: 11,
    replyCount: 4,
    viewCount: 145,
    isAnswered: true,
    author: { name: "Backend Dev", avatar: "/avatars/backend.jpg", isCreator: false },
    timestamp: "3 days ago",
    content: "Websocket connections are dropping after exactly 30 seconds. This seems to be a timeout issue on the plugin side.",
    replies: [
      {
        id: 301,
        author: { name: "OpenAI", avatar: "/avatars/openai.jpg", isCreator: true },
        content: "Fixed in v2.1.1. Please update your plugin and implement ping/pong heartbeats as shown in the docs.",
        timestamp: "2 days ago",
        upvotes: 8,
      },
    ],
  },
]

const categories = ["All", "AI Models", "Databases", "Cloud", "Communication", "Productivity"]

const categoryColors: Record<string, { bg: string; text: string }> = {
  qa: { bg: "bg-blue-100", text: "text-blue-700" },
  bug: { bg: "bg-red-100", text: "text-red-700" },
  idea: { bg: "bg-purple-100", text: "text-purple-700" },
  general: { bg: "bg-gray-100", text: "text-gray-700" },
}

const categoryLabels: Record<string, string> = {
  qa: "Q&A",
  bug: "Bug",
  idea: "Idea",
  general: "General",
}

export default function PluginsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedPlugin, setSelectedPlugin] = useState<typeof plugins[0] | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [discussions, setDiscussions] = useState(mockDiscussions)
  const [discussionFilter, setDiscussionFilter] = useState("all")
  const [discussionSort, setDiscussionSort] = useState("upvotes")
  const [discussionSearch, setDiscussionSearch] = useState("")
  const [upvotedThreads, setUpvotedThreads] = useState<Set<number>>(new Set())
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set())
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")
  const [newDiscussion, setNewDiscussion] = useState({ title: "", category: "qa", body: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedFilter = localStorage.getItem("pluginDiscussionFilter")
    const savedSort = localStorage.getItem("pluginDiscussionSort")
    if (savedFilter) setDiscussionFilter(savedFilter)
    if (savedSort) setDiscussionSort(savedSort)
  }, [])

  useEffect(() => {
    localStorage.setItem("pluginDiscussionFilter", discussionFilter)
    localStorage.setItem("pluginDiscussionSort", discussionSort)
  }, [discussionFilter, discussionSort])

  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || plugin.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const filteredDiscussions = discussions
    .filter((d) => {
      if (discussionFilter === "all") return true
      if (discussionFilter === "unanswered") return d.category === "qa" && !d.isAnswered
      if (discussionFilter === "creator") return d.replies.some((r) => r.author.isCreator)
      return d.category === discussionFilter
    })
    .filter((d) => {
      if (!discussionSearch) return true
      const query = discussionSearch.toLowerCase()
      return d.title.toLowerCase().includes(query) || d.content.toLowerCase().includes(query)
    })
    .sort((a, b) => {
      if (discussionSort === "upvotes") return b.upvotes - a.upvotes
      if (discussionSort === "replies") return b.replyCount - a.replyCount
      return 0
    })

  const handleUpvote = (threadId: number) => {
    const newUpvoted = new Set(upvotedThreads)
    if (newUpvoted.has(threadId)) {
      newUpvoted.delete(threadId)
      setDiscussions((prev) => prev.map((d) => (d.id === threadId ? { ...d, upvotes: d.upvotes - 1 } : d)))
    } else {
      newUpvoted.add(threadId)
      setDiscussions((prev) => prev.map((d) => (d.id === threadId ? { ...d, upvotes: d.upvotes + 1 } : d)))
      toast({ title: "Upvoted", description: "You upvoted this discussion" })
    }
    setUpvotedThreads(newUpvoted)
  }

  const handleMarkAsAnswered = (threadId: number) => {
    setDiscussions((prev) => prev.map((d) => (d.id === threadId ? { ...d, isAnswered: true } : d)))
    toast({ title: "Marked as Answered", description: "This question has been marked as answered" })
  }

  const handlePostReply = (threadId: number) => {
    if (!replyContent.trim()) return
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === threadId
          ? {
              ...d,
              replyCount: d.replyCount + 1,
              replies: [
                ...d.replies,
                {
                  id: Date.now(),
                  author: { name: "You", avatar: "/avatars/you.jpg", isCreator: false },
                  content: replyContent,
                  timestamp: "Just now",
                  upvotes: 0,
                },
              ],
            }
          : d
      )
    )
    setReplyContent("")
    setReplyingTo(null)
    toast({ title: "Reply Posted", description: "Your reply has been posted" })
  }

  const handlePostNewDiscussion = () => {
    if (!newDiscussion.title.trim() || newDiscussion.title.length < 5) {
      toast({ title: "Error", description: "Title must be at least 5 characters", variant: "destructive" })
      return
    }
    if (!newDiscussion.body.trim() || newDiscussion.body.length < 10) {
      toast({ title: "Error", description: "Body must be at least 10 characters", variant: "destructive" })
      return
    }
    const newThread = {
      id: Date.now(),
      title: newDiscussion.title,
      category: newDiscussion.category,
      upvotes: 0,
      replyCount: 0,
      viewCount: 0,
      isAnswered: false,
      author: { name: "You", avatar: "/avatars/you.jpg", isCreator: false },
      timestamp: "Just now",
      content: newDiscussion.body,
      replies: [],
    }
    setDiscussions((prev) => [newThread, ...prev])
    setShowNewDiscussionModal(false)
    setNewDiscussion({ title: "", category: "qa", body: "" })
    toast({ title: "Discussion Posted", description: "Your discussion has been posted" })
  }

  const handleSubmitReport = () => {
    if (!reportReason) {
      toast({ title: "Error", description: "Please select a reason", variant: "destructive" })
      return
    }
    setShowReportModal(false)
    setReportReason("")
    setReportDetails("")
    toast({ title: "Report Submitted", description: "Thank you. Our team will review this report within 24 hours." })
  }

  const openPluginModal = (plugin: typeof plugins[0], tab = "overview") => {
    setSelectedPlugin(plugin)
    setActiveTab(tab)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  const clearFilters = () => {
    setDiscussionFilter("all")
    setDiscussionSort("upvotes")
    setDiscussionSearch("")
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Plugins</h1>
            <p className="mt-2 text-sm text-[#6B7280] max-w-[600px]">
              Extend your agents with reusable components and integrations.
            </p>
          </div>
          <Button className="gap-2">
            <Puzzle className="h-4 w-4" /> Develop Plugin
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search plugins..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="popular">
              <SelectTrigger className="w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="downloads">Most Downloads</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </CardContent>
        </Card>

        {/* Installed Plugins */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Installed Plugins</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plugins.filter((p) => p.installed).map((plugin) => (
              <Card key={plugin.id} className="transition-all hover:border-primary cursor-pointer" onClick={() => openPluginModal(plugin)}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <plugin.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{plugin.name}</h4>
                        <Badge variant="secondary" className="text-xs">v{plugin.version}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{plugin.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Switch checked={plugin.enabled} />
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Plugins */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Available Plugins</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlugins.map((plugin) => (
              <Card key={plugin.id} className="cursor-pointer transition-all hover:border-primary hover:shadow-md" onClick={() => openPluginModal(plugin)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <plugin.icon className="h-6 w-6 text-primary" />
                    </div>
                    {plugin.installed ? (
                      <Badge className="bg-chart-3"><CheckCircle className="mr-1 h-3 w-3" /> Installed</Badge>
                    ) : (
                      <Badge variant="secondary">Available</Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-medium">{plugin.name}</CardTitle>
                  <CardDescription className="text-sm">{plugin.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary">{plugin.category}</Badge>
                    <span className="text-xs text-muted-foreground">v{plugin.version}</span>
                  </div>
                  {/* Metrics row with comment count */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {plugin.rating}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Rating</TooltipContent>
                    </Tooltip>
                    <span className="text-[#E5E7EB]">|</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="flex items-center gap-1 hover:text-[#ee3224] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            openPluginModal(plugin, "discussions")
                          }}
                        >
                          <MessageSquare className="h-3.5 w-3.5" /> {plugin.commentCount}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{plugin.commentCount} discussions about this plugin</TooltipContent>
                    </Tooltip>
                    <span className="text-[#E5E7EB]">|</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <Download className="h-3.5 w-3.5" /> {plugin.downloads}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Downloads</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink className="h-3 w-3" /> Docs
                    </Button>
                    {plugin.installed ? (
                      <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                        <Settings className="h-3 w-3" /> Configure
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                        <Download className="h-3 w-3" /> Install
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                <Puzzle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">847</p>
                <p className="text-sm text-muted-foreground">Total Plugins</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/10">
                <Power className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">6</p>
                <p className="text-sm text-muted-foreground">Installed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-3/10">
                <CheckCircle className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-4/10">
                <AlertCircle className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Updates Available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Asset Detail Modal */}
      <Dialog open={!!selectedPlugin} onOpenChange={(open) => !open && setSelectedPlugin(null)}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-0">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                {selectedPlugin && <selectedPlugin.icon className="h-8 w-8 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-xl">{selectedPlugin?.name}</DialogTitle>
                  <Badge variant="secondary">v{selectedPlugin?.version}</Badge>
                </div>
                <DialogDescription className="mt-1">{selectedPlugin?.description}</DialogDescription>
                <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>by {selectedPlugin?.author}</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {selectedPlugin?.rating}</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> {selectedPlugin?.downloads}</span>
                </div>
              </div>
              {selectedPlugin?.installed ? (
                <Button variant="outline" className="gap-2"><Settings className="h-4 w-4" /> Configure</Button>
              ) : (
                <Button className="gap-2"><Download className="h-4 w-4" /> Install</Button>
              )}
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden mt-4">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2">Overview</TabsTrigger>
              <TabsTrigger value="documentation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2">Documentation</TabsTrigger>
              <TabsTrigger value="changelog" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2">Changelog</TabsTrigger>
              <TabsTrigger value="discussions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 gap-1">
                <MessageSquare className="h-4 w-4" /> Discussions
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{selectedPlugin?.commentCount}</Badge>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="overview" className="m-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-2">About</h3>
                    <p className="text-sm text-[#6B7280]">{selectedPlugin?.description}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentation" className="m-0">
                <p className="text-sm text-[#6B7280]">Documentation for {selectedPlugin?.name}</p>
              </TabsContent>

              <TabsContent value="changelog" className="m-0">
                <p className="text-sm text-[#6B7280]">Changelog for {selectedPlugin?.name}</p>
              </TabsContent>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="m-0 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#1F2937] flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Discussions
                  </h3>
                  <p className="text-sm text-[#6B7280]">Ask questions, report issues, and connect with the developer</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Select value={discussionFilter} onValueChange={setDiscussionFilter}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="All Discussions" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Discussions</SelectItem>
                      <SelectItem value="qa">Q&A</SelectItem>
                      <SelectItem value="bug">Bugs</SelectItem>
                      <SelectItem value="idea">Ideas</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="unanswered">Unanswered</SelectItem>
                      <SelectItem value="creator">Developer Responses</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={discussionSort} onValueChange={setDiscussionSort}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upvotes">Most Upvoted</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="replies">Most Replies</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1 min-w-48">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search discussions..." className="pl-10 pr-8" value={discussionSearch} onChange={(e) => setDiscussionSearch(e.target.value)} />
                    {discussionSearch && (
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setDiscussionSearch("")}>
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {isLoading && (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-[#F5F7FA] rounded-xl p-5 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                )}

                {!isLoading && filteredDiscussions.length === 0 && discussionFilter === "all" && !discussionSearch && (
                  <div className="text-center py-12">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F7FA]">
                      <MessageSquare className="h-8 w-8 text-[#C0C6CA]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#1F2937] mb-2">No discussions yet</h4>
                    <p className="text-sm text-[#6B7280] mb-4">Be the first to start a discussion about this plugin</p>
                    <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => setShowNewDiscussionModal(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Start New Discussion
                    </Button>
                  </div>
                )}

                {!isLoading && filteredDiscussions.length === 0 && (discussionFilter !== "all" || discussionSearch) && (
                  <div className="text-center py-12">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F7FA]">
                      <Search className="h-8 w-8 text-[#C0C6CA]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#1F2937] mb-2">No discussions match your filters</h4>
                    <p className="text-sm text-[#6B7280] mb-4">Try adjusting your filters or search query</p>
                    <button className="text-[#ee3224] text-sm font-medium hover:underline" onClick={clearFilters}>Clear all filters</button>
                  </div>
                )}

                {!isLoading && filteredDiscussions.length > 0 && (
                  <div className="space-y-4">
                    {filteredDiscussions.map((thread) => (
                      <div key={thread.id} className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-[#1F2937]">{thread.title}</h4>
                              <Badge className={`${categoryColors[thread.category].bg} ${categoryColors[thread.category].text} text-xs`}>{categoryLabels[thread.category]}</Badge>
                              {thread.isAnswered && <Badge className="bg-[#22C55E] text-white text-xs gap-0.5"><Check className="h-3 w-3" /> Answered</Badge>}
                              {thread.category === "qa" && !thread.isAnswered && <Badge className="bg-[#F59E0B] text-white text-xs">Unanswered</Badge>}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                              <Avatar className="h-5 w-5"><AvatarFallback>{thread.author.name[0]}</AvatarFallback></Avatar>
                              <span className="font-medium">{thread.author.name}</span>
                              {thread.author.isCreator && <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 gap-0.5"><Tag className="h-2.5 w-2.5" /> Developer</Badge>}
                              <span>{thread.timestamp}</span>
                            </div>
                          </div>
                          <button
                            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg border transition-colors ${upvotedThreads.has(thread.id) ? "border-[#ee3224] bg-[#FEF2F2] text-[#ee3224]" : "border-[#E5E7EB] hover:border-[#ee3224] text-[#6B7280] hover:text-[#ee3224]"}`}
                            onClick={() => handleUpvote(thread.id)}
                          >
                            <ArrowUp className="h-4 w-4" />
                            <span className="text-xs font-medium">{thread.upvotes}</span>
                          </button>
                        </div>
                        <p className="mt-3 text-sm text-[#333]">{thread.content}</p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-[#6B7280]">
                          <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {thread.replyCount} replies</span>
                          <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {thread.viewCount} views</span>
                          <button className="flex items-center gap-1 hover:text-[#ee3224]" onClick={() => { setReplyingTo(thread.id); setExpandedReplies((prev) => new Set([...prev, thread.id])) }}>
                            <Reply className="h-3.5 w-3.5" /> Reply
                          </button>
                          <button className="flex items-center gap-1 hover:text-[#ee3224]" onClick={() => setShowReportModal(true)}>
                            <Flag className="h-3.5 w-3.5" /> Report
                          </button>
                          {thread.category === "qa" && !thread.isAnswered && (
                            <button className="flex items-center gap-1 text-[#22C55E] hover:text-[#16A34A] ml-auto" onClick={() => handleMarkAsAnswered(thread.id)}>
                              <CheckCircle className="h-3.5 w-3.5" /> Mark as Answered
                            </button>
                          )}
                        </div>

                        {thread.replies.length > 0 && (
                          <div className="mt-4">
                            <button className="text-xs text-[#6B7280] hover:text-[#1F2937] mb-2" onClick={() => setExpandedReplies((prev) => { const next = new Set(prev); if (next.has(thread.id)) next.delete(thread.id); else next.add(thread.id); return next })}>
                              {expandedReplies.has(thread.id) ? "Hide" : "Show"} {thread.replies.length} replies
                            </button>
                            {expandedReplies.has(thread.id) && (
                              <div className="ml-6 border-l-2 border-[#E5E7EB] pl-4 space-y-3">
                                {thread.replies.map((reply) => (
                                  <div key={reply.id} className={`p-3 rounded-lg ${reply.author.isCreator ? "bg-[#FEF2F2] border-l-[3px] border-[#ee3224]" : "bg-[#F5F7FA]"}`}>
                                    {reply.author.isCreator && <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 mb-2">Developer Response</Badge>}
                                    <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
                                      <Avatar className="h-4 w-4"><AvatarFallback>{reply.author.name[0]}</AvatarFallback></Avatar>
                                      <span className="font-medium">{reply.author.name}</span>
                                      {reply.author.isCreator && <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 gap-0.5"><Tag className="h-2.5 w-2.5" /> Developer</Badge>}
                                      <span>{reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-[#333]">{reply.content}</p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-[#6B7280]">
                                      <button className="flex items-center gap-1 hover:text-[#ee3224]"><ArrowUp className="h-3 w-3" /> {reply.upvotes}</button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {replyingTo === thread.id && (
                          <div className="mt-4 ml-6 border-l-2 border-[#E5E7EB] pl-4">
                            <Textarea placeholder="Write a reply..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} className="min-h-20 text-sm" />
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => handlePostReply(thread.id)}>Post Reply</Button>
                              <Button size="sm" variant="ghost" onClick={() => { setReplyingTo(null); setReplyContent("") }}>Cancel</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-[#6B7280]">Showing 1-{filteredDiscussions.length} of {selectedPlugin?.commentCount} discussions</span>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" className="bg-[#ee3224] text-white border-[#ee3224]">1</Button>
                        <Button variant="outline" size="sm">2</Button>
                        <Button variant="outline" size="sm">Next</Button>
                      </div>
                    </div>

                    <Button className="w-full h-10 bg-[#ee3224] hover:bg-[#cc2a1e] gap-2" onClick={() => setShowNewDiscussionModal(true)}>
                      <Plus className="h-4 w-4" /> Start New Discussion
                    </Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* New Discussion Modal */}
      <Dialog open={showNewDiscussionModal} onOpenChange={setShowNewDiscussionModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Start New Discussion</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Title *</label>
              <Input placeholder="Discussion title (5-100 characters)" value={newDiscussion.title} onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })} />
              {newDiscussion.title && newDiscussion.title.length < 5 && <p className="text-xs text-red-600 mt-1">Title must be at least 5 characters</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Category *</label>
              <Select value={newDiscussion.category} onValueChange={(v) => setNewDiscussion({ ...newDiscussion, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="qa">Q&A</SelectItem>
                  <SelectItem value="bug">Bugs</SelectItem>
                  <SelectItem value="idea">Ideas</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Body *</label>
              <Textarea placeholder="What would you like to discuss? (min 10 characters)" value={newDiscussion.body} onChange={(e) => setNewDiscussion({ ...newDiscussion, body: e.target.value })} className="min-h-32" />
              {newDiscussion.body && newDiscussion.body.length < 10 && <p className="text-xs text-red-600 mt-1">Body must be at least 10 characters</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowNewDiscussionModal(false)}>Cancel</Button>
            <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={handlePostNewDiscussion} disabled={!newDiscussion.title || newDiscussion.title.length < 5 || !newDiscussion.body || newDiscussion.body.length < 10}>Post Discussion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Report Discussion</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Reason *</label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger><SelectValue placeholder="Select a reason" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="spam">Spam or promotional content</SelectItem>
                  <SelectItem value="inappropriate">Inappropriate or offensive language</SelectItem>
                  <SelectItem value="misinformation">Misinformation or false claims</SelectItem>
                  <SelectItem value="harassment">Harassment or bullying</SelectItem>
                  <SelectItem value="other">Other (specify)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Additional Details</label>
              <Textarea placeholder="Optional (max 500 characters)" value={reportDetails} onChange={(e) => setReportDetails(e.target.value.slice(0, 500))} className="min-h-20" />
              <p className="text-xs text-[#6B7280] mt-1">{reportDetails.length}/500</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowReportModal(false)}>Cancel</Button>
            <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={handleSubmitReport}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
