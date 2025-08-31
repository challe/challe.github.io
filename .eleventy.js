const CleanCSS = require("clean-css");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // CSS Minification for copied files
  eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
    const isProduction = process.env.NODE_ENV === "production";
    
    if (isProduction) {
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
    }
  });

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