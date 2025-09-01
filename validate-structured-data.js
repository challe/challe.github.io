const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function validateAllFiles() {
  console.log('🔍 Starting structured data validation...\n');
  
  // Find all HTML files in _site
  function findHtmlFiles(dir, files = []) {
    const dirFiles = fs.readdirSync(dir);
    
    for (const file of dirFiles) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findHtmlFiles(fullPath, files);
      } else if (file.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  if (!fs.existsSync('_site')) {
    console.log('❌ _site directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const htmlFiles = findHtmlFiles('_site');
  
  if (htmlFiles.length === 0) {
    console.log('❌ No HTML files found in _site directory.');
    process.exit(1);
  }

  console.log(`Found ${htmlFiles.length} HTML files to validate\n`);

  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithStructuredData = 0;

  for (const file of htmlFiles) {
    const relativePath = path.relative('_site', file);
    console.log(`📄 Validating: ${relativePath}`);
    
    try {
      // Check if file has structured data first
      const content = fs.readFileSync(file, 'utf8');
      const hasStructuredData = content.includes('application/ld+json') || 
                               content.includes('itemscope') || 
                               content.includes('typeof=');
      
      if (!hasStructuredData) {
        console.log('   ℹ️  No structured data found\n');
        continue;
      }

      filesWithStructuredData++;
      
      // Run the structured data testing tool - don't fail on non-zero exit codes
      let stdout = '';
      let stderr = '';
      
      try {
        const result = await execAsync(`sdtt --file "${file}" --presets Google --info`);
        stdout = result.stdout;
        stderr = result.stderr;
      } catch (error) {
        // sdtt returns non-zero exit code when validation fails, but we still want the output
        stdout = error.stdout || '';
        stderr = error.stderr || '';
      }
      
      const output = stdout + stderr;
      
      // Look for test results
      const testFailedMatch = output.match(/✕ (\d+) of (\d+) tests failed/);
      const testPassedMatch = output.match(/✓ (\d+) of (\d+) tests passed/);
      const warningsMatch = output.match(/(\d+) warnings?/);
      
      if (testFailedMatch) {
        const failedTests = parseInt(testFailedMatch[1]);
        const totalTests = parseInt(testFailedMatch[2]);
        console.log(`   ❌ ${failedTests} of ${totalTests} tests failed`);
        totalErrors += failedTests;
        
        // Show the actual validation errors
        const lines = output.split('\n');
        console.log('   📋 Validation details:');
        for (const line of lines) {
          if (line.includes('✕') || line.includes('❌')) {
            console.log(`      ${line.trim()}`);
          }
        }
      } else if (testPassedMatch) {
        const passedTests = parseInt(testPassedMatch[1]);
        const totalTests = parseInt(testPassedMatch[2]);
        
        // Check if there are actual warnings (non-zero warning count)
        if (warningsMatch && parseInt(warningsMatch[1]) > 0) {
          const warningCount = parseInt(warningsMatch[1]);
          console.log(`   ✅ ${passedTests} of ${totalTests} tests passed`);
          console.log(`   ⚠️  ${warningCount} warnings found`);
          totalWarnings += warningCount;
          
          // Show actual warning messages
          const lines = output.split('\n');
          console.log('   📋 Warning details:');
          for (const line of lines) {
            if (line.toLowerCase().includes('warning:') || line.includes('⚠️')) {
              console.log(`      ${line.trim()}`);
            }
          }
        } else {
          console.log(`   ✅ ${passedTests} of ${totalTests} tests passed`);
        }
      } else {
        // Fallback: check for basic indicators
        if (output.includes('✕') || output.toLowerCase().includes('error')) {
          console.log('   ❌ Validation errors found');
          totalErrors++;
        } else {
          console.log('   ✅ Valid structured data');
        }
      }
      
    } catch (error) {
      console.log(`   ❌ Validation failed: ${error.message}`);
      totalErrors++;
    }
    
    console.log('');
  }

  // Summary
  console.log('='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`📄 Files checked: ${htmlFiles.length}`);
  console.log(`🏗️  Files with structured data: ${filesWithStructuredData}`);
  console.log(`✅ Total errors: ${totalErrors}`);
  console.log(`⚠️  Total warnings: ${totalWarnings}`);

  if (totalErrors === 0) {
    console.log('\n🎉 All structured data is valid!');
    process.exit(0);
  } else {
    console.log(`\n💥 Found ${totalErrors} errors that need attention.`);
    process.exit(1);
  }
}

validateAllFiles().catch(error => {
  console.error('Validation script failed:', error);
  process.exit(1);
});
