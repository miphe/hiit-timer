// Audio Context singleton
let audioContext = null;
let globalVolume = 0.5;
let isMuted = false;
let audioSupported = true;

const getAudioContext = () => {
  if (!audioSupported) {
    throw new Error("Audio not supported");
  }

  if (!audioContext) {
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        audioSupported = false;
        throw new Error("Web Audio API not supported");
      }
      audioContext = new AudioContextClass();
    } catch (error) {
      audioSupported = false;
      console.warn("Failed to create audio context:", error);
      throw error;
    }
  }
  return audioContext;
};

// Get effective volume considering mute state
const getEffectiveVolume = (baseVolume = 1) => {
  if (isMuted) return 0;
  return baseVolume * globalVolume;
};

// Utility function to create a beep sound
const createBeep = (frequency, duration, volume = 1) => {
  if (!audioSupported) {
    return;
  }

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    const effectiveVolume = getEffectiveVolume(volume);
    gainNode.gain.value = effectiveVolume;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Smooth volume transitions
    gainNode.gain.setValueAtTime(effectiveVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      ctx.currentTime + duration,
    );

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn("Failed to create beep sound:", error);
  }
};

// Exported volume control functions
export const setVolume = (volume) => {
  globalVolume = volume;
};

export const setMuted = (muted) => {
  isMuted = muted;
};

export const getVolume = () => globalVolume;
export const getMuted = () => isMuted;

// Sound effect functions
export const playStartSound = () => {
  createBeep(880, 0.15, 0.5);
  setTimeout(() => createBeep(1760, 0.15, 0.5), 200);
};

export const playStopSound = () => {
  createBeep(440, 0.15, 0.5);
  setTimeout(() => createBeep(220, 0.15, 0.5), 200);
};

export const playWorkoutTransitionSound = () => {
  createBeep(660, 0.1, 0.5);
  setTimeout(() => createBeep(880, 0.1, 0.5), 100);
};

export const playRestTransitionSound = () => {
  createBeep(440, 0.1, 0.5);
  setTimeout(() => createBeep(330, 0.1, 0.5), 100);
};

export const playRepositionSound = () => {
  createBeep(550, 0.1, 0.3);
};

export const playCountdownBeep = () => {
  createBeep(440, 0.05, 0.3);
};

// Initialize audio context on first user interaction
export const initializeAudio = () => {
  if (!audioSupported) {
    return;
  }

  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
  } catch (error) {
    console.warn("Failed to initialize audio:", error);
  }
};
