import React from 'react';
import PropTypes from 'prop-types';
import { PromptLocation } from './PromptLocation';

export const TerminalHistory = ({ history }) => (
    <div className="terminal-history">
        {history.map((previousPrompt, index) => (
            <React.Fragment key={index}>
                <PromptLocation />
                <div className="input-container">
                    <span className="prompt-sign">❯</span>
                    {previousPrompt}
                </div>
            </React.Fragment>
        ))}
    </div>
);

TerminalHistory.propTypes = {
    history: PropTypes.arrayOf(PropTypes.string).isRequired,
};
