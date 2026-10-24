"""Split meta.json into batch folders and start one Codex run per batch with brief.md."""
import json, os, subprocess
m = json.load(open('meta.json')); ids = sorted(m)
n = 8; size = -(-len(ids) // n)
brief = open('brief.md').read()
for b in range(n):
    d = f'batch{b}'; os.makedirs(d, exist_ok=True)
    with open(f'{d}/input.jsonl', 'w') as f:
        for k in ids[b * size:(b + 1) * size]:
            v = m[k]
            f.write(json.dumps({'id': k, 'title': v['title'], 'channel': v['channel'],
                                'description': v['description'][:1500], 'tags': v['tags'][:15]}, ensure_ascii=False) + '\n')
    subprocess.Popen(['codex', 'exec', '--skip-git-repo-check', '-s', 'workspace-write', '-C', d,
                      '-c', 'model="gpt-6-sol"', '-c', 'model_reasoning_effort="medium"', '-o', 'final.md', brief],
                     cwd=d, stdin=subprocess.DEVNULL, stdout=open(f'{d}/log.txt', 'w'), stderr=subprocess.STDOUT,
                     start_new_session=True)
print('started', n, 'batches; wait for batch*/final.md, then run merge.py and sites.py')
