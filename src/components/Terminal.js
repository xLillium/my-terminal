import React, { useEffect, useRef, useState } from 'react';
import './Terminal.css';

const Terminal = ({ setShowTerminal }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const inputRef = useRef(null);

    const handleExitClick = () => {
        const userConfirmed = window.confirm("Are you sure you want to quit?");
        if (userConfirmed) {
            window.location.href = 'https://www.linkedin.com/in/nicolas-motillon/';
        }
    };

    const handleMinimizeClick = () => {
        setShowTerminal(false);
    };

    const handleFullScreenClick = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setHistory([...history, input]);
            setInput('');
        }
    };

    const focusInput = () => {
        inputRef.current.focus();
    };

    useEffect(() => {
        focusInput();
    }, []);

    const terminalClassName = isFullScreen ? "terminal terminal-fullscreen" : "terminal";

    return (
        <div className={terminalClassName} onClick={focusInput}>
            <div className="terminal-header">
                <button className="terminal-button red" onClick={handleExitClick} title="Close Terminal" aria-label="Close Terminal"></button>
                <button className="terminal-button yellow" onClick={handleMinimizeClick} title="Minimize Terminal" aria-label="Minimize Terminal"></button>
                <button className="terminal-button green" onClick={handleFullScreenClick} title="Toggle Fullscreen" aria-label="Toggle Fullscreen"></button>
            </div>
            <div className="terminal-body">
                {history.map((line, index) => (
                    <div key={index}>$ {line}</div>
                ))}
                <div>
                    $ <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="terminal-input"
                        ref={inputRef}
                        style={{ background: 'transparent' }}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
