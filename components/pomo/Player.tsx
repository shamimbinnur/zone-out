"use client"

import { FC, useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import { FaBackwardStep, FaCirclePause, FaCirclePlay, FaForwardStep} from 'react-icons/fa6';

import VolumePopover from './VolumePopover';
import { AudiosType } from '@/data/pomo/bgAudio';

interface PlayerProps {
  audios: AudiosType;
}

const Player:FC <PlayerProps> = ({
  audios
}) => {
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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioIndex]);

  // Play or pause audio when isPlaying changes
  useEffect(() => {
    if (audio instanceof Howl) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    setAudioIndex(prev => (prev + 1) % audios.length);
  };

  const handlePrevious = () => {
    setAudioIndex(prev => (prev === 0 ? audios.length - 1 : prev - 1));
  };

  return (
    <div
      className="relative bg-black w-fit px-6 py-2 rounded-full flex justify-center items-center gap-2"
    >
      <button
        title={'Previous Track: '+audios[audioIndex === 0 ? audios.length - 1 : audioIndex - 1].title}
        className="text-moonlit-silver text-xl"
        onClick={handlePrevious}>
          <FaBackwardStep />
      </button>
      <button
        title={(isPlaying ? "Pause" : "Play") +  ": "+title}
        className="text-moonlit-silver text-xl"
        onClick={togglePlay}>
        {isPlaying
        ? <FaCirclePause />
        : <FaCirclePlay />}
      </button>
      <button
        title={'Next Track: '+audios[(audioIndex + 1) % audios.length].title}
        className="text-moonlit-silver text-xl"
        onClick={handleNext}>
          <FaForwardStep />
      </button>

      <VolumePopover volume={volume} setVolume={setVolume} />
    </div>
  );
};

export default Player;

