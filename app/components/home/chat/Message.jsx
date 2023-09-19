'use client';
import React from 'react'

const Message = ({ sender, message }) => {

  return (
    <div className={`w-3/4 rounded-md px-4 py-2 ${sender === 'user' ? 'self-end bg-primary' : 'self-start bg-accent'}`}>
      {message}
    </div>
  )
}

export default Message