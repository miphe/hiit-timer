import React from 'react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const ElapsedTime = ({ seconds }) => {
  return (
    <div className="elapsed-time">
      Total Time: {formatTime(seconds)}
    </div>
  );
};

export default ElapsedTime;
