import { useState } from 'react'
import './css/app.css';
import Display from './component/Display';
import Form from './component/Form';
import {io} from 'socket.io-client';   // 这里的io其实也是一个函数，我们可以通过这个io获得独立的socket

function App() {
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:3004');    // 目的是连接到前面我设置的3004端口上的服务端
  return (
    <div className="app-container">
      <Display messageList={messages}/>
      <Form sendMessage={setMessages}/>
    </div>
  );
}

export default App;
