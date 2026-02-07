# Sanity Studio — Portfolio CMS

This folder contains the Sanity Content Studio for the Nathan Lewis portfolio. It manages blog posts, projects, and author profiles.

## Running the Studio

From the project root:

```bash
yarn start:studio
```

Or from this directory:

```bash
yarn start
```

The studio opens at [http://localhost:3333](http://localhost:3333) (or the next available port).

## Content Types

| Type | Purpose |
|------|---------|
| **Post** | Blog posts with title, slug, author, main image, publish date, and block content body |
| **Project** | Projects with title, date, place, description, type (Personal/Client/School), link, and tags |
| **Author** | Author profiles referenced by posts (name, image, bio, etc.) |

## Configuration

- **Project ID:** `46knf8eh`
- **Dataset:** `production`

Defined in `sanity.json` and used by the frontend Sanity client in `src/client.js`.

## Schema Files

- `schemas/post.js` — Blog post document
- `schemas/project.js` — Project document
- `schemas/author.js` — Author document
- `schemas/blockContent.js` — Portable Text block content (used in post body)

## Deployment

Sanity Studio can be deployed to [sanity.io/manage](https://sanity.io/manage) or hosted separately. Content changes are reflected on the live site without redeploying the frontend.
