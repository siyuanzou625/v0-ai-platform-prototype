"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Layer4WorkspacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const params = searchParams.toString()
    router.replace(`/build/workspace${params ? `?${params}` : ""}`)
  }, [router, searchParams])

  return null
}
