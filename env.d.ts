declare namespace NodeJS {
  interface ProcessEnv {
		UPSTASH_URL: string;
		UPSTASH_PASSWORD: string;
		CLOUDFLARE_EMAIL: string;
		CLOUDFLARE_API_TOKEN: string;
		CLOUDFLARE_ACCOUNT_ID: string;
		CLOUDFLARE_KV_NAMESPACE_ID: string;
  }
}
