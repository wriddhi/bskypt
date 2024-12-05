"use client";
import { receipts } from "@/actions/count";
import { Receipt, Props } from "@/app/_components/Receipt";

export function ReceiptPage({ profile, posts }: Props) {
  receipts.incr();
  return <Receipt profile={profile} posts={posts} />;
}
