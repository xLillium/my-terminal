import { useState } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
    const [showTerminal, setShowTerminal] = useState(true);

    return (
        <div className="App">
            {showTerminal ? (
                <Terminal setShowTerminal={setShowTerminal} />
            ) : (
                <WelcomeScreen setShowTerminal={setShowTerminal} />
            )}
        </div>
    );
}

export default App;
