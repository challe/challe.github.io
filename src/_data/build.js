module.exports = function() {
  // Generate a unique build hash based on current timestamp
  const buildHash = Date.now().toString();
  const now = new Date();
  
  return {
    hash: buildHash,
    // Simple date format for sitemaps (YYYY-MM-DD)
    date: now.toISOString().split('T')[0]
  };
};
