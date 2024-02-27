import React, { useEffect, useState } from 'react';
import './App.scss';
import PostList from './components/postlist/PostList';

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
                <p>{message}</p>
            </header>
            <div>
                <h1>My blog</h1>
                <PostList />
            </div>
        </div>
    );
}

export default App;
