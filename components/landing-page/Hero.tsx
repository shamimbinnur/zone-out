const Hero = () => {
  return (
    <section className="flex flex-col items-center pt-10 md:pt-60">
      <h1 className="text-left 1088:text-center text-5xl font-extralight lg:leading-[1.2] max-w-3xl tracking-tightest">{h1}</h1>
      <p className="text-left py-8 1088:text-center text-lg font-archivo md:max-w-2xl font-extralight">{p}</p>
      <div className="max-w-[1080px] mb-36 lg:mb-60 font-bold h-1 ">. <span className="text-red-500">. </span>.</div>
    </section>
  )
}

export default Hero

const h1 = "Have you been zoning out lately? No worries we've got your back!"
const p = "Boost your productivity using the smartest and most curated tools. We glue you to your work, not to our app!"