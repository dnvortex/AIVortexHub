# Contributing to DN VORTEX

Thank you for your interest in contributing! This guide will get you up and running without guesswork.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/AIVortexHub.git
   cd AIVortexHub
   ```
3. Follow the **environment setup and local run instructions** in [README.md](./README.md).

## Branching

Create a branch off `main` using one of these prefixes:

| Prefix | When to use |
|---|---|
| `feat/` | New feature or capability |
| `fix/` | Bug fix |
| `chore/` | Tooling, dependencies, config |
| `docs/` | Documentation only |
| `refactor/` | Code restructuring without behaviour change |

**Examples:**
```
feat/add-course-checkout
fix/auth-token-expiry
docs/update-readme
```

Keep branch names lowercase and hyphen-separated.

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <short summary>
```

- **type** — same set as branch prefixes: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`
- **scope** — optional, names the area affected (e.g. `auth`, `courses`, `ui`)
- **summary** — imperative mood, ≤72 characters, no trailing period

**Examples:**
```
feat(courses): add video progress tracking
fix(auth): handle expired Firebase tokens gracefully
docs: add CONTRIBUTING guide
chore(deps): upgrade drizzle-orm to 0.30
```

For breaking changes, add a `!` after the type/scope and describe the break in the commit body:
```
feat(api)!: rename /courses endpoint to /catalog

BREAKING CHANGE: clients must update to /catalog
```

## Opening a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feat/your-feature
   ```
2. Open a PR against the `main` branch of this repository.
3. Fill in the PR description:
   - **What** — a short summary of the change
   - **Why** — motivation or issue it resolves
   - **How to test** — steps to verify the change works
4. Ensure the TypeScript check passes before requesting review:
   ```bash
   npm run check
   ```
5. A maintainer will review and merge once the PR is approved.

## Code Style

- **TypeScript** is required for all new code — avoid `any` where possible.
- **Formatting** follows the conventions already in the project; run your editor's Prettier integration or check the existing code style.
- Keep components in `client/src/components/`, routes in `server/routes.ts`, and shared types in `shared/schema.ts`.
- Write small, focused commits — one logical change per commit makes review easier.

## Questions

If you're unsure about anything, open a GitHub Discussion or draft PR and ask. We'd rather help you early than review a large misaligned change.
