import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const ai = new OpenAIApi(config);

export async function POST(request: Request) {
  const payload = await request.json();
  console.log("payload: ", payload);
  const { messages } = payload;

  const response = await ai.createChatCompletion({
    messages,
    model: "gpt-3.5-turbo",
    stream: true,
  });

  console.log("response: ", response);

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
