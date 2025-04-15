/**
 * Terminal command constants
 */

// Available commands
export const COMMANDS = {
  HELP: 'help',
  ABOUT: 'about',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CONTACT: 'contact',
  CLEAR: 'clear',
  EXIT: 'exit',
};

// Command descriptions for help command
export const COMMAND_DESCRIPTIONS = {
  [COMMANDS.HELP]: 'Display available commands',
  [COMMANDS.ABOUT]: 'Learn about me',
  [COMMANDS.SKILLS]: 'View my technical skills',
  [COMMANDS.EXPERIENCE]: 'Review my work experience',
  [COMMANDS.EDUCATION]: 'Check my educational background',
  [COMMANDS.CONTACT]: 'Find ways to contact me',
  [COMMANDS.CLEAR]: 'Clear the terminal screen',
  [COMMANDS.EXIT]: 'Exit the terminal (redirects to LinkedIn)',
};

// Command responses
export const COMMAND_RESPONSES = {
  [COMMANDS.ABOUT]: `
Hello! I'm Nicolas Motillon, a passionate software developer with expertise in building modern web applications.
I love solving complex problems and creating intuitive user experiences.
My journey in technology has equipped me with a diverse skill set and a deep understanding of software development principles.
`,

  [COMMANDS.SKILLS]: `
Technical Skills:
• Front-End: React, Redux, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind
• Back-End: Node.js, Express, Python, Django, RESTful APIs
• Database: MongoDB, PostgreSQL, MySQL
• DevOps: Docker, AWS, CI/CD, GitHub Actions
• Testing: Jest, React Testing Library, Cypress
• Tools: Git, Webpack, Babel, npm/yarn
`,

  [COMMANDS.EXPERIENCE]: `
Work Experience:

Senior Software Engineer | TechCorp Inc. | 2020 - Present
• Led development of a React-based dashboard that increased user engagement by 40%
• Architected microservices structure using Node.js and Express
• Mentored junior developers and established code review processes

Software Developer | StartupXYZ | 2018 - 2020
• Built RESTful APIs using Django and PostgreSQL
• Implemented responsive UI designs with React and Tailwind CSS
• Reduced application load time by 60% through code optimization
`,

  [COMMANDS.EDUCATION]: `
Education:

Master's in Computer Science | Tech University | 2016 - 2018
• Focus on Software Engineering and Web Technologies
• GPA: 3.8/4.0

Bachelor's in Software Engineering | Engineering College | 2012 - 2016
• Dean's List for Academic Excellence
• Senior Project: Developed an automated scheduling system
`,

  [COMMANDS.CONTACT]: `
Contact Information:

• Email: nicolas@example.com
• LinkedIn: linkedin.com/in/nicolas-motillon
• GitHub: github.com/xLillium
• Portfolio: nicolasmotillon.com
• Twitter: @nicolasmotillon
`,

  [COMMANDS.HELP]: '',  // Will be dynamically generated
  [COMMANDS.CLEAR]: '', // Special handling, no response
  [COMMANDS.EXIT]: '',  // Special handling, no response
};

// Function to generate help text
export function generateHelpText() {
  let helpText = 'Available Commands:\n\n';
  
  Object.keys(COMMAND_DESCRIPTIONS).forEach(command => {
    helpText += `• ${command} - ${COMMAND_DESCRIPTIONS[command]}\n`;
  });
  
  return helpText;
}

// Command not found message
export const COMMAND_NOT_FOUND = (command) => `Command not found: ${command}. Type 'help' to see available commands.`; 