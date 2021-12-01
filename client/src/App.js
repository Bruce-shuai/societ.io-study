import { useState, useEffect, useRef } from 'react'
import './css/app.css';
import Display from './component/Display';
import Form from './component/Form';
import {io} from 'socket.io-client';   // 这里的io其实也是一个函数，我们可以通过这个io获得独立的socket
import { v4 as uuidV4 } from 'uuid'

const id = uuidV4();
// 我不把这个放在组件上渲染！
const socket = io('http://localhost:3004', { query: { id }});  // 得到一个独立的socket
const userSocket = io('http://localhost:3004/user', {auth: {token: 'test'}});


function App() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();

  function sendMessage(newMessage) {
    console.log(newMessage);
    socket.emit('send-message', newMessage, room)    
    setMessages(prev => [...prev, newMessage])
  }


  useEffect(() => {
    socket.on('receive-message', (receiveMessage) => {
      setMessages(prev => {
        return [...prev, receiveMessage]
      })
    })
  }, [])

  function sendRoom(newRoom) {
    setRoom(newRoom)
    socket.emit('join-room', newRoom, (data) => {
      console.log('callback', data);
    });     // 要加入群聊的房间号
  }


  // 键盘事件
  useEffect(() => {
    document.addEventListener("keydown", connect)   // 不要自己在这里写回调，不然 reomve 也只能写成回调(两个函调函数实质不一样)，则达不到remove的效果
    return () => document.removeEventListener("keydown", connect)
  })

  function connect(e) {
    if (e.key === 'c') {
      socket.connect();
    }
    if (e.key === 'd') {
      socket.disconnect(); 
    }
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
