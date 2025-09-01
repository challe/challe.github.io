# Drumla Website

A static website for Drumla, a local business in Hudiksvall, Sweden, selling Saintpaulia (African violet) cuttings and fresh raspberries.

## 🛠️ Built With

- **[Eleventy (11ty)](https://www.11ty.dev/)** - Static site generator
- **[Bootstrap 5](https://getbootstrap.com/)** - CSS framework for responsive design
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Templating engine
- **[Simple Lightbox](https://simplelightbox.com/)** - Image gallery functionality
- **[LineIcons](https://lineicons.com/)** - Icon library

## 📁 Project Structure

```
src/
├── _data/           # Site data (products, configuration)
├── _includes/       # Templates and partials
├── assets/          # CSS, JS, images, fonts
├── aktuellt/        # Blog posts and news
└── *.njk            # Page templates

_site/               # Generated static site (build output)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run serve
```
The site will be available at `http://localhost:8080`

### Building

Build for development:
```bash
npm run build
```

Build for production:
```bash
npm run build:prod
```

## ✨ Features

- **Responsive Design** - Mobile-first approach with Bootstrap
- **Image Optimization** - Automatic WebP conversion and responsive images
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Blog System** - Markdown-based blog posts with structured data
- **Product Showcase** - Dynamic product gallery with lightbox
- **Contact Forms** - Integrated contact information
- **Multi-language** - Swedish language support

## 🔍 SEO & Structured Data Validation

This project includes automated structured data validation to ensure optimal SEO performance.

### What's Validated

- **BlogPosting** schema for blog posts
- **LocalBusiness** schema for business information  
- **Product** schema for plant offerings
- **HowTo** schema for care instructions
- **FAQPage** schema for common questions
- **Review** and **AggregateRating** schemas

### Validation Tools

The site uses [structured-data-testing-tool](https://www.npmjs.com/package/structured-data-testing-tool) which leverages Google's Rich Results Test API to validate structured data.

### Running Validation

Validation runs automatically with every build:
```bash
npm run build        # Builds and validates
npm run build:prod   # Production build
```

Or run validation separately:
```bash
npm run validate:seo
```

### What Gets Checked

- ✅ JSON-LD structured data syntax
- ✅ Required schema.org fields
- ✅ Google Rich Results eligibility
- ✅ Meta tags and SEO basics
- ✅ Image requirements for rich snippets

If validation fails, the build process will exit with an error, making it perfect for CI/CD pipelines.

## 🎨 Customization

### Colors & Styling
Main styles are in `src/assets/css/style.css` with CSS custom properties for easy theming.

### Content Management
- **Products**: Edit `src/_data/products.json`
- **Site config**: Edit `src/_data/site.js`
- **Blog posts**: Add markdown files to `src/aktuellt/posts/`

### Images
Images are automatically optimized during build. Place source images in `src/assets/images/` and reference them using the `{% image %}` shortcode for automatic optimization.

## 📝 Content Types

### Blog Posts
Create new blog posts in `src/aktuellt/posts/` with frontmatter:

```markdown
---
title: "Post Title"
description: "Brief description"
date: 2025-01-01
image: "assets/images/blog/image.jpg"
tags: ["blog", "news"]
layout: post.njk
---

Your content here...
```

### Products
Products are managed in `src/_data/products.json` with automatic schema generation.
