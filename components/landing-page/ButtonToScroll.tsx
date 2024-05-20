"use client"

const ButtonToScroll = () => {
  const handleInfoClick = () => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: window.innerHeight - 50, behavior: "smooth" })
  }

  return (
    <button onClick={handleInfoClick} className="border border-slate-400 text-base text-slate-800 font-semibold px-4 py-1 rounded-lg">
      Learn more
    </button>
  )
}

export default ButtonToScroll