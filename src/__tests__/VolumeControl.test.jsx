import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VolumeControl from '../components/VolumeControl';

describe('VolumeControl Component', () => {
  const defaultProps = {
    volume: 0.5,
    onVolumeChange: jest.fn(),
    isMuted: false,
    onToggleMute: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders volume slider with correct value', () => {
    render(<VolumeControl {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('0.5');
  });

  test('shows mute icon when muted', () => {
    render(<VolumeControl {...defaultProps} isMuted={true} />);
    
    const muteButton = screen.getByRole('button', { name: /unmute/i });
    expect(muteButton.textContent).toBe('🔇');
  });

  test('shows correct volume icon based on volume level', () => {
    const { rerender } = render(<VolumeControl {...defaultProps} volume={0.8} />);
    let button = screen.getByRole('button');
    expect(button.textContent).toBe('🔊');

    rerender(<VolumeControl {...defaultProps} volume={0.3} />);
    button = screen.getByRole('button');
    expect(button.textContent).toBe('🔉');

    rerender(<VolumeControl {...defaultProps} volume={0} />);
    button = screen.getByRole('button');
    expect(button.textContent).toBe('🔈');
  });

  test('calls onVolumeChange when slider is adjusted', () => {
    render(<VolumeControl {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.7' } });
    
    expect(defaultProps.onVolumeChange).toHaveBeenCalledWith(0.7);
  });

  test('calls onToggleMute when mute button is clicked', () => {
    render(<VolumeControl {...defaultProps} />);
    
    const muteButton = screen.getByRole('button');
    fireEvent.click(muteButton);
    
    expect(defaultProps.onToggleMute).toHaveBeenCalled();
  });

  test('slider is disabled when muted', () => {
    render(<VolumeControl {...defaultProps} isMuted={true} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
  });
});
