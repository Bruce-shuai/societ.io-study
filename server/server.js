const io = require('socket.io')(3004)  // 让socket.io 运行在3004端口上

io.on('connection', socket => {
  console.log(socket.id);  // 这里的id是随机的，当有用户连接上socket.io时，就会分配一个id
})

