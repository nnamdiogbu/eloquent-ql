import { BufferMemory } from "langchain/memory";
import { RedisChatMessageHistory } from "langchain/stores/message/ioredis";
import { redis } from "../cache";

export function getChatMemory(sessionId: string) {
  const memory = new BufferMemory({
    memoryKey: "history",
    inputKey: "input",
    outputKey: "result",
    chatHistory: new RedisChatMessageHistory({
      sessionId,
      sessionTTL: 300,
      client: redis,
    }),
  });

  return memory;
}
