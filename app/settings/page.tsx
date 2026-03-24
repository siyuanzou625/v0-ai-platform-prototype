"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Settings,
  Bell,
  Shield,
  Eye,
  Users,
  Lock,
  AlertTriangle,
  Github,
  Link,
} from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false)
  const [githubAccountType, setGithubAccountType] = useState<"personal" | "enterprise">("personal")
  
  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    showProfilePublicly: true,
    showFollowerCount: true,
    showFollowingList: true,
    notifyOnFollow: true,
    enterpriseMode: false,
  })

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    if (key === "enterpriseMode" && !privacySettings.enterpriseMode) {
      setEnterpriseModalOpen(true)
      return
    }
    
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    
    toast({
      title: "Privacy settings updated",
      description: "Your changes have been saved.",
      duration: 3000,
    })
  }

  const confirmEnterpriseMode = () => {
    setPrivacySettings(prev => ({
      ...prev,
      enterpriseMode: true
    }))
    setEnterpriseModalOpen(false)
    
    toast({
      title: "Enterprise Mode enabled",
      description: "All social features are now hidden.",
      duration: 3000,
    })
  }

  const resetPrivacySettings = () => {
    setPrivacySettings({
      showProfilePublicly: true,
      showFollowerCount: true,
      showFollowingList: true,
      notifyOnFollow: true,
      enterpriseMode: false,
    })
    
    toast({
      title: "Privacy settings reset",
      description: "All settings restored to defaults.",
      duration: 3000,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6 max-w-3xl">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-[#ee3224]" />
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          </div>
          <p className="mt-2 text-sm text-[#6B7280]">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Notifications Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#1F2937]" />
              <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            </div>
            <CardDescription>Control how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Email notifications</Label>
                <p className="text-[13px] text-[#6B7280]">Receive important updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-[#E5E7EB]" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Push notifications</Label>
                <p className="text-[13px] text-[#6B7280]">Get notified about activity in real-time</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#1F2937]" />
              <CardTitle className="text-lg font-semibold">Privacy</CardTitle>
            </div>
            <CardDescription>Control who can see your profile and social information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Toggle 1: Show My Profile Publicly */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Show my profile publicly</Label>
                <p className="text-[13px] text-[#6B7280]">Allow others to view your profile and follower count</p>
              </div>
              <Switch 
                checked={privacySettings.showProfilePublicly}
                onCheckedChange={() => handlePrivacyToggle("showProfilePublicly")}
                className="data-[state=checked]:bg-[#ee3224]"
              />
            </div>
            
            <Separator className="bg-[#E5E7EB]" />
            
            {/* Toggle 2: Show My Follower Count */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Show my follower count</Label>
                <p className="text-[13px] text-[#6B7280]">Display follower count on your profile and assets</p>
              </div>
              <Switch 
                checked={privacySettings.showFollowerCount}
                onCheckedChange={() => handlePrivacyToggle("showFollowerCount")}
                className="data-[state=checked]:bg-[#ee3224]"
              />
            </div>
            
            <Separator className="bg-[#E5E7EB]" />
            
            {/* Toggle 3: Show My Following List */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Show who I follow</Label>
                <p className="text-[13px] text-[#6B7280]">Allow others to see which creators you follow</p>
              </div>
              <Switch 
                checked={privacySettings.showFollowingList}
                onCheckedChange={() => handlePrivacyToggle("showFollowingList")}
                className="data-[state=checked]:bg-[#ee3224]"
              />
            </div>
            
            <Separator className="bg-[#E5E7EB]" />
            
            {/* Toggle 4: Allow Follow Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Notify me when someone follows me</Label>
                <p className="text-[13px] text-[#6B7280]">Receive notifications when new users follow you</p>
              </div>
              <Switch 
                checked={privacySettings.notifyOnFollow}
                onCheckedChange={() => handlePrivacyToggle("notifyOnFollow")}
                className="data-[state=checked]:bg-[#ee3224]"
              />
            </div>
            
            <Separator className="bg-[#E5E7EB]" />
            
            {/* Toggle 5: Enterprise Mode */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label className="text-[14px] font-medium text-[#1F2937]">Enterprise Mode</Label>
                  <Badge className="bg-[#F59E0B] text-white text-[10px]">Enterprise</Badge>
                </div>
                <p className="text-[13px] text-[#6B7280]">Hide all social features for enterprise compliance</p>
                {privacySettings.enterpriseMode && (
                  <p className="text-[12px] text-[#F59E0B] flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    All social features are currently hidden
                  </p>
                )}
              </div>
              <Switch 
                checked={privacySettings.enterpriseMode}
                onCheckedChange={() => handlePrivacyToggle("enterpriseMode")}
                className="data-[state=checked]:bg-[#ee3224]"
              />
            </div>
            
            <Separator className="bg-[#E5E7EB]" />
            
            {/* Reset to Defaults */}
            <div className="pt-2">
              <Button variant="link" className="text-[#ee3224] p-0 h-auto" onClick={resetPrivacySettings}>
                Reset to defaults
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integrations Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Link className="h-5 w-5 text-[#1F2937]" />
              <CardTitle className="text-lg font-semibold">Integrations</CardTitle>
            </div>
            <CardDescription>Manage your connected tools and external platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* GitHub Connection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-[#1F2937]" />
                <Label className="text-[14px] font-medium text-[#1F2937]">GitHub Connection</Label>
              </div>
              <p className="text-[13px] text-[#6B7280]">Connect your GitHub account to sync agents and collaborate on code</p>
              
              {/* Account Type Selection */}
              <div className="space-y-3 pl-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="githubAccount"
                    checked={githubAccountType === "personal"}
                    onChange={() => setGithubAccountType("personal")}
                    className="mt-1 h-4 w-4 accent-[#ee3224]"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[14px] font-medium text-[#1F2937]">Personal Account</span>
                    <p className="text-[13px] text-[#6B7280]">Connect with your personal GitHub account for individual projects</p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="githubAccount"
                    checked={githubAccountType === "enterprise"}
                    onChange={() => setGithubAccountType("enterprise")}
                    className="mt-1 h-4 w-4 accent-[#ee3224]"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[14px] font-medium text-[#1F2937]">Enterprise Account</span>
                    <p className="text-[13px] text-[#6B7280]">Connect with your organization's GitHub Enterprise for team collaboration</p>
                  </div>
                </label>
              </div>
              
              {/* Connect Button */}
              <div className="pt-2">
                <Button 
                  className="bg-[#ee3224] hover:bg-[#cc2a1e] text-white"
                  onClick={() => toast({
                    title: "GitHub Connection",
                    description: `Connecting to GitHub ${githubAccountType === "personal" ? "Personal" : "Enterprise"} account...`,
                    duration: 3000,
                  })}
                >
                  <Github className="h-4 w-4 mr-2" />
                  Connect GitHub
                </Button>
                <p className="text-[12px] text-[#9CA3AF] mt-2">You can switch between account types at any time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#1F2937]" />
              <CardTitle className="text-lg font-semibold">Security</CardTitle>
            </div>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Two-factor authentication</Label>
                <p className="text-[13px] text-[#6B7280]">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <Separator className="bg-[#E5E7EB]" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[14px] font-medium text-[#1F2937]">Change password</Label>
                <p className="text-[13px] text-[#6B7280]">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Mode Confirmation Modal */}
      <Dialog open={enterpriseModalOpen} onOpenChange={setEnterpriseModalOpen}>
        <DialogContent className="max-w-md" aria-describedby="enterprise-mode-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
              Enable Enterprise Mode
            </DialogTitle>
            <DialogDescription id="enterprise-mode-description">
              Enabling Enterprise Mode will hide all social features across the platform, including:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <ul className="list-disc list-inside text-sm text-[#6B7280] space-y-1">
              <li>Your follower and following counts</li>
              <li>Your followers and following lists</li>
              <li>Social metrics on all your published assets</li>
              <li>Follow buttons on your profile</li>
            </ul>
            <p className="text-sm text-[#F59E0B] mt-4">
              This action can be reversed by toggling Enterprise Mode off.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEnterpriseModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#ee3224] hover:bg-[#cc2a1e]" onClick={confirmEnterpriseMode}>
              Enable Enterprise Mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
