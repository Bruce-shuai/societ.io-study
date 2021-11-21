import React from 'react'

export default function Display({messageList}) {
  return (
    <div className="display-container">
      {
        messageList?.map((message, index) => {
          return <div key={index} className="message-item">{message}</div>
        }) 
      }
    </div>
  )
}
