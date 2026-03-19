"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  House,
  Hammer,
  Rocket,
  Compass,
  Lightbulb,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Folder,
  Database,
  Link,
  RefreshCcw,
  BarChart3,
  Activity,
  Award,
  Sparkles,
  Star,
  Download,
  Bell,
  Megaphone,
  Package,
  Users,
  DollarSign,
  Bot,
  Mic,
  FileText,
  MessageSquare,
  BookOpen,
  Mail,
  Puzzle,
  ArrowUp,
  ExternalLink,
  UserPlus,
  UserCheck,
  BadgeCheck
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

// Mock data
const continueData = [
  {
    id: "continue-001",
    type: "Project",
    name: "Enterprise Sales Agent",
    icon: Bot,
    lastActivity: "2 hours ago",
    progress: 75,
    path: "/build/projects",
    action: "Resume"
  },
  {
    id: "continue-002",
    type: "App",
    name: "Briefly AI",
    icon: Mic,
    lastActivity: "5 hours ago",
    progress: null,
    path: "/use/installed-apps",
    action: "Launch"
  },
  {
    id: "continue-003",
    type: "Dashboard",
    name: "Pulse Check",
    icon: Activity,
    lastActivity: "1 day ago",
    progress: null,
    path: "/manage/pulse-check",
    action: "View"
  },
  {
    id: "continue-004",
    type: "Template",
    name: "Meeting Notes Template",
    icon: FileText,
    lastActivity: "2 days ago",
    progress: null,
    path: "/explore/templates",
    action: "Use"
  },
  {
    id: "continue-005",
    type: "Plugin",
    name: "Slack Connector",
    icon: MessageSquare,
    lastActivity: "3 days ago",
    progress: null,
    path: "/explore/plugins",
    action: "Edit"
  }
]

const recommendations = [
  {
    id: "rec-001",
    type: "Agent",
    name: "Research Assistant",
    description: "Deep dive into any topic with AI-assisted literature review",
    rating: 4.6,
    installs: "5.6K",
    icon: BookOpen,
    action: "Install"
  },
  {
    id: "rec-002",
    type: "Template",
    name: "Meeting Notes Automation",
    description: "Auto-summarize and distribute meeting notes",
    rating: 4.8,
    installs: "1.2K",
    icon: FileText,
    action: "Use"
  },
  {
    id: "rec-003",
    type: "Plugin",
    name: "Slack Connector",
    description: "Send notifications to Slack channels",
    rating: 4.5,
    installs: "45.2K",
    icon: MessageSquare,
    action: "Install"
  },
  {
    id: "rec-004",
    type: "Agent",
    name: "InboxIQ AI",
    description: "Privately triage, summarize, and draft email responses",
    rating: 4.9,
    installs: "18.2K",
    icon: Mail,
    action: "Install"
  },
  {
    id: "rec-005",
    type: "Template",
    name: "Lead Qualification Pipeline",
    description: "Score and route sales leads automatically",
    rating: 4.4,
    installs: "892",
    icon: Users,
    action: "Use"
  },
  {
    id: "rec-006",
    type: "Plugin",
    name: "Google Workspace Integration",
    description: "Connect Gmail, Calendar, Drive",
    rating: 4.7,
    installs: "38.7K",
    icon: Puzzle,
    action: "Install"
  }
]

const recentActivity = [
  { id: 1, avatar: "user", text: "You deployed Enterprise Sales Agent to Production", time: "2 hours ago" },
  { id: 2, avatar: "user", text: "Alex updated Customer Support Bot", time: "5 hours ago" },
  { id: 3, avatar: "celebration", text: "Briefly AI reached 10K installs!", time: "1 day ago" },
  { id: 4, avatar: "comment", text: "New discussion on MindLink AI", time: "2 days ago" },
  { id: 5, avatar: "user", text: "You created Meeting Notes Template", time: "3 days ago" },
  { id: 6, avatar: "system", text: "System: Platform update deployed", time: "4 days ago" },
  { id: 7, avatar: "user", text: "Sarah joined your team workspace", time: "1 week ago" }
]

const platformUpdates = [
  { id: 1, icon: Rocket, title: "Cross-Device handoff now supports iOS → PC", description: "Seamlessly continue tasks from iPhone to desktop", badge: "New" },
  { id: 2, icon: Activity, title: "Workflow builder performance +30%", description: "Faster node rendering and connection updates", badge: "Improved" },
  { id: 3, icon: FileText, title: "12 new enterprise templates", description: "Pre-built workflows for sales, support, HR, and finance", badge: "New" },
  { id: 4, icon: Package, title: "Enhanced credential encryption", description: "AES-256 encryption for all stored connections", badge: "Improved" }
]

const tips = [
  "Try Briefly AI to summarize your next meeting",
  "Connect Slack to get real-time notifications from your agents",
  "Use templates to jumpstart your next workflow",
  "Check Pulse to monitor your agent performance"
]

// Mock data for user's followers and following
const myFollowers = [
  { id: "f1", name: "DataFlow Inc", initials: "DF", verified: true },
  { id: "f2", name: "AI Labs", initials: "AI", verified: true },
  { id: "f3", name: "Sarah Chen", initials: "SC", verified: false },
  { id: "f4", name: "Workflow Labs", initials: "WL", verified: true },
  { id: "f5", name: "Alex Johnson", initials: "AJ", verified: false },
  { id: "f6", name: "TechStart", initials: "TS", verified: false },
  { id: "f7", name: "Mike Rodriguez", initials: "MR", verified: false },
  { id: "f8", name: "DataMind", initials: "DM", verified: true }
]

const myFollowing = [
  { id: "g1", name: "AI Labs", initials: "AI", verified: true },
  { id: "g2", name: "DataFlow Inc", initials: "DF", verified: true },
  { id: "g3", name: "Workflow Labs", initials: "WL", verified: true },
  { id: "g4", name: "Plugin Masters", initials: "PM", verified: true },
  { id: "g5", name: "Emily Watson", initials: "EW", verified: false }
]

export default function HomePage() {
  const router = useRouter()
  const [showTip, setShowTip] = useState(true)
  const [currentTip] = useState(0)
  const [continueScrollIndex, setContinueScrollIndex] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [networkModalOpen, setNetworkModalOpen] = useState(false)
  const [networkModalTab, setNetworkModalTab] = useState<"followers" | "following">("followers")

  const handleRefreshRecommendations = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const scrollContinue = (direction: "left" | "right") => {
    if (direction === "left" && continueScrollIndex > 0) {
      setContinueScrollIndex(continueScrollIndex - 1)
    } else if (direction === "right" && continueScrollIndex < continueData.length - 3) {
      setContinueScrollIndex(continueScrollIndex + 1)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Component 2: Page Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <House className="h-6 w-6 text-[#ee3224]" />
            <h1 className="text-2xl font-semibold text-[#1F2937]">Home</h1>
          </div>
          <p className="text-sm text-[#6B7280]">
            Welcome back, Zoey. What would you like to do today?
          </p>
        </div>

        {/* Primary Action Cards (3-Card Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Build an Agent */}
          <Card 
            className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
            onClick={() => router.push("/build/projects")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#FEF2F2] mb-4">
                <Hammer className="h-8 w-8 text-[#ee3224]" />
              </div>
              <h3 className="card-title-text text-base font-semibold text-[#1F2937] transition-colors duration-150 mb-1">Build an Agent</h3>
              <p className="text-[13px] text-[#6B7280] mb-4">Create AI agents and workflows from scratch</p>
              <Button className="bg-[#ee3224] hover:bg-[#cc2a1e] text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Launch an App */}
          <Card 
            className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
            onClick={() => router.push("/use/installed-apps")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#FEF2F2] mb-4">
                <Rocket className="h-8 w-8 text-[#ee3224]" />
              </div>
              <h3 className="card-title-text text-base font-semibold text-[#1F2937] transition-colors duration-150 mb-1">Launch an App</h3>
              <p className="text-[13px] text-[#6B7280] mb-4">Open your installed AI applications</p>
              <Button className="bg-[#ee3224] hover:bg-[#cc2a1e] text-white">
                Open Apps
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: Explore Marketplace */}
          <Card 
            className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
            onClick={() => router.push("/explore/agents")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#FEF2F2] mb-4">
                <Compass className="h-8 w-8 text-[#ee3224]" />
              </div>
              <h3 className="card-title-text text-base font-semibold text-[#1F2937] transition-colors duration-150 mb-1">Explore Marketplace</h3>
              <p className="text-[13px] text-[#6B7280] mb-4">Discover agents, templates, and plugins</p>
              <Button className="bg-[#ee3224] hover:bg-[#cc2a1e] text-white">
                Browse
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contextual Tip Banner */}
        {showTip && (
          <div className="flex items-center justify-between bg-[#F5F7FA] border-l-[3px] border-l-[#ee3224] rounded px-4 py-3">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-4 w-4 text-[#ee3224]" />
              <p className="text-sm text-[#333]">
                <span className="font-medium">Quick Tip:</span> {tips[currentTip]}
              </p>
            </div>
            <button onClick={() => setShowTip(false)} className="text-[#6B7280] hover:text-[#333]">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Component 3: Continue Where You Left Off */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-[#ee3224]" />
                <h2 className="text-lg font-semibold text-[#1F2937]">Continue</h2>
              </div>
              <p className="text-sm text-[#6B7280]">Pick up where you left off</p>
            </div>
            <button className="text-sm text-[#ee3224] hover:underline">View All</button>
          </div>

          <div className="relative">
            {/* Scroll Buttons */}
            {continueScrollIndex > 0 && (
              <button 
                onClick={() => scrollContinue("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-8 w-8 flex items-center justify-center bg-white border border-[#E5E7EB] rounded-full shadow-sm hover:shadow-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            {continueScrollIndex < continueData.length - 3 && (
              <button 
                onClick={() => scrollContinue("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-8 w-8 flex items-center justify-center bg-white border border-[#E5E7EB] rounded-full shadow-sm hover:shadow-md"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {/* Cards */}
            <div className="flex gap-4 overflow-hidden">
              {continueData.slice(continueScrollIndex, continueScrollIndex + 3).map((item) => (
                <Card 
                  key={item.id}
                  className="card-interactive group flex-1 min-w-0 border border-[#E5E7EB] bg-white shadow-sm"
                  onClick={() => router.push(item.path)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white border border-[#E5E7EB]">
                        <item.icon className="h-6 w-6 text-[#ee3224]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="card-title-text text-[15px] font-semibold text-[#1F2937] transition-colors duration-150 truncate">{item.name}</h4>
                        <Badge variant="secondary" className="text-xs bg-[#F5F7FA] text-[#333] mt-1">
                          {item.type}
                        </Badge>
                        <p className="text-xs text-[#6B7280] mt-2">Last edited: {item.lastActivity}</p>
                        {item.progress && (
                          <div className="mt-2">
                            <Progress value={item.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4 border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white"
                    >
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Component 4: Quick Access by Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="h-5 w-5 text-[#ee3224]" />
            <h2 className="text-lg font-semibold text-[#1F2937]">Quick Access</h2>
          </div>
          <p className="text-sm text-[#6B7280] mb-4">Navigate to any section instantly</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Build Card */}
            <Card className="border border-[#E5E7EB] bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Hammer className="h-6 w-6 text-[#ee3224]" />
                  <h3 className="text-base font-semibold text-[#1F2937]">Build</h3>
                </div>
                <p className="text-[13px] text-[#6B7280] mb-4">Create agents and workflows</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/build/projects")}>
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Projects</span>
                      <span className="text-xs text-[#6B7280]">Create agents</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/build/knowledge")}>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Knowledge</span>
                      <span className="text-xs text-[#6B7280]">Manage context</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/build/connections")}>
                    <div className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Connections</span>
                      <span className="text-xs text-[#6B7280]">Connect tools</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use Card */}
            <Card className="border border-[#E5E7EB] bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="h-6 w-6 text-[#ee3224]" />
                  <h3 className="text-base font-semibold text-[#1F2937]">Use</h3>
                </div>
                <p className="text-[13px] text-[#6B7280] mb-4">Launch and manage apps</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/use/installed-apps")}>
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Installed Apps</span>
                      <span className="text-xs text-[#6B7280]">Launch apps</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/use/cross-devices")}>
                    <div className="flex items-center gap-2">
                      <RefreshCcw className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Cross Devices</span>
                      <span className="text-xs text-[#6B7280]">Sync devices</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Explore Card */}
            <Card className="border border-[#E5E7EB] bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="h-6 w-6 text-[#ee3224]" />
                  <h3 className="text-base font-semibold text-[#1F2937]">Explore</h3>
                </div>
                <p className="text-[13px] text-[#6B7280] mb-4">Discover community assets</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/explore/agents")}>
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Agents</span>
                      <span className="text-xs text-[#6B7280]">Find agents</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/explore/templates")}>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Templates</span>
                      <span className="text-xs text-[#6B7280]">Speed up build</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/explore/plugins")}>
                    <div className="flex items-center gap-2">
                      <Puzzle className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Plugins</span>
                      <span className="text-xs text-[#6B7280]">Extend agents</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manage Card */}
            <Card className="border border-[#E5E7EB] bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-6 w-6 text-[#ee3224]" />
                  <h3 className="text-base font-semibold text-[#1F2937]">Manage</h3>
                </div>
                <p className="text-[13px] text-[#6B7280] mb-4">Monitor and track progress</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/manage/pulse-check")}>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Pulse Check</span>
                      <span className="text-xs text-[#6B7280]">Monitor health</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA] cursor-pointer" onClick={() => router.push("/manage/creator-status")}>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#333]">Creator Status</span>
                      <span className="text-xs text-[#6B7280]">Track progress</span>
                    </div>
                    <button className="text-xs text-[#ee3224] hover:underline">Go</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Component 5: Recommended for You */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#ee3224]" />
                <h2 className="text-lg font-semibold text-[#1F2937]">Recommended</h2>
              </div>
              <p className="text-sm text-[#6B7280]">Personalized suggestions based on your activity</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleRefreshRecommendations}
              className={isRefreshing ? "animate-spin" : ""}
            >
              <RefreshCcw className="h-4 w-4 text-[#6B7280]" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <Card 
                key={rec.id}
                className="border border-[#E5E7EB] bg-white shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F5F7FA]">
                      <rec.icon className="h-6 w-6 text-[#ee3224]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-[#1F2937]">{rec.name}</h4>
                        <Badge variant="secondary" className="text-xs bg-[#F5F7FA] text-[#333]">
                          {rec.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#6B7280] mb-3 line-clamp-2">{rec.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{rec.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#6B7280]">
                      <Download className="h-4 w-4" />
                      <span className="text-sm">{rec.installs}</span>
                    </div>
                  </div>
                  <Button 
                    className={rec.action === "Install" 
                      ? "w-full bg-[#ee3224] hover:bg-[#cc2a1e] text-white" 
                      : "w-full border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white"
                    }
                    variant={rec.action === "Install" ? "default" : "outline"}
                  >
                    {rec.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Component 6: Activity & Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Recent Activity (60%) */}
          <Card className="lg:col-span-3 border border-[#E5E7EB] bg-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#ee3224]" />
                  <h3 className="text-base font-semibold text-[#1F2937]">Recent Activity</h3>
                </div>
                <button className="text-sm text-[#ee3224] hover:underline">View All</button>
              </div>
              <div className="space-y-3 max-h-[280px] overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-3 p-2 rounded hover:bg-[#F5F7FA] cursor-pointer"
                  >
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#F5F7FA]">
                      {activity.avatar === "celebration" ? (
                        <span className="text-xs">🎉</span>
                      ) : activity.avatar === "comment" ? (
                        <span className="text-xs">💬</span>
                      ) : activity.avatar === "system" ? (
                        <span className="text-xs">🔧</span>
                      ) : (
                        <span className="text-xs">👤</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#333]">{activity.text}</p>
                      <p className="text-xs text-[#6B7280]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Updates (40%) */}
          <Card className="lg:col-span-2 border border-[#E5E7EB] bg-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-[#ee3224]" />
                  <h3 className="text-base font-semibold text-[#1F2937]">Platform Updates</h3>
                </div>
                <button className="text-sm text-[#ee3224] hover:underline flex items-center gap-1">
                  Release Notes <ExternalLink className="h-3 w-3" />
                </button>
              </div>
              <div className="space-y-3 max-h-[280px] overflow-y-auto">
                {platformUpdates.map((update) => (
                  <div 
                    key={update.id}
                    className="p-3 rounded hover:bg-[#F5F7FA] cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <update.icon className="h-4 w-4 text-[#ee3224] mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[#333]">{update.title}</p>
                          <Badge className={update.badge === "New" ? "bg-[#ee3224] text-white text-xs" : "bg-[#6B7280] text-white text-xs"}>
                            {update.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{update.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component 7: Quick Stats (Creator Dashboard) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#ee3224]" />
                <h2 className="text-lg font-semibold text-[#1F2937]">Your Impact</h2>
              </div>
              <p className="text-sm text-[#6B7280]">Your contribution to the platform</p>
            </div>
            <button 
              className="text-sm text-[#ee3224] hover:underline"
              onClick={() => router.push("/manage/pulse-check")}
            >
              View Full Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* My Network */}
            <Card 
              className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
              onClick={() => { setNetworkModalTab("followers"); setNetworkModalOpen(true); }}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#FEF2F2]">
                    <Users className="h-6 w-6 text-[#ee3224]" />
                  </div>
                </div>
                <p className="card-title-text text-[28px] font-bold text-[#1F2937] transition-colors duration-150">{myFollowers.length}</p>
                <p className="text-[13px] text-[#6B7280]">Followers</p>
                <button 
                  className="text-xs text-[#ee3224] hover:underline mt-2"
                  onClick={(e) => { e.stopPropagation(); setNetworkModalTab("following"); setNetworkModalOpen(true); }}
                >
                  {myFollowing.length} Following
                </button>
              </CardContent>
            </Card>

            {/* Assets Built */}
            <Card 
              className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
              onClick={() => router.push("/manage/creator-status")}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#FEF2F2]">
                    <Package className="h-6 w-6 text-[#ee3224]" />
                  </div>
                </div>
                <p className="card-title-text text-[28px] font-bold text-[#1F2937] transition-colors duration-150">12</p>
                <p className="text-[13px] text-[#6B7280]">Assets published</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+2 this month</span>
                </div>
              </CardContent>
            </Card>

            {/* Users Reached */}
            <Card 
              className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
              onClick={() => router.push("/manage/creator-status")}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#FEF2F2]">
                    <Users className="h-6 w-6 text-[#ee3224]" />
                  </div>
                </div>
                <p className="card-title-text text-[28px] font-bold text-[#1F2937] transition-colors duration-150">45.2K</p>
                <p className="text-[13px] text-[#6B7280]">Across all assets</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+12% vs last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Avg Rating */}
            <Card 
              className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
              onClick={() => router.push("/manage/creator-status")}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#FEF2F2]">
                    <Star className="h-6 w-6 text-[#ee3224]" />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <p className="card-title-text text-[28px] font-bold text-[#1F2937] transition-colors duration-150">4.6</p>
                  <Star className="h-5 w-5 text-[#F59E0B] fill-current" />
                </div>
                <p className="text-[13px] text-[#6B7280]">Across all assets</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+0.2 vs last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Earnings */}
            <Card 
              className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
              onClick={() => router.push("/manage/creator-status")}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#FEF2F2]">
                    <DollarSign className="h-6 w-6 text-[#ee3224]" />
                  </div>
                </div>
                <p className="card-title-text text-[28px] font-bold text-[#1F2937] transition-colors duration-150">$1,234</p>
                <p className="text-[13px] text-[#6B7280]">This month</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+8% vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Network Modal */}
        <Dialog open={networkModalOpen} onOpenChange={setNetworkModalOpen}>
          <DialogContent className="max-w-md" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>My Network</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2 border-b mb-4">
              <button
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                  networkModalTab === "followers" 
                    ? "border-[#ee3224] text-[#ee3224]" 
                    : "border-transparent text-[#6B7280] hover:text-[#333]"
                }`}
                onClick={() => setNetworkModalTab("followers")}
              >
                Followers ({myFollowers.length})
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                  networkModalTab === "following" 
                    ? "border-[#ee3224] text-[#ee3224]" 
                    : "border-transparent text-[#6B7280] hover:text-[#333]"
                }`}
                onClick={() => setNetworkModalTab("following")}
              >
                Following ({myFollowing.length})
              </button>
            </div>
            <ScrollArea className="max-h-[400px]">
              <div className="space-y-3">
                {(networkModalTab === "followers" ? myFollowers : myFollowing).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded hover:bg-[#F5F7FA]">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#FEF2F2] text-[#ee3224] text-sm font-medium">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-[#333]">{user.name}</span>
                          {user.verified && (
                            <BadgeCheck className="h-4 w-4 text-[#22C55E] fill-[#22C55E]" />
                          )}
                        </div>
                        <span className="text-xs text-[#6B7280]">Creator</span>
                      </div>
                    </div>
                    {networkModalTab === "followers" ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs border-[#ee3224] text-[#ee3224] hover:bg-[#ee3224] hover:text-white"
                      >
                        <UserPlus className="h-3 w-3 mr-1" /> Follow Back
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E] hover:text-white"
                      >
                        <UserCheck className="h-3 w-3 mr-1" /> Following
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
