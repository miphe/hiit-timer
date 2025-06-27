import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import WorkoutControls from "./components/WorkoutControls";
import ElapsedTime from "./components/ElapsedTime";
import VolumeControl from "./components/VolumeControl";
import {
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
  getMuted,
} from "./utils/soundEffects";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [currentSegment, setCurrentSegment] = useState("WORKOUT");
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRepositioning, setIsRepositioning] = useState(false);
  const [volume, setVolumeState] = useState(getVolume());
  const [isMuted, setIsMutedState] = useState(getMuted());

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            // Switch segments when timer reaches 0
            const newSegment =
              currentSegment === "WORKOUT" ? "REST" : "WORKOUT";
            setCurrentSegment(newSegment);
            setIsRepositioning(false);

            // Play transition sounds
            if (newSegment === "WORKOUT") {
              playWorkoutTransitionSound();
            } else {
              playRestTransitionSound();
            }

            return newSegment === "WORKOUT"
              ? selectedConfig.work
              : selectedConfig.rest;
          }

          // Update repositioning state and play sound
          // Calculate reposition trigger: show reposition at 3 seconds remaining or half the rest time, whichever is smaller
          const repositionTrigger =
            currentSegment === "REST"
              ? Math.min(3, Math.floor(selectedConfig.rest / 2))
              : 0;
          const shouldReposition =
            currentSegment === "REST" &&
            prevTime === repositionTrigger &&
            !isRepositioning;
          if (shouldReposition) {
            setIsRepositioning(true);
            playRepositionSound();
          }

          // Play countdown beeps for last 3 seconds
          if (prevTime <= 3 && prevTime > 0) {
            playCountdownBeep();
          }

          return prevTime - 1;
        });

        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, currentSegment, selectedConfig, isRepositioning]);

  const handleVolumeChange = (newVolume) => {
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMutedState(newMutedState);
    setMuted(newMutedState);
  };

  const handleConfigSelect = (config) => {
    setSelectedConfig(config);
    setTimeLeft(config.work);
  };

  const handleStartStop = () => {
    try {
      initializeAudio();
    } catch (error) {
      console.warn("Audio initialization failed:", error);
    }

    if (!isActive && !selectedConfig) {
      handleConfigSelect({
        id: 1,
        work: 20,
        rest: 10,
        label: "20s/10s",
      });
    }

    if (isActive) {
      // Stop
      try {
        playStopSound();
      } catch (error) {
        console.warn("Failed to play stop sound:", error);
      }
      setIsActive(false);
      setCurrentSegment("WORKOUT");
      setTimeLeft(selectedConfig?.work || 20);
      setElapsedTime(0);
      setIsRepositioning(false);
    } else {
      // Start
      try {
        playStartSound();
      } catch (error) {
        console.warn("Failed to play start sound:", error);
      }
      setIsActive(true);
    }
  };

  const getBackgroundClass = () => {
    if (!isActive) return "initial-state";
    if (isRepositioning) return "reposition-state";
    return currentSegment === "WORKOUT" ? "workout-state" : "rest-state";
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="top-controls">
        {isActive && <ElapsedTime seconds={elapsedTime} />}
        <VolumeControl
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      </div>

      {isActive ? (
        <Timer
          seconds={timeLeft}
          segmentType={currentSegment}
          isRepositioning={isRepositioning}
        />
      ) : (
        <h1>HIIT Timer</h1>
      )}

      <WorkoutControls
        isActive={isActive}
        selectedConfig={selectedConfig}
        onConfigSelect={handleConfigSelect}
        onStartStop={handleStartStop}
      />
    </div>
  );
};

export default App;
