# Agent Guide & Feature Prompts (`today-i-learned`)

This repository powers the Matrix-themed **Today I Learned (TIL)** blog deployed at [`https://bubblini-ux.github.io/today-i-learned/`](https://bubblini-ux.github.io/today-i-learned/) via GitHub Actions.

---

## 1. Repository Architecture

- `_config.yml` — Jekyll site configuration (`baseurl: /today-i-learned`).
- `_layouts/` — HTML templates (`default.html`, `post.html`).
- `_posts/` — Markdown TIL entries (`YYYY-MM-DD-title-slug.md`).
- `_data/cards.json` — Structured JSON cards defining feature ideas, CLI commands, and reusable AI agent prompts.
- `cards.json` — Liquid-rendered JSON endpoint (`/today-i-learned/cards.json`) exposing all TIL entries and agent prompt cards.
- `assets/css/main.css` — Matrix dark terminal theme and responsive card grid styles.
- `assets/js/rain.js` — Matrix digital rain background canvas + interactive prompt copy handlers.
- `.github/workflows/jekyll-gh-pages.yml` — GitHub Actions workflow that runs `build` on Pull Requests and `deploy` on merges to `main`.

---

## 2. Branch Protection & Pull Request Workflow

The `main` branch is protected and deployed automatically via GitHub Actions (`build_type: workflow`). When working from the target directory (`~/today-i-learned`), always use a feature branch and Pull Request:

```bash
cd ~/today-i-learned
git checkout main && git pull origin main
git checkout -b feat/<short-slug>

# Create or pipe output into a Markdown file (> md file)
# Edit files, then stage everything from the target directory:
git add .
git commit -m "Add <feature or TIL entry>"
git push -u origin feat/<short-slug>

# Open a Pull Request and wait for the GitHub Actions 'build' check
gh pr create --fill
```

> **Security Check:** Before running `git add .`, verify no secrets or tokens are staged:
> ```bash
> git diff --cached | grep -nE 'ghp_|github_pat_|api[_-]?key|secret|password'
> ```

---

## 3. JSON Card Schema (`_data/cards.json`)

To add a new feature card or agent prompt card to the homepage and `/cards.json` API, append an object to `_data/cards.json`:

```json
{
  "id": "unique-card-slug",
  "category": "feature | content | ui-ux | devops | automation | syndication",
  "title": "Human-readable Card Title",
  "description": "One-sentence summary rendered on the card.",
  "tags": ["tag1", "tag2"],
  "command": "cd ~/today-i-learned && git add .",
  "prompt": "Actionable prompt instructing an AI agent how to implement and PR this feature."
}
```

---

## 4. Prompts for Agents to Add Features

Copy any prompt below and give it to an autonomous coding agent (Antigravity, Jules, Claude Code, etc.):

### Prompt 1 — Add a New TIL Post from Terminal Output
```text
In ~/today-i-learned, create a new branch `til/<topic-slug>`. Capture the relevant command output or lesson into `_posts/YYYY-MM-DD-<topic-slug>.md` with YAML front matter (`title`, `description`, `tags`) and sections for "What happened", "What I learned", and a checklist. Run `git add .`, verify no secrets are staged, commit, push, and open a Pull Request against `main`.
```

### Prompt 2 — Add Interactive Tag Filtering & Search to the Blog
```text
In ~/today-i-learned, create a branch `feat/tag-filter-search`. Update `index.html`, `assets/css/main.css`, and `assets/js/rain.js` to add a terminal-styled search input (`$ grep -i ...`) and clickable `#tag` pills that filter both the TIL entry cards and JSON agent cards in real time. Stage with `git add .` and open a Pull Request.
```

### Prompt 3 — Add One-Click Copy Buttons to Code Blocks
```text
In ~/today-i-learned, create a branch `feat/code-copy`. Enhance `_layouts/post.html` and `assets/css/main.css` so every `<pre><code>` snippet in a blog post includes a Matrix-themed `[copy]` button in its top-right corner with keyboard accessibility and `[copied!]` visual feedback. Stage with `git add .` and submit a Pull Request.
```

### Prompt 4 — Add CI Validation for JSON Cards & Secret Scanning
```text
In ~/today-i-learned, create a branch `ci/validate-cards-and-secrets`. Update `.github/workflows/jekyll-gh-pages.yml` so the `build` job validates `_data/cards.json` with `jq` and scans diffs for leaked credential patterns on every `pull_request` before branch protection allows merging. Stage with `git add .` and open a Pull Request.
```

### Prompt 5 — Add RSS/Atom (`feed.xml`) & JSON Feed 1.1 (`feed.json`)
```text
In ~/today-i-learned, create a branch `feat/syndication-feeds`. Create `feed.json` (JSON Feed 1.1) and `feed.xml` (Atom) templates using Jekyll Liquid tags, add `<link rel="alternate">` discovery tags to `_layouts/default.html`, and link them in the site footer alongside `cards.json`. Stage with `git add .` and open a Pull Request.
```
