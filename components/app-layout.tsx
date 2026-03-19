"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <AppSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  )
}
