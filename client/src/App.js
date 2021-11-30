import { useState, useEffect, useRef } from 'react'
import './css/app.css';
import Display from './component/Display';
import Form from './component/Form';
import {io} from 'socket.io-client';   // 这里的io其实也是一个函数，我们可以通过这个io获得独立的socket
import { v4 as uuidV4 } from 'uuid'

const id = uuidV4();
// 我不把这个放在组件上渲染！
const socket = io('http://localhost:3004', { query: { id }});  // 得到一个独立的socket


function App() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();
  // const [id, setId] = useState()
  // useEffect(() => {
  //   setId(uuidV4())
  // }, [])

  function sendMessage(newMessage) {
    console.log('room', room);
    socket.emit('send-message', [...messages, newMessage], room)  // 发送数据到server端
    setMessages(prev => {
      console.log('messages', [...prev, newMessage]);
      return [...prev, newMessage]
    })
  }

  socket.on('receive-message', (message) => {
    setMessages(message);
  })

  function sendRoom(newRoom) {
    setRoom(newRoom)
  }


  return (
    <div className="app-container">
      {`id: ${id}`}
      <Display messageList={messages}/>
      <Form sendMessage={sendMessage} sendRoom={sendRoom}/>
    </div>
  );
}

export default App;
