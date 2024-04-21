type SoundType = "HEADS-UP" | "SILENCE"

const makeSound = (soundType: SoundType): void => {
  switch (soundType){
    case "HEADS-UP": {
      const audio = new Audio("/audio/heads-up.mp3")
      audio.play()
      break
    }
    case "SILENCE": {
      const audio2 = new Audio("/audio/silence.wav")
      audio2.play()
      break
    }
  }
}

export { makeSound }