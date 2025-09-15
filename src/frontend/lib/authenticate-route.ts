import { isRedirect, redirect } from "@tanstack/react-router";
import { ensureInitialized } from "ic-use-internet-identity";
import { useBackend } from "./use-backend";

export async function authenticateRoute() {
  try {
    const identity = await ensureInitialized();
    if (!identity) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/login", replace: true });
    }
    await useBackend.ensureInitialized();
    await useBackend.authenticate(identity);
  } catch (e) {
    if (isRedirect(e)) throw e // Re-throw if error is a redirect
    console.error(e);
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: "/error" });
  }
}

