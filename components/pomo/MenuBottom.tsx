import { bgAudios } from "@/data/pomo/bgAudio"
import Player from "./Player"

const MenuBottom = () => {
  return (
    <div className="h-[60px] p-2 flex justify-end items-center">
      <Player audios={bgAudios} />
    </div>
  )
}

export default MenuBottom