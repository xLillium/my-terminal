import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Terminal.css';
import { TerminalBody } from './TerminalBody';
import { TerminalHeader } from './TerminalHeader';
import { useDraggable } from '../../hooks/useDraggable';
import { TERMINAL_POSITION, CSS_CLASSES } from '../../constants/terminalConstants';
import { processCommand, formatCommandResponse } from '../../services/commandService';

const Terminal = ({ setShowTerminal, showTerminal }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const inputRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const terminalRef = useRef(null);
    const [originalPosition, setOriginalPosition] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const { position, setPosition, isDragging, handleMouseDown } = useDraggable(TERMINAL_POSITION.INITIAL, terminalRef);

    // Helper function to center the terminal in the viewport
    const centerTerminal = useCallback(() => {
        if (!terminalRef.current) return;
        
        const centerX = (window.innerWidth - terminalRef.current.offsetWidth) / 2;
        const centerY = (window.innerHeight - terminalRef.current.offsetHeight) / 2;
        setPosition({ x: centerX, y: centerY });
    }, [terminalRef, setPosition]);

    // Center the terminal in the viewport on initial render
    useEffect(() => {
        centerTerminal();
    }, [centerTerminal]);

    // Update the welcome message
    useEffect(() => {
        if (!isInitialized && showTerminal) {
            const welcomeMessage = `
Welcome to Nicolas Motillon's Terminal Portfolio!
==============================================

This interactive terminal allows you to explore my background, 
skills, and experience using simple commands.

Type 'help' to see available commands.
Use ↑/↓ arrows to navigate command history.
Press Tab to autocomplete commands.

Start by typing 'about' to learn more about me.
            `.trim();
            
            setHistory([welcomeMessage]);
            setIsInitialized(true);
        }
    }, [showTerminal, isInitialized]);

    // Handle terminal input submission
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Process the submitted command
            if (input.trim()) {
                const result = processCommand(input, setHistory, setShowTerminal);
                
                if (!result.shouldClear) {
                    // Only add to history if not clearing
                    setHistory(prevHistory => [
                        ...prevHistory, 
                        formatCommandResponse(input, result.text)
                    ]);
                }
            }
            
            setInput('');
        }
    };

    // Save position before fullscreen and restore after exiting
    const handleFullScreenChange = (isFullScreen) => {
        if (isFullScreen) {
            saveOriginalPosition();
            setPosition({ x: 0, y: 0 });
        } else {
            restoreOriginalPosition();
        }
        setIsFullScreen(isFullScreen);
    };

    const focusInput = () => {
        inputRef.current.focus();
    };

    // Focus input field whenever terminal is shown
    useEffect(() => {
        focusInput();
    }, [showTerminal]);

    // Save current position before going fullscreen
    const saveOriginalPosition = () => {
        if (!originalPosition) {
            setOriginalPosition(position);
        }
    };

    // Restore original position after exiting fullscreen
    const restoreOriginalPosition = () => {
        if (originalPosition) {
            setPosition(originalPosition);
            setOriginalPosition(null);
        }
    };

    return (
        <div
            ref={terminalRef}
            className={`terminal ${isFullScreen ? CSS_CLASSES.TERMINAL_FULLSCREEN : ''}`}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'auto'
            }}
            onClick={focusInput}
            onMouseDown={handleMouseDown}
        >
            <TerminalHeader setShowTerminal={setShowTerminal} onFullScreenChange={handleFullScreenChange} />
            <TerminalBody input={input} setInput={setInput} handleKeyPress={handleKeyPress} history={history} inputRef={inputRef} />
        </div>
    );
};

Terminal.propTypes = {
    setShowTerminal: PropTypes.func.isRequired,
    showTerminal: PropTypes.bool.isRequired,
};

export default Terminal;
