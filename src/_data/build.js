module.exports = function() {
  // Generate a unique build hash based on current timestamp
  // You could also use git commit hash, package.json version, or other methods
  const buildHash = Date.now().toString();
  
  return {
    hash: buildHash,
    timestamp: new Date().toISOString()
  };
};
