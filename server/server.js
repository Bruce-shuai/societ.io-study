const { instrument } = require("@socket.io/admin-ui");

const io = require('socket.io')(3004, {
  cors: {
    origin: ["http://localhost:3001", "https://admin.socket.io"],   // 允许本机的3000端口进行访问
  }
})

io.on('connection', socket => {
  // TODO
  const id = socket.handshake.query.id;
  socket.join(id);   
  socket.on('send-message', (message, room) => {  // 接收要私聊人的id
    if (!room) {  // 如果没有特别私聊的人，就所有人都可以接收到数据
      socket.broadcast.emit('receive-message', message)
    } else {     // 否则，发给私聊的人！
      socket.to(room).emit('receive-message', message);   
    }
  })
})

instrument(io, {
  auth: false
});