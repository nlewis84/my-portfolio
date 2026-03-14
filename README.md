# Nathan Lewis — Portfolio Website

A personal portfolio showcasing my journey as a developer, featured projects, and blog posts about tech.

- **Live site:** [nathanlewis.dev](https://nathanlewis.dev)
- **Hosted on:** Netlify
- **Content managed with:** Sanity.io

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, React Router v6 |
| **Build** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **CMS** | Sanity Studio v3 (headless) |
| **Icons** | Phosphor Icons |
| **Content rendering** | `@portabletext/react` (rich text), `react-markdown` + `remark-gfm` (markdown) |
| **Utilities** | Prism.js (code highlighting), react-social-icons |

---

## Prerequisites

- **Node.js** 22+ (see [`.nvmrc`](.nvmrc))
- **Yarn** package manager

---

## Quick Start

### 1. Install dependencies

```bash
yarn install
```

### 2. Run the portfolio

```bash
yarn start
```

Runs the app at [http://localhost:3000](http://localhost:3000).

### 3. Run Sanity Studio (optional)

To edit content locally:

```bash
yarn start:studio
```

Opens Sanity Studio for managing blog posts, projects, and authors.

---

## Project Structure

```
my-portfolio/
├── index.html              # App entry point (Vite)
├── vite.config.js          # Vite configuration
├── public/                 # Static assets, favicon, manifest
│   ├── _redirects          # Netlify SPA routing
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── generate-sitemap.js
│   └── export-blog-posts.js
├── src/
│   ├── components/         # React components (.jsx)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   ├── Post.jsx, SinglePost.jsx
│   │   ├── Project.jsx
│   │   ├── BlurredUpImage.jsx
│   │   └── ErrorBoundary.jsx
│   ├── utils/              # Utilities (e.g. progressiveImg)
│   ├── client.js           # Sanity client config
│   ├── index.css            # Tailwind v4 + custom styles
│   └── index.jsx           # App entry point
└── studio/                 # Sanity Studio v3
    ├── sanity.config.js    # Studio configuration
    ├── sanity.cli.js       # CLI configuration
    └── schemas/            # Content schemas (post, project, author, blockContent)
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start Vite dev server |
| `yarn dev` | Alias for `yarn start` |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build locally |
| `yarn start:studio` | Start Sanity Studio for content editing |
| `yarn generate:sitemap` | Regenerate `public/sitemap.xml` |
| `yarn export:blog` | Export all blog posts from Sanity to markdown files |

---

## Content Management

Sanity Studio powers content for:

- **Posts** — Blog posts with title, slug, author, image, and body. Posts support both a Markdown body field and a rich text (Portable Text) body field. If the Markdown field has content, the frontend renders that; otherwise it falls back to the rich text body.
- **Projects** — Projects with title, date, place, description, type, link, and tags.
- **Authors** — Author profiles referenced by posts.

Changes made in Sanity are reflected in both development and production without redeploying. The frontend fetches content from the Sanity API at runtime.

---

## Deployment

### Netlify

1. Connect the repo to Netlify.
2. Build command: `yarn build`
3. Publish directory: `build`
4. `_redirects` handles SPA routing for client-side routes.

---

## Environment

The Sanity client uses project ID `46knf8eh` and dataset `production`. No additional env vars are required for local development.

---

## License

Private portfolio project.
