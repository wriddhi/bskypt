"use client";

import { Container } from "@/components/Container";
import { Skeleton } from "@nextui-org/react";

export default function Loading() {
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
