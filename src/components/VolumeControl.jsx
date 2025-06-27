import React from "react";

const VolumeControl = ({ volume, onVolumeChange, isMuted, onToggleMute }) => {
  return (
    <div className="volume-control">
      <button
        className="volume-button"
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? "🔇" : volume > 0.5 ? "🔊" : volume > 0 ? "🔉" : "🔈"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="volume-slider"
        disabled={isMuted}
      />
    </div>
  );
};

export default VolumeControl;
