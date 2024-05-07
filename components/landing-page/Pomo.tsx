import Image from "next/image"
import Link from "next/link"

const Pomo = () => {
  return (
    <div className="border rounded-md max-w-[780px] border-gray-100 border-opacity-20 p-6 mx-auto mt-16 mb-16">
      <div className="overflow-hidden rounded-xl border-[1.5px] border-slate-400  mb-4">
        <Image
          alt="Online Pomodoro timer"
          src="/images/pomo-cover.png"
          width={780}
          height={500}
          
        >
        </Image>
      </div>

      <h1 className="text-2xl font-medium pt-2 text-[#191919]">Pomodoro Timer</h1>
      <p className="font-archivo pb-8 text-[#191919]">Introducing our sleek online Pomodoro timer, meticulously crafted for ultimate user-friendliness. Designed to seamlessly enhance your focus, it offers a refined experience to keep you on track with your tasks.</p>
      
      <Link href="/pomo">
        <button className="bg-gray-100 shadow-sm font-archivo text-[#191919] border font bold w-full rounded-lg px-4 py-2">Try now</button>
      </Link>
    </div>
  )
}

export default Pomo