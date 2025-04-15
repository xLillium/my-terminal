import React from 'react';
import PropTypes from 'prop-types';
import { PromptLocation } from './PromptLocation';
import { COMMANDS } from '../../constants/commandConstants';

/**
 * Determines the CSS class for response styling based on the command or content
 * @param {string} command - The command that was executed
 * @param {string} response - The response content
 * @returns {string} - CSS class name for styling
 */
const getResponseClass = (command, response) => {
    // Default response class
    let responseClass = '';
    
    // Convert command to lowercase for comparison
    const lowercaseCommand = command.trim().toLowerCase();
    
    // Check for error message
    if (response.includes('Command not found:')) {
        return 'response-error';
    }
    
    // Check for welcome message
    if (response.includes('Welcome to Nicolas')) {
        return 'response-welcome';
    }
    
    // Match command to corresponding class
    switch (lowercaseCommand) {
        case COMMANDS.HELP:
            responseClass = 'response-help';
            break;
        case COMMANDS.ABOUT:
            responseClass = 'response-about';
            break;
        case COMMANDS.SKILLS:
            responseClass = 'response-skills';
            break;
        case COMMANDS.EXPERIENCE:
            responseClass = 'response-experience';
            break;
        case COMMANDS.EDUCATION:
            responseClass = 'response-education';
            break;
        case COMMANDS.CONTACT:
            responseClass = 'response-contact';
            break;
        default:
            responseClass = '';
    }
    
    return responseClass;
};

/**
 * Enhances skill section with colored formatting
 * @param {string} text - The skills text to format
 * @returns {React.ReactNode} - Enhanced text with color formatting
 */
const enhanceSkillsOutput = (text) => {
    return (
        <pre>
            {text.split('\n').map((line, idx) => {
                if (line.trim() === 'Technical Skills:') {
                    return <div key={idx} className="section-title">{line}</div>;
                }
                
                if (line.trim().startsWith('•')) {
                    const [category, skills] = line.split(':');
                    if (skills) {
                        return (
                            <div key={idx}>
                                <span className="skill-category">{category}:</span>
                                {skills.split(',').map((skill, i) => (
                                    <span key={i} className="skill-item">{skill}{i < skills.split(',').length - 1 ? ',' : ''}</span>
                                ))}
                            </div>
                        );
                    }
                }
                
                return <div key={idx}>{line}</div>;
            })}
        </pre>
    );
};

/**
 * Enhances experience and education with colored formatting
 * @param {string} text - The experience or education text to format
 * @param {boolean} isExperience - Whether this is experience or education content
 * @returns {React.ReactNode} - Enhanced text with color formatting
 */
const enhanceExperienceOrEducation = (text, isExperience) => {
    const sectionClass = isExperience ? 'experience-section' : 'education-section';
    const titleClass = isExperience ? 'job-title' : 'degree-title';
    const placeClass = isExperience ? 'company-name' : 'school-name';
    
    return (
        <pre>
            {text.split('\n').map((line, idx) => {
                // Format section title
                if (line.trim() === (isExperience ? 'Work Experience:' : 'Education:')) {
                    return <div key={idx} className={`section-title ${sectionClass}-title`}>{line}</div>;
                }
                
                // Format position/degree | company/school | dates
                if (line.includes(' | ')) {
                    const parts = line.split(' | ');
                    return (
                        <div key={idx} className="title-line">
                            <span className={titleClass}>{parts[0]}</span>
                            <span className="separator"> | </span>
                            <span className={placeClass}>{parts[1]}</span>
                            {parts[2] && (
                                <>
                                    <span className="separator"> | </span>
                                    <span className="time-period">{parts[2]}</span>
                                </>
                            )}
                        </div>
                    );
                }
                
                // Format bullet points
                if (line.trim().startsWith('•')) {
                    return (
                        <div key={idx} className="bullet-point">
                            <span className="bullet">•</span>
                            <span className="description">{line.substring(1)}</span>
                        </div>
                    );
                }
                
                // Return empty lines and other content as is
                return <div key={idx}>{line}</div>;
            })}
        </pre>
    );
};

/**
 * Enhances the about me section with colored formatting
 * @param {string} text - The about text to format
 * @returns {React.ReactNode} - Enhanced text with color formatting
 */
const enhanceAboutOutput = (text) => {
    return (
        <pre>
            {text.split('\n').map((line, idx) => {
                // Format first line differently
                if (idx === 1 && line.includes("I'm Nicolas")) {
                    const parts = line.split("I'm ");
                    return (
                        <div key={idx} className="about-intro">
                            {parts[0]}I'm <span className="highlight-name">Nicolas Motillon</span>
                            <span className="about-description">{line.substring(parts[0].length + "I'm Nicolas Motillon".length)}</span>
                        </div>
                    );
                }
                
                // Format keywords in other paragraphs
                if (line.includes("solving") || line.includes("creating")) {
                    return (
                        <div key={idx} className="about-paragraph">
                            {line.split(/\b(solving|creating)\b/).map((part, i) => 
                                part.match(/\b(solving|creating)\b/) ? 
                                <span key={i} className="highlight-keyword">{part}</span> : 
                                <span key={i}>{part}</span>
                            )}
                        </div>
                    );
                }
                
                return <div key={idx} className="about-paragraph">{line}</div>;
            })}
        </pre>
    );
};

/**
 * Enhances contact information with colored formatting
 * @param {string} text - The contact text to format
 * @returns {React.ReactNode} - Enhanced text with color formatting
 */
const enhanceContactOutput = (text) => {
    return (
        <pre>
            {text.split('\n').map((line, idx) => {
                // Format section title
                if (line.trim() === 'Contact Information:') {
                    return <div key={idx} className="section-title contact-title">{line}</div>;
                }
                
                // Format contact methods with icons and links
                if (line.trim().startsWith('•')) {
                    const [method, value] = line.substring(1).split(':').map(part => part.trim());
                    
                    return (
                        <div key={idx} className="contact-line">
                            <span className="contact-method">{method}:</span>
                            <span className="contact-value">{value}</span>
                        </div>
                    );
                }
                
                return <div key={idx}>{line}</div>;
            })}
        </pre>
    );
};

/**
 * Enhances command output with syntax highlighting
 * @param {string} text - The response text to enhance
 * @param {string} command - The command that generated this output
 * @returns {React.ReactNode} - Enhanced text with spans for highlighting
 */
const enhanceCommandOutput = (text, command) => {
    // Welcome message
    if (text.includes('Welcome to Nicolas')) {
        return (
            <pre>
                {text.split('\n').map((line, idx) => {
                    if (line.includes('Welcome to Nicolas')) {
                        return (
                            <div key={idx} className="welcome-title">
                                Welcome to <span className="welcome-name">Nicolas Motillon's</span> Terminal Portfolio!
                            </div>
                        );
                    }
                    
                    if (line.startsWith('=====')) {
                        return <div key={idx} className="welcome-divider">{line}</div>;
                    }
                    
                    if (line.includes('interactive terminal')) {
                        return <div key={idx} className="welcome-description">{line}</div>;
                    }
                    
                    if (line.trim().startsWith('Type') || line.trim().startsWith('Use') || line.trim().startsWith('Press')) {
                        // Highlight commands and keys
                        return (
                            <div key={idx} className="welcome-instruction">
                                {line.split(/'([^']+)'/).map((part, i) => 
                                    i % 2 === 1 ? 
                                    <span key={i} className="highlight-command">{part}</span> : 
                                    <span key={i}>{part}</span>
                                )}
                            </div>
                        );
                    }
                    
                    if (line.includes('Start by typing')) {
                        return (
                            <div key={idx} className="welcome-tip">
                                Start by typing <span className="highlight-command">'about'</span> to learn more about me.
                            </div>
                        );
                    }
                    
                    return <div key={idx}>{line}</div>;
                })}
            </pre>
        );
    }
    
    // 'help' command
    if (text.includes('Available Commands:') || command === COMMANDS.HELP) {
        return (
            <pre>
                {text.split('\n').map((line, idx) => {
                    if (idx === 0) return <div key={idx} className="help-title">{line}</div>;
                    
                    if (line.includes(' - ')) {
                        const [cmd, description] = line.split(' - ');
                        return (
                            <div key={idx} className="help-command-line">
                                <span className="highlight-command">{cmd}</span>
                                <span className="help-separator"> - </span>
                                <span className="help-description">{description}</span>
                            </div>
                        );
                    }
                    
                    return <div key={idx}>{line}</div>;
                })}
            </pre>
        );
    }
    
    // Error messages
    if (text.includes('Command not found:')) {
        const parts = text.split(':');
        return (
            <pre>
                <div className="error-message">
                    {parts[0]}:
                    <span className="error-command">{parts[1].split('.')[0]}</span>.
                    <span className="error-help"> Type 'help' to see available commands.</span>
                </div>
            </pre>
        );
    }
    
    // Skills command
    if (command === COMMANDS.SKILLS) {
        return enhanceSkillsOutput(text);
    }
    
    // Experience command
    if (command === COMMANDS.EXPERIENCE) {
        return enhanceExperienceOrEducation(text, true);
    }
    
    // Education command
    if (command === COMMANDS.EDUCATION) {
        return enhanceExperienceOrEducation(text, false);
    }
    
    // About command
    if (command === COMMANDS.ABOUT) {
        return enhanceAboutOutput(text);
    }
    
    // Contact command
    if (command === COMMANDS.CONTACT) {
        return enhanceContactOutput(text);
    }
    
    // Default just return the text
    return <pre>{text}</pre>;
};

/**
 * Renders the history of commands and their responses
 */
export const TerminalHistory = ({ history }) => (
    <div className="terminal-history">
        {history.map((entry, index) => {
            // Check if this is a formatted response with command prompt and response
            const isFormatted = entry.startsWith('$ ');
            
            if (isFormatted) {
                const lines = entry.split('\n');
                const command = lines[0].substring(2); // Remove the '$ ' prefix
                const response = lines.slice(1).join('\n');
                const responseClass = getResponseClass(command, response);
                
                return (
                    <div key={index} className="command-entry">
                        <div className="command-line">
                            <PromptLocation />
                            <div className="input-container">
                                <span className="prompt-sign">❯</span>
                                <span className="command-text">{command}</span>
                            </div>
                        </div>
                        {response && (
                            <div className={`response-content ${responseClass}`}>
                                {enhanceCommandOutput(response, command)}
                            </div>
                        )}
                    </div>
                );
            } else {
                // Welcome message or other direct entries
                const responseClass = getResponseClass('', entry);
                
                return (
                    <React.Fragment key={index}>
                        <div className={`response-content ${responseClass}`}>
                            {enhanceCommandOutput(entry, '')}
                        </div>
                    </React.Fragment>
                );
            }
        })}
    </div>
);

TerminalHistory.propTypes = {
    history: PropTypes.arrayOf(PropTypes.string).isRequired,
};
