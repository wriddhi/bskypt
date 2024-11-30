"use client";

import { FormEvent, useRef } from "react";

import { AtpAgent } from "@atproto/api";
import { Input, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

import { FaBluesky } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { RiReceiptLine } from "react-icons/ri";

import { Container } from "@/components/Container";
import { Receipt, type Props as ReceiptProps } from "./_components/Receipt";

const agent = new AtpAgent({
  service: "https://api.bsky.app",
});

const getProfile = async (handle: string) => {
  const profile = await agent.app.bsky.actor.getProfile({
    actor: handle,
  });
  return profile;
};

const getPosts = async (
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
    feed: cumulativePosts,
    cursor: nextPosts.cursor,
  };
};

export default function Home() {
  const handleRef = useRef<React.ElementRef<"input">>(null);

  const {
    data: { profile, posts } = {},
    mutate: setHandle,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (handle: string) => {
      const { data: profile, success } = await getProfile(handle);
      if (!success) {
        throw new Error("Failed to fetch profile.");
      }
      const { feed: posts, cursor } = await getPosts(handle);

      return {
        profile: profile as ReceiptProps["profile"],
        posts: { feed: posts, cursor } as ReceiptProps["posts"],
      };
    },
  });

  const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
    console.log("handleSubmission");
    event.preventDefault();
    const handle = handleRef.current?.value ?? "";

    if (handle.trim().length === 0) {
      return;
    }
    setHandle(handle);
  };

  return (
    <main className="w-full h-full">
      <Container as="section" className="flex flex-col gap-4">
        <FaBluesky className="text-6xl text-primary mx-auto fill-blue-500" />
        <h1 className="text-5xl md:text-6xl font-serif font-medium text-center">
          BlueSky Receipts
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-serif text-center">
          Enter your BlueSky handle to generate a social receipt for your
          activity.
        </p>
        <form
          onSubmit={handleSubmission}
          className="flex flex-col md:flex-row gap-4 my-4"
        >
          <Input
            required
            isRequired
            ref={handleRef}
            size="lg"
            placeholder="john.bsky.social"
            classNames={{
              inputWrapper: "focus-within:outline-ring bg-white",
            }}
            errorMessage="Please enter a valid BlueSky handle."
            isInvalid={isError}
            autoComplete="username"
            autoFocus
            startContent={<MdAlternateEmail />}
          />
          <Button
            isLoading={isPending}
            variant="solid"
            color="primary"
            size="lg"
            className="text-lg font-medium !min-w-fit"
            type="submit"
            startContent={
              !isPending && <RiReceiptLine className="text-background" />
            }
          >
            Generate
          </Button>
        </form>
        {profile && posts && <Receipt profile={profile} posts={posts} />}
      </Container>
    </main>
  );
}
