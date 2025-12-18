#!/usr/bin/env node
/**
 * Verification script to check tag sitemap consistency
 * This script checks if tag URLs in the sitemap match actual generated tag directories
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const TAG_SITEMAP = path.join(PUBLIC_DIR, 'tag-sitemap.xml');
const TAGS_DIR = path.join(PUBLIC_DIR, 'tags');

function extractTagUrlsFromSitemap() {
  if (!fs.existsSync(TAG_SITEMAP)) {
    console.error('❌ tag-sitemap.xml not found');
    return [];
  }

  const content = fs.readFileSync(TAG_SITEMAP, 'utf8');
  const urlMatches = content.match(/<loc>https?:\/\/[^<]*\/tags\/([^\/<]+)\//g);
  
  if (!urlMatches) {
    return [];
  }

  return urlMatches.map(match => {
    const tagMatch = match.match(/\/tags\/([^\/<]+)\//);
    return tagMatch ? tagMatch[1] : null;
  }).filter(Boolean);
}

function getActualTagDirectories() {
  if (!fs.existsSync(TAGS_DIR)) {
    console.error('❌ tags directory not found');
    return [];
  }

  return fs.readdirSync(TAGS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function checkCaseConsistency() {
  const sitemapTags = extractTagUrlsFromSitemap();
  const actualTags = getActualTagDirectories();

  console.log('\n📊 Tag Analysis\n');
  console.log(`Found ${sitemapTags.length} tags in sitemap`);
  console.log(`Found ${actualTags.length} actual tag directories\n`);

  // Check for case inconsistencies
  const sitemapLower = sitemapTags.map(t => t.toLowerCase());
  const actualLower = actualTags.map(t => t.toLowerCase());

  const sitemapSet = new Set(sitemapTags);
  const actualSet = new Set(actualTags);
  const sitemapLowerSet = new Set(sitemapLower);
  const actualLowerSet = new Set(actualLower);

  // Find tags in sitemap but not in actual directories (case-insensitive)
  const missing = sitemapTags.filter(tag => {
    const lowerTag = tag.toLowerCase();
    return !actualLowerSet.has(lowerTag);
  });

  // Find tags with case mismatches
  const caseMismatches = [];
  sitemapTags.forEach(sitemapTag => {
    const lowerTag = sitemapTag.toLowerCase();
    const matchingActual = actualTags.find(actualTag => actualTag.toLowerCase() === lowerTag);
    if (matchingActual && matchingActual !== sitemapTag) {
      caseMismatches.push({
        sitemap: sitemapTag,
        actual: matchingActual
      });
    }
  });

  // Find duplicate tags (same name, different case)
  const duplicates = [];
  const seen = new Set();
  sitemapTags.forEach(tag => {
    const lowerTag = tag.toLowerCase();
    if (seen.has(lowerTag)) {
      duplicates.push(tag);
    } else {
      seen.add(lowerTag);
    }
  });

  console.log('🔍 Issues Found:\n');

  if (missing.length > 0) {
    console.log(`❌ ${missing.length} tags in sitemap but missing from directories:`);
    missing.forEach(tag => console.log(`   - ${tag}`));
    console.log();
  }

  if (caseMismatches.length > 0) {
    console.log(`⚠️  ${caseMismatches.length} tags with case mismatches:`);
    caseMismatches.forEach(({ sitemap, actual }) => {
      console.log(`   - Sitemap: "${sitemap}" → Actual: "${actual}"`);
    });
    console.log();
  }

  if (duplicates.length > 0) {
    console.log(`⚠️  ${duplicates.length} duplicate tags (same name, different case):`);
    duplicates.forEach(tag => console.log(`   - ${tag}`));
    console.log();
  }

  // Check for uppercase tags (should all be lowercase after fix)
  const uppercaseTags = sitemapTags.filter(tag => {
    return tag !== tag.toLowerCase();
  });

  if (uppercaseTags.length > 0) {
    console.log(`⚠️  ${uppercaseTags.length} tags with uppercase letters (should be lowercase):`);
    uppercaseTags.slice(0, 10).forEach(tag => console.log(`   - ${tag}`));
    if (uppercaseTags.length > 10) {
      console.log(`   ... and ${uppercaseTags.length - 10} more`);
    }
    console.log();
  }

  if (missing.length === 0 && caseMismatches.length === 0 && duplicates.length === 0 && uppercaseTags.length === 0) {
    console.log('✅ All tags are consistent! No issues found.\n');
    return true;
  }

  return false;
}

// Run the check
if (require.main === module) {
  const isConsistent = checkCaseConsistency();
  process.exit(isConsistent ? 0 : 1);
}

module.exports = { checkCaseConsistency, extractTagUrlsFromSitemap, getActualTagDirectories };

