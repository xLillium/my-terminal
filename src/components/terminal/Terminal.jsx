import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Terminal.css';
import { TerminalBody } from './TerminalBody';
import { TerminalHeader } from './TerminalHeader';
import { useDraggable } from '../../hooks/useDraggable';

const Terminal = ({ setShowTerminal, showTerminal }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const inputRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const terminalRef = useRef(null);
    const [originalPosition, setOriginalPosition] = useState(null);

    const { position, setPosition, isDragging, handleMouseDown } = useDraggable({ x: 0, y: 0 }, terminalRef);

    useEffect(() => {
        const centerX = (window.innerWidth - terminalRef.current.offsetWidth) / 2;
        const centerY = (window.innerHeight - terminalRef.current.offsetHeight) / 2;
        setPosition({ x: centerX, y: centerY });
    }, [setPosition]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setHistory([...history, input]);
            setInput('');
        }
    };

    const handleFullScreenChange = (isFullScreen) => {
        if (isFullScreen) {
            if (!originalPosition) {
                setOriginalPosition(position);
            }
            setPosition({ x: 0, y: 0 });
        } else if (originalPosition) {
            setPosition(originalPosition);
            setOriginalPosition(null);
        }
        setIsFullScreen(isFullScreen);
    };

    const focusInput = () => {
        inputRef.current.focus();
    };

    useEffect(() => {
        focusInput();
    }, [showTerminal]);

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
