import { createSqlChain } from "@/app/_sqlchain";
import { queryFromCache } from "@/app/_storage/cache";
import { BufferMemory } from "langchain/memory";

export async function POST(request: Request) {
  // try {
  //   const payload = await request.json();
  //   const { connectStr }: { connectStr: string } = payload;
  //   if (connectStr === undefined) throw new Error("Connection string not supplied");
  //   const memory = await queryFromCache("memory", getChatMemory);
  //   if (!memory) throw new Error("Cannot process this request at this time, try again later");
  //   const chain = await createSqlChain();
  //   chain.memory = memory;
  //   return new Response("Works", { status: 200 });
  // } catch (err) {
  //   console.error(err);
  //   new Response(JSON.stringify(err), { status: 500 });
  // }
}
