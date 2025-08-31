const CleanCSS = require("clean-css");
const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // Image optimization shortcode
  eleventyConfig.addShortcode("image", async function(src, alt, sizes = "100vw", loading = "lazy") {
    const imagePath = path.join("src", src);
    
    if (!fs.existsSync(imagePath)) {
      console.warn(`Image not found: ${imagePath}`);
      return `<img src="${src}" alt="${alt}" loading="${loading}">`;
    }

    try {
      const metadata = await Image(imagePath, {
        widths: [300, 600, 900, 1200],
        formats: ["webp", "jpeg"],
        outputDir: "_site/assets/images/optimized/",
        urlPath: "/assets/images/optimized/",
        filenameFormat: function (id, src, width, format, options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          return `${name}-${width}w.${format}`;
        }
      });

      const imageAttributes = {
        alt,
        sizes,
        loading,
        decoding: "async",
        style: "width: 100%; height: auto; object-fit: cover;", // Add responsive styling
      };

      return Image.generateHTML(metadata, imageAttributes);
    } catch (error) {
      console.warn(`Error processing image ${src}:`, error.message);
      return `<img src="${src}" alt="${alt}" loading="${loading}" style="width: 100%; height: auto; object-fit: cover;">`;
    }
  });

  // Product image shortcode (with data attributes for gallery)
  eleventyConfig.addShortcode("productImage", async function(src, alt, href, title, description) {
    const imagePath = path.join("src", src);
    
    // Combine title and description for caption
    const caption = description ? `${title} - ${description}` : title;
    
    if (!fs.existsSync(imagePath)) {
      console.warn(`Product image not found: ${imagePath}`);
      return `<a href="${href}" class="gallery-item" title="${caption}">
        <img src="${src}" alt="${alt}">
      </a>`;
    }

    try {
      const metadata = await Image(imagePath, {
        widths: [300, 600, 900],
        formats: ["webp", "jpeg"],
        outputDir: "_site/assets/images/optimized/",
        urlPath: "/assets/images/optimized/",
        filenameFormat: function (id, src, width, format, options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          return `${name}-${width}w.${format}`;
        }
      });

      // Simple Lightbox works with <a> tags wrapping images
      const webp = metadata.webp;
      const jpeg = metadata.jpeg;
      
      const htmlOutput = `<a href="${href}" class="gallery-item" title="${caption}">
        <picture>
          <source type="image/webp" srcset="${webp.map(img => `${img.url} ${img.width}w`).join(', ')}" sizes="(max-width: 768px) 100vw, 33vw">
          <source type="image/jpeg" srcset="${jpeg.map(img => `${img.url} ${img.width}w`).join(', ')}" sizes="(max-width: 768px) 100vw, 33vw">
          <img src="${jpeg[0].url}" alt="${alt}" loading="lazy" decoding="async">
        </picture>
      </a>`;

      return htmlOutput;
    } catch (error) {
      console.warn(`Error processing product image ${src}:`, error.message);
      return `<a href="${href}" class="gallery-item" title="${caption}">
        <img src="${src}" alt="${alt}">
      </a>`;
    }
  });

  // CSS Minification for copied files
  eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
    const isProduction = process.env.NODE_ENV === "production";
    
    if (isProduction) {
      // CSS Minification
      const cssDir = path.join(dir.output, 'assets', 'css');
      
      if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir).filter(file => 
          file.endsWith('.css') && !file.endsWith('.min.css')
        );
        
        console.log('Minifying CSS files...');
        let totalSavings = 0;
        let filesProcessed = 0;
        
        for (const fileName of cssFiles) {
          const cssFile = path.join(cssDir, fileName);
          const css = fs.readFileSync(cssFile, 'utf8');
          
          const minified = new CleanCSS({
            level: 2, // Advanced optimizations
            returnPromise: false
          }).minify(css);
          
          if (minified.errors.length === 0) {
            fs.writeFileSync(cssFile, minified.styles);
            const savings = ((css.length - minified.styles.length) / css.length * 100);
            console.log(`${fileName}: ${savings.toFixed(1)}% size reduction`);
            totalSavings += savings;
            filesProcessed++;
          } else {
            console.log(`CSS minification errors in ${fileName}:`, minified.errors);
          }
        }
        
        if (filesProcessed > 0) {
          console.log(`Total: ${filesProcessed} CSS files minified, average ${(totalSavings/filesProcessed).toFixed(1)}% reduction`);
        }
      }

      // Image optimization for remaining unprocessed images
      await optimizeRemainingImages(dir.output);
    }
  });

  // Function to optimize images that weren't processed through shortcodes
  async function optimizeRemainingImages(outputDir) {
    const imageDir = path.join(outputDir, 'assets', 'images');
    
    if (!fs.existsSync(imageDir)) return;
    
    console.log('Optimizing remaining images...');
    const imageFiles = [];
    
    // Recursively find all image files
    function findImages(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('optimized')) {
          findImages(fullPath);
        } else if (/\.(jpe?g|png)$/i.test(file) && !fullPath.includes('optimized')) {
          imageFiles.push(fullPath);
        }
      }
    }
    
    findImages(imageDir);
    
    // Skip if no images to optimize
    if (imageFiles.length === 0) {
      console.log('No additional images to optimize.');
      return;
    }
    
    for (const imagePath of imageFiles) {
      try {
        const relativePath = path.relative(outputDir, imagePath);
        const originalSize = fs.statSync(imagePath).size;
        
        // Create optimized version using Sharp directly for in-place optimization
        const sharp = require('sharp');
        const imageBuffer = fs.readFileSync(imagePath);
        
        let optimized;
        if (path.extname(imagePath).toLowerCase() === '.png') {
          optimized = await sharp(imageBuffer)
            .png({ quality: 80, compressionLevel: 9 })
            .toBuffer();
        } else {
          optimized = await sharp(imageBuffer)
            .jpeg({ quality: 85, progressive: true })
            .toBuffer();
        }
        
        if (optimized.length < originalSize) {
          fs.writeFileSync(imagePath, optimized);
          const savings = ((originalSize - optimized.length) / originalSize * 100);
          console.log(`${path.basename(imagePath)}: ${savings.toFixed(1)}% size reduction`);
        }
      } catch (error) {
        console.log(`Error optimizing ${path.basename(imagePath)}:`, error.message);
      }
    }
  }

  // Add a shortcode for cache-busted asset URLs
  eleventyConfig.addShortcode("asset", function(url) {
    return `${url}?v=${this.ctx.build.hash}`;
  });

  // Ignore Google verification files from template processing
  eleventyConfig.ignores.add("src/google*.html");

  // Copy assets folder (CSS, JS, images, fonts) but not data since it's handled by 11ty
  eleventyConfig.addPassthroughCopy("src/assets");

  // Copy root files that need to be in the final site root
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/google*.html"); // For Google verification files
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/.nojekyll"); // Disable Jekyll processing
  
  return {
    dir: {
      input: "src",        // 11ty will look for files in the "src" folder
      output: "_site"      // 11ty will build your site into the "_site" folder
    },
  };
};