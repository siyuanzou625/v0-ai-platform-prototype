"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Brain,
  BarChart3,
  Palette,
  Mail,
  Calendar,
  FileSearch,
  PieChart,
  TrendingUp,
  Image,
  Video,
  Mic,
  Play,
  ExternalLink,
  Star,
  Users,
} from "lucide-react"

const categories = [
  {
    name: "Productivity",
    icon: FileText,
    apps: [
      { name: "Email Assistant", description: "Smart email management and responses", users: "12.5K", rating: 4.8 },
      { name: "Meeting Scheduler", description: "AI-powered calendar optimization", users: "8.2K", rating: 4.7 },
      { name: "Task Manager", description: "Intelligent task prioritization", users: "15.1K", rating: 4.9 },
      { name: "Note Taker", description: "Auto-summarize meetings and documents", users: "9.8K", rating: 4.6 },
    ],
  },
  {
    name: "Knowledge",
    icon: Brain,
    apps: [
      { name: "Research Assistant", description: "Deep research and analysis", users: "6.7K", rating: 4.8 },
      { name: "Document Q&A", description: "Ask questions about your documents", users: "11.2K", rating: 4.7 },
      { name: "Knowledge Base", description: "Enterprise knowledge management", users: "5.4K", rating: 4.5 },
      { name: "Learning Coach", description: "Personalized learning paths", users: "7.9K", rating: 4.6 },
    ],
  },
  {
    name: "Data & Analysis",
    icon: BarChart3,
    apps: [
      { name: "Data Analyst", description: "Natural language data queries", users: "8.9K", rating: 4.9 },
      { name: "Report Generator", description: "Automated report creation", users: "7.3K", rating: 4.7 },
      { name: "Trend Analyzer", description: "Market and business trends", users: "4.2K", rating: 4.6 },
      { name: "Dashboard Builder", description: "AI-powered visualizations", users: "6.1K", rating: 4.8 },
    ],
  },
  {
    name: "Content Creation",
    icon: Palette,
    apps: [
      { name: "Content Writer", description: "AI-powered content generation", users: "18.3K", rating: 4.8 },
      { name: "Image Generator", description: "Create visuals from text", users: "22.1K", rating: 4.9 },
      { name: "Video Editor", description: "AI video editing assistant", users: "9.4K", rating: 4.5 },
      { name: "Audio Producer", description: "Voice and audio generation", users: "5.8K", rating: 4.6 },
    ],
  },
]

export default function NativeAppsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Native AI Applications</h1>
            <p className="text-muted-foreground">
              Pre-built AI applications for productivity, knowledge, data, and content
            </p>
          </div>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" /> Browse All Apps
          </Button>
        </div>

        {/* Categories */}
        <Tabs defaultValue="Productivity">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name} className="gap-2">
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="mt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {category.apps.map((app) => (
                  <Card
                    key={app.name}
                    className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-base font-medium">{app.name}</CardTitle>
                      <CardDescription className="text-sm">{app.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3 w-3" /> {app.users}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {app.rating}
                        </span>
                      </div>
                      <Button className="mt-4 w-full" size="sm">
                        <Play className="mr-1 h-4 w-4" /> Launch
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Featured Apps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Featured Applications</CardTitle>
            <CardDescription>Most popular AI apps this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded border border-border p-4 transition-colors hover:border-primary">
                <div className="flex h-14 w-14 items-center justify-center rounded bg-primary">
                  <Mail className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Email Assistant Pro</h4>
                  <p className="text-sm text-muted-foreground">Smart inbox management</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">Productivity</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> 4.9
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded border border-border p-4 transition-colors hover:border-primary">
                <div className="flex h-14 w-14 items-center justify-center rounded bg-chart-2">
                  <PieChart className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Data Insights</h4>
                  <p className="text-sm text-muted-foreground">AI-powered analytics</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">Analysis</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> 4.8
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded border border-border p-4 transition-colors hover:border-primary">
                <div className="flex h-14 w-14 items-center justify-center rounded bg-chart-3">
                  <Image className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Creative Studio</h4>
                  <p className="text-sm text-muted-foreground">AI image generation</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">Creative</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> 4.9
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">48</p>
                <p className="text-sm text-muted-foreground">Native Apps</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/10">
                <Users className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">125K</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-3/10">
                <TrendingUp className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">2.4M</p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
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
    </AppLayout>
  )
}
