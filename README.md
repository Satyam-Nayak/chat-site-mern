# Live Chat Website Project

This project is a **Live Chat Application** built using **React.js**, **Node.js**, and **Socket.IO**. It enables real-time communication between users in different chat rooms. The application is user-friendly and highly interactive.

---

## Features
- **Real-Time Messaging**: Enables instant communication using Socket.IO.
- **Room-Based Chat**: Users can join specific chat rooms.
- **User-Friendly Interface**: Simple and intuitive design for better usability.
- **Auto-Scrolling**: Chat view automatically scrolls to the latest message.
- **Input Validation**: Prevents empty messages from being sent.

---

## Technologies Used
### Frontend:
- **React.js**: For building the user interface.
- **CSS**: For styling the application.

### Backend:
- **Node.js**: For creating the server.
- **Express.js**: For handling HTTP requests.
- **Socket.IO**: For WebSocket-based real-time communication.

---

## Project Structure
```
.
├── backend
│   ├── index.js (Node.js server code)
│
├── frontend
│   ├── src
│   │   ├── App.jsx (React main component)
│   │   ├── App.css (Styling)
│
├── README.md
```

---

## How It Works
1. **Backend (index.js):**
   - The **Node.js server** is set up using Express.js and Socket.IO.
   - The server listens for connections on port `5002`.
   - Key Socket.IO events:
     - `connection`: Logs when a user connects.
     - `join_room`: Adds the user to a specific room.
     - `send_message`: Relays the message to users in the same room.
     - `disconnect`: Logs when a user disconnects.

2. **Frontend (App.jsx):**
   - React is used to create the UI with state management through `useState`.
   - **Core Methods:**
     - `connectToRoom`: Joins a specific chat room.
     - `sendMessage`: Sends a message to the server and updates the local message list.
   - **Hooks Used:**
     - `useEffect`: For handling Socket.IO events and auto-scrolling.
     - `useRef`: To implement smooth auto-scrolling.

---

## Installation and Usage
### Prerequisites:
- Node.js
- npm

### Backend Setup:
1. Navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install express socket.io cors
   ```
3. Start the server:
   ```bash
   node index.js
   ```

### Frontend Setup:
1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

### Access the App:
- Open your browser and navigate to `http://localhost:3000`.

---

## Key Components and Functions
### Backend (Node.js):
- **`io.on('connection')`**: Handles new user connections.
- **`socket.on('join_room')`**: Adds a user to a specific room.
- **`socket.on('send_message')`**: Relays the message to other users in the room.
- **`socket.on('disconnect')`**: Logs when a user disconnects.

### Frontend (React.js):
- **State Management:**
  - `loggedIn`, `room`, `userName`: For login and room selection.
  - `message`, `messageList`: For managing messages.
- **Key Methods:**
  - `connectToRoom()`: Emits the `join_room` event to the server.
  - `sendMessage()`: Sends a message and updates the local message list.
- **Auto-Scroll:**
  - Implemented using `useRef` and `useEffect`.

---

## Future Enhancements
- Add user authentication.
- Implement message timestamps.
- Add support for multimedia messages (images, videos).
- Deploy the app for public use.

---

## Deployment
- The app can be deployed using **Vercel** for the frontend and a hosting service like **Heroku** for the backend.

---

## License
This project is licensed under the MIT License.

