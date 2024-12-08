import { Metadata } from "next";
import { Container } from "@/components/Container";
import { FAQ } from "./_components/FAQ";
import { Links, Socials } from "@/data";
import { RxArrowRight } from "react-icons/rx";

export const metadata: Metadata = {
  title: "Bskypt | FAQ",
  description: "Some questions I thought people might have.",
};

export default function Page() {
  const faq = {
    "Who runs this?": (
      <div>
        My name is Wriddhi. I&apos;m a UI Designer and Full-Stack Developer. I
        also build products for myself.
        <br />
        <a
          href={Links.Work.href}
          target="_blank"
          className="text-primary flex items-center gap-1 animate-pulse font-medium"
        >
          Learn more about me <RxArrowRight />
        </a>
      </div>
    ),
    "Why was this created?": (
      <div>
        I was inspired by GitReceipt.
        <br />
        <a
          href="https://x.com/ankitkr0/status/1858134103792722363"
          target="_blank"
          className="text-primary flex items-center gap-1 animate-pulse font-medium"
        >
          Check this out <RxArrowRight />
        </a>
      </div>
    ),
    "What do I do with my receipt?": (
      <div>
        You can admire it, show it to your friends. You can even tag me on
        Twitter and BlueSky.
        <br />
        <a
          href={Socials.Twitter}
          target="_blank"
          className="text-primary flex items-center gap-1 animate-pulse font-medium"
        >
          Twitter <RxArrowRight />
        </a>
        <a
          href={Socials.BlueSky}
          target="_blank"
          className="text-primary flex items-center gap-1 animate-pulse font-medium"
        >
          BlueSky <RxArrowRight />
        </a>
      </div>
    ),
    "How can I support this project?": (
      <div className="flex gap-1">
        You can get featured on the site by
        <a
          href={Socials.GitHub}
          target="_blank"
          className="text-primary font-medium flex items-center gap-1 animate-pulse"
        >
          sponsoring me <RxArrowRight />
        </a>
      </div>
    ),
  };

  return (
    <Container as="main" className="flex flex-col gap-4">
      <h1 className="text-5xl md:text-6xl font-serif font-medium">
        The answers to the most likely questions.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground font-serif mb-12">
        In all honesty, this is the simplest past-time hobby project in the
        world.
      </p>
      <FAQ faq={faq} />
    </Container>
  );
}
