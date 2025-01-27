import React, { useEffect, useState, useRef } from 'react';
import  io  from "socket.io-client";
import './App.css';

let socket;
const CONNECTION_PORT = "http://localhost:5002";



function App() {
  // Before you logged in 
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After logged in
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const messagesEndRef = useRef(null); // Ref for auto-scrolling



  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []); // No need for dependencies here, only runs once
  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });
    // Clean up the listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []); // Empty dependency array

  useEffect(() => {
    // Auto-scroll to bottom when the message list updates
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  //  new more optimised 
  const connectToRoom = () => {
    if (!room) {
      console.error('Room is not specified.');
      return;
    }
    
    setLoggedIn(true);
    socket.emit('join_room', room);
  };

  // previous one 
  // const connectToRoom = () => {
  //   setLoggedIn(true);
  //   socket.emit('join_room', room);
  // };
  

  // new readme
  

  const sendMessage = async () => {
    // Check if the message is empty or just spaces
    if (message.trim() === "") return;
  
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
  
    await socket.emit("send_message", messageContent);
    setMessageList((prevList) => [...prevList, messageContent.content]);
    setMessage(""); // Clear the input field
  };
  //Using prevList ensures state updates are based on the latest state, avoiding issues with React's asynchronous updates.
  

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className='inputs'>
            <input type="text" placeholder="Name....." onChange={(e) => setUserName(e.target.value)} />
            <input type='text' placeholder='Room.....' onChange={(e) => setRoom(e.target.value)} />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => (
              <div key={key} className="messageContainer" id={val.author === userName ? "You" : "Other"}>
                <div className="messageIndividual">
                  {val.author}: {val.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Ref for auto-scroll */}
          </div>
          <div className="messageInputs">
            <input type="text" placeholder="Message...." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

