import { Metadata } from "next";
import { Container } from "@/components/Container";
import { Socials } from "@/data";
import { RxArrowRight } from "react-icons/rx";

export const metadata: Metadata = {
  title: "Bskypt | Plans",
  description: "I have some pretty cool features planned. Check them out!",
};

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <Container as="section" className="flex flex-col gap-4">
        <h1 className="text-5xl md:text-6xl font-serif font-medium">
          Plans for the future.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-serif">
          I am planning on implementing a few ideas:
        </p>
        <ul className="[list-style-type:'⏤_'] list-inside text-lg md:text-xl text-muted-foreground font-serif">
          <li>
            Spotify style
            <span className="text-primary"> Wrapped </span>
            or a YouTube Music style
            <span className="text-primary"> Recap</span>.
          </li>
          <li>
            A<span className="text-primary"> Leadboard</span> to keep track of
            total number of receipts.
          </li>
        </ul>
        <p className="text-lg md:text-xl text-muted-foreground font-serif">
          It would be super cool to have some designers work with me on this. If
          you&apos;re interested,{" "}
          <a
            href={Socials.Twitter}
            target="_blank"
            className="text-primary font-medium inline-flex items-center gap-1 animate-pulse"
          >
            hit me up dawg <RxArrowRight />
          </a>
        </p>
      </Container>
    </main>
  );
}
