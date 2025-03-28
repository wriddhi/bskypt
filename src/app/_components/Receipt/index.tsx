"use client";

import { useRef } from "react";
import type {
  AppBskyActorGetProfile,
  AppBskyFeedGetAuthorFeed,
} from "@atproto/api";
import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

import html2canvas from "html2canvas";

import { Button } from "@nextui-org/react";
import { GrCloudDownload } from "react-icons/gr";

import { filterCommonWords } from "@/lib/utils";
import { maintainers } from "@/data";
import { RxShare1 } from "react-icons/rx";
import { FaBluesky } from "react-icons/fa6";

type CompleteView = FeedViewPost & {
  post: {
    record: {
      $type: "app.bsky.feed.post";
      createdAt: string; // ISO 8601 timestamp
      embed: {
        $type: "app.bsky.embed.external";
        external: {
          description: string;
          thumb: {
            $type: "blob";
            ref: {
              $link: string;
            };
            mimeType: string;
            size: number; // File size in bytes
          };
          title: string;
          uri: string; // URL to the external content
        };
      };
      langs: string[]; // Array of language codes
      text: string; // Post content
    };
  };
};

export type Props = {
  profile: AppBskyActorGetProfile.Response["data"];
  posts: {
    feed: CompleteView[];
    cursor: AppBskyFeedGetAuthorFeed.Response["data"]["cursor"];
  };
};

const getServer = (date: Date) => {
  const hour = date.getHours();
  return maintainers[hour % maintainers.length];
};

const mostFrequentDay = (timestamps: string[]) => {
  if (!timestamps.length) return "None";
  const dayCount: { [key: string]: number } = {};

  timestamps.forEach((timestamp) => {
    const dayOfWeek = new Date(timestamp).toLocaleString("en-US", {
      weekday: "long",
    });

    if (dayCount[dayOfWeek]) {
      dayCount[dayOfWeek]++;
    } else {
      dayCount[dayOfWeek] = 1;
    }
  });

  let maxCount = 0;
  let mostFrequent = "";
  for (const day in dayCount) {
    if (dayCount[day] > maxCount) {
      maxCount = dayCount[day];
      mostFrequent = day;
    }
  }

  return mostFrequent;
};

const daysSince = (startTimestamp: string, endTimestamp: string) => {
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  const differenceInMillis = endDate.getTime() - startDate.getTime();

  const millisecondsInOneDay = 24 * 60 * 60 * 1000;
  const differenceInDays = differenceInMillis / millisecondsInOneDay;

  return Math.abs(differenceInDays);
};

const getTopNWords = (textArray: string[], N = 6) => {
  const cleanText = (text: string): string[] => {
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter(filterCommonWords)
      .filter((word) => /^[\p{L}\p{N}\s]+$/u.test(word)); // Keep only words with letters, numbers, and spaces
  };

  const wordFrequency: { [key: string]: number } = {};

  textArray.forEach((text) => {
    const words = cleanText(text);
    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  });

  const sortedWords = Object.entries(wordFrequency)
    .sort(([, freqA], [, freqB]) => freqB - freqA)
    .map(([word]) => word);

  return sortedWords.slice(0, N);
};

export function Receipt({ profile, posts }: Props) {
  const receiptRef = useRef<React.ElementRef<"div">>(null);

  const selfPosts = posts.feed.filter(
    ({ post }) => post.author.handle === profile.handle
  );

  const date = new Date();
  const receiptDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const { totalLikes, totalReposts } = selfPosts.reduce(
    (acc, { post }) => {
      return {
        totalLikes: acc.totalLikes + (post.likeCount ?? 0),
        totalReposts:
          acc.totalReposts + (post.repostCount ?? 0) + (post.quoteCount ?? 0),
      };
    },
    {
      totalLikes: 0,
      totalReposts: 0,
    }
  );
  const dates = posts.feed.map(({ post }) => post.record.createdAt);
  const replies = posts.feed.filter(({ reply }) => reply !== undefined).length;
  const topWords = getTopNWords(
    posts.feed.map(({ post }) => post.record.text?.trim() ?? "")
  );
  const profileUrl = `https://bsky.app/profile/${profile.handle}`;
  const profileSlug = `bsky.app/profile/${profile.handle}`;

  const randomCode = () => Math.floor(Math.random() * 100000);

  const generateCouponCode = (length: number = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let couponCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }
    return couponCode;
  };

  const formatDateTime = () => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes
    const seconds = date.getSeconds().toString().padStart(2, "0"); // Ensure two digits for seconds
    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0"); // 12-hour format
    const time = `${formattedHours}:${minutes}:${seconds} ${period}`;

    return time;
  };

  const postsPerWeek = () => {
    const totalPosts = profile.postsCount ?? 0;
    const startDate = profile.createdAt;
    const endDate = date.toISOString();

    const days = startDate ? daysSince(startDate, endDate) : 1;

    const weeks = Math.ceil(days / 7);
    return Math.ceil(totalPosts / weeks);
  };

  const handleDownload = () => {
    if (!receiptRef.current) return;
    html2canvas(receiptRef.current, {
      backgroundColor: "#000000",
      scale: 10, // Increase the scale to improve the image quality
    }).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = profile.handle + "-bskypt.png";
      link.click();
    });
  };

  const goToProfile = () => {
    window.open(profileUrl, "_blank");
  };

  const share = () => {
    const intentUrl = `https://bsky.app/intent/compose?text=Check out my BlueSky receipt at bskypt.vercel.app/${profile.handle}`;
    window.open(intentUrl, "_blank");
  };

  return (
    <>
      <div
        ref={receiptRef}
        className="w-full md:w-fit md:max-w-lg mt-4 mx-auto bg-white shadow-lg p-8 font-mono text-sm relative receipt-edge"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-1">BLUESKY RECEIPT</h2>
          <p className="text-[#666666] mb-1 uppercase">{receiptDate}</p>
          <p className="text-[#666666]">ORDER #{randomCode()}</p>
        </div>
        <div className="mb-6 text-center">
          <p className="font-bold uppercase">CUSTOMER: {profile.displayName}</p>
          <a className="text-[#666666]">@{profile.handle}</a>
        </div>
        <div className="border-t border-b border-[#eaeaea] py-4 mb-6 space-y-2">
          <div className="flex justify-between">
            <span>POSTS</span>
            <span className="font-bold">{profile.postsCount}</span>
          </div>
          <div className="flex justify-between">
            <span>LIKES EARNED</span>
            <span className="font-bold">{totalLikes}</span>
          </div>
          <div className="flex justify-between">
            <span>POST REPOSTS</span>
            <span className="font-bold">{totalReposts}</span>
          </div>
          <div className="flex justify-between">
            <span>FOLLOWERS</span>
            <span className="font-bold">{profile.followersCount}</span>
          </div>
          <div className="flex justify-between">
            <span>FOLLOWING</span>
            <span className="font-bold">{profile.followsCount}</span>
          </div>
        </div>
        <div className="border-b border-[#eaeaea] pb-4 mb-6">
          <p className="font-bold mb-1">FAVORITE WORDS:</p>
          <p className="break-words capitalize">
            {topWords.length > 0
              ? topWords.map((word, index) =>
                  index === 0 ? `${word}` : `, ${word}`
                )
              : "None"}
          </p>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="font-bold">MOST ACTIVE DAY:</span>
            <span>{mostFrequentDay(dates).trim() ?? "Hello"}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>REPLIES (ALL):</span>
            <span>{replies}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">POSTS PER WEEK:</span>
            <span>{postsPerWeek()}</span>
          </div>
        </div>
        <div className="text-center mb-6 text-[#666666]">
          <p>Served by: {getServer(date)}</p>
          <p>{formatDateTime()}</p>
        </div>
        <div className="text-center mb-6">
          <p className="font-bold">COUPON CODE: {generateCouponCode()}</p>
          <p className="text-[#666666]">Save for your next post!</p>
        </div>
        <div className="text-left mb-6 space-y-1">
          <p>CARD #: **** **** **** {date.getFullYear()} </p>
          <p>AUTH CODE: {randomCode()}</p>
          <p className="uppercase">CARDHOLDER: {profile.displayName}</p>
        </div>
        <div className="text-center mb-6 font-bold">
          <p>THANK YOU FOR POSTING!</p>
        </div>
        <div className="border-t border-[#eaeaea] pt-4 text-center text-[#666666] break-all text-xs md:text-sm">
          <button onClick={() => goToProfile()}>{profileSlug}</button>
        </div>
      </div>
      <section className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full mx-auto max-w-sm">
        <Button
          variant="solid"
          color="primary"
          size="lg"
          className="text-lg font-medium w-full max-w-xs"
          onClick={handleDownload}
          endContent={<GrCloudDownload />}
        >
          Download
        </Button>
        <Button
          variant="shadow"
          color="default"
          size="lg"
          className="text-lg font-medium w-full max-w-xs"
          onClick={share}
          startContent={<RxShare1 />}
          endContent={<FaBluesky />}
        >
          Share on
        </Button>
      </section>
    </>
  );
}
