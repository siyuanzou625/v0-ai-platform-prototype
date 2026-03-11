"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Compass,
  Play,
  Wrench,
  Code2,
  Workflow,
  Terminal,
  Sparkles,
  AppWindow,
  Users,
  Building2,
  Smartphone,
  Store,
  FileCode,
  Puzzle,
  Trophy,
  Briefcase,
} from "lucide-react"

const navigation = [
  {
    title: "Main",
    items: [
      { name: "Home", href: "/", icon: Home },
      { name: "Discover", href: "/discover", icon: Compass },
      { name: "Use", href: "/use", icon: Play },
      { name: "Build", href: "/build", icon: Wrench },
    ],
  },
  {
    title: "Layer 4 - Vibe Coding",
    items: [
      { name: "No-Code Builder", href: "/layer4/no-code", icon: Sparkles },
      { name: "Workflow Builder", href: "/layer4/workflow", icon: Workflow },
      { name: "Dev Studio", href: "/layer4/dev-studio", icon: Code2 },
      { name: "Prompt Studio", href: "/layer4/prompt-studio", icon: Terminal },
    ],
  },
  {
    title: "Layer 5 - AI Apps",
    items: [
      { name: "Native Apps", href: "/layer5/native-apps", icon: AppWindow },
      { name: "Personal Agents", href: "/layer5/personal-agents", icon: Users },
      { name: "Enterprise Agents", href: "/layer5/enterprise-agents", icon: Building2 },
      { name: "Cross-Device", href: "/layer5/cross-device", icon: Smartphone },
    ],
  },
  {
    title: "Layer 6 - Ecosystem",
    items: [
      { name: "Agent Marketplace", href: "/layer6/marketplace", icon: Store },
      { name: "Template Library", href: "/layer6/templates", icon: FileCode },
      { name: "Plugin Store", href: "/layer6/plugins", icon: Puzzle },
      { name: "Creator Hub", href: "/layer6/creator-hub", icon: Trophy },
      { name: "Enterprise Hub", href: "/layer6/enterprise-hub", icon: Briefcase },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
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
                          ? "bg-primary text-primary-foreground"
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
