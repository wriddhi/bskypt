import { Container } from "@/components/Container";
import Image from "next/image";

import { FaCreativeCommons } from "react-icons/fa";
import logo from "@/assets/magnode.svg";

export function Footer() {
  return (
    <Container
      as="footer"
      className="flex flex-col gap-4 mt-40 lg:mt-0 relative"
    >
      <span className="text-primary font-medium flex items-center gap-1">
        <FaCreativeCommons className="text-xl" /> {new Date().getFullYear()}{" "}
        Bskypt. No rights reserved.
      </span>
      <p className="text-muted-foreground text-sm">
        Tha&apos;s right dawg, no rights. This is just a fun project. Bskypt is
        not affiliated with BlueSky Social, nor is it endorsed or sponsored by
        them. This website was crafted using Next.js & TailwindCSS. Inspiration
        from{" "}
        <a
          href="https://gitreceipt.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-primary font-medium border-b border-primary border-dashed"
        >
          GitReceipt
        </a>{" "}
        by{" "}
        <a
          href="https://twitter.com/ankitkr0"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-primary font-medium border-b border-primary border-dashed"
        >
          @ankitkr0
        </a>
        .
      </p>
      <Image
        loading="eager"
        priority={true}
        draggable={false}
        className="w-full -translate-y-1.5 select-none abosolute bottom-0"
        src={logo}
        alt="logo"
      />
    </Container>
  );
}
