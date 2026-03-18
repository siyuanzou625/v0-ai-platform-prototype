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
import { ScrollArea } from "@/components/ui/scroll-area"
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
  UserPlus,
  UserMinus,
  UserCheck,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Pencil,
  Settings,
  AlertCircle,
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
  "ailabs": {
    id: "ailabs",
    name: "AI Labs",
    username: "ailabs",
    verified: true,
    bio: "Building next-generation AI tools for productivity. Focused on meeting intelligence and workflow automation.",
    followers: 1247,
    following: 45,
    assetsPublished: 3,
    totalDownloads: "95.6K",
    avgRating: 4.87,
    socialLinks: { github: "https://github.com/ailabs", twitter: "https://twitter.com/ailabs" },
  },
  "salesbot": {
    id: "salesbot",
    name: "SalesBot Inc",
    username: "salesbot",
    verified: true,
    bio: "Enterprise sales automation solutions. Helping teams close more deals with AI-powered insights.",
    followers: 892,
    following: 67,
    assetsPublished: 2,
    totalDownloads: "50.3K",
    avgRating: 4.8,
    socialLinks: { linkedin: "https://linkedin.com/company/salesbot" },
  },
  "docai": {
    id: "docai",
    name: "DocAI",
    username: "docai",
    verified: true,
    bio: "Document intelligence and knowledge management. Making information accessible.",
    followers: 654,
    following: 34,
    assetsPublished: 2,
    totalDownloads: "47.1K",
    avgRating: 4.7,
    socialLinks: { github: "https://github.com/docai", website: "https://docai.dev" },
  },
  "devtools": {
    id: "devtools",
    name: "DevTools Co",
    username: "devtools",
    verified: true,
    bio: "Developer productivity tools. Build faster, ship sooner.",
    followers: 1456,
    following: 89,
    assetsPublished: 4,
    totalDownloads: "78.4K",
    avgRating: 4.85,
    socialLinks: { github: "https://github.com/devtools-co", twitter: "https://twitter.com/devtoolsco" },
  },
  "hrtech": {
    id: "hrtech",
    name: "HR Tech",
    username: "hrtech",
    verified: false,
    bio: "HR and recruitment automation solutions.",
    followers: 234,
    following: 56,
    assetsPublished: 1,
    totalDownloads: "18.9K",
    avgRating: 4.6,
    socialLinks: {},
  },
  "datamind": {
    id: "datamind",
    name: "DataMind",
    username: "datamind",
    verified: true,
    bio: "Data analytics and visualization tools powered by AI.",
    followers: 987,
    following: 42,
    assetsPublished: 2,
    totalDownloads: "53.9K",
    avgRating: 4.75,
    socialLinks: { github: "https://github.com/datamind" },
  },
  "creativeai": {
    id: "creativeai",
    name: "Creative AI",
    username: "creativeai",
    verified: true,
    bio: "AI-powered creative tools for content creators and marketers.",
    followers: 2134,
    following: 123,
    assetsPublished: 3,
    totalDownloads: "89.6K",
    avgRating: 4.7,
    socialLinks: { twitter: "https://twitter.com/creativeai", website: "https://creative.ai" },
  },
  "legaltech": {
    id: "legaltech",
    name: "LegalTech AI",
    username: "legaltech",
    verified: true,
    bio: "Legal document analysis and compliance automation.",
    followers: 543,
    following: 28,
    assetsPublished: 1,
    totalDownloads: "12.4K",
    avgRating: 4.9,
    socialLinks: { linkedin: "https://linkedin.com/company/legaltech-ai" },
  },
}

// Agent data with creator info
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
    title: "Pricing tiers explanation needed",
    category: "general",
    upvotes: 19,
    replyCount: 3,
    viewCount: 276,
    isAnswered: true,
    author: {
      name: "Rachel Green",
      avatar: "/avatars/rachel.jpg",
      isCreator: false,
    },
    timestamp: "2 weeks ago",
    content: "I'm confused about the difference between the Pro and Enterprise plans. Can someone explain what features are included in each tier? Specifically interested in the team collaboration features.",
    replies: [],
  },
]

// Mock followers list
const mockFollowers = [
  { id: "u1", name: "Jennifer Lee", username: "jenniferlee", verified: true, isFollowing: false },
  { id: "u2", name: "David Brown", username: "davidbrown", verified: false, isFollowing: true },
  { id: "u3", name: "Emily White", username: "emilywhite", verified: true, isFollowing: false },
  { id: "u4", name: "John Doe", username: "johndoe", verified: false, isFollowing: true },
  { id: "u5", name: "Maria Garcia", username: "mariagarcia", verified: false, isFollowing: false },
  { id: "u6", name: "Alex Johnson", username: "alexjohnson", verified: true, isFollowing: true },
  { id: "u7", name: "Sarah Kim", username: "sarahkim", verified: false, isFollowing: false },
  { id: "u8", name: "Michael Ross", username: "mikeross", verified: false, isFollowing: true },
  { id: "u9", name: "Lisa Chen", username: "lisachen", verified: true, isFollowing: false },
  { id: "u10", name: "Robert Taylor", username: "robtaylor", verified: false, isFollowing: false },
]

// Format number with K suffix
function formatFollowers(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export default function ExploreAgentsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  
  // Follow feature state
  const [followedCreators, setFollowedCreators] = useState<string[]>([])
  const [creatorFollowers, setCreatorFollowers] = useState<Record<string, number>>({})
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)
  const [showCreatorModal, setShowCreatorModal] = useState(false)
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [followersModalType, setFollowersModalType] = useState<"followers" | "following">("followers")
  const [followersList, setFollowersList] = useState(mockFollowers)
  
  // Discussion state
  const [discussions, setDiscussions] = useState(mockDiscussions)
  const [discussionFilter, setDiscussionFilter] = useState("all")
  const [discussionSort, setDiscussionSort] = useState("upvotes")
  const [discussionSearch, setDiscussionSearch] = useState("")
  const [expandedDiscussion, setExpandedDiscussion] = useState<number | null>(null)
  const [showNewDiscussion, setShowNewDiscussion] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportingDiscussionId, setReportingDiscussionId] = useState<number | null>(null)
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("")
  const [newDiscussionCategory, setNewDiscussionCategory] = useState("general")
  const [newDiscussionBody, setNewDiscussionBody] = useState("")
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")
  const [upvotedDiscussions, setUpvotedDiscussions] = useState<number[]>([])
  const [isLoadingDiscussions, setIsLoadingDiscussions] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const discussionsPerPage = 5

  // Initialize follower counts from creator data
  useEffect(() => {
    const initialCounts: Record<string, number> = {}
    Object.entries(creators).forEach(([id, creator]) => {
      initialCounts[id] = creator.followers
    })
    setCreatorFollowers(initialCounts)
    
    // Load followed creators from localStorage
    const saved = localStorage.getItem("followedCreators")
    if (saved) {
      setFollowedCreators(JSON.parse(saved))
    }
  }, [])

  // Save followed creators to localStorage
  useEffect(() => {
    localStorage.setItem("followedCreators", JSON.stringify(followedCreators))
  }, [followedCreators])

  const handleFollow = (creatorId: string, creatorName: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    
    const isFollowing = followedCreators.includes(creatorId)
    
    if (isFollowing) {
      // Unfollow
      setFollowedCreators(prev => prev.filter(id => id !== creatorId))
      setCreatorFollowers(prev => ({
        ...prev,
        [creatorId]: Math.max(0, (prev[creatorId] || 0) - 1)
      }))
      toast({
        title: "Unfollowed " + creatorName,
        description: "You won't receive notifications from this creator",
      })
    } else {
      // Follow
      setFollowedCreators(prev => [...prev, creatorId])
      setCreatorFollowers(prev => ({
        ...prev,
        [creatorId]: (prev[creatorId] || 0) + 1
      }))
      toast({
        title: "Now following " + creatorName,
        description: "You'll be notified when they publish new assets",
      })
    }
  }

  const openCreatorProfile = (creatorId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedCreator(creatorId)
    setShowCreatorModal(true)
  }

  const openFollowersList = (type: "followers" | "following") => {
    setFollowersModalType(type)
    setShowFollowersModal(true)
  }

  const handleFollowFromList = (userId: string, userName: string) => {
    setFollowersList(prev => prev.map(user => 
      user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    ))
    const user = followersList.find(u => u.id === userId)
    if (user?.isFollowing) {
      toast({
        title: "Unfollowed " + userName,
        description: "You won't receive notifications from this user",
      })
    } else {
      toast({
        title: "Now following " + userName,
        description: "You'll be notified when they publish new assets",
      })
    }
  }

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || agent.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(agents.map((a) => a.category.toLowerCase())))]

  // Discussion functions
  const filteredDiscussions = discussions
    .filter((d) => {
      const matchesFilter =
        discussionFilter === "all" ||
        d.category === discussionFilter ||
        (discussionFilter === "unanswered" && !d.isAnswered) ||
        (discussionFilter === "creator" && d.replies.some((r) => r.author.isCreator))
      const matchesSearch =
        discussionSearch === "" ||
        d.title.toLowerCase().includes(discussionSearch.toLowerCase()) ||
        d.content.toLowerCase().includes(discussionSearch.toLowerCase())
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      if (discussionSort === "upvotes") return b.upvotes - a.upvotes
      if (discussionSort === "newest") return a.id < b.id ? 1 : -1
      if (discussionSort === "oldest") return a.id > b.id ? 1 : -1
      if (discussionSort === "replies") return b.replyCount - a.replyCount
      return 0
    })

  const paginatedDiscussions = filteredDiscussions.slice(
    (currentPage - 1) * discussionsPerPage,
    currentPage * discussionsPerPage
  )
  const totalPages = Math.ceil(filteredDiscussions.length / discussionsPerPage)

  const handleUpvote = (discussionId: number) => {
    if (upvotedDiscussions.includes(discussionId)) {
      setUpvotedDiscussions((prev) => prev.filter((id) => id !== discussionId))
      setDiscussions((prev) =>
        prev.map((d) => (d.id === discussionId ? { ...d, upvotes: d.upvotes - 1 } : d))
      )
    } else {
      setUpvotedDiscussions((prev) => [...prev, discussionId])
      setDiscussions((prev) =>
        prev.map((d) => (d.id === discussionId ? { ...d, upvotes: d.upvotes + 1 } : d))
      )
    }
  }

  const handleNewDiscussion = () => {
    if (newDiscussionTitle.length < 5 || newDiscussionBody.length < 10) {
      toast({
        title: "Validation Error",
        description: "Title must be at least 5 characters and body at least 10 characters.",
        variant: "destructive",
      })
      return
    }
    const newDisc = {
      id: discussions.length + 1,
      title: newDiscussionTitle,
      category: newDiscussionCategory,
      upvotes: 0,
      replyCount: 0,
      viewCount: 0,
      isAnswered: false,
      author: { name: "You", avatar: "/avatars/you.jpg", isCreator: false },
      timestamp: "Just now",
      content: newDiscussionBody,
      replies: [],
    }
    setDiscussions((prev) => [newDisc, ...prev])
    setShowNewDiscussion(false)
    setNewDiscussionTitle("")
    setNewDiscussionCategory("general")
    setNewDiscussionBody("")
    toast({ title: "Discussion Created", description: "Your discussion has been posted successfully." })
  }

  const handleReport = () => {
    if (!reportReason) {
      toast({ title: "Please select a reason", variant: "destructive" })
      return
    }
    setShowReportModal(false)
    setReportReason("")
    setReportDetails("")
    toast({ title: "Report Submitted", description: "Thank you for helping keep our community safe." })
  }

  const getCategoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      qa: "bg-blue-100 text-blue-700",
      bug: "bg-red-100 text-red-700",
      idea: "bg-purple-100 text-purple-700",
      general: "bg-gray-100 text-gray-700",
    }
    const labels: Record<string, string> = {
      qa: "Q&A",
      bug: "Bug",
      idea: "Idea",
      general: "General",
    }
    return (
      <Badge className={`${styles[category] || styles.general} text-xs`}>
        {labels[category] || "General"}
      </Badge>
    )
  }

  // Get creator's assets
  const getCreatorAssets = (creatorId: string) => {
    return agents.filter(a => a.authorId === creatorId)
  }

  const currentCreator = selectedCreator ? creators[selectedCreator] : null

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Agents</h1>
            <p className="mt-2 text-sm text-[#6B7280] max-w-[600px]">
              Discover and install AI agents from our marketplace.
            </p>
          </div>
          <Button className="gap-2">
            <Bot className="h-4 w-4" /> Build Agent
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
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Featured Agents */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#ee3224]" />
            Featured Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAgents
              .filter((a) => a.featured)
              .map((agent) => {
                const creator = creators[agent.authorId]
                const isFollowing = followedCreators.includes(agent.authorId)
                const followerCount = creatorFollowers[agent.authorId] || creator?.followers || 0
                
                return (
                  <Card
                    key={agent.id}
                    className="hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedAgent(agent)
                      setActiveTab("overview")
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                            <Bot className="h-5 w-5 text-[#ee3224]" />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {agent.name}
                            </CardTitle>
                          </div>
                        </div>
                        <Badge variant={agent.price === "Free" ? "secondary" : "default"} className="text-xs">
                          {agent.price}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs mt-2 line-clamp-2">{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      {/* Creator row with follow button */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => openCreatorProfile(agent.authorId, e)}
                            className="text-xs text-[#6B7280] hover:text-[#ee3224] hover:underline transition-colors"
                          >
                            by {agent.author}
                          </button>
                          {creator?.verified && (
                            <Badge className="bg-[#22C55E] text-white text-[9px] px-1 py-0 h-4">Verified</Badge>
                          )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => handleFollow(agent.authorId, agent.author, e)}
                                className={`text-[11px] font-medium px-2 py-0.5 rounded transition-colors ${
                                  isFollowing
                                    ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                                    : "border border-[#6B7280] text-[#6B7280] hover:border-[#ee3224] hover:text-[#ee3224] hover:bg-[#F5F7FA]"
                                }`}
                              >
                                {isFollowing ? (
                                  <span className="flex items-center gap-1">
                                    <Check className="h-3 w-3" /> Following
                                  </span>
                                ) : (
                                  "+ Follow"
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isFollowing
                                ? `You're following ${agent.author}. Click to unfollow.`
                                : `Follow to get notified when ${agent.author} publishes new assets`}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <button
                          onClick={(e) => openCreatorProfile(agent.authorId, e)}
                          className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-[#ee3224] transition-colors"
                        >
                          <Users className="h-3 w-3" />
                          {formatFollowers(followerCount)} followers
                        </button>
                      </div>
                      
                      {/* Stats row */}
                      <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-[#F59E0B] fill-[#F59E0B]" />
                              {agent.rating}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Average rating</TooltipContent>
                        </Tooltip>
                        <span className="text-[#E5E7EB]">|</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedAgent(agent)
                                setActiveTab("discussions")
                              }}
                              className="flex items-center gap-1 hover:text-[#ee3224] transition-colors"
                            >
                              <MessageSquare className="h-3 w-3" />
                              {agent.commentCount}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>View discussions</TooltipContent>
                        </Tooltip>
                        <span className="text-[#E5E7EB]">|</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {agent.downloads}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Total downloads</TooltipContent>
                        </Tooltip>
                      </div>
                      {/* Action buttons */}
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                          <Eye className="h-3 w-3" /> Preview
                        </Button>
                        <Button size="sm" className="flex-1 gap-1 bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={(e) => e.stopPropagation()}>
                          <ArrowRight className="h-3 w-3" /> Install
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>

        {/* All Agents */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#1F2937]">All Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAgents.map((agent) => {
              const creator = creators[agent.authorId]
              const isFollowing = followedCreators.includes(agent.authorId)
              const followerCount = creatorFollowers[agent.authorId] || creator?.followers || 0
              
              return (
                <Card
                  key={agent.id}
                  className="hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedAgent(agent)
                    setActiveTab("overview")
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                          <Bot className="h-5 w-5 text-[#6B7280]" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {agent.name}
                          </CardTitle>
                        </div>
                      </div>
                      <Badge variant={agent.price === "Free" ? "secondary" : "default"} className="text-xs">
                        {agent.price}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs mt-2 line-clamp-2">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {/* Creator row with follow button */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => openCreatorProfile(agent.authorId, e)}
                          className="text-xs text-[#6B7280] hover:text-[#ee3224] hover:underline transition-colors"
                        >
                          by {agent.author}
                        </button>
                        {creator?.verified && (
                          <Badge className="bg-[#22C55E] text-white text-[9px] px-1 py-0 h-4">Verified</Badge>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => handleFollow(agent.authorId, agent.author, e)}
                              className={`text-[11px] font-medium px-2 py-0.5 rounded transition-colors ${
                                isFollowing
                                  ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                                  : "border border-[#6B7280] text-[#6B7280] hover:border-[#ee3224] hover:text-[#ee3224] hover:bg-[#F5F7FA]"
                              }`}
                            >
                              {isFollowing ? (
                                <span className="flex items-center gap-1">
                                  <Check className="h-3 w-3" /> Following
                                </span>
                              ) : (
                                "+ Follow"
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isFollowing
                              ? `You're following ${agent.author}. Click to unfollow.`
                              : `Follow to get notified when ${agent.author} publishes new assets`}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <button
                        onClick={(e) => openCreatorProfile(agent.authorId, e)}
                        className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-[#ee3224] transition-colors"
                      >
                        <Users className="h-3 w-3" />
                        {formatFollowers(followerCount)} followers
                      </button>
                    </div>
                    
                    {/* Stats row */}
                    <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-[#F59E0B] fill-[#F59E0B]" />
                            {agent.rating}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Average rating</TooltipContent>
                      </Tooltip>
                      <span className="text-[#E5E7EB]">|</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedAgent(agent)
                              setActiveTab("discussions")
                            }}
                            className="flex items-center gap-1 hover:text-[#ee3224] transition-colors"
                          >
                            <MessageSquare className="h-3 w-3" />
                            {agent.commentCount}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>View discussions</TooltipContent>
                      </Tooltip>
                      <span className="text-[#E5E7EB]">|</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {agent.downloads}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Total downloads</TooltipContent>
                      </Tooltip>
                    </div>
                    {/* Action buttons */}
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                        <Eye className="h-3 w-3" /> Preview
                      </Button>
                      <Button size="sm" className="flex-1 gap-1 bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={(e) => e.stopPropagation()}>
                        <ArrowRight className="h-3 w-3" /> Install
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Agent Detail Modal */}
        <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
<DialogContent
            className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col"
            aria-describedby={undefined}
          >
            <DialogHeader className="pb-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
                    <Bot className="h-7 w-7 text-[#ee3224]" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl flex items-center gap-2">
                      {selectedAgent?.name}
                      {selectedAgent?.verified && (
                        <CheckCircle className="h-5 w-5 text-[#22C55E] fill-[#22C55E]" />
                      )}
                    </DialogTitle>
                    <DialogDescription>{selectedAgent?.description}</DialogDescription>
                    <div className="flex items-center gap-2 mt-1 text-sm text-[#6B7280]">
                      <button
                        onClick={() => selectedAgent && openCreatorProfile(selectedAgent.authorId)}
                        className="hover:text-[#ee3224] hover:underline transition-colors"
                      >
                        by {selectedAgent?.author}
                      </button>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
                        {selectedAgent?.rating}
                      </span>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {selectedAgent?.downloads}
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                  Install <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
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

              <TabsContent value="overview" className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#1F2937]">About this agent</h3>
                  <p className="text-sm text-[#6B7280]">
                    {selectedAgent?.name} is a powerful AI assistant that helps you with {selectedAgent?.category.toLowerCase()} tasks.
                    It features advanced natural language processing and integrates seamlessly with your existing workflow.
                  </p>
                  <h3 className="font-semibold text-[#1F2937]">Key Features</h3>
                  <ul className="list-disc list-inside text-sm text-[#6B7280] space-y-1">
                    <li>Advanced AI processing</li>
                    <li>Real-time collaboration</li>
                    <li>Enterprise-grade security</li>
                    <li>Customizable workflows</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="documentation" className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#1F2937]">Getting Started</h3>
                  <p className="text-sm text-[#6B7280]">
                    Follow these steps to set up {selectedAgent?.name} in your environment.
                  </p>
                  <div className="bg-[#F5F7FA] p-4 rounded-lg">
                    <code className="text-sm">npm install @agents/{selectedAgent?.name.toLowerCase().replace(/\s+/g, "-")}</code>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-2xl font-bold">{selectedAgent?.rating}</span>
                    <span className="text-[#6B7280]">out of 5</span>
                  </div>
                  <p className="text-sm text-[#6B7280]">Based on {Math.floor(Math.random() * 500) + 100} reviews</p>
                </div>
              </TabsContent>

              <TabsContent value="discussions" className="flex-1 overflow-hidden flex flex-col p-4">
                <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#1F2937] flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" /> Discussions
                      </h3>
                      <p className="text-sm text-[#6B7280]">Ask questions, share tips, and connect with the creator</p>
                    </div>
                    <Button onClick={() => setShowNewDiscussion(true)} className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                      <Plus className="h-4 w-4 mr-2" /> New Discussion
                    </Button>
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <Select value={discussionFilter} onValueChange={setDiscussionFilter}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Filter" />
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
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upvotes">Most Upvoted</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="replies">Most Replies</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1 max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                      <Input
                        placeholder="Search discussions..."
                        value={discussionSearch}
                        onChange={(e) => setDiscussionSearch(e.target.value)}
                        className="pl-10"
                      />
                      {discussionSearch && (
                        <button
                          onClick={() => setDiscussionSearch("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <X className="h-4 w-4 text-[#9CA3AF]" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Discussion List */}
                  <ScrollArea className="flex-1">
                    {isLoadingDiscussions ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-[#E5E7EB] rounded w-3/4 mb-2" />
                            <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
                          </div>
                        ))}
                      </div>
                    ) : filteredDiscussions.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 text-[#9CA3AF] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No discussions found</h3>
                        <p className="text-sm text-[#6B7280] mb-4">
                          {discussionSearch || discussionFilter !== "all"
                            ? "Try adjusting your filters"
                            : "Be the first to start a discussion"}
                        </p>
                        {(discussionSearch || discussionFilter !== "all") && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setDiscussionSearch("")
                              setDiscussionFilter("all")
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3 pr-4">
                        {paginatedDiscussions.map((discussion) => (
                          <Card
                            key={discussion.id}
                            className={`hover:shadow-md transition-shadow ${
                              expandedDiscussion === discussion.id ? "border-[#ee3224]" : ""
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                {/* Upvote */}
                                <div className="flex flex-col items-center gap-1">
                                  <button
                                    onClick={() => handleUpvote(discussion.id)}
                                    className={`p-1 rounded hover:bg-[#F5F7FA] transition-colors ${
                                      upvotedDiscussions.includes(discussion.id) ? "text-[#ee3224]" : "text-[#6B7280]"
                                    }`}
                                  >
                                    <ArrowUp className="h-5 w-5" />
                                  </button>
                                  <span
                                    className={`text-sm font-medium ${
                                      upvotedDiscussions.includes(discussion.id) ? "text-[#ee3224]" : "text-[#6B7280]"
                                    }`}
                                  >
                                    {discussion.upvotes}
                                  </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    {getCategoryBadge(discussion.category)}
                                    {discussion.isAnswered && (
                                      <Badge className="bg-[#22C55E] text-white text-xs">Answered</Badge>
                                    )}
                                    <h4
                                      className="font-medium text-[#1F2937] hover:text-[#ee3224] cursor-pointer truncate"
                                      onClick={() =>
                                        setExpandedDiscussion(
                                          expandedDiscussion === discussion.id ? null : discussion.id
                                        )
                                      }
                                    >
                                      {discussion.title}
                                    </h4>
                                  </div>

                                  <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-2">
                                    <span className="flex items-center gap-1">
                                      <Avatar className="h-4 w-4">
                                        <AvatarFallback className="text-[8px]">
                                          {discussion.author.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      {discussion.author.name}
                                      {discussion.author.isCreator && (
                                        <Badge className="bg-[#ee3224] text-white text-[9px] px-1 py-0 ml-1">
                                          Creator
                                        </Badge>
                                      )}
                                    </span>
                                    <span>•</span>
                                    <span>{discussion.timestamp}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <Eye className="h-3 w-3" /> {discussion.viewCount}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <MessageSquare className="h-3 w-3" /> {discussion.replyCount} replies
                                    </span>
                                  </div>

                                  {/* Expanded content */}
                                  {expandedDiscussion === discussion.id && (
                                    <div className="mt-3 space-y-4">
                                      <p className="text-sm text-[#333]">{discussion.content}</p>

                                      {/* Actions */}
                                      <div className="flex items-center gap-3">
                                        <Button variant="ghost" size="sm" className="text-[#6B7280] hover:text-[#ee3224]">
                                          <Reply className="h-4 w-4 mr-1" /> Reply
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-[#6B7280] hover:text-[#ee3224]"
                                          onClick={() => {
                                            setReportingDiscussionId(discussion.id)
                                            setShowReportModal(true)
                                          }}
                                        >
                                          <Flag className="h-4 w-4 mr-1" /> Report
                                        </Button>
                                        {discussion.category === "qa" && !discussion.isAnswered && (
                                          <Button variant="ghost" size="sm" className="text-[#22C55E] hover:text-[#16A34A]">
                                            <Check className="h-4 w-4 mr-1" /> Mark as Answered
                                          </Button>
                                        )}
                                      </div>

                                      {/* Replies */}
                                      {discussion.replies.length > 0 && (
                                        <div className="border-l-2 border-[#E5E7EB] pl-4 space-y-3 mt-4">
                                          {discussion.replies.map((reply) => (
                                            <div
                                              key={reply.id}
                                              className={`${
                                                reply.author.isCreator ? "border-l-2 border-[#ee3224] pl-3 bg-[#FEF2F2]/50 rounded-r-lg py-2" : ""
                                              }`}
                                            >
                                              <div className="flex items-center gap-2 mb-1">
                                                <Avatar className="h-6 w-6">
                                                  <AvatarFallback className="text-xs">
                                                    {reply.author.name.charAt(0)}
                                                  </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium text-[#1F2937]">
                                                  {reply.author.name}
                                                </span>
                                                {reply.author.isCreator && (
                                                  <Badge className="bg-[#ee3224] text-white text-[9px] px-1 py-0">
                                                    Creator
                                                  </Badge>
                                                )}
                                                <span className="text-xs text-[#6B7280]">{reply.timestamp}</span>
                                              </div>
                                              <p className="text-sm text-[#333] ml-8">{reply.content}</p>
                                              <div className="flex items-center gap-2 ml-8 mt-1">
                                                <button className="text-xs text-[#6B7280] hover:text-[#ee3224] flex items-center gap-1">
                                                  <ArrowUp className="h-3 w-3" /> {reply.upvotes}
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="flex items-center justify-between pt-4">
                            <span className="text-sm text-[#6B7280]">
                              Showing {(currentPage - 1) * discussionsPerPage + 1}-
                              {Math.min(currentPage * discussionsPerPage, filteredDiscussions.length)} of{" "}
                              {filteredDiscussions.length}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                              >
                                Previous
                              </Button>
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                  key={page}
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setCurrentPage(page)}
                                  className={currentPage === page ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                                >
                                  {page}
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="versions" className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#1F2937]">Version History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                      <div>
                        <span className="font-medium">v2.4.0</span>
                        <span className="text-sm text-[#6B7280] ml-2">Current</span>
                      </div>
                      <span className="text-sm text-[#6B7280]">Released 2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">v2.3.1</span>
                      <span className="text-sm text-[#6B7280]">Released 1 week ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">v2.3.0</span>
                      <span className="text-sm text-[#6B7280]">Released 2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Creator Profile Modal */}
        <Dialog open={showCreatorModal} onOpenChange={setShowCreatorModal}>
          <DialogContent className="max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
            {currentCreator && (
              <>
                <DialogHeader className="pb-4 border-b">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20 border-2 border-[#E5E7EB]">
                      <AvatarFallback className="bg-[#FEF2F2] text-[#ee3224] text-2xl font-semibold">
                        {currentCreator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <DialogTitle className="text-xl">{currentCreator.name}</DialogTitle>
                        {currentCreator.verified && (
                          <Badge className="bg-[#22C55E] text-white text-[10px]">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#6B7280]">@{currentCreator.username}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => openFollowersList("followers")}
                          className="text-sm text-[#6B7280] hover:text-[#ee3224] hover:underline transition-colors flex items-center gap-1"
                        >
                          <Users className="h-4 w-4" />
                          {formatFollowers(creatorFollowers[currentCreator.id] || currentCreator.followers)} followers
                        </button>
                        <button
                          onClick={() => openFollowersList("following")}
                          className="text-sm text-[#6B7280] hover:text-[#ee3224] hover:underline transition-colors"
                        >
                          {currentCreator.following} following
                        </button>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleFollow(currentCreator.id, currentCreator.name)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            followedCreators.includes(currentCreator.id)
                              ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                              : "border border-[#6B7280] text-[#6B7280] hover:border-[#ee3224] hover:text-[#ee3224] hover:bg-[#F5F7FA]"
                          }`}
                        >
                          {followedCreators.includes(currentCreator.id) ? (
                            <span className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4" /> Following
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <UserPlus className="h-4 w-4" /> Follow
                            </span>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {followedCreators.includes(currentCreator.id)
                          ? `You're following ${currentCreator.name}. Click to unfollow.`
                          : `Follow to get notified when ${currentCreator.name} publishes new assets`}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </DialogHeader>

                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-6 py-4">
                    {/* Bio Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-[#1F2937] mb-2 flex items-center gap-2">
                        <Pencil className="h-4 w-4" /> Bio
                      </h3>
                      <p className="text-sm text-[#333]">{currentCreator.bio}</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-[#F5F7FA] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#1F2937]">{currentCreator.assetsPublished}</p>
                        <p className="text-xs text-[#6B7280]">Assets</p>
                      </div>
                      <div className="bg-[#F5F7FA] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#1F2937]">{currentCreator.totalDownloads}</p>
                        <p className="text-xs text-[#6B7280]">Downloads</p>
                      </div>
                      <div className="bg-[#F5F7FA] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#1F2937] flex items-center justify-center gap-1">
                          {currentCreator.avgRating} <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
                        </p>
                        <p className="text-xs text-[#6B7280]">Avg Rating</p>
                      </div>
                      <div className="bg-[#F5F7FA] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#1F2937]">
                          {formatFollowers(creatorFollowers[currentCreator.id] || currentCreator.followers)}
                        </p>
                        <p className="text-xs text-[#6B7280]">Followers</p>
                      </div>
                    </div>

                    {/* Published Assets */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-[#1F2937] flex items-center gap-2">
                          <Bot className="h-4 w-4" /> Published Assets ({getCreatorAssets(currentCreator.id).length})
                        </h3>
                        <button className="text-sm text-[#ee3224] hover:underline">View All Assets</button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {getCreatorAssets(currentCreator.id).map((asset) => (
                          <Card
                            key={asset.id}
                            className="hover:shadow-md hover:border-[#ee3224] transition-all cursor-pointer"
                            onClick={() => {
                              setShowCreatorModal(false)
                              setSelectedAgent(asset)
                              setActiveTab("overview")
                            }}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-[#6B7280]" />
                                </div>
                                <span className="text-sm font-semibold text-[#1F2937] truncate">{asset.name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-[#F59E0B] fill-[#F59E0B]" />
                                  {asset.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  {asset.downloads}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    {Object.keys(currentCreator.socialLinks).length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-[#1F2937] mb-3 flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" /> Links
                        </h3>
                        <div className="flex items-center gap-3">
                          {currentCreator.socialLinks.github && (
                            <a
                              href={currentCreator.socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#ee3224] transition-colors"
                            >
                              <Github className="h-4 w-4" /> GitHub
                            </a>
                          )}
                          {currentCreator.socialLinks.twitter && (
                            <a
                              href={currentCreator.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#ee3224] transition-colors"
                            >
                              <Twitter className="h-4 w-4" /> Twitter
                            </a>
                          )}
                          {currentCreator.socialLinks.linkedin && (
                            <a
                              href={currentCreator.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#ee3224] transition-colors"
                            >
                              <Linkedin className="h-4 w-4" /> LinkedIn
                            </a>
                          )}
                          {currentCreator.socialLinks.website && (
                            <a
                              href={currentCreator.socialLinks.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#ee3224] transition-colors"
                            >
                              <Globe className="h-4 w-4" /> Website
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <DialogFooter className="border-t pt-4">
                  <Button variant="outline" disabled className="text-[#6B7280]">
                    <MessageSquare className="h-4 w-4 mr-2" /> Message (Coming Soon)
                  </Button>
                  <Button variant="ghost" className="text-[#6B7280]">
                    <Flag className="h-4 w-4 mr-2" /> Report
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Followers/Following List Modal */}
        <Dialog open={showFollowersModal} onOpenChange={setShowFollowersModal}>
          <DialogContent className="max-w-[500px] max-h-[70vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>{followersModalType === "followers" ? "Followers" : "Following"}</DialogTitle>
              <DialogDescription>
                {currentCreator?.name} has{" "}
                {followersModalType === "followers"
                  ? `${formatFollowers(creatorFollowers[currentCreator?.id || ""] || 0)} followers`
                  : `${currentCreator?.following} following`}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-4">
                {followersList.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F5F7FA] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#F5F7FA] text-[#6B7280]">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#1F2937]">{user.name}</span>
                          {user.verified && (
                            <Badge className="bg-[#22C55E] text-white text-[9px] px-1 py-0">Verified</Badge>
                          )}
                        </div>
                        <span className="text-xs text-[#6B7280]">@{user.username}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollowFromList(user.id, user.name)}
                      className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                        user.isFollowing
                          ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                          : "border border-[#6B7280] text-[#6B7280] hover:border-[#ee3224] hover:text-[#ee3224] hover:bg-[#F5F7FA]"
                      }`}
                    >
                      {user.isFollowing ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-3 w-3" /> Following
                        </span>
                      ) : (
                        "+ Follow"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t pt-3 text-center">
              <span className="text-sm text-[#6B7280]">
                Showing 1-{followersList.length} of {formatFollowers(creatorFollowers[currentCreator?.id || ""] || 0)}
              </span>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Discussion Modal */}
        <Dialog open={showNewDiscussion} onOpenChange={setShowNewDiscussion}>
          <DialogContent className="max-w-lg" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
              <DialogDescription>Ask a question or share your thoughts with the community</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F2937]">Title</label>
                <Input
                  placeholder="What's your question or topic?"
                  value={newDiscussionTitle}
                  onChange={(e) => setNewDiscussionTitle(e.target.value)}
                />
                {newDiscussionTitle && (newDiscussionTitle.length < 5 || newDiscussionTitle.length > 100) && (
                  <p className="text-xs text-red-500">Title must be between 5 and 100 characters</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F2937]">Category</label>
                <Select value={newDiscussionCategory} onValueChange={setNewDiscussionCategory}>
                  <SelectTrigger>
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F2937]">Body</label>
                <Textarea
                  placeholder="Provide details about your question or topic..."
                  value={newDiscussionBody}
                  onChange={(e) => setNewDiscussionBody(e.target.value)}
                  rows={5}
                />
                {newDiscussionBody && newDiscussionBody.length < 10 && (
                  <p className="text-xs text-red-500">Body must be at least 10 characters</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewDiscussion(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewDiscussion} className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                Post Discussion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Report Modal */}
        <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
          <DialogContent className="max-w-md" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Report Discussion</DialogTitle>
              <DialogDescription>Help us understand what's wrong with this discussion</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F2937]">Reason</label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spam">Spam or advertising</SelectItem>
                    <SelectItem value="harassment">Harassment or abuse</SelectItem>
                    <SelectItem value="misinformation">Misinformation</SelectItem>
                    <SelectItem value="offtopic">Off-topic</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F2937]">Additional Details (Optional)</label>
                <Textarea
                  placeholder="Provide any additional context..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value.slice(0, 500))}
                  rows={3}
                />
                <p className="text-xs text-[#6B7280] text-right">{reportDetails.length}/500</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReportModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleReport} className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
