"use client"

import { useState, useEffect } from "react"
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
  FileText,
  Download,
  Star,
  Copy,
  Eye,
  Clock,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
  Filter,
  MessageSquare,
  X,
  ArrowUp,
  Flag,
  Reply,
  Tag,
  Plus,
  Check,
  CheckCircle,
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
  "workflowlabs": {
    id: "workflowlabs",
    name: "Workflow Labs",
    username: "workflowlabs",
    verified: true,
    bio: "Building automation workflows for the modern enterprise. Specialists in email, document, and data processing.",
    followers: 1247,
    following: 45,
    assetsPublished: 3,
    totalDownloads: "23.2K",
    avgRating: 4.8,
    socialLinks: { github: "https://github.com/workflowlabs", twitter: "https://twitter.com/workflowlabs" },
  },
  "supportco": {
    id: "supportco",
    name: "Support Co",
    username: "supportco",
    verified: true,
    bio: "Customer support solutions powered by AI. Making support teams more efficient.",
    followers: 892,
    following: 67,
    assetsPublished: 2,
    totalDownloads: "18.7K",
    avgRating: 4.9,
    socialLinks: { linkedin: "https://linkedin.com/company/supportco" },
  },
  "dataflow": {
    id: "dataflow",
    name: "DataFlow",
    username: "dataflow",
    verified: true,
    bio: "Data pipeline specialists. ETL, analytics, and real-time processing solutions.",
    followers: 654,
    following: 34,
    assetsPublished: 2,
    totalDownloads: "13.4K",
    avgRating: 4.7,
    socialLinks: { github: "https://github.com/dataflow", website: "https://dataflow.io" },
  },
  "marketingpro": {
    id: "marketingpro",
    name: "Marketing Pro",
    username: "marketingpro",
    verified: false,
    bio: "Social media and content marketing automation. Helping brands scale their presence.",
    followers: 456,
    following: 89,
    assetsPublished: 1,
    totalDownloads: "9.1K",
    avgRating: 4.6,
    socialLinks: { twitter: "https://twitter.com/marketingpro" },
  },
  "salesai": {
    id: "salesai",
    name: "Sales AI",
    username: "salesai",
    verified: true,
    bio: "AI-powered sales tools. Lead scoring, pipeline management, and forecasting.",
    followers: 567,
    following: 23,
    assetsPublished: 1,
    totalDownloads: "7.3K",
    avgRating: 4.8,
    socialLinks: { linkedin: "https://linkedin.com/company/salesai" },
  },
  "hrtech": {
    id: "hrtech",
    name: "HR Tech",
    username: "hrtech",
    verified: false,
    bio: "HR automation and employee experience solutions.",
    followers: 234,
    following: 56,
    assetsPublished: 1,
    totalDownloads: "5.4K",
    avgRating: 4.7,
    socialLinks: {},
  },
  "docai": {
    id: "docai",
    name: "DocAI",
    username: "docai",
    verified: true,
    bio: "Document intelligence and knowledge management. Making information accessible.",
    followers: 789,
    following: 34,
    assetsPublished: 2,
    totalDownloads: "39.9K",
    avgRating: 4.85,
    socialLinks: { github: "https://github.com/docai", website: "https://docai.dev" },
  },
  "meetingai": {
    id: "meetingai",
    name: "MeetingAI",
    username: "meetingai",
    verified: true,
    bio: "Meeting intelligence and productivity tools. Never miss an action item again.",
    followers: 1123,
    following: 45,
    assetsPublished: 1,
    totalDownloads: "14.8K",
    avgRating: 4.8,
    socialLinks: { twitter: "https://twitter.com/meetingai" },
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

// Category color mapping
const getCategoryBadgeStyle = (category: string): string => {
  switch (category) {
    case "Productivity":
      return "bg-violet-50 text-violet-700 border border-violet-200"
    case "Support":
      return "bg-teal-50 text-teal-700 border border-teal-200"
    case "Data":
      return "bg-blue-50 text-blue-700 border border-blue-200"
    case "Marketing":
      return "bg-pink-50 text-pink-700 border border-pink-200"
    case "Sales":
      return "bg-orange-50 text-orange-700 border border-orange-200"
    case "HR":
      return "bg-cyan-50 text-cyan-700 border border-cyan-200"
    case "Knowledge":
      return "bg-indigo-50 text-indigo-700 border border-indigo-200"
    default:
      return "bg-slate-50 text-slate-700 border border-slate-200"
  }
}

const templates = [
  {
    id: 1,
    name: "Email Automation Starter",
    description: "Complete email processing workflow with summarization and auto-reply",
    author: "Workflow Labs",
    authorId: "workflowlabs",
    category: "Productivity",
    complexity: "Beginner",
    downloads: "8.2K",
    rating: 4.8,
    components: 5,
    estimatedTime: "10 min",
    commentCount: 19,
  },
  {
    id: 2,
    name: "Customer Support Suite",
    description: "Full customer support system with ticketing and knowledge base",
    author: "Support Co",
    authorId: "supportco",
    category: "Support",
    complexity: "Advanced",
    downloads: "12.5K",
    rating: 4.9,
    components: 12,
    estimatedTime: "45 min",
    commentCount: 34,
  },
  {
    id: 3,
    name: "Data Pipeline Builder",
    description: "ETL pipeline template for data processing and analytics",
    author: "DataFlow",
    authorId: "dataflow",
    category: "Data",
    complexity: "Intermediate",
    downloads: "6.7K",
    rating: 4.7,
    components: 8,
    estimatedTime: "25 min",
    commentCount: 15,
  },
  {
    id: 4,
    name: "Content Calendar Agent",
    description: "Social media content planning and scheduling automation",
    author: "Marketing Pro",
    authorId: "marketingpro",
    category: "Marketing",
    complexity: "Beginner",
    downloads: "9.1K",
    rating: 4.6,
    components: 6,
    estimatedTime: "15 min",
    commentCount: 22,
  },
  {
    id: 5,
    name: "Sales Lead Scorer",
    description: "Automated lead qualification and scoring system",
    author: "Sales AI",
    authorId: "salesai",
    category: "Sales",
    complexity: "Intermediate",
    downloads: "7.3K",
    rating: 4.8,
    components: 7,
    estimatedTime: "20 min",
    commentCount: 11,
  },
  {
    id: 6,
    name: "HR Onboarding Flow",
    description: "Complete employee onboarding workflow automation",
    author: "HR Tech",
    authorId: "hrtech",
    category: "HR",
    complexity: "Advanced",
    downloads: "5.4K",
    rating: 4.7,
    components: 10,
    estimatedTime: "35 min",
    commentCount: 8,
  },
  {
    id: 7,
    name: "Document Q&A System",
    description: "RAG-based document question answering system",
    author: "DocAI",
    authorId: "docai",
    category: "Knowledge",
    complexity: "Intermediate",
    downloads: "11.2K",
    rating: 4.9,
    components: 6,
    estimatedTime: "20 min",
    commentCount: 28,
  },
  {
    id: 8,
    name: "Meeting Summarizer",
    description: "Automatic meeting transcription and summary generation",
    author: "MeetingAI",
    authorId: "meetingai",
    category: "Productivity",
    complexity: "Beginner",
    downloads: "14.8K",
    rating: 4.8,
    components: 4,
    estimatedTime: "10 min",
    commentCount: 41,
  },
]

// Mock discussions for templates
const mockDiscussions = [
  {
    id: 1,
    title: "How to customize the email templates?",
    category: "qa",
    upvotes: 18,
    replyCount: 4,
    viewCount: 234,
    isAnswered: true,
    author: { name: "Tom Wilson", avatar: "/avatars/tom.jpg", isCreator: false },
    timestamp: "3 hours ago",
    content: "I want to customize the email templates to match our brand. Where can I find the template files and what format do they use?",
    replies: [
      {
        id: 101,
        author: { name: "Workflow Labs", avatar: "/avatars/workflowlabs.jpg", isCreator: true },
        content: "You can find all templates in the /templates folder. They use Handlebars format. Check our docs for the full customization guide.",
        timestamp: "2 hours ago",
        upvotes: 12,
      },
    ],
  },
  {
    id: 2,
    title: "Feature Request: Add Slack notifications",
    category: "idea",
    upvotes: 32,
    replyCount: 6,
    viewCount: 189,
    isAnswered: false,
    author: { name: "Sarah Lee", avatar: "/avatars/sarah.jpg", isCreator: false },
    timestamp: "1 day ago",
    content: "It would be great to have Slack notifications when emails are processed. Currently we only get email notifications.",
    replies: [],
  },
  {
    id: 3,
    title: "Bug: Workflow fails with large attachments",
    category: "bug",
    upvotes: 7,
    replyCount: 3,
    viewCount: 67,
    isAnswered: true,
    author: { name: "Mike Chen", avatar: "/avatars/mike.jpg", isCreator: false },
    timestamp: "2 days ago",
    content: "When processing emails with attachments over 10MB, the workflow times out. Is there a way to increase the limit?",
    replies: [
      {
        id: 301,
        author: { name: "Workflow Labs", avatar: "/avatars/workflowlabs.jpg", isCreator: true },
        content: "This is a known issue. We've increased the timeout in v2.1.0. Please update and let us know if it persists.",
        timestamp: "1 day ago",
        upvotes: 5,
      },
    ],
  },
]

const categories = ["All", "Productivity", "Support", "Data", "Marketing", "Sales", "HR", "Knowledge"]

const categoryColors: Record<string, { bg: string; text: string }> = {
  qa: { bg: "bg-blue-100", text: "text-blue-700" },
  bug: { bg: "bg-gray-100", text: "text-[#ee3224]" },
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

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null)
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
    const savedFilter = localStorage.getItem("templateDiscussionFilter")
    const savedSort = localStorage.getItem("templateDiscussionSort")
    if (savedFilter) setDiscussionFilter(savedFilter)
    if (savedSort) setDiscussionSort(savedSort)
  }, [])

  useEffect(() => {
    localStorage.setItem("templateDiscussionFilter", discussionFilter)
    localStorage.setItem("templateDiscussionSort", discussionSort)
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

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || template.category === activeCategory
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

  const openTemplateModal = (template: typeof templates[0], tab = "overview") => {
    setSelectedTemplate(template)
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
      <>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#ee3224]" />
                <h1 className="text-xl font-semibold text-foreground">Templates</h1>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                Browse ready-made workflows to accelerate your agent development.
              </p>
            </div>
            <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
              <FileText className="h-4 w-4" /> Submit Template
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-40 bg-white">
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
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="forks">Most Forks</SelectItem>
                <SelectItem value="uses">Most Uses</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredTemplates.map((template) => {
            const creator = creators[template.authorId]
            const isFollowing = followedCreators.has(template.authorId)
            const followerCount = creatorFollowerCounts[template.authorId] || creator?.followers || 0

            return (
              <Card
                key={template.id}
                className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
                onClick={() => openTemplateModal(template)}
              >
                <CardHeader className="py-2.5 px-5 pb-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-100">
                        <FileText className="h-4 w-4 text-slate-600" />
                      </div>
                      <CardTitle className="card-title-text text-base font-medium transition-colors duration-150">{template.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${getCategoryBadgeStyle(template.category)}`}>{template.category}</Badge>
                  </div>
                  <CardDescription className="text-sm line-clamp-2 mt-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="py-2.5 px-5">
                  {/* Creator info with Follow button */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs text-[#6B7280] hover:text-[#ee3224] hover:underline transition-colors"
                        onClick={(e) => openCreatorProfile(template.authorId, e)}
                      >
                        by {template.author}
                      </button>
                      {creator?.verified && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-[#22C55E]/10 text-[#22C55E] border-0">
                          Verified
                        </Badge>
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => handleFollow(template.authorId, e)}
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
                          {isFollowing ? `Unfollow ${template.author}` : `Follow ${template.author} for updates`}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {/* Follower count */}
                    <button
                      className="flex items-center gap-1 mt-1 text-[11px] text-[#6B7280] hover:text-[#ee3224] transition-colors"
                      onClick={(e) => openCreatorProfile(template.authorId, e)}
                    >
                      <Users className="h-3 w-3" />
                      {formatFollowerCount(followerCount)} followers
                    </button>
                  </div>

                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <Badge
                      variant="outline"
                      className={
                        template.complexity === "Beginner"
                          ? "border-chart-3 text-chart-3"
                          : template.complexity === "Intermediate"
                          ? "border-chart-4 text-chart-4"
                          : "border-primary text-primary"
                      }
                    >
                      {template.complexity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">v{template.version || "1.0.0"}</span>
                  </div>
                  {/* Metrics row with comment count */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {template.rating}
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
                            openTemplateModal(template, "discussions")
                          }}
                        >
                          <MessageSquare className="h-3.5 w-3.5" /> {template.commentCount}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{template.commentCount} discussions about this template</TooltipContent>
                    </Tooltip>
                    <span className="text-[#E5E7EB]">|</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <Download className="h-3.5 w-3.5" /> {template.downloads}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Downloads</TooltipContent>
                    </Tooltip>
                  </div>

                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Templates Banner */}
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Create Your Own Template</h3>
                <p className="text-muted-foreground">Share your workflows with the community and earn recognition</p>
              </div>
            </div>
            <Button size="lg" className="gap-2">
              Start Building <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Template Detail Modal */}
        <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
          <DialogContent
            className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col"
            aria-describedby={undefined}
          >
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedTemplate?.name}</DialogTitle>
                    <DialogDescription className="mt-1">{selectedTemplate?.description}</DialogDescription>
                    <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                      <button 
                        className="hover:text-[#ee3224] hover:underline transition-colors"
                        onClick={() => selectedTemplate && openCreatorProfile(selectedTemplate.authorId)}
                      >
                        by {selectedTemplate?.author}
                      </button>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-chart-4 text-chart-4" /> {selectedTemplate?.rating}
                      </span>
                      <span className="text-[#E5E7EB]">|</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" /> {selectedTemplate?.downloads}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Overview</TabsTrigger>
                <TabsTrigger value="documentation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Documentation</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Reviews</TabsTrigger>
                <TabsTrigger value="discussions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 gap-1 shrink-0">
                  <MessageSquare className="h-4 w-4" /> Discussions
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{selectedTemplate?.commentCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="versions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 shrink-0">Versions</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto py-4">
                <TabsContent value="overview" className="m-0 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Template Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Complexity:</span>
                        <span className="ml-2">{selectedTemplate?.complexity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Components:</span>
                        <span className="ml-2">{selectedTemplate?.components}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Setup Time:</span>
                        <span className="ml-2">{selectedTemplate?.estimatedTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Downloads:</span>
                        <span className="ml-2">{selectedTemplate?.downloads}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documentation" className="m-0 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold text-base mb-2">Getting Started</h4>
                    <p className="text-sm text-muted-foreground">
                      This template provides a complete workflow for {selectedTemplate?.name.toLowerCase()}.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold text-base mb-2">Prerequisites</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Basic understanding of workflow concepts</li>
                      <li>API credentials for required integrations</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold text-base mb-2">Usage</h4>
                    <p className="text-sm text-muted-foreground mb-2">Import and configure the template in your project:</p>
                    <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                      <code className="text-sm">import {'{'} {selectedTemplate?.name.replace(/\s+/g, '')} {'}'} from &apos;@templates/{selectedTemplate?.name.toLowerCase().replace(/\s+/g, '-')}&apos;</code>
                    </pre>
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
                              <div className="flex items-center gap-2 mt-2">
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
                                <div className="mt-2 flex gap-2">
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
                                <div className="mt-2">
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

                <TabsContent value="versions" className="m-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-[#F5F7FA]">
                      <div>
                        <span className="font-medium">v2.1.0</span>
                        <span className="ml-2 text-sm text-muted-foreground">Current</span>
                      </div>
                      <Badge className="bg-[#22C55E]">Latest</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <span className="font-medium">v2.0.0</span>
                        <span className="ml-2 text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Creator Profile Modal */}
        <Dialog open={showCreatorModal} onOpenChange={setShowCreatorModal}>
          <DialogContent className="max-w-2xl" aria-describedby={undefined}>
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
                <h4 className="text-sm font-semibold text-[#1F2937] mb-2">Published Templates ({selectedCreatorData?.assetsPublished})</h4>
                <div className="grid grid-cols-3 gap-4">
                  {templates.filter(t => t.authorId === selectedCreator).slice(0, 3).map(template => (
                    <div key={template.id} className="p-3 rounded-lg border hover:border-[#ee3224] cursor-pointer transition-colors" onClick={() => { setShowCreatorModal(false); openTemplateModal(template); }}>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-[#ee3224]" />
                        <span className="text-sm font-medium truncate">{template.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {template.rating}</span>
                        <span className="flex items-center gap-0.5"><Download className="h-3 w-3" /> {template.downloads}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-2 p-0 h-auto text-[#ee3224] text-sm">
                  View All Templates <ArrowRight className="h-3 w-3 ml-1" />
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
          <DialogContent className="max-w-md" aria-describedby={undefined}>
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
              <DialogDescription>Ask a question or share feedback about this template</DialogDescription>
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
      </>
    </AppLayout>
  )
}
