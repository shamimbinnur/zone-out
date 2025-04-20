import { makeSound } from "@/utils/audio";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export enum Status {
  POMO,
  SHORT,
  LONG,
}

enum InitialMin {
  POMO = 25,
  SHORT = 5,
  LONG = 15,
}

type TimerState = {
  secs: number;
  min: number;
  status: Status;
  isActive: boolean;
  isPromoComplete: boolean;
  pomoCount: number;
  shortCount: number;
  longCount: number;
  resetState: boolean;
  resetTimer: () => void;
  toggleTimer: () => void;
  pauseTimer: () => void;
  increaseMinutes: () => void;
  decreaseMinutes: () => void;
  toggleShortBreak: () => void;
  toggleLongBreak: () => void;
};

const useTimer = (): TimerState => {
  const [minutes, setMinutes] = useState<number>(InitialMin.POMO);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [pomoCount, setPomoCount] = useState<number>(0);
  const [shortCount, setShortCount] = useState<number>(0);
  const [longCount, setLongCount] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.POMO);
  const [isPromoComplete, setIsPromoComplete] = useState<boolean>(false);
  const [resetState, setResetState] = useState<boolean>(true);

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      setResetState(false);
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setResetState(true);
            setIsActive(false);

            if (status === Status.POMO) {
              setPomoCount((prevCount) => prevCount + 1);
              setIsPromoComplete(true);
            } else if (status === Status.SHORT) {
              setShortCount((prevCount) => prevCount + 1);
            } else if (status === Status.LONG) {
              setLongCount((prevCount) => prevCount + 1);
            }

            clearInterval(interval);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, status]);

  // Toggle pomodoro timer
  const toggleTimer = useCallback(() => {
    // Play silent audio to avoid browser restrictions on autoplay
    makeSound("SILENCE");

    // If the timer was set to BREAK previously, reset the time to initial min
    if (status !== Status.POMO) {
      setMinutes(InitialMin.POMO);
      setSeconds(0);
    }

    // Reset if timer is at 0:00
    if (minutes === 0 && seconds === 0) {
      setIsActive(false);
      resetTimer();
      return;
    }

    setIsActive((prevIsActive) => !prevIsActive);
    setStatus(Status.POMO);
  }, [minutes, seconds, status]);

  // Reset timer to initial state
  const resetTimer = useCallback(() => {
    setResetState(true);
    setIsPromoComplete(false);
    setIsActive(false);
    setStatus(Status.POMO);
    setMinutes(InitialMin.POMO);
    setSeconds(0);
  }, []);

  // Increase timer duration
  const increaseMinutes = useCallback(() => {
    if (!resetState) {
      toast("⚠ Reset the timer first!", {
        description: "You can't change the time while the timer is running.",
      });
      return;
    }

    if (minutes >= 90) {
      toast("⚠ Maximum Limit Exceeded!", {
        description: "You can't set more than 90 minutes.",
      });
      return;
    }

    setMinutes((prevMinutes) => prevMinutes + 5);
  }, [minutes, resetState]);

  // Decrease timer duration
  const decreaseMinutes = useCallback(() => {
    if (!resetState) {
      toast("⚠ Reset the timer first!", {
        description: "You can't change the time while the timer is running.",
      });
      return;
    }

    if (minutes <= 25) {
      toast("⚠ Minimum Limit Reached!", {
        description: "You can't set less than 25 minutes.",
      });
      return;
    }

    setMinutes((prevMinutes) => prevMinutes - 5);
  }, [minutes, resetState]);

  // Start short break timer
  const toggleShortBreak = useCallback(() => {
    if (status === Status.SHORT && isActive) {
      setIsActive((prevIsActive) => !prevIsActive);
      return;
    }

    setStatus(Status.SHORT);
    setMinutes(InitialMin.SHORT);
    setSeconds(0);
    setIsActive(true);
  }, [status, isActive]);

  // Start long break timer
  const toggleLongBreak = useCallback(() => {
    if (status === Status.LONG && isActive) {
      setIsActive((prevIsActive) => !prevIsActive);
      return;
    }

    setStatus(Status.LONG);
    setMinutes(InitialMin.LONG);
    setSeconds(0);
    setIsActive(!isActive);
  }, [status, isActive]);

  // Pause current timer (regardless of type)
  const pauseTimer = useCallback(() => {
    if (status === Status.POMO) {
      toggleTimer();
    } else if (status === Status.SHORT) {
      toggleShortBreak();
    } else if (status === Status.LONG) {
      toggleLongBreak();
    }
  }, [status, toggleTimer, toggleShortBreak, toggleLongBreak]);

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
    toggleShortBreak,
    toggleLongBreak,
    increaseMinutes,
    decreaseMinutes,
    toggleTimer,
    resetTimer,
    pauseTimer,
  };
};

export default useTimer;
