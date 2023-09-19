'use client';
import React from 'react'
import QueryField from './chat/QueryField'
import ChatField from './chat/ChatField';

const Chat = () => {
  return (
    <div className='w-full h-[600px] flex flex-col justify-between'>
      <ChatField className='w-full h-full'/>
      <QueryField />
    </div>
  )
}

export default Chat