import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutControls from '../components/WorkoutControls';

describe('WorkoutControls Component', () => {
  const mockConfig = {
    id: 1,
    work: 20,
    rest: 10,
    label: '20s/10s'
  };

  const defaultProps = {
    isActive: false,
    selectedConfig: null,
    onConfigSelect: jest.fn(),
    onStartStop: jest.fn()
  };

  test('renders all configuration buttons when not active', () => {
    render(<WorkoutControls {...defaultProps} />);
    
    expect(screen.getByText('20s/10s')).toBeInTheDocument();
    expect(screen.getByText('30s/15s')).toBeInTheDocument();
    expect(screen.getByText('45s/15s')).toBeInTheDocument();
  });

  test('shows START button when not active', () => {
    render(<WorkoutControls {...defaultProps} />);
    
    expect(screen.getByText('START')).toBeInTheDocument();
  });

  test('shows STOP button when active', () => {
    render(<WorkoutControls {...defaultProps} isActive={true} />);
    
    expect(screen.getByText('STOP')).toBeInTheDocument();
  });

  test('hides configuration buttons when active', () => {
    render(<WorkoutControls {...defaultProps} isActive={true} />);
    
    expect(screen.queryByText('20s/10s')).not.toBeInTheDocument();
  });

  test('calls onConfigSelect when configuration button is clicked', () => {
    const onConfigSelect = jest.fn();
    render(<WorkoutControls {...defaultProps} onConfigSelect={onConfigSelect} />);
    
    fireEvent.click(screen.getByText('20s/10s'));
    expect(onConfigSelect).toHaveBeenCalled();
  });

  test('calls onStartStop when start/stop button is clicked', () => {
    const onStartStop = jest.fn();
    render(<WorkoutControls {...defaultProps} onStartStop={onStartStop} />);
    
    fireEvent.click(screen.getByText('START'));
    expect(onStartStop).toHaveBeenCalled();
  });
});
