import LoginButton from "@/components/login-button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useInternetIdentity } from "ic-use-internet-identity";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const router = useRouter()
  const { identity, error } = useInternetIdentity();

  useEffect(() => {
    if (!identity) return;
    void router.navigate({ to: "/" });
  }, [identity, router])

  return (
    <div className="w-full flex flex-col p-10 rounded-xl items-center text-white gap-5 bg-radial-[at_25%_25%] from-cyan-500 to-cyan-800 to-75%">
      <h2>Welcome</h2>
      <div className="text-center">
        Sign in to access this application.
      </div>
      <div className="flex flex-col gap-5">
        <LoginButton />
        {error && <div className="text-sm text-red-500">Error: {error.message}</div>}
      </div>
    </div>
  );
}
