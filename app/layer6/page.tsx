"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Layer6Page() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/layer6/marketplace")
  }, [router])

  return null
}
