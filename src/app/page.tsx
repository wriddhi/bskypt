"use client";

import { FormEvent, useRef } from "react";

import { Input, Button, Skeleton } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { FaBluesky } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { RiReceiptLine } from "react-icons/ri";

import { Container } from "@/components/Container";
import { Receipt, type Props as ReceiptProps } from "./_components/Receipt";
import { Sponsors } from "./_components/Sponsors";

import { getProfile, getPosts } from "@/actions/data/get";
import { receipts } from "@/actions/count";
import { queryClient } from "@/providers";

import CountUp from "react-countup";

export default function Home() {
  const handleRef = useRef<React.ElementRef<"input">>(null);

  const { data: count } = useQuery({
    queryKey: ["count"],
    queryFn: receipts.get,
    initialData: 0,
  });

  const {
    data: { profile, posts } = {},
    mutate: setHandle,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (handle: string) => {
      const { profile, error } = await getProfile(handle);
      if (error || !profile || !profile.success) {
        throw new Error("Failed to fetch profile.");
      }
      const { feed: posts, cursor } = await getPosts(handle);

      return {
        profile: profile.data as ReceiptProps["profile"],
        posts: { feed: posts, cursor } as ReceiptProps["posts"],
      };
    },
    onSuccess: () => {
      queryClient.setQueryData(["count"], (count: number) => count + 1);
      receipts.incr();
    },
  });

  const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const handle = handleRef.current?.value ?? "";

    if (handle.trim().length === 0) {
      return;
    }
    setHandle(handle);
  };

  return (
    <main className="w-full h-full">
      <Container
        as="section"
        className="flex flex-col gap-4 py-8 md:p-12 lg:py-12"
      >
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
        {isPending && <Skeleton className="w-full h-96 p-2" />}
        {profile && posts && <Receipt profile={profile} posts={posts} />}
      </Container>
      <Sponsors />
      <Container
        as="section"
        className="flex flex-col gap-4 justify-center items-center"
      >
        <h3 className="text-3xl md:text-4xl font-serif font-medium text-center">
          Total Receipts Generated{" "}
          <span className="text-muted-foreground">since inception</span>
        </h3>
        <CountUp
          separator=","
          start={0}
          end={count}
          duration={3}
          enableScrollSpy
          scrollSpyDelay={1}
          scrollSpyOnce={true}
        >
          {({ countUpRef }) => (
            <span className="text-8xl md:text-9xl" ref={countUpRef} />
          )}
        </CountUp>
        <a
          href="https://www.producthunt.com/posts/bskypt?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bskypt"
          target="_blank"
        >
          <picture>
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=672945&theme=dark"
              alt="Bskypt - BlueSky&#0032;Social&#0032;receipts | Product Hunt"
              width={250 * 0.75}
              height={54 * 0.75}
            />
          </picture>
        </a>
      </Container>
    </main>
  );
}
