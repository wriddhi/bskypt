type Result = {
  count: number;
};

const Api = {
  Cloudflare: "/api/cloudflare",
  Upstash: "/api/upstash",
};

export const receipts = {
  get: async (): Promise<number> => {
    try {
      const response = await fetch(Api.Cloudflare, { method: "GET" });
      const data = (await response.json()) as Result;
      return data.count;
    } catch {
      return 0;
    }
  },
  incr: async (): Promise<number> => {
    try {
      const response = await fetch(Api.Cloudflare, { method: "POST" });
      const data = (await response.json()) as Result;
      return data.count;
    } catch {
      return 0;
    }
  },
};
