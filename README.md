# JD Jackets

A responsive corporate jacket catalogue and WhatsApp quotation experience built with React, TypeScript, Vite, Three.js, React Three Fiber, and ThreeUI Community.

## Run locally

```sh
npm ci
cp .env.example .env.local
npm run dev
```

WhatsApp defaults to the business number supplied in the JD Customization Brief: +267 75 296 591. Set `VITE_WHATSAPP_NUMBER` in international digits only to override it.

```sh
npm run build
npm run preview
npm test
```

For an installed Chrome browser, run `PLAYWRIGHT_CHANNEL=chrome npm test`. Browser checks use Playwright: install Chromium once with `npx playwright install chromium`.

## Vercel

Import this repository in Vercel. The checked-in `vercel.json` specifies the Vite framework, `npm run build`, and `dist` output. Add `VITE_WHATSAPP_NUMBER` in the project's environment variables, then deploy. Rebuild after changing Vite environment variables. No backend or database is required.

## Product content and images

`src/data.ts` defines the eight collections and configurable WhatsApp routing. Product photography uses the high-resolution transparent PNG pairs supplied in `h1 image/`; the older PDF cutouts have been replaced. The PDF catalogues in `webiste-detals/` remain reference material and are excluded from production uploads. See the PNG gallery details below.

The customisation section uses the actual `ClothStudy` component and the closing section uses `RippleStudy` from [ThreeUI Community](https://github.com/MengTo/threeui), imported through its component subpath and loaded only when their sections enter view. Third-party attribution and MIT notices are in `THIRD_PARTY_NOTICES.md`.

## Quotation flow

Every product opens a native modal with the selected collection, contact information, colour/design preferences, artwork filename, branding text, per-size quantities, calculated total, and optional custom measurements. Native field validation and non-zero quantity validation run before preparing the request. The final encoded request opens WhatsApp when a receiving number is configured, with a copyable review screen as fallback.

Artwork is selected locally, not uploaded to a server or transmitted through the WhatsApp URL. Customers must attach the actual artwork in their WhatsApp conversation; the form explains this explicitly. Requests require the supplier to confirm pricing, availability, minimum quantities and lead times.

## Accessibility and performance

Semantic landmarks, keyboard-accessible modal and controls, labelled form fields, screen-reader FAQ state, reduced-motion handling, lazy 3D imports, and lazy product images are included. Product card filtering and all inquiry forms work without a backend. The 3D hero gracefully falls back to photography when WebGL is unavailable.

## High-resolution PNG gallery

The current website uses all 20 original transparent front/back PNG pairs supplied in `h1 image/`, copied byte-for-byte into the versioned `public/gallery/images/` folder (the duplicate local source folder is gitignored) with content-hashed filenames. No background replacement, resizing or lossy conversion is applied. `src/gallery/products.json` maps the files to their styles and collections; regenerate it with `python3 scripts/sync-gallery-assets.py` when the source PNGs change.

`/gallery` is a separate page and source folder (`src/gallery/`). The page supports collection filtering, shareable `?style=` links, previous/next styles and model-specific quotation requests. One interactive Three.js viewer renders the selected jacket's original front and back from the PNG pair, with mouse/touch rotation, keyboard arrows, Home/End front/back, zoom, reset and optional auto-rotation. It is a photographic 3D presentation; PNGs do not provide the side geometry of a scanned garment. The hero reuses this viewer. A CSS 3D front/back fallback works without WebGL, and reduced motion disables idle motion and auto-rotation.

No PNG was labelled Tactical Pro in the supplied folder. Its home collection card explicitly shows an illustrative technical style; the gallery keeps each supplied image under its original collection.

The gallery route is covered by Vercel rewrites, and content-hashed PNGs receive immutable caching. The originals in `h1 image/` are excluded from deployment uploads because the identical website copies are already in `public/gallery/images/`.

## Company pages and customization brief

`/about` explains the mission, six-layer JD ecosystem, governance principles and partnership commitments. `/client-journey` presents eleven interactive stages, with sample approval and commercial confirmation before production, the eight-document procurement toolkit and after-sales support.

`/customization-brief` provides the six sections in the supplied 2026/27 brief: client/project details, overview, branding, materials, approvals, and timeline/communication. Browser validation checks required contact details, objective and positive integer quantity. Clients review and edit before opening an encoded WhatsApp message, or copy/download the brief for email. The form has no backend or persistent storage; selected files remain local and must be attached separately. A browser refresh clears the draft. Staff-only fields remain part of the team's internal project records.

All pages share navigation and contact information. Vercel rewrites support direct page URLs and trailing slashes. Company pages load separately from the 3D viewer.
