import { getProfile } from "@/actions/data/get";
import { ReceiptPage } from "./_components/ReceiptPage";
import { Metadata } from "next";

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
  return <ReceiptPage handle={handle} />;
}
