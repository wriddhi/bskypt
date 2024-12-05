"use client";
import { receipts } from "@/actions/count";
import { getPosts, getProfile } from "@/actions/data/get";
import { Receipt, Props as ReceiptProps } from "@/app/_components/Receipt";
import { Container } from "@/components/Container";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export function ReceiptPage({ handle }: { handle: string }) {
  const {
    data: { profile, posts },
    isFetching,
  } = useQuery<{
    profile: ReceiptProps["profile"] | undefined;
    posts: ReceiptProps["posts"] | undefined;
  }>({
    queryKey: ["receipt", handle],
    queryFn: async () => {
      receipts.incr();
      const { profile, error } = await getProfile(handle);
      if (error || !profile || !profile.success) {
        throw new Error("Failed to fetch profile.");
      }
      const { feed: posts, cursor } = await getPosts(handle);

      return {
        profile: profile?.data as ReceiptProps["profile"],
        posts: { feed: posts, cursor } as ReceiptProps["posts"],
      };
    },
    initialData: {
      profile: undefined,
      posts: undefined,
    },
    retry: 0,
  });

  if (isFetching) {
    return (
      <Container as="main" className="flex flex-col gap-4">
        <h1 className="text-5xl md:text-6xl font-serif font-medium">
          Let us cook.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-serif">
          Please wait while we print your receipt.
        </p>
        <Skeleton className="w-full h-96 p-2" />
      </Container>
    );
  }

  if (!profile || !posts) {
    return redirect("/404");
  }

  return <Receipt profile={profile} posts={posts} />;
}
