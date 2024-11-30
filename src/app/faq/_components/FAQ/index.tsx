"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import type { ReactNode } from "react";

type Props = {
  faq: Record<string, ReactNode>;
};

export const FAQ = ({ faq }: Props) => {
  return (
    <Accordion variant="light" className="bg-background rounded-3xl px-4">
      {Object.entries(faq).map(([key, value]) => (
        <AccordionItem
          key={key}
          aria-label={key}
          title={key}
          className="text-sm text-muted-foreground"
        >
          {value}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
