"use client";

import { FC, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl, Howler } from "howler";
import {
  FaBackwardStep,
  FaCirclePause,
  FaCirclePlay,
  FaForwardStep,
} from "react-icons/fa6";

import VolumePopover from "./VolumePopover";
import { AudiosType } from "@/data/pomo/bgAudio";
import { useTheme } from "@/contexts/ThemeContext";

interface PlayerProps {
  audios: AudiosType;
}

const Player: FC<PlayerProps> = ({ audios }) => {
  const { theme } = useTheme();
  const [audio, setAudio] = useState<Howl | null>(null);
  const [audioIndex, setAudioIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState(audios[0].title);
  const [isVisible, setIsVisible] = useState(false);

  // Load new audio and play when audioIndex changes
  useEffect(() => {
    if (audio instanceof Howl) {
      audio.pause();
    }

    const sound = new Howl({
      src: audios[audioIndex].src,
      html5: true,
      onend: handleNext,
    });

    setAudio(sound);
    setTitle(audios[audioIndex].title);

    if (isPlaying) {
      sound.play();
    }

    return () => {
      sound.unload();
    };
  }, [audioIndex, audios, isPlaying]);

  // Play or pause audio when isPlaying changes
  useEffect(() => {
    if (audio instanceof Howl) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  // Update global Howler volume when volume state changes
  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  // Animation effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Toggle play/pause state
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Play next track
  const handleNext = useCallback(() => {
    setAudioIndex((prev) => (prev + 1) % audios.length);
  }, [audios.length]);

  // Play previous track
  const handlePrevious = useCallback(() => {
    setAudioIndex((prev) => (prev === 0 ? audios.length - 1 : prev - 1));
  }, [audios.length]);

  // Get the title of the previous track
  const getPreviousTrackTitle = () => {
    const prevIndex = audioIndex === 0 ? audios.length - 1 : audioIndex - 1;
    return audios[prevIndex].title;
  };

  // Get the title of the next track
  const getNextTrackTitle = () => {
    const nextIndex = (audioIndex + 1) % audios.length;
    return audios[nextIndex].title;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`relative ${theme.buttonBg} bg-opacity-80 backdrop-blur-sm w-fit h-fit px-3 py-2 rounded-full flex justify-center items-center gap-2 transition-colors duration-300`}
        >
          {/* Track Name Tooltip */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -30 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-3 py-1 rounded-full text-xs whitespace-nowrap"
              >
                <span className={theme.textPrimary}>{title}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Previous Track Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={`Previous Track: ${getPreviousTrackTitle()}`}
            className={theme.textSecondary + " text-base"}
            onClick={handlePrevious}
            aria-label="Previous track"
          >
            <FaBackwardStep />
          </motion.button>

          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={`${isPlaying ? "Pause" : "Play"}: ${title}`}
            className={theme.textSecondary + " text-base"}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
          </motion.button>

          {/* Next Track Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={`Next Track: ${getNextTrackTitle()}`}
            className={theme.textSecondary + " text-base"}
            onClick={handleNext}
            aria-label="Next track"
          >
            <FaForwardStep />
          </motion.button>

          {/* Divider */}
          <span
            className={theme.accent1 + " w-[1px] h-4"}
            aria-hidden="true"
          ></span>

          {/* Volume Control */}
          <VolumePopover volume={volume} setVolume={setVolume} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Player;
