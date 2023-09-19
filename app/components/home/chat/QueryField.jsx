'use client';
import React, { useState } from 'react'
import { Send } from 'react-feather';

const QueryField = () => {

  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    console.log(query);
  }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='bg-secondary p-2 rounded-lg flex justify-center'>
        <textarea type='text' placeholder='Enter your query here...' className='w-full bg-primary border-2 border-transparent p-2 outline-0 focus:border-accent rounded-lg resize-none' onChange={(e) => setQuery(...query, e.target.value)}/>
        <div className='flex items-center mx-2'>
          <Send className='cursor-pointer'/>
        </div>
      </form>
    </div>
  )
}

export default QueryField