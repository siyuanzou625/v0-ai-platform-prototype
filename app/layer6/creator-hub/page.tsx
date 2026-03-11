"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Trophy,
  DollarSign,
  Download,
  Star,
  TrendingUp,
  Users,
  Bot,
  FileCode,
  Puzzle,
  ArrowUp,
  ArrowDown,
  Medal,
  Crown,
  Zap,
  Gift,
} from "lucide-react"

const earnings = {
  total: 12450,
  thisMonth: 2340,
  pending: 890,
  growth: 18,
}

const myProducts = [
  { name: "Customer Support Agent", type: "Agent", downloads: 4521, revenue: 4520, rating: 4.9 },
  { name: "Data Pipeline Template", type: "Template", downloads: 2341, revenue: 0, rating: 4.7 },
  { name: "Slack Integration Plugin", type: "Plugin", downloads: 1892, revenue: 1890, rating: 4.8 },
  { name: "Email Summarizer", type: "Agent", downloads: 3210, revenue: 0, rating: 4.6 },
]

const leaderboard = [
  { rank: 1, name: "AI Labs", products: 45, downloads: "1.2M", earnings: "$125K", badge: "crown" },
  { rank: 2, name: "DevTools Co", products: 32, downloads: "890K", earnings: "$89K", badge: "medal" },
  { rank: 3, name: "DataMind", products: 28, downloads: "675K", earnings: "$67K", badge: "medal" },
  { rank: 4, name: "Creative AI", products: 21, downloads: "520K", earnings: "$52K", badge: null },
  { rank: 5, name: "HR Tech", products: 18, downloads: "445K", earnings: "$44K", badge: null },
  { rank: 6, name: "You", products: 4, downloads: "12K", earnings: "$6.4K", badge: null, isYou: true },
]

const achievements = [
  { name: "First Upload", description: "Published your first product", completed: true },
  { name: "100 Downloads", description: "Reached 100 total downloads", completed: true },
  { name: "Five Star", description: "Got a 5-star rating", completed: true },
  { name: "1K Downloads", description: "Reached 1,000 downloads", completed: true },
  { name: "Top Rated", description: "Enter top 10 in category", completed: false, progress: 65 },
  { name: "10K Downloads", description: "Reached 10,000 downloads", completed: false, progress: 45 },
]

export default function CreatorHubPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Creator Economy Hub</h1>
            <p className="text-muted-foreground">
              Manage your products, track earnings, and grow your presence
            </p>
          </div>
          <Button className="gap-2">
            <Zap className="h-4 w-4" /> Publish New
          </Button>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <DollarSign className="h-4 w-4 text-chart-3" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                ${earnings.total.toLocaleString()}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-chart-3">
                <ArrowUp className="h-3 w-3" /> +{earnings.growth}% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">This Month</p>
                <TrendingUp className="h-4 w-4 text-chart-2" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                ${earnings.thisMonth.toLocaleString()}
              </p>
              <div className="mt-1 text-xs text-muted-foreground">23 days remaining</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Pending Payout</p>
                <DollarSign className="h-4 w-4 text-chart-4" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                ${earnings.pending.toLocaleString()}
              </p>
              <div className="mt-1 text-xs text-muted-foreground">Next payout: Mar 15</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <Download className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">11,964</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-chart-3">
                <ArrowUp className="h-3 w-3" /> +234 this week
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* My Products */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium">My Products</CardTitle>
                <CardDescription>Your published agents, templates, and plugins</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myProducts.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between rounded border border-border p-4 transition-colors hover:border-primary"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                        {product.type === "Agent" && <Bot className="h-5 w-5 text-primary" />}
                        {product.type === "Template" && <FileCode className="h-5 w-5 text-primary" />}
                        {product.type === "Plugin" && <Puzzle className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{product.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {product.type}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-right">
                        <p className="font-medium text-foreground">{product.downloads.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">downloads</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          {product.revenue > 0 ? `$${product.revenue.toLocaleString()}` : "Free"}
                        </p>
                        <p className="text-xs text-muted-foreground">revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <Trophy className="h-5 w-5 text-chart-4" /> Achievements
              </CardTitle>
              <CardDescription>Your creator milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className={`rounded border p-3 ${
                      achievement.completed ? "border-chart-3/30 bg-chart-3/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {achievement.completed ? (
                          <Medal className="h-4 w-4 text-chart-4" />
                        ) : (
                          <Gift className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            achievement.completed ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {achievement.name}
                        </span>
                      </div>
                      {achievement.completed && (
                        <Badge className="bg-chart-3 text-xs">Complete</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>
                    {!achievement.completed && achievement.progress && (
                      <div className="mt-2">
                        <Progress value={achievement.progress} className="h-1" />
                        <p className="mt-1 text-xs text-muted-foreground">{achievement.progress}%</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Trophy className="h-5 w-5 text-chart-4" /> Creator Leaderboard
            </CardTitle>
            <CardDescription>Top creators this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((creator) => (
                <div
                  key={creator.rank}
                  className={`flex items-center justify-between rounded border p-4 ${
                    creator.isYou ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${
                        creator.rank === 1
                          ? "bg-chart-4 text-primary-foreground"
                          : creator.rank <= 3
                          ? "bg-secondary text-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {creator.rank}
                    </div>
                    <Avatar>
                      <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {creator.name}
                          {creator.isYou && <span className="text-primary"> (You)</span>}
                        </span>
                        {creator.badge === "crown" && <Crown className="h-4 w-4 text-chart-4" />}
                        {creator.badge === "medal" && <Medal className="h-4 w-4 text-chart-2" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{creator.products} products</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-right">
                      <p className="font-medium text-foreground">{creator.downloads}</p>
                      <p className="text-xs text-muted-foreground">downloads</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{creator.earnings}</p>
                      <p className="text-xs text-muted-foreground">earnings</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
