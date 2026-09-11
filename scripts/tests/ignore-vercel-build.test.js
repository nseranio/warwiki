const test = require('node:test');
const assert = require('node:assert/strict');
const {mkdtempSync, writeFileSync, mkdirSync, rmSync} = require('node:fs');
const {tmpdir} = require('node:os');
const path = require('node:path');
const {execFileSync, spawnSync} = require('node:child_process');

const script = path.resolve(__dirname, '../ignore-vercel-build.js');
test('authoring checkpoints skip deployment, but article changes still build', () => {
  const cwd = mkdtempSync(path.join(tmpdir(), 'warwiki-ignore-build-'));
  const git = (...args) => execFileSync('git', args, {cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']}).trim();
  const commit = () => {
    git('add', '.');
    git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-m', 'fixture');
    return git('rev-parse', 'HEAD');
  };
  const check = previous => spawnSync(process.execPath, [script], {
    cwd, encoding: 'utf8', env: {...process.env, VERCEL_GIT_PREVIOUS_SHA: previous},
  });
  try {
    git('init');
    writeFileSync(path.join(cwd, 'README.md'), 'baseline');
    const baseline = commit();
    for (const name of ['RESUME-HERE.md', 'OPEN-EVIDENCE-PROMPT.md', 'EPIC-ROADMAP.md']) {
      writeFileSync(path.join(cwd, name), 'authoring notes');
    }
    const notes = commit();
    assert.equal(check(baseline).status, 0);
    mkdirSync(path.join(cwd, 'docs'));
    writeFileSync(path.join(cwd, 'docs', 'article.mdx'), '# Updated clinical content');
    commit();
    assert.equal(check(notes).status, 1);
    assert.equal(check('').status, 1);
    assert.equal(check('a'.repeat(40)).status, 1);
  } finally {
    rmSync(cwd, {recursive: true, force: true});
  }
});
