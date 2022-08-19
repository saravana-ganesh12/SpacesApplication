import React from 'react';
function Home(){
    const redirect = (path) => {
        window.location.href = path;
    }
    return (
        <div>
        <h1 style={{ marginTop: "80px", marginLeft:"400px", color:"white"}}>Voice controlled Search tool for Twitter Spaces on Desktop / Web</h1>
        <button style={{ marginTop: "90px", marginLeft:"850px", fontSize:"30px" ,
          border: "none",
          background:"white",
          color:"#1DA1F2",
          padding: "15px 32px",
          textAlign: "center",
          display: "inline-block",
          fontSize: "28px"}} onClick={redirect.bind(this,"http://127.0.0.1:3001/spacesapplication/login")}>Click here to Get Started</button>
        </div>);
}

export default Home;