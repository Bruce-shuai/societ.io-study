const { instrument } = require("@socket.io/admin-ui");

const io = require('socket.io')(3004, {
  cors: {
    origin: ["http://localhost:3001", "https://admin.socket.io"],   // 允许本机的3000端口进行访问
  }
})

// const userIo = io.of('/user')



io.on('connection', socket => {
  // const id = socket.handshake.query.id 我们可以自己创建一个id 然后在服务端通过特殊手段将id传给handshake.query.id

  // TODO
  // const id = socket.handshake.query.id;
  // socket.join(id);   

  // 我们需要静态的id而非socket.id 这种动态的id(动态id 一刷新就变，无限死循环只会搞心态)
  // console.log(socket.id);  // 这里的id是随机的，当有用户连接上socket.io时，就会分配一个id
  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message)
  })

  // io.emit('any-custom-event', socket.id)

  // 加入群聊功能
  // socket.on('join-room', room => {
  //   socket.join(room)
  // })
  // socket.on('any-custom-event2', (number, string, func) => {     // 匹配对应的事件名字以及用回调函数来接收服务端发送过来的任何数据
  //   console.log('number', number);
  //   console.log('string', string);
  //   console.log('func', func);
  // })
})

instrument(io, {
  auth: false
});