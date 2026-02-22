#!/bin/bash

# Mo Touch Production Deployment Script
# This script prepares and deploys the Mo Touch project to production

set -e  # Exit on any error

echo "🚀 Starting Mo Touch Production Deployment..."

# Check if we're on the correct branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: Not on main branch. Current branch: $CURRENT_BRANCH"
    echo "Please switch to main branch first: git checkout main"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: There are uncommitted changes"
    echo "Please commit all changes first: git add . && git commit -m 'Production deployment'"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Tests failed"
    exit 1
fi

# Build for production
echo "📦 Building for production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found"
    exit 1
fi

# Get current version
VERSION=$(node -p -e "console.log(require('./package.json').version")")

# Create production build summary
echo "✅ Production build successful"
echo "📊 Build statistics:"
echo "  - Version: $VERSION"
echo "  - Build size: $(du -sh dist | cut -f1)"
echo "  - Files: $(find dist -type f | wc -l)"

# Deploy to GitHub Pages (if configured)
if command -v gh &> /dev/null; then
    echo "🌐 Deploying to GitHub Pages..."
    git add dist
    git commit -m "Deploy version $VERSION" || true
    git subtree push --prefix dist origin gh-pages
    echo "✅ Deployed to GitHub Pages"
    echo "🌍 Live URL: https://sliiqque.github.io/mo-touch/"
else
    echo "📦 Build ready for manual deployment"
    echo "📁 Upload dist/ directory to your hosting provider"
    echo "🌍 Configure your domain to point to the dist/ directory"
fi

echo "🎉 Production deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "  1. Monitor deployment at: https://sliiqque.github.io/mo-touch/"
echo "  2. Test all functionality in production"
echo "  3. Set up analytics and monitoring"
echo "  4. Configure custom domain (if needed)"
