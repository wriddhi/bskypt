type Result = {
  count: number;
};

export const receipts = {
  get: async (): Promise<number> => {
    try {
      const response = await fetch("/api/count", { method: "GET" });
      const data = (await response.json()) as Result;
      return data.count;
    } catch {
      return 0;
    }
  },
  incr: async (): Promise<number> => {
    try {
      const response = await fetch("/api/count", { method: "POST" });
      const data = (await response.json()) as Result;
      return data.count;
    } catch {
      return 0;
    }
  },
};
