#!/bin/bash

echo "🔄 Regenerating Prisma Client and Database..."

# Remove Prisma cache
echo "Removing Prisma cache..."
rm -rf node_modules/.prisma 2>/dev/null || true

# Regenerate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push database schema
echo "Pushing database schema..."
npx prisma db push

echo "✅ Prisma regeneration complete!"
echo "💡 Please restart your development server and TypeScript server in VS Code."
echo "   - In VS Code: Ctrl+Shift+P -> TypeScript: Restart TS Server"
echo "   - Terminal: Stop dev server (Ctrl+C) and run 'npm run dev' again"
