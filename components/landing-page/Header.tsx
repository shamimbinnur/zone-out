import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="max-w-5xl text-shadowy-forest mx-auto pt-10 pb-10 flex items-center justify-between">
      <span>
        <Image src="/images/branding.svg" alt="ZoneOut Logo" width={120} height={100} />
      </span>

      <nav>
        <ul>
          <Link href="/pomo">
            <li className="text-xl border border-stone-300 px-3 rounded-md font-medium">tomato.</li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header