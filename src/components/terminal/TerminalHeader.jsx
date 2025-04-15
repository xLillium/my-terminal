import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { URLS, MESSAGES, EVENTS } from '../../constants/terminalConstants';

export const TerminalHeader = ({ setShowTerminal, onFullScreenChange }) => {
    // Handle quit with confirmation and redirect
    const handleExitClick = () => {
        const userConfirmedQuit = window.confirm(MESSAGES.QUIT_CONFIRMATION);
        if (userConfirmedQuit) {
            window.location.href = URLS.LINKEDIN;
        }
    };

    const handleMinimizeClick = () => setShowTerminal(false);

    // Toggle fullscreen and notify parent component of state change
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            enterFullScreenMode();
        } else {
            exitFullScreenMode();
        }
    };

    // Enter fullscreen and handle errors
    const enterFullScreenMode = () => {
        document.documentElement.requestFullscreen().catch((e) => {
            console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
        });
        onFullScreenChange(true);
    };

    // Exit fullscreen if supported
    const exitFullScreenMode = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        onFullScreenChange(false);
    };

    // Sync with browser fullscreen state changes
    useEffect(() => {
        const handleFullScreenChange = () => {
            const isFullScreen = !!document.fullscreenElement;
            onFullScreenChange(isFullScreen);
        };

        document.addEventListener(EVENTS.FULLSCREEN_CHANGE, handleFullScreenChange);

        return () => {
            document.removeEventListener(EVENTS.FULLSCREEN_CHANGE, handleFullScreenChange);
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
    onFullScreenChange: PropTypes.func.isRequired,
};

