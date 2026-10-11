#!/bin/zsh
cd /Users/joyboy/Documents/WARWIKI/warwiki
codex exec --skip-git-repo-check -s workspace-write -C /Users/joyboy/Documents/WARWIKI/warwiki -c 'model="gpt-6-sol"' -c 'model_reasoning_effort="high"' -c 'sandbox_workspace_write.network_access=true' -o /Users/joyboy/Documents/WARWIKI/warwiki/reports/2026-10-11/doi-final.md "$(cat /Users/joyboy/Documents/WARWIKI/warwiki/reports/2026-10-11/BRIEF-doi-discovery.md)" < /dev/null > /Users/joyboy/Documents/WARWIKI/warwiki/reports/2026-10-11/doi-log.txt 2>&1
echo DOI_EXIT $?
codex exec --skip-git-repo-check -s workspace-write -C /Users/joyboy/Documents/WARWIKI/warwiki -c 'model="gpt-6-sol"' -c 'model_reasoning_effort="high"' -o /Users/joyboy/Documents/WARWIKI/warwiki/reports/2026-10-11/gate-final.md "$(cat /Users/joyboy/Documents/WARWIKI/warwiki/reports/2026-10-11/BRIEF-gate-widening.md)" < /dev/null > /Users/joyboy/Documents/WARWIKI/warwiki/reports/2026-10-11/gate-log.txt 2>&1
echo GATE_EXIT $?
