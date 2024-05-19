import Link from "next/link"
import {JSX} from "react"
import { HiHome } from "react-icons/hi"
import ScrollDownLink from "./ScrollDownLink"

const FooterNav = () => {
  type NavType = {
    href: string
    label?: string
    icon?: JSX.Element
  }
  type NavsType = NavType[]

  const links: NavsType = [
    {
      href: "/",
      label: "Home",
      icon: <HiHome />
    },
  ]

  return (
    <nav className="w-fit h-fit bg-black rounded-lg py-1 px-2">
      <ul className="flex items-center gap-x-2 text-base text-moonlit-silver">
        {links.map(({ href, label, icon }) => (
          <li key={label}>
            <Link href={href} className="flex items-center gap-2">
              {icon && icon}
              {label && label}
              <span className="text-moonlit-silver">|</span>
            </Link>
          </li>
        ))}

        <ScrollDownLink/>
      </ul>
    </nav>
  )
}

export default FooterNav