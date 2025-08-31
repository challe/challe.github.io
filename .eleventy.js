module.exports = function(eleventyConfig) {
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