import React from 'react';

const WORKOUT_CONFIGS = [
  { id: 1, work: 20, rest: 10, label: '20s/10s' },
  { id: 2, work: 30, rest: 15, label: '30s/15s' },
  { id: 3, work: 45, rest: 15, label: '45s/15s' },
];

const WorkoutControls = ({ 
  isActive, 
  selectedConfig, 
  onConfigSelect, 
  onStartStop 
}) => {
  return (
    <div>
      {!isActive && (
        <div className="config-controls">
          {WORKOUT_CONFIGS.map((config) => (
            <button
              key={config.id}
              className={`config-button ${selectedConfig?.id === config.id ? 'active' : ''}`}
              onClick={() => onConfigSelect(config)}
            >
              {config.label}
            </button>
          ))}
        </div>
      )}
      <button 
        className={`control-button ${isActive ? 'stop' : ''}`}
        onClick={onStartStop}
      >
        {isActive ? 'STOP' : 'START'}
      </button>
    </div>
  );
};

export default WorkoutControls;
