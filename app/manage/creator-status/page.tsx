"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Award,
  Trophy,
  Star,
  Users,
  Package,
  Clock,
  Check,
  Lock,
  TrendingUp,
  DollarSign,
  CreditCard,
  FileText,
  ExternalLink,
  HelpCircle,
  Book,
  MessageSquare,
  Zap,
  Target,
  Shield,
  Lightbulb,
  Search,
  CheckCircle,
} from "lucide-react"

// Mock data
const tierData = {
  current: "Gold",
  currentColor: "#FFD700",
  next: "Platinum",
  nextColor: "#E5E4E2",
  progress: {
    installs: 8234,
    installsRequired: 50000,
    rating: 4.6,
    ratingRequired: 4.7,
    percentage: 80,
  },
  benefits: [
    "Featured Placement in Discover",
    "10% Revenue Boost (80% share)",
    "Early Access to New Features",
    "Priority Support Queue",
  ],
}

const badges = [
  { id: "badge-001", name: "Top Contributor", icon: Trophy, description: "1K+ installs across assets", tier: "Gold", earned: true, earnedDate: "Feb 15, 2025" },
  { id: "badge-002", name: "Documentation Master", icon: Book, description: "5+ assets with complete docs", tier: "Silver", earned: true, earnedDate: "Jan 20, 2025" },
  { id: "badge-003", name: "Community Champion", icon: MessageSquare, description: "50+ helpful replies in discussions", tier: "Silver", earned: true, earnedDate: "Mar 1, 2025" },
  { id: "badge-004", name: "Fast Responder", icon: Zap, description: "Avg discussion response time <24h", tier: "Bronze", earned: true, earnedDate: "Feb 28, 2025" },
  { id: "badge-005", name: "Quality Creator", icon: Star, description: "Maintain 4.5+ avg rating across assets", tier: "Gold", earned: true, earnedDate: "Mar 5, 2025" },
  { id: "badge-006", name: "Retention King", icon: Target, description: "Day 30 retention >40%", tier: "Gold", earned: true, earnedDate: "Feb 10, 2025" },
  { id: "badge-007", name: "Launch Pad", icon: Zap, description: "3+ assets in first 30 days", tier: "Bronze", earned: true, earnedDate: "Jan 15, 2025" },
  { id: "badge-008", name: "Team Player", icon: Users, description: "Contribute to 3+ team assets", tier: "Silver", earned: true, earnedDate: "Feb 20, 2025" },
  { id: "badge-009", name: "Enterprise Verified", icon: Shield, description: "Enterprise compliance certified", tier: "Platinum", earned: false, earnedDate: null },
  { id: "badge-010", name: "10K Club", icon: Trophy, description: "10K+ installs on single asset", tier: "Gold", earned: false, earnedDate: null },
  { id: "badge-011", name: "Support Hero", icon: MessageSquare, description: "100+ support tickets resolved", tier: "Silver", earned: false, earnedDate: null },
  { id: "badge-012", name: "Innovation Award", icon: Lightbulb, description: "Most innovative asset of quarter", tier: "Platinum", earned: false, earnedDate: null },
]

const revenueData = {
  totalEarned: 12847,
  thisMonth: 1234,
  thisMonthTrend: 8,
  pendingPayout: 456,
  lastPayout: { amount: 2341, date: "Feb 28, 2025" },
  breakdown: [
    { type: "Agent Sales", amount: 8234, percentage: 64, color: "#ee3224" },
    { type: "Template Sales", amount: 3102, percentage: 24, color: "#C0C6CA" },
    { type: "Plugin Sales", amount: 1511, percentage: 12, color: "#E5E7EB" },
  ],
}

const payoutHistory = [
  { date: "Feb 28, 2025", amount: 2341.00, method: "Bank Transfer", status: "Completed", transactionId: "TXN-2025-0234" },
  { date: "Jan 31, 2025", amount: 1892.00, method: "Bank Transfer", status: "Completed", transactionId: "TXN-2025-0156" },
  { date: "Dec 31, 2024", amount: 2105.00, method: "Bank Transfer", status: "Completed", transactionId: "TXN-2024-0892" },
  { date: "Nov 30, 2024", amount: 1678.00, method: "PayPal", status: "Completed", transactionId: "TXN-2024-0734" },
]

const impactStats = [
  { id: "assets", icon: Package, value: "6", label: "Assets Published", trend: "+2 this month", clickable: false },
  { id: "users", icon: Users, value: "45.2K", label: "Users Reached", trend: "+12%", clickable: false },
  { id: "rating", icon: Star, value: "4.6", label: "Avg Rating", trend: "+0.2", clickable: false },
  { id: "followers", icon: Users, value: "1.2K", label: "Followers", trend: "+156 this month", clickable: true },
  { id: "leaderboard", icon: Trophy, value: "#47", label: "Leaderboard Position", trend: "+12 positions", clickable: false },
]

const followersData = [
  { id: "f1", name: "Alex Chen", username: "@alexchen", avatar: "", verified: true },
  { id: "f2", name: "Sarah Kim", username: "@sarahkim", avatar: "", verified: false },
  { id: "f3", name: "Michael Ross", username: "@mross", avatar: "", verified: true },
  { id: "f4", name: "Emily Davis", username: "@emilyd", avatar: "", verified: false },
  { id: "f5", name: "James Wilson", username: "@jwilson", avatar: "", verified: false },
  { id: "f6", name: "Lisa Wang", username: "@lisawang", avatar: "", verified: true },
  { id: "f7", name: "David Park", username: "@dpark", avatar: "", verified: false },
  { id: "f8", name: "Jennifer Lee", username: "@jlee", avatar: "", verified: false },
  { id: "f9", name: "Robert Taylor", username: "@rtaylor", avatar: "", verified: true },
  { id: "f10", name: "Amanda White", username: "@awhite", avatar: "", verified: false },
]

export default function CreatorStatusPage() {
  const [viewMode, setViewMode] = useState("personal")
  const [badgeFilter, setBadgeFilter] = useState("all")
  const [payoutModalOpen, setPayoutModalOpen] = useState(false)
  const [payoutHistoryOpen, setPayoutHistoryOpen] = useState(false)
  const [allBadgesOpen, setAllBadgesOpen] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState("bank")
  const [followersModalOpen, setFollowersModalOpen] = useState(false)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze": return "#CD7F32"
      case "Silver": return "#C0C0C0"
      case "Gold": return "#FFD700"
      case "Platinum": return "#E5E4E2"
      default: return "#E5E7EB"
    }
  }

  const filteredBadges = badges.filter(badge => {
    if (badgeFilter === "all") return true
    if (badgeFilter === "earned") return badge.earned
    if (badgeFilter === "locked") return !badge.earned
    return true
  })

  const earnedCount = badges.filter(b => b.earned).length

  return (
    <AppLayout>
      <TooltipProvider>
        <>
          {/* Page Header */}
          <div className="sticky top-0 z-10 bg-white px-8 py-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#ee3224]" />
                  <h1 className="text-2xl font-semibold text-foreground">Creator Status</h1>
                </div>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Track your achievements, tier progress, and earnings as a creator.
                </p>
              </div>
              <Button variant="link" className="text-[#ee3224] gap-1">
                <HelpCircle className="h-4 w-4" />
                How tiers work
              </Button>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center rounded-lg bg-[#F5F7FA] p-1">
                <button
                  onClick={() => setViewMode("personal")}
                  className={`px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                    viewMode === "personal"
                      ? "bg-white text-[#333] shadow-sm"
                      : "text-[#6B7280] hover:text-[#333]"
                  }`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setViewMode("team")}
                  className={`px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                    viewMode === "team"
                      ? "bg-white text-[#333] shadow-sm"
                      : "text-[#6B7280] hover:text-[#333]"
                  }`}
                >
                  Team
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto bg-[#F5F7FA]">
            <div className="px-8 py-6 space-y-6">
            {/* Tier Status and Badges - Side by Side */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: Current Tier Card - Takes 1 column */}
            <Card className="bg-gradient-to-r from-[#F5F7FA] to-white flex flex-col lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Current Tier</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 flex-1 flex flex-col">
                {/* Tier Badge - Centered */}
                <div className="flex flex-col items-center justify-center text-center flex-1">
                  <div 
                    className="flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-lg"
                    style={{ borderColor: tierData.currentColor, backgroundColor: `${tierData.currentColor}20` }}
                  >
                    <Trophy className="h-10 w-10" style={{ color: tierData.currentColor }} />
                  </div>
                  <p className="mt-4 text-xl font-semibold">{tierData.current.toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground">Member since Jan 2025</p>
                </div>

                {/* Progress Section */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Progress to {tierData.next}</p>
                  <div className="mt-2">
                    <Progress value={tierData.progress.percentage} className="h-3" />
                  </div>
                  <p className="mt-2 font-mono text-sm">
                    {tierData.progress.installs.toLocaleString()} / {tierData.progress.installsRequired.toLocaleString()} installs
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Requirements remaining: +{(tierData.progress.installsRequired - tierData.progress.installs).toLocaleString()} installs, +{(tierData.progress.ratingRequired - tierData.progress.rating).toFixed(1)} avg rating
                  </p>
                </div>

                {/* Benefits Section */}
                <div className="mt-4">
                  <p className="font-semibold text-sm">Unlocked Benefits:</p>
                  <ul className="mt-2 space-y-1">
                    {tierData.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="text-[#ee3224] p-0 h-auto mt-2">
                    View All Benefits
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right: Badges Earned Card - Takes 2 columns */}
            <Card className="flex flex-col lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold">Badges Earned</CardTitle>
                  <Badge variant="secondary">{earnedCount}/{badges.length}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={badgeFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBadgeFilter("all")}
                    className={badgeFilter === "all" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                  >
                    All
                  </Button>
                  <Button
                    variant={badgeFilter === "earned" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBadgeFilter("earned")}
                    className={badgeFilter === "earned" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                  >
                    Earned
                  </Button>
                  <Button
                    variant={badgeFilter === "locked" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBadgeFilter("locked")}
                    className={badgeFilter === "locked" ? "bg-[#ee3224] hover:bg-[#cc2a1e]" : ""}
                  >
                    Locked
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredBadges.slice(0, 6).map((badge) => {
                  const IconComponent = badge.icon
                  return (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <Card className={`border border-[#E5E7EB] bg-white shadow-sm ${!badge.earned ? "opacity-50" : ""}`}>
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-9 w-9 items-center justify-center rounded-full relative flex-shrink-0"
                                style={{ backgroundColor: `${getTierColor(badge.tier)}20` }}
                              >
                                <IconComponent className="h-4 w-4" style={{ color: getTierColor(badge.tier) }} />
                                {!badge.earned && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
                                    <Lock className="h-3 w-3 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <p className="font-semibold text-sm flex-shrink-0">{badge.name}</p>
                              <p className="text-xs text-muted-foreground flex-1 truncate">{badge.description}</p>
                              <div className="flex-shrink-0 text-right">
                                {badge.earned ? (
                                  <p className="text-xs text-muted-foreground">{badge.earnedDate}</p>
                                ) : (
                                  <Badge variant="outline" className="text-xs">Locked</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{badge.name}</p>
                        <p className="text-xs">{badge.description}</p>
                        <p className="text-xs mt-1">Tier: {badge.tier}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setAllBadgesOpen(true)}>
                  View All Badges
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>

          {/* Revenue Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Revenue & Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left: Summary */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                    <p className="text-3xl font-bold text-[#ee3224]">${revenueData.totalEarned.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">${revenueData.thisMonth.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                          <TrendingUp className="h-3 w-3" />
                          +{revenueData.thisMonthTrend}%
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Payout</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">${revenueData.pendingPayout}</p>
                        <Clock className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last Payout: ${revenueData.lastPayout.amount.toLocaleString()} on {revenueData.lastPayout.date}
                  </p>
                </div>

                {/* Right: Breakdown */}
                <div>
                  <p className="font-semibold text-sm mb-3">Revenue Breakdown by Asset Type</p>
                  <div className="space-y-3">
                    {revenueData.breakdown.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.type}</span>
                          <span className="font-medium">${item.amount.toLocaleString()} ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="text-[#ee3224] p-0 h-auto mt-3">
                    View Detailed Report
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E5E7EB]">
                <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={() => setPayoutModalOpen(true)}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Request Payout
                </Button>
                <Button variant="outline" className="border-[#ee3224] text-[#ee3224]" onClick={() => setPayoutHistoryOpen(true)}>
                  View Payout History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Your Impact Section */}
          <Card>
            <CardHeader className="py-3 px-5 pb-1">
              <CardTitle className="text-lg font-semibold">Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {impactStats.map((stat) => {
                  const IconComponent = stat.icon
                  const isClickable = stat.clickable
                  return (
                    <Tooltip key={stat.id}>
                      <TooltipTrigger asChild>
                        <Card 
                          className={`border border-[#E5E7EB] bg-white shadow-sm ${isClickable ? "card-interactive group" : ""}`}
                          onClick={() => isClickable && setFollowersModalOpen(true)}
                        >
                          <CardContent className="py-3 px-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ee3224]/10">
                                <IconComponent className="h-6 w-6 text-[#ee3224]" />
                              </div>
                              <div>
                                <p className={`text-[28px] font-bold text-[#1F2937] ${isClickable ? "card-title-text transition-colors duration-150" : ""}`}>{stat.value}</p>
                                <p className="text-[13px] text-[#6B7280]">{stat.label}</p>
                                <div className="flex items-center gap-1 text-xs text-[#22C55E] mt-1">
                                  <TrendingUp className="h-3 w-3" />
                                  {stat.trend}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      {isClickable && (
                        <TooltipContent>
                          <p>View all users who follow you</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Payout Modal */}
          <Dialog open={payoutModalOpen} onOpenChange={setPayoutModalOpen}>
            <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-3xl font-bold">${revenueData.pendingPayout.toFixed(2)}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Minimum Payout: $100.00
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Payout Method</p>
                  <Select value={payoutMethod} onValueChange={setPayoutMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Bank Account: ****1234</p>
                  <p className="text-muted-foreground">Processing Time: 3-5 business days</p>
                  <p className="text-emerald-600">No fees for bank transfer</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setPayoutModalOpen(false)}>Cancel</Button>
                <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" disabled={revenueData.pendingPayout < 100}>
                  Confirm Payout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Payout History Modal */}
          <Dialog open={payoutHistoryOpen} onOpenChange={setPayoutHistoryOpen}>
            <DialogContent className="sm:max-w-3xl" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Payout History</DialogTitle>
              </DialogHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payoutHistory.map((payout, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell className="font-medium">${payout.amount.toFixed(2)}</TableCell>
                      <TableCell>{payout.method}</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500">{payout.status}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{payout.transactionId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <DialogFooter>
                <Button variant="outline" className="border-[#ee3224] text-[#ee3224]">
                  <FileText className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* All Badges Modal */}
          <Dialog open={allBadgesOpen} onOpenChange={setAllBadgesOpen}>
            <DialogContent className="sm:max-w-4xl max-h-[80vh]" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>All Badges ({earnedCount}/{badges.length} Earned)</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh]">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-1">
                  {badges.map((badge) => {
                    const IconComponent = badge.icon
                    return (
                      <Card key={badge.id} className={`${!badge.earned ? "opacity-50" : ""}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className="flex h-12 w-12 items-center justify-center rounded-full relative flex-shrink-0"
                              style={{ backgroundColor: `${getTierColor(badge.tier)}20` }}
                            >
                              <IconComponent className="h-6 w-6" style={{ color: getTierColor(badge.tier) }} />
                              {!badge.earned && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm">{badge.name}</p>
                              <p className="text-xs text-muted-foreground">{badge.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                  variant="outline" 
                                  className="text-xs"
                                  style={{ borderColor: getTierColor(badge.tier), color: getTierColor(badge.tier) }}
                                >
                                  {badge.tier}
                                </Badge>
                                {badge.earned ? (
                                  <span className="text-xs text-muted-foreground">{badge.earnedDate}</span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">Locked</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Followers List Modal */}
          <Dialog open={followersModalOpen} onOpenChange={setFollowersModalOpen}>
            <DialogContent className="max-w-[500px] max-h-[70vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="text-[16px] font-semibold text-[#1F2937]">Your Followers</DialogTitle>
                <p className="text-[13px] text-[#6B7280]">1.2K users follow you</p>
              </DialogHeader>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <Input placeholder="Search followers..." className="pl-9 rounded-lg border-[#E5E7EB]" />
              </div>
              <ScrollArea className="flex-1 mt-4">
                <div className="space-y-2 pr-4">
                  {followersData.map((follower) => (
                    <div 
                      key={follower.id} 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F7FA] cursor-pointer transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={follower.avatar} alt={follower.name} />
                        <AvatarFallback className="bg-[#F5F7FA] text-sm font-medium">
                          {follower.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-[14px] font-medium text-[#1F2937] truncate">{follower.name}</p>
                          {follower.verified && (
                            <CheckCircle className="h-4 w-4 fill-[#22C55E] text-white flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-[12px] text-[#6B7280]">{follower.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="pt-4 border-t border-[#E5E7EB] text-center">
                <p className="text-[13px] text-[#6B7280]">Showing 1-10 of 1.2K</p>
              </div>
            </DialogContent>
          </Dialog>
            </div>
          </div>
        </>
      </TooltipProvider>
    </AppLayout>
  )
}
