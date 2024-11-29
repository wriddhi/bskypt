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

export type Props = {
  profile: AppBskyActorGetProfile.Response["data"];
  posts: {
    feed: FeedViewPost[];
    cursor: AppBskyFeedGetAuthorFeed.Response["data"]["cursor"];
  };
};

const getServer = (date: Date) => {
  const hour = date.getHours();

  const contributors: string[] = [
    "Paul Frazee",
    "Eric Bailey",
    "Hailey At",
    "Dan Abramov",
    "Samuel Newman",
    "Ansh",
    "Minseo Lee",
    "GID",
    "Surf Dude",
    "Renah Lee",
    "Mary Ext",
    "Kode Banget",
    "Frudrax Cheng",
    "Bryan Newbold",
    "Takayuki Kusano",
    "Kuwa Lee",
    "João Ferreiro",
    "Ivan Beà",
    "Oops Wtf",
    "Jan-Olof Eriksson",
    "Stanislas Signoud",
    "Gabriella",
    "Cirx1e",
    "Jazco",
  ];

  return contributors[hour % contributors.length];
};

const mostFrequentDay = (timestamps: string[]) => {
  if (!timestamps.length) return "None";
  const dayCount: { [key: string]: number } = {};

  // Iterate through each timestamp
  timestamps.forEach((timestamp) => {
    // Parse the date and get the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const dayOfWeek = new Date(timestamp).toLocaleString("en-US", {
      weekday: "long",
    });

    // Increment the count for the corresponding day
    if (dayCount[dayOfWeek]) {
      dayCount[dayOfWeek]++;
    } else {
      dayCount[dayOfWeek] = 1;
    }
  });

  // Find the day with the maximum frequency
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
  // Convert ISO timestamps to Date objects
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  // Calculate the difference in milliseconds
  const differenceInMillis = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const millisecondsInOneDay = 24 * 60 * 60 * 1000;
  const differenceInDays = differenceInMillis / millisecondsInOneDay;

  // Return the absolute value to ensure positive result
  return Math.abs(differenceInDays);
};

const getTopNWords = (textArray: string[], N = 6) => {
  // List of common predicates to exclude
  const commonWords = new Set([
    "in",
    "a",
    "an",
    "the",
    "of",
    "at",
    "out",
    "to",
    "and",
    "for",
    "on",
    "with",
    "as",
    "by",
    "from",
    "about",
    "is",
    "it",
    "this",
    "that",
    "was",
    "were",
    "be",
    "been",
    "being",
    "i",
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "herself",
    "it",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "who",
    "whom",
    "whose",
    "which",
    "what",
    "that",
    "whoever",
    "whomever",
    "each",
    "every",
    "all",
    "some",
    "any",
    "none",
    "one",
    "two",
    "three",
    "so",
    "but",
    "if",
    "because",
    "while",
    "where",
    "when",
    "how",
    "not",
    "into",
    "during",
    "before",
    "after",
    "above",
    "below",
    "between",
    "under",
    "over",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "why",
    "too",
    "only",
    "very",
    "even",
    "more",
    "most",
    "less",
    "least",
    "own",
    "other",
    "another",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "than",
    "too",
    "very",
    "can",
    "could",
    "have",
    "has",
    "had",
    "having",
    "will",
    "would",
    "shall",
    "should",
    "may",
    "might",
    "must",
    "ought",
    "do",
    "does",
    "did",
    "doing",
    "didn't",
    "doesn't",
    "don't",
    "won't",
    "wouldn't",
    "can't",
    "couldn't",
    "haven't",
    "hasn't",
    "hadn't",
    "won't",
    "mightn't",
    "shouldn't",
    "mustn't",
    "doesn't",
    "didn't",
    "weren't",
  ]);

  // Function to clean the text and remove special characters and emojis
  const cleanText = (text: string): string[] => {
    // Remove all non-alphabetical characters and split the text into words
    return text
      .replace(/[^\w\s]/g, "")
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0 && !commonWords.has(word));
  };

  // Object to store word frequencies
  const wordFrequency: { [key: string]: number } = {};

  // Process each string in the array
  textArray.forEach((text) => {
    const words = cleanText(text);
    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  });

  // Sort words by frequency in descending order
  const sortedWords = Object.entries(wordFrequency)
    .sort(([, freqA], [, freqB]) => freqB - freqA)
    .map(([word]) => word);

  // Return the top 5 words
  return sortedWords.slice(0, N);
};

export function Receipt({ profile, posts }: Props) {
  const receiptRef = useRef<React.ElementRef<"div">>(null);

  const date = new Date();
  const receiptDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const { totalLikes, totalReposts } = posts.feed.reduce(
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
  const dates = posts.feed.map(({ post }) => {
    const record = post.record as Record<string, unknown>;
    return record.createdAt as string;
  });
  const replies = posts.feed.filter(({ reply }) => reply !== undefined).length;
  const topWords = getTopNWords(
    posts.feed.map(({ post }) => {
      const record = post.record as Record<string, unknown>;
      const text = record.text as string;
      return text;
    })
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
    // Use html2canvas to capture the screenshot of the element
    html2canvas(receiptRef.current, {
      backgroundColor: "#000000",
      scale: 10, // Increase the scale to improve the image quality
    }).then((canvas) => {
      // Convert canvas to a data URL (e.g., PNG format)
      const image = canvas.toDataURL("image/png");

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = image;
      link.download = profile.handle + "-bskypt.png"; // Name of the downloaded file
      link.click(); // Simulate a click to start the download
    });
  };

  const goToProfile = () => {
    window.open(profileUrl, "_blank");
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
        <div className="mb-6">
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
        <div className="mb-6">
          <p className="font-bold mb-1">FAVORITE WORDS:</p>
          <p className="break-words capitalize">
            {/* TypeScript, JavaScript, HTML, CSS, Python, Astro */}
            {topWords.map((word, index) =>
              index === 0 ? `${word}` : `, ${word}`
            )}
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
        <div className="border-t border-[#eaeaea] pt-4 text-center text-[#666666]">
          <button onClick={() => goToProfile()}>{profileSlug}</button>
        </div>
      </div>
      <Button
        variant="solid"
        color="primary"
        size="lg"
        className="text-lg font-medium md:w-2/3 lg:w-1/4 mx-auto max-w-3xl"
        onClick={handleDownload}
        endContent={<GrCloudDownload />}
      >
        Download
      </Button>
    </>
  );
}
