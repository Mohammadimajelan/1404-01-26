const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Make io accessible to routes
app.set('io', io);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/machining-scheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import routes
const ordersRouter = require('./routes/orders');
const machinesRouter = require('./routes/machines');

// Use routes
app.use('/api/orders', ordersRouter);
app.use('/api/machines', machinesRouter);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('scheduleUpdate', (data) => {
    // Broadcast schedule updates to all connected clients
    io.emit('scheduleUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 