'use client';
import React from 'react';
import Message from './Message';

const ChatField = () => {

  const userMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque non tellus orci ac auctor augue. Vitae sapien pellentesque habitant morbi tristique senectus et netus et.'

  const assistantMessage = 'Tempor commodo ullamcorper a lacus vestibulum sed arcu. Orci eu lobortis elementum nibh tellus molestie. Venenatis urna cursus eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu sem integer vitae justo. In hac habitasse platea dictumst vestibulum. Viverra orci sagittis eu volutpat odio. Non blandit massa enim nec dui nunc mattis enim. Ut tortor pretium viverra suspendisse. Luctus accumsan tortor posuere ac. Tellus integer feugiat scelerisque varius morbi enim nunc.'

  return (
    <div className='flex flex-col gap-4 overflow-y-auto px-4'>
      <Message sender='user' message={userMessage}/>
      <Message sender='assistant' message={assistantMessage}/>
      <Message sender='user' message={userMessage}/>
      <Message sender='assistant' message={assistantMessage}/>
      <Message sender='user' message={userMessage}/>
      <Message sender='assistant' message={assistantMessage}/>
    </div>
  )
}

export default ChatField