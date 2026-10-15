# MakerMesh AI — Agentic Manufacturing Orchestrator

A hackathon-ready Next.js MVP for small-batch manufacturing workflows: CAD intake, transparent quotations, order pooling, multilingual workshop job cards, demo vendor assignment, quality review, and simulated escrow/order tracking.

## Demo transparency

**Functional:** file extension/15 MB validation, quote calculations, pooling compatibility and savings, vendor filters/assignment rules, printable multilingual job cards, inspection decisions, guarded workflow transitions, reset, responsive UI, and localStorage state.

**Simulated:** CAD manufacturability findings/volume/material/difficulty, vendor verification/BIS records, quality inspection findings, ratings, and escrow/payment states. The app does **not** run Trimesh/CadQuery, AI/CV, query the BIS registry, hold money, or process payments. No uploaded CAD file leaves the browser in this prototype.

## Quote formula

`total = (materialPerUnit × quantity) + setupCost + (machiningHours × hourlyRate) + (inspectionPerUnit × quantity) + additionalCharges`

Unit price is `total / quantity`. Seeded rates are illustrative demo data, not verified market prices.

## Pooling formula

Compatible jobs require the same seeded part specification/name, material, manufacturing process and setup cost. Individual comparison includes each job's setup cost. The pooled proposal includes one setup cost plus all unit run costs. Savings = individual total − pooled total. This intentionally demonstrates setup sharing without a hardcoded savings percentage.

## Architecture

- `app/` — Next.js App Router shell, landing page, global styles
- `components/` — interactive feature modules
- `lib/demo.ts` — coherent seeded demo records
- `lib/quote.ts` — UI-independent quotation calculation
- `lib/types.ts` — strict domain types
- Browser `localStorage` — demo persistence only

The service/calculation boundary is deliberately small so future adapters can replace demo logic with FastAPI/Pydantic, Trimesh/CadQuery, PostgreSQL/pgvector, LangChain/CrewAI, WhatsApp Business Platform, a real vendor-verification process, CV inspection, and compliant payment/escrow providers.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js.

Validation:

```bash
npm run typecheck
npm run lint
npm run build
```

No `.env` file is required for Demo Mode. `.env.example` is intentionally empty of secrets.

## GitHub → Vercel

1. Create a Git repository and commit this project.
2. Push it to a GitHub repository.
3. In Vercel, import the GitHub repository. Vercel detects Next.js and uses the production build automatically.
4. Deploy with no environment variables for this demo.
5. Test `/`, launch the dashboard, and exercise CAD validation, quote approval, order pooling, verified-vendor assignment, quality Pass, delivery, then simulated payout release.

## Important production limitations

Before real manufacturing use, add server-side authentication/authorization, durable database storage, object storage and malware scanning for CAD uploads, genuine geometry parsers, audit logging, deterministic quotation/rate governance, real vendor/BIS verification, real inspection evidence, localization review, privacy/security controls, and a legally/compliantly structured payment or escrow integration. Never represent the seeded records as verified real-world vendors or certificates.


## Verification status (this environment)

- `npm run typecheck`: passed before the final dependency reinstall attempt; the final clean install could not complete in this sandbox.
- `npm test`: 8 rule tests passed (quote, CAD validation, pooling, vendor eligibility, timeline guards).
- Full dependency installation repeatedly timed out. Package metadata resolution and lockfile generation succeeded, but executable packages remain incomplete.
- `npm run lint`: attempted, blocked by missing `eslint` executable.
- `npm run build`: attempted, blocked by missing `next` executable.
- Browser workflows, responsive visual behavior, localStorage restoration/reset and print output have NOT been end-to-end verified. Do not treat source inspection or rule tests as browser verification.
- Quote approval is a local calculator confirmation, not a persisted new order or real vendor acceptance.
- Tracking/QC are scoped to MM-1042. Other orders have seeded statuses only.
- Inspection images are not included; the UI states that no image was supplied.
- No presentation screenshots were available in the accessible workspace.

## Local start

From the directory containing `package.json`:

```bash
npm ci
npm run dev
```

Before public deployment, run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` in a network-enabled environment, and complete browser workflow testing. The original Next.js 15.1.3 pin was replaced with a current 15.5 patch-line release and the lockfile regenerated; this is not a claim of a completed security audit.


### Vercel compatibility audit

- Demo mode has no required external service or environment variable.
- Source contains no localhost/127.0.0.1 endpoint and makes no network `fetch` calls.
- No API route exists; the App Router surface is `/` only.
- Browser APIs are confined to client components/event handlers or effects (`localStorage` in `App` effects and `window.print()` in `JobCard`).
- CAD upload is a local demo operation: the browser validates file name/size and displays seeded local analysis. The selected file is not sent to Vercel or any external service.
- Do not add real secrets to `.env.example`; configure sensitive values in Vercel Project Settings if future integrations need them.

The build could not be independently completed in this sandbox because package downloads repeatedly exceeded the execution limit; this README does not claim a successful production build.
