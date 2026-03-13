"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Monitor,
  Tablet,
  Watch,
  Laptop,
  Wifi,
  WifiOff,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  Clock,
  Zap,
  Bell,
  Settings,
} from "lucide-react"

const devices = [
  { id: 1, name: "MacBook Pro", type: "laptop", status: "online", lastSync: "Just now", icon: Laptop },
  { id: 2, name: "iPhone 15 Pro", type: "phone", status: "online", lastSync: "2 min ago", icon: Smartphone },
  { id: 3, name: "iPad Pro", type: "tablet", status: "online", lastSync: "5 min ago", icon: Tablet },
  { id: 4, name: "Desktop PC", type: "desktop", status: "offline", lastSync: "2 hours ago", icon: Monitor },
  { id: 5, name: "Apple Watch", type: "watch", status: "online", lastSync: "1 min ago", icon: Watch },
]

const recentTasks = [
  {
    task: "Email summary sent",
    from: "MacBook Pro",
    to: "iPhone 15 Pro",
    time: "2 min ago",
    status: "completed",
  },
  {
    task: "Meeting reminder",
    from: "Calendar Agent",
    to: "All devices",
    time: "15 min ago",
    status: "completed",
  },
  {
    task: "Document sync",
    from: "iPad Pro",
    to: "MacBook Pro",
    time: "30 min ago",
    status: "completed",
  },
  {
    task: "Task list update",
    from: "iPhone 15 Pro",
    to: "Desktop PC",
    time: "1 hour ago",
    status: "pending",
  },
]

const crossDeviceFeatures = [
  {
    name: "Seamless Handoff",
    description: "Continue tasks across devices without interruption",
    icon: ArrowRight,
  },
  {
    name: "Real-time Sync",
    description: "Instant synchronization of AI context and data",
    icon: RefreshCw,
  },
  {
    name: "Smart Notifications",
    description: "Intelligent routing to the right device",
    icon: Bell,
  },
  {
    name: "Unified Context",
    description: "Shared AI memory across all your devices",
    icon: Zap,
  },
]

export default function CrossDevicePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Cross Devices</h1>
            <p className="text-muted-foreground">
              Seamlessly use AI agents across all your connected devices
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-1 h-4 w-4" /> Sync All
            </Button>
            <Button size="sm" className="gap-2">
              <Smartphone className="h-4 w-4" /> Add Device
            </Button>
          </div>
        </div>

        {/* Connected Devices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Connected Devices</CardTitle>
            <CardDescription>
              {devices.filter((d) => d.status === "online").length} of {devices.length} devices online
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className={`relative rounded border p-4 transition-all ${
                    device.status === "online"
                      ? "border-border hover:border-primary"
                      : "border-dashed border-border bg-secondary/30"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                        device.status === "online" ? "bg-primary/10" : "bg-secondary"
                      }`}
                    >
                      <device.icon
                        className={`h-7 w-7 ${
                          device.status === "online" ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <h4 className="font-medium text-foreground">{device.name}</h4>
                    <div className="mt-2 flex items-center gap-1">
                      {device.status === "online" ? (
                        <Wifi className="h-3 w-3 text-chart-3" />
                      ) : (
                        <WifiOff className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span
                        className={`text-xs ${
                          device.status === "online" ? "text-chart-3" : "text-muted-foreground"
                        }`}
                      >
                        {device.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{device.lastSync}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Cross-Device Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Recent Cross-Device Tasks</CardTitle>
              <CardDescription>Tasks executed across your devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          task.status === "completed" ? "bg-chart-3/10" : "bg-chart-4/10"
                        }`}
                      >
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-chart-3" />
                        ) : (
                          <Clock className="h-5 w-5 text-chart-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{task.task}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.from} → {task.to}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={task.status === "completed" ? "default" : "secondary"}
                        className={task.status === "completed" ? "bg-chart-3" : ""}
                      >
                        {task.status}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">{task.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cross-Device Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Cross-Device Features</CardTitle>
              <CardDescription>AI capabilities across all your devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crossDeviceFeatures.map((feature) => (
                  <div
                    key={feature.name}
                    className="flex items-center gap-4 rounded border border-border p-4 transition-colors hover:border-primary"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cross-Device Demo Modal */}
        <Card className="border-primary">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                <Zap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Try Cross-Device Handoff</h3>
                <p className="text-muted-foreground">
                  Start a task on one device and seamlessly continue on another
                </p>
              </div>
            </div>
            <Button size="lg" className="gap-2">
              Start Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
