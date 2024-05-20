"use client"

import { FaInfoCircle } from "react-icons/fa"

const ScrollDownLink = () => {
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