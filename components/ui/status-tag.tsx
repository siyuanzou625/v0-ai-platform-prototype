import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  HeadphonesIcon,
  Database,
  Megaphone,
  DollarSign,
  Users,
  BookOpen,
  Search,
  FileText,
  Cpu,
  Cloud,
  MessageSquare,
  BarChart3,
  Shield,
  Settings,
  CheckCircle,
  Circle,
  Zap,
  GraduationCap,
  Layers,
  Star,
  PlayCircle,
  AlertCircle,
  Globe,
  Server,
  Code,
  type LucideIcon,
} from "lucide-react"

// Tag configuration with icon, colors for each type
export const TAG_CONFIG: Record<string, { icon: LucideIcon; bg: string; text: string; border: string }> = {
  // Categories
  "Productivity": { icon: Briefcase, bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  "Support": { icon: HeadphonesIcon, bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "Data": { icon: Database, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Marketing": { icon: Megaphone, bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  "Sales": { icon: DollarSign, bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "HR": { icon: Users, bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  "Knowledge": { icon: BookOpen, bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "Research": { icon: Search, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Content": { icon: FileText, bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "AI Models": { icon: Cpu, bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Databases": { icon: Database, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Cloud": { icon: Cloud, bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  "Communication": { icon: MessageSquare, bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "Analytics": { icon: BarChart3, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Security": { icon: Shield, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  "DevOps": { icon: Settings, bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  
  // Statuses
  "Installed": { icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Available": { icon: Circle, bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
  "Active": { icon: Zap, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Ready": { icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Deployed": { icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Completed": { icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "In Progress": { icon: Circle, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Pending": { icon: Circle, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Draft": { icon: FileText, bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
  "Paused": { icon: Circle, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Error": { icon: AlertCircle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  "Failed": { icon: AlertCircle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  "Building": { icon: PlayCircle, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Blocked": { icon: AlertCircle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  "Processing": { icon: PlayCircle, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  
  // Environments
  "Production": { icon: Globe, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Staging": { icon: Server, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Development": { icon: Code, bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
  
  // Levels / Complexity
  "Beginner": { icon: GraduationCap, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Intermediate": { icon: Layers, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Advanced": { icon: Star, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  
  // Pricing
  "Free": { icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Pro": { icon: Star, bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  "Enterprise": { icon: Briefcase, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
}

// Default fallback for unknown tags
const DEFAULT_CONFIG = { icon: Circle, bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" }

interface StatusTagProps {
  label: string
  showIcon?: boolean
  className?: string
}

export function StatusTag({ label, showIcon = true, className }: StatusTagProps) {
  const config = TAG_CONFIG[label] || DEFAULT_CONFIG
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  )
}

// Helper function to get tag styles (for backward compatibility)
export function getTagStyle(label: string): string {
  const config = TAG_CONFIG[label] || DEFAULT_CONFIG
  return `${config.bg} ${config.text} border ${config.border}`
}
