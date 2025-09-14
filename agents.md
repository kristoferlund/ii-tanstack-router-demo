# AGENTS.md — ic-vite-react-next (short)

Quick rules for AI agents working with this ICP + React + Vite template.

### Do
- Use `pnpm` for JS tasks; prefer small, focused edits and PRs.
- Use generated canister bindings (`src/backend/declarations`, `src/frontend/declarations`) for all canister calls.
- Keep frontend build output in `src/frontend/dist` (Vite config).
- After `.did` or Rust changes, regenerate bindings with `dfx generate` (or `dfx deploy`).
- Run file-scoped checks/tests on changed files before proposing large changes.

### Don't
- Do not hardcode canister IDs or secrets (use `.env` / `CANISTER_` vars).
- Do not add heavy dependencies without approval.
- Do not start/stop `dfx` or run network deploys without explicit user permission.

### File-scoped commands (preferred)
- Type check single file: `pnpm exec tsc --noEmit path/to/file.tsx`
- Lint single file: `pnpm exec eslint --fix path/to/file.tsx`
- Format single file (if configured): `pnpm exec prettier --write path/to/file.tsx`
- Run a single test: `pnpm exec vitest run path/to/file.test.ts`

### Full/project commands (ask first)
- Install deps: `pnpm install`
- Full build: `pnpm run build`
- Start local replica (USER must run): `dfx start --background`
- Deploy canisters: `dfx deploy`

### Safety & permissions
- Allowed without prompt: read/list files; run file-scoped `tsc`, `eslint`, `vitest`.
- Ask first: `pnpm install`, `git push`, `dfx start`, `dfx deploy`, deleting files, changing identities.

### Quick project pointers (where to look)
- Canisters & env: `dfx.json`, `.env`
- Backend: `src/backend/` (`Cargo.toml`, `backend.did`, `lib.rs`, `declarations/`)
- Frontend: `src/frontend/` (`routes/`, `routeTree.gen.ts`, `declarations/`, `dist/`)
- Vite config: `vite.config.ts` (outDir, proxy to `127.0.0.1:4943`, `CANISTER_`/`DFX_` env)
- Example canister usage: `src/frontend/hooks/use-greet.tsx` (uses generated `backend` binding)

### Good / bad examples
- Good: use generated `backend` binding (declarations) in hooks/components.
- Bad: raw fetch to hardcoded URLs or embedding canister IDs in code.

### PR checklist (short)
- File-scoped lint & type check: green
- Unit tests for new behavior: added/green
- Small, focused diff with a short summary

### When stuck
- Ask a clarifying question or propose a short plan/draft PR instead of guessing.

### Test-first (optional)
- For new features or regressions: add tests first, then implement until green.

Notes
- Key upgrades in this repo: `@dfinity/*` → v3, `vite` → v7, `ic-cdk` → 0.18.7. Regenerate bindings and run `pnpm run build` when verifying changes.

If you want, I can (choose one):
- Add shell scripts for common tasks (`dev`, `build`, `deploy`),
- Add a short link to this file in `README.md`, or
- Make a minimal PR template / checklist file.
