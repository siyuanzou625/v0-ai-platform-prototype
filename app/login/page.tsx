"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield, 
  AlertCircle, 
  CheckCircle2,
  X,
  Loader2,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Valid credentials for demo
const VALID_CREDENTIALS = {
  username: "zoey",
  email: "zoey@company.com",
  password: "666666",
}

// User profile after login
const USER_PROFILE = {
  id: "user-001",
  name: "Zoey Doyle",
  email: "zoey@company.com",
  username: "zoey",
  avatar: "/avatars/zoey.jpg",
  role: "Creator",
  organization: "Enterprise Corp",
  firstLogin: false,
  lastLogin: new Date().toISOString(),
}

export default function LoginPage() {
  const router = useRouter()
  
  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Validation state
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [formError, setFormError] = useState("")
  
  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  
  // Animation state
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Clear form error when user types
  useEffect(() => {
    if (formError) {
      setFormError("")
    }
  }, [email, password])

  // Validate email on blur
  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("This field is required")
      return false
    }
    setEmailError("")
    return true
  }

  // Validate password on blur
  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("This field is required")
      return false
    }
    setPasswordError("")
    return true
  }

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate fields
    const emailValid = validateEmail()
    const passwordValid = validatePassword()
    
    if (!emailValid || !passwordValid) {
      return
    }
    
    setIsLoading(true)
    setFormError("")
    
    // Mock API call delay (demo mode - accepts any credentials)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Success - save token (demo mode: any username/password allowed)
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("authToken", `mock-token-${Date.now()}`)
    storage.setItem("user", JSON.stringify(USER_PROFILE))
    
    setIsSuccess(true)
    
    // Redirect after brief success state
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  // Handle password reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resetEmail.trim()) {
      return
    }
    
    setResetLoading(true)
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setResetLoading(false)
    setResetSent(true)
  }

  // Close reset modal
  const closeResetModal = () => {
    setShowForgotPassword(false)
    setResetEmail("")
    setResetSent(false)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/login-bg.jpg')`,
        }}
      />
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Login Card */}
      <div 
        className={`relative z-10 w-full max-w-[440px] mx-6 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl transition-all duration-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="px-12 py-10">
          {/* Logo & Tagline */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ee3224]">
                <Bot className="h-7 w-7 text-white" />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-[#1F2937]">AgentStudio</h2>
            <p className="text-sm text-[#6B7280]">AI PC Agent Platform</p>
          </div>
          
          {/* Divider */}
          <div className="border-t border-[#E5E7EB] mb-6" />
          
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Welcome back</h1>
            <p className="text-sm text-[#6B7280]">Sign in to your account to continue</p>
          </div>

          {/* Error Banner */}
          {formError && (
            <div className="mb-6 flex items-center gap-3 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0" />
              <p className="text-sm text-[#991B1B] flex-1">{formError}</p>
              <button onClick={() => setFormError("")} className="text-[#991B1B] hover:text-[#DC2626]">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#333]">
                Email or Username
              </Label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                  emailError ? 'text-[#DC2626]' : 'text-[#6B7280]'
                }`} />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                  }}
                  onBlur={validateEmail}
                  className={`h-11 pl-10 pr-4 bg-white border rounded transition-all ${
                    emailError 
                      ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' 
                      : 'border-[#E5E7EB] focus:border-[#ee3224] focus:ring-[#ee3224]/20'
                  }`}
                  disabled={isLoading || isSuccess}
                />
                {!emailError && email && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#22C55E]" />
                )}
              </div>
              {emailError && (
                <p className="text-xs text-[#DC2626]">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#333]">
                Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                  passwordError ? 'text-[#DC2626]' : 'text-[#6B7280]'
                }`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (passwordError) setPasswordError("")
                  }}
                  onBlur={validatePassword}
                  className={`h-11 pl-10 pr-12 bg-white border rounded transition-all ${
                    passwordError 
                      ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' 
                      : 'border-[#E5E7EB] focus:border-[#ee3224] focus:ring-[#ee3224]/20'
                  }`}
                  disabled={isLoading || isSuccess}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#333] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-[#DC2626]">{passwordError}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="h-[18px] w-[18px] border-[#E5E7EB] data-[state=checked]:bg-[#ee3224] data-[state=checked]:border-[#ee3224]"
                  disabled={isLoading || isSuccess}
                />
                <Label htmlFor="remember" className="text-[13px] text-[#333] cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-[13px] text-[#ee3224] hover:text-[#c41f1f] hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full h-12 text-[15px] font-semibold transition-all duration-200 group ${
                isSuccess 
                  ? 'bg-[#22C55E] hover:bg-[#22C55E]' 
                  : 'bg-[#ee3224] hover:bg-[#c41f1f] active:bg-[#a81a1a]'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Success!
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </>
              )}
            </Button>
            
            {isSuccess && (
              <p className="text-center text-xs text-[#22C55E]">Redirecting...</p>
            )}
          </form>

          {/* Social Login Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/95 px-3 text-[#6B7280]">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-3">
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F5F7FA] transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F5F7FA] transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#00A4EF" d="M11.4 24H0V12.6h11.4V24z"/>
                <path fill="#FFB900" d="M24 24H12.6V12.6H24V24z"/>
                <path fill="#F25022" d="M11.4 11.4H0V0h11.4v11.4z"/>
                <path fill="#7FBA00" d="M24 11.4H12.6V0H24v11.4z"/>
              </svg>
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F5F7FA] transition-colors">
              <Shield className="h-5 w-5 text-[#6B7280]" />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Don&apos;t have an account?{" "}
            <button className="font-medium text-[#ee3224] hover:text-[#c41f1f] hover:underline transition-colors">
              Create account
            </button>
          </p>
        </div>

        {/* Security Badge */}
        <div className="border-t border-[#E5E7EB] px-12 py-4">
          <div className="flex items-center justify-center gap-2 text-[#9CA3AF]">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Secured with enterprise-grade encryption</span>
          </div>
          
          {/* Compliance Badges */}
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-[#9CA3AF]">
              <div className="w-6 h-6 rounded border border-[#E5E7EB] flex items-center justify-center text-[8px] font-medium">
                SOC2
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#9CA3AF]">
              <div className="w-6 h-6 rounded border border-[#E5E7EB] flex items-center justify-center text-[8px] font-medium">
                GDPR
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-4 text-xs text-white/60">
        <a href="#" className="hover:text-white hover:underline transition-colors">Help Center</a>
        <span>|</span>
        <a href="#" className="hover:text-white hover:underline transition-colors">Contact Support</a>
        <span>|</span>
        <a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
        <span>|</span>
        <a href="#" className="hover:text-white hover:underline transition-colors">Terms of Service</a>
      </div>

      {/* Password Recovery Modal */}
      <Dialog open={showForgotPassword} onOpenChange={closeResetModal}>
        <DialogContent className="sm:max-w-[450px]">
          {!resetSent ? (
            <>
              <DialogHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ee3224]/10">
                  <Lock className="h-6 w-6 text-[#ee3224]" />
                </div>
                <DialogTitle className="text-xl font-semibold text-[#1F2937]">
                  Reset your password
                </DialogTitle>
                <DialogDescription className="text-sm text-[#6B7280]">
                  Enter your email and we&apos;ll send you a reset link
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handlePasswordReset} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-sm font-medium text-[#333]">
                    Email Address
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="h-11 pl-10 border-[#E5E7EB] focus:border-[#ee3224] focus:ring-[#ee3224]/20"
                      disabled={resetLoading}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={closeResetModal}
                    className="flex-1 text-[#6B7280]"
                    disabled={resetLoading}
                  >
                    Back to sign in
                  </Button>
                  <Button
                    type="submit"
                    disabled={!resetEmail.trim() || resetLoading}
                    className="flex-1 bg-[#ee3224] hover:bg-[#c41f1f]"
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <DialogHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/10">
                  <CheckCircle2 className="h-6 w-6 text-[#22C55E]" />
                </div>
                <DialogTitle className="text-xl font-semibold text-[#1F2937]">
                  Check your email
                </DialogTitle>
                <DialogDescription className="text-sm text-[#6B7280]">
                  We&apos;ve sent a password reset link to your email
                </DialogDescription>
              </DialogHeader>
              
              <Button
                onClick={closeResetModal}
                className="w-full mt-4 bg-[#ee3224] hover:bg-[#c41f1f]"
              >
                Back to sign in
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
