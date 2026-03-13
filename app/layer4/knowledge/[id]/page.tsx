"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function Layer4KnowledgeDetailPage() {
  const router = useRouter()
  const params = useParams()
  
  useEffect(() => {
    router.replace(`/build/knowledge/${params.id}`)
  }, [router, params.id])

  return null
}
