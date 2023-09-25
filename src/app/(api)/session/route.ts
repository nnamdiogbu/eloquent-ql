import { createSqlChain } from "@/app/_sqlchain";
import { queryFromCache } from "@/app/_storage/cache";

interface SessionInit {
  openAIKey: string;
  databaseUrl: string;
}

export async function POST(request: Request) {
  try {
    // const payload = (await request.json()) as SessionInit;
    // const { openAIKey, databaseUrl } = payload;
    // if (connectStr === undefined) throw new Error("Connection string not supplied");
    // const memory = await queryFromCache("memory", getChatMemory);
    // if (!memory) throw new Error("Cannot process this request at this time, try again later");
    // const chain = await createSqlChain();
    // chain.memory = memory;
    // return new Response("Works", { status: 200 });
  } catch (err) {
    console.error(err);
    new Response(JSON.stringify(err), { status: 500 });
  }
}
