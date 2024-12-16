const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Frontend URL
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON data

// Start the server
const server = app.listen(5002, () => {
  console.log("Server is running on port 5002...");
});

// Initialize socket.io
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle room joining
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


// ----------------------
// const express = require ('express')
// const socket = require('socket.io')
// const app = express()
// const cors = require('cors');


// app.use(cors());
// app.use(express.json()); // this allows us to send information from frontend to backend


// const server = app.listen("5002",() => {
//     console.log("server is running on port 5002....")
// });

// io = socket(server);

// io.on("connection", (socket) => {
//     console.log(socket.id);

//     socket.on("join_room", (data) => {
//         socket.join(data);
//         console.log("User Joined Room: " + data);
//     });

//     socket.on("disconnect",() => {
//         console.log("User Disconnect..");
//     });
// });
