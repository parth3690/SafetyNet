#!/bin/bash

# Script to push Circle Safety App to GitHub
# Run this after creating your GitHub repository

echo "🚀 Circle Safety App - GitHub Push Script"
echo "=========================================="
echo ""

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote 'origin' already configured"
    git remote -v
    echo ""
    read -p "Do you want to push to existing remote? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Exiting. To change remote, run: git remote set-url origin <new-url>"
        exit 1
    fi
else
    echo "⚠️  No remote configured yet"
    echo ""
    echo "Please create a GitHub repository first, then run:"
    echo ""
    echo "  git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
    echo ""
    echo "Or for SSH:"
    echo ""
    echo "  git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git"
    echo ""
    read -p "Have you created the repository and added the remote? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please create the repository first at https://github.com/new"
        exit 1
    fi
    
    read -p "Enter your GitHub repository URL: " REPO_URL
    git remote add origin "$REPO_URL"
    echo "✅ Remote added: $REPO_URL"
fi

echo ""
echo "📦 Pushing to GitHub..."
echo ""

# Ensure we're on main branch
git branch -M main

# Push to GitHub
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Your repository is now live at:"
    git remote get-url origin | sed 's/\.git$//' | sed 's/git@github.com:/https:\/\/github.com\//'
    echo ""
    echo "Next steps:"
    echo "1. Visit your repository on GitHub"
    echo "2. Add a repository description"
    echo "3. Add topics/tags"
    echo "4. Consider adding a LICENSE file"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "1. Authentication: Use Personal Access Token or SSH"
    echo "2. Repository doesn't exist: Create it on GitHub first"
    echo "3. Permissions: Ensure you have write access"
    echo ""
    echo "For help, see GITHUB_SETUP.md"
    exit 1
fi

