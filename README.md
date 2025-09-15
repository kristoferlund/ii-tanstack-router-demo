# ii-tanstack-router-demo — Internet Identity + ic-use-actor + TanStack Router demo

A minimal demo showing how to integrate Internet Identity (`ic-use-internet-identity`) and typed canister hooks (`ic-use-actor`) into a React + Vite application that uses TanStack Router. The repository demonstrates the recommended pattern: initialize Internet Identity at the app root, restore any cached identity, wait for actor hooks to initialize, then authenticate actors with the restored identity (useful for route guards / pre-loaders).

## Overview

- Purpose: show a correct, practical wiring of Internet Identity + `ic-use-actor` in a Vite + React app that uses TanStack Router.
- Demonstrates: restoring cached identity, initializing typed actor hooks, authenticating actors before loading protected routes.
- Includes local development support for a local Internet Identity canister.

## Features

- Root `InternetIdentityProvider` mounted at the app root.
- Typed actor hooks created with `ic-use-actor` and authenticated with the restored identity.
- Example `beforeLoad`/pre-loader usage with TanStack Router to ensure identity and actors before route navigation.
- Local II support: when running against a local `dfx` network the demo points to the local Internet Identity canister.

## Live demo

https://bervn-5aaaa-aaaas-qbyna-cai.icp0.io/

## Quick start

### Prerequisites

- `pnpm`
- (For local canister development) `dfx` and a local Internet Computer replica
- Node.js

### Install dependencies

```bash
pnpm install
```

### Start local replica (optional, for local canisters)

```bash
dfx start --background
```

### Deploy canisters (optional)

```bash
dfx deploy
```

### Start the frontend

```bash
pnpm run dev
```

## Local Internet Identity

The demo automatically uses a local Internet Identity URL when `process.env.DFX_NETWORK === "local"`. The app's `src/frontend/main.tsx` demonstrates the pattern:

```tsx
<InternetIdentityProvider
  loginOptions={{
    identityProvider:
      process.env.DFX_NETWORK === "local"
        ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY || ""}.localhost:4943`
        : "https://identity.ic0.app",
  }}
>
  <RouterProvider router={router} />
</InternetIdentityProvider>
```

When running locally, ensure `CANISTER_ID_INTERNET_IDENTITY` is available in the environment (or let `dfx` provide it).

## Router integration (TanStack Router)

Key idea: always await the identity initialization first, then ensure actor hooks are initialized, then authenticate actor hooks with the identity — perform these steps in a route `beforeLoad` / pre-loader so protected routes only render after these steps complete.

Minimal example (route `beforeLoad`):

```ts
import { ensureInitialized as ensureIdentityInitialized } from "ic-use-internet-identity";
import { ensureAllInitialized, authenticateAll } from "ic-use-actor";
import { redirect } from "@tanstack/react-router";

export const protectedRoute = createRoute({
  path: "dashboard",
  async beforeLoad() {
    // 1) Restore any cached identity
    const identity = await ensureIdentityInitialized();
    if (!identity) throw redirect({ to: "/login" });

    // 2) Wait for actor hooks to finish anonymous initialization
    await ensureAllInitialized();

    // 3) Authenticate registered actor hooks with the restored identity
    await authenticateAll(identity);
  },
  component: Dashboard,
});
```

> Important: `beforeLoad` runs during navigation and does not automatically react to later auth changes — inside components observe auth state reactively.

## Login flow (UI)

Use the `useInternetIdentity()` hook from `ic-use-internet-identity` inside components to trigger `login()` during a user interaction (for example, on a button click). The hook exposes `login()`, `clear()`, `status`, `error`, `identity` and convenience booleans (`isIdle`, `isLoggingIn`, etc.).

Attach the restored identity to your actor hooks by calling each hook's `authenticate(identity)`; the `ic-use-actor` helper `authenticateAll(identity)` can authenticate all registered hooks at once.

## Project structure

- `src/frontend` — React app, components, routes, `main.tsx` (where `InternetIdentityProvider` is mounted).
- `src/backend` — Rust canister (simple greet example used by the template).
- `routeTree.gen.ts` — generated TanStack Router route tree used by the demo.

## Notes

- The repository references helper libraries as local workspace packages in `package.json` for local development:
  - `ic-use-actor` and `ic-use-internet-identity` (look for `file:` entries in `package.json`).
- Recent changes in this demo:
  - Use local Internet Identity for authentication when running locally.
  - Use `ic-use-actor` for backend calls and demonstrate authenticating actors before protected routes load.
- If you prefer published packages instead of local workspace packages, replace the `file:` dependencies in `package.json` with the npm package names.

## Contributing

Small, focused PRs are welcome. See `AGENTS.md` for recommended local dev commands and constraints when working with canisters.

## License

This demo is provided under the MIT License. See the `LICENSE` file for details.
