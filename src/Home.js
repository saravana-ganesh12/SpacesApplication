import React from 'react';

function Home(){
    const redirect = (path) => {
        window.location.href = path;
    }
    return (
        <div>
        <h1>Search for Twitter Spaces</h1>
        <button onClick={redirect.bind(this,"http://127.0.0.1:3001/spacesapplication/login")}>Login</button>
        </div>);
}

export default Home;