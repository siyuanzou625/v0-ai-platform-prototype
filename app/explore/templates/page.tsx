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
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  FileCode,
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
} from "lucide-react"

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

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Templates</h1>
            <p className="mt-2 text-sm text-[#6B7280] max-w-[600px]">
              Browse ready-made workflows to accelerate your agent development.
            </p>
          </div>
          <Button className="gap-2">
            <FileCode className="h-4 w-4" /> Submit Template
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
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
                <SelectItem value="forks">Most Forks</SelectItem>
                <SelectItem value="uses">Most Uses</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Template Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
              onClick={() => openTemplateModal(template)}
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                  <FileCode className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base font-medium">{template.name}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex flex-wrap gap-2">
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
                </div>
                <div className="mb-3 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" /> {template.components} components
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {template.estimatedTime}
                    </span>
                  </div>
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
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                    <Eye className="h-3 w-3" /> Preview
                  </Button>
                  <Button size="sm" className="flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                    <Copy className="h-3 w-3" /> Use
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                <FileCode className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">1,247</p>
                <p className="text-sm text-muted-foreground">Templates</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/10">
                <Download className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">524K</p>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-3/10">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">8.2K</p>
                <p className="text-sm text-muted-foreground">Contributors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-4/10">
                <Star className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">4.7</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Asset Detail Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-0">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                <FileCode className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">{selectedTemplate?.name}</DialogTitle>
                <DialogDescription className="mt-1">{selectedTemplate?.description}</DialogDescription>
                <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>by {selectedTemplate?.author}</span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {selectedTemplate?.rating}
                  </span>
                  <span className="text-[#E5E7EB]">|</span>
                  <span className="flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" /> {selectedTemplate?.downloads}
                  </span>
                </div>
              </div>
              <Button className="gap-2">
                <Copy className="h-4 w-4" /> Use Template
              </Button>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden mt-4">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2">Overview</TabsTrigger>
              <TabsTrigger value="documentation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2">Documentation</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2">Reviews</TabsTrigger>
              <TabsTrigger value="discussions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2 gap-1">
                <MessageSquare className="h-4 w-4" /> Discussions
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{selectedTemplate?.commentCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="versions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2">Versions</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="overview" className="m-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-2">About</h3>
                    <p className="text-sm text-[#6B7280]">{selectedTemplate?.description}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentation" className="m-0">
                <p className="text-sm text-[#6B7280]">Documentation for {selectedTemplate?.name}</p>
              </TabsContent>

              <TabsContent value="reviews" className="m-0">
                <p className="text-sm text-[#6B7280]">Reviews for {selectedTemplate?.name}</p>
              </TabsContent>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="m-0 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#1F2937] flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Discussions
                  </h3>
                  <p className="text-sm text-[#6B7280]">Ask questions, share tips, and connect with the creator</p>
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
                      <SelectItem value="creator">Creator Responses</SelectItem>
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
                    <p className="text-sm text-[#6B7280] mb-4">Be the first to start a discussion about this template</p>
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
                              {thread.author.isCreator && (
                                <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 gap-0.5"><Tag className="h-2.5 w-2.5" /> Creator</Badge>
                              )}
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
                                    {reply.author.isCreator && <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 mb-2">Creator Response</Badge>}
                                    <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
                                      <Avatar className="h-4 w-4"><AvatarFallback>{reply.author.name[0]}</AvatarFallback></Avatar>
                                      <span className="font-medium">{reply.author.name}</span>
                                      {reply.author.isCreator && <Badge className="bg-[#ee3224] text-white text-[10px] h-4 px-1.5 gap-0.5"><Tag className="h-2.5 w-2.5" /> Creator</Badge>}
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
                      <span className="text-sm text-[#6B7280]">Showing 1-{filteredDiscussions.length} of {selectedTemplate?.commentCount} discussions</span>
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

              <TabsContent value="versions" className="m-0">
                <p className="text-sm text-[#6B7280]">Version history for {selectedTemplate?.name}</p>
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
