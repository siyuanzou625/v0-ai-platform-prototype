"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ChevronLeft,
  Plus,
  Search,
  Download,
  RefreshCw,
  Trash2,
  FileText,
  FileSpreadsheet,
  MoreHorizontal,
  Pencil,
  Check,
  X,
  Users,
  Bot,
  Layers,
  Settings,
  Zap,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  Sparkles,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for knowledge base details - context-specific for each KB
const knowledgeBaseData: Record<string, {
  id: string; name: string; description: string; embeddingModel: string; dimensions: number;
  chunkSize: number; chunkOverlap: number; parsingMethod: string; status: string;
  createdAt: string; updatedAt: string; collaborators: Array<{name: string; initials: string; role: string}>;
  totalChunks: number; usedByAgents: number;
}> = {
  "kb-001": {
    id: "kb-001",
    name: "Product Documentation",
    description: "Complete product documentation including API guides, user manuals, and FAQs.",
    embeddingModel: "text-embedding-3-large",
    dimensions: 3072,
    chunkSize: 512,
    chunkOverlap: 50,
    parsingMethod: "Automatic",
    status: "ready",
    createdAt: "Jan 5, 2025",
    updatedAt: "Jan 15, 2025",
    collaborators: [
      { name: "Sarah Chen", initials: "SC", role: "Admin" },
      { name: "Mike Johnson", initials: "MJ", role: "Editor" },
      { name: "Emily Davis", initials: "ED", role: "Viewer" },
    ],
    totalChunks: 1234,
    usedByAgents: 5,
  },
  "kb-002": {
    id: "kb-002",
    name: "Sales Data Q4 2024",
    description: "Quarterly sales spreadsheets, customer analytics tables, and performance metrics.",
    embeddingModel: "tabular-embedding-v2",
    dimensions: 2048,
    chunkSize: 256,
    chunkOverlap: 25,
    parsingMethod: "Spreadsheet Parser",
    status: "ready",
    createdAt: "Dec 1, 2024",
    updatedAt: "Jan 10, 2025",
    collaborators: [
      { name: "Alex Rivera", initials: "AR", role: "Admin" },
      { name: "Jordan Lee", initials: "JL", role: "Editor" },
    ],
    totalChunks: 567,
    usedByAgents: 3,
  },
  "kb-003": {
    id: "kb-003",
    name: "Training Videos",
    description: "Employee onboarding and product training video files with auto-transcription.",
    embeddingModel: "multimodal-embedding-video",
    dimensions: 4096,
    chunkSize: 1024,
    chunkOverlap: 100,
    parsingMethod: "Video + Audio Transcription",
    status: "ready",
    createdAt: "Nov 15, 2024",
    updatedAt: "Jan 8, 2025",
    collaborators: [
      { name: "Taylor Swift", initials: "TS", role: "Admin" },
      { name: "Morgan Chen", initials: "MC", role: "Viewer" },
    ],
    totalChunks: 892,
    usedByAgents: 2,
  },
  "kb-004": {
    id: "kb-004",
    name: "Customer Support Transcripts",
    description: "Historical customer support conversations and resolved ticket summaries.",
    embeddingModel: "text-embedding-3-large",
    dimensions: 3072,
    chunkSize: 512,
    chunkOverlap: 50,
    parsingMethod: "Conversation",
    status: "ready",
    createdAt: "Oct 1, 2024",
    updatedAt: "Jan 14, 2025",
    collaborators: [
      { name: "Casey Wong", initials: "CW", role: "Admin" },
      { name: "Riley Kim", initials: "RK", role: "Editor" },
      { name: "Quinn Adams", initials: "QA", role: "Viewer" },
    ],
    totalChunks: 4567,
    usedByAgents: 8,
  },
  "kb-005": {
    id: "kb-005",
    name: "Legal Contracts",
    description: "Standard contract templates and legal documentation for enterprise clients.",
    embeddingModel: "text-embedding-3-large",
    dimensions: 3072,
    chunkSize: 768,
    chunkOverlap: 75,
    parsingMethod: "Legal Document",
    status: "ready",
    createdAt: "Sep 20, 2024",
    updatedAt: "Jan 12, 2025",
    collaborators: [
      { name: "Pat Harrison", initials: "PH", role: "Admin" },
      { name: "Jamie Torres", initials: "JT", role: "Viewer" },
    ],
    totalChunks: 2341,
    usedByAgents: 4,
  },
  "kb-006": {
    id: "kb-006",
    name: "Marketing Assets",
    description: "Brand images, logos, infographics, and visual campaign materials.",
    embeddingModel: "multimodal-embedding-image",
    dimensions: 4096,
    chunkSize: 1,
    chunkOverlap: 0,
    parsingMethod: "Image Recognition + OCR",
    status: "ready",
    createdAt: "Aug 15, 2024",
    updatedAt: "Jan 11, 2025",
    collaborators: [
      { name: "Drew Martinez", initials: "DM", role: "Admin" },
      { name: "Avery Park", initials: "AP", role: "Editor" },
      { name: "Blake Foster", initials: "BF", role: "Editor" },
    ],
    totalChunks: 789,
    usedByAgents: 6,
  },
}

// Context-specific documents for each knowledge base
const documentsDataByKb: Record<string, Array<{id: string; name: string; status: string; chunks: number; size: string; uploadDate: string; type: string}>> = {
  "kb-001": [
    { id: "doc-001", name: "API_Guide.pdf", status: "processed", chunks: 45, size: "2.4 MB", uploadDate: "Jan 10, 2025", type: "document" },
    { id: "doc-002", name: "Installation_Manual.docx", status: "processed", chunks: 23, size: "1.1 MB", uploadDate: "Jan 12, 2025", type: "document" },
    { id: "doc-003", name: "FAQ.txt", status: "processing", chunks: 0, size: "45 KB", uploadDate: "Jan 15, 2025", type: "document" },
    { id: "doc-004", name: "Release_Notes.md", status: "processed", chunks: 18, size: "78 KB", uploadDate: "Jan 14, 2025", type: "document" },
    { id: "doc-005", name: "Pricing_Sheet.xlsx", status: "processed", chunks: 12, size: "156 KB", uploadDate: "Jan 13, 2025", type: "spreadsheet" },
    { id: "doc-006", name: "User_Guide_v2.pdf", status: "failed", chunks: 0, size: "3.2 MB", uploadDate: "Jan 15, 2025", type: "document" },
  ],
  "kb-002": [
    { id: "doc-001", name: "Q4_Revenue_Report.xlsx", status: "processed", chunks: 89, size: "4.2 MB", uploadDate: "Dec 15, 2024", type: "spreadsheet" },
    { id: "doc-002", name: "Customer_Segmentation.xlsx", status: "processed", chunks: 67, size: "3.1 MB", uploadDate: "Dec 18, 2024", type: "spreadsheet" },
    { id: "doc-003", name: "Sales_Pipeline.xlsx", status: "processed", chunks: 45, size: "2.8 MB", uploadDate: "Dec 20, 2024", type: "spreadsheet" },
    { id: "doc-004", name: "Regional_Performance.xlsx", status: "processed", chunks: 78, size: "3.5 MB", uploadDate: "Jan 2, 2025", type: "spreadsheet" },
    { id: "doc-005", name: "Churn_Analysis.xlsx", status: "processing", chunks: 0, size: "1.9 MB", uploadDate: "Jan 10, 2025", type: "spreadsheet" },
    { id: "doc-006", name: "Forecast_2025.xlsx", status: "processed", chunks: 34, size: "1.2 MB", uploadDate: "Jan 8, 2025", type: "spreadsheet" },
  ],
  "kb-003": [
    { id: "doc-001", name: "Onboarding_Day1.mp4", status: "processed", chunks: 156, size: "245 MB", uploadDate: "Nov 20, 2024", type: "video" },
    { id: "doc-002", name: "Platform_Overview.mp4", status: "processed", chunks: 203, size: "312 MB", uploadDate: "Nov 22, 2024", type: "video" },
    { id: "doc-003", name: "Advanced_Features.mp4", status: "processed", chunks: 189, size: "287 MB", uploadDate: "Nov 25, 2024", type: "video" },
    { id: "doc-004", name: "Security_Training.webm", status: "processed", chunks: 134, size: "198 MB", uploadDate: "Dec 1, 2024", type: "video" },
    { id: "doc-005", name: "Best_Practices.mp4", status: "processing", chunks: 0, size: "156 MB", uploadDate: "Jan 8, 2025", type: "video" },
    { id: "doc-006", name: "Compliance_Training.mp4", status: "processed", chunks: 167, size: "223 MB", uploadDate: "Dec 15, 2024", type: "video" },
  ],
  "kb-004": [
    { id: "doc-001", name: "Billing_Issues_Resolved.json", status: "processed", chunks: 1234, size: "8.5 MB", uploadDate: "Oct 15, 2024", type: "document" },
    { id: "doc-002", name: "Technical_Support_Tickets.json", status: "processed", chunks: 2156, size: "12.3 MB", uploadDate: "Nov 1, 2024", type: "document" },
    { id: "doc-003", name: "Account_Management_Chats.json", status: "processed", chunks: 987, size: "6.7 MB", uploadDate: "Nov 15, 2024", type: "document" },
    { id: "doc-004", name: "Feature_Requests_Summary.json", status: "processed", chunks: 456, size: "3.2 MB", uploadDate: "Dec 1, 2024", type: "document" },
    { id: "doc-005", name: "Escalation_Cases.json", status: "failed", chunks: 0, size: "4.1 MB", uploadDate: "Jan 14, 2025", type: "document" },
    { id: "doc-006", name: "Live_Chat_Transcripts.json", status: "processing", chunks: 0, size: "9.8 MB", uploadDate: "Jan 14, 2025", type: "document" },
  ],
  "kb-005": [
    { id: "doc-001", name: "Master_Service_Agreement.pdf", status: "processed", chunks: 289, size: "1.8 MB", uploadDate: "Sep 25, 2024", type: "document" },
    { id: "doc-002", name: "NDA_Template.pdf", status: "processed", chunks: 67, size: "456 KB", uploadDate: "Sep 28, 2024", type: "document" },
    { id: "doc-003", name: "SLA_Enterprise.pdf", status: "processed", chunks: 145, size: "892 KB", uploadDate: "Oct 5, 2024", type: "document" },
    { id: "doc-004", name: "Data_Processing_Agreement.pdf", status: "processed", chunks: 234, size: "1.4 MB", uploadDate: "Oct 12, 2024", type: "document" },
    { id: "doc-005", name: "Licensing_Terms.pdf", status: "processed", chunks: 178, size: "1.1 MB", uploadDate: "Nov 8, 2024", type: "document" },
    { id: "doc-006", name: "Privacy_Policy_v3.pdf", status: "processing", chunks: 0, size: "567 KB", uploadDate: "Jan 12, 2025", type: "document" },
  ],
  "kb-006": [
    { id: "doc-001", name: "Logo_Primary_Full.png", status: "processed", chunks: 1, size: "2.4 MB", uploadDate: "Aug 20, 2024", type: "image" },
    { id: "doc-002", name: "Hero_Banner_Homepage.jpg", status: "processed", chunks: 1, size: "4.8 MB", uploadDate: "Sep 5, 2024", type: "image" },
    { id: "doc-003", name: "Product_Infographic.png", status: "processed", chunks: 1, size: "3.2 MB", uploadDate: "Oct 1, 2024", type: "image" },
    { id: "doc-004", name: "Team_Photos_Collection.zip", status: "processed", chunks: 45, size: "156 MB", uploadDate: "Oct 15, 2024", type: "image" },
    { id: "doc-005", name: "Social_Media_Graphics.zip", status: "processed", chunks: 128, size: "89 MB", uploadDate: "Nov 20, 2024", type: "image" },
    { id: "doc-006", name: "Icon_Set_v2.svg", status: "failed", chunks: 0, size: "1.2 MB", uploadDate: "Jan 11, 2025", type: "image" },
  ],
}

// Context-specific chunks for each knowledge base
const chunksDataByKb: Record<string, Array<{id: string; documentId: string; documentName: string; content: string; tokens: number}>> = {
  "kb-001": [
    { id: "chunk-001", documentId: "doc-001", documentName: "API_Guide.pdf", content: "The REST API provides programmatic access to all platform features. Authentication is handled via OAuth 2.0 with support for both client credentials and authorization code flows...", tokens: 45 },
    { id: "chunk-002", documentId: "doc-001", documentName: "API_Guide.pdf", content: "Rate limiting is applied to all API endpoints. Standard tier users are limited to 100 requests per minute. Enterprise users can request higher limits by contacting support...", tokens: 38 },
    { id: "chunk-003", documentId: "doc-002", documentName: "Installation_Manual.docx", content: "System Requirements: Minimum 8GB RAM, 4 CPU cores, 50GB disk space. Recommended: 16GB RAM, 8 CPU cores, 100GB SSD. Compatible with Ubuntu 20.04+, CentOS 8+, or Windows Server 2019+...", tokens: 42 },
    { id: "chunk-004", documentId: "doc-002", documentName: "Installation_Manual.docx", content: "Installation Steps: 1. Download the installer from the official website. 2. Extract the archive to /opt/platform. 3. Run ./install.sh to begin the setup wizard...", tokens: 35 },
    { id: "chunk-005", documentId: "doc-004", documentName: "Release_Notes.md", content: "Version 2.5.0 introduces significant performance improvements including 40% faster query processing, reduced memory footprint, and support for multi-region deployments...", tokens: 41 },
  ],
  "kb-002": [
    { id: "chunk-001", documentId: "doc-001", documentName: "Q4_Revenue_Report.xlsx", content: "Q4 2024 Total Revenue: $12.4M (+23% YoY). Enterprise segment: $8.2M. SMB segment: $4.2M. Highest performing region: North America with $6.8M in revenue...", tokens: 52 },
    { id: "chunk-002", documentId: "doc-001", documentName: "Q4_Revenue_Report.xlsx", content: "Monthly breakdown - October: $3.8M, November: $4.1M, December: $4.5M. December showed strongest growth driven by enterprise renewals and new logo acquisitions...", tokens: 44 },
    { id: "chunk-003", documentId: "doc-002", documentName: "Customer_Segmentation.xlsx", content: "Enterprise customers (>$100K ARR): 45 accounts, 62% retention. Mid-market ($25K-$100K): 234 accounts, 78% retention. SMB (<$25K): 1,245 accounts, 85% retention...", tokens: 48 },
    { id: "chunk-004", documentId: "doc-003", documentName: "Sales_Pipeline.xlsx", content: "Current pipeline value: $28.5M. Stage breakdown - Discovery: $8.2M, Evaluation: $12.1M, Negotiation: $5.8M, Closing: $2.4M. Average deal cycle: 45 days...", tokens: 51 },
    { id: "chunk-005", documentId: "doc-004", documentName: "Regional_Performance.xlsx", content: "APAC region showed 45% growth in Q4. Key wins include: TechCorp Japan ($450K), Singapore Airlines ($320K), Samsung Electronics ($280K). EMEA stable at 12% growth...", tokens: 47 },
  ],
  "kb-003": [
    { id: "chunk-001", documentId: "doc-001", documentName: "Onboarding_Day1.mp4", content: "[00:02:15] Visual: Speaker at podium with company logo. Audio transcript: 'Welcome to your first day! Today we'll cover company history, core values, and platform overview. Our mission is to democratize AI for every business...'", tokens: 156 },
    { id: "chunk-002", documentId: "doc-001", documentName: "Onboarding_Day1.mp4", content: "[00:08:45] Visual: Screen recording of dashboard interface. Audio transcript: 'Let's walk through the main dashboard. On the left, you'll see the navigation menu with Build, Use, Explore, and Manage sections...'", tokens: 162 },
    { id: "chunk-003", documentId: "doc-002", documentName: "Platform_Overview.mp4", content: "[00:05:30] Visual: Split screen showing code editor and workflow canvas. Audio transcript: 'The platform supports both no-code and code-first approaches. No-code users can build agents using our visual workflow editor...'", tokens: 158 },
    { id: "chunk-004", documentId: "doc-003", documentName: "Advanced_Features.mp4", content: "[00:12:20] Visual: Knowledge base upload interface demonstration. Audio transcript: 'Knowledge bases allow you to upload documents that your agents can reference. The system automatically chunks and embeds your content...'", tokens: 154 },
    { id: "chunk-005", documentId: "doc-004", documentName: "Security_Training.webm", content: "[00:03:10] Visual: Security architecture diagram. Audio transcript: 'Security is paramount. All data is encrypted at rest and in transit. We maintain SOC 2 Type II and GDPR compliance...'", tokens: 149 },
  ],
  "kb-004": [
    { id: "chunk-001", documentId: "doc-001", documentName: "Billing_Issues_Resolved.json", content: "Ticket #45231: Customer reported duplicate charge. Resolution: Identified payment gateway timeout causing retry. Refunded $299, added 1 month free credit. Customer satisfied...", tokens: 67 },
    { id: "chunk-002", documentId: "doc-001", documentName: "Billing_Issues_Resolved.json", content: "Ticket #45456: Enterprise customer invoice mismatch. Resolution: Annual contract had incorrect seat count. Adjusted invoice from $45K to $38K. Finance team notified...", tokens: 58 },
    { id: "chunk-003", documentId: "doc-002", documentName: "Technical_Support_Tickets.json", content: "Ticket #T-8923: API returning 500 errors intermittently. Root cause: Connection pool exhaustion during peak hours. Fix: Increased pool size from 50 to 200. Deployed hotfix...", tokens: 72 },
    { id: "chunk-004", documentId: "doc-003", documentName: "Account_Management_Chats.json", content: "Chat with TechStart Inc: Requested upgrade from Pro to Enterprise. Concerns about data migration. Assured zero-downtime migration, offered dedicated onboarding call...", tokens: 61 },
    { id: "chunk-005", documentId: "doc-004", documentName: "Feature_Requests_Summary.json", content: "Most requested features Q4: 1. Slack integration (234 votes), 2. Custom webhooks (189 votes), 3. Role-based access control (156 votes), 4. Audit logs (134 votes)...", tokens: 55 },
  ],
  "kb-005": [
    { id: "chunk-001", documentId: "doc-001", documentName: "Master_Service_Agreement.pdf", content: "Section 1.1 - Definitions: 'Services' means the cloud-based AI agent platform provided by Company. 'Customer Data' means all data uploaded or generated by Customer...", tokens: 78 },
    { id: "chunk-002", documentId: "doc-001", documentName: "Master_Service_Agreement.pdf", content: "Section 4.2 - Liability Cap: Company's total liability shall not exceed the fees paid by Customer in the 12 months preceding the claim. This limitation does not apply to...", tokens: 82 },
    { id: "chunk-003", documentId: "doc-003", documentName: "SLA_Enterprise.pdf", content: "Uptime Commitment: 99.95% monthly uptime for Enterprise tier. Credits: <99.95%: 10% credit, <99.9%: 25% credit, <99.5%: 50% credit. Excludes scheduled maintenance...", tokens: 68 },
    { id: "chunk-004", documentId: "doc-004", documentName: "Data_Processing_Agreement.pdf", content: "Sub-processors: AWS (infrastructure), OpenAI (AI models), Stripe (payments). Customer will be notified 30 days before adding new sub-processors. Objection rights apply...", tokens: 74 },
    { id: "chunk-005", documentId: "doc-005", documentName: "Licensing_Terms.pdf", content: "Grant of License: Non-exclusive, non-transferable right to access and use the Services. Customer may not: reverse engineer, sublicense, or use for competing products...", tokens: 71 },
  ],
  "kb-006": [
    { id: "chunk-001", documentId: "doc-001", documentName: "Logo_Primary_Full.png", content: "[Image Analysis] Logo on white background. Primary red color (#ee3224). Dimensions: 2400x800px. Contains: Stylized 'A' icon + 'AgentStudio' wordmark. Format: PNG with transparency.", tokens: 45 },
    { id: "chunk-002", documentId: "doc-002", documentName: "Hero_Banner_Homepage.jpg", content: "[Image Analysis] Hero banner showing abstract AI visualization. Dominant colors: Dark navy (#1F2937), red accents (#ee3224). Contains: Particle wave effect, gradient overlay. Dimensions: 1920x1080px.", tokens: 52 },
    { id: "chunk-003", documentId: "doc-003", documentName: "Product_Infographic.png", content: "[Image Analysis] Infographic showing platform workflow. Contains: 4-step process diagram, icons for Build/Use/Explore/Manage. OCR detected text: 'From idea to deployment in minutes'.", tokens: 68 },
    { id: "chunk-004", documentId: "doc-004", documentName: "Team_Photos_Collection.zip", content: "[Image Analysis] Professional headshot photo. Subject: Female, business attire. Background: Neutral gray gradient. Expression: Confident smile. Lighting: Professional studio setup.", tokens: 42 },
    { id: "chunk-005", documentId: "doc-005", documentName: "Social_Media_Graphics.zip", content: "[Image Analysis] LinkedIn post template. Dimensions: 1200x627px. Contains: Quote overlay, brand colors, logo watermark bottom-right. OCR detected text: 'Transform your workflow with AI agents'.", tokens: 58 },
  ],
}

// Context-specific hit test results for each knowledge base
const hitTestResultsByKb: Record<string, Array<{rank: number; documentId: string; documentName: string; chunkId: string; score: number; content: string}>> = {
  "kb-001": [
    { rank: 1, documentId: "doc-001", documentName: "API_Guide.pdf", chunkId: "chunk-001", score: 0.94, content: "The REST API provides programmatic access to all platform features. Authentication is handled via OAuth 2.0..." },
    { rank: 2, documentId: "doc-002", documentName: "Installation_Manual.docx", chunkId: "chunk-003", score: 0.87, content: "System Requirements: Minimum 8GB RAM, 4 CPU cores, 50GB disk space. Recommended: 16GB RAM..." },
    { rank: 3, documentId: "doc-004", documentName: "Release_Notes.md", chunkId: "chunk-005", score: 0.82, content: "Version 2.5.0 introduces significant performance improvements including 40% faster query processing..." },
  ],
  "kb-002": [
    { rank: 1, documentId: "doc-001", documentName: "Q4_Revenue_Report.xlsx", chunkId: "chunk-001", score: 0.96, content: "Q4 2024 Total Revenue: $12.4M (+23% YoY). Enterprise segment: $8.2M. SMB segment: $4.2M..." },
    { rank: 2, documentId: "doc-003", documentName: "Sales_Pipeline.xlsx", chunkId: "chunk-004", score: 0.89, content: "Current pipeline value: $28.5M. Stage breakdown - Discovery: $8.2M, Evaluation: $12.1M..." },
    { rank: 3, documentId: "doc-002", documentName: "Customer_Segmentation.xlsx", chunkId: "chunk-003", score: 0.84, content: "Enterprise customers (>$100K ARR): 45 accounts, 62% retention. Mid-market: 234 accounts..." },
  ],
  "kb-003": [
    { rank: 1, documentId: "doc-002", documentName: "Platform_Overview.mp4", chunkId: "chunk-003", score: 0.92, content: "[00:05:30] Visual: Split screen demo. Audio: 'The platform supports both no-code and code-first approaches...'" },
    { rank: 2, documentId: "doc-003", documentName: "Advanced_Features.mp4", chunkId: "chunk-004", score: 0.88, content: "[00:12:20] Visual: KB upload demo. Audio: 'Knowledge bases allow you to upload documents...'" },
    { rank: 3, documentId: "doc-001", documentName: "Onboarding_Day1.mp4", chunkId: "chunk-002", score: 0.81, content: "[00:08:45] Visual: Dashboard walkthrough. Audio: 'Let's walk through the main dashboard...'" },
  ],
  "kb-004": [
    { rank: 1, documentId: "doc-002", documentName: "Technical_Support_Tickets.json", chunkId: "chunk-003", score: 0.95, content: "Ticket #T-8923: API returning 500 errors intermittently. Root cause: Connection pool exhaustion..." },
    { rank: 2, documentId: "doc-001", documentName: "Billing_Issues_Resolved.json", chunkId: "chunk-001", score: 0.88, content: "Ticket #45231: Customer reported duplicate charge. Resolution: Identified payment gateway timeout..." },
    { rank: 3, documentId: "doc-04", documentName: "Feature_Requests_Summary.json", chunkId: "chunk-005", score: 0.79, content: "Most requested features Q4: 1. Slack integration (234 votes), 2. Custom webhooks (189 votes)..." },
  ],
  "kb-005": [
    { rank: 1, documentId: "doc-001", documentName: "Master_Service_Agreement.pdf", chunkId: "chunk-002", score: 0.93, content: "Section 4.2 - Liability Cap: Company's total liability shall not exceed the fees paid by Customer..." },
    { rank: 2, documentId: "doc-003", documentName: "SLA_Enterprise.pdf", chunkId: "chunk-003", score: 0.90, content: "Uptime Commitment: 99.95% monthly uptime for Enterprise tier. Credits: <99.95%: 10% credit..." },
    { rank: 3, documentId: "doc-004", documentName: "Data_Processing_Agreement.pdf", chunkId: "chunk-004", score: 0.85, content: "Sub-processors: AWS (infrastructure), OpenAI (AI models), Stripe (payments). Customer will be notified..." },
  ],
  "kb-006": [
    { rank: 1, documentId: "doc-001", documentName: "Logo_Primary_Full.png", chunkId: "chunk-001", score: 0.97, content: "[Image] Logo with primary red (#ee3224). Dimensions: 2400x800px. Contains: 'A' icon + wordmark." },
    { rank: 2, documentId: "doc-002", documentName: "Hero_Banner_Homepage.jpg", chunkId: "chunk-002", score: 0.91, content: "[Image] Hero banner with AI visualization. Colors: Navy (#1F2937), red accents. 1920x1080px." },
    { rank: 3, documentId: "doc-003", documentName: "Product_Infographic.png", chunkId: "chunk-003", score: 0.86, content: "[Image] Platform workflow infographic. 4-step process, Build/Use/Explore/Manage icons." },
  ],
}

export default function KnowledgeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const kbId = params.id as string

  const [activeTab, setActiveTab] = useState("overview")
  const [isEditingName, setIsEditingName] = useState(false)
  const kbData = knowledgeBaseData[kbId] || knowledgeBaseData["kb-001"]
  const [kbName, setKbName] = useState(kbData.name)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [documentSearch, setDocumentSearch] = useState("")
  const [documentStatusFilter, setDocumentStatusFilter] = useState("all")
  const [chunkSearch, setChunkSearch] = useState("")
  const [expandedChunk, setExpandedChunk] = useState<string | null>(null)
  const [hitTestQuery, setHitTestQuery] = useState("")
  const [hitTestThreshold, setHitTestThreshold] = useState(0.7)
  const [showHitResults, setShowHitResults] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Get KB-specific data based on the current KB ID
  const kb = knowledgeBaseData[kbId] || knowledgeBaseData["kb-001"]
  const documentsData = documentsDataByKb[kbId] || documentsDataByKb["kb-001"]
  const chunksData = chunksDataByKb[kbId] || chunksDataByKb["kb-001"]
  const hitTestResults = hitTestResultsByKb[kbId] || hitTestResultsByKb["kb-001"]

  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(documentSearch.toLowerCase())
    const matchesStatus = documentStatusFilter === "all" || doc.status === documentStatusFilter
    return matchesSearch && matchesStatus
  })

  const filteredChunks = chunksData.filter((chunk) =>
    chunk.content.toLowerCase().includes(chunkSearch.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border border-emerald-200">Processed</Badge>
      case "processing":
        return <Badge variant="secondary" className="bg-amber-50 text-amber-600 border border-amber-200">Processing</Badge>
      case "failed":
        return <Badge variant="secondary" className="bg-red-50 text-red-600 border border-red-200">Failed</Badge>
      default:
        return null
    }
  }

  const handleSelectAllDocuments = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(filteredDocuments.map((d) => d.id))
    } else {
      setSelectedDocuments([])
    }
  }

  const handleSelectDocument = (docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, docId])
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== docId))
    }
  }

  const handleRunHitTest = () => {
    setShowHitResults(true)
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] bg-white px-6 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/build/knowledge")}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-muted-foreground">/</span>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={kbName}
                  onChange={(e) => setKbName(e.target.value)}
                  className="h-8 w-64"
                  autoFocus
                />
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsEditingName(false)}>
                  <Check className="h-4 w-4 text-emerald-500" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setKbName(kb.name); setIsEditingName(false) }}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ) : (
              <button
                className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-[#ee3224]"
                onClick={() => setIsEditingName(true)}
              >
                {kbName}
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none px-4 pb-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none px-4 pb-3"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="chunks"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none px-4 pb-3"
                >
                  Chunks
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none px-4 pb-3"
                >
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="hit-test"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] data-[state=active]:border-b-2 data-[state=active]:border-[#ee3224] rounded-none px-4 pb-3"
                >
                  Hit Test
                </TabsTrigger>
              </TabsList>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{kb.collaborators.length} collaborators</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Layers className="h-4 w-4" />
                  <span>{kb.totalChunks.toLocaleString()} chunks</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Bot className="h-4 w-4" />
                  <span>{kb.usedByAgents} agents</span>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto bg-white">
              {/* Overview Tab */}
              <TabsContent value="overview" className="m-0 px-6 py-4">
                <div className="flex gap-6">
                  {/* Left Panel - Document List */}
                  <div className="flex-1">
                    <Card className="border border-[#E5E7EB] shadow-sm">
                      <CardHeader className="border-b border-[#E5E7EB] pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-semibold">Documents</CardTitle>
                          <Button size="sm" className="gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e]">
                            <Plus className="h-4 w-4" />
                            Add Document
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-[#F5F7FA]">
                              <TableHead className="w-12">
                                <Checkbox
                                  checked={selectedDocuments.length === documentsData.length}
                                  onCheckedChange={handleSelectAllDocuments}
                                />
                              </TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Chunks</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Upload Date</TableHead>
                              <TableHead className="w-12"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {documentsData.slice(0, 5).map((doc) => (
                              <TableRow key={doc.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={selectedDocuments.includes(doc.id)}
                                    onCheckedChange={(checked) => handleSelectDocument(doc.id, checked as boolean)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {doc.type === "document" ? (
                                      <FileText className="h-4 w-4 text-blue-500" />
                                    ) : (
                                      <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                                    )}
                                    <span className="font-medium">{doc.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                                <TableCell>{doc.chunks}</TableCell>
                                <TableCell>{doc.size}</TableCell>
                                <TableCell className="text-muted-foreground">{doc.uploadDate}</TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem>Re-process</DropdownMenuItem>
                                      <DropdownMenuItem>Download</DropdownMenuItem>
                                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {selectedDocuments.length > 0 && (
                          <div className="flex items-center gap-2 border-t border-[#E5E7EB] p-3 bg-[#F5F7FA]">
                            <span className="text-sm text-muted-foreground">{selectedDocuments.length} selected</span>
                            <Button variant="outline" size="sm" className="gap-1.5">
                              <RefreshCw className="h-3.5 w-3.5" />
                              Re-process
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1.5">
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Panel - KB Info */}
                  <div className="w-80">
                    <Card className="border border-[#E5E7EB] shadow-sm">
                      <CardHeader className="border-b border-[#E5E7EB] pb-4">
                        <CardTitle className="text-base font-semibold">Knowledge Base Info</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Created</p>
                          <p className="text-sm">{kb.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Last Updated</p>
                          <p className="text-sm">{kb.updatedAt}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Embedding Model</p>
                          <p className="text-sm font-mono">{kb.embeddingModel}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Dimensions</p>
                          <p className="text-sm">{kb.dimensions}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Chunk Settings</p>
                          <p className="text-sm">Size: {kb.chunkSize} tokens, Overlap: {kb.chunkOverlap} tokens</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Parsing Method</p>
                          <p className="text-sm">{kb.parsingMethod}</p>
                        </div>

                        <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
                          <Button variant="outline" className="w-full gap-1.5">
                            <RefreshCw className="h-4 w-4" />
                            Re-process All
                          </Button>
                          <Button variant="outline" className="w-full gap-1.5">
                            <Download className="h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="m-0 px-6 py-4">
                <Card className="border border-[#E5E7EB] shadow-sm">
                  <CardHeader className="border-b border-[#E5E7EB] pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search documents..."
                            className="w-64 pl-9"
                            value={documentSearch}
                            onChange={(e) => setDocumentSearch(e.target.value)}
                          />
                        </div>
                        <Select value={documentStatusFilter} onValueChange={setDocumentStatusFilter}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="processed">Processed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button size="sm" className="gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e]">
                        <Plus className="h-4 w-4" />
                        Add Document
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#F5F7FA]">
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                              onCheckedChange={handleSelectAllDocuments}
                            />
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Chunks</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedDocuments.includes(doc.id)}
                                onCheckedChange={(checked) => handleSelectDocument(doc.id, checked as boolean)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {doc.type === "document" ? (
                                  <FileText className="h-4 w-4 text-blue-500" />
                                ) : (
                                  <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                                )}
                                <span className="font-medium">{doc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(doc.status)}</TableCell>
                            <TableCell>{doc.chunks}</TableCell>
                            <TableCell>{doc.size}</TableCell>
                            <TableCell className="text-muted-foreground">{doc.uploadDate}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Re-process</DropdownMenuItem>
                                  <DropdownMenuItem>Download</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {selectedDocuments.length > 0 && (
                      <div className="flex items-center gap-2 border-t border-[#E5E7EB] p-3 bg-[#F5F7FA]">
                        <span className="text-sm text-muted-foreground">{selectedDocuments.length} selected</span>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <RefreshCw className="h-3.5 w-3.5" />
                          Re-process
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Chunks Tab */}
              <TabsContent value="chunks" className="m-0 px-6 py-4">
                <div className="mb-4">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search chunks by content..."
                      className="pl-9"
                      value={chunkSearch}
                      onChange={(e) => setChunkSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredChunks.map((chunk) => (
                    <Card key={chunk.id} className="border border-[#E5E7EB] shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="font-mono text-xs">{chunk.id}</Badge>
                            <span className="text-sm text-muted-foreground">from</span>
                            <span className="text-sm font-medium">{chunk.documentName}</span>
                            <Badge variant="outline" className="text-xs">{chunk.tokens} tokens</Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1"
                              onClick={() => setExpandedChunk(expandedChunk === chunk.id ? null : chunk.id)}
                            >
                              {expandedChunk === chunk.id ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  Collapse
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />
                                  Expand
                                </>
                              )}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Merge</DropdownMenuItem>
                                <DropdownMenuItem>Split</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className={`text-sm text-muted-foreground leading-relaxed ${expandedChunk === chunk.id ? "" : "line-clamp-3"}`}>
                          {chunk.content}
                        </p>
                        {expandedChunk === chunk.id && (
                          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                            <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Embedding Vector (collapsed)</p>
                            <div className="bg-[#F5F7FA] rounded p-3 font-mono text-xs text-muted-foreground">
                              [0.0234, -0.0891, 0.1245, 0.0567, -0.0342, ...] (3072 dimensions)
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Showing {filteredChunks.length} of {kb.totalChunks} chunks</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="m-0 px-6 py-4">
                <div className="max-w-2xl space-y-6">
                  {/* Basic Info */}
                  <Card className="border border-[#E5E7EB] shadow-sm">
                    <CardHeader className="border-b border-[#E5E7EB] pb-4">
                      <CardTitle className="text-base font-semibold">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input defaultValue={kb.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea defaultValue={kb.description} rows={3} />
                      </div>
                      <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">Save Changes</Button>
                    </CardContent>
                  </Card>

                  {/* Parsing Settings */}
                  <Card className="border border-[#E5E7EB] shadow-sm">
                    <CardHeader className="border-b border-[#E5E7EB] pb-4">
                      <CardTitle className="text-base font-semibold">Parsing Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Parsing Method</Label>
                        <Select defaultValue={kb.parsingMethod.toLowerCase()}>
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
                        <Label>Chunk Size (tokens): {kb.chunkSize}</Label>
                        <Slider defaultValue={[kb.chunkSize]} min={100} max={2000} step={50} />
                      </div>
                      <div className="space-y-2">
                        <Label>Chunk Overlap (tokens): {kb.chunkOverlap}</Label>
                        <Slider defaultValue={[kb.chunkOverlap]} min={0} max={500} step={10} />
                      </div>
                      <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">Save & Re-chunk</Button>
                    </CardContent>
                  </Card>

                  {/* Embedding Settings */}
                  <Card className="border border-[#E5E7EB] shadow-sm">
                    <CardHeader className="border-b border-[#E5E7EB] pb-4">
                      <CardTitle className="text-base font-semibold">Embedding Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Embedding Model</Label>
                        <Select defaultValue={kb.embeddingModel}>
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
                      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded">
                        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-700">
                          Changing the embedding model will require re-embedding all documents. This may take some time and incur additional costs.
                        </p>
                      </div>
                      <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]">Save & Re-embed</Button>
                    </CardContent>
                  </Card>

                  {/* Access Control */}
                  <Card className="border border-[#E5E7EB] shadow-sm">
                    <CardHeader className="border-b border-[#E5E7EB] pb-4">
                      <CardTitle className="text-base font-semibold">Access Control</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-3">
                        {kb.collaborators.map((collab, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">{collab.initials}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{collab.name}</span>
                            </div>
                            <Select defaultValue={collab.role.toLowerCase()}>
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full gap-1.5">
                        <Plus className="h-4 w-4" />
                        Add Collaborator
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="border border-red-200 shadow-sm pt-0 overflow-hidden">
                    <CardHeader className="border-b border-red-200 pb-4 bg-red-50 pt-4">
                      <CardTitle className="text-base font-semibold text-red-600">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Once you delete a knowledge base, there is no going back. Please be certain.
                      </p>
                      <Button
                        variant="destructive"
                        className="gap-1.5"
                        onClick={() => setShowDeleteDialog(true)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Knowledge Base
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Hit Test Tab */}
              <TabsContent value="hit-test" className="m-0 px-6 py-4">
                <div className="grid grid-cols-2 gap-6">
                  {/* Query Input */}
                  <Card className="border border-[#E5E7EB] shadow-sm">
                    <CardHeader className="border-b border-[#E5E7EB] pb-4">
                      <CardTitle className="text-base font-semibold">Test Query</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <Textarea
                        placeholder="Enter your test query here..."
                        rows={6}
                        value={hitTestQuery}
                        onChange={(e) => setHitTestQuery(e.target.value)}
                      />
                      <div className="space-y-2">
                        <Label>Minimum Score Threshold: {hitTestThreshold.toFixed(1)}</Label>
                        <Slider
                          value={[hitTestThreshold]}
                          onValueChange={(v) => setHitTestThreshold(v[0])}
                          min={0}
                          max={1}
                          step={0.1}
                        />
                      </div>
                      <Button
                        className="w-full gap-1.5 bg-[#ee3224] hover:bg-[#cc2a1e]"
                        onClick={handleRunHitTest}
                        disabled={!hitTestQuery.trim()}
                      >
                        <Zap className="h-4 w-4" />
                        Run Test
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Results */}
                  <Card className="border border-[#E5E7EB] shadow-sm">
                    <CardHeader className="border-b border-[#E5E7EB] pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">Results</CardTitle>
                        {showHitResults && (
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-1.5">
                              <Bot className="h-4 w-4" />
                              Use in Agent
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1.5">
                              <Download className="h-4 w-4" />
                              Export
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      {!showHitResults ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Sparkles className="h-10 w-10 text-muted-foreground mb-3" />
                          <p className="text-sm text-muted-foreground">
                            Enter a query and click "Run Test" to see matching results.
                          </p>
                        </div>
                      ) : (
                        <ScrollArea className="h-80">
                          <div className="space-y-3">
                            {hitTestResults.map((result) => (
                              <div key={result.chunkId} className="p-3 border border-[#E5E7EB] rounded">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="font-semibold">#{result.rank}</Badge>
                                    <span className="text-sm font-medium">{result.documentName}</span>
                                  </div>
                                  <Badge className={`${
                                    result.score >= 0.9 ? "bg-emerald-500" : result.score >= 0.8 ? "bg-amber-500" : "bg-orange-500"
                                  }`}>
                                    Score: {result.score.toFixed(2)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-3">{result.content}</p>
                                <div className="mt-2 flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs font-mono">{result.chunkId}</Badge>
                                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                    <Copy className="h-3 w-3" />
                                    Copy
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Delete Knowledge Base</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{kb.name}"? This action cannot be undone and all documents, chunks, and embeddings will be permanently deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => { setShowDeleteDialog(false); router.push("/build/knowledge") }}>
                Delete Knowledge Base
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
