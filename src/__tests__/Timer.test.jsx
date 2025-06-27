import React from 'react';
import { render, screen } from '@testing-library/react';
import Timer from '../components/Timer';

describe('Timer Component', () => {
  test('displays workout segment with correct time', () => {
    render(<Timer seconds={20} segmentType="WORKOUT" isRepositioning={false} />);
    
    expect(screen.getByText('WORKOUT')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  test('displays rest segment with correct time', () => {
    render(<Timer seconds={10} segmentType="REST" isRepositioning={false} />);
    
    expect(screen.getByText('REST')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('shows REPOSITION text when in repositioning state', () => {
    render(<Timer seconds={3} segmentType="REST" isRepositioning={true} />);
    
    expect(screen.getByText('REPOSITION')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
