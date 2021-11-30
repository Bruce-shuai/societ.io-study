import React, {useState, useEffect} from 'react'
export default function Form({sendMessage, sendRoom}) {

  const [messageValue, setMessageValue] = useState('');
  const [roomValue, setRoomValue] = useState(''); 

  function handleClickSend() {
    sendMessage(messageValue)
    setMessageValue('')
  };
  function handleClickJoin() {
    sendRoom(roomValue)
    // console.log(sendRoom);
    setRoomValue('')
  }
  function handleInputMessage(e) {
    setMessageValue(e.target.value)
  }
  function handleInputRoom(e) {
    setRoomValue(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();   // 防止进入其他页面
  }

  return (
    <div className="form-container">
      {/* 我自己写的form 不比antd的好？*/}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div>
            <label htmlFor="form-message" className="form-label">信息</label>
            <input id="form-message" className="form-input" value={messageValue} onChange={handleInputMessage}/>
          </div>
          <button onClick={handleClickSend}>发送</button>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="form-room" className="form-label">房间</label>
            <input id="form-room"  className="form-input" value={roomValue} onChange={handleInputRoom}/>
          </div>
          <button onClick={handleClickJoin}>加入</button>
        </div>
      </form>
    </div>
  )
}
