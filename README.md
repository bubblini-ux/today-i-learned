# Today I Learned

A Matrix-themed learning journal, one lesson at a time. Built with Jekyll and deployed via GitHub Actions to [`https://bubblini-ux.github.io/today-i-learned/`](https://bubblini-ux.github.io/today-i-learned/).

## Features

- **Matrix Terminal UI**: Digital rain canvas (`assets/js/rain.js`) and dark terminal cards (`assets/css/main.css`).
- **JSON Cards & API (`cards.json`)**: Machine-readable JSON feed at [`/today-i-learned/cards.json`](https://bubblini-ux.github.io/today-i-learned/cards.json) powered by `_data/cards.json` and `_posts/`.
- **Agent Feature Prompts (`AGENTS.md`)**: Ready-to-copy prompts and PR workflow instructions for autonomous AI coding agents in [`AGENTS.md`](AGENTS.md).
- **GitHub Actions Deployment & Branch Protection**: Automated Jekyll builds on Pull Requests (`build` status check) and zero-downtime deployment to GitHub Pages on merges to `main`.

## Adding a Entry or Feature via Pull Request

```bash
cd ~/today-i-learned
git checkout -b til/new-entry
# Create or pipe output into _posts/YYYY-MM-DD-topic.md (> md file)
git add .
git commit -m "Add TIL on <topic>"
git push -u origin til/new-entry
gh pr create --fill
```

## Local Development

1. Clone the repository.
2. Run `bundle install` to install dependencies.
3. Run `bundle exec jekyll serve` to build and serve the site locally.
4. Navigate to `http://localhost:4000/today-i-learned/` in your browser.
