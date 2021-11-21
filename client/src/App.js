import { useState } from 'react'
import './css/app.css';
import Display from './component/Display';
import Form from './component/Form';

function App() {
  const [messages, setMessages] = useState([]);
  return (
    <div className="app-container">
      <Display messageList={messages}/>
      <Form sendMessage={setMessages}/>
    </div>
  );
}

export default App;
