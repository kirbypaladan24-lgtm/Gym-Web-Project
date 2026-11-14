import type { Metadata } from "next";
import { JoinFlow } from "./join-flow";

export const metadata: Metadata = {
  title: "Register online",
  description:
    "Register your interest in an AV Fitness Gym membership — choose a branch and plan, and complete payment once the gym confirms its supported methods.",
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return <JoinFlow initialPlanId={plan} />;
}
