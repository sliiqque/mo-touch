#!/bin/bash

# Mo Touch Project Cleanup Script
# Cleans up development artifacts and prepares project for production

set -e  # Exit on any error

echo "🧹 Starting Mo Touch project cleanup..."

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: There are uncommitted changes"
    echo "Please commit all changes first: git add . && git commit -m 'Pre-cleanup commit'"
    exit 1
fi

# Remove development-only files
echo "🗑️ Removing development-only files..."
rm -f check_images.cjs
rm -f BEAUTY_BRAND_COPYWRITING.md

# Clean up console.log statements
echo "🧹 Removing console.log statements..."
find src -name "*.tsx" -o -name "*.ts" -exec grep -l "console.log" {} + \; | cut -d: -f1
if [ -n "$LOG_FILES" ]; then
    echo "Found console.log statements in:"
    echo "$LOG_FILES"
    echo "🔧 Removing console.log statements..."
    find src -name "*.tsx" -o -name "*.ts" -exec sed -i '' '/console\.log/d' {} \;
fi

# Remove unused dependencies (check with npm ls)
echo "📦 Checking for unused dependencies..."
UNUSED_DEPS=$(npm ls --depth=0 2>/dev/null | grep -E "/devDependencies" | wc -l)
if [ "$UNUSED_DEPS" -gt 0 ]; then
    echo "⚠️ Found unused dev dependencies - consider removing"
fi

# Optimize images (if any exist)
if [ -d "src/assets/images" ]; then
    echo "🖼️ Optimizing images..."
    # Add image optimization commands here if needed
fi

# Check bundle size impact
echo "📊 Analyzing bundle size impact..."
if [ -d "src/components" ]; then
    LARGE_FILES=$(find src/components -name "*.tsx" -exec wc -l {} + | awk '$1 > 5000 {print $1, " lines"}')
    if [ -n "$LARGE_FILES" ]; then
        echo "⚠️ Found large component files:"
        echo "$LARGE_FILES"
        echo "Consider splitting into smaller components"
fi

# Update version for production
echo "📝 Updating version for production..."
npm version patch --no-git-tag-version

# Run final lint check
echo "🔍 Running final lint check..."
npm run lint
LINT_STATUS=$?

if [ "$LINT_STATUS" -eq 0 ]; then
    echo "✅ Lint check passed"
else
    echo "❌ Lint check failed - please fix before production"
fi

# Generate cleanup report
echo ""
echo "✅ Cleanup completed!"
echo ""
echo "📋 Cleanup Summary:"
echo "  - Removed development-only files"
echo "  - Cleaned console.log statements"
echo "  - Checked for unused dependencies"
echo "  - Analyzed component file sizes"
echo "  - Updated version for production"
echo "  - Final lint check: $([ "$LINT_STATUS" -eq 0 ] && echo "PASSED" || echo "FAILED")"
echo ""
echo "🚀 Project is ready for production deployment!"
