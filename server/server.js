const { instrument } = require("@socket.io/admin-ui");

const io = require('socket.io')(3004, {
  cors: {
    origin: ["http://localhost:3001", "https://admin.socket.io"],   // 允许本机的3000端口进行访问
  }
})

const userIo = io.of('/user')
userIo.on('connection', socket => {
  console.log('connected to user namespace');
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


  // 注意：io.on 是发给所有用户的  socket.on 是发给限定用户的   
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`哈哈哈，你加入的房间号是：${room}`);
  })
})

instrument(io, {
  auth: false
});