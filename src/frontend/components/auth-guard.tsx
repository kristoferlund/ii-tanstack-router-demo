import { useRouter } from "@tanstack/react-router";
import { useInternetIdentity } from "ic-use-internet-identity";
import { useEffect } from "react";

export function AuthGuard() {
  const router = useRouter();
  const { identity } = useInternetIdentity();

  useEffect(() => {
    if (!identity) {
      void router.invalidate()
    }
  }, [identity, router]);

  return null;
}
