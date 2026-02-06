# Vercel Deployment Configuration

## How It Works

This project uses a hybrid build approach for Vercel deployment:

1. **Source Code**: All TypeScript source files are in `src/`
2. **Build Process**: TypeScript compiles to `dist/` directory
3. **Serverless Handler**: `api/index.ts` imports from the built `dist/` files
4. **Vercel Build**: Runs `npm run build` during deployment

## Directory Structure

```
├── src/                    # TypeScript source files
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.ts           # Local development entry point
├── api/                    # Vercel serverless functions
│   └── index.ts           # Vercel serverless handler
├── dist/                   # Compiled JavaScript (gitignored)
└── vercel.json            # Vercel configuration
```

## Build Flow

1. Vercel clones the repository
2. Runs `vercel-build` script → `npm run build`
3. TypeScript compiles `src/` → `dist/`
4. Vercel packages `api/index.ts` (which imports from `dist/`)
5. Serverless function is deployed

## Important Files

- `.vercelignore`: Excludes `dist/` from upload (build happens during deploy)
- `.gitignore`: No longer excludes `api/` (contains source handler)
- `vercel.json`: Specifies build command
