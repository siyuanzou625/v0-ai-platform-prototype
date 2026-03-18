"use client"

import { useState, useEffect, useRef } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  Bot,
  Star,
  Download,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
  Heart,
  MessageSquare,
  X,
  ArrowUp,
  Flag,
  Reply,
  Eye,
  Tag,
  Plus,
  Pin,
  Lock,
  Check,
  Loader2,
} from "lucide-react"

// Agent data with comment counts
const agents = [
  {
    id: 1,
    name: "Briefly AI",
    description: "Smart meeting transcription and summary generation",
    author: "AI Labs",
    authorId: "ailabs",
    category: "Productivity",
    downloads: "45.2K",
    rating: 4.9,
    price: "Free",
    verified: true,
    featured: true,
    commentCount: 24,
  },
  {
    id: 2,
    name: "InboxIQ AI",
    description: "Intelligent email triage and auto-response",
    author: "SalesBot Inc",
    authorId: "salesbot",
    category: "Productivity",
    downloads: "32.1K",
    rating: 4.8,
    price: "$29/mo",
    verified: true,
    featured: true,
    commentCount: 31,
  },
  {
    id: 3,
    name: "MindLink AI",
    description: "Knowledge base Q&A and document analysis",
    author: "DocAI",
    authorId: "docai",
    category: "Knowledge",
    downloads: "28.7K",
    rating: 4.7,
    price: "Free",
    verified: true,
    featured: false,
    commentCount: 18,
  },
  {
    id: 4,
    name: "FocusFlow AI",
    description: "Productivity tracking and task prioritization",
    author: "DevTools Co",
    authorId: "devtools",
    category: "Productivity",
    downloads: "56.3K",
    rating: 4.9,
    price: "$19/mo",
    verified: true,
    featured: true,
    commentCount: 12,
  },
  {
    id: 5,
    name: "LocalLens AI",
    description: "Local business discovery and recommendations",
    author: "HR Tech",
    authorId: "hrtech",
    category: "Travel",
    downloads: "18.9K",
    rating: 4.6,
    price: "Free",
    verified: false,
    featured: false,
    commentCount: 8,
  },
  {
    id: 6,
    name: "SlideCraft AI",
    description: "Automated presentation creation from notes",
    author: "DataMind",
    authorId: "datamind",
    category: "Productivity",
    downloads: "41.5K",
    rating: 4.8,
    price: "$49/mo",
    verified: true,
    featured: true,
    commentCount: 27,
  },
  {
    id: 7,
    name: "Content Generator",
    description: "Multi-format content creation assistant",
    author: "Creative AI",
    authorId: "creativeai",
    category: "Content",
    downloads: "67.2K",
    rating: 4.7,
    price: "Free",
    verified: true,
    featured: false,
    commentCount: 42,
  },
  {
    id: 8,
    name: "Legal Document Review",
    description: "Contract analysis and legal compliance",
    author: "LegalTech AI",
    authorId: "legaltech",
    category: "Legal",
    downloads: "12.4K",
    rating: 4.9,
    price: "$99/mo",
    verified: true,
    featured: false,
    commentCount: 15,
  },
]

// Mock discussions for Briefly AI
const mockDiscussions = [
  {
    id: 1,
    title: "How to export summaries to Notion?",
    category: "qa",
    upvotes: 12,
    replyCount: 3,
    viewCount: 156,
    isAnswered: true,
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      isCreator: false,
    },
    timestamp: "2 hours ago",
    content: "I've been using Briefly AI for a week now and love the summaries it generates. However, I'm struggling to find a way to automatically export these summaries to my Notion workspace. Is there a built-in integration or do I need to use a third-party tool?",
    replies: [
      {
        id: 101,
        author: {
          name: "AI Labs",
          avatar: "/avatars/ailabs.jpg",
          isCreator: true,
        },
        content: "Great question! We have a native Notion integration. Go to Settings → Integrations → Notion and connect your workspace. You can then set up automatic exports for all your meeting summaries.",
        timestamp: "1 hour ago",
        upvotes: 8,
      },
      {
        id: 102,
        author: {
          name: "Mike Johnson",
          avatar: "/avatars/mike.jpg",
          isCreator: false,
        },
        content: "The Notion integration works great! I've been using it for a month now.",
        timestamp: "45 min ago",
        upvotes: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Feature Request: Multi-language support",
    category: "idea",
    upvotes: 45,
    replyCount: 8,
    viewCount: 423,
    isAnswered: false,
    author: {
      name: "Carlos Rodriguez",
      avatar: "/avatars/carlos.jpg",
      isCreator: false,
    },
    timestamp: "1 day ago",
    content: "Our team is international and we often have meetings in Spanish and Portuguese. It would be amazing if Briefly AI could transcribe and summarize meetings in multiple languages. Currently it only works well with English.",
    replies: [],
  },
  {
    id: 3,
    title: "Bug: Audio lag on M1 Macs",
    category: "bug",
    upvotes: 8,
    replyCount: 2,
    viewCount: 89,
    isAnswered: true,
    author: {
      name: "Alex Kim",
      avatar: "/avatars/alex.jpg",
      isCreator: false,
    },
    timestamp: "3 days ago",
    content: "I'm experiencing significant audio lag (2-3 seconds) when using Briefly AI on my M1 MacBook Pro. The transcription seems to work but the real-time captions are delayed. Anyone else having this issue?",
    replies: [
      {
        id: 301,
        author: {
          name: "AI Labs",
          avatar: "/avatars/ailabs.jpg",
          isCreator: true,
        },
        content: "Thanks for reporting this! We've identified the issue and pushed a fix in version 2.3.1. Please update your app and let us know if the problem persists.",
        timestamp: "2 days ago",
        upvotes: 5,
      },
    ],
  },
  {
    id: 4,
    title: "Best practices for meeting transcription?",
    category: "general",
    upvotes: 15,
    replyCount: 5,
    viewCount: 234,
    isAnswered: false,
    author: {
      name: "Emily Watson",
      avatar: "/avatars/emily.jpg",
      isCreator: false,
    },
    timestamp: "4 days ago",
    content: "I want to get the most accurate transcriptions possible. What are some tips for microphone placement, room acoustics, and other factors that affect transcription quality?",
    replies: [],
  },
  {
    id: 5,
    title: "Integration with Microsoft Teams?",
    category: "idea",
    upvotes: 34,
    replyCount: 6,
    viewCount: 312,
    isAnswered: true,
    author: {
      name: "David Park",
      avatar: "/avatars/david.jpg",
      isCreator: false,
    },
    timestamp: "1 week ago",
    content: "My company uses Microsoft Teams for all our meetings. Is there a way to integrate Briefly AI directly with Teams so I don't have to manually start recording?",
    replies: [
      {
        id: 501,
        author: {
          name: "AI Labs",
          avatar: "/avatars/ailabs.jpg",
          isCreator: true,
        },
        content: "Great news! We just released our Microsoft Teams integration in version 2.4.0. You can now add Briefly AI as a bot to your Teams meetings for automatic transcription and summarization.",
        timestamp: "5 days ago",
        upvotes: 22,
      },
    ],
  },
  {
    id: 6,
    title: "Error: Failed to connect to Slack",
    category: "bug",
    upvotes: 5,
    replyCount: 4,
    viewCount: 67,
    isAnswered: true,
    author: {
      name: "Lisa Thompson",
      avatar: "/avatars/lisa.jpg",
      isCreator: false,
    },
    timestamp: "1 week ago",
    content: "When I try to connect my Slack workspace, I get an error message saying 'Failed to authenticate with Slack'. I've tried revoking and re-adding the integration but the error persists.",
    replies: [
      {
        id: 601,
        author: {
          name: "AI Labs",
          avatar: "/avatars/ailabs.jpg",
          isCreator: true,
        },
        content: "This is usually caused by outdated OAuth tokens. Please go to Settings → Integrations → Slack, click 'Disconnect', then reconnect using the latest Slack OAuth flow. Make sure you're logged into Slack in your browser first.",
        timestamp: "6 days ago",
        upvotes: 3,
      },
    ],
  },
  {
    id: 7,
    title: "Can this work offline?",
    category: "qa",
    upvotes: 28,
    replyCount: 2,
    viewCount: 198,
    isAnswered: true,
    author: {
      name: "James Wilson",
      avatar: "/avatars/james.jpg",
      isCreator: false,
    },
    timestamp: "2 weeks ago",
    content: "I sometimes have meetings in locations with poor internet connectivity. Is there an offline mode that can at least record the audio and transcribe it later when I'm back online?",
    replies: [
      {
        id: 701,
        author: {
          name: "AI Labs",
          avatar: "/avatars/ailabs.jpg",
          isCreator: true,
        },
        content: "Yes! We have an offline recording mode. Enable it in Settings → General → Offline Mode. Your recordings will be stored locally and automatically transcribed when you reconnect to the internet.",
        timestamp: "12 days ago",
        upvotes: 15,
      },
    ],
  },
  {
    id: 8,
    title: "Love this agent! Any plans for mobile app?",
    category: "general",
    upvotes: 67,
    replyCount: 12,
    viewCount: 534,
    isAnswered: false,
    author: {
      name: "Rachel Green",
      avatar: "/avatars/rachel.jpg",
      isCreator: false,
    },
    timestamp: "3 weeks ago",
    content: "I've been using Briefly AI for 3 months now and it's completely transformed how I handle meetings. The summaries are incredibly accurate and the action item extraction is a game-changer. Any plans for a mobile app so I can review summaries on the go?",
    replies: [],
  },
]

const categories = ["All", "Support", "Sales", "Productivity", "Development", "HR", "Analytics", "Content", "Legal", "Knowledge", "Travel"]

// Discussion category colors
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

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null)
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
  const [reportingThread, setReportingThread] = useState<number | null>(null)
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")
  const [newDiscussion, setNewDiscussion] = useState({ title: "", category: "qa", body: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Load saved preferences
  useEffect(() => {
    const savedFilter = localStorage.getItem("discussionFilter")
    const savedSort = localStorage.getItem("discussionSort")
    if (savedFilter) setDiscussionFilter(savedFilter)
    if (savedSort) setDiscussionSort(savedSort)
  }, [])

  // Save preferences
  useEffect(() => {
    localStorage.setItem("discussionFilter", discussionFilter)
    localStorage.setItem("discussionSort", discussionSort)
  }, [discussionFilter, discussionSort])

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Filter and sort discussions
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
      return (
        d.title.toLowerCase().includes(query) ||
        d.content.toLowerCase().includes(query) ||
        d.author.name.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      if (discussionSort === "upvotes") return b.upvotes - a.upvotes
      if (discussionSort === "newest") return 0 // Would sort by date in real app
      if (discussionSort === "oldest") return 0
      if (discussionSort === "replies") return b.replyCount - a.replyCount
      return 0
    })

  const handleUpvote = (threadId: number) => {
    const newUpvoted = new Set(upvotedThreads)
    if (newUpvoted.has(threadId)) {
      newUpvoted.delete(threadId)
      setDiscussions((prev) =>
        prev.map((d) => (d.id === threadId ? { ...d, upvotes: d.upvotes - 1 } : d))
      )
    } else {
      newUpvoted.add(threadId)
      setDiscussions((prev) =>
        prev.map((d) => (d.id === threadId ? { ...d, upvotes: d.upvotes + 1 } : d))
      )
      toast({ title: "Upvoted", description: "You upvoted this discussion" })
    }
    setUpvotedThreads(newUpvoted)
  }

  const handleMarkAsAnswered = (threadId: number) => {
    setDiscussions((prev) =>
      prev.map((d) => (d.id === threadId ? { ...d, isAnswered: true } : d))
    )
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
    setReportingThread(null)
    toast({ title: "Report Submitted", description: "Thank you. Our team will review this report within 24 hours." })
  }

  const openAgentModal = (agent: typeof agents[0], tab = "overview") => {
    setSelectedAgent(agent)
    setActiveTab(tab)
    setIsLoading(true)
    // Simulate loading
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
            <h1 className="text-xl font-semibold text-foreground">Agents</h1>
            <p className="mt-2 text-sm text-[#6B7280] max-w-[600px]">
              Discover and install AI agents built by the community and experts.
            </p>
          </div>
          <Button className="gap-2">
            <Bot className="h-4 w-4" /> Publish Agent
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="popular">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="downloads">Most Downloads</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Featured Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Featured Agents</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {agents
              .filter((a) => a.featured)
              .map((agent) => (
                <Card
                  key={agent.id}
                  className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
                  onClick={() => openAgentModal(agent)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                        <Bot className="h-6 w-6 text-primary" />
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-medium">{agent.name}</CardTitle>
                      {agent.verified && <CheckCircle className="h-4 w-4 text-chart-2" />}
                    </div>
                    <CardDescription className="text-sm line-clamp-2">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="secondary">{agent.category}</Badge>
                      <Badge variant={agent.price === "Free" ? "default" : "outline"} className={agent.price === "Free" ? "bg-chart-3" : ""}>
                        {agent.price}
                      </Badge>
                    </div>
                    {/* Metrics row with comment count */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {agent.rating}
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
                              openAgentModal(agent, "discussions")
                            }}
                          >
                            <MessageSquare className="h-3.5 w-3.5" /> {agent.commentCount}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>{agent.commentCount} discussions about this agent</TooltipContent>
                      </Tooltip>
                      <span className="text-[#E5E7EB]">|</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-1">
                            <Download className="h-3.5 w-3.5" /> {agent.downloads}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Downloads</TooltipContent>
                      </Tooltip>
                    </div>
                    <Button className="mt-4 w-full" size="sm" onClick={(e) => e.stopPropagation()}>
                      Install <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Agents */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">All Agents</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
                onClick={() => openAgentModal(agent)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium">{agent.name}</CardTitle>
                    {agent.verified && <CheckCircle className="h-4 w-4 text-chart-2" />}
                  </div>
                  <CardDescription className="text-sm line-clamp-2">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-xs text-muted-foreground">by {agent.author}</p>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary">{agent.category}</Badge>
                    <Badge variant={agent.price === "Free" ? "default" : "outline"} className={agent.price === "Free" ? "bg-chart-3" : ""}>
                      {agent.price}
                    </Badge>
                  </div>
                  {/* Metrics row with comment count */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {agent.rating}
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
                            openAgentModal(agent, "discussions")
                          }}
                        >
                          <MessageSquare className="h-3.5 w-3.5" /> {agent.commentCount}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{agent.commentCount} discussions about this agent</TooltipContent>
                    </Tooltip>
                    <span className="text-[#E5E7EB]">|</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <Download className="h-3.5 w-3.5" /> {agent.downloads}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Downloads</TooltipContent>
                    </Tooltip>
                  </div>
                  <Button className="mt-4 w-full" size="sm" onClick={(e) => e.stopPropagation()}>
                    Install <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
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
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">2,847</p>
                <p className="text-sm text-muted-foreground">Total Agents</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/10">
                <Download className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">1.2M</p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-3/10">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">45K</p>
                <p className="text-sm text-muted-foreground">Publishers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-4/10">
                <TrendingUp className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">+24%</p>
                <p className="text-sm text-muted-foreground">Growth This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Asset Detail Modal */}
      <Dialog open={!!selectedAgent} onOpenChange={(open) => !open && setSelectedAgent(null)}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-0">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-xl">{selectedAgent?.name}</DialogTitle>
                  {selectedAgent?.verified && <CheckCircle className="h-5 w-5 text-chart-2" />}
                </div>
                <DialogDescription className="mt-1">{selectedAgent?.description}</DialogDescription>
                <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>by {selectedAgent?.author}</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {selectedAgent?.rating}
                  </span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" /> {selectedAgent?.downloads}
                  </span>
                </div>
              </div>
              <Button className="gap-2">
                Install <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden mt-4">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="documentation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0"
              >
                Documentation
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="discussions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 gap-1 shrink-0"
              >
                <MessageSquare className="h-4 w-4" /> Discussions
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {selectedAgent?.commentCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="versions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0"
              >
                Versions
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="overview" className="m-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-2">About</h3>
                    <p className="text-sm text-[#6B7280]">
                      {selectedAgent?.description} This powerful AI agent helps you automate your workflow and increase productivity.
                      Built with enterprise-grade security and reliability.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-2">Features</h3>
                    <ul className="text-sm text-[#6B7280] space-y-1">
                      <li>- Automatic transcription and summarization</li>
                      <li>- Integration with popular tools (Slack, Notion, Teams)</li>
                      <li>- Action item extraction and tracking</li>
                      <li>- Multi-language support</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentation" className="m-0">
                <div className="text-sm text-[#6B7280]">
                  <h3 className="font-semibold text-[#1F2937] mb-2">Getting Started</h3>
                  <p>Documentation for {selectedAgent?.name} will appear here.</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="m-0">
                <div className="text-sm text-[#6B7280]">
                  <h3 className="font-semibold text-[#1F2937] mb-2">User Reviews</h3>
                  <p>Reviews for {selectedAgent?.name} will appear here.</p>
                </div>
              </TabsContent>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="m-0 space-y-4">
                {/* Discussions Header */}
                <div>
                  <h3 className="font-semibold text-[#1F2937] flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Discussions
                  </h3>
                  <p className="text-sm text-[#6B7280]">Ask questions, share tips, and connect with the creator</p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-wrap items-center gap-3">
                  <Select value={discussionFilter} onValueChange={setDiscussionFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Discussions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Discussions</SelectItem>
                      <SelectItem value="qa">Q&A</SelectItem>
                      <SelectItem value="bug">Bugs</SelectItem>
                      <SelectItem value="idea">Ideas</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="unanswered">Unanswered</SelectItem>
                      <SelectItem value="creator">Creator Responses</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={discussionSort} onValueChange={setDiscussionSort}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upvotes">Most Upvoted</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="replies">Most Replies</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1 min-w-48">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search discussions..."
                      className="pl-10 pr-8"
                      value={discussionSearch}
                      onChange={(e) => setDiscussionSearch(e.target.value)}
                    />
                    {discussionSearch && (
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setDiscussionSearch("")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Loading State */}
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

                {/* Empty State */}
                {!isLoading && filteredDiscussions.length === 0 && discussionFilter === "all" && !discussionSearch && (
                  <div className="text-center py-12">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F7FA]">
                      <MessageSquare className="h-8 w-8 text-[#C0C6CA]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#1F2937] mb-2">No discussions yet</h4>
                    <p className="text-sm text-[#6B7280] mb-4">Be the first to start a discussion about this agent</p>
                    <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => setShowNewDiscussionModal(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Start New Discussion
                    </Button>
                  </div>
                )}

                {/* No Results State */}
                {!isLoading && filteredDiscussions.length === 0 && (discussionFilter !== "all" || discussionSearch) && (
                  <div className="text-center py-12">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F7FA]">
                      <Search className="h-8 w-8 text-[#C0C6CA]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#1F2937] mb-2">No discussions match your filters</h4>
                    <p className="text-sm text-[#6B7280] mb-4">Try adjusting your filters or search query</p>
                    <button className="text-[#ee3224] text-sm font-medium hover:underline" onClick={clearFilters}>
                      Clear all filters
                    </button>
                  </div>
                )}

                {/* Discussion Threads */}
                {!isLoading && filteredDiscussions.length > 0 && (
                  <div className="space-y-4">
                    {filteredDiscussions.map((thread) => (
                      <div
                        key={thread.id}
                        className="bg-white border border-[#E5E7EB] rounded-xl p-5"
                      >
                        {/* Thread Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-[#1F2937]">{thread.title}</h4>
                              <Badge className={`${categoryColors[thread.category].bg} ${categoryColors[thread.category].text} text-xs`}>
                                {categoryLabels[thread.category]}
                              </Badge>
                              {thread.isAnswered && (
                                <Badge className="bg-[#22C55E] text-white text-xs gap-0.5">
                                  <Check className="h-3 w-3" /> Answered
                                </Badge>
                              )}
                              {thread.category === "qa" && !thread.isAnswered && (
                                <Badge className="bg-[#F59E0B] text-white text-xs">Unanswered</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={thread.author.avatar} />
                                <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{thread.author.name}</span>
                              {thread.author.isCreator && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 gap-0.5">
                                      <Tag className="h-2.5 w-2.5" /> Creator
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>This is the asset creator</TooltipContent>
                                </Tooltip>
                              )}
                              <span>{thread.timestamp}</span>
                            </div>
                          </div>
                          <button
                            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg border transition-colors ${
                              upvotedThreads.has(thread.id)
                                ? "border-[#ee3224] bg-[#FEF2F2] text-[#ee3224]"
                                : "border-[#E5E7EB] hover:border-[#ee3224] text-[#6B7280] hover:text-[#ee3224]"
                            }`}
                            onClick={() => handleUpvote(thread.id)}
                            aria-label="Upvote this discussion"
                          >
                            <ArrowUp className="h-4 w-4" />
                            <span className="text-xs font-medium">{thread.upvotes}</span>
                          </button>
                        </div>

                        {/* Thread Content */}
                        <p className="mt-3 text-sm text-[#333]">{thread.content}</p>

                        {/* Thread Engagement Row */}
                        <div className="mt-4 flex items-center gap-4 text-xs text-[#6B7280]">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" /> {thread.replyCount} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" /> {thread.viewCount} views
                          </span>
                          <button
                            className="flex items-center gap-1 hover:text-[#ee3224] transition-colors"
                            onClick={() => {
                              setReplyingTo(thread.id)
                              setExpandedReplies((prev) => new Set([...prev, thread.id]))
                            }}
                            aria-label="Reply to this discussion"
                          >
                            <Reply className="h-3.5 w-3.5" /> Reply
                          </button>
                          <button
                            className="flex items-center gap-1 hover:text-[#ee3224] transition-colors"
                            onClick={() => {
                              setReportingThread(thread.id)
                              setShowReportModal(true)
                            }}
                            aria-label="Report this discussion"
                          >
                            <Flag className="h-3.5 w-3.5" /> Report
                          </button>
                          {thread.category === "qa" && !thread.isAnswered && (
                            <button
                              className="flex items-center gap-1 text-[#22C55E] hover:text-[#16A34A] transition-colors ml-auto"
                              onClick={() => handleMarkAsAnswered(thread.id)}
                            >
                              <CheckCircle className="h-3.5 w-3.5" /> Mark as Answered
                            </button>
                          )}
                        </div>

                        {/* Replies */}
                        {thread.replies.length > 0 && (
                          <div className="mt-4">
                            <button
                              className="text-xs text-[#6B7280] hover:text-[#1F2937] mb-2"
                              onClick={() => {
                                setExpandedReplies((prev) => {
                                  const next = new Set(prev)
                                  if (next.has(thread.id)) next.delete(thread.id)
                                  else next.add(thread.id)
                                  return next
                                })
                              }}
                            >
                              {expandedReplies.has(thread.id) ? "Hide" : "Show"} {thread.replies.length} replies
                            </button>
                            {expandedReplies.has(thread.id) && (
                              <div className="ml-6 border-l-2 border-[#E5E7EB] pl-4 space-y-3">
                                {thread.replies.map((reply) => (
                                  <div
                                    key={reply.id}
                                    className={`p-3 rounded-lg ${
                                      reply.author.isCreator
                                        ? "bg-[#FEF2F2] border-l-[3px] border-[#ee3224]"
                                        : "bg-[#F5F7FA]"
                                    }`}
                                  >
                                    {reply.author.isCreator && (
                                      <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 mb-2">
                                        Creator Response
                                      </Badge>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
                                      <Avatar className="h-4 w-4">
                                        <AvatarImage src={reply.author.avatar} />
                                        <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">{reply.author.name}</span>
                                      {reply.author.isCreator && (
                                        <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 gap-0.5">
                                          <Tag className="h-2.5 w-2.5" /> Creator
                                        </Badge>
                                      )}
                                      <span>{reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-[#333]">{reply.content}</p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-[#6B7280]">
                                      <button className="flex items-center gap-1 hover:text-[#ee3224]">
                                        <ArrowUp className="h-3 w-3" /> {reply.upvotes}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Reply Composer */}
                        {replyingTo === thread.id && (
                          <div className="mt-4 ml-6 border-l-2 border-[#E5E7EB] pl-4">
                            <Textarea
                              placeholder="Write a reply..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="min-h-20 text-sm"
                            />
                            <div className="mt-2 flex gap-2">
                              <Button
                                size="sm"
                                className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                                onClick={() => handlePostReply(thread.id)}
                              >
                                Post Reply
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setReplyingTo(null)
                                  setReplyContent("")
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-[#6B7280]">
                        Showing 1-{filteredDiscussions.length} of {selectedAgent?.commentCount} discussions
                      </span>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" disabled>
                          Previous
                        </Button>
                        <Button variant="outline" size="sm" className="bg-[#ee3224] text-white border-[#ee3224]">
                          1
                        </Button>
                        <Button variant="outline" size="sm">
                          2
                        </Button>
                        <Button variant="outline" size="sm">
                          3
                        </Button>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </div>

                    {/* Start New Discussion Button */}
                    <Button
                      className="w-full h-10 bg-[#ee3224] hover:bg-[#cc2a1e] gap-2"
                      onClick={() => setShowNewDiscussionModal(true)}
                    >
                      <Plus className="h-4 w-4" /> Start New Discussion
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="versions" className="m-0">
                <div className="text-sm text-[#6B7280]">
                  <h3 className="font-semibold text-[#1F2937] mb-2">Version History</h3>
                  <p>Version history for {selectedAgent?.name} will appear here.</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* New Discussion Modal */}
      <Dialog open={showNewDiscussionModal} onOpenChange={setShowNewDiscussionModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Start New Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Title *</label>
              <Input
                placeholder="Discussion title (5-100 characters)"
                value={newDiscussion.title}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
              />
              {newDiscussion.title && newDiscussion.title.length < 5 && (
                <p className="text-xs text-red-600 mt-1">Title must be at least 5 characters</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Category *</label>
              <Select
                value={newDiscussion.category}
                onValueChange={(v) => setNewDiscussion({ ...newDiscussion, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
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
              <Textarea
                placeholder="What would you like to discuss? (min 10 characters)"
                value={newDiscussion.body}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, body: e.target.value })}
                className="min-h-32"
              />
              {newDiscussion.body && newDiscussion.body.length < 10 && (
                <p className="text-xs text-red-600 mt-1">Body must be at least 10 characters</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowNewDiscussionModal(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#ee3224] hover:bg-[#cc2a1e]"
              onClick={handlePostNewDiscussion}
              disabled={!newDiscussion.title || newDiscussion.title.length < 5 || !newDiscussion.body || newDiscussion.body.length < 10}
            >
              Post Discussion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Report Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1F2937] mb-1 block">Reason *</label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
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
              <Textarea
                placeholder="Optional (max 500 characters)"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value.slice(0, 500))}
                className="min-h-20"
              />
              <p className="text-xs text-[#6B7280] mt-1">{reportDetails.length}/500</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowReportModal(false)}>
              Cancel
            </Button>
            <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={handleSubmitReport}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
