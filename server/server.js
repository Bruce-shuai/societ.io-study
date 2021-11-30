const { instrument } = require("@socket.io/admin-ui");

const io = require('socket.io')(3004, {
  cors: {
    origin: ["http://localhost:3001", "https://admin.socket.io"],   // 允许本机的3000端口进行访问
  }
})

// const userIo = io.of('/user')



io.on('connection', socket => {
  // const id = socket.handshake.query.id 我们可以自己创建一个id 然后在服务端通过特殊手段将id传给handshake.query.id
  const id = socket.handshake.query.id;
  socket.join(id);   
  // 我们需要静态的id而非socket.id 这种动态的id(动态id 一刷新就变，无限死循环只会搞心态)

  // console.log(socket.id);  // 这里的id是随机的，当有用户连接上socket.io时，就会分配一个id
  socket.on('send-message', (message, room) => {
    console.log('server-message',message);
    if (!room) {
      socket.broadcast.emit('receive-message', message);
    } else {
      socket.to(room).emit('receive-message', message);
    }
  })

  // 加入群聊功能
  socket.on('join-room', room => {
    socket.join(room)
  })
})

instrument(io, {
  auth: false
});