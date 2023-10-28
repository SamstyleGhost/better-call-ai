import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const gptPrompt = `You are a helpful legal assistant that answers queries based on the Indian legal system. Respond in brief. Deny responses to any request that does not seem to be a legal query.`;

export const OpenAIStream = async (prompt) => {
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
        content: ''
      }]
    })
  })
}