import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_URL,
  token: process.env.UPSTASH_PASSWORD,
});

export async function GET() {
  const count = await redis.get("bskypt:count");
  return Response.json({ count: count ?? 0 });
}

export async function POST() {
  const count = await redis.incr("bskypt:count");
  return Response.json({ count });
}
