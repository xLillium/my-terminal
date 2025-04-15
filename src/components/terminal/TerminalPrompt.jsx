import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PromptLocation } from './PromptLocation';
import { COMMANDS } from '../../constants/commandConstants';

export const TerminalPrompt = ({ input, handleChange, handleKeyPress, inputRef }) => {
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Update command history when a command is submitted
    useEffect(() => {
        if (input === '' && commandHistory.length > 0 && commandHistory[0] !== '') {
            setHistoryIndex(-1);
        }
    }, [input, commandHistory]);

    // Handle special key presses like tab completion and arrow navigation
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Tab':
                e.preventDefault();
                handleTabCompletion(e);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                // Navigate to older commands (up in history)
                navigateHistory(1);
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                // Navigate to newer commands (down in history)
                navigateHistory(-1);
                break;
                
            case 'Enter':
                // Add the command to history if it's not empty
                if (input.trim()) {
                    setCommandHistory(prev => [input, ...prev.slice(0, 9)]); // Keep last 10 commands
                }
                break;
                
            default:
                break;
        }
    };

    // Tab completion for commands
    const handleTabCompletion = (e) => {
        const currentInput = input.trim().toLowerCase();
        
        if (currentInput === '') return;
        
        // Find matching commands
        const matchingCommands = Object.values(COMMANDS).filter(
            cmd => cmd.startsWith(currentInput)
        );
        
        if (matchingCommands.length === 1) {
            // If exactly one match, complete the command
            handleChange({ target: { value: matchingCommands[0] } });
        }
    };

    // Navigate through command history
    const navigateHistory = (direction) => {
        if (commandHistory.length === 0) return;
        
        const newIndex = historyIndex + direction;
        
        if (newIndex >= -1 && newIndex < commandHistory.length) {
            setHistoryIndex(newIndex);
            
            if (newIndex === -1) {
                // Return to empty prompt
                handleChange({ target: { value: '' } });
            } else {
                // Set to historical command
                handleChange({ target: { value: commandHistory[newIndex] } });
            }
        }
    };

    return (
        <>
            <PromptLocation />
            <div className="input-container">
                <span className="prompt-sign">❯</span>
                <textarea
                    value={input}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    ref={inputRef}
                    autoFocus
                ></textarea>
            </div>
        </>
    );
};

TerminalPrompt.propTypes = {
    input: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
};
