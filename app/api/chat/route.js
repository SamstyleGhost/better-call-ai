import { getGroqChatStream, ActOntology } from "@utils";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {
    const body = await req.json();
    console.log("Body in chat route: ", body)

    const ontology = await ActOntology({ sections: body.sections });

    const stream = await getGroqChatStream({ query: body.query, sections: body.sections, ontology: ontology });

    return NextResponse.json({ message: stream }, { status: 200 })
  } catch (error) {
    console.log("Error in Stream: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
