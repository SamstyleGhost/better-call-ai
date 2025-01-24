import { NextResponse } from "next/server";
import axios from 'axios'
import { supabase } from "@utils";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Body in eden: ", body)
    
    const options = {
      method: "POST",
      url: 'https://api.edenai.run/v2/text/embeddings',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.EDEN_AI_KEY}`
      },
      data: {
        settings: '{"openai": "text-embedding-ada-002"}',
        response_as_dict: true,
        attributes_as_list: false,
        show_base_64: true,
        show_original_response: false,
        providers: ['openai'],
        texts: [body.query]
      }}
    const response = await axios.request(options)
    
    const embedding = await response.data.openai.items[0].embedding
    console.log("Length of the embedding is: ",embedding.length)

    const { data, error } = await supabase.rpc('user_query_search', {
      query_embedding: embedding,
      similarity_threshold: 0.8,
      match_count: 3
    });
    
    console.log("supabase data: ", data)
    
    if(error) {
      console.log(error);
      return NextResponse.json({ message: error }, { status: 400 });
    } 
    
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}