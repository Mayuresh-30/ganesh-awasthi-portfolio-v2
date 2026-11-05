# Vercel Deployment Guide

A practical, production-minded guide for taking this portfolio from a local clone to a new GitHub repository and a Vercel deployment. The sequence is deliberate: first prove the project works locally, then publish the code to a repository you own, and only then connect that repository to Vercel.

> **Before you begin:** This project is a Vite + React + TypeScript static site. It has no backend, database, or required environment variables. Portfolio content is bundled into the site, so review the content and assets before making the deployed site public.

## Deployment flow

```text
Clone source repository
        ↓
Install dependencies from package-lock.json
        ↓
Type-check, build, and run locally
        ↓
Fix issues and repeat the local checks until they pass
        ↓
Create a new, empty GitHub repository that you own
        ↓
Push the project to the new repository
        ↓
Import that repository into Vercel
        ↓
Deploy, inspect the production URL, and verify the site
```

Do not skip the local verification gate. A successful Vercel build is useful, but it does not replace checking that the right content, images, links, and mobile interactions work.

## 1. Prerequisites

Install and configure:

- **Git**
- **Node.js and npm** — use a maintained Node.js LTS version supported by Vite 6. This project does not pin a Node version in its manifest, so check the Vite 6 compatibility requirements if selecting a non-LTS or older runtime.
- **A GitHub account** where you can create a repository
- **A Vercel account** connected to that GitHub account
- **A terminal** (PowerShell examples below are suitable for Windows; Git commands are the same in macOS/Linux terminals)

Confirm the tools are available:

```powershell
git --version
node --version
npm --version
```

## 2. Clone the source project

Copy the source repository's clone URL from GitHub, then run:

```powershell
git clone <source-repository-url>
Set-Location <cloned-folder-name>
```

For example, the clone URL is usually an HTTPS URL ending in `.git`. Avoid cloning into an existing project directory unless you have checked that directory first.

Check that you are in the expected project and inspect its Git state:

```powershell
Get-Location
git status
git remote -v
```

Confirm that the repository contains `package.json`, `package-lock.json`, `src/`, and `public/`. The project is an npm project; use npm commands and the committed lockfile for reproducible dependency installation.

## 3. Install dependencies and run the local quality gate

Install the exact dependency graph recorded in `package-lock.json`:

```powershell
npm ci
```

Then run the project's checks:

```powershell
npm run check
npm run build
```

Both commands must finish successfully before proceeding:

- `npm run check` runs TypeScript with no output files.
- `npm run build` runs the TypeScript check again and produces the Vite production site in `dist/`.

Now run the development server:

```powershell
npm run dev
```

Open `http://localhost:3000` in a browser. Keep the terminal running while you test the page. Stop the development server with `Ctrl+C` when finished.

The development script uses port `3000` with `strictPort`, so it exits if that port is already occupied instead of silently choosing another port. If this happens, check whether you already have this app or another process running on port `3000`; either stop the intended process or use a temporary Vite port override such as:

```powershell
npm run dev -- --port 3001
```

Then browse to the port printed by Vite.

### Local verification checklist

Test the running site in a browser before publishing:

- The page loads without a blank screen or runtime error.
- The portrait, experience logo, skill icon, and organization logos load.
- Desktop navigation links reach their sections.
- The mobile menu opens, closes, and scrolls to each selected section.
- Email, phone, LinkedIn, GitHub (if configured), organization, and credential links point to the intended destinations.
- The layout is usable at both desktop and narrow mobile widths.
- Browser developer tools show no failed app assets or uncaught application errors.
- The production build completed successfully.

If anything fails, stop here and fix it before creating the deployment. Re-run `npm run check`, `npm run build`, and the affected browser checks after making a correction.

## 4. Review the project before making it public

Before pushing or deploying, review:

1. **Portfolio data:** `src/data/portfolio.json` contains the name, biography, contact details, experience, education, skills, organizations, and credentials shown on the site. Update it for the intended owner and verify every value.
2. **Public information:** the JSON is included in client-side assets, and everything under `public/` is served as a public file. Do not store passwords, API keys, private data, or anything that should not be visible to site visitors in either location.
3. **Content and asset rights:** confirm that the person publishing the site has permission to use the portrait, logos, text, and other images.
4. **External links:** confirm URLs and telephone/email details are correct, and decide whether each item should be publicly displayed.
5. **Environment files:** this project does not require environment variables. `.gitignore` excludes `.env` files, but still inspect the files you are about to commit and do not force-add secrets.
6. **Git history:** a clone carries the source repository's history, and pushing it to a new repository publishes that history too. If the new repository will be public, check that the history does not contain secrets, private data, or material you do not have permission to publish. Removing a secret from the current files does not remove it from earlier commits.

Use the JSON editing instructions and field impact map in the main [README](./README.md) when changing portfolio content. A TypeScript/build success does not prove that the correct information or image paths have been entered.

## 5. Create a new GitHub repository you own

Create a **new empty repository** under the intended GitHub account or organization:

1. In GitHub, choose **New repository**.
2. Choose a clear repository name, such as `my-portfolio`.
3. Set visibility intentionally:
   - Choose **Public** if anyone should be able to view the source.
   - Choose **Private** if source access should be restricted. The deployed website itself is still public unless Vercel access protection is configured separately.
4. **Do not** initialize the new repository with a README, `.gitignore`, or license. The cloned project already has its own files and Git history; initializing the destination can create an unrelated root commit and a push conflict.
5. Create the repository and copy its HTTPS or SSH URL.

### Point the clone at your new repository

First, make sure there are no uncommitted changes you need to preserve:

```powershell
git status
```

If you made changes, commit the intended files before pushing:

```powershell
git add <changed-files>
git diff --cached
git commit -m "Prepare portfolio for deployment"
```

Replace `<changed-files>` with the specific files you intend to publish (for example, `src/data/portfolio.json`, a changed file under `public/`, and the documentation files). Review the staged diff before committing. Do not add `node_modules/`, `.env` files, personal files, or generated `dist/` output. This repository's `.gitignore` excludes these paths for untracked files; a file already tracked by Git remains tracked even if it is later added to `.gitignore`, so check `git status` after building.

To keep the original source remote available while making your own repository the push target:

```powershell
git remote rename origin upstream
git remote add origin <your-new-repository-url>
git remote -v
```

Verify that:

- `origin` points to the new repository you own.
- `upstream` points to the source repository.

This separation is a useful safety check: do not push your personal deployment changes to the source repository by mistake.

Push the current project branch to the new repository's `main` branch:

```powershell
git branch -M main
git push -u origin main
```

If the push is rejected because the new repository is not empty, stop and inspect the remote history. Do not force-push as a first fix. The recommended setup is a new repository created without a README, license, or `.gitignore`, so there should be no unrelated initial commit.

After pushing, refresh the new repository on GitHub and confirm the expected source files are present and that no secrets or unintended files were published.

## 6. Import the new repository into Vercel

1. Sign in to Vercel.
2. Select **Add New… → Project** (the exact UI labels can change over time).
3. Connect GitHub if prompted. Grant Vercel access to the **new repository** you just created.
4. Select that repository and choose **Import**.
5. Review the project configuration before deploying:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Vite (or let Vercel detect it) |
   | Root directory | `./` — the repository root containing `package.json` |
   | Install command | Leave automatic detection enabled; npm and `package-lock.json` are present |
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Environment variables | None required by this project |

6. Choose **Deploy**.

Vercel should install dependencies, run the production build, and publish the static output. Do not add environment variables unless the application has been deliberately changed to require them; there are no environment variables in the current project.

The app uses regular in-page anchor links and has no client-side router, so it does not need a single-page-app fallback rewrite for these section links.

## 7. Verify the production deployment

Wait for Vercel's build to finish and open the deployment URL it provides. Treat the first deployment as a release candidate to inspect, not as proof that everything is correct.

Check:

- The production URL loads over HTTPS.
- No assets return 404 (especially files referenced from `public/`).
- Navigation and mobile menu work on the deployed site.
- Contact and external links use the intended information.
- The live content is the content intended for publication.
- The deployment is associated with the new GitHub repository and expected branch.

After the first successful deployment, Vercel normally creates a preview deployment for pull requests and updates the production deployment when changes reach the configured production branch (commonly `main`). Confirm the production branch setting in the Vercel project instead of assuming it.

## 8. Subsequent updates

For each change:

1. Make a focused change locally.
2. Run `npm run check` and `npm run build`.
3. Inspect the affected feature in the browser, including mobile if relevant.
4. Commit and push to `origin` (your repository):

   ```powershell
   git add <changed-files>
   git diff --cached
   git commit -m "Describe the change"
   git push
   ```

5. Review the Vercel preview or production deployment result and verify the changed behavior online.

Avoid committing directly to `main` if the project uses pull-request review. A feature branch and a pull request give reviewers a chance to inspect the change and let Vercel create a preview before production.

## Troubleshooting

### `npm ci` fails

- Check `node --version` and use a Node.js LTS version compatible with Vite 6.
- Confirm you are in the folder containing `package.json` and `package-lock.json`.
- Read the first meaningful npm error; avoid deleting the lockfile or switching package managers as a first response.
- Retry `npm ci` after fixing the reported version, network, or lockfile issue.

### Port 3000 is already in use

The project's dev server intentionally requires port `3000`. Check whether another intended development server is running. To use a temporary different port, run `npm run dev -- --port 3001` and open the URL Vite prints.

### `npm run check` or `npm run build` fails

- Read the first TypeScript or Vite error and identify its file and line.
- Fix the underlying issue rather than suppressing the error or weakening TypeScript settings.
- Re-run both commands after the change.
- If asking an AI assistant for help, provide the exact error, relevant source file(s), the command you ran, and Node/npm versions. Remove secrets and private information from logs first. Ask the assistant to explain the root cause and propose a minimal fix, then review and test the change yourself.

### Vercel cannot find the project or the build fails

- Check that Vercel imported your new repository, not a similarly named source repository.
- Confirm the root directory contains `package.json` and `package-lock.json`.
- Confirm the build command is `npm run build` and the output directory is `dist`.
- Open the complete Vercel build log and address the first meaningful failure.
- Reproduce locally with `npm ci` and `npm run build` before retrying deployment.

### An image works locally but not on Vercel

Check filename spelling, capitalization, file extension, and the JSON `image_path`. Public assets should be inside `public/` and referenced by a root-relative URL such as `/profile_image.png`. A path with spaces must be URL-encoded. Case-sensitive production hosts may expose capitalization mismatches that were not apparent on a Windows machine.

### A deployed page looks different from the latest local change

Confirm the change was committed and pushed to `origin`, check that Vercel built the expected branch and commit, and inspect the deployment status. A local file change does not reach Vercel until it is pushed to the connected repository.

## Project-specific deployment facts

- Development server: port `3000` (`npm run dev`).
- Type check: `npm run check`.
- Production build: `npm run build`.
- Vite output: `dist/`.
- Preview server: port `4173` (`npm run preview`, after building).
- Environment variables: none required.
- Backend/API: none.
- User-editable portfolio facts: `src/data/portfolio.json`.
- Static public assets: `public/`.
- Vercel root directory: repository root.
