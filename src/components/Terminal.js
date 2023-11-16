import React, { useState } from 'react';
import './Terminal.css';

const Terminal = ({ setShowTerminal }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

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

    const terminalClassName = isFullScreen ? "terminal terminal-fullscreen" : "terminal";

    return (
        <div className={terminalClassName}>
            <div className="terminal-header">
                <button className="terminal-button red" onClick={handleExitClick} title="Close Terminal" aria-label="Close Terminal"></button>
                <button className="terminal-button yellow" onClick={handleMinimizeClick} title="Minimize Terminal" aria-label="Minimize Terminal"></button>
                <button className="terminal-button green" onClick={handleFullScreenClick} title="Toggle Fullscreen" aria-label="Toggle Fullscreen"></button>
            </div>
            <div className="terminal-body">
                $ <span className="blinking-cursor">|</span>
            </div>
        </div>
    );
};

export default Terminal;
