"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Send,
  Plus,
  Settings,
  Star,
  Clock,
  MessageSquare,
  Zap,
  MoreVertical,
  Sparkles,
  User,
} from "lucide-react"

const personalAgents = [
  { id: 1, name: "Daily Planner", status: "active", tasks: 145, lastUsed: "Just now", color: "bg-primary" },
  { id: 2, name: "Email Buddy", status: "active", tasks: 892, lastUsed: "5 min ago", color: "bg-chart-2" },
  { id: 3, name: "Research Helper", status: "idle", tasks: 234, lastUsed: "2 hours ago", color: "bg-chart-3" },
  { id: 4, name: "Writing Coach", status: "active", tasks: 567, lastUsed: "30 min ago", color: "bg-chart-4" },
  { id: 5, name: "Code Assistant", status: "idle", tasks: 123, lastUsed: "1 day ago", color: "bg-chart-5" },
]

const chatMessages = [
  { role: "agent", content: "Good morning! I've analyzed your calendar for today. You have 3 meetings scheduled.", time: "9:00 AM" },
  { role: "user", content: "What's my first meeting about?", time: "9:01 AM" },
  { role: "agent", content: "Your first meeting at 10:00 AM is the Q3 Planning Review with the product team. Based on last week's notes, you'll be discussing the roadmap priorities.", time: "9:01 AM" },
  { role: "user", content: "Can you prepare a summary of the key points we need to cover?", time: "9:02 AM" },
  { role: "agent", content: "Of course! Here are the key points for the Q3 Planning Review:\n\n1. Feature prioritization for mobile app\n2. Resource allocation for new AI features\n3. Timeline review for enterprise launch\n4. Budget status update\n\nWould you like me to create a detailed agenda document?", time: "9:02 AM" },
]

export default function PersonalAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState(personalAgents[0])
  const [message, setMessage] = useState("")

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Personal AI Agents</h1>
            <p className="text-muted-foreground">
              Your personal AI assistants for everyday tasks
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Agent List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">My Agents</CardTitle>
              <CardDescription>{personalAgents.length} agents configured</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                {personalAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`flex cursor-pointer items-center gap-3 rounded p-3 transition-colors ${
                      selectedAgent.id === agent.id
                        ? "bg-primary/10 border border-primary"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded ${agent.color}`}>
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{agent.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={agent.status === "active" ? "default" : "secondary"}
                          className={`text-xs ${agent.status === "active" ? "bg-chart-3" : ""}`}
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded ${selectedAgent.color}`}>
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base font-medium">{selectedAgent.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-chart-3" />
                    Active now
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={msg.role === "agent" ? selectedAgent.color : "bg-secondary"}>
                          {msg.role === "agent" ? (
                            <Sparkles className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                        <p className={`mt-1 text-xs ${msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Stats */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Agent Stats</CardTitle>
              <CardDescription>{selectedAgent.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded border border-border p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Tasks Completed</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-foreground">{selectedAgent.tasks}</p>
              </div>
              <div className="rounded border border-border p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Last Active</span>
                </div>
                <p className="mt-1 text-lg font-medium text-foreground">{selectedAgent.lastUsed}</p>
              </div>
              <div className="rounded border border-border p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Conversations</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-foreground">48</p>
              </div>
              <div className="rounded border border-border p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">Performance</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? "fill-chart-4 text-chart-4" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full gap-2">
                  <Settings className="h-4 w-4" /> Configure Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
