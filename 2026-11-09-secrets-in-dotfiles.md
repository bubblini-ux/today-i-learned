# Check dotfiles for secrets before committing them

**Date:** 2026-11-09
**Topics:** git, security, dotfiles

## What happened

While getting ready to add my config files to a public `dotfiles` repo, I found a GitHub personal access token exported in plain text in my `.bashrc`. Nothing had been committed yet, so a quick review caught it in time.

## What I learned

- **Shell config is an easy place to leak secrets.** A quick `export TOKEN=...` stays in `.bashrc` long after you forget about it.
- **Deleting a secret doesn't undo a leak.** Git keeps old commits, and public repos get scanned for credentials. Once a token is exposed, revoke it.
- **Exposure isn't only about pushing.** Printing a file with `cat` can copy a secret into terminal scrollback, logs, and AI tool transcripts.
- **`.gitignore` only protects untracked files.** It does nothing for a file that's already committed.
- **Secrets belong outside the repo.** Keep them in a file like `~/.secrets` and load it from `.bashrc`:

  ```bash
  [ -f ~/.secrets ] && . ~/.secrets
  ```

## Checklist before pushing dotfiles

1. Read every file being added.
2. Search staged changes for tokens:

   ```bash
   git diff --cached | grep -nE 'ghp_|github_pat_|api[_-]?key|secret|password'
   ```

3. Never add credential files such as `~/.config/gh/hosts.yml`.
4. If a secret gets out, revoke it first and clean up afterward.
