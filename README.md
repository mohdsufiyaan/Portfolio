# Mohd Sufiyan — Developer Portfolio

Production-ready, Next.js App Router developer portfolio for **Mohd Sufiyan** (Senior Software Engineer · Full-Stack Architecture & Applied AI Systems).

## Highlights

- **Next.js App Router + React 19 + TypeScript + Tailwind CSS v4 + D3.js + Three.js + Motion**
- **Interactive 3D Hero Visualization (`Three.js`)**: GPU-accelerated Neural Systems Core with progressive WebGPU detection, WebGL2 rendering, drag-to-orbit + hover parallax, scroll parallax, offscreen/tab pausing, GPU resource disposal, and a crisp static SVG fallback for `prefers-reduced-motion`.
- **Full D3.js Interactive Data Visualizations**:
  - **D3.js Force-Directed Skill Network** (`components/D3SkillsGraph.tsx`) with live drag physics, glowing domain hubs, and synchronized cluster filtering.
  - **D3.js GitHub Activity Squares Heatmap & Language Arc Donut** (`components/D3GitHubShowcase.tsx`) powered by a secure server-side GitHub API module (`lib/github.ts` + `/api/github`) with 1-hour ISR caching.
- **Scroll-Driven Motion & Micro-Interactions**: Scroll-linked parallax, 3D tilt spotlight cards, animated stat counters, infinite tech marquee, and a scroll-illuminated Experience timeline rail.
- **Zero-Form Direct Contact Hub**: One-click copy for email & phone, direct `mailto:` / `tel:` links, LinkedIn, GitHub, and instant latest Resume PDF download.
- **SEO & AEO Ready**: Dynamic Open Graph image, semantic HTML5, `ProfilePage` + `Person` + `FAQPage` + `BreadcrumbList` Schema.org JSON-LD, `sitemap.xml`, and `robots.txt`.

## Commands

```bash
npm install
npm run dev        # Local development server
npm run typecheck  # Strict TypeScript validation
npm run build      # Production build verification
npm run start      # Serve production build
```

## Deploying to Vercel

1. Push `Portfolio-new-next-js` to GitHub/GitLab/Bitbucket — or run `npx vercel --prod` inside the folder.
2. Vercel auto-detects Next.js with zero mandatory configuration.
3. Optional Vercel Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` — Custom production domain (e.g., `https://mohdsufiyan.dev`).
   - `GITHUB_TOKEN` *(Server-only, never exposed to client)* — Read-only GitHub Personal Access Token to unlock full GitHub GraphQL contribution squares including private enterprise commit counts.
