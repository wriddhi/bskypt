import { getProfile, getPosts } from "@/actions/data/get";
import { type Props as ReceiptProps } from "@/app/_components/Receipt";
import { Container } from "@/components/Container";
import { Metadata } from "next";
import { ReceiptPage } from "./_components/ReceiptPage";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;

  const { profile, error } = await getProfile(handle);

  if (error || !profile || !profile.success) {
    return {
      title: `Bskypt | Error`,
      description: `You entered an invalid handle.`,
    };
  }

  return {
    title: `Bskypt | Receipt for ${profile.data.displayName}`,
    description: `Checkout this cool social receipt for ${profile.data.displayName} on Bskypt.`,
  };
}

export default async function Page({ params }: Props) {
  const { handle } = await params;

  const { profile, error } = await getProfile(handle);
  if (error || !profile || !profile.success) {
    throw new Error("You entered an invalid handle.");
  }
  const { feed: posts, cursor } = await getPosts(handle);

  const props = JSON.parse(
    JSON.stringify({
      profile: profile.data as ReceiptProps["profile"],
      posts: { feed: posts, cursor } as ReceiptProps["posts"],
    })
  );

  return (
    <Container as="main" className="flex flex-col gap-4">
      <ReceiptPage profile={props.profile} posts={props.posts} />
    </Container>
  );
}
