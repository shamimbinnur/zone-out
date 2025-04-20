/**
 * Types of sounds that can be played by the application
 */
export type SoundType = "HEADS-UP" | "SILENCE";

/**
 * Sound paths mapped by sound type
 */
const SOUND_PATHS: Record<SoundType, string> = {
  "HEADS-UP": "/audio/heads-up.mp3",
  SILENCE: "/audio/heads-up.mp3", // Using same file but will be muted
};

/**
 * Audio cache to prevent creating multiple instances of the same audio
 */
const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * Plays a sound of the specified type
 *
 * @param soundType - Type of sound to play
 * @returns void
 */
export const makeSound = (soundType: SoundType): void => {
  // Get the path for the specified sound type
  const soundPath = SOUND_PATHS[soundType];

  // Create or retrieve cached audio instance
  if (!audioCache[soundPath]) {
    audioCache[soundPath] = new Audio(soundPath);
  }

  const audio = audioCache[soundPath];

  // Reset audio to beginning
  audio.currentTime = 0;

  // Apply muting for SILENCE type
  audio.muted = soundType === "SILENCE";

  // Play the sound
  audio.play().catch((error) => {
    // Handle autoplay restrictions gracefully
    console.warn(`Failed to play sound: ${error.message}`);
  });
};

/**
 * Preloads all sounds to avoid delays when they're first played
 */
export const preloadSounds = (): void => {
  Object.values(SOUND_PATHS).forEach((path) => {
    if (!audioCache[path]) {
      const audio = new Audio(path);
      audio.preload = "auto";
      audioCache[path] = audio;
    }
  });
};

/**
 * Stops all currently playing sounds
 */
export const stopAllSounds = (): void => {
  Object.values(audioCache).forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
};
