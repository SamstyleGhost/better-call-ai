import { createClient } from '@supabase/supabase-js';
import { createParser } from 'eventsource-parser';

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


export const OpenAIStream = async ({query, sections}) => {

  const sectionData = sections.map(section => JSON.stringify(section)).join("\n");

  const gptPrompt = `You are a helpful legal assistant that answers queries based on the Indian legal system.This is the legal data that you would need to answer the user's questions: ${sectionData}.
  Answer the user query only based on the information contained in the data that has been provided to you in this prompt.
  Cite the sections used and the name of the act which are defined in the object as section_title and document_name respectively.
  Respond in detail. Always suggest to consult nearby lawyers. Deny responses to any request that does not seem to be a legal query.`;

  try {
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: gptPrompt
        }, {
          role: 'user',
          content: query
        }],
        max_tokens: 500,
        temperature: 0.0,
        // stream: true
      })
    })

    const responseData = await response.json();
  
    // console.log("Response statuse: ", response.status);
    // console.log("Response is: ", responseData);
    
    const stream = await responseData.choices[0].message.content;

    return stream;

  } catch (error) {
    console.log("Error in stream: ", error);
  }

  // if(response.status !== 200) {
  //   throw new Error('Stream Error');
  // }

  // const encoder = new TextEncoder();
  // const decoder = new TextDecoder();

  // const stream = new ReadableStream({
  //   async start(controller) {
  //     const onParse = (event) => {
  //       if(event.type === 'event'){
  //         const data = event.data;

  //         if(data === '[DONE]'){
  //           controller.close();
  //           return;
  //         }

  //         try {
  //           const json = JSON.parse(data);
  //           const text = json.choices[0].delta.content;
  //           const queue = encoder.encode(text);
  //           controller.enqueue(queue);

  //         } catch (error) {
  //           controller.error(error);
  //         }
  //       }
  //     }

  //     const parser = createParser(onParse);
      
  //     for await( const chunk of response.body ){
  //       parser.feed(decoder.decode(chunk));
  //     }
  //   }
  // })
  // return stream;
}