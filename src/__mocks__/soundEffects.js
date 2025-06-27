// Mock implementation of sound effects
const playStartSound = jest.fn();
const playStopSound = jest.fn();
const playWorkoutTransitionSound = jest.fn();
const playRestTransitionSound = jest.fn();
const playRepositionSound = jest.fn();
const playCountdownBeep = jest.fn();
const initializeAudio = jest.fn();
const setVolume = jest.fn();
const setMuted = jest.fn();
const getVolume = jest.fn().mockReturnValue(0.5);
const getMuted = jest.fn().mockReturnValue(false);

export {
  playStartSound,
  playStopSound,
  playWorkoutTransitionSound,
  playRestTransitionSound,
  playRepositionSound,
  playCountdownBeep,
  initializeAudio,
  setVolume,
  setMuted,
  getVolume,
  getMuted
};
