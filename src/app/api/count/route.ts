import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_URL,
  token: process.env.UPSTASH_PASSWORD,
});

const key =
  process.env.NODE_ENV === "production" ? "bskypt:count" : "bskypt:dev";

export async function GET() {
  try {
    const count = await redis.get(key);
    return Response.json({ count: count ?? 0 });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function POST() {
  try {
    const count = await redis.incr(key);
    return Response.json({ count });
  } catch {
    return Response.json({ count: 0 });
  }
}
