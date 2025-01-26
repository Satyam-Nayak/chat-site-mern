const express = require ('express')
const socket = require('socket.io')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // this allows us to send information from frontend to backend


const server = app.listen(5002, () => {
    console.log("server is running on port 5002....")
});

// new some update 
// io = socket(server);
// ---------- new part this one -----
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000", // React app URL
      methods: ["GET", "POST"],
    },
  });
// -------------- ....------


io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
    });

    socket.on("send_message", (data) => {
      console.log("Message recived: ",data);
      socket.to(data.room).emit("receive_message", data.content);
    });

    socket.on("disconnect",() => {
        console.log("User Disconnect..");
    });
});
