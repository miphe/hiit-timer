import React from 'react';
import { render, screen } from '@testing-library/react';
import ElapsedTime from '../components/ElapsedTime';

describe('ElapsedTime Component', () => {
  test('formats time correctly for seconds under a minute', () => {
    render(<ElapsedTime seconds={45} />);
    expect(screen.getByText('Total Time: 00:45')).toBeInTheDocument();
  });

  test('formats time correctly for minutes and seconds', () => {
    render(<ElapsedTime seconds={125} />);
    expect(screen.getByText('Total Time: 02:05')).toBeInTheDocument();
  });

  test('formats time correctly for zero seconds', () => {
    render(<ElapsedTime seconds={0} />);
    expect(screen.getByText('Total Time: 00:00')).toBeInTheDocument();
  });

  test('handles large numbers of seconds', () => {
    render(<ElapsedTime seconds={3661} />);  // 1 hour, 1 minute, 1 second
    expect(screen.getByText('Total Time: 61:01')).toBeInTheDocument();
  });
});
