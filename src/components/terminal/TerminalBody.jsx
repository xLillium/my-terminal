import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TerminalHistory } from './TerminalHistory';
import { TerminalPrompt } from './TerminalPrompt';
import useInputChange from '../../hooks/useInputChange';


export const TerminalBody = ({ input, setInput, handleKeyPress, history, inputRef }) => {
    const endOfMessagesRef = useRef(null);
    const handleChange = useInputChange(inputRef, setInput);

    useEffect(() => {
        if (isEndOfMessagesRefCurrent(endOfMessagesRef)) {
            inputRef.current.style.height = 'inherit';
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history]);


    return (
        <div className="terminal-body">
            <TerminalHistory history={history} />
            <div ref={endOfMessagesRef} />
            <TerminalPrompt
                input={input}
                handleChange={handleChange}
                handleKeyPress={handleKeyPress}
                inputRef={inputRef}
            />
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

