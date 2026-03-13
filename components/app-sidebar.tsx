"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Workflow,
  Sparkles,
  Smartphone,
  Store,
  FileCode,
  Puzzle,
  BookOpen,
  LayoutGrid,
  Activity,
  Award,
  Link2,
} from "lucide-react"

const navigation = [
  {
    title: "Main",
    items: [
      { name: "Home", href: "/", icon: Home },
    ],
  },
  {
    title: "Layer 4 - Vibe Coding",
    items: [
      { name: "My Projects", href: "/layer4/projects", icon: Workflow },
      { name: "My Knowledge", href: "/layer4/knowledge", icon: BookOpen },
      { name: "My Connections", href: "/layer4/connections", icon: Link2 },
    ],
  },
  {
    title: "Layer 5 - AI Apps",
    items: [
      { name: "My Apps", href: "/layer5", icon: LayoutGrid },
      { name: "Cross-Device", href: "/layer5/cross-device", icon: Smartphone },
    ],
  },
  {
    title: "Layer 6 - Discover",
    items: [
      { name: "Agent Marketplace", href: "/layer6/marketplace", icon: Store },
      { name: "Template Library", href: "/layer6/templates", icon: FileCode },
      { name: "Plugin Store", href: "/layer6/plugins", icon: Puzzle },
    ],
  },
  {
    title: "Layer 7 - Creator Studio",
    items: [
      { name: "Pulse", href: "/layer7/pulse", icon: Activity },
      { name: "Creator Status", href: "/layer7/creator-status", icon: Award },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#ee3224]">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">AI Agent OS</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[#ee3224] text-white"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
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
        ))}
      </nav>
    </aside>
  )
}
