"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Bot,
  Star,
  Download,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
  Heart,
} from "lucide-react"

const agents = [
  {
    id: 1,
    name: "Customer Support Pro",
    description: "Enterprise-grade customer support automation",
    author: "AI Labs",
    category: "Support",
    downloads: "45.2K",
    rating: 4.9,
    price: "Free",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Sales Intelligence",
    description: "Lead scoring and qualification agent",
    author: "SalesBot Inc",
    category: "Sales",
    downloads: "32.1K",
    rating: 4.8,
    price: "$29/mo",
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: "Document Wizard",
    description: "Smart document processing and analysis",
    author: "DocAI",
    category: "Productivity",
    downloads: "28.7K",
    rating: 4.7,
    price: "Free",
    verified: true,
    featured: false,
  },
  {
    id: 4,
    name: "Code Assistant Pro",
    description: "AI-powered code review and generation",
    author: "DevTools Co",
    category: "Development",
    downloads: "56.3K",
    rating: 4.9,
    price: "$19/mo",
    verified: true,
    featured: true,
  },
  {
    id: 5,
    name: "HR Onboarding Bot",
    description: "Automate employee onboarding processes",
    author: "HR Tech",
    category: "HR",
    downloads: "18.9K",
    rating: 4.6,
    price: "Free",
    verified: false,
    featured: false,
  },
  {
    id: 6,
    name: "Data Analyst Agent",
    description: "Natural language data querying and insights",
    author: "DataMind",
    category: "Analytics",
    downloads: "41.5K",
    rating: 4.8,
    price: "$49/mo",
    verified: true,
    featured: true,
  },
  {
    id: 7,
    name: "Content Generator",
    description: "Multi-format content creation assistant",
    author: "Creative AI",
    category: "Content",
    downloads: "67.2K",
    rating: 4.7,
    price: "Free",
    verified: true,
    featured: false,
  },
  {
    id: 8,
    name: "Legal Document Review",
    description: "Contract analysis and legal compliance",
    author: "LegalTech AI",
    category: "Legal",
    downloads: "12.4K",
    rating: 4.9,
    price: "$99/mo",
    verified: true,
    featured: false,
  },
]

const categories = ["All", "Support", "Sales", "Productivity", "Development", "HR", "Analytics", "Content", "Legal"]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Agents</h1>
            <p className="mt-2 text-sm text-[#6B7280] max-w-[600px]">
              Discover and install AI agents built by the community and experts.
            </p>
          </div>
          <Button className="gap-2">
            <Bot className="h-4 w-4" /> Publish Agent
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="downloads">Most Downloads</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Featured Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Featured Agents</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {agents
              .filter((a) => a.featured)
              .map((agent) => (
                <Card
                  key={agent.id}
                  className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                        <Bot className="h-6 w-6 text-primary" />
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-medium">{agent.name}</CardTitle>
                      {agent.verified && <CheckCircle className="h-4 w-4 text-chart-2" />}
                    </div>
                    <CardDescription className="text-sm line-clamp-2">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="secondary">{agent.category}</Badge>
                      <Badge variant={agent.price === "Free" ? "default" : "outline"} className={agent.price === "Free" ? "bg-chart-3" : ""}>
                        {agent.price}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" /> {agent.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {agent.rating}
                      </span>
                    </div>
                    <Button className="mt-4 w-full" size="sm">
                      Install <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Agents */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">All Agents</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium">{agent.name}</CardTitle>
                    {agent.verified && <CheckCircle className="h-4 w-4 text-chart-2" />}
                  </div>
                  <CardDescription className="text-sm line-clamp-2">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-xs text-muted-foreground">by {agent.author}</p>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary">{agent.category}</Badge>
                    <Badge variant={agent.price === "Free" ? "default" : "outline"} className={agent.price === "Free" ? "bg-chart-3" : ""}>
                      {agent.price}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" /> {agent.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {agent.rating}
                    </span>
                  </div>
                  <Button className="mt-4 w-full" size="sm">
                    Install <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
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
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">2,847</p>
                <p className="text-sm text-muted-foreground">Total Agents</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/10">
                <Download className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">1.2M</p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-3/10">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">45K</p>
                <p className="text-sm text-muted-foreground">Publishers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-4/10">
                <TrendingUp className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">+24%</p>
                <p className="text-sm text-muted-foreground">Growth This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
