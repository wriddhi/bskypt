"use client";

import { Container } from "@/components/Container";
import { Button } from "@nextui-org/react";

import { TfiReload } from "react-icons/tfi";

export default function Error() {
  return (
    <Container as="main" className="flex flex-col gap-4">
      <h1 className="text-5xl md:text-6xl font-serif font-medium">
        You have been diagnosed with a case of the 404s.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground font-serif">
        It looks like you entered a BlueSky handle that does not exist.
      </p>
      <Button
        variant="solid"
        color="primary"
        className="w-full lg:w-fit font-medium group"
        endContent={
          <TfiReload className="group-focus:animate-spinner-ease-spin" />
        }
      >
        Try again
      </Button>
    </Container>
  );
}
