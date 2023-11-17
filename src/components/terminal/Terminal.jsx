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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setHistory([...history, input]);
            setInput('');
        }
    };

    const handleFullScreenChange = (isFullScreen) => {
        setIsFullScreen(isFullScreen);
    };

    const focusInput = () => {
        inputRef.current.focus();
    };

    useEffect(() => {
        focusInput();
    }, [showTerminal]);

    return (
        <div className={`terminal ${isFullScreen ? 'terminal-fullscreen' : ''}`} onClick={focusInput}>
            <TerminalHeader setShowTerminal={setShowTerminal} onFullScreenChange={handleFullScreenChange} />
            <TerminalBody input={input} setInput={setInput} handleKeyPress={handleKeyPress} history={history} inputRef={inputRef} />
        </div>
    );
};

Terminal.propTypes = {
    setShowTerminal: PropTypes.func.isRequired,
};

export default Terminal;
