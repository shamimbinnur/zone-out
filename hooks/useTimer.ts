import { useEffect, useState } from "react"
import { toast } from "sonner"

type timerType = {
  min: number,
  secs: number,
  isActive: boolean,
  pomoCount: number,
  isPromoComplete: boolean,
  resetState: boolean,
  shortCount: number,
  longCount: number,
  status: Status,
  shortBreakToggle: () => void,
  longBreakToggle: () => void,
  increaseMinutes: () => void,
  decreaseMinutes: () => void,
  toggleTimer: () => void,
  resetTimer: () => void,
  pauseTimer: () => void
}

export enum Status {
  POMO,
  SHORT,
  LONG
}
enum InitialMin {
  POMO = 25,
  SHORT = 5,
  LONG = 15
}

const useTimer = (): timerType => {
  const [minutes, setMinutes] = useState<number>(InitialMin.POMO)
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [pomoCount, setPomoCount] = useState<number>(0)
  const [shortCount, setShortCount] = useState<number>(0)
  const [longCount, setLongCount] = useState<number>(0)
  const [status, setStatus] = useState<Status>(Status.POMO)
  const [isPromoComplete, setIsPromoComplete] = useState<boolean>(false)
  const [resetState, setResetState] = useState<boolean>(true)

  useEffect(() => {
    let interval:any;
    if (isActive) {
      setResetState(false)
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setResetState(true)
            setIsActive(false)

            if (status == Status.POMO) {
              setPomoCount(pomoCount + 1)
              setIsPromoComplete(true)
            }
            else if (status == Status.SHORT) {
              setShortCount(shortCount + 1)
            }
            else if (status == Status.LONG) {
              setLongCount(longCount + 1)
            }
            clearInterval(interval)
          }else {
            setMinutes(minutes - 1)
            setSeconds(59)
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
    // If the timer was set to BREAK previously, reset the time to initial min.
    if (status != Status.POMO) {
      setMinutes(InitialMin.POMO)
      setSeconds(0)
    }
    setStatus(Status.POMO);
    setIsActive(!isActive)
  };

  const resetTimer = () => {
    setResetState(true)
    setIsPromoComplete(false)
    setIsActive(false)
    setStatus(Status.POMO)
    setMinutes(InitialMin.POMO)
    setSeconds(0)
  };

  const increaseMinutes = () => {
    if (!resetState) {
      toast('⚠ Reset the timer first!', {
        description: 'You can\'t change the time while the timer is running.'
      })
      return
    }
    if (minutes >= 90) {
      toast("⚠ Maximum Limit Exceeded!", {
        description: "You can't set more than 90 minutes.",
      })
      return
    }

    setMinutes(minutes + 5)
  }

  const decreaseMinutes = () => {
    if (!resetState) {
      toast('⚠ Reset the timer first!', {
        description: 'You can\'t change the time while the timer is running.'
      })
      return
    }
    if (minutes <= 25) {
      toast("⚠ Minimum Limit Reached!", {
        description: "You can't set less than 25 minutes.",
      })
      return
    }

    setMinutes(minutes - 5)
  }

  const shortBreakToggle = () => {
    if (status == Status.SHORT) {
      setIsActive(!isActive)
      return
    }
    setStatus(Status.SHORT)
    resetTimeToShortBreak()
    setIsActive(!isActive)
  }

  const longBreakToggle = () => {
    if (status == Status.LONG) {
      setIsActive(!isActive)
      return
    }
    setStatus(Status.LONG)
    resetTimeToLongBreak()
    setIsActive(!isActive)
  }

  const resetTimeToShortBreak = () => {
    setMinutes(InitialMin.SHORT)
    setSeconds(0)
  }
  const resetTimeToLongBreak = () => {
    setMinutes(InitialMin.LONG)
    setSeconds(0)
  }

  const pauseTimer = () => {
    if (status == Status.POMO) {
      toggleTimer()
    }
    else if (status == Status.SHORT) {
      shortBreakToggle()
    }
    else if (status == Status.LONG) {
      longBreakToggle()
    }
  }

  return {
    min: minutes,
    secs: seconds,
    isActive,
    pomoCount,
    isPromoComplete,
    resetState,
    shortCount,
    longCount,
    status,
    shortBreakToggle,
    longBreakToggle,
    increaseMinutes,
    decreaseMinutes,
    toggleTimer,
    resetTimer,
    pauseTimer,
  };
}

export default useTimer