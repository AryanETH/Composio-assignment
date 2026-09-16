import { readFile, writeFile, mkdir } from 'node:fs/promises';

const apps = JSON.parse(await readFile(new URL('../data/apps.json', import.meta.url), 'utf8'));
const verification = JSON.parse(await readFile(new URL('../data/verification.json', import.meta.url), 'utf8'));
const template = await readFile(new URL('../site/template.html', import.meta.url), 'utf8');

const required = ['id','name','category','does','auth','access','surface','mcp','verdict','blocker','evidence','confidence'];
const ids = new Set();
for (const app of apps) {
  for (const key of required) if (!app[key] && app[key] !== 0) throw new Error(`${app.name || app.id}: missing ${key}`);
  if (ids.has(app.id)) throw new Error(`Duplicate id ${app.id}`);
  ids.add(app.id);
  new URL(app.evidence);
}
if (apps.length !== 100) throw new Error(`Expected 100 apps; found ${apps.length}`);

const html = template
  .replace('__APP_DATA__', JSON.stringify(apps).replaceAll('<', '\\u003c'))
  .replace('__VERIFY_DATA__', JSON.stringify(verification).replaceAll('<', '\\u003c'));

await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await writeFile(new URL('../dist/index.html', import.meta.url), html);
console.log(`Built dist/index.html with ${apps.length} apps and ${verification.sampleSize} verification checks.`);
