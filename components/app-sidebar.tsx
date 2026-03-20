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
  MessageSquare,
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
      { name: "Community", href: "/community", icon: MessageSquare },
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
    <aside className="sticky top-0 flex h-[calc(100vh-4rem)] w-64 flex-shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Home Link */}
        {(() => {
          const isHomeActive = pathname === "/"
          return (
            <>
              <Link
                href="/"
                className={cn(
                  "mb-4 flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors",
                  isHomeActive
                    ? "bg-[#ee3224]/10 text-[#ee3224]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Home className={cn("h-4 w-4", isHomeActive ? "text-[#ee3224]" : "text-[#1F2937]")} />
                Home
              </Link>
              <div className="mb-6 flex justify-center">
                <div className="h-px w-4/5 bg-[#E5E7EB]" />
              </div>
            </>
          )
        })()}
        
        {navigation.map((section, index) => {
          const isSectionActive = section.items.some(
            (item) => pathname === item.href || pathname.startsWith(item.href + "/")
          )
          return (
            <div key={section.title}>
              <div className="mb-8">
                <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-slate-400">
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
                              ? "bg-[#ee3224]/10 text-[#ee3224]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          <item.icon className={cn("h-4 w-4", isActive ? "text-[#ee3224]" : "text-[#1F2937]")} />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              {index < navigation.length - 1 && (
                <div className="mb-6 flex justify-center">
                  <div className="h-px w-4/5 bg-[#E5E7EB]" />
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
