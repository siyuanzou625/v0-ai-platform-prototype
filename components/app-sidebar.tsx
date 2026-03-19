"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Hammer,
  Rocket,
  Compass,
  BarChart3,
  Folder,
  Database,
  Link2,
  LayoutGrid,
  RefreshCw,
  Bot,
  FileText,
  Puzzle,
  Activity,
  Award,
  Sparkles,
  Cpu,
} from "lucide-react"

const navigation = [
  {
    title: "Build",
    icon: Hammer,
    items: [
      { name: "Projects", href: "/build/projects", icon: Folder },
      { name: "Knowledge", href: "/build/knowledge", icon: Database },
      { name: "Connections", href: "/build/connections", icon: Link2 },
    ],
  },
  {
    title: "Explore",
    icon: Compass,
    items: [
      { name: "Agents", href: "/explore/agents", icon: Bot },
      { name: "Templates", href: "/explore/templates", icon: FileText },
      { name: "Plugins", href: "/explore/plugins", icon: Puzzle },
    ],
  },
  {
    title: "Use",
    icon: Rocket,
    items: [
      { name: "Installed Apps", href: "/use/installed-apps", icon: LayoutGrid },
      { name: "Cross Devices", href: "/use/cross-devices", icon: RefreshCw },
    ],
  },
  {
    title: "Manage",
    icon: BarChart3,
    items: [
      { name: "Pulse Check", href: "/manage/pulse-check", icon: Activity },
      { name: "Creator Status", href: "/manage/creator-status", icon: Award },
      { name: "Execution Control", href: "/manage/execution-control", icon: Cpu },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#E5E7EB] bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-[#E5E7EB] px-6" suppressHydrationWarning>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ee3224]">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold text-[#1F2937]" suppressHydrationWarning>
          AgentStudio
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Home Link */}
        {(() => {
          const isHomeActive = pathname === "/"
          return (
            <Link
              href="/"
              className={cn(
                "mb-4 flex items-center gap-2 rounded px-3 py-2 text-xs font-medium uppercase tracking-wider transition-colors",
                isHomeActive
                  ? "bg-[#ee3224] text-white"
                  : "text-[#ee3224] hover:bg-[#F5F7FA]"
              )}
            >
              <Home className="h-4 w-4" />
              HOME
            </Link>
          )
        })()}
        
        {navigation.map((section) => {
          const isSectionActive = section.items.some(
            (item) => pathname === item.href || pathname.startsWith(item.href + "/")
          )
          return (
            <div key={section.title} className="mb-6">
              <h3 className="mb-2 flex items-center gap-2 px-3 text-xs font-medium uppercase tracking-wider text-[#ee3224]">
                <section.icon className="h-4 w-4" />
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#ee3224] text-white"
                            : "text-[#333] hover:bg-[#F5F7FA]"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
