"use client";

import { FC, useEffect, useState, useCallback } from "react";
import { Howl, Howler } from "howler";
import {
  FaBackwardStep,
  FaCirclePause,
  FaCirclePlay,
  FaForwardStep,
} from "react-icons/fa6";

import VolumePopover from "./VolumePopover";
import { AudiosType } from "@/data/pomo/bgAudio";

interface PlayerProps {
  audios: AudiosType;
}

const Player: FC<PlayerProps> = ({ audios }) => {
  const [audio, setAudio] = useState<Howl | null>(null);
  const [audioIndex, setAudioIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState(audios[0].title);

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
    <div className="relative bg-shadowy-forest bg-opacity-80 w-fit h-fit px-3 py-2 rounded-full flex justify-center items-center gap-2">
      {/* Previous Track Button */}
      <button
        title={`Previous Track: ${getPreviousTrackTitle()}`}
        className="text-moonlit-silver text-base"
        onClick={handlePrevious}
        aria-label="Previous track"
      >
        <FaBackwardStep />
      </button>

      {/* Play/Pause Button */}
      <button
        title={`${isPlaying ? "Pause" : "Play"}: ${title}`}
        className="text-moonlit-silver text-base"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
      </button>

      {/* Next Track Button */}
      <button
        title={`Next Track: ${getNextTrackTitle()}`}
        className="text-moonlit-silver text-base"
        onClick={handleNext}
        aria-label="Next track"
      >
        <FaForwardStep />
      </button>

      {/* Divider */}
      <span className="bg-moonlit-silver w-[1px] h-4" aria-hidden="true"></span>

      {/* Volume Control */}
      <VolumePopover volume={volume} setVolume={setVolume} />
    </div>
  );
};

export default Player;
