import React, { FC, use, useEffect, useState } from 'react'
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

  const [buttonPosition, setButtonPosition] = useState(0)
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
  }, [isActive])
  

  const handleLeftButtonClick = () => {
    // If button is in the middle, move it to the left
    if (buttonPosition == 0) {
      api.start({ x: 155 })
      setButtonPosition(-1)
    }
    // If button is on the right, shake the button.
    else if (buttonPosition == -1) {
      api.start({ 
        config: { tension: 180, friction: 8 },
        from: { x: 150 },
        to: { x: 155 }
      })
    }
    // If button is on the left, let it go back to the middle
    else if (buttonPosition == 1) {
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 }
      })
      setButtonPosition(0)
    }
  }

  const handleRightButtonClick = () => {
    // If button is in the middle, move it to the right
    if (buttonPosition == 0) {
      api.start({ x: -155 })
      setButtonPosition(1)
    }
    else if (buttonPosition == 1) {
      // If button is on the right, shake the button.
      api.start({ 
        config: { tension: 180, friction: 8 },
        from: { x: -150 },
        to: { x: -155 }
      })
    }
    else if (buttonPosition == -1) {
      // If button is on the left, let it go back to the middle
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 }
      })
      setButtonPosition(0)
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
  
  return (
    <section className="flex relative justify-center items-center gap-x-8">
      <animated.button
      style={swipeButtonProps}
      onClick={handleLeftButtonClick}
      disabled={isActive}
      className="rounded-full border translate-y-[1px] border-out-green-1000 border-opacity-55 bg-out-green-800 transition-all">
        <MdArrowLeft className="text-out-green-1000 text-3xl scale-125"/>
      </animated.button>

      <animated.div style={pillContainer} className="w-[160px] py-1 border border-out-green-200 mx-auto bg-out-green-1000 rounded-[52px] overflow-x-hidden">
        <animated.div
          style={pillProps}
          className="select-none mx-auto text-base font-bold text-out-green-400 flex items-center justify-center gap-x-14"
          >
            <button className="text-nowrap flex items-center gap-1" onClick={toggleLongBreak} >
              <FaWalking className="text-lg" />
              Long break
            </button>

            <animated.button onClick={toggleTimer} className="text-2xl flex items-center justify-center gap-2">
              <BsStars className="text-xl" />
              Start
            </animated.button>

            <button className="text-nowrap flex items-center gap-1" onClick={toggleShortBreak} >
              <CiCoffeeCup className="text-lg" />
              Short break
            </button>
        </animated.div>
      </animated.div>

      <animated.button
      onClick={handleRightButtonClick}
      style={swipeButtonProps}
      disabled={isActive}
      className="rounded-full border translate-y-[1px] border-opacity-55 border-out-green-1000 flex items-center justify-center bg-out-green-800 transition-all">
        <MdArrowRight className="text-out-green-1000 text-3xl scale-125"/>
      </animated.button>

      {/* Pause Button */}
      {isActive &&
      <animated.button
      onClick={pauseTimer}
      style={pauseBtnProps}
      className="bg-out-green-1000 border border-out-green-200 rounded-full absolute text-sm p-4 text-white">
        <FaPause/>
      </animated.button>}
    </section>
  )
}

export default ActionBtnGroup