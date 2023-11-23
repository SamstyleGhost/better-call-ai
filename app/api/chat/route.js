import { OpenAIStream } from "@utils";
import { NextResponse } from "next/server";

export async function POST(req){

  try {
    const body = await req.json();

    const stream = await OpenAIStream({query: body.query, sections:body.sections});

    return NextResponse.json({ message: stream }, { status: 200 })
  } catch (error) {
    console.log("Error in Stream: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}