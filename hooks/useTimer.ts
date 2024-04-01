import { useEffect, useState } from "react"

type statusType = "POMO" | "SHORT" | "LONG"

type timerType = {
  min: number,
  secs: number,
  isActive: boolean,
  counter: number,
  isPromoComplete: boolean,
  startShortBreak: () => void,
  startLongBreak: () => void,
  increaseMinutes: () => void,
  decreaseMinutes: () => void,
  toggleTimer: () => void,
  resetTimer: () => void
}

const POMO_MIN = 25

const useTimer = (): timerType => {
  const [minutes, setMinutes] = useState<number>(POMO_MIN)
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(0)
  const [status, setStatus] = useState<statusType>("POMO")
  const [isPromoComplete, setIsPromoComplete] = useState<boolean>(false)

  useEffect(() => {
    let interval:any;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (status == "POMO") {
              setCounter(counter + 1)
              setIsActive(false)
              setIsPromoComplete(true)
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
    if (minutes === 0 && seconds === 0){
      setIsActive(false)
      resetTimer()
    }
    setStatus("POMO");
    setIsActive(!isActive)
  };

  const resetTimer = () => {
    setIsPromoComplete(false)
    setIsActive(false)
    setMinutes(POMO_MIN)
    setSeconds(0)
  };

  const increaseMinutes = () => {
    setMinutes(minutes + 5)
  }

  const decreaseMinutes = () => {
    if (minutes == 25) return
    setMinutes(minutes - 5)
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
    isPromoComplete,
    startShortBreak,
    startLongBreak,
    increaseMinutes,
    decreaseMinutes,
    toggleTimer,
    resetTimer
  };
}

export default useTimer