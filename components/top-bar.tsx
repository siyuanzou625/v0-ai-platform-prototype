"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Bell,
  User,
  Settings,
  CreditCard,
  LogOut,
  Book,
  GraduationCap,
  Video,
  Code,
  Headphones,
  Mail,
  Activity,
  MessageCircle,
  Keyboard,
  Brush,
  X,
  Clock,
  Command,
  ArrowUp,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Mock Data
const userData = {
  id: "user-001",
  name: "Zoey Doyle",
  email: "zoey.doyle@company.com",
  avatar: "",
  initials: "ZD",
  tier: "Enterprise",
  status: "online",
  unreadNotifications: 5,
}

const recentSearches = [
  { id: "search-001", query: "Briefly AI", timestamp: "2 hours ago", type: "asset" },
  { id: "search-002", query: "Meeting notes template", timestamp: "1 day ago", type: "template" },
  { id: "search-003", query: "Slack connector plugin", timestamp: "3 days ago", type: "plugin" },
  { id: "search-004", query: "RAG agent optimization", timestamp: "1 week ago", type: "discussion" },
  { id: "search-005", query: "Enterprise licensing", timestamp: "2 weeks ago", type: "docs" },
]

const quickActions = [
  { label: "Create New Agent", shortcut: "Cmd+N", href: "/build/projects" },
  { label: "Open Build Workspace", shortcut: "Cmd+B", href: "/build/workspace" },
  { label: "View My Apps", shortcut: "Cmd+M", href: "/use/installed-apps" },
]

const suggestedAssets = [
  { name: "Briefly AI", type: "Agent", stat: "12.4K installs" },
  { name: "Meeting Notes Automation", type: "Template", stat: "1.2K uses" },
  { name: "Slack Connector", type: "Plugin", stat: "45.2K downloads" },
]

const resourcesMenu = [
  { id: "res-001", title: "Documentation", description: "Platform and API documentation", icon: Book, url: "/docs", newTab: true },
  { id: "res-002", title: "Tutorials", description: "Step-by-step guides and walkthroughs", icon: GraduationCap, url: "/tutorials", newTab: false },
  { id: "res-003", title: "Webinars & Events", description: "Live sessions and recorded library", icon: Video, url: "/events", newTab: false },
  { id: "res-004", title: "API Reference", description: "Complete API endpoint documentation", icon: Code, url: "/api-reference", newTab: true },
  { id: "res-005", title: "Release Notes", description: "Latest updates and changelog", icon: Bell, url: "/release-notes", newTab: false },
]

const helpMenu = [
  { title: "Help Center", icon: BookOpen, url: "/help" },
  { title: "Contact Support", icon: Mail, url: "/support" },
  { title: "System Status", icon: Activity, url: "/status", status: "operational" },
  { title: "Submit Feedback", icon: MessageCircle, url: "/feedback" },
  { title: "Keyboard Shortcuts", icon: Keyboard, url: "#shortcuts" },
]

const discussions = [
  { id: "disc-001", title: "Best practices for RAG agent optimization?", excerpt: "Looking for tips on improving retrieval accuracy...", assetBadge: "General", author: "Sarah Kim", timestamp: "30 min ago", upvotes: 23, replies: 7, unread: true },
  { id: "disc-002", title: "Briefly AI vs Traditional Recording Tools", excerpt: "What are the key advantages of using Briefly AI...", assetBadge: "Briefly AI", author: "Mike Ross", timestamp: "2 hours ago", upvotes: 15, replies: 4, unread: true },
  { id: "disc-003", title: "Enterprise licensing questions", excerpt: "Need clarification on volume licensing for teams...", assetBadge: "Sales Qualifier", author: "Jennifer Lee", timestamp: "5 hours ago", upvotes: 5, replies: 1, unread: false },
  { id: "disc-004", title: "How to export summaries to Notion?", excerpt: "Looking for integration options with Notion...", assetBadge: "Briefly AI", author: "David Chen", timestamp: "1 day ago", upvotes: 12, replies: 3, unread: false },
  { id: "disc-005", title: "Feature Request: Multi-language support", excerpt: "Would love to see support for more languages...", assetBadge: "MindLink AI", author: "Anna Schmidt", timestamp: "2 days ago", upvotes: 45, replies: 8, unread: false },
  { id: "disc-006", title: "Bug: Audio lag on M1 Macs", excerpt: "Experiencing audio sync issues on Apple Silicon...", assetBadge: "Briefly AI", author: "Tom Wilson", timestamp: "3 days ago", upvotes: 8, replies: 2, unread: false },
  { id: "disc-007", title: "Template sharing best practices", excerpt: "What's the best way to share templates with team...", assetBadge: "General", author: "Lisa Park", timestamp: "4 days ago", upvotes: 34, replies: 12, unread: false },
  { id: "disc-008", title: "Plugin development SDK questions", excerpt: "Need help understanding the plugin SDK...", assetBadge: "General", author: "James Liu", timestamp: "1 week ago", upvotes: 19, replies: 6, unread: false },
]

const notifications = [
  { id: "notif-001", type: "system", title: "Briefly AI has a new update available", message: "Version 2.2.0 includes performance improvements", timestamp: "1 hour ago", read: false },
  { id: "notif-002", type: "mention", title: "John replied to your discussion", message: "Thanks for sharing this insight about RAG...", timestamp: "3 hours ago", read: false },
  { id: "notif-003", type: "creator", title: "Your asset 'Research Bot' was reviewed", message: "New 5-star review from Academic Labs", timestamp: "1 day ago", read: true },
  { id: "notif-004", type: "system", title: "New template matched your search", message: "Check out 'Meeting Notes Pro' template", timestamp: "2 days ago", read: true },
  { id: "notif-005", type: "system", title: "Weekly usage report ready", message: "Your agents processed 1,234 tasks this week", timestamp: "1 week ago", read: true },
]

export function TopBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [communityTab, setCommunityTab] = useState("trending")
  const [communitySearch, setCommunitySearch] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: Cmd/Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
        setSearchFocused(true)
      }
      if (e.key === "Escape") {
        setSearchFocused(false)
        searchInputRef.current?.blur()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredDiscussions = discussions.filter((d) =>
    d.title.toLowerCase().includes(communitySearch.toLowerCase()) ||
    d.assetBadge.toLowerCase().includes(communitySearch.toLowerCase())
  )

  const unreadCount = discussions.filter((d) => d.unread).length

  return (
    <>
      <header className="sticky top-0 z-[1000] flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-6">
        {/* Left Section: Global Search Bar */}
        <div className="relative flex-1 min-w-[50%] max-w-[60%]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search assets, docs, discussions... (Cmd/Ctrl+K)"
            className="h-10 w-full rounded border-[#E5E7EB] bg-[#F5F7FA] pl-10 pr-10 text-sm placeholder:text-[#6B7280] focus:border-[#ee3224] focus:ring-[#ee3224]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#333]"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search Dropdown */}
          {searchFocused && (
            <div className="absolute left-0 top-full z-10 mt-1 w-full rounded border border-[#E5E7EB] bg-white shadow-lg">
              {/* Recent Searches */}
              <div className="border-b border-[#E5E7EB] p-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#6B7280]">Recent Searches</p>
                <div className="space-y-1">
                  {recentSearches.map((search) => (
                    <button
                      key={search.id}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-[#F5F7FA]"
                      onClick={() => {
                        setSearchQuery(search.query)
                        setSearchFocused(false)
                      }}
                    >
                      <Clock className="h-3.5 w-3.5 text-[#6B7280]" />
                      <span className="flex-1">{search.query}</span>
                      <span className="text-xs text-[#6B7280]">{search.timestamp}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-b border-[#E5E7EB] p-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#6B7280]">Quick Actions</p>
                <div className="space-y-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-[#F5F7FA]"
                      onClick={() => {
                        router.push(action.href)
                        setSearchFocused(false)
                      }}
                    >
                      <Command className="h-3.5 w-3.5 text-[#6B7280]" />
                      <span className="flex-1">{action.label}</span>
                      <kbd className="rounded bg-[#F5F7FA] px-1.5 py-0.5 text-xs text-[#6B7280]">{action.shortcut}</kbd>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested Assets */}
              <div className="p-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#6B7280]">Suggested Assets</p>
                <div className="space-y-1">
                  {suggestedAssets.map((asset) => (
                    <button
                      key={asset.name}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-[#F5F7FA]"
                      onClick={() => setSearchFocused(false)}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-[#F5F7FA]">
                        <Search className="h-3 w-3 text-[#6B7280]" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{asset.name}</span>
                        <span className="ml-2 text-xs text-[#6B7280]">{asset.type}</span>
                      </div>
                      <span className="text-xs text-[#6B7280]">{asset.stat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#E5E7EB] px-3 py-2">
                <button className="text-sm font-medium text-[#ee3224] hover:underline">
                  View all results
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Utility Icons */}
        <div className="flex items-center gap-1">
          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-3 text-[#333] hover:bg-[#F5F7FA] hover:text-[#ee3224]">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-normal">Resources</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] rounded border-[#E5E7EB] p-2 shadow-lg">
              {resourcesMenu.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="flex cursor-pointer items-start gap-3 rounded p-2 hover:bg-[#F5F7FA]"
                  onClick={() => {
                    if (item.newTab) {
                      window.open(item.url, "_blank")
                    } else {
                      router.push(item.url)
                    }
                  }}
                >
                  <item.icon className="mt-0.5 h-5 w-5 text-[#333]" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-[#6B7280]">{item.description}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="my-2 bg-[#E5E7EB]" />
              <DropdownMenuItem className="flex cursor-pointer items-start gap-3 rounded p-2 hover:bg-[#F5F7FA]">
                <Headphones className="mt-0.5 h-5 w-5 text-[#333]" />
                <div>
                  <p className="text-sm font-medium">Contact Support</p>
                  <p className="text-xs text-[#6B7280]">Get help from our team</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Community Button */}
          <Button
            variant="ghost"
            className="relative gap-2 px-3 text-[#333] hover:bg-[#F5F7FA] hover:text-[#ee3224]"
            onClick={() => setCommunityOpen(true)}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm font-normal">Community</span>
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee3224] text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Help Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#333] hover:bg-[#F5F7FA] hover:text-[#ee3224]">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px] rounded border-[#E5E7EB] p-2 shadow-lg">
              {helpMenu.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-[#F5F7FA]"
                >
                  <item.icon className="h-5 w-5 text-[#333]" />
                  <span className="flex-1 text-sm">{item.title}</span>
                  {item.status === "operational" && (
                    <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-[#333] hover:bg-[#F5F7FA] hover:text-[#ee3224]">
                <Bell className="h-5 w-5" />
                {userData.unreadNotifications > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee3224] text-[10px] font-medium text-white">
                    {userData.unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[350px] rounded border-[#E5E7EB] p-0 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
                <span className="font-semibold">Notifications</span>
                <button className="text-sm text-[#ee3224] hover:underline">Mark all as read</button>
              </div>
              <ScrollArea className="h-[300px]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      "cursor-pointer border-b border-[#E5E7EB] px-4 py-3 hover:bg-[#F5F7FA]",
                      !notif.read && "bg-[#FEF2F2]"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {!notif.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ee3224]" />}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notif.title}</p>
                        <p className="text-xs text-[#6B7280]">{notif.message}</p>
                        <p className="mt-1 text-xs text-[#6B7280]">{notif.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative ml-1 rounded-full p-0 hover:ring-2 hover:ring-[#ee3224]">
                <Avatar className="h-8 w-8 border-2 border-[#E5E7EB]">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="bg-[#F5F7FA] text-sm font-medium">{userData.initials}</AvatarFallback>
                </Avatar>
                {userData.status === "online" && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white bg-[#22C55E]" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] rounded border-[#E5E7EB] p-0 shadow-lg">
              {/* Header */}
              <div className="bg-[#F5F7FA] p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-white text-base font-medium">{userData.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{userData.name}</p>
                    <p className="text-xs text-[#6B7280]">{userData.email}</p>
                    <Badge className="mt-1 bg-[#ee3224] text-xs text-white hover:bg-[#cc2a1e]">{userData.tier}</Badge>
                  </div>
                </div>
                <button className="mt-2 text-sm font-medium text-[#ee3224] hover:underline">View Profile</button>
              </div>

              {/* Navigation */}
              <div className="p-2">
                <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-[#F5F7FA]">
                  <User className="h-5 w-5 text-[#333]" />
                  <span className="text-sm">Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-[#F5F7FA]">
                  <Settings className="h-5 w-5 text-[#333]" />
                  <span className="text-sm">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-center justify-between gap-3 rounded p-2 hover:bg-[#F5F7FA]">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-[#333]" />
                    <span className="text-sm">Billing & Subscription</span>
                  </div>
                  <span className="text-xs text-[#6B7280]">Pro - $29/mo</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-center justify-between gap-3 rounded p-2 hover:bg-[#F5F7FA]">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-[#333]" />
                    <span className="text-sm">Notifications</span>
                  </div>
                  {userData.unreadNotifications > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ee3224] text-[10px] font-medium text-white">
                      {userData.unreadNotifications}
                    </span>
                  )}
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="my-0 bg-[#E5E7EB]" />

              {/* Footer */}
              <div className="p-2">
                <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-[#F5F7FA]">
                  <Book className="h-5 w-5 text-[#333]" />
                  <span className="text-sm">Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex cursor-pointer items-center gap-3 rounded p-2 text-[#ee3224] hover:bg-[#F5F7FA]"
                  onClick={() => router.push("/login")}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Logout</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Community Slide-Over Panel */}
      <Sheet open={communityOpen} onOpenChange={setCommunityOpen}>
        <SheetContent className="top-16 h-[calc(100vh-64px)] w-[450px] border-l border-[#E5E7EB] p-0 sm:max-w-[450px]">
          <SheetHeader className="border-b border-[#E5E7EB] p-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">Community Discussions</SheetTitle>
            </div>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
              <Input
                placeholder="Search discussions..."
                className="h-8 bg-[#F5F7FA] pl-9"
                value={communitySearch}
                onChange={(e) => setCommunitySearch(e.target.value)}
              />
            </div>
            <Tabs value={communityTab} onValueChange={setCommunityTab} className="mt-3">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="my">My Discussions</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
            </Tabs>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-64px-200px-140px)] overflow-y-auto">
            <div className="p-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className={cn(
                    "mb-3 cursor-pointer rounded-lg border border-[#E5E7EB] p-3 transition-colors hover:bg-[#F5F7FA]",
                    discussion.unread && "border-l-2 border-l-[#ee3224]"
                  )}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="line-clamp-1 text-sm font-semibold">{discussion.title}</h4>
                    <Badge variant="secondary" className="ml-2 shrink-0 text-[10px]">{discussion.assetBadge}</Badge>
                  </div>
                  <p className="line-clamp-2 text-xs text-[#6B7280]">{discussion.excerpt}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px]">{discussion.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-[#6B7280]">{discussion.author}</span>
                      <span className="text-xs text-[#6B7280]">{discussion.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" />
                        {discussion.upvotes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {discussion.replies}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Panel Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#E5E7EB] bg-white p-4">
            <Button className="w-full bg-[#ee3224] hover:bg-[#cc2a1e]">
              Start New Discussion
            </Button>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#6B7280]">
              <a href="#" className="hover:text-[#ee3224]">Documentation</a>
              <a href="#" className="hover:text-[#ee3224]">Tutorials</a>
              <a href="#" className="hover:text-[#ee3224]">Support Portal</a>
            </div>
            <p className="mt-2 text-center text-xs text-[#6B7280]">Press Escape to close</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
