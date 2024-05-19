import { FC, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { FaPause, FaWalking } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { CiCoffeeCup } from 'react-icons/ci';
import { Status } from '@/hooks/useTimer';

interface ActionBtnGroupProps {
  toggleShortBreak: () => void
  toggleLongBreak: () => void
  toggleTimer: () => void
  isActive: boolean
  handleButtonText: () => string
  pauseTimer: () => void
  pomoCount: number
  shortCount: number
  longCount: number
  status: Status
}

export enum ButtonPosition {
  // eslint-disable-next-line no-unused-vars
  LEFT = -1,
  // eslint-disable-next-line no-unused-vars
  MIDDLE = 0,
  // eslint-disable-next-line no-unused-vars
  RIGHT = 1
}

const ActionBtnGroup:FC<ActionBtnGroupProps> = ({
  toggleShortBreak,
  toggleLongBreak,
  toggleTimer,
  isActive,
  pauseTimer,
  status,
  pomoCount,
  shortCount,
  longCount
}) => {

  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(ButtonPosition.MIDDLE)
  const [pillProps, api] =  useSpring(() => ({ x: 0, scale: 1 }), [])

  // useEffect(() => {api.start({ x: 0 }) }, [])

  // Swipe button animation to show/hide
  const swipeButtonProps = useSpring({
    config: { duration: 100 },
    from: { opacity: 0 },
    to: { opacity: isActive ? 0 : 1 }
  })

  const [pillContainer, pillContainerApi] = useSpring(() => ({}))
  const [pauseBtnProps, pauseBtnPropsApi] = useSpring(() => ({}))

  useEffect(() => {
    pillContainerApi.start({
      config:{
        duration: 100,
      },
      to: {
        scaleX: isActive ? 0.2 : 1,
        scaleY: isActive ? 0.8 : 1,
        opacity: isActive ? 0 : 1
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  useEffect(() => {
    pauseBtnPropsApi.start({
      config:{
        duration: 100,
      },
      to: {
        scaleX: isActive ? 1 : 1.5,
        scaleY: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])
  

  const handleLeftButtonClick = () => {
    // If button is in the middle, move it to the left
    if (buttonPosition == ButtonPosition.MIDDLE) {
      api.start({ x: 155 })
      setButtonPosition(ButtonPosition.LEFT)
    }
    // If button is on the right, shake the button.
    else if (buttonPosition == ButtonPosition.LEFT) {
      api.start({ 
        config: { tension: 180, friction: 8 },
        from: { x: 150 },
        to: { x: 155 }
      })
    }
    // If button is on the left, let it go back to the middle
    else if (buttonPosition == ButtonPosition.RIGHT) {
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 }
      })
      setButtonPosition(ButtonPosition.MIDDLE)
    }
  }

  const handleRightButtonClick = () => {
    // If button is in the middle, move it to the right
    if (buttonPosition == ButtonPosition.MIDDLE) {
      api.start({ x: -155 })
      setButtonPosition(ButtonPosition.RIGHT)
    }
    else if (buttonPosition == ButtonPosition.RIGHT) {
      // If button is on the right, shake the button.
      api.start({ 
        config: { tension: 180, friction: 8 },
        from: { x: -150 },
        to: { x: -155 }
      })
    }
    else if (buttonPosition == ButtonPosition.LEFT) {
      // If button is on the left, let it go back to the middle
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 }
      })
      setButtonPosition(ButtonPosition.MIDDLE)
    }
  }

  useEffect(() => {
    if (pomoCount > 0 && pomoCount < 4) {
      // If a pomodoro is completed, bring the 'short break' button to the middle of action-button component to make it more accessible for the user.
      handleRightButtonClick()
    } else if (pomoCount === 4) {
      // If 4 pomodoros are completed, bring the 'long break' button to the middle of action-button component to make it more accessible for the user.
      handleLeftButtonClick()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoCount])

  useEffect(() => {
    if (status == Status.SHORT) {
      handleLeftButtonClick()
    }
    else if (status == Status.LONG) {
      handleRightButtonClick()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortCount, longCount])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleRightButtonClick();
      }
      if (event.key === "ArrowLeft") {
        handleLeftButtonClick();
      }
      if (event.key === "Enter") {
        if (buttonPosition === ButtonPosition.LEFT) {
          toggleLongBreak();
        }
        else if (buttonPosition === ButtonPosition.MIDDLE) {
          toggleTimer();
        }
        else if (buttonPosition === ButtonPosition.RIGHT) {
          toggleShortBreak();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [buttonPosition, isActive, toggleLongBreak, toggleShortBreak, toggleTimer])
  
  return (
    <section className="flex font-archivo relative justify-center items-center gap-x-8">
      <animated.button
      style={swipeButtonProps}
      onClick={handleLeftButtonClick}
      disabled={isActive}
      className="rounded-full border translate-y-[1px] outline-none
        focus-visible:ring-white focus-visible:ring-opacity-65
        focus-visible:ring border-opacity-20
        border-evergreen-meadow mx-auto bg-shadowy-forest transition-all">
        <MdArrowLeft className="text-turquoise-tide text-3xl scale-125"/>
        <span className="sr-only">Previous option</span>
      </animated.button>

      <animated.div style={pillContainer} className="w-[160px] py-1 border border-opacity-20 border-evergreen-meadow mx-auto bg-shadowy-forest rounded-[52px] overflow-x-hidden">
        <animated.div
          style={pillProps}
          className="select-none mx-auto text-base font-bold text-turquoise-tide flex items-center justify-center gap-x-14"
          >
            <button
              disabled={buttonPosition !== ButtonPosition.LEFT }
              className="text-nowrap flex
              transform transition-all
              outline-none focus-visible:text-white
              items-center gap-1"
              onClick={toggleLongBreak}>
                <FaWalking className="text-lg" />
                Long break
            </button>

            <animated.button
              disabled={buttonPosition !== ButtonPosition.MIDDLE || isActive}
              onClick={toggleTimer}
              className="text-2xl flex items-center
              transform transition-all outline-none
              focus-visible:text-white rounded-lg
              justify-center gap-2">
              <BsStars className="text-xl" />
              Start
            </animated.button>

            <button
              disabled={buttonPosition !== ButtonPosition.RIGHT}
              className="text-nowrap flex items-center
              transform transition-all outline-none
              focus-visible:text-white  gap-1"
               onClick={toggleShortBreak} >
              <CiCoffeeCup className="text-lg" />
              Short break
            </button>
        </animated.div>
      </animated.div>

      <animated.button
      onClick={handleRightButtonClick}
      style={swipeButtonProps}
      disabled={isActive}
      className="rounded-full border translate-y-[1px]
        border-opacity-20 border-evergreen-meadow mx-auto bg-shadowy-forest
        flex items-center justify-center
        outline-none focus-visible:ring-white focus-visible:ring-opacity-65
        focus-visible:ring transition-all">
        <MdArrowRight className="text-turquoise-tide text-3xl scale-125"/>
        <span className="sr-only">Next option</span>
      </animated.button>

      {/* Pause Button */}
      {isActive &&
      <animated.button
      onClick={pauseTimer}
      style={pauseBtnProps}
      className="bg-shadowy-forest border border-opacity-20 border-evergreen-meadow rounded-full absolute text-sm p-4 text-turquoise-tide">
        <FaPause/>
      </animated.button>}
    </section>
  )
}

export default ActionBtnGroup