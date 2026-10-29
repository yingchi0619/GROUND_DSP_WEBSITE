# GOFO Ground DSP partner application

Public coverage is shown at state level for NY, NJ, PA, MA, MD, OH and MI. Facility identifiers, city names and street addresses are not included in the public network dataset. The map is a visual reference, not a precise service boundary.

## Deployment

- Public Cloudflare entry: https://gofoground.yolanyuyu.workers.dev
- Frontend: GitHub Pages from this repository's main branch.
- New applications: Cloudflare D1 `gofoground-applications`, with one JSON backup per application in the private R2 bucket `gofoground-application-backups`.
- Admin sessions and historical applications: existing Render service at https://ground-dsp-website.onrender.com.
- Worker source: `cloudflare/worker.js`; configuration: `wrangler.jsonc`.

Cloudflare Builds is connected to this repository. Pushes to main deploy with `npx wrangler deploy`. Frontend changes also require the GitHub Pages deployment to finish; the entry caches static responses for up to 60 seconds.

The Worker validates earliest start date and fleet availability/count, saves an R2 backup and D1 record before acknowledging submission, and then attempts email notification. Historical Render records remain visible in the CRM alongside new D1 records. Admin login still depends on Render.

Email delivery uses `FORMSPREE_FORM_ID` after configuring and verifying the recipient in Formspree. The free Formspree account currently allows 50 submissions per month. Resend is an optional alternative requiring the Worker secret `RESEND_API_KEY` and variable `FROM_EMAIL` (an authorized Resend sender). `NOTIFY_EMAIL` is the requested recipient. Missing configuration or delivery failures leave a pending/failed email status in D1; admins can retry from the CRM. Email failure never rejects an already saved application. No SMS subscription has been enabled.

Verification: `node --test tests/worker.test.mjs`.
