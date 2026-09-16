# Agent API Index

Research case study analyzing 100 apps for AI agent integration: authentication methods, credential access paths, API surface breadth, MCP availability, and buildability.

## How to run the research agent

```bash
npm run research
npm run research -- --verify
```

The first command validates all 100 structured records and recomputes the headline counts. `--verify` additionally checks the 20-document stratified sample for source reachability.

## View the results locally

```bash
npm run build
npm run serve
```

Open `http://localhost:3000` to view the case study.

## Research pipeline

1. **Seed** — Normalize the 100-app list into a strict schema
2. **Discover** — Search first-party developer documentation (auth, API reference, MCP pages)
3. **Extract** — Capture auth, access gate, API surface, MCP status, verdict, blocker, and confidence
4. **Lint** — Validate required fields, unique IDs, URL syntax, and aggregate counts
5. **Verify** — Manual review of 2 apps per category; corrections logged in the audit

## What the agent does vs. what needed a human

**Agent handles:**
- Finding and parsing first-party documentation
- Extracting auth patterns, API endpoints, and MCP server references
- Initial verdict classification based on self-serve availability
- Automated validation of data structure and URL reachability

**Human judgment required for:**
- Commercial access gates (partner programs, enterprise-only APIs)
- App review requirements and approval processes
- Destructive action risk assessment (money movement, data deletion)
- Disambiguation of similarly-named products
- Confidence scoring when documentation is ambiguous

## Files

- `data/apps.json` — 100 apps with research findings
- `data/verification.json` — Verification sample, corrections, and accuracy metrics
- `scripts/research-agent.mjs` — Research validation and stats runner
- `scripts/build.mjs` — Builds the final case study HTML
- `site/template.html` — Case study UI template
- `dist/index.html` — Final single-page artifact
