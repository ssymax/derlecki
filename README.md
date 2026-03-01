# Mateusz Derlecki — Fizjoterapia Olsztyn

Professional website for **Mateusz Derlecki**, a physiotherapist based in Olsztyn, Poland. Built with Nuxt 4 and deployed as a static site on Vercel, with content managed through Storyblok CMS.

Live: [fizjoterapia-olsztyn.pl](https://fizjoterapia-olsztyn.pl)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) + Vue 3 |
| Language | TypeScript |
| CMS | [Storyblok](https://storyblok.com) (headless, EU region) |
| Animations | [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| Styling | SCSS (Sass), Normalize.css |
| SEO | [@nuxtjs/seo](https://nuxtseo.com) (schema.org, sitemap, robots) |
| Images | [@nuxt/image](https://image.nuxt.com) with Storyblok provider |
| Icons | [@nuxt/icon](https://icon.nuxt.com) + Material Design Icons |
| Fonts | Montserrat via [@nuxt/fonts](https://fonts.nuxt.com) |
| Deployment | Vercel (static generation preset) |
| Package Manager | pnpm |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, services overview, client testimonials |
| `/o-mnie` | About — bio, education, qualifications |
| `/w-czym-moge-pomoc` | Services — 8 categories with tabbed navigation |
| `/metody-pracy` | Methods — therapy techniques with images |
| `/cennik` | Pricing — full price list |
| `/kontakt` | Contact — address, phone, email, gallery, Google Maps |
| `/szkolenia` | Training — professional courses and workshops |

---

## Project Structure

```
app/
├── assets/scss/         # Global styles, variables, mixins
├── components/
│   ├── atoms/           # UI primitives (Button, Loader, NavLogo, ...)
│   ├── molecules/       # Composite components (NavDrawer, ContactInfo, ...)
│   └── organisms/       # Page-level sections (NavBar, HomeHero, Footer, ...)
├── composables/         # State management and data access (10 composables)
├── layouts/             # Default layout with Lenis smooth scroll
├── pages/               # 7 page components
├── plugins/             # loadData.ts — prefetches all CMS content on init
├── types.ts             # TypeScript interfaces for all content types
└── utils/constants.ts   # Icon mappings for services
public/img/              # OG image, logo PNG
nuxt.config.ts           # Nuxt + module configuration
vercel.json              # Deployment config with legacy URL redirects
```

---

## Architecture

### Content Management

All content is fetched from Storyblok at build time via `plugins/loadData.ts`. Stories loaded:

- `navigation`, `about`, `help`, `methods`, `course`, `kontakt`, `pricing`, `slides`

Data flows through `useAppStore()` composable (custom reactive store, no Pinia/Vuex) and is consumed by page-specific composables.

### Component Design

Follows **Atomic Design** — atoms → molecules → organisms. Components are scoped-styled with SCSS and use `<script setup lang="ts">`.

### Animations

- **GSAP + ScrollTrigger** — parallax effects, staggered reveals, timeline-based tab transitions
- **Lenis** — smooth scroll integrated with GSAP RAF ticker
- **SplitType** — splits text into lines/words for reveal animations

### SEO

Each page uses `useSeoMeta()` for title and description. Global structured data provides schema.org `MedicalBusiness` markup.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Storyblok account with delivery API token

### Environment Variables

Create a `.env` file in the project root:

```env
STORYBLOK_DELIVERY_API_TOKEN=your_token_here
```

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview
```

---

## Deployment

The site is deployed to **Vercel** using the `vercel-static` preset (static site generation). Push to `main` triggers an automatic build.

`vercel.json` includes redirect rules that map legacy PHP URLs from the previous site to new routes, preserving SEO equity.

---

## License

Private project. All rights reserved.
