'use client';
import { useState } from 'react'
import Message from './chat/Message';
import IconButton from './chat/IconButton';

const Chat = () => {

  const [query, setQuery] = useState('');

  const [messages, setMessages] = useState([{
    sender: 'assistant',
    message: 'Hello! How may I help you today?'
  }]);

  // TODO: Will have to add a loading state animation while the messages are sent to the server and the assistant is loading the answer
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessages([ ...messages, { sender: 'user', message: query }]);
    console.log("Into submit");

    // * POST request which will contain the query as the parameter 
    await fetch('/api/search',{
        method: 'POST',
        body: JSON.stringify({
          query: query
        }),
        'content-type': 'application/json'
      }
    )
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    // app.post(req,res) => {req.query = query} 
    // createEmbedding(req.query)
    // SQL query => will give top 5 results
    // From that result texts, from MongoDB, get legal ontology information used in those sections
    // Append that and give it to the ChatGPT prompt
    // ChatGPT response will be given back as res.json

    setQuery('');
  }

  return (
    <div className='w-full max-md:h-[475px] flex flex-col flex-grow justify-between self-end'>
      <div className='w-full flex flex-col gap-4 overflow-y-auto pr-4'>
        {messages.map((message, index) => <Message key={index} sender={message.sender} message={message.message}/>)}
      </div>
      <div className='w-full mt-4'>
        <form onSubmit={handleSubmit} className='bg-secondary p-2 rounded-lg flex justify-center'>
          <textarea 
            type='text' 
            placeholder='Enter your query here...' 
            value={query}
            className='w-full bg-primary border-2 border-transparent p-2 outline-0 focus:border-accent rounded-lg resize-none' 
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className='flex items-center mx-4 gap-8'>
            <IconButton 
              icon='send'
            />
            <IconButton 
              icon='mic'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat