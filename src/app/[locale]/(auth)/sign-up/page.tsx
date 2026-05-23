import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return <SignUpForm callbackUrl={callbackUrl ?? null} />;
}
