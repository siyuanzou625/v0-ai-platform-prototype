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
} from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Email Automation Starter",
    description: "Complete email processing workflow with summarization and auto-reply",
    category: "Productivity",
    complexity: "Beginner",
    downloads: "8.2K",
    rating: 4.8,
    components: 5,
    estimatedTime: "10 min",
  },
  {
    id: 2,
    name: "Customer Support Suite",
    description: "Full customer support system with ticketing and knowledge base",
    category: "Support",
    complexity: "Advanced",
    downloads: "12.5K",
    rating: 4.9,
    components: 12,
    estimatedTime: "45 min",
  },
  {
    id: 3,
    name: "Data Pipeline Builder",
    description: "ETL pipeline template for data processing and analytics",
    category: "Data",
    complexity: "Intermediate",
    downloads: "6.7K",
    rating: 4.7,
    components: 8,
    estimatedTime: "25 min",
  },
  {
    id: 4,
    name: "Content Calendar Agent",
    description: "Social media content planning and scheduling automation",
    category: "Marketing",
    complexity: "Beginner",
    downloads: "9.1K",
    rating: 4.6,
    components: 6,
    estimatedTime: "15 min",
  },
  {
    id: 5,
    name: "Sales Lead Scorer",
    description: "Automated lead qualification and scoring system",
    category: "Sales",
    complexity: "Intermediate",
    downloads: "7.3K",
    rating: 4.8,
    components: 7,
    estimatedTime: "20 min",
  },
  {
    id: 6,
    name: "HR Onboarding Flow",
    description: "Complete employee onboarding workflow automation",
    category: "HR",
    complexity: "Advanced",
    downloads: "5.4K",
    rating: 4.7,
    components: 10,
    estimatedTime: "35 min",
  },
  {
    id: 7,
    name: "Document Q&A System",
    description: "RAG-based document question answering system",
    category: "Knowledge",
    complexity: "Intermediate",
    downloads: "11.2K",
    rating: 4.9,
    components: 6,
    estimatedTime: "20 min",
  },
  {
    id: 8,
    name: "Meeting Summarizer",
    description: "Automatic meeting transcription and summary generation",
    category: "Productivity",
    complexity: "Beginner",
    downloads: "14.8K",
    rating: 4.8,
    components: 4,
    estimatedTime: "10 min",
  },
]

const categories = ["All", "Productivity", "Support", "Data", "Marketing", "Sales", "HR", "Knowledge"]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || template.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Templates</h1>
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
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <FileCode className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-base font-medium">{template.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {template.description}
                    </CardDescription>
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
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" /> {template.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {template.rating}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Eye className="h-3 w-3" /> Preview
                      </Button>
                      <Button size="sm" className="flex-1 gap-1">
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
                <p className="text-muted-foreground">
                  Share your workflows with the community and earn recognition
                </p>
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
    </AppLayout>
  )
}
