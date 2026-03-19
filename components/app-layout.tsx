"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      {/* Full-width top bar */}
      <TopBar />
      {/* Below top bar: sidebar + main content */}
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  )
}
