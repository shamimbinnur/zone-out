"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { FaInfoCircle } from "react-icons/fa"

const ScrollDownLink = () => {
  const searchParams = useSearchParams()
  const requiredContent = searchParams.get('section') === "what_is_pomodoro"
  
  useEffect(() => {
    requiredContent ? handleInfoClick() : null
  }, [requiredContent])
  
  const handleInfoClick = () => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <li>
      <button
        onClick={handleInfoClick}
        className="flex items-center gap-2">
        <FaInfoCircle />
      </button>
    </li>
  )
}

export default ScrollDownLink