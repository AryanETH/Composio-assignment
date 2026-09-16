# Agent API Index

An evidence-backed case study of 100 requested app integrations: authentication, credential access, API breadth, MCP availability and agent-toolkit buildability.

## Run locally

```bash
npm run build
python -m http.server 4173 -d dist
```

Open `http://localhost:4173`.

## Run the research checks

```bash
npm run research
npm run research -- --verify
```

The first command validates all 100 structured records and recomputes the headline counts. `--verify` additionally checks the 20-document stratified sample for source reachability. It does **not** pretend that an HTTP 200 proves a claim: semantic verification is recorded separately in `data/verification.json`.

## Pipeline

1. **Seed** — the assignment list is normalized into one schema.
2. **Discover** — first-party developer documentation is preferred; product pages are used only where no docs exist.
3. **Extract** — auth, access gate, surface, MCP status, verdict, blocker and confidence are captured per app.
4. **Lint** — required fields, unique IDs, URL syntax and aggregate counts are checked automatically.
5. **Verify** — a deterministic two-per-category sample is read against source docs; misses are corrected and retained in the audit log.

## Human decisions

The pipeline cannot reliably infer commercial access from an endpoint reference alone. A human adjudicated plan gates, app-review requirements, partner programs, destructive-action risk and ambiguous products with similar names. Low-confidence rows are intentionally visible rather than silently guessed.

## Files

- `data/apps.json` — 100-row research output.
- `data/verification.json` — sample method, hits, misses and corrections.
- `scripts/research-agent.mjs` — schema/aggregate/evidence verification runner.
- `site/template.html` — self-contained case-study UI.
- `dist/index.html` — deployable single-page artifact.
