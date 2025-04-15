import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Terminal from './Terminal';

describe('Terminal Component', () => {
  const mockSetShowTerminal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders terminal with header and body', () => {
    render(<Terminal setShowTerminal={mockSetShowTerminal} showTerminal={true} />);
    
    // Terminal structure should be present
    expect(screen.getByRole('button', { name: /close terminal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /minimize terminal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle fullscreen/i })).toBeInTheDocument();
  });

  test('input is focused when terminal is shown', () => {
    // Create a mock focus function
    const originalFocus = jest.fn();
    
    // We need to create a complete mock implementation to avoid direct DOM access
    jest.spyOn(HTMLElement.prototype, 'focus').mockImplementation(originalFocus);
    
    const { rerender } = render(
      <Terminal setShowTerminal={mockSetShowTerminal} showTerminal={false} />
    );
    
    // Rerender with showTerminal=true 
    rerender(<Terminal setShowTerminal={mockSetShowTerminal} showTerminal={true} />);
    
    // Input focus should have been called
    expect(originalFocus).toHaveBeenCalled();
    
    // Clean up mock
    HTMLElement.prototype.focus.mockRestore();
  });

  test('clicking minimize button calls setShowTerminal with false', () => {
    render(<Terminal setShowTerminal={mockSetShowTerminal} showTerminal={true} />);
    
    const minimizeButton = screen.getByRole('button', { name: /minimize terminal/i });
    fireEvent.click(minimizeButton);
    
    expect(mockSetShowTerminal).toHaveBeenCalledWith(false);
  });
}); 