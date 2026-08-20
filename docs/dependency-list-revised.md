# HOMEOPATHIC CLINIC SaaS - Dependency List (Simplified Scope)

## Root Dependencies

```json
{
  "name": "homeo-clinic",
  "private": true,
  "packageManager": "pnpm@8.15.0",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "db:generate": "cd prisma && prisma generate",
    "db:push": "cd prisma && prisma db push",
    "db:migrate": "cd prisma && prisma migrate dev",
    "db:seed": "cd prisma && ts-node seed.ts",
    "db:studio": "cd prisma && prisma studio"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "prettier": "^3.1.0",
    "turbo": "^1.11.0",
    "typescript": "^5.3.0"
  }
}
```

## apps/web/ - Next.js Web Application (Mobile-Responsive)

```json
{
  "name": "@homeo-clinic/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.17.0",
    "@tanstack/react-query-devtools": "^5.17.0",
    "react-hook-form": "^7.49.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "next-auth": "^4.24.0",
    "@next-auth/prisma-adapter": "^1.0.7",
    "bcryptjs": "^2.4.3",
    "date-fns": "^3.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.303.0",
    "framer-motion": "^10.16.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@homeo-clinic/types": "workspace:*",
    "@homeo-clinic/validation": "workspace:*",
    "@homeo-clinic/config": "workspace:*",
    "@homeo-clinic/ui": "workspace:*"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

## apps/api/ - NestJS Backend API

```json
{
  "name": "@homeo-clinic/api",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "nest start",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/platform-express": "^10.3.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/swagger": "^7.1.17",
    "@nestjs/bull": "^10.1.0",
    "@nestjs/schedule": "^4.0.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "@prisma/client": "^5.7.0",
    "bull": "^4.12.0",
    "ioredis": "^5.3.2",
    "pino": "^8.17.0",
    "pino-pretty": "^10.3.0",
    "axios": "^1.6.0",
    "form-data": "^4.0.0",
    "openai": "^4.20.0",
    "@anthropic-ai/sdk": "^0.12.0",
    "sharp": "^0.33.0",
    "aws-sdk": "^2.1500.0",
    "@aws-sdk/client-s3": "^3.470.0",
    "nodemailer": "^6.9.0",
    "twilio": "^4.19.0",
    "zod": "^3.22.0",
    "@homeo-clinic/types": "workspace:*",
    "@homeo-clinic/validation": "workspace:*",
    "@homeo-clinic/config": "workspace:*",
    "reflect-metadata": "^0.1.14",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "@nestjs/schematics": "^10.1.0",
    "@nestjs/testing": "^10.3.0",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.0",
    "@types/passport-jwt": "^4.0.0",
    "@types/passport-local": "^1.0.38",
    "@types/bcrypt": "^5.0.2",
    "@types/multer": "^1.4.11",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.56.0",
    "jest": "^29.7.0",
    "prisma": "^5.7.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.5.0",
    "ts-node": "^10.9.0",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.0"
  }
}
```

## packages/types/ - Shared TypeScript Types

```json
{
  "name": "@homeo-clinic/types",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

## packages/validation/ - Shared Zod Schemas

```json
{
  "name": "@homeo-clinic/validation",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "zod": "^3.22.0",
    "@homeo-clinic/types": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

## packages/config/ - Shared Configuration

```json
{
  "name": "@homeo-clinic/config",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "ioredis": "^5.3.2",
    "@aws-sdk/client-s3": "^3.470.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0"
  }
}
```

## packages/ui/ - Shared UI Components (Mobile-Responsive)

```json
{
  "name": "@homeo-clinic/ui",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.303.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## Prisma Dependencies

```json
{
  "name": "prisma",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "generate": "prisma generate",
    "push": "prisma db push",
    "migrate": "prisma migrate dev",
    "studio": "prisma studio",
    "seed": "ts-node seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0",
    "ts-node": "^10.9.0",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0"
  }
}
```

## Docker Dependencies

```dockerfile
# Dockerfile.web
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]

# Dockerfile.api
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3001
CMD ["pnpm", "start:prod"]
```

## Development Tools

### Root DevDependencies
- **pnpm**: Package manager for monorepo
- **turbo**: Build system for monorepo
- **typescript**: TypeScript compiler
- **prettier**: Code formatter

### Web DevDependencies
- **eslint**: Linting
- **eslint-config-next**: Next.js ESLint config
- **autoprefixer**: PostCSS plugin
- **postcss**: CSS processor
- **tailwindcss**: Utility-first CSS
- **@types/**: TypeScript type definitions

### API DevDependencies
- **@nestjs/cli**: NestJS CLI
- **@nestjs/schematics**: NestJS schematics
- **@nestjs/testing**: NestJS testing
- **jest**: Testing framework
- **ts-jest**: Jest TypeScript preprocessor
- **ts-loader**: TypeScript loader
- **ts-node**: TypeScript execution
- **tsconfig-paths**: Path mapping
- **@types/**: TypeScript type definitions

## Production Services

### Database
- **PostgreSQL**: Primary database (managed service recommended)

### Cache & Queue
- **Redis**: Caching and BullMQ queue (managed service recommended)

### Storage
- **S3-compatible**: Object storage for files (AWS S3, DigitalOcean Spaces, etc.)

### WhatsApp
- **Meta WhatsApp Cloud API**: Official WhatsApp Business API

### AI Providers (Simplified)
- **OpenAI**: GPT models (optional, for patient summary and WhatsApp analysis)
- **Anthropic**: Claude models (optional, alternative to OpenAI)

## Removed Dependencies (Simplified Scope)

### Mobile App Dependencies (Removed)
- React Native
- Expo
- Expo Router
- react-native-safe-area-context
- react-native-screens
- lucide-react-native
- nativewind

### OCR Dependencies (Removed)
- tesseract.js (no notebook OCR)

### Voice/Audio Dependencies (Removed)
- No audio processing libraries (no voice consultation)

### Complex AI Artifact Dependencies (Removed)
- No complex artifact lifecycle libraries
- Simplified to basic AI audit logging

### Consent Management Dependencies (Removed)
- No consent-specific libraries
- Simplified to basic terms acceptance

## Optional Dependencies

### Monitoring & Observability
- **Sentry**: Error tracking
- **DataDog**: Application monitoring
- **Grafana**: Metrics visualization

### Testing
- **Playwright**: E2E testing for web
- **Supertest**: API testing

### Documentation
- **Storybook**: Component documentation
- **Docusaurus**: Documentation site

## Security Dependencies

### Web
- **helmet**: Security headers
- **cors**: CORS middleware
- **rate-limiter-flexible**: Rate limiting

### API
- **helmet**: Security headers
- **cors**: CORS middleware
- **rate-limiter-flexible**: Rate limiting
- **csurf**: CSRF protection
- **express-rate-limit**: Rate limiting

## Version Strategy

### Core Dependencies
- Use stable, well-maintained versions
- Pin major versions in package.json
- Use caret (^) for minor/patch updates

### AI Dependencies
- Pin specific versions for AI providers
- Monitor for breaking changes
- Test thoroughly before upgrades

### Development Dependencies
- Allow more flexibility with caret (^)
- Update regularly for security patches

## Dependency Updates

### Monthly
- Review security advisories
- Update development dependencies
- Check for deprecated packages

### Quarterly
- Review major version updates
- Test compatibility
- Update documentation

### As Needed
- Security patches (immediate)
- Critical bug fixes
- Feature requirements

## Dependency Security

### Automated Security Scanning
- **npm audit**: Run regularly
- **Snyk**: Dependency vulnerability scanning
- **Dependabot**: Automated dependency updates

### Manual Review
- Review new dependencies before adding
- Check maintenance status
- Verify license compatibility
- Assess security reputation

### Best Practices
- Lock dependency versions in production
- Use private npm registry for sensitive packages
- Regular security audits
- Keep dependencies updated
