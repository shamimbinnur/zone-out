import { bgAudios } from "@/data/pomo/bgAudio"
import { quotes } from "@/data/pomo/quote"

import Player from "./Player"
import Quotes from "./Quotes"

const MenuBottom = () => {
  return (
    <div className="h-[122px] sm:h-[60px] overflow-hidden px-10 flex flex-col sm:flex-row sm:justify-between gap-y-4 justify-center items-center">
      <Quotes quotes={quotes} />
      <Player audios={bgAudios} />
    </div>
  )
}

export default MenuBottom