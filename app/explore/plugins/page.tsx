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
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ArrowRight,
  Pencil,
} from "lucide-react"

// Creator data with follower info
const creators: Record<string, {
  id: string
  name: string
  username: string
  verified: boolean
  bio: string
  followers: number
  following: number
  assetsPublished: number
  totalDownloads: string
  avgRating: number
  socialLinks: { github?: string; twitter?: string; linkedin?: string; website?: string }
}> = {
  "openai": {
    id: "openai",
    name: "OpenAI",
    username: "openai",
    verified: true,
    bio: "Creating safe AGI that benefits all of humanity. Developers of GPT-4, DALL-E, and more.",
    followers: 15678,
    following: 12,
    assetsPublished: 3,
    totalDownloads: "337K",
    avgRating: 4.9,
    socialLinks: { github: "https://github.com/openai", twitter: "https://twitter.com/openai", website: "https://openai.com" },
  },
  "anthropic": {
    id: "anthropic",
    name: "Anthropic",
    username: "anthropic",
    verified: true,
    bio: "AI safety company. Developers of Claude, a helpful, harmless, and honest AI assistant.",
    followers: 8923,
    following: 8,
    assetsPublished: 1,
    totalDownloads: "89K",
    avgRating: 4.8,
    socialLinks: { twitter: "https://twitter.com/anthropicai", website: "https://anthropic.com" },
  },
  "dbtools": {
    id: "dbtools",
    name: "DB Tools",
    username: "dbtools",
    verified: true,
    bio: "Database connectivity solutions. Making data accessible across platforms.",
    followers: 2345,
    following: 45,
    assetsPublished: 3,
    totalDownloads: "145K",
    avgRating: 4.7,
    socialLinks: { github: "https://github.com/dbtools" },
  },
  "aws": {
    id: "aws",
    name: "AWS",
    username: "aws",
    verified: true,
    bio: "Amazon Web Services. Cloud computing platform and APIs.",
    followers: 12456,
    following: 5,
    assetsPublished: 8,
    totalDownloads: "234K",
    avgRating: 4.6,
    socialLinks: { twitter: "https://twitter.com/awscloud", website: "https://aws.amazon.com" },
  },
  "google": {
    id: "google",
    name: "Google",
    username: "google",
    verified: true,
    bio: "Organizing the world's information. Google Workspace integrations.",
    followers: 18234,
    following: 10,
    assetsPublished: 6,
    totalDownloads: "456K",
    avgRating: 4.75,
    socialLinks: { twitter: "https://twitter.com/google", website: "https://developers.google.com" },
  },
  "slack": {
    id: "slack",
    name: "Slack",
    username: "slack",
    verified: true,
    bio: "Where work happens. Team collaboration and messaging platform.",
    followers: 6789,
    following: 23,
    assetsPublished: 2,
    totalDownloads: "135K",
    avgRating: 4.8,
    socialLinks: { twitter: "https://twitter.com/slackapi", website: "https://api.slack.com" },
  },
  "notion": {
    id: "notion",
    name: "Notion",
    username: "notion",
    verified: true,
    bio: "All-in-one workspace for notes, docs, wikis, and project management.",
    followers: 5432,
    following: 34,
    assetsPublished: 1,
    totalDownloads: "45K",
    avgRating: 4.6,
    socialLinks: { twitter: "https://twitter.com/notionhq", website: "https://developers.notion.com" },
  },
}

// Mock followers list
const mockFollowers = [
  { id: "user1", name: "Alex Johnson", username: "alexjohnson", verified: true },
  { id: "user2", name: "Sarah Kim", username: "sarahkim", verified: false },
  { id: "user3", name: "Michael Ross", username: "mikeross", verified: false },
  { id: "user4", name: "Emily White", username: "emilywhite", verified: true },
  { id: "user5", name: "David Brown", username: "davidbrown", verified: false },
  { id: "user6", name: "Jennifer Lee", username: "jenniferlee", verified: true },
  { id: "user7", name: "John Doe", username: "johndoe", verified: false },
  { id: "user8", name: "Maria Garcia", username: "mariagarcia", verified: false },
]

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

// Format follower count
const formatFollowerCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
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

  // Follow feature state
  const [followedCreators, setFollowedCreators] = useState<Set<string>>(new Set())
  const [creatorFollowerCounts, setCreatorFollowerCounts] = useState<Record<string, number>>({})
  const [showCreatorModal, setShowCreatorModal] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [followersModalType, setFollowersModalType] = useState<"followers" | "following">("followers")
  const [dailyFollowCount, setDailyFollowCount] = useState(0)
  const DAILY_FOLLOW_LIMIT = 50

  // Load follow state from localStorage
  useEffect(() => {
    const savedFollowed = localStorage.getItem("followedCreators")
    if (savedFollowed) {
      setFollowedCreators(new Set(JSON.parse(savedFollowed)))
    }
    const savedDailyCount = localStorage.getItem("dailyFollowCount")
    const savedDailyDate = localStorage.getItem("dailyFollowDate")
    const today = new Date().toDateString()
    if (savedDailyDate === today && savedDailyCount) {
      setDailyFollowCount(parseInt(savedDailyCount))
    } else {
      localStorage.setItem("dailyFollowDate", today)
      localStorage.setItem("dailyFollowCount", "0")
    }
    // Initialize follower counts
    const counts: Record<string, number> = {}
    Object.entries(creators).forEach(([id, creator]) => {
      counts[id] = creator.followers
    })
    setCreatorFollowerCounts(counts)
  }, [])

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

  // Save follow state to localStorage
  useEffect(() => {
    localStorage.setItem("followedCreators", JSON.stringify(Array.from(followedCreators)))
  }, [followedCreators])

  const handleFollow = (creatorId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const creator = creators[creatorId]
    if (!creator) return

    const isFollowing = followedCreators.has(creatorId)

    if (!isFollowing && dailyFollowCount >= DAILY_FOLLOW_LIMIT) {
      toast({
        title: "Daily Follow Limit Reached",
        description: `You've followed ${DAILY_FOLLOW_LIMIT} creators today. Try again tomorrow.`,
        variant: "destructive",
      })
      return
    }

    const newFollowed = new Set(followedCreators)
    if (isFollowing) {
      newFollowed.delete(creatorId)
      setCreatorFollowerCounts(prev => ({ ...prev, [creatorId]: (prev[creatorId] || creator.followers) - 1 }))
      toast({
        title: `Unfollowed ${creator.name}`,
        description: "You won't receive notifications from this creator",
      })
    } else {
      newFollowed.add(creatorId)
      setCreatorFollowerCounts(prev => ({ ...prev, [creatorId]: (prev[creatorId] || creator.followers) + 1 }))
      const newCount = dailyFollowCount + 1
      setDailyFollowCount(newCount)
      localStorage.setItem("dailyFollowCount", newCount.toString())
      toast({
        title: `Now following ${creator.name}`,
        description: "You'll be notified when they publish new assets",
      })
    }
    setFollowedCreators(newFollowed)
  }

  const openCreatorProfile = (creatorId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setSelectedCreator(creatorId)
    setShowCreatorModal(true)
  }

  const openFollowersList = (type: "followers" | "following") => {
    setFollowersModalType(type)
    setShowFollowersModal(true)
  }

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

  const selectedCreatorData = selectedCreator ? creators[selectedCreator] : null

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
            {filteredPlugins.map((plugin) => {
              const creator = creators[plugin.authorId]
              const isFollowing = followedCreators.has(plugin.authorId)
              const followerCount = creatorFollowerCounts[plugin.authorId] || creator?.followers || 0

              return (
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
                    {/* Creator info with Follow button */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-xs text-[#6B7280] hover:text-[#ee3224] hover:underline transition-colors"
                          onClick={(e) => openCreatorProfile(plugin.authorId, e)}
                        >
                          by {plugin.author}
                        </button>
                        {creator?.verified && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-[#22C55E]/10 text-[#22C55E] border-0">
                            Verified
                          </Badge>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => handleFollow(plugin.authorId, e)}
                              className={`ml-auto px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                                isFollowing
                                  ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                                  : "border border-[#6B7280] text-[#6B7280] bg-transparent hover:border-[#ee3224] hover:text-[#ee3224] hover:bg-[#F5F7FA]"
                              }`}
                            >
                              {isFollowing ? (
                                <span className="flex items-center gap-1">
                                  <Check className="h-3 w-3" /> Following
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Plus className="h-3 w-3" /> Follow
                                </span>
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isFollowing ? `Unfollow ${plugin.author}` : `Follow ${plugin.author} for updates`}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      {/* Follower count */}
                      <button
                        className="flex items-center gap-1 mt-1 text-[11px] text-[#6B7280] hover:text-[#ee3224] transition-colors"
                        onClick={(e) => openCreatorProfile(plugin.authorId, e)}
                      >
                        <Users className="h-3 w-3" />
                        {formatFollowerCount(followerCount)} followers
                      </button>
                    </div>

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
                        <Button size="sm" variant="secondary" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
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
              )
            })}
          </div>
        </div>

        {/* Plugin Detail Modal */}
        <Dialog open={!!selectedPlugin} onOpenChange={(open) => !open && setSelectedPlugin(null)}>
          <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col" aria-describedby={undefined}
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {selectedPlugin && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                      <selectedPlugin.icon className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <DialogTitle className="text-xl">{selectedPlugin?.name}</DialogTitle>
                      <Badge variant="secondary">v{selectedPlugin?.version}</Badge>
                      {selectedPlugin?.installed && (
                        <Badge className="bg-chart-3"><CheckCircle className="mr-1 h-3 w-3" /> Installed</Badge>
                      )}
                    </div>
                    <DialogDescription className="mt-1">{selectedPlugin?.description}</DialogDescription>
                    <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                      <button 
                        className="hover:text-[#ee3224] hover:underline transition-colors"
                        onClick={() => selectedPlugin && openCreatorProfile(selectedPlugin.authorId)}
                      >
                        by {selectedPlugin?.author}
                      </button>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-chart-4 text-chart-4" /> {selectedPlugin?.rating}
                      </span>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" /> {selectedPlugin?.downloads}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedPlugin?.installed ? (
                  <div className="flex gap-2">
                    <Switch checked={selectedPlugin?.enabled} />
                    <Button variant="outline" className="gap-2">
                      <Settings className="h-4 w-4" /> Configure
                    </Button>
                  </div>
                ) : (
                  <Button className="gap-2">
                    <Download className="h-4 w-4" /> Install Plugin
                  </Button>
                )}
              </div>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Overview</TabsTrigger>
                <TabsTrigger value="documentation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Documentation</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Reviews</TabsTrigger>
                <TabsTrigger value="discussions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 gap-1 shrink-0">
                  <MessageSquare className="h-4 w-4" /> Discussions
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{selectedPlugin?.commentCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="changelog" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Changelog</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto py-4">
                <TabsContent value="overview" className="m-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Plugin Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category</span>
                          <Badge variant="secondary">{selectedPlugin?.category}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Version</span>
                          <span>{selectedPlugin?.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Downloads</span>
                          <span>{selectedPlugin?.downloads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rating</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {selectedPlugin?.rating}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Requirements</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>No additional requirements</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="documentation" className="m-0">
                  <div className="prose max-w-none">
                    <h3>Getting Started</h3>
                    <p>This plugin provides integration with {selectedPlugin?.name}.</p>
                    <h4>Installation</h4>
                    <p>Click the Install button to add this plugin to your workspace.</p>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="m-0">
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>No reviews yet. Be the first to review!</p>
                  </div>
                </TabsContent>

                <TabsContent value="discussions" className="m-0 space-y-4">
                  {/* Discussion Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-5 w-5 text-[#1F2937]" />
                      <h3 className="text-lg font-semibold text-[#1F2937]">Discussions</h3>
                    </div>
                    <p className="text-sm text-[#6B7280]">Ask questions, share tips, and connect with the creator</p>
                  </div>

                  {/* Filters and Search */}
                  <div className="flex flex-wrap gap-3">
                    <Select value={discussionFilter} onValueChange={setDiscussionFilter}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Discussions</SelectItem>
                        <SelectItem value="qa">Q&A</SelectItem>
                        <SelectItem value="bug">Bugs</SelectItem>
                        <SelectItem value="idea">Ideas</SelectItem>
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
                        <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setDiscussionSearch("")}>
                          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                      )}
                    </div>
                    <Button className="gap-2" onClick={() => setShowNewDiscussionModal(true)}>
                      <Plus className="h-4 w-4" /> New Discussion
                    </Button>
                  </div>

                  {/* Discussion Threads */}
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-lg border p-4 animate-pulse">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                          <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : filteredDiscussions.length === 0 ? (
                    <div className="text-center py-8 border rounded-lg">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-20" />
                      <p className="text-muted-foreground">No discussions found</p>
                      {(discussionFilter !== "all" || discussionSearch) && (
                        <Button variant="link" onClick={clearFilters} className="mt-2 text-[#ee3224]">
                          Clear filters
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredDiscussions.map((discussion) => (
                        <div key={discussion.id} className="rounded-lg border p-4 hover:border-[#E5E7EB] transition-colors">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => handleUpvote(discussion.id)}
                              className={`flex flex-col items-center px-2 py-1 rounded transition-colors ${
                                upvotedThreads.has(discussion.id)
                                  ? "bg-[#ee3224]/10 text-[#ee3224]"
                                  : "hover:bg-[#F5F7FA] text-[#6B7280]"
                              }`}
                            >
                              <ArrowUp className="h-4 w-4" />
                              <span className="text-xs font-medium">{discussion.upvotes}</span>
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <Badge className={`${categoryColors[discussion.category].bg} ${categoryColors[discussion.category].text} text-xs`}>
                                  {categoryLabels[discussion.category]}
                                </Badge>
                                {discussion.category === "qa" && (
                                  <Badge variant={discussion.isAnswered ? "default" : "outline"} className={discussion.isAnswered ? "bg-[#22C55E] text-white" : ""}>
                                    {discussion.isAnswered ? "Answered" : "Unanswered"}
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-medium text-[#1F2937] mb-1">{discussion.title}</h4>
                              <p className="text-sm text-[#6B7280] line-clamp-2 mb-2">{discussion.content}</p>
                              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                                <span className="flex items-center gap-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarFallback className="text-[8px]">{discussion.author.name[0]}</AvatarFallback>
                                  </Avatar>
                                  {discussion.author.name}
                                </span>
                                <span>{discussion.timestamp}</span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" /> {discussion.viewCount}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" /> {discussion.replyCount}
                                </span>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 mt-3">
                                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => setReplyingTo(discussion.id)}>
                                  <Reply className="h-3 w-3" /> Reply
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => setShowReportModal(true)}>
                                  <Flag className="h-3 w-3" /> Report
                                </Button>
                                {discussion.category === "qa" && !discussion.isAnswered && (
                                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-[#22C55E]" onClick={() => handleMarkAsAnswered(discussion.id)}>
                                    <Check className="h-3 w-3" /> Mark Answered
                                  </Button>
                                )}
                              </div>

                              {/* Reply input */}
                              {replyingTo === discussion.id && (
                                <div className="mt-3 flex gap-2">
                                  <Input
                                    placeholder="Write a reply..."
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    className="flex-1"
                                  />
                                  <Button size="sm" onClick={() => handlePostReply(discussion.id)}>Post</Button>
                                  <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
                                </div>
                              )}

                              {/* Replies */}
                              {discussion.replies.length > 0 && (
                                <div className="mt-3">
                                  <button
                                    className="text-xs text-[#ee3224] hover:underline flex items-center gap-1"
                                    onClick={() => {
                                      const newExpanded = new Set(expandedReplies)
                                      if (newExpanded.has(discussion.id)) {
                                        newExpanded.delete(discussion.id)
                                      } else {
                                        newExpanded.add(discussion.id)
                                      }
                                      setExpandedReplies(newExpanded)
                                    }}
                                  >
                                    {expandedReplies.has(discussion.id) ? "Hide" : "Show"} {discussion.replies.length} {discussion.replies.length === 1 ? "reply" : "replies"}
                                  </button>
                                  {expandedReplies.has(discussion.id) && (
                                    <div className="mt-2 space-y-2">
                                      {discussion.replies.map((reply) => (
                                        <div
                                          key={reply.id}
                                          className={`pl-4 py-2 text-sm ${reply.author.isCreator ? "border-l-2 border-[#ee3224] bg-[#ee3224]/5" : "border-l-2 border-[#E5E7EB]"}`}
                                        >
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-[#1F2937]">{reply.author.name}</span>
                                            {reply.author.isCreator && (
                                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-[#ee3224] text-[#ee3224]">
                                                Creator
                                              </Badge>
                                            )}
                                            <span className="text-xs text-[#6B7280]">{reply.timestamp}</span>
                                          </div>
                                          <p className="text-[#333]">{reply.content}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="changelog" className="m-0">
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge>v{selectedPlugin?.version}</Badge>
                        <span className="text-sm text-muted-foreground">Current</span>
                      </div>
                      <p className="text-sm">Latest stable release with bug fixes and performance improvements.</p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Creator Profile Modal */}
        <Dialog open={showCreatorModal} onOpenChange={setShowCreatorModal}>
          <DialogContent className="max-w-2xl" aria-describedby={undefined}
            <DialogHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                  <AvatarFallback className="text-2xl bg-[#F5F7FA]">{selectedCreatorData?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl">{selectedCreatorData?.name}</DialogTitle>
                    {selectedCreatorData?.verified && (
                      <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-0">Verified</Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#6B7280]">@{selectedCreatorData?.username}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      className="text-sm text-[#6B7280] hover:text-[#ee3224] hover:underline"
                      onClick={() => openFollowersList("followers")}
                    >
                      <Users className="h-4 w-4 inline mr-1" />
                      {formatFollowerCount(creatorFollowerCounts[selectedCreator || ""] || selectedCreatorData?.followers || 0)} followers
                    </button>
                    <button
                      className="text-sm text-[#6B7280] hover:text-[#ee3224] hover:underline"
                      onClick={() => openFollowersList("following")}
                    >
                      {selectedCreatorData?.following} following
                    </button>
                    {selectedCreator && (
                      <Button
                        size="sm"
                        onClick={() => handleFollow(selectedCreator)}
                        className={followedCreators.has(selectedCreator) 
                          ? "bg-[#22C55E] hover:bg-[#16A34A]" 
                          : ""}
                      >
                        {followedCreators.has(selectedCreator) ? (
                          <><UserCheck className="h-4 w-4 mr-1" /> Following</>
                        ) : (
                          <><UserPlus className="h-4 w-4 mr-1" /> Follow</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Bio */}
              <div>
                <h4 className="text-sm font-semibold text-[#1F2937] mb-2">Bio</h4>
                <p className="text-sm text-[#333]">{selectedCreatorData?.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-[#F5F7FA]">
                  <div className="text-2xl font-bold text-[#1F2937]">{selectedCreatorData?.assetsPublished}</div>
                  <div className="text-xs text-[#6B7280]">Assets</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#F5F7FA]">
                  <div className="text-2xl font-bold text-[#1F2937]">{selectedCreatorData?.totalDownloads}</div>
                  <div className="text-xs text-[#6B7280]">Downloads</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#F5F7FA]">
                  <div className="text-2xl font-bold text-[#1F2937]">{selectedCreatorData?.avgRating} <Star className="h-4 w-4 inline fill-chart-4 text-chart-4" /></div>
                  <div className="text-xs text-[#6B7280]">Avg Rating</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#F5F7FA]">
                  <div className="text-2xl font-bold text-[#1F2937]">{formatFollowerCount(creatorFollowerCounts[selectedCreator || ""] || selectedCreatorData?.followers || 0)}</div>
                  <div className="text-xs text-[#6B7280]">Followers</div>
                </div>
              </div>

              {/* Published Assets */}
              <div>
                <h4 className="text-sm font-semibold text-[#1F2937] mb-2">Published Plugins ({selectedCreatorData?.assetsPublished})</h4>
                <div className="grid grid-cols-3 gap-3">
                  {plugins.filter(p => p.authorId === selectedCreator).slice(0, 3).map(plugin => (
                    <div key={plugin.id} className="p-3 rounded-lg border hover:border-[#ee3224] cursor-pointer transition-colors" onClick={() => { setShowCreatorModal(false); openPluginModal(plugin); }}>
                      <div className="flex items-center gap-2 mb-1">
                        <plugin.icon className="h-4 w-4 text-[#ee3224]" />
                        <span className="text-sm font-medium truncate">{plugin.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {plugin.rating}</span>
                        <span className="flex items-center gap-0.5"><Download className="h-3 w-3" /> {plugin.downloads}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-2 p-0 h-auto text-[#ee3224] text-sm">
                  View All Plugins <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>

              {/* Social Links */}
              {selectedCreatorData?.socialLinks && Object.keys(selectedCreatorData.socialLinks).length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#1F2937] mb-2">Links</h4>
                  <div className="flex gap-3">
                    {selectedCreatorData.socialLinks.github && (
                      <a href={selectedCreatorData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#ee3224]">
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {selectedCreatorData.socialLinks.twitter && (
                      <a href={selectedCreatorData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#ee3224]">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {selectedCreatorData.socialLinks.linkedin && (
                      <a href={selectedCreatorData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#ee3224]">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {selectedCreatorData.socialLinks.website && (
                      <a href={selectedCreatorData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#ee3224]">
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" disabled className="gap-1">
                <MessageSquare className="h-4 w-4" /> Message <Badge variant="secondary" className="ml-1 text-[10px]">Coming Soon</Badge>
              </Button>
              <Button variant="ghost" className="gap-1">
                <Flag className="h-4 w-4" /> Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Followers/Following List Modal */}
        <Dialog open={showFollowersModal} onOpenChange={setShowFollowersModal}>
          <DialogContent className="max-w-md" aria-describedby={undefined}
            <DialogHeader>
              <DialogTitle>{followersModalType === "followers" ? "Followers" : "Following"}</DialogTitle>
              <DialogDescription>
                {selectedCreatorData?.name} {followersModalType === "followers" 
                  ? `has ${formatFollowerCount(creatorFollowerCounts[selectedCreator || ""] || selectedCreatorData?.followers || 0)} followers`
                  : `is following ${selectedCreatorData?.following} creators`
                }
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {mockFollowers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F5F7FA] transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">{user.name}</span>
                          {user.verified && (
                            <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 bg-[#22C55E]/10 text-[#22C55E]">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-[#6B7280]">@{user.username}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={followedCreators.has(user.id) ? "default" : "outline"}
                      className={`text-xs ${followedCreators.has(user.id) ? "bg-[#22C55E] hover:bg-[#16A34A]" : ""}`}
                      onClick={() => handleFollow(user.id)}
                    >
                      {followedCreators.has(user.id) ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* New Discussion Modal */}
        <Dialog open={showNewDiscussionModal} onOpenChange={setShowNewDiscussionModal}>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
              <DialogDescription>Ask a question or share feedback about this plugin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="What's your question or topic?"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                />
                {newDiscussion.title.length > 0 && newDiscussion.title.length < 5 && (
                  <p className="text-xs text-red-500 mt-1">Title must be at least 5 characters</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newDiscussion.category} onValueChange={(v) => setNewDiscussion(prev => ({ ...prev, category: v }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qa">Q&A</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="idea">Feature Idea</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Provide more details..."
                  value={newDiscussion.body}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, body: e.target.value }))}
                  className="mt-1 min-h-[120px]"
                />
                {newDiscussion.body.length > 0 && newDiscussion.body.length < 10 && (
                  <p className="text-xs text-red-500 mt-1">Description must be at least 10 characters</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewDiscussionModal(false)}>Cancel</Button>
              <Button onClick={handlePostNewDiscussion}>Post Discussion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Report Modal */}
        <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Report Content</DialogTitle>
              <DialogDescription>Help us understand what's wrong with this content</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Reason</label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="inappropriate">Inappropriate content</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="misinformation">Misinformation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Additional Details (Optional)</label>
                <Textarea
                  placeholder="Provide more context..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value.slice(0, 500))}
                  className="mt-1"
                />
                <p className="text-xs text-[#6B7280] mt-1">{reportDetails.length}/500</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReportModal(false)}>Cancel</Button>
              <Button onClick={handleSubmitReport} className="bg-red-500 hover:bg-red-600">Submit Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
