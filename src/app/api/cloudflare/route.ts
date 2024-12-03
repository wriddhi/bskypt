import Cloudflare from "cloudflare";

const cloudflare = new Cloudflare({
  apiEmail: process.env["CLOUDFLARE_EMAIL"], // This is the default and can be omitted
  apiToken: process.env["CLOUDFLARE_API_TOKEN"],
});

const account_id = process.env.CLOUDFLARE_ACCOUNT_ID;

const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;

type RedisKey = "bskypt:dev" | "bskypt:test" | "bskypt:count";

const keys = {
  development: "bskypt:dev",
  test: "bskypt:test",
  production: "bskypt:count",
} as const satisfies Record<typeof process.env.NODE_ENV, RedisKey>;

const key = keys[process.env.NODE_ENV];

export async function GET() {
  const response = await cloudflare.kv.namespaces.values.get(namespaceId, key, {
    account_id,
  });

  const count = (await response.json()) as number;

  return Response.json({ count });
}

export async function POST() {
  const response = await cloudflare.kv.namespaces.values.get(namespaceId, key, {
    account_id,
  });

  const oldCount = (await response.json()) as number;
  const count = oldCount + 1;

  const metadata = {};

  await cloudflare.kv.namespaces.values.update(namespaceId, key, {
    account_id,
    value: count.toString(),
    metadata: JSON.stringify(metadata),
  });

  return Response.json({ count });
}
