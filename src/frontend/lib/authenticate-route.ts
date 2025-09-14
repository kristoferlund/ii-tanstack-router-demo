import { redirect } from "@tanstack/react-router";
import { ensureInitialized } from "ic-use-internet-identity";

export async function authenticateRoute() {
  try {
    const identity = await ensureInitialized();
    if (identity) {
      return
    }
  } catch (e) {
    console.error(e);
  }
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw redirect({ to: "/login" });
}

