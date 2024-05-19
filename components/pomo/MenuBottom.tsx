import { bgAudios } from "@/data/pomo/bgAudio"
import { quotes } from "@/data/pomo/quote"

import Player from "./Player"
import Quotes from "./Quotes"
import FooterNav from "./FooterNav"

const MenuBottom = () => {
  return (
    <div className="h-[122px] sm:h-[60px] mx-auto max-w-[378px] sm:max-w-full sm:px-10">
      <DeskTopMenu />
      <MobileMenu />
    </div>
  )
}

export default MenuBottom

const DeskTopMenu = () => {
  return (
    <div className="hidden sm:flex flex-row justify-between gap-y-4">
      <FooterNav />
      <Quotes quotes={quotes} />
      <Player audios={bgAudios} />
    </div>
  )
}

const MobileMenu = () => {
  return (
    <div className="flex sm:hidden flex-col items-center gap-y-8">
      <div className="flex w-full justify-between">
        <FooterNav />
        <Player audios={bgAudios} />
      </div>
      
      <Quotes quotes={quotes} />
    </div>
  )
}