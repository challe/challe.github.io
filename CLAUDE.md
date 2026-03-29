# Drumla — Claude Code Guide

## Project
Static site for **drumla.se** — a small Swedish business selling Saintpaulia (African violet) cuttings and raspberries from Rogsta, Hudiksvall. Built with **Eleventy (11ty)**, Nunjucks templates, Bootstrap 5.

## Key files
- `src/_data/products.json` — all Saintpaulia products (title, description, imagePath, category)
- `src/_data/site.js` — pricing tiers, business info, FAQ content, site metadata
- `src/_includes/base.njk` — base layout (meta tags, CSS, JS)
- `src/_includes/post.njk` — blog/aktuellt post layout
- `src/assets/css/style.css` — all custom CSS and design tokens

## Design system

**Colors:**
- `--primary: #333` / `--primary-dark: #202020` — charcoal, used for buttons and headings
- `--beige-1: #f9f8f4` — warm background for cards and highlighted sections
- `--accent: #00d4d7` — site teal (avoid for new components; use moss green `#637554` / `#526244` instead)

**Fonts:** `Merriweather` (headers via `--font-family-header`), `Inter` (body via `--font-family`)

**Buttons:** Always use `class="btn primary-btn"` — no custom button styles.

## Page structure
Every page must follow this order:
1. `<section class="header-area header-eight">` — hero with centered `<h1>` and subtitle `<p>`
2. `{% include "breadcrumbs.njk" %}` — breadcrumb nav (also emits BreadcrumbList schema)
3. Content sections
4. `{% include "contact-form.njk" %}` where relevant

Do not skip the hero or breadcrumbs — Therese expects them on every page.

## CSS rules
- **Do not use `about-image-five` or `about-five-content`** outside of the homepage about-section. These have hardcoded padding (60px / 50px) designed for the SVG dot decoration and break on other pages.
- For two-column layouts, use plain Bootstrap grid: `row`, `col-lg-6`, `g-5`.
- For product images use a portrait crop:
  ```css
  .product-image-wrap { aspect-ratio: 3/4; overflow: hidden; border-radius: 0.5rem; }
  .product-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
  ```
- Always grep `style.css` before applying class names — many carry significant side effects.

## Individual product pages
Generated from `products.json` via `src/saintpaulior-produkt.njk` (Eleventy pagination, size: 1).
URLs: `/saintpaulior/[slugified-title]/`

## Commands
```bash
npm run serve   # local dev server with live reload
npm run build   # production build to _site/
```
