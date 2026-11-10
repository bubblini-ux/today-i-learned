---
title: Automate blog deploys with GitHub Actions, branch protection, and JSON agent cards
description: How to ship TIL entries via pull requests, enforce main branch protection, and expose JSON prompt cards for AI coding agents.
tags: [git, github-actions, branch-protection, json, agents]
---

## What happened

After setting up the Matrix-themed `today-i-learned` Jekyll site, I wanted a clean workflow to capture lessons into Markdown (`> file.md`), stage changes from the target repository (`~/today-i-learned` with `git add .`), deploy automatically via GitHub Actions, protect `main` with branch protection rules, and publish structured JSON cards with prompts so AI agents can add features through Pull Requests.

## What I learned

- **Switch GitHub Pages from `legacy` branch builds to `workflow` builds.** Using `.github/workflows/jekyll-gh-pages.yml` gives full control over the build environment and lets the `build` job double as a CI check on Pull Requests:

  ```bash
  gh api -X PUT repos/bubblini-ux/today-i-learned/pages -f build_type=workflow
  ```

- **Never commit `_site/` when deploying with GitHub Actions.** Add `_site/`, `.jekyll-cache/`, and `vendor/` to `.gitignore` so the repository stays clean and Actions builds fresh artifacts on every push to `main`.

- **Pipe terminal output directly into Markdown (`> file.md`) before staging.** Redirecting command output or notes into `_posts/YYYY-MM-DD-slug.md` followed by `git add .` from the target directory makes capturing TIL lessons fast and repeatable:

  ```bash
  cd ~/today-i-learned
  cat << 'EOF' > _posts/$(date +%F)-new-lesson.md
  ---
  title: Quick lesson from the terminal
  description: Captured directly from shell output.
  tags: [cli, til]
  ---
  EOF
  git add .
  ```

- **Protect `main` so all changes pass CI before deployment.** Enabling branch protection on `main` with required status checks (`build`) prevents broken Jekyll builds or accidental force-pushes from taking down the live blog:

  ```bash
  gh api -X PUT repos/bubblini-ux/today-i-learned/branches/main/protection \
    --input - << 'EOF'
  {
    "required_status_checks": {
      "strict": true,
      "contexts": ["build"]
    },
    "enforce_admins": false,
    "required_pull_request_reviews": null,
    "restrictions": null
  }
  EOF
  ```

- **Expose JSON cards (`_data/cards.json` & `/cards.json`) with agent prompts.** Storing feature cards and reusable agent prompts in JSON allows Jekyll to render interactive prompt cards in the UI while serving `/today-i-learned/cards.json` for scripts and AI agents.

## Checklist for Agent-Driven PR Deploys

1. Create a feature branch in `~/today-i-learned`: `git checkout -b feat/my-feature`.
2. Write or redirect Markdown content (`> _posts/YYYY-MM-DD-topic.md`) and update `_data/cards.json` if adding a new card.
3. Run `git add .` inside `~/today-i-learned` and verify `git status` and `git diff --cached`.
4. Push the branch and open a Pull Request (`gh pr create --fill`).
5. Wait for the `build` GitHub Actions check to pass, then merge to trigger the `deploy` job to GitHub Pages.
