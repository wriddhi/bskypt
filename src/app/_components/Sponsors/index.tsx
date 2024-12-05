"use client";

import Link from "next/link";

import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { getProfile } from "@/actions/data/get";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/Container";
import { User, Skeleton, Chip } from "@nextui-org/react";
import { cn } from "@/lib/utils";

import { RxArrowRight } from "react-icons/rx";
import { Socials } from "@/data";
import { sponsors } from "@/sponsors";

const getFeaturedProfiles = async (): Promise<ProfileViewDetailed[]> => {
  const profiles = await Promise.all(
    sponsors.map((handle) => getProfile(handle))
  );
  console.log("Raw profiles", profiles);
  const validProfiles = profiles
    .filter(({ profile, error }) => profile && profile.success && !error)
    .map(({ profile }) => profile!.data);
  console.log("Valid profiles", validProfiles);
  return validProfiles;
};

export const Sponsors = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["sponsors"],
    queryFn: getFeaturedProfiles,
    initialData: [],
  });

  return (
    <Container
      as="article"
      className="flex flex-col justify-center gap-4 max-w-7xl h-fit"
    >
      <section
        className={cn(
          "flex-1 w-full rounded-3xl block",
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-1 divide-x-1 divide-muted"
        )}
      >
        {isFetching &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-start items-start gap-4 bg-background rounded-3xl p-4 min-h-56"
            >
              <Skeleton className="size-12 rounded-full" />
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-5 rounded-xl w-full" />
                <Skeleton className="h-3 rounded-xl w-16" />
              </div>
            </div>
          ))}
        {!isFetching &&
          data.length &&
          data.map((profile) => {
            const elongatedDescription =
              profile.description ?? "" + profile.description + profile.handle;
            console.log("Profile", elongatedDescription);
            return (
              <Link
                href={`https://bsky.app/profile/${profile.handle}`}
                key={profile.handle}
                target="_blank"
                className="flex flex-col justify-start items-start gap-4 bg-background rounded-3xl p-4"
              >
                <div className="flex items-center justify-between w-full">
                  <User
                    about={profile.description}
                    key={profile.handle}
                    name={profile.displayName}
                    description={`@` + profile.handle}
                    avatarProps={{
                      src: profile.avatar,
                    }}
                    classNames={{
                      name: "text-card-foreground font-semibold",
                      description: "text-muted-foreground",
                    }}
                  />
                  <Chip color="primary">
                    {profile.handle === "wriddhi.com" ? "Creator" : "Featured"}
                  </Chip>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col items-center font-medium text-lg">
                    {profile.followersCount}
                    <span className="text-muted-foreground text-xs uppercase">
                      followers
                    </span>
                  </div>
                  <div className="flex flex-col items-center font-medium text-lg">
                    {profile.followsCount}
                    <span className="text-muted-foreground text-xs uppercase">
                      follows
                    </span>
                  </div>
                  <div className="flex flex-col items-center font-medium text-lg">
                    {profile.postsCount}
                    <span className="text-muted-foreground text-xs uppercase">
                      posts
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {elongatedDescription}
                </div>
              </Link>
            );
          })}
        <div className="flex flex-col justify-start items-start gap-4 bg-background rounded-3xl p-4">
          <h2 className="text-3xl font-medium animate-pulse">Grab a spot.</h2>
          <p>
            Want to be featured here? <br />
            <span className="text-muted-foreground">Sponsor me on GitHub.</span>
          </p>
          <div className="w-full flex flex-row gap-4 md:gap-0 items-center justify-between font-serif divide-x-1">
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              <span className="text-muted-foreground text-xs flex flex-col md:flex-row items-center gap-0.5">
                <b className="text-primary text-xl">$50</b>
                <span className="hidden md:flex">-</span>
                <span>permanently</span>
              </span>
              <Link
                href={Socials.Sponsor.once}
                className="size-16 bg-primary/90 hover:bg-primary text-background rounded-full p-4 group"
              >
                <RxArrowRight className="w-full h-full group-hover:-rotate-45 transition-all" />
              </Link>
            </div>
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              <span className="text-muted-foreground text-xs flex flex-col md:flex-row items-center gap-0.5">
                <b className="text-primary text-xl">$5</b>
                <span className="hidden md:flex">-</span>
                <span>monthly</span>
              </span>
              <Link
                href={Socials.Sponsor.recurring}
                className="size-16 bg-primary/90 hover:bg-primary text-background rounded-full p-4 group"
              >
                <RxArrowRight className="w-full h-full group-hover:-rotate-45 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
