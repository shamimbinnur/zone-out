import { useEffect, useState } from "react"

type statusType = "POMO" | "SHORT" | "LONG"

type timerType = {
  min: number,
  secs: number,
  isActive: boolean,
  counter: number,
  startShortBreak: () => void,
  startLongBreak: () => void,
  increaseMinutes: () => void,
  toggleTimer: () => void,
  resetTimer: () => void
}

const useTimer = (): timerType => {
  const [minutes, setMinutes] = useState<number>(25)
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(0)
  const [status, setStatus] = useState<statusType>("POMO")

  useEffect(() => {
    let interval:any;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (status == "POMO") {
              setCounter(counter + 1)
            }
            clearInterval(interval)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval)
  }, [isActive, minutes, seconds])

  const toggleTimer = () => {
    setStatus("POMO");
    setIsActive(!isActive)
  };

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  };

  const increaseMinutes = () => {
    setMinutes(minutes + 5)
  }

  const startShortBreak = () => {
    setStatus("SHORT")
    setMinutes(5)
    setSeconds(0)
    setIsActive(true)
  }

  const startLongBreak = () => {
    setStatus("LONG")
    setMinutes(15)
    setSeconds(0)
    setIsActive(true)
  }

  return {
    min: minutes,
    secs: seconds,
    isActive,
    counter,
    startShortBreak,
    startLongBreak,
    increaseMinutes,
    toggleTimer,
    resetTimer
  };
}

export default useTimer