import { 
  COMMANDS, 
  COMMAND_RESPONSES, 
  COMMAND_NOT_FOUND, 
  generateHelpText 
} from '../constants/commandConstants';
import { URLS } from '../constants/terminalConstants';

/**
 * Process user input command and return appropriate response
 * @param {string} input - User input command
 * @param {Function} setHistory - State setter for terminal history
 * @param {Function} setShowTerminal - Function to hide terminal
 * @returns {Object} - Result containing response text and any side effects
 */
export const processCommand = (input, setHistory = null, setShowTerminal = null) => {
  const trimmedInput = input.trim().toLowerCase();
  
  // Process empty input
  if (!trimmedInput) {
    return { text: '' };
  }
  
  const command = trimmedInput.split(' ')[0]; // Extract the command (first word)
  
  switch (command) {
    case COMMANDS.HELP:
      return { text: generateHelpText() };
      
    case COMMANDS.CLEAR:
      if (setHistory) {
        setHistory([]);
      }
      return { text: '', shouldClear: true };
      
    case COMMANDS.EXIT:
      if (setShowTerminal) {
        const userConfirmed = window.confirm('Are you sure you want to exit?');
        if (userConfirmed) {
          window.location.href = URLS.LINKEDIN;
        }
      }
      return { text: '' };
      
    case COMMANDS.ABOUT:
    case COMMANDS.SKILLS:
    case COMMANDS.EXPERIENCE:
    case COMMANDS.EDUCATION:
    case COMMANDS.CONTACT:
      return { text: COMMAND_RESPONSES[command] };
      
    default:
      return { text: COMMAND_NOT_FOUND(trimmedInput) };
  }
};

/**
 * Format command response for display
 * @param {string} command - The command entered by user
 * @param {string} response - The response to be formatted
 * @returns {string} - Formatted response with command prompt
 */
export const formatCommandResponse = (command, response) => {
  const prompt = '$ ';
  return `${prompt}${command}\n${response}`;
}; 