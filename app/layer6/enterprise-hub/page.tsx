"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Building2,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  FileText,
  Settings,
  Lock,
  Globe,
  Server,
  HeadphonesIcon,
  Zap,
} from "lucide-react"

const solutions = [
  {
    id: 1,
    name: "Customer Service Suite",
    description: "Complete AI-powered customer support solution with ticketing, chat, and analytics",
    features: ["24/7 AI Chat Support", "Ticket Management", "Knowledge Base", "Analytics Dashboard"],
    industry: "Customer Service",
    deployments: 245,
    icon: HeadphonesIcon,
  },
  {
    id: 2,
    name: "Sales Intelligence Platform",
    description: "AI-driven sales automation with lead scoring, forecasting, and CRM integration",
    features: ["Lead Scoring", "Sales Forecasting", "CRM Integration", "Pipeline Analytics"],
    industry: "Sales",
    deployments: 189,
    icon: Zap,
  },
  {
    id: 3,
    name: "HR Automation Suite",
    description: "Streamline HR operations with AI-powered recruiting, onboarding, and management",
    features: ["AI Recruiting", "Onboarding Automation", "Employee Self-Service", "Performance Reviews"],
    industry: "Human Resources",
    deployments: 156,
    icon: Users,
  },
  {
    id: 4,
    name: "Financial Operations AI",
    description: "Automate financial processes with AI for reporting, compliance, and analytics",
    features: ["Automated Reporting", "Compliance Monitoring", "Fraud Detection", "Budget Forecasting"],
    industry: "Finance",
    deployments: 112,
    icon: Building2,
  },
  {
    id: 5,
    name: "Legal Document Intelligence",
    description: "AI-powered contract analysis, compliance checking, and legal research",
    features: ["Contract Analysis", "Due Diligence", "Compliance Tracking", "Legal Research"],
    industry: "Legal",
    deployments: 78,
    icon: FileText,
  },
  {
    id: 6,
    name: "IT Operations Hub",
    description: "Intelligent IT management with automated support, monitoring, and security",
    features: ["IT Helpdesk", "System Monitoring", "Security Automation", "Asset Management"],
    industry: "IT Operations",
    deployments: 198,
    icon: Server,
  },
]

const enterpriseFeatures = [
  {
    name: "SSO & SAML Integration",
    description: "Enterprise single sign-on with SAML 2.0 support",
    icon: Lock,
  },
  {
    name: "Custom Deployment",
    description: "On-premise or private cloud deployment options",
    icon: Server,
  },
  {
    name: "Advanced Security",
    description: "SOC 2 Type II, HIPAA, GDPR compliance",
    icon: Shield,
  },
  {
    name: "Global Infrastructure",
    description: "Multi-region deployment with data residency",
    icon: Globe,
  },
  {
    name: "Dedicated Support",
    description: "24/7 enterprise support with SLA guarantees",
    icon: HeadphonesIcon,
  },
  {
    name: "Custom Integration",
    description: "API access and custom integrations",
    icon: Settings,
  },
]

export default function EnterpriseHubPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Enterprise Solution Hub</h1>
            <p className="text-muted-foreground">
              Enterprise-grade AI solutions for large-scale deployments
            </p>
          </div>
          <Button className="gap-2">
            <Phone className="h-4 w-4" /> Contact Sales
          </Button>
        </div>

        {/* Enterprise Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Enterprise Features</CardTitle>
            <CardDescription>Built for security, scale, and compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enterpriseFeatures.map((feature) => (
                <div
                  key={feature.name}
                  className="flex items-start gap-4 rounded border border-border p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
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

        {/* Solutions */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Industry Solutions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <Card
                key={solution.id}
                className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">{solution.name}</CardTitle>
                    <Badge variant="secondary">{solution.industry}</Badge>
                  </div>
                  <CardDescription className="text-sm">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 space-y-2">
                    {solution.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-chart-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {solution.deployments} deployments
                    </span>
                    <Button size="sm" className="gap-1">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Briefcase className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Ready to Transform Your Enterprise?</h3>
                <p className="text-muted-foreground">
                  Schedule a demo to see how AgentStudio can accelerate your business
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" /> Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Trusted by Leading Enterprises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center justify-center rounded border border-border bg-secondary/30 p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Enterprise Customers</p>
                </div>
              </div>
              <div className="flex items-center justify-center rounded border border-border bg-secondary/30 p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime SLA</p>
                </div>
              </div>
              <div className="flex items-center justify-center rounded border border-border bg-secondary/30 p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">50M+</p>
                  <p className="text-sm text-muted-foreground">Tasks Processed</p>
                </div>
              </div>
              <div className="flex items-center justify-center rounded border border-border bg-secondary/30 p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">24/7</p>
                  <p className="text-sm text-muted-foreground">Enterprise Support</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Badge variant="outline" className="gap-2 px-4 py-2">
            <Shield className="h-4 w-4" /> SOC 2 Type II
          </Badge>
          <Badge variant="outline" className="gap-2 px-4 py-2">
            <Shield className="h-4 w-4" /> HIPAA Compliant
          </Badge>
          <Badge variant="outline" className="gap-2 px-4 py-2">
            <Shield className="h-4 w-4" /> GDPR Ready
          </Badge>
          <Badge variant="outline" className="gap-2 px-4 py-2">
            <Shield className="h-4 w-4" /> ISO 27001
          </Badge>
          <Badge variant="outline" className="gap-2 px-4 py-2">
            <Shield className="h-4 w-4" /> FedRAMP
          </Badge>
        </div>
      </div>
    </AppLayout>
  )
}
