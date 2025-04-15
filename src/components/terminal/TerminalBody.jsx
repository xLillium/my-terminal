import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TerminalHistory } from './TerminalHistory';
import { TerminalPrompt } from './TerminalPrompt';
import useInputChange from '../../hooks/useInputChange';
import { TERMINAL_BEHAVIOR } from '../../constants/terminalConstants';

/**
 * Terminal body component that renders command history and input
 */
export const TerminalBody = ({ input, setInput, handleKeyPress, history, inputRef }) => {
    const endOfMessagesRef = useRef(null);
    const handleChange = useInputChange(inputRef, setInput);

    // Check if the end of messages ref is defined
    const isEndOfMessagesRefDefined = useCallback(() => {
        return endOfMessagesRef && endOfMessagesRef.current;
    }, [endOfMessagesRef]);

    // Reset input field height to prevent growing too large
    const resetInputHeight = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'inherit';
        }
    }, [inputRef]);

    // Scroll to the bottom of the terminal
    const scrollToBottom = useCallback(() => {
        if (!isEndOfMessagesRefDefined()) return;
        
        resetInputHeight();
        endOfMessagesRef.current.scrollIntoView({ 
            behavior: TERMINAL_BEHAVIOR.SCROLL_BEHAVIOR 
        });
    }, [isEndOfMessagesRefDefined, resetInputHeight, endOfMessagesRef]);

    // Auto-scroll to the bottom when history updates
    useEffect(() => {
        scrollToBottom();
    }, [history, scrollToBottom]);

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
};

TerminalBody.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    history: PropTypes.arrayOf(PropTypes.string).isRequired,
    inputRef: PropTypes.object.isRequired,
};

