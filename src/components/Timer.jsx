import React from 'react';

const Timer = ({ seconds, segmentType, isRepositioning }) => {
  // Determine what text to display based on the current state
  const displayType = isRepositioning ? 'REPOSITION' : segmentType;
  
  return (
    <div className="timer-container">
      <div className="segment-label">
        {displayType}
      </div>
      <div className="timer-display">
        {seconds}
      </div>
    </div>
  );
};

export default Timer;
