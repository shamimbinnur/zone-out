type SoundType = "HEADS-UP"

const makeSound = (soundType: SoundType): void => {
  switch (soundType){
    case "HEADS-UP":
      const audio = new Audio("/audio/heads-up.mp3")
      audio.play()
      break
  }
}

export { makeSound }