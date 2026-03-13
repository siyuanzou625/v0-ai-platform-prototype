"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Puzzle,
  Download,
  Star,
  ExternalLink,
  Settings,
  Power,
  CheckCircle,
  AlertCircle,
  Code,
  Database,
  Cloud,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Image,
  Filter,
} from "lucide-react"

const plugins = [
  {
    id: 1,
    name: "OpenAI GPT-4",
    description: "Advanced language model integration",
    category: "AI Models",
    icon: Code,
    downloads: "125K",
    rating: 4.9,
    installed: true,
    enabled: true,
    version: "2.1.0",
  },
  {
    id: 2,
    name: "Anthropic Claude",
    description: "Claude AI model connector",
    category: "AI Models",
    icon: Code,
    downloads: "89K",
    rating: 4.8,
    installed: true,
    enabled: true,
    version: "1.3.0",
  },
  {
    id: 3,
    name: "PostgreSQL Connector",
    description: "Database integration for PostgreSQL",
    category: "Databases",
    icon: Database,
    downloads: "67K",
    rating: 4.7,
    installed: true,
    enabled: false,
    version: "3.0.1",
  },
  {
    id: 4,
    name: "AWS S3 Storage",
    description: "Cloud storage integration",
    category: "Cloud",
    icon: Cloud,
    downloads: "54K",
    rating: 4.6,
    installed: false,
    enabled: false,
    version: "1.8.0",
  },
  {
    id: 5,
    name: "Gmail Integration",
    description: "Email sending and receiving",
    category: "Communication",
    icon: Mail,
    downloads: "92K",
    rating: 4.8,
    installed: true,
    enabled: true,
    version: "2.4.0",
  },
  {
    id: 6,
    name: "Google Calendar",
    description: "Calendar management and scheduling",
    category: "Productivity",
    icon: Calendar,
    downloads: "78K",
    rating: 4.7,
    installed: false,
    enabled: false,
    version: "1.6.0",
  },
  {
    id: 7,
    name: "Slack Connector",
    description: "Team messaging integration",
    category: "Communication",
    icon: MessageSquare,
    downloads: "85K",
    rating: 4.8,
    installed: true,
    enabled: true,
    version: "2.2.0",
  },
  {
    id: 8,
    name: "Notion API",
    description: "Document and knowledge base sync",
    category: "Productivity",
    icon: FileText,
    downloads: "45K",
    rating: 4.6,
    installed: false,
    enabled: false,
    version: "1.4.0",
  },
  {
    id: 9,
    name: "DALL-E 3",
    description: "AI image generation",
    category: "AI Models",
    icon: Image,
    downloads: "112K",
    rating: 4.9,
    installed: true,
    enabled: true,
    version: "1.0.0",
  },
]

const categories = ["All", "AI Models", "Databases", "Cloud", "Communication", "Productivity"]

export default function PluginsPage() {
  const [searchQuery, setSearchQuery] = useState("")
const [activeCategory, setActiveCategory] = useState("All")
  
  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || plugin.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Plugin Store</h1>
            <p className="text-muted-foreground">
              Extend your AI agents with powerful integrations
            </p>
          </div>
          <Button className="gap-2">
            <Puzzle className="h-4 w-4" /> Develop Plugin
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search plugins..."
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
                <SelectItem value="downloads">Most Downloads</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Installed Plugins */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Installed Plugins</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plugins
              .filter((p) => p.installed)
              .map((plugin) => (
                <Card key={plugin.id} className="transition-all hover:border-primary">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                        <plugin.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{plugin.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            v{plugin.version}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{plugin.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={plugin.enabled} />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Plugins */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Available Plugins</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlugins.map((plugin) => (
              <Card
                key={plugin.id}
                className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <plugin.icon className="h-6 w-6 text-primary" />
                    </div>
                    {plugin.installed ? (
                      <Badge className="bg-chart-3">
                        <CheckCircle className="mr-1 h-3 w-3" /> Installed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Available</Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-medium">{plugin.name}</CardTitle>
                  <CardDescription className="text-sm">{plugin.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary">{plugin.category}</Badge>
                    <span className="text-xs text-muted-foreground">v{plugin.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" /> {plugin.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {plugin.rating}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <ExternalLink className="h-3 w-3" /> Docs
                    </Button>
                    {plugin.installed ? (
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Settings className="h-3 w-3" /> Configure
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1 gap-1">
                        <Download className="h-3 w-3" /> Install
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                <Puzzle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">847</p>
                <p className="text-sm text-muted-foreground">Total Plugins</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/10">
                <Power className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">6</p>
                <p className="text-sm text-muted-foreground">Installed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-3/10">
                <CheckCircle className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-4/10">
                <AlertCircle className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Updates Available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
