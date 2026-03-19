"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  CheckCircle,
  Users,
  Package,
  Star,
  Settings,
  Edit3,
  Camera,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Bot,
  FileText,
  Puzzle,
  Search,
  TrendingUp,
  ExternalLink,
} from "lucide-react"

// Mock user profile data
const userProfile = {
  id: "user-001",
  name: "Zoey Doyle",
  username: "@zoeydoyle",
  email: "zoey.doyle@company.com",
  avatar: "",
  initials: "ZD",
  bio: "AI enthusiast and automation expert. Building tools that help teams work smarter. Passionate about creating intuitive agent workflows.",
  location: "San Francisco, CA",
  website: "https://zoeydoyle.com",
  joinDate: "March 2024",
  verified: true,
  assetsPublished: 12,
  followers: 1200,
  following: 45,
}

// Mock published assets
const publishedAssets = [
  { id: "a1", type: "agent", name: "Email Assistant Pro", downloads: "12.5K", rating: 4.8, category: "Productivity" },
  { id: "a2", type: "template", name: "Customer Onboarding Flow", downloads: "8.2K", rating: 4.6, category: "Workflow" },
  { id: "a3", type: "plugin", name: "Slack Notifier", downloads: "15.1K", rating: 4.9, category: "Integration" },
  { id: "a4", type: "agent", name: "Data Analyzer", downloads: "6.3K", rating: 4.5, category: "Analytics" },
  { id: "a5", type: "template", name: "Meeting Scheduler", downloads: "9.8K", rating: 4.7, category: "Productivity" },
  { id: "a6", type: "agent", name: "Report Generator", downloads: "4.2K", rating: 4.4, category: "Documentation" },
]

// Mock followers data
const followersData = [
  { id: "f1", name: "Alex Chen", username: "@alexchen", avatar: "", verified: true },
  { id: "f2", name: "Sarah Kim", username: "@sarahkim", avatar: "", verified: false },
  { id: "f3", name: "Michael Ross", username: "@mross", avatar: "", verified: true },
  { id: "f4", name: "Emily Davis", username: "@emilyd", avatar: "", verified: false },
  { id: "f5", name: "James Wilson", username: "@jwilson", avatar: "", verified: false },
  { id: "f6", name: "Lisa Wang", username: "@lisawang", avatar: "", verified: true },
  { id: "f7", name: "David Park", username: "@dpark", avatar: "", verified: false },
  { id: "f8", name: "Jennifer Lee", username: "@jlee", avatar: "", verified: false },
]

// Mock following data
const followingData = [
  { id: "g1", name: "Tech Innovators", username: "@techinnovators", avatar: "", verified: true },
  { id: "g2", name: "AI Research Lab", username: "@airesearch", avatar: "", verified: true },
  { id: "g3", name: "Automation Hub", username: "@automationhub", avatar: "", verified: false },
  { id: "g4", name: "DevTools Weekly", username: "@devtools", avatar: "", verified: false },
]

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("assets")
  const [assetFilter, setAssetFilter] = useState("all")
  const [followersModalOpen, setFollowersModalOpen] = useState(false)
  const [followersModalType, setFollowersModalType] = useState<"followers" | "following">("followers")
  const [searchQuery, setSearchQuery] = useState("")

  // Editable profile state
  const [editableProfile, setEditableProfile] = useState({
    name: userProfile.name,
    bio: userProfile.bio,
    location: userProfile.location,
    website: userProfile.website,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
      duration: 3000,
    })
  }

  const openFollowersModal = (type: "followers" | "following") => {
    setFollowersModalType(type)
    setFollowersModalOpen(true)
    setSearchQuery("")
  }

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "agent": return Bot
      case "template": return FileText
      case "plugin": return Puzzle
      default: return Package
    }
  }

  const filteredAssets = publishedAssets.filter(asset => 
    assetFilter === "all" || asset.type === assetFilter
  )

  const modalData = followersModalType === "followers" ? followersData : followingData
  const filteredModalData = modalData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="space-y-6 p-6 max-w-4xl">
        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="text-2xl bg-[#F5F7FA] font-medium">
                    {userProfile.initials}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#ee3224] text-white hover:bg-[#cc2a1e] transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={editableProfile.name}
                      onChange={(e) => setEditableProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="text-xl font-semibold border-[#E5E7EB] rounded-lg"
                      placeholder="Your name"
                    />
                    <Textarea
                      value={editableProfile.bio}
                      onChange={(e) => setEditableProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="border-[#E5E7EB] rounded-lg resize-none"
                      placeholder="Tell others about yourself..."
                      rows={3}
                    />
                    <div className="flex gap-4">
                      <Input
                        value={editableProfile.location}
                        onChange={(e) => setEditableProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="border-[#E5E7EB] rounded-lg"
                        placeholder="Location"
                      />
                      <Input
                        value={editableProfile.website}
                        onChange={(e) => setEditableProfile(prev => ({ ...prev, website: e.target.value }))}
                        className="border-[#E5E7EB] rounded-lg"
                        placeholder="Website URL"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-[#ee3224] hover:bg-[#cc2a1e]">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-xl font-semibold text-[#1F2937]">{userProfile.name}</h1>
                      {userProfile.verified && (
                        <CheckCircle className="h-5 w-5 fill-[#22C55E] text-white" />
                      )}
                    </div>
                    <p className="text-[14px] text-[#6B7280] mb-2">{userProfile.username}</p>
                    <p className="text-[14px] text-[#1F2937] mb-3">{userProfile.bio}</p>
                    
                    {/* Meta info row */}
                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#6B7280] mb-4">
                      {userProfile.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {userProfile.location}
                        </span>
                      )}
                      {userProfile.website && (
                        <a 
                          href={userProfile.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#ee3224] hover:underline"
                        >
                          <LinkIcon className="h-4 w-4" />
                          {userProfile.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {userProfile.joinDate}
                      </span>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => openFollowersModal("followers")}
                        className="text-[14px] hover:text-[#ee3224] transition-colors"
                      >
                        <span className="font-semibold text-[#1F2937]">{formatCount(userProfile.followers)}</span>
                        <span className="text-[#6B7280] ml-1">followers</span>
                      </button>
                      <button 
                        onClick={() => openFollowersModal("following")}
                        className="text-[14px] hover:text-[#ee3224] transition-colors"
                      >
                        <span className="font-semibold text-[#1F2937]">{userProfile.following}</span>
                        <span className="text-[#6B7280] ml-1">following</span>
                      </button>
                      <span className="text-[14px]">
                        <span className="font-semibold text-[#1F2937]">{userProfile.assetsPublished}</span>
                        <span className="text-[#6B7280] ml-1">published</span>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              {!isEditing && (
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="gap-2 border-[#E5E7EB] rounded-lg"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="assets" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2"
            >
              <Package className="h-4 w-4 mr-2" />
              Published Assets
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">{userProfile.assetsPublished}</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ee3224] data-[state=active]:bg-transparent data-[state=active]:text-[#ee3224] px-4 py-2"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Published Assets Tab */}
          <TabsContent value="assets" className="mt-4">
            {/* Asset Type Filter */}
            <div className="flex gap-2 mb-4">
              {[
                { value: "all", label: "All" },
                { value: "agent", label: "Agents" },
                { value: "template", label: "Templates" },
                { value: "plugin", label: "Plugins" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={assetFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAssetFilter(filter.value)}
                  className={assetFilter === filter.value 
                    ? "bg-[#ee3224] hover:bg-[#cc2a1e]" 
                    : "border-[#E5E7EB]"
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Assets Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAssets.map((asset) => {
                const IconComponent = getAssetIcon(asset.type)
                return (
                  <Card key={asset.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ee3224]/10">
                          <IconComponent className="h-5 w-5 text-[#ee3224]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[14px] text-[#1F2937] truncate">{asset.name}</h3>
                          <p className="text-[12px] text-[#6B7280] capitalize">{asset.type} - {asset.category}</p>
                          <div className="flex items-center gap-3 mt-2 text-[12px] text-[#6B7280]">
                            <span className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {asset.downloads}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                              {asset.rating}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <ExternalLink className="h-4 w-4 text-[#6B7280]" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredAssets.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <Package className="h-12 w-12 mx-auto mb-2 text-[#6B7280] opacity-30" />
                <p className="text-[#6B7280]">No {assetFilter} assets found</p>
              </div>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Published a new agent", item: "Email Assistant Pro", time: "2 days ago" },
                    { action: "Updated template", item: "Customer Onboarding Flow", time: "1 week ago" },
                    { action: "Received 50 new followers", item: "", time: "2 weeks ago" },
                    { action: "Published a new plugin", item: "Slack Notifier", time: "3 weeks ago" },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-[#ee3224]" />
                      <div className="flex-1">
                        <p className="text-[14px] text-[#1F2937]">
                          {activity.action}
                          {activity.item && (
                            <span className="font-medium text-[#ee3224]"> &quot;{activity.item}&quot;</span>
                          )}
                        </p>
                        <p className="text-[12px] text-[#6B7280]">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Followers/Following Modal */}
      <Dialog open={followersModalOpen} onOpenChange={setFollowersModalOpen}>
        <DialogContent className="max-w-[500px] max-h-[70vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#1F2937]">
              {followersModalType === "followers" ? "Followers" : "Following"}
            </DialogTitle>
            <p className="text-[13px] text-[#6B7280]">
              {followersModalType === "followers" 
                ? `${formatCount(userProfile.followers)} users follow you`
                : `You follow ${userProfile.following} users`
              }
            </p>
          </DialogHeader>
          
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input 
              placeholder={`Search ${followersModalType}...`} 
              className="pl-9 rounded-lg border-[#E5E7EB]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <ScrollArea className="flex-1 mt-4">
            <div className="space-y-2 pr-4">
              {filteredModalData.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F7FA] cursor-pointer transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#F5F7FA] text-sm font-medium">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-[14px] font-medium text-[#1F2937] truncate">{user.name}</p>
                      {user.verified && (
                        <CheckCircle className="h-4 w-4 fill-[#22C55E] text-white flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280]">{user.username}</p>
                  </div>
                </div>
              ))}
              
              {filteredModalData.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-10 w-10 mx-auto mb-2 text-[#6B7280] opacity-30" />
                  <p className="text-[#6B7280] text-sm">No users found</p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="pt-4 border-t border-[#E5E7EB] text-center">
            <p className="text-[13px] text-[#6B7280]">
              Showing {filteredModalData.length} of {followersModalType === "followers" ? formatCount(userProfile.followers) : userProfile.following}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
