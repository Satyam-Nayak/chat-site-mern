



// import React, { useEffect, useState } from 'react';
// import  io  from "socket.io-client";
// import './App.css';

// let socket;
// const CONNECTION_PORT = "http://localhost:5002";


// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const [room, setRoom] = useState("");

//   const [userName, setUserName] = useState("");

//   // useEffect(() => {
//   //   socket = io(CONNECTION_PORT);
//   // }, [CONNECTION_PORT]);

//   useEffect(() => {
//     socket = io(CONNECTION_PORT);
//   }, []);
  

//   const connectToRoom = () => {
//     console.log(`Connecting to room: ${room}`);
//     socket.emit('join_room', room);
//   };
  
//   return (
//     <div className="App">      
//       {!loggedIn ? (
//         <div className="logIn">
//           <div className='inputs'>
//           <input type="text" placeholder="Name....." onChange={(e) => {
//             setUserName(e.target.value);
//             }}
//           />
//           <input type='text' placeholder='Room.....' onChange={(e) => {
//             setRoom(e.target.value);
//             }}
//           />
//           </div>
//           <button onClick={connectToRoom}>Enter Chat</button>
//         </div>
//       ) : (<h1>You are Logged In</h1> 
//       )}
//     </div>
//   );
// }

// export default App;
