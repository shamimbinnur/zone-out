import Image from "next/image"
import Link from "next/link"

const Pomo = () => {
  return (
    <section className="w-full py-14 lg:py-24 mx-auto max-w-5xl flex flex-col gap-y-8 text-shadowy-forest justify-between">
      <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">Earliest tool: <span className="text-turquoise-tide">Pomodoro Timer</span> lately?</h1>
      
      <p className="text-md lg:text-lg tracking-tight">
        The online Pomodoro timer is the earliest tool by ZoneOut. Designed to provide a smooth user experience and minimize distractions, it includes a quotes section to keep you motivated and options to play soothing background music (e.g., birds chirping, fire crackling, water flowing).
      </p>

      <div className="max-w-[460px] mx-auto px-10 lg:px-0 py-16">
        <Image src="/images/pomo-hero.svg" alt="Hero Image" width={391} height={321} />
      </div>

      <div className="mx-auto flex items-center gap-x-6 py-1">
        <p className="tracking-tight text-base font-semibold">Ready to focus?</p>
        <Link href="/pomo">
          <button className="bg-turquoise-tide text-white font-semibold text-base px-4 py-1 rounded-lg">Try it now</button>
        </Link>
      </div>
    </section>
  )
}

export default Pomo