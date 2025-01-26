'use client';
import { useState } from 'react'
import Message from './chat/Message';
import IconButton from './chat/IconButton';
import { Spinner } from '@components';
import { useSectionContext } from '@context';
import axios from 'axios';

const Chat = () => {

  const { setSections } = useSectionContext();

  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([{
    sender: 'assistant',
    message: 'Hello! How may I help you today?'
  }]);

  // TODO: Will have to add a loading state animation while the messages are sent to the server and the assistant is loading the answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setMessages(prev => [...prev, { sender: 'user', message: query }])

    //  @param : contains the user query as the parameter 
    //  @output : Gives the max_limit number of similar sections
    try {
      const searchResponse = await axios.post("/api/search", {
        query: query,
      });

      console.log("Eden results: ", searchResponse.data.message);
      let sections = [];

      await searchResponse.data.message.map((section) => {
        const dataObject = {
          act_number: section.act_number,
          document_name: section.document_name,
          section_title: section.section_title,
          section_text: section.section_text,
        };

        sections.push(dataObject);
      });
      
      setSections(sections);

      try {
        const answerResponse = await axios.post("/api/chat", {
          query: query,
          sections: sections,
        });

        setAnswer(answerResponse.data.message);

        setMessages((prev) => [
          ...prev,
          { sender: "assistant", message: answerResponse.data.message },
        ]);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev, { sender: "assistant", message: "Sorry! There was an error showing the answer. Please retry"},
        ]);
      }

    } catch (error) {
      console.error(error)
        setMessages((prev) => [
          ...prev, { sender: "assistant", message: "Sorry! There was an error showing the answer. Please retry"},
        ]);
    } finally {
      setQuery("");
      setLoading(false);
    }
  }

  return (
    <div className='w-full flex flex-col flex-grow-1 justify-between self-end'>
      <div className='w-full chat-height flex flex-col gap-4 overflow-y-auto'>
        {messages.map((message, index) => <Message key={index} sender={message.sender} message={message.message} />)}
      </div>
      <div className='w-full mt-4'>
        <form onSubmit={handleSubmit} className='bg-secondary p-2 rounded-lg flex justify-center'>
          <textarea
            type='text'
            placeholder='Enter your query here...'
            value={query}
            className='w-full h-20 bg-primary border-2 border-transparent p-2 outline-0 focus:border-accent rounded-lg resize-none'
            disabled={loading}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className='flex items-center mx-4 gap-8'>
            {loading
              ? <Spinner />
              : <IconButton
                icon='send'
              />}

          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat
