import { NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";
import { supabase } from "@utils";

export const runtime = "edge";

export async function POST(req) {

  const pipe = await pipeline("feature-extraction", "Xenova/gte-large")

  try {

    const body = await req.json();
    console.log("body in search route: ", body)

    const response = await pipe(body.query, { pooling: 'mean', normalize: true })
    const embedding = Array.from(response.data)

    const { data, error } = await supabase.rpc('user_query_search_updated', {
      query_embedding: embedding,
      similarity_threshold: 0.5,
      match_count: 3
    });

    console.log("Data in search route: ", data)

    if (error) {
      console.log(error);
      return NextResponse.json({ message: error }, { status: 500 });
    }

    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
