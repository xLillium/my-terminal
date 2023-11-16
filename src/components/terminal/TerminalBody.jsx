import React from 'react';
import PropTypes from 'prop-types';

export const TerminalBody = ({ input, setInput, handleKeyPress, history, inputRef }) => (
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
);

TerminalBody.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    history: PropTypes.arrayOf(PropTypes.string).isRequired,
    inputRef: PropTypes.object.isRequired,
};

