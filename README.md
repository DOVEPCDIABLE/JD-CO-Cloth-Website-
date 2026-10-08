# JD Jackets

A responsive corporate jacket catalogue and WhatsApp quotation experience built with React, TypeScript, Vite, Three.js, React Three Fiber, and ThreeUI Community.

## Run locally

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `VITE_WHATSAPP_NUMBER` to the receiving business number in international digits only (no `+`, spaces, or punctuation). Without a number, the quotation form produces a copyable request and opens WhatsApp's contact chooser. Configure a verified business number before using this site for advertising.

```sh
npm run build
npm run preview
npm test
```

For an installed Chrome browser, run `PLAYWRIGHT_CHANNEL=chrome npm test`. Browser checks use Playwright: install Chromium once with `npx playwright install chromium`.

## Vercel

Import this repository in Vercel. The checked-in `vercel.json` specifies the Vite framework, `npm run build`, and `dist` output. Add `VITE_WHATSAPP_NUMBER` in the project's environment variables, then deploy. Rebuild after changing Vite environment variables. No backend or database is required.

## Product content and images

`src/data.ts` defines the eight collections and configurable WhatsApp routing. Product photography is extracted from the user-supplied catalogues in `webiste-detals/`; no stock products or fabricated pricing are used. `scripts/extract-assets.py` regenerates the assets with PyMuPDF and Pillow. The original source PDFs are not shipped in the production bundle.

The hero uses actual front/back catalogue photography on a lightweight extruded jacket silhouette with Three.js. It is an interactive illustrative preview, not a production CAD model or a true scanned garment. Black/navy front previews, a back view, limited drag rotation, and a static fallback are included. A supplied GLB model can replace this preview for a fully accurate 360-degree garment.

The customisation section uses the actual `ClothStudy` component and the closing section uses `RippleStudy` from [ThreeUI Community](https://github.com/MengTo/threeui), imported through its component subpath and loaded only when their sections enter view. Third-party attribution and MIT notices are in `THIRD_PARTY_NOTICES.md`.

## Quotation flow

Every product opens a native modal with the selected collection, contact information, colour/design preferences, artwork filename, branding text, per-size quantities, calculated total, and optional custom measurements. Native field validation and non-zero quantity validation run before preparing the request. The final encoded request opens WhatsApp when a receiving number is configured, with a copyable review screen as fallback.

Artwork is selected locally, not uploaded to a server or transmitted through the WhatsApp URL. Customers must attach the actual artwork in their WhatsApp conversation; the form explains this explicitly. Requests require the supplier to confirm pricing, availability, minimum quantities and lead times.

## Accessibility and performance

Semantic landmarks, keyboard-accessible modal and controls, labelled form fields, screen-reader FAQ state, reduced-motion handling, lazy 3D imports, and lazy product images are included. Product card filtering and all inquiry forms work without a backend. The 3D hero gracefully falls back to photography when WebGL is unavailable.
