import React, { useState } from 'react';
import { io } from "socket.io-client";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="App">      
      {!loggedIn ? (
        <div className="logIn">
          <div className='inputs'>
          <input type='text' placeholder='Name.....'/>
          <input type='text' placeholder='Room.....'/>
          </div>
          <button>Enter Chat</button>
        </div>
      ) : (<h1>You are Logged In</h1> 
      )}
    </div>
  );
}

export default App;
