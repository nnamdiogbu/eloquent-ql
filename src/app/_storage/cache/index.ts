import { Redis } from "ioredis";
import { createClient } from "@vercel/kv";

export const redis = new Redis();
const cacheClient = createClient({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});
export async function queryFromCache<T>(key: string, dataFetcher?: () => Promise<T> | T, expiry = 3600) {
  const value = await getValue<T>(key);
  if (value) return value;
  if (!dataFetcher) return null;
  return setValue(key, dataFetcher, expiry);
}

async function getValue<T>(key: string) {
  const res = await redis.get(key);
  console.log("data from cache during get attempt: ", res);
  if (res) return JSON.parse(res) as T;
  return null;
}

async function setValue<T>(key: string, dataFetcher: () => Promise<T> | T, expiry: number) {
  const value = await dataFetcher();
  console.log("setting data into cache........");
  await redis.set(key, JSON.stringify(value), "EX", expiry);
  return value;
}
