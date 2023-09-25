import { BufferMemory } from "langchain/memory";
import { createSqlChain } from "@/app/_sqlchain";
import { redis } from "@/app/_storage/cache";
import { RedisChatMessageHistory } from "langchain/stores/message/ioredis";
import { getChatMemory } from "@/app/_storage/chat";

type chatContext = {
  role: "user";
  content: string;
};

export async function POST(request: Request) {
  try {
    const sessionId = request.headers.get("session-id");
    const payload = await request.json();

    if (!sessionId) throw new Error("Session Timed out");

    const { messages }: { messages: chatContext[] } = payload;
    if (!messages) throw new Error("chat context not provided");

    const query = messages.findLast((x) => x.role === "user")?.content;
    if (!query) throw new Error("Query not provided");

    const memory = getChatMemory(sessionId);
    const chain = await createSqlChain();
    chain.memory = memory;

    const response = await chain.call({
      input: query,
    });

    // for await (const chunk of streamAsyncIterator(response)) {
    //   console.log("chunk: ", chunk);
    //   return new StreamingTextResponse(chunk.Result);
    // }

    return new Response(JSON.stringify(response), { status: 200 });

    // // fix streaming later
    // const stream = OpenAIStream(new Response(JSON.stringify(response), { status: 200 }));

    // return new StreamingTextResponse(stream);
    // // return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.log("error: ", err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}

// async function testQuery() {
//   const db = await initializedDB();
//   let data: { table_name: string; column_name: string }[] = await db.query(
//     "SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public';"
//   );

//   const map = new Map<string, string[]>();

//   data.forEach((x) => {
//     let columnList = map.get(x.table_name);
//     if (columnList) columnList.push(x.column_name);
//     else columnList = [x.column_name];
//     map.set(x.table_name, columnList);
//   });

//   const obj = Object.fromEntries(map);
//   console.log("Json: ", JSON.stringify(obj));
//   return true;
// }

// async function* streamAsyncIterator(stream: ReadableStream) {
//   const reader = stream.getReader();
//   try {
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) return;
//       yield value;
//     }
//   } finally {
//     reader.releaseLock();
//   }
// }
