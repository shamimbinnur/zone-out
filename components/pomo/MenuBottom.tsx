import { bgAudios } from "@/data/pomo/bgAudio"
import { quotes } from "@/data/pomo/quote"

import Player from "./Player"
import Quotes from "./Quotes"

const MenuBottom = () => {
  return (
    <div className="h-[60px] py-2 px-10 flex justify-between items-center">
      <Quotes quotes={quotes} />
      <Player audios={bgAudios} />
    </div>
  )
}

export default MenuBottom