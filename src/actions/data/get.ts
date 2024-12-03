import { AtpAgent } from "@atproto/api";
import { type Props as ReceiptProps } from "@/app/_components/Receipt";

const agent = new AtpAgent({
  service: "https://api.bsky.app",
});

export const getProfile = async (handle: string) => {
  try {
    const profile = await agent.app.bsky.actor.getProfile({
      actor: handle,
    });
    return { profile: profile, error: null };
  } catch {
    return { profile: null, error: "Failed to fetch profile." };
  }
};

export const getPosts = async (
  handle: string,
  cursor: string = "",
  first: boolean = true
): Promise<ReceiptProps["posts"]> => {
  if (!first && !cursor) {
    return { feed: [], cursor: "" };
  }

  const posts = await agent.getAuthorFeed({
    actor: handle,
    filter: "posts_and_author_threads",
    limit: 100,
    cursor,
  });

  const nextPosts = await getPosts(handle, posts.data.cursor, false);

  const cumulativePosts = posts.data.feed.concat(nextPosts.feed);

  return {
    feed: cumulativePosts as ReceiptProps["posts"]["feed"],
    cursor: nextPosts.cursor,
  };
};
