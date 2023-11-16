import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ setShowTerminal }) => {
    const handleOpenTerminal = () => {
        setShowTerminal(true);
    };

    return (
        <div className="welcome-screen">
            <h1>Welcome to my website</h1>
            <button className="open-terminal-btn" onClick={handleOpenTerminal}>🤖 Open Terminal</button>
        </div>
    );
};

export default WelcomeScreen;
