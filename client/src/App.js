import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/message')
          
            .then(response => response.text())
            .then(data => setMessage(data));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>Message from backend:</p>
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;
