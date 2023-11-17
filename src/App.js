import { useState } from 'react';
import './App.css';
import Terminal from './components/terminal/Terminal';
import WelcomeScreen from './components/welcome-screen/WelcomeScreen';

function App() {
    const [showTerminal, setShowTerminal] = useState(true);

    const terminalClass = showTerminal ? '' : 'hide-element';
    const welcomeScreenClass = showTerminal ? 'hide-element' : '';

    return (
        <div className="App">
            <div className={terminalClass}>
                <Terminal setShowTerminal={setShowTerminal} showTerminal={showTerminal} />
            </div>
            <div className={welcomeScreenClass}>
                <WelcomeScreen setShowTerminal={setShowTerminal} />
            </div>
        </div>
    );
}

export default App;
