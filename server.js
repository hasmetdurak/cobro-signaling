const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log("🔌 New peer connected:", socket.id);

  socket.on('register', ({ streamId, peerInfo }) => {
    socket.join(streamId);
    console.log(`✅ Joined room: ${streamId}`);
  });

  socket.on('offer', ({ streamId, offer }) => {
    socket.to(streamId).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ streamId, answer, to }) => {
    socket.to(to).emit('answer', { answer });
  });

  socket.on('ice-candidate', ({ streamId, candidate, to }) => {
    socket.to(to).emit('ice-candidate', { candidate });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Signaling server running on port 3000");
});