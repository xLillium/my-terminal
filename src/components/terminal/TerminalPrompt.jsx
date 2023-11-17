import React from 'react';
import PropTypes from 'prop-types';
import { PromptLocation } from './PromptLocation';

export const TerminalPrompt = ({ input, handleChange, handleKeyPress, inputRef }) => (
    <>
        <PromptLocation />
        <div className="input-container">
            <span className="prompt-sign">❯</span>
            <textarea
                value={input}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="terminal-input"
                ref={inputRef}
                autoFocus
            ></textarea>
        </div>
    </>
);

TerminalPrompt.propTypes = {
    input: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
};
