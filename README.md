# GOFO Ground DSP partner application

Public coverage is shown at state level for NY, NJ, PA, MA, MD, OH and MI. Facility identifiers, city names and street addresses are not included in the public network dataset. The map is a visual reference, not a precise service boundary.

## Deployment

- Public Cloudflare entry: https://gofoground.yolanyuyu.workers.dev
- Frontend: GitHub Pages from this repository's main branch.
- Application API and admin sessions: existing Render service at https://ground-dsp-website.onrender.com.
- Worker source: `cloudflare/worker.js`; configuration: `wrangler.jsonc`.

Cloudflare Builds is connected to this repository. Pushes to main deploy with `npx wrangler deploy`. Frontend changes also require the GitHub Pages deployment to finish; the entry caches static responses for up to 60 seconds.

The Worker serves an explicit list of public frontend files and forwards `/api/` requests to Render without caching. The Python backend and its data remain on Render. Backend availability and email delivery still depend on that service and its existing configuration.
