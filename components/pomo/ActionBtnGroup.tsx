import { FC, useEffect, useState, useCallback } from "react";
import { animated, useSpring } from "@react-spring/web";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { FaPause, FaWalking } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { CiCoffeeCup } from "react-icons/ci";
import { Status } from "@/hooks/useTimer";

export enum ButtonPosition {
  LEFT = -1,
  MIDDLE = 0,
  RIGHT = 1,
}

interface ActionBtnGroupProps {
  toggleShortBreak: () => void;
  toggleLongBreak: () => void;
  toggleTimer: () => void;
  isActive: boolean;
  handleButtonText: () => string;
  pauseTimer: () => void;
  pomoCount: number;
  shortCount: number;
  longCount: number;
  status: Status;
}

const ActionBtnGroup: FC<ActionBtnGroupProps> = ({
  toggleShortBreak,
  toggleLongBreak,
  toggleTimer,
  isActive,
  pauseTimer,
  status,
  pomoCount,
  shortCount,
  longCount,
}) => {
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(
    ButtonPosition.MIDDLE
  );
  const [pillProps, api] = useSpring(() => ({ x: 0, scale: 1 }), []);

  // Animation for swipe buttons (left/right arrows)
  const swipeButtonProps = useSpring({
    config: { duration: 100 },
    from: { opacity: 0 },
    to: { opacity: isActive ? 0 : 1 },
  });

  // Animation for pill container
  const [pillContainer, pillContainerApi] = useSpring(() => ({}));

  // Animation for pause button
  const [pauseBtnProps, pauseBtnPropsApi] = useSpring(() => ({}));

  // Update pill container animation when timer state changes
  useEffect(() => {
    pillContainerApi.start({
      config: {
        duration: 100,
      },
      to: {
        scaleX: isActive ? 0.2 : 1,
        scaleY: isActive ? 0.8 : 1,
        opacity: isActive ? 0 : 1,
      },
    });
  }, [isActive, pillContainerApi]);

  // Update pause button animation when timer state changes
  useEffect(() => {
    pauseBtnPropsApi.start({
      config: {
        duration: 100,
      },
      to: {
        scaleX: isActive ? 1 : 1.5,
        scaleY: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0,
      },
    });
  }, [isActive, pauseBtnPropsApi]);

  // Handle left button click (long break)
  const handleLeftButtonClick = useCallback(() => {
    // If button is in the middle, move it to the left
    if (buttonPosition === ButtonPosition.MIDDLE) {
      api.start({ x: 155 });
      setButtonPosition(ButtonPosition.LEFT);
    }
    // If button is on the left, shake it to indicate it's already selected
    else if (buttonPosition === ButtonPosition.LEFT) {
      api.start({
        config: { tension: 180, friction: 8 },
        from: { x: 150 },
        to: { x: 155 },
      });
    }
    // If button is on the right, move it to the middle
    else if (buttonPosition === ButtonPosition.RIGHT) {
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 },
      });
      setButtonPosition(ButtonPosition.MIDDLE);
    }
  }, [buttonPosition, api]);

  // Handle right button click (short break)
  const handleRightButtonClick = useCallback(() => {
    // If button is in the middle, move it to the right
    if (buttonPosition === ButtonPosition.MIDDLE) {
      api.start({ x: -155 });
      setButtonPosition(ButtonPosition.RIGHT);
    }
    // If button is on the right, shake it to indicate it's already selected
    else if (buttonPosition === ButtonPosition.RIGHT) {
      api.start({
        config: { tension: 180, friction: 8 },
        from: { x: -150 },
        to: { x: -155 },
      });
    }
    // If button is on the left, move it to the middle
    else if (buttonPosition === ButtonPosition.LEFT) {
      api.start({
        x: 0,
        config: { tension: 170, friction: 26 },
      });
      setButtonPosition(ButtonPosition.MIDDLE);
    }
  }, [buttonPosition, api]);

  // Move button to short break position when a pomodoro is completed
  useEffect(() => {
    if (pomoCount > 0 && pomoCount < 4) {
      // After completing a pomodoro, make the 'short break' button more accessible
      handleRightButtonClick();
    } else if (pomoCount === 4) {
      // After 4 pomodoros, make the 'long break' button more accessible
      handleLeftButtonClick();
    }
  }, [pomoCount, handleRightButtonClick, handleLeftButtonClick]);

  // Update button position when break status changes
  useEffect(() => {
    if (status === Status.SHORT) {
      handleLeftButtonClick();
    } else if (status === Status.LONG) {
      handleRightButtonClick();
    }
  }, [
    shortCount,
    longCount,
    status,
    handleLeftButtonClick,
    handleRightButtonClick,
  ]);

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
        } else if (buttonPosition === ButtonPosition.MIDDLE) {
          toggleTimer();
        } else if (buttonPosition === ButtonPosition.RIGHT) {
          toggleShortBreak();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    buttonPosition,
    isActive,
    toggleLongBreak,
    toggleShortBreak,
    toggleTimer,
    handleLeftButtonClick,
    handleRightButtonClick,
  ]);

  return (
    <section className="flex font-archivo relative justify-center items-center gap-x-8">
      {/* Left Arrow Button */}
      <animated.button
        style={swipeButtonProps}
        onClick={handleLeftButtonClick}
        disabled={isActive}
        className="rounded-full border translate-y-[1px] outline-none
          focus-visible:ring-white focus-visible:ring-opacity-65
          focus-visible:ring border-opacity-20
          border-evergreen-meadow mx-auto bg-shadowy-forest transition-all"
      >
        <MdArrowLeft className="text-turquoise-tide text-3xl scale-125" />
        <span className="sr-only">Previous option</span>
      </animated.button>

      {/* Pill Container with Timer Options */}
      <animated.div
        style={pillContainer}
        className="w-[160px] py-1 border border-opacity-20 border-evergreen-meadow mx-auto bg-shadowy-forest rounded-[52px] overflow-x-hidden"
      >
        <animated.div
          style={pillProps}
          className="select-none mx-auto text-base font-bold text-turquoise-tide flex items-center justify-center gap-x-14"
        >
          {/* Long Break Button */}
          <button
            disabled={buttonPosition !== ButtonPosition.LEFT}
            className="text-nowrap flex
              transform transition-all
              outline-none focus-visible:text-white
              items-center gap-1"
            onClick={toggleLongBreak}
          >
            <FaWalking className="text-lg" />
            Long break
          </button>

          {/* Start/Pause Button */}
          <animated.button
            disabled={buttonPosition !== ButtonPosition.MIDDLE || isActive}
            onClick={toggleTimer}
            className="text-2xl flex items-center
              transform transition-all outline-none
              focus-visible:text-white rounded-lg
              justify-center gap-2"
          >
            <BsStars className="text-xl" />
            Start
          </animated.button>

          {/* Short Break Button */}
          <button
            disabled={buttonPosition !== ButtonPosition.RIGHT}
            className="text-nowrap flex items-center
              transform transition-all outline-none
              focus-visible:text-white gap-1"
            onClick={toggleShortBreak}
          >
            <CiCoffeeCup className="text-lg" />
            Short break
          </button>
        </animated.div>
      </animated.div>

      {/* Right Arrow Button */}
      <animated.button
        onClick={handleRightButtonClick}
        style={swipeButtonProps}
        disabled={isActive}
        className="rounded-full border translate-y-[1px]
          border-opacity-20 border-evergreen-meadow mx-auto bg-shadowy-forest
          flex items-center justify-center
          outline-none focus-visible:ring-white focus-visible:ring-opacity-65
          focus-visible:ring transition-all"
      >
        <MdArrowRight className="text-turquoise-tide text-3xl scale-125" />
        <span className="sr-only">Next option</span>
      </animated.button>

      {/* Pause Button */}
      {isActive && (
        <animated.button
          onClick={pauseTimer}
          style={pauseBtnProps}
          className="bg-shadowy-forest border border-opacity-20 border-evergreen-meadow rounded-full absolute text-sm p-4 text-turquoise-tide"
        >
          <FaPause />
        </animated.button>
      )}
    </section>
  );
};

export default ActionBtnGroup;
