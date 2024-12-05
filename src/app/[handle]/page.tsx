import { getProfile } from "@/actions/data/get";
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
  return (
    <Container as="main" className="flex flex-col gap-4">
      <ReceiptPage handle={handle} />
    </Container>
  );
}
