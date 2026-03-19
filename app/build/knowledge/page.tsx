"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Plus,
  Clock,
  MoreHorizontal,
  FileText,
  FileSpreadsheet,
  Video,
  AudioLines,
  Image,
  Share2,
  Upload,
  Globe,
  X,
  Bot,
  Database,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock knowledge bases data
const knowledgeBases = [
  {
    id: "kb-001",
    name: "Product Documentation",
    description: "Complete product documentation including API guides, user manuals, and FAQs.",
    primaryType: "document",
    documentCount: 45,
    chunkCount: 1234,
    embeddingModel: "text-embedding-3-large",
    status: "ready",
    members: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Mike Johnson", initials: "MJ" },
      { name: "Emily Davis", initials: "ED" },
    ],
    lastUpdated: "2 days ago",
    usedByAgents: 5,
  },
  {
    id: "kb-002",
    name: "Sales Data Q4 2024",
    description: "Quarterly sales reports, customer analytics, and performance metrics.",
    primaryType: "spreadsheet",
    documentCount: 12,
    chunkCount: 567,
    embeddingModel: "text-embedding-3-large",
    status: "ready",
    members: [
      { name: "Alex Kim", initials: "AK" },
      { name: "Jordan Lee", initials: "JL" },
      { name: "Taylor Swift", initials: "TS" },
      { name: "Chris Martin", initials: "CM" },
      { name: "Emma Watson", initials: "EW" },
    ],
    lastUpdated: "1 week ago",
    usedByAgents: 3,
  },
  {
    id: "kb-003",
    name: "Training Videos",
    description: "Employee onboarding and product training video transcripts.",
    primaryType: "video",
    documentCount: 8,
    chunkCount: 892,
    embeddingModel: "multi-modal-v2",
    status: "processing",
    members: [
      { name: "Lisa Park", initials: "LP" },
      { name: "David Brown", initials: "DB" },
    ],
    lastUpdated: "3 days ago",
    usedByAgents: 2,
  },
  {
    id: "kb-004",
    name: "Customer Support Transcripts",
    description: "Historical customer support conversations and resolved ticket summaries.",
    primaryType: "document",
    documentCount: 234,
    chunkCount: 4567,
    embeddingModel: "text-embedding-3-large",
    status: "ready",
    members: [
      { name: "Nina Patel", initials: "NP" },
      { name: "Ryan Garcia", initials: "RG" },
    ],
    lastUpdated: "5 hours ago",
    usedByAgents: 8,
  },
  {
    id: "kb-005",
    name: "Legal Contracts",
    description: "Standard contract templates and legal documentation for enterprise clients.",
    primaryType: "document",
    documentCount: 67,
    chunkCount: 2341,
    embeddingModel: "text-embedding-3-large",
    status: "ready",
    members: [
      { name: "Sophie Turner", initials: "ST" },
    ],
    lastUpdated: "2 weeks ago",
    usedByAgents: 1,
  },
  {
    id: "kb-006",
    name: "Marketing Assets",
    description: "Brand guidelines, marketing collateral, and campaign materials.",
    primaryType: "image",
    documentCount: 156,
    chunkCount: 789,
    embeddingModel: "multi-modal-v2",
    status: "failed",
    members: [
      { name: "Mark Wilson", initials: "MW" },
      { name: "Sarah Chen", initials: "SC" },
    ],
    lastUpdated: "4 days ago",
    usedByAgents: 0,
  },
]

// Get icon based on content type
const getKnowledgeIcon = (type: string) => {
  switch (type) {
    case "document": return FileText
    case "spreadsheet": return FileSpreadsheet
    case "video": return Video
    case "audio": return AudioLines
    case "image": return Image
    default: return FileText
  }
}

// Get icon color based on content type
const getKnowledgeIconColor = (type: string) => {
  switch (type) {
    case "document": return "bg-blue-500/10 text-blue-500"
    case "spreadsheet": return "bg-emerald-500/10 text-emerald-500"
    case "video": return "bg-purple-500/10 text-purple-500"
    case "audio": return "bg-amber-500/10 text-amber-500"
    case "image": return "bg-pink-500/10 text-pink-500"
    default: return "bg-blue-500/10 text-blue-500"
  }
}

// Get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "ready":
      return (
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border border-emerald-200">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
          Ready
        </Badge>
      )
    case "processing":
      return (
        <Badge variant="secondary" className="bg-amber-50 text-amber-600 border border-amber-200">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse inline-block" />
          Processing
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="secondary" className="bg-[#F5F7FA] text-[#ee3224] border border-[#E5E7EB]">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#ee3224] inline-block" />
          Failed
        </Badge>
      )
    default:
      return null
  }
}

export default function KnowledgePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Knowledge base creation states
  const [showNewKnowledge, setShowNewKnowledge] = useState(false)
  const [kbStep, setKbStep] = useState(1)
  const [kbName, setKbName] = useState("")
  const [kbDescription, setKbDescription] = useState("")
  const [kbSourceType, setKbSourceType] = useState("files")
  const [kbFiles, setKbFiles] = useState<{ name: string; size: string; progress: number }[]>([])
  const [kbParsingMethod, setKbParsingMethod] = useState("automatic")
  const [kbChunkSize, setKbChunkSize] = useState(512)
  const [kbChunkOverlap, setKbChunkOverlap] = useState(50)
  const [kbEmbeddingModel, setKbEmbeddingModel] = useState("text-embedding-3-large")
  const [kbVisibility, setKbVisibility] = useState("private")

  const filteredKnowledgeBases = knowledgeBases.filter(
    (kb) =>
      kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenKnowledge = (kbId: string) => {
    router.push(`/build/knowledge/${kbId}`)
  }

  const handleCreateKnowledge = () => {
    setShowNewKnowledge(false)
    setKbStep(1)
    setKbName("")
    setKbDescription("")
    setKbFiles([])
    // In real app, would POST to API and redirect to new KB
  }

  const handleFileUpload = () => {
    // Mock file upload
    const mockFiles = [
      { name: "API_Guide.pdf", size: "2.4 MB", progress: 100 },
      { name: "Installation_Manual.docx", size: "1.1 MB", progress: 100 },
      { name: "FAQ.txt", size: "45 KB", progress: 75 },
    ]
    setKbFiles(mockFiles)
  }

  const getEmbeddingDimensions = (model: string) => {
    switch (model) {
      case "text-embedding-3-large": return "3072"
      case "text-embedding-3-small": return "1536"
      case "multi-modal-v2": return "2048"
      default: return "1536"
    }
  }

  const getEmbeddingCost = (model: string) => {
    switch (model) {
      case "text-embedding-3-large": return "$0.00013"
      case "text-embedding-3-small": return "$0.00002"
      case "multi-modal-v2": return "$0.00025"
      default: return "$0.00002"
    }
  }

  return (
    <AppLayout>
      <>
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-[#ee3224]" />
                <h1 className="text-xl font-semibold text-foreground">Knowledge</h1>
              </div>
              <p className="mt-1 text-sm text-[#6B7280]">
                Upload and organize documents to give your agents context and expertise.
              </p>
            </div>
            <Dialog open={showNewKnowledge} onOpenChange={setShowNewKnowledge}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[#ee3224] hover:bg-[#cc2a1e]">
                  <Plus className="h-4 w-4" />
                  New Knowledge Base
                </Button>
              </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>Create Knowledge Base</DialogTitle>
                    <DialogDescription>
                      Configure your knowledge base for RAG-powered agents. Step {kbStep} of 5.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Progress Steps */}
                  <div className="flex items-center gap-2 py-4">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                            step === kbStep
                              ? "bg-[#ee3224] text-white"
                              : step < kbStep
                              ? "bg-emerald-500 text-white"
                              : "bg-[#E5E7EB] text-muted-foreground"
                          }`}
                        >
                          {step}
                        </div>
                        {step < 5 && <div className={`h-0.5 flex-1 ${step < kbStep ? "bg-emerald-500" : "bg-[#E5E7EB]"}`} />}
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Basic Information */}
                  {kbStep === 1 && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="kbName">Name <span className="text-[#ee3224]">*</span></Label>
                        <Input
                          id="kbName"
                          placeholder="Enter knowledge base name"
                          value={kbName}
                          onChange={(e) => setKbName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kbDescription">Description</Label>
                        <Textarea
                          id="kbDescription"
                          placeholder="Describe this knowledge base..."
                          className="resize-none"
                          rows={3}
                          value={kbDescription}
                          onChange={(e) => setKbDescription(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tags (Optional)</Label>
                        <Input placeholder="Add tags separated by commas" />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Data Source */}
                  {kbStep === 2 && (
                    <div className="space-y-4 py-4">
                      <Tabs value={kbSourceType} onValueChange={setKbSourceType}>
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="files">Files</TabsTrigger>
                          <TabsTrigger value="web">Web</TabsTrigger>
                          <TabsTrigger value="notion">Notion</TabsTrigger>
                          <TabsTrigger value="video">Video</TabsTrigger>
                          <TabsTrigger value="audio">Audio</TabsTrigger>
                        </TabsList>
                        <TabsContent value="files" className="mt-4">
                          <div
                            className="border-2 border-dashed border-[#E5E7EB] rounded p-8 text-center cursor-pointer hover:border-[#ee3224] transition-colors"
                            onClick={handleFileUpload}
                          >
                            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm font-medium text-foreground">
                              Drag and drop files here, or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Supports PDF, DOCX, TXT, MD, XLSX, PPTX, MP4, MP3, PNG, JPG
                            </p>
                          </div>
                          {kbFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {kbFiles.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-3 rounded border border-[#E5E7EB] p-3">
                                  <FileText className="h-5 w-5 text-blue-500" />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium">{file.name}</p>
                                      <p className="text-xs text-muted-foreground">{file.size}</p>
                                    </div>
                                    <Progress value={file.progress} className="h-1 mt-1" />
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </TabsContent>
                        <TabsContent value="web" className="mt-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Globe className="h-5 w-5 text-muted-foreground" />
                              <Input placeholder="Enter URL to scrape..." />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Enter a website URL to automatically extract and index content.
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="notion" className="mt-4">
                          <div className="text-center py-8">
                            <Database className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm font-medium">Connect Notion</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Import pages and databases from your Notion workspace.
                            </p>
                            <Button variant="outline" className="mt-4">
                              Connect Notion
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="video" className="mt-4">
                          <div
                            className="border-2 border-dashed border-[#E5E7EB] rounded p-8 text-center cursor-pointer hover:border-[#ee3224] transition-colors"
                          >
                            <Video className="h-10 w-10 mx-auto text-purple-500 mb-3" />
                            <p className="text-sm font-medium text-foreground">
                              Upload video files for transcription
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Supports MP4, MOV, AVI, WebM
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="audio" className="mt-4">
                          <div
                            className="border-2 border-dashed border-[#E5E7EB] rounded p-8 text-center cursor-pointer hover:border-[#ee3224] transition-colors"
                          >
                            <AudioLines className="h-10 w-10 mx-auto text-amber-500 mb-3" />
                            <p className="text-sm font-medium text-foreground">
                              Upload audio files for transcription
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Supports MP3, WAV, M4A, OGG
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}

                  {/* Step 3: Parsing Configuration */}
                  {kbStep === 3 && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Parsing Method</Label>
                        <Select value={kbParsingMethod} onValueChange={setKbParsingMethod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="qa">Q&A Pair</SelectItem>
                            <SelectItem value="table">Table Extraction</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Chunk Size (tokens): {kbChunkSize}</Label>
                        <Slider
                          value={[kbChunkSize]}
                          onValueChange={(v) => setKbChunkSize(v[0])}
                          min={100}
                          max={2000}
                          step={50}
                        />
                        <p className="text-xs text-muted-foreground">Range: 100 - 2000 tokens</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Chunk Overlap (tokens): {kbChunkOverlap}</Label>
                        <Slider
                          value={[kbChunkOverlap]}
                          onValueChange={(v) => setKbChunkOverlap(v[0])}
                          min={0}
                          max={500}
                          step={10}
                        />
                        <p className="text-xs text-muted-foreground">Range: 0 - 500 tokens</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Preview Chunks
                      </Button>
                    </div>
                  )}

                  {/* Step 4: Embedding Configuration */}
                  {kbStep === 4 && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Embedding Model</Label>
                        <Select value={kbEmbeddingModel} onValueChange={setKbEmbeddingModel}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                            <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                            <SelectItem value="multi-modal-v2">multi-modal-v2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Dimensions</Label>
                          <Input value={getEmbeddingDimensions(kbEmbeddingModel)} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Cost per 1K tokens</Label>
                          <Input value={getEmbeddingCost(kbEmbeddingModel)} disabled />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Access Control */}
                  {kbStep === 5 && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-3">
                        <Label>Visibility</Label>
                        <RadioGroup value={kbVisibility} onValueChange={setKbVisibility}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="vis-private" />
                            <Label htmlFor="vis-private" className="font-normal">Private (Only me)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="team" id="vis-team" />
                            <Label htmlFor="vis-team" className="font-normal">Team (Selected collaborators)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="vis-public" />
                            <Label htmlFor="vis-public" className="font-normal">Public (Organization-wide)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {kbVisibility === "team" && (
                        <div className="space-y-2">
                          <Label>Add Collaborators</Label>
                          <Input placeholder="Search team members..." />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between pt-4 border-t border-[#E5E7EB]">
                    <Button
                      variant="ghost"
                      onClick={() => kbStep > 1 ? setKbStep(kbStep - 1) : setShowNewKnowledge(false)}
                    >
                      {kbStep > 1 ? "Back" : "Cancel"}
                    </Button>
                    <Button
                      className="bg-[#ee3224] hover:bg-[#cc2a1e]"
                      onClick={() => kbStep < 5 ? setKbStep(kbStep + 1) : handleCreateKnowledge()}
                      disabled={kbStep === 1 && !kbName.trim()}
                    >
                      {kbStep < 5 ? "Next" : "Create Knowledge Base"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search knowledge bases..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Knowledge Base Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredKnowledgeBases.map((kb) => {
              const KbIcon = getKnowledgeIcon(kb.primaryType)
              const iconColorClass = getKnowledgeIconColor(kb.primaryType)
              
              return (
                <Card
                  key={kb.id}
                  className="card-interactive group border border-[#E5E7EB] bg-white shadow-sm"
                  onClick={() => handleOpenKnowledge(kb.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded ${iconColorClass}`}>
                          <KbIcon className="h-5 w-5" />
                        </div>
                        <h3 className="card-title-text font-semibold text-foreground transition-colors duration-150 line-clamp-1">
                          {kb.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(kb.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                      {kb.description}
                    </p>

                    {/* Metadata */}
                    <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{kb.documentCount} documents</span>
                        <span>{kb.chunkCount.toLocaleString()} chunks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-mono">{kb.embeddingModel}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center -space-x-2">
                        {kb.members.slice(0, 3).map((member, idx) => (
                          <Avatar key={idx} className="h-7 w-7 border-2 border-white">
                            <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {kb.members.length > 3 && (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-muted text-xs font-medium text-muted-foreground">
                            +{kb.members.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {kb.lastUpdated}
                      </div>
                    </div>

                    {/* Agent Usage */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Bot className="h-3.5 w-3.5" />
                      <span>Used by {kb.usedByAgents} agents</span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button
                        className="flex-1 bg-[#ee3224] hover:bg-[#cc2a1e]"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenKnowledge(kb.id)
                        }}
                      >
                        Open
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </>
    </AppLayout>
  )
}
