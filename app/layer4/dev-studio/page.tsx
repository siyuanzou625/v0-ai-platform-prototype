"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Square,
  Save,
  RefreshCw,
  Terminal,
  FileCode,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Cpu,
  HardDrive,
  Activity,
  Clock,
  Bug,
  CheckCircle,
  XCircle,
  Settings,
  GitBranch,
  Upload,
} from "lucide-react"

const fileTree = [
  {
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      { name: "agent.py", type: "file", active: true },
      { name: "config.yaml", type: "file" },
      { name: "utils.py", type: "file" },
    ],
  },
  {
    name: "tests",
    type: "folder",
    expanded: false,
    children: [
      { name: "test_agent.py", type: "file" },
    ],
  },
  { name: "requirements.txt", type: "file" },
  { name: "README.md", type: "file" },
]

const codeContent = `import openai
from typing import List, Dict

class EmailSummarizerAgent:
    """AI Agent for summarizing emails"""
    
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.model = "gpt-4"
    
    async def summarize(self, emails: List[Dict]) -> str:
        """Summarize a list of emails"""
        prompt = self._build_prompt(emails)
        
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are an email summarizer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def _build_prompt(self, emails: List[Dict]) -> str:
        formatted = "\\n".join([
            f"From: {e['sender']}\\nSubject: {e['subject']}\\n{e['body']}"
            for e in emails
        ])
        return f"Summarize these emails:\\n{formatted}"

# Initialize agent
agent = EmailSummarizerAgent(api_key="sk-...")
`

const consoleOutput = [
  { type: "info", message: "[INFO] Agent initialized successfully", time: "10:23:45" },
  { type: "info", message: "[INFO] Loading configuration from config.yaml", time: "10:23:46" },
  { type: "success", message: "[SUCCESS] Connected to OpenAI API", time: "10:23:47" },
  { type: "info", message: "[INFO] Processing 5 emails...", time: "10:23:48" },
  { type: "success", message: "[SUCCESS] Summary generated in 1.2s", time: "10:23:49" },
  { type: "info", message: "[INFO] Agent ready for next batch", time: "10:23:50" },
]

export default function DevStudioPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("console")

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">AI Development Studio</h1>
            <p className="text-muted-foreground">
              Full-featured IDE for building and debugging AI agents
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <GitBranch className="mr-1 h-4 w-4" /> main
            </Button>
            <Button variant="outline" size="sm">
              <Save className="mr-1 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-1 h-4 w-4" /> Deploy
            </Button>
            {isRunning ? (
              <Button size="sm" variant="destructive" onClick={() => setIsRunning(false)}>
                <Square className="mr-1 h-4 w-4" /> Stop
              </Button>
            ) : (
              <Button size="sm" onClick={() => setIsRunning(true)}>
                <Play className="mr-1 h-4 w-4" /> Run
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* File Explorer */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Folder className="h-4 w-4" /> Explorer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                {fileTree.map((item) => (
                  <FileTreeItem key={item.name} item={item} depth={0} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">agent.py</span>
                <Badge variant="secondary" className="text-xs">Python</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <pre className="h-80 overflow-auto bg-zinc-900 p-4 font-mono text-xs text-zinc-100">
                  <code>{codeContent}</code>
                </pre>
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                    Ln 1, Col 1
                  </Badge>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                    UTF-8
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Monitor */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Activity className="h-4 w-4" /> Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Cpu className="h-3 w-3" /> CPU
                  </span>
                  <span className="font-medium text-foreground">34%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 w-1/3 rounded-full bg-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <HardDrive className="h-3 w-3" /> Memory
                  </span>
                  <span className="font-medium text-foreground">512MB</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 w-1/2 rounded-full bg-chart-2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Activity className="h-3 w-3" /> GPU
                  </span>
                  <span className="font-medium text-foreground">78%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 w-3/4 rounded-full bg-chart-4" />
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={isRunning ? "bg-chart-3" : "bg-muted"}>
                    {isRunning ? "Running" : "Idle"}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium text-foreground">2h 34m</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Console / Output */}
        <Card>
          <CardHeader className="pb-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="console" className="gap-1">
                  <Terminal className="h-4 w-4" /> Console
                </TabsTrigger>
                <TabsTrigger value="problems" className="gap-1">
                  <Bug className="h-4 w-4" /> Problems
                  <Badge variant="secondary" className="ml-1 text-xs">0</Badge>
                </TabsTrigger>
                <TabsTrigger value="output" className="gap-1">
                  <FileCode className="h-4 w-4" /> Output
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-40 overflow-auto bg-zinc-900 p-4 font-mono text-xs">
              {consoleOutput.map((line, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-zinc-500">{line.time}</span>
                  <span
                    className={
                      line.type === "success"
                        ? "text-green-400"
                        : line.type === "error"
                        ? "text-red-400"
                        : "text-zinc-300"
                    }
                  >
                    {line.message}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

function FileTreeItem({ item, depth }: { item: any; depth: number }) {
  const [expanded, setExpanded] = useState(item.expanded || false)

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm transition-colors hover:bg-secondary ${
          item.active ? "bg-primary/10 text-primary" : "text-foreground"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => item.type === "folder" && setExpanded(!expanded)}
      >
        {item.type === "folder" ? (
          <>
            {expanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            {expanded ? (
              <FolderOpen className="h-4 w-4 text-chart-4" />
            ) : (
              <Folder className="h-4 w-4 text-chart-4" />
            )}
          </>
        ) : (
          <>
            <span className="w-3" />
            <FileCode className="h-4 w-4 text-chart-2" />
          </>
        )}
        <span className="ml-1">{item.name}</span>
      </div>
      {item.type === "folder" && expanded && item.children && (
        <div>
          {item.children.map((child: any) => (
            <FileTreeItem key={child.name} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
