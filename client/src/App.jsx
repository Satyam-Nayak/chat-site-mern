// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import "./App.css";

// let socket;
// const CONNECTION_PORT = "http://localhost:5002"; // Backend server URL

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [room, setRoom] = useState("");
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     // Establish socket connection
//     socket = io(CONNECTION_PORT);

//     // Debug: Check connection status
//     socket.on("connect", () => {
//       console.log("Connected to server with socket ID: " + socket.id);
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err);
//     });

//     return () => {
//       socket.disconnect(); // Clean up socket connection on unmount
//     };
//   }, []);

//   const connectToRoom = () => {
//     if (room && userName) {
//       console.log(`Attempting to connect to room: ${room}`); // Debug log
//       socket.emit("join_room", room);
//       setLoggedIn(true);
//     } else {
//       alert("Please enter a valid username and room name.");
//     }
//   };

//   return (
//     <div className="App">
//       {!loggedIn ? (
//         <div className="logIn">
//           <div className="inputs">
//             <input
//               type="text"
//               placeholder="Name....."
//               onChange={(e) => setUserName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Room....."
//               onChange={(e) => setRoom(e.target.value)}
//             />
//           </div>
//           <button onClick={connectToRoom}>Enter Chat</button>
//         </div>
//       ) : (
//         <h1>You have joined the room: {room}</h1>
//       )}
//     </div>
//   );
// }

// export default App;



////////////////////////////// -----------------
import React, { useEffect, useState } from 'react';
import  io  from "socket.io-client";
import './App.css';

let socket;
const CONNECTION_PORT = "localhost:5002/";


function App() {
  // Before you logged in 
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("Class of 2025");
  const [userName, setUserName] = useState("");

  // After logged in
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(()=>{
    socket.on("receive_message", (data) =>{
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit('join_room', room);
  };

  const sendMessage = async ()=>{
    let messageContent = {
      room: room,
      content:{
        author: userName,
        message: message
      },
    };
    await socket.emit("send_message", messageContent)
    setMessageList([...messageList, messageContent.content])
    setMessage("")
  };
  
  return (
    <div className="App">      
      {!loggedIn ? (
        <div className="logIn">
          <div className='inputs'>
          <input type="text" placeholder="Name....." onChange={(e) => {
            setUserName(e.target.value);
            }}
          />
          <input type='text' placeholder='Room.....' onChange={(e) => {
            setRoom(e.target.value);
            }}
          />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return(
                <div className="messageContainer" id={val.author == userName ? "You" : "Other"}>
                <div className="messageIndividual">{val.message}</div>
                <h1>{val.author}</h1>
                </div>
              );
            })}
          </div>

          <div className="messageInputs">
            <input type="text" placeholder="Message...." onChange={(e) => { setMessage(e.target.value);}} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
