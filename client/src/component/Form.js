import React, {useState, useEffect} from 'react'
export default function Form({sendMessage}) {


  const [message, setMessage] = useState('');
  function handleClickSend() {
    sendMessage(prevMessages => {
      return [...prevMessages, message]
    })
    setMessage('')
  };
  function handleInput(e) {
    setMessage(e.target.value)
  }
  

  function handleClickJoin(e) {
    console.log('join');
  }
  function handleSubmit(e) {
    e.preventDefault();   // 防止进入其他页面
  }

  return (
    <div className="form-container">
      {/* 我自己写的antd 不比antd的好？*/}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div>
            <label htmlFor="form-message" className="form-label">信息</label>
            <input id="form-message" className="form-input" value={message} onChange={handleInput}/>
          </div>
          <button onClick={handleClickSend}>发送</button>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="form-room" className="form-label">房间</label>
            <input id="form-room"  className="form-input"/>
          </div>
          <button onClick={handleClickJoin}>加入</button>
        </div>
      </form>
    </div>
  )
}
