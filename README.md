# Nathan Lewis — Portfolio Website

A personal portfolio showcasing my journey as a developer, featured projects, and blog posts about tech.

- **Live site:** [nathanlewis.dev](https://nathanlewis.dev)
- **Hosted on:** Netlify
- **Content managed with:** Sanity.io

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, React Router v6 |
| **Styling** | Tailwind CSS |
| **CMS** | Sanity.io (headless) |
| **Icons** | Phosphor Icons |
| **Media** | `@sanity/image-url`, `@sanity/block-content-to-react` |
| **Utilities** | Date-fns, Prism.js (code highlighting), react-social-icons |

---

## Prerequisites

- **Node.js** 18+ (see [`.nvmrc`](.nvmrc); `package.json` engines)
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
├── public/               # Static assets, favicon, manifest
│   ├── index.html
│   ├── _redirects        # Netlify SPA routing
│   ├── robots.txt
│   └── sitemap.xml
├── blog-planning/       # Exported blog posts (markdown), via `yarn export:blog`
├── scripts/
│   ├── generate-sitemap.js
│   └── export-blog-posts.js
├── src/
│   ├── components/      # React components
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── NavBar.js
│   │   ├── Footer.js
│   │   ├── Post.js, SinglePost.js
│   │   └── Project.js
│   ├── utils/           # Utilities (e.g. progressiveImg)
│   ├── client.js        # Sanity client config
│   └── serializers.js   # Block content serializers
├── studio/              # Sanity Studio app
│   ├── schemas/         # Content schemas (post, project, author)
│   └── sanity.json
└── tailwind.config.js
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start React dev server |
| `yarn start:studio` | Start Sanity Studio for content editing |
| `yarn build` | Build for production |
| `yarn test` | Run tests |
| `yarn generate:sitemap` | Regenerate `public/sitemap.xml` |
| `yarn export:blog` | Export all blog posts from Sanity to markdown files in `blog-planning/` |

---

## Content Management

Sanity Studio powers content for:

- **Posts** — Blog posts with title, slug, author, image, and body (block content)
- **Projects** — Projects with title, date, place, description, type, link, and tags
- **Authors** — Author profiles referenced by posts

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

The Sanity client uses project ID `46knf8eh` and dataset `production`. For local development, no additional env vars are required.

---

## License

Private portfolio project.
