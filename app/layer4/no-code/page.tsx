"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Send,
  Bot,
  FileText,
  Database,
  Mail,
  Calendar,
  MessageSquare,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react"

const suggestedNodes = [
  { name: "Text Input", icon: FileText, description: "Accept text from user" },
  { name: "Data Lookup", icon: Database, description: "Query database" },
  { name: "Send Email", icon: Mail, description: "Send notification" },
  { name: "Schedule Task", icon: Calendar, description: "Set reminder" },
  { name: "AI Response", icon: MessageSquare, description: "Generate AI reply" },
  { name: "Trigger Action", icon: Zap, description: "Execute workflow" },
]

const recentPrompts = [
  "Create an agent that summarizes daily emails and sends a morning digest",
  "Build a customer support bot that can answer FAQs and escalate complex issues",
  "Design a workflow to automatically categorize and tag incoming documents",
]

export default function NoCodeBuilderPage() {
  const [prompt, setPrompt] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSubmit = () => {
    if (prompt.trim()) {
      setShowSuggestions(true)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">No-Code Agent Builder</h1>
          <p className="text-muted-foreground">
            Describe your AI agent in natural language and let our system build it for you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Describe Your Agent
                </CardTitle>
                <CardDescription>
                  Use natural language to describe what you want your AI agent to do
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: Create an agent that monitors my inbox, summarizes important emails, and sends me a daily digest at 9 AM..."
                  className="min-h-32 resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                      Email Agent
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                      Data Processor
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                      Support Bot
                    </Badge>
                  </div>
                  <Button onClick={handleSubmit} className="gap-2">
                    <Send className="h-4 w-4" />
                    Generate Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggested Nodes */}
            {showSuggestions && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <Bot className="h-5 w-5 text-primary" />
                    AI-Suggested Components
                  </CardTitle>
                  <CardDescription>
                    Based on your description, we recommend these building blocks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {suggestedNodes.map((node) => (
                      <div
                        key={node.name}
                        className="flex cursor-pointer items-center gap-3 rounded border border-border bg-card p-3 transition-all hover:border-primary hover:shadow-sm"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                          <node.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{node.name}</p>
                          <p className="text-xs text-muted-foreground">{node.description}</p>
                        </div>
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline">Customize</Button>
                    <Button className="gap-2">
                      Create Agent <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Agent Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Agent Preview</CardTitle>
                <CardDescription>Visual representation of your agent workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center rounded border border-dashed border-border bg-secondary/50">
                  <div className="text-center">
                    <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {showSuggestions
                        ? "Agent workflow generated - click to expand"
                        : "Your agent preview will appear here"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Recent Prompts</CardTitle>
                <CardDescription>Your previous agent descriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPrompts.map((recentPrompt, index) => (
                    <div
                      key={index}
                      className="cursor-pointer rounded border border-border p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                      onClick={() => setPrompt(recentPrompt)}
                    >
                      {recentPrompt}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    Be specific about triggers and actions
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    Include timing and frequency details
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    Mention integrations you need
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    Describe the expected output format
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
