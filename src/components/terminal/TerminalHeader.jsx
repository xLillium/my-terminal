import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const TerminalHeader = ({ setShowTerminal, onFullScreenChange }) => {
    const handleExitClick = () => {
        const userConfirmedQuit = window.confirm("Are you sure you want to quit?");
        if (userConfirmedQuit) {
            window.location.href = 'https://www.linkedin.com/in/nicolas-motillon/';
        }
    };

    const handleMinimizeClick = () => setShowTerminal(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
            });
            onFullScreenChange(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            onFullScreenChange(false);
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            const isFullScreen = !!document.fullscreenElement;
            onFullScreenChange(isFullScreen);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };

    }, [onFullScreenChange]);


    return (
        <div className="terminal-header">
            <button className="terminal-button red" onClick={handleExitClick} title="Close Terminal" aria-label="Close Terminal"></button>
            <button className="terminal-button yellow" onClick={handleMinimizeClick} title="Minimize Terminal" aria-label="Minimize Terminal"></button>
            <button className="terminal-button green" onClick={toggleFullScreen} title="Toggle Fullscreen" aria-label="Toggle Fullscreen"></button>
        </div>
    );
};

TerminalHeader.propTypes = {
    setShowTerminal: PropTypes.func.isRequired,
    onFullScreenChange: PropTypes.func.isRequired, // Add this line
};

