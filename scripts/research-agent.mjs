import { readFile } from 'node:fs/promises';

const apps = JSON.parse(await readFile(new URL('../data/apps.json', import.meta.url), 'utf8'));
const verification = JSON.parse(await readFile(new URL('../data/verification.json', import.meta.url), 'utf8'));
const args = new Set(process.argv.slice(2));

const verdicts = Object.groupBy(apps, app => app.verdict);
const confidence = Object.groupBy(apps, app => app.confidence);
const authFamilies = {
  oauth: apps.filter(a => a.auth.includes('OAuth')).length,
  apiKeyOrToken: apps.filter(a => /key|token/i.test(a.auth)).length,
  basic: apps.filter(a => /Basic/i.test(a.auth)).length,
  noAuth: apps.filter(a => a.auth === 'None').length
};

console.log(JSON.stringify({
  rows: apps.length,
  verdicts: Object.fromEntries(Object.entries(verdicts).map(([k,v]) => [k, v.length])),
  confidence: Object.fromEntries(Object.entries(confidence).map(([k,v]) => [k, v.length])),
  authFamilies,
  verification: {
    sample: verification.sampleSize,
    firstPass: `${verification.firstPassCorrect}/${verification.sampleSize}`,
    finalConfirmed: `${verification.finalConfirmed}/${verification.sampleSize}`,
    unresolved: verification.unresolved
  }
}, null, 2));

if (args.has('--verify')) {
  const sampleIds = new Set(verification.checks.map(c => c.id));
  const sample = apps.filter(a => sampleIds.has(a.id));
  const check = async app => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    try {
      let response = await fetch(app.evidence, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
      if ([403, 405].includes(response.status)) response = await fetch(app.evidence, { method: 'GET', redirect: 'follow', signal: controller.signal });
      return { id: app.id, app: app.name, status: response.status, reachable: response.status < 500 };
    } catch (error) {
      return { id: app.id, app: app.name, status: null, reachable: false, error: error.name };
    } finally { clearTimeout(timer); }
  };
  const results = [];
  for (let i = 0; i < sample.length; i += 5) results.push(...await Promise.all(sample.slice(i, i + 5).map(check)));
  console.log('\nEvidence reachability (not a semantic accuracy test):');
  console.table(results);
}
