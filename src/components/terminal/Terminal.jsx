import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Terminal.css';
import { TerminalBody } from './TerminalBody';
import { TerminalHeader } from './TerminalHeader';

const Terminal = ({ setShowTerminal, showTerminal }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const inputRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const terminalRef = useRef(null);
    const [originalPosition, setOriginalPosition] = useState(null);

    useEffect(() => {
        // Center the terminal on initial load
        const centerX = (window.innerWidth - terminalRef.current.offsetWidth) / 2;
        const centerY = (window.innerHeight - terminalRef.current.offsetHeight) / 2;
        setPosition({ x: centerX, y: centerY });
    }, []);




    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setHistory([...history, input]);
            setInput('');
        }
        if (isFullScreen) {
            // Store the current position before going full screen
            if (!originalPosition) {
                setOriginalPosition(position);
            }
            // Center the terminal when entering full screen
            setPosition({ x: 0, y: 0 });
        } else if (originalPosition) {
            // Restore the original position when exiting full screen
            setPosition(originalPosition);
            setOriginalPosition(null); // Reset original position
        }
    };

    const handleFullScreenChange = (isFullScreen) => {
        setIsFullScreen(isFullScreen);
    };

    const focusInput = () => {
        inputRef.current.focus();
    };

    const handleMouseDown = (e) => {
        if (e.target.classList.contains('terminal-header')) {
            setIsDragging(true);
            const rect = terminalRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            const rect = terminalRef.current.getBoundingClientRect();

            // Ensure the terminal stays within the viewport
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        focusInput();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [showTerminal, isDragging]);

    return (
        <div
            ref={terminalRef}
            className={`terminal ${isFullScreen ? 'terminal-fullscreen' : ''}`}
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
};

export default Terminal;
