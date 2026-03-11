"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Save,
  Copy,
  Sparkles,
  FileText,
  Puzzle,
  Upload,
  Clock,
  Star,
  Download,
  Settings,
  Code,
  Zap,
  RefreshCw,
} from "lucide-react"

const promptTemplates = [
  { name: "Email Summarizer", category: "Productivity", uses: 1245 },
  { name: "Code Reviewer", category: "Development", uses: 892 },
  { name: "Document Analyzer", category: "Knowledge", uses: 756 },
  { name: "Customer Response", category: "Support", uses: 1034 },
]

const plugins = [
  { name: "OpenAI GPT-4", status: "active", version: "1.2.0" },
  { name: "Anthropic Claude", status: "active", version: "1.0.1" },
  { name: "Google Gemini", status: "inactive", version: "0.9.0" },
  { name: "Local LLM", status: "active", version: "2.1.0" },
]

export default function PromptStudioPage() {
  const [activeTab, setActiveTab] = useState("prompts")
  const [temperature, setTemperature] = useState([0.7])

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Prompt Studio & Plugin Development</h1>
            <p className="text-muted-foreground">
              Create, test, and deploy prompt templates and AI plugins
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-1 h-4 w-4" /> Import
            </Button>
            <Button size="sm">
              <Upload className="mr-1 h-4 w-4" /> Deploy
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="prompts" className="gap-2">
              <FileText className="h-4 w-4" /> Prompt Templates
            </TabsTrigger>
            <TabsTrigger value="plugins" className="gap-2">
              <Puzzle className="h-4 w-4" /> Plugin SDK
            </TabsTrigger>
            <TabsTrigger value="deploy" className="gap-2">
              <Upload className="h-4 w-4" /> Deployment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompts" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Prompt Editor */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Prompt Editor
                    </CardTitle>
                    <CardDescription>Create and refine your prompt templates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>System Prompt</Label>
                      <Textarea
                        placeholder="You are a helpful assistant that..."
                        className="min-h-24 font-mono text-sm"
                        defaultValue="You are an expert email analyst. Your task is to analyze incoming emails and provide concise, actionable summaries."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>User Prompt Template</Label>
                      <Textarea
                        placeholder="Analyze the following: {{input}}"
                        className="min-h-32 font-mono text-sm"
                        defaultValue={`Please analyze the following email and provide:
1. A one-line summary
2. Key action items (if any)
3. Priority level (High/Medium/Low)
4. Suggested response (if needed)

Email:
{{email_content}}`}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <Label>Model</Label>
                        <Select defaultValue="gpt-4">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude">Claude 3</SelectItem>
                            <SelectItem value="gemini">Gemini Pro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Temperature: {temperature[0]}</Label>
                        <Slider
                          value={temperature}
                          onValueChange={setTemperature}
                          min={0}
                          max={1}
                          step={0.1}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="mr-1 h-4 w-4" /> Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Save className="mr-1 h-4 w-4" /> Save
                        </Button>
                      </div>
                      <Button size="sm" className="gap-1">
                        <Play className="h-4 w-4" /> Test Prompt
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Test Output */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Test Output</CardTitle>
                    <CardDescription>Results from your last prompt test</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded border border-border bg-secondary/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="secondary">GPT-4</Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> 1.2s
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-foreground">
                        <p><strong>Summary:</strong> Q3 budget review meeting scheduled for Friday.</p>
                        <p><strong>Action Items:</strong></p>
                        <ul className="ml-4 list-disc text-muted-foreground">
                          <li>Prepare Q3 expense report</li>
                          <li>Review department allocations</li>
                        </ul>
                        <p><strong>Priority:</strong> <Badge className="bg-chart-4">High</Badge></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Templates Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Saved Templates</CardTitle>
                    <CardDescription>Your prompt library</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {promptTemplates.map((template) => (
                        <div
                          key={template.name}
                          className="flex cursor-pointer items-center justify-between rounded border border-border p-3 transition-colors hover:border-primary"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{template.name}</p>
                            <p className="text-xs text-muted-foreground">{template.category}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Zap className="h-3 w-3" /> {template.uses}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Variables</CardTitle>
                    <CardDescription>Define template variables</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">{"{{email_content}}"}</Badge>
                      <span className="text-xs text-muted-foreground">String</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">{"{{sender_name}}"}</Badge>
                      <span className="text-xs text-muted-foreground">String</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">{"{{priority}}"}</Badge>
                      <span className="text-xs text-muted-foreground">Enum</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      + Add Variable
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plugins" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Plugin SDK Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <Code className="h-5 w-5 text-primary" />
                    Plugin SDK
                  </CardTitle>
                  <CardDescription>Build custom AI plugins</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="h-64 overflow-auto rounded bg-zinc-900 p-4 font-mono text-xs text-zinc-100">
{`import { Plugin, PluginConfig } from '@ai-agent-os/sdk';

export class CustomConnector extends Plugin {
  config: PluginConfig = {
    name: 'Custom API Connector',
    version: '1.0.0',
    author: 'Your Name',
    description: 'Connect to external APIs'
  };

  async initialize() {
    // Plugin initialization logic
    console.log('Plugin initialized');
  }

  async execute(input: any) {
    // Main plugin execution logic
    const response = await fetch(this.config.apiUrl, {
      method: 'POST',
      body: JSON.stringify(input)
    });
    return response.json();
  }
}`}
                  </pre>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="secondary">TypeScript</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-1 h-4 w-4" /> Validate
                      </Button>
                      <Button size="sm">
                        <Puzzle className="mr-1 h-4 w-4" /> Build Plugin
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Installed Plugins */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Installed Plugins</CardTitle>
                  <CardDescription>Manage your AI plugins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {plugins.map((plugin) => (
                      <div
                        key={plugin.name}
                        className="flex items-center justify-between rounded border border-border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary">
                            <Puzzle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{plugin.name}</p>
                            <p className="text-xs text-muted-foreground">v{plugin.version}</p>
                          </div>
                        </div>
                        <Badge
                          variant={plugin.status === "active" ? "default" : "secondary"}
                          className={plugin.status === "active" ? "bg-chart-3" : ""}
                        >
                          {plugin.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deploy" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Deployment Panel</CardTitle>
                  <CardDescription>Deploy your prompts and plugins to production</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Deployment Target</Label>
                    <Select defaultValue="production">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Version Tag</Label>
                    <Input placeholder="v1.0.0" defaultValue="v1.2.0" />
                  </div>
                  <div className="rounded border border-border bg-secondary/50 p-4">
                    <h4 className="mb-2 text-sm font-medium text-foreground">Deployment Checklist</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-chart-3" /> All tests passed
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-chart-3" /> Prompt validated
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-chart-3" /> Dependencies resolved
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-chart-4" /> Pending approval
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full gap-2">
                    <Upload className="h-4 w-4" /> Deploy to Production
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Deployment History</CardTitle>
                  <CardDescription>Recent deployment activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { version: "v1.1.0", env: "Production", time: "2 hours ago", status: "success" },
                      { version: "v1.1.0", env: "Staging", time: "3 hours ago", status: "success" },
                      { version: "v1.0.9", env: "Production", time: "1 day ago", status: "success" },
                      { version: "v1.0.8", env: "Production", time: "3 days ago", status: "rolled back" },
                    ].map((deploy, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded border border-border p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{deploy.version}</p>
                          <p className="text-xs text-muted-foreground">
                            {deploy.env} - {deploy.time}
                          </p>
                        </div>
                        <Badge
                          variant={deploy.status === "success" ? "default" : "secondary"}
                          className={deploy.status === "success" ? "bg-chart-3" : "bg-chart-4"}
                        >
                          {deploy.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
