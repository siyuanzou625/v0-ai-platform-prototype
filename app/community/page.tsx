"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  MessageSquare,
  ArrowUp,
  Plus,
  TrendingUp,
  Users,
  Clock,
  Filter,
} from "lucide-react"

const discussions = [
  { id: "disc-001", title: "Best practices for RAG agent optimization?", excerpt: "Looking for tips on improving retrieval accuracy and reducing hallucinations in RAG-based agents. What techniques have worked best for you?", assetBadge: "General", author: "Sarah Kim", timestamp: "30 min ago", upvotes: 23, replies: 7, unread: true },
  { id: "disc-002", title: "Briefly AI vs Traditional Recording Tools", excerpt: "What are the key advantages of using Briefly AI over traditional meeting recording and transcription tools? Looking for real-world comparisons.", assetBadge: "Briefly AI", author: "Mike Ross", timestamp: "2 hours ago", upvotes: 15, replies: 4, unread: true },
  { id: "disc-003", title: "Enterprise licensing questions", excerpt: "Need clarification on volume licensing for teams of 50+. What are the cost savings compared to individual licenses?", assetBadge: "Sales Qualifier", author: "Jennifer Lee", timestamp: "5 hours ago", upvotes: 5, replies: 1, unread: false },
  { id: "disc-004", title: "How to export summaries to Notion?", excerpt: "Looking for integration options with Notion. Is there a native plugin or do I need to use Zapier/Make?", assetBadge: "Briefly AI", author: "David Chen", timestamp: "1 day ago", upvotes: 12, replies: 3, unread: false },
  { id: "disc-005", title: "Feature Request: Multi-language support", excerpt: "Would love to see support for more languages in the transcription engine. Currently only English works reliably.", assetBadge: "MindLink AI", author: "Anna Schmidt", timestamp: "2 days ago", upvotes: 45, replies: 8, unread: false },
  { id: "disc-006", title: "Bug: Audio lag on M1 Macs", excerpt: "Experiencing audio sync issues on Apple Silicon Macs. Audio and video are out of sync by about 500ms.", assetBadge: "Briefly AI", author: "Tom Wilson", timestamp: "3 days ago", upvotes: 8, replies: 2, unread: false },
  { id: "disc-007", title: "Template sharing best practices", excerpt: "What's the best way to share templates with team members? Looking for versioning and collaboration tips.", assetBadge: "General", author: "Lisa Park", timestamp: "4 days ago", upvotes: 34, replies: 12, unread: false },
  { id: "disc-008", title: "Plugin development SDK questions", excerpt: "Need help understanding the plugin SDK architecture. Where can I find comprehensive documentation?", assetBadge: "General", author: "James Liu", timestamp: "1 week ago", upvotes: 19, replies: 6, unread: false },
  { id: "disc-009", title: "Comparing agent frameworks", excerpt: "Has anyone compared AgentStudio with other agent frameworks like LangChain or AutoGPT?", assetBadge: "General", author: "Rachel Green", timestamp: "1 week ago", upvotes: 67, replies: 21, unread: false },
  { id: "disc-010", title: "Custom knowledge base integration", excerpt: "Looking to integrate a custom knowledge base with my agent. What file formats are supported?", assetBadge: "General", author: "Chris Taylor", timestamp: "2 weeks ago", upvotes: 28, replies: 9, unread: false },
]

const trendingTopics = [
  { tag: "RAG", count: 156 },
  { tag: "GPT-4", count: 124 },
  { tag: "Plugins", count: 98 },
  { tag: "Templates", count: 87 },
  { tag: "Enterprise", count: 65 },
]

const topContributors = [
  { name: "Sarah Kim", posts: 45, avatar: "SK" },
  { name: "Mike Ross", posts: 38, avatar: "MR" },
  { name: "Jennifer Lee", posts: 32, avatar: "JL" },
  { name: "David Chen", posts: 29, avatar: "DC" },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("trending")

  const filteredDiscussions = discussions.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (activeTab === "trending") return b.upvotes - a.upvotes
    if (activeTab === "recent") return 0 // Already sorted by time
    return 0
  })

  return (
    <AppLayout>
      <>
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#ee3224]" />
                <h1 className="text-2xl font-semibold text-foreground">Community</h1>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Connect with other creators, share ideas, and get help
              </p>
            </div>
            <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
              <Plus className="h-4 w-4" /> New Discussion
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="trending" className="gap-1">
                  <TrendingUp className="h-4 w-4" /> Trending
                </TabsTrigger>
                <TabsTrigger value="recent" className="gap-1">
                  <Clock className="h-4 w-4" /> Recent
                </TabsTrigger>
                <TabsTrigger value="following" className="gap-1">
                  <Users className="h-4 w-4" /> Following
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-[#F5F7FA]">
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Discussion List */}
              <div className="lg:col-span-3 space-y-4">
                {sortedDiscussions.map((discussion) => (
                  <Card
                    key={discussion.id}
                    className={`card-interactive border border-[#E5E7EB] bg-white shadow-sm ${
                      discussion.unread ? "border-l-2 border-l-[#ee3224]" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-semibold text-foreground hover:text-[#ee3224] cursor-pointer">
                          {discussion.title}
                        </h3>
                        <Badge variant="secondary" className="ml-2 shrink-0 text-xs">
                          {discussion.assetBadge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {discussion.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {discussion.author.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{discussion.author}</span>
                          <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ArrowUp className="h-4 w-4" />
                            {discussion.upvotes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {discussion.replies}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trending Topics */}
                <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#ee3224]" />
                      Trending Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trendingTopics.map((topic) => (
                        <Badge
                          key={topic.tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-[#ee3224]/10 hover:text-[#ee3224]"
                        >
                          #{topic.tag} ({topic.count})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#ee3224]" />
                      Top Contributors
                    </h3>
                    <div className="space-y-3">
                      {topContributors.map((contributor, index) => (
                        <div key={contributor.name} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground w-4">
                            {index + 1}.
                          </span>
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs">{contributor.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{contributor.name}</p>
                            <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="border border-[#E5E7EB] bg-white shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
                    <div className="space-y-2 text-sm">
                      <a href="#" className="block text-muted-foreground hover:text-[#ee3224]">
                        Community Guidelines
                      </a>
                      <a href="#" className="block text-muted-foreground hover:text-[#ee3224]">
                        Documentation
                      </a>
                      <a href="#" className="block text-muted-foreground hover:text-[#ee3224]">
                        Tutorials
                      </a>
                      <a href="#" className="block text-muted-foreground hover:text-[#ee3224]">
                        Support Portal
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    </AppLayout>
  )
}
