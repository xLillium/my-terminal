import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


export const TerminalBody = ({ input, setInput, handleKeyPress, history, inputRef }) => {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        if (isEndOfMessagesRefCurrent(endOfMessagesRef)) {
            inputRef.current.style.height = 'inherit';
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history]);

    const handleChange = (e) => {
        setInput(e.target.value);
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        inputRef.current.rows = 1;
    };

    return (
        <div className="terminal-body">
            <div className="terminal-history">
                {history.map((previousPrompt, index) => (
                    <>
                        <div className="current-location">
                            ~/home
                        </div>
                        <div key={index} className="input-container">
                            <span className="prompt-sign">❯</span>
                            {previousPrompt}
                        </div>
                    </>
                ))}
            </div>
            <div ref={endOfMessagesRef} />
            <div className="current-location">
                ~/home
            </div>
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
        </div>
    );
}

TerminalBody.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    history: PropTypes.arrayOf(PropTypes.string).isRequired,
    inputRef: PropTypes.object.isRequired,
};

function isEndOfMessagesRefCurrent(endOfMessagesRef) {
    return endOfMessagesRef.current;
}

