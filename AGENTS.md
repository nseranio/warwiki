# WARWIKI - Codex Session Reference

**[CLAUDE.md](CLAUDE.md) is the single authoritative handbook** for current state, standing instructions, non-negotiables, conventions and commands. It applies to Codex exactly as it does to Claude. Read it first; this file adds only Codex-specific notes. History lives in [CHANGELOG.md](CHANGELOG.md) and `git log`.

The previous 1,000-line version of this file (handoffs from April to September 21, 2026) is archived at [reports/archive/AGENTS-2026-10-02-before-compaction.md](reports/archive/AGENTS-2026-10-02-before-compaction.md). Its instructions are history, not current direction.

## Codex-specific notes

- **Run by a Claude session as a helper** (research batches, source checks, Anki batches): follow the task prompt. Do not commit, push or run `npm run build` unless the prompt says so; the orchestrating session builds once and publishes.
- **Run directly by the user:** the standing CLAUDE.md instruction applies: commit completed work and push to `main` (Vercel deploys from `main`).
- **Superseded; do not follow:** the September 20–21 audit instructions (GPT Sol as audit lead, the single-writer `audit-control.json`, "defer commit/push until the user asks", "finish the audit before new OpenEvidence pulls"). The audit queue is complete and paused by the user (October 1, 2026); see CLAUDE.md. The audit method, for when it resumes, is [AUDIT.md](AUDIT.md).
