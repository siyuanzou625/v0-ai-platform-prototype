import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Workflow, 
  Store, 
  AppWindow,
  Bot,
  FileCode,
  BarChart3,
  Users,
  ArrowRight,
  Clock,
  TrendingUp
} from "lucide-react"

const mainActions = [
  {
    title: "Create Agent",
    description: "Build AI agents with natural language",
    icon: Bot,
    href: "/build/projects",
    color: "bg-primary",
  },
  {
    title: "Build Workflow",
    description: "Visual workflow automation",
    icon: Workflow,
    href: "/build/projects",
    color: "bg-chart-2",
  },
  {
    title: "Explore Marketplace",
    description: "Discover community agents",
    icon: Store,
    href: "/explore/agents",
    color: "bg-chart-3",
  },
  {
    title: "Launch AI App",
    description: "Deploy production applications",
    icon: AppWindow,
    href: "/use/installed-apps",
    color: "bg-chart-4",
  },
]

const recentAgents = [
  { name: "Email Summarizer", type: "Personal", lastUsed: "2 hours ago", runs: 342 },
  { name: "Data Analyst Pro", type: "Enterprise", lastUsed: "5 hours ago", runs: 1205 },
  { name: "Content Writer", type: "Personal", lastUsed: "1 day ago", runs: 89 },
  { name: "Meeting Scheduler", type: "Personal", lastUsed: "2 days ago", runs: 567 },
  { name: "Code Reviewer", type: "Enterprise", lastUsed: "3 days ago", runs: 234 },
]

const featuredTemplates = [
  { name: "Customer Support Bot", category: "Enterprise", downloads: "12.5K", rating: 4.8 },
  { name: "Document Processor", category: "Productivity", downloads: "8.2K", rating: 4.7 },
  { name: "Sales Assistant", category: "Business", downloads: "6.1K", rating: 4.9 },
  { name: "Research Agent", category: "Knowledge", downloads: "5.8K", rating: 4.6 },
]

const activityFeed = [
  { action: "Agent deployed", target: "Email Summarizer v2.1", time: "10 min ago", type: "deploy" },
  { action: "Workflow completed", target: "Daily Report Generation", time: "25 min ago", type: "success" },
  { action: "New template published", target: "Social Media Manager", time: "1 hour ago", type: "publish" },
  { action: "Plugin installed", target: "OpenAI GPT-4 Connector", time: "2 hours ago", type: "install" },
  { action: "Agent updated", target: "Data Analyst Pro", time: "3 hours ago", type: "update" },
  { action: "Workflow created", target: "Customer Onboarding", time: "5 hours ago", type: "create" },
]

export default function HomePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">
            Build, deploy, and manage AI agents across your enterprise
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mainActions.map((action) => (
            <Card
              key={action.title}
              className="group cursor-pointer border border-border transition-all hover:border-primary hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded ${action.color}`}>
                  <action.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <CardTitle className="text-base font-medium">{action.title}</CardTitle>
                <CardDescription className="text-sm">{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" size="sm" className="gap-1 p-0 text-primary hover:bg-transparent">
                  Get Started <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recently Used Agents */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-base font-medium">Recently Used Agents</CardTitle>
                <CardDescription>Your most active AI agents</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAgents.map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center justify-between rounded border border-border bg-card p-3 transition-colors hover:border-primary"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{agent.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {agent.type}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {agent.lastUsed}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{agent.runs}</p>
                      <p className="text-xs text-muted-foreground">runs</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Activity Feed</CardTitle>
              <CardDescription>Recent platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.target}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Templates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-medium">Featured Templates</CardTitle>
              <CardDescription>Popular agent templates from the community</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              Browse All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {featuredTemplates.map((template) => (
                <div
                  key={template.name}
                  className="rounded border border-border bg-card p-4 transition-colors hover:border-primary"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded bg-secondary">
                    <FileCode className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="mb-1 text-sm font-medium text-foreground">{template.name}</h4>
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {template.category}
                  </Badge>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> {template.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {template.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">247</p>
                <p className="text-sm text-muted-foreground">Active Agents</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/10">
                <Workflow className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">1,842</p>
                <p className="text-sm text-muted-foreground">Workflows Run</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-3/10">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">56</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-4/10">
                <BarChart3 className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">98.5%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
