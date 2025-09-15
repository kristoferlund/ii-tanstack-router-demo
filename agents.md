# AGENTS.md — ii-tanstack-router-demo (agent guide)

Short guide for AI agents and contributors working on this demo repository.

Purpose

This repo is a small demo that shows how to wire Internet Identity (`ic-use-internet-identity`) and typed canister hooks (`ic-use-actor`) into a React + Vite application that uses TanStack Router. The goal is to demonstrate a safe, repeatable pattern for: restoring a cached identity, initializing actor hooks (anonymous agents), and authenticating those actors with the restored identity before protected routes load.

Do

- Use `pnpm` for JavaScript/TypeScript tasks. Keep edits small and focused.
- Prefer file-scoped checks and changes (typecheck/lint/test only the files you modify).
- Use generated canister bindings in `src/backend/declarations` and `src/frontend/declarations` for canister calls.
- After `.did` or Rust changes, regenerate bindings (see below) and update frontend code that depends on generated types.
- Follow the router-first pattern: ensure Internet Identity initialization, call `ensureAllInitialized()`, then `authenticateAll(identity)` in route pre-loaders when protecting routes.

Don't

- Hardcode canister IDs, secrets, or production credentials in source. Use `.env` / `CANISTER_` variables.
- Add heavy dependencies without approval from a repo maintainer.
- Start/stop `dfx`, run `dfx deploy`, or change identities without explicit user consent (the user typically runs these locally).

File-scoped commands (preferred — run these on only the files you changed)

- Type check a single file: `pnpm exec tsc --noEmit path/to/file.tsx`
- Lint a single file and auto-fix: `pnpm exec eslint --fix path/to/file.tsx`
- Format a single file (if configured): `pnpm exec prettier --write path/to/file.tsx`
- Run a single test: `pnpm exec vitest run path/to/file.test.ts`

Full/project commands (ask first)

- Install dependencies: `pnpm install`
- Full build (typecheck + bundle): `pnpm run build` (runs `tsc -b && vite build`)
- Start frontend dev server: `pnpm run dev`
- Start local replica (USER must run): `dfx start --background`
- Deploy canisters (USER must run): `dfx deploy`

Canister / bindings workflow

When you change canister IDL (`.did`) or backend Rust code, follow these steps:

1. Update the `.did` file or Rust source in `src/backend`.
2. Regenerate TypeScript/JS bindings for the canister:
   - Preferred: `dfx generate` (or `dfx deploy` when you want to build + deploy locally).
3. Update any frontend imports that rely on the generated bindings (`src/frontend/declarations` or `src/backend/declarations`).
4. Run file-scoped `tsc` and `eslint` on changed files.
5. Run `pnpm run build` to verify the project builds end-to-end.

Notes:
- Do not hardcode canister IDs — read them from `process.env.CANISTER_*` or from generated declarations.
- If you add a new canister hook, also add authentication in the router pre-loader (see Router integration).

Router integration pattern (recommended)

- Always call `ensureInitialized()` from `ic-use-internet-identity` to restore any cached identity first.
- Then wait for actor hooks to initialize: `await ensureAllInitialized()` from `ic-use-actor`.
- Finally authenticate actor hooks: `await authenticateAll(identity)`.

Example (route `beforeLoad` / pre-loader):

```ts
import { ensureInitialized as ensureIdentityInitialized } from "ic-use-internet-identity";
import { ensureAllInitialized, authenticateAll } from "ic-use-actor";
import { redirect } from "@tanstack/react-router";

export const protectedRoute = createRoute({
  async beforeLoad() {
    const identity = await ensureIdentityInitialized();
    if (!identity) throw redirect({ to: "/login" });

    await ensureAllInitialized();
    await authenticateAll(identity);
  },
  component: Dashboard,
});
```

Local workspace packages

This repo uses local workspace packages (see `package.json`): `ic-use-actor` and `ic-use-internet-identity` are referenced with `file:` paths for local development. To use published packages instead, update `package.json` to point to the npm package names and run `pnpm install`.

Testing & CI

- Keep PRs small and add tests for new behavior when reasonable.
- Run file-scoped tests locally before opening a PR.
- CI should run the full `pnpm run build` and test suite; ensure the build is green before requesting review.

PR checklist (short)

- File-scoped lint & type checks: green
- Unit tests for new behavior: added and green
- Small, focused diff with a one-line summary that focuses on the "why"

Agent workflow (recommended plan template)

When asked to implement a feature or fix:

1. Read the relevant files and recent commits to understand context.
2. Create a short todo/plan (3–6 steps) and show it to the user if the task is non-trivial.
3. Implement changes locally, preferring file-scoped edits.
4. Run `pnpm exec tsc --noEmit` on changed files and `eslint` on changed files.
5. Add tests when appropriate and run them.
6. Summarize the change and ask whether to commit, run full build, or create a PR.

Safety & permissions

- Allowed without prompt: reading repository files, running file-scoped `tsc`, `eslint`, and `vitest` on single files.
- Ask first: `pnpm install`, `git push`, `dfx start`, `dfx deploy`, editing secrets, or taking destructive actions (deleting files or branches).

When stuck

- Ask clarifying questions before making large changes.
- If unsure about the canister workflow or identities, request permission to run `dfx` or ask the user to run the command locally.

If you want, I can (choose one):

- Add small shell scripts for common tasks (`dev`, `build`, `generate-bindings`).
- Add a short reference link from `README.md` to this file.
- Add a minimal PR template / CONTRIBUTING checklist.
