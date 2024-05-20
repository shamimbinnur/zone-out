import Image from "next/image"
import Link from "next/link"
import ButtonToScroll from "./ButtonToScroll"

const Hero = () => {
  return (
    <section className="w-full py-14 lg:py-24 mx-auto max-w-5xl flex gap-y-20 flex-col-reverse lg:flex-row gap-x-20 items-center justify-center">
      <div className="flex flex-col text-shadowy-forest gap-y-8 lg:gap-y-10 lg:max-w-[482px]">
        <h1 className="text-3xl lg:text-4xl font-semibold">Have you been <span className="text-[#DB310B]">zoning out</span> lately?</h1>
        <p className="text-md lg:text-xl tracking-tight">No worries, we&apos;ve got your back! Enhance your productivity with our smartest, handpicked tools. We’ll keep you focused on your work, not on our app!</p>
        <div className="flex gap-6">
          <Link href="/pomo">
            <button className="bg-[#FF6584] text-base text-white font-semibold px-4 py-1 rounded-lg">Try pomodoro</button>
          </Link>
          <ButtonToScroll />
        </div>
      </div>

      <div className="max-w-[460px] px-10 lg:px-0">
        <Image src="/images/zoneout-hero.svg" alt="Hero Image" width={460} height={343} />
      </div>
    </section>
  )
}

export default Hero