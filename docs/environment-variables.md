# HOMEOPATHIC CLINIC SaaS - Environment Variables

## Root Environment Variables (.env.example)

```bash
# ============================================
# APPLICATION
# ============================================
NODE_ENV=development
APP_NAME=Homeo Clinic SaaS
APP_URL=http://localhost:3000
API_URL=http://localhost:3001

# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/homeo_clinic?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/homeo_clinic?schema=public"

# ============================================
# REDIS
# ============================================
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# ============================================
# AUTHENTICATION
# ============================================
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-change-in-production
JWT_EXPIRY=7d

# ============================================
# AI PROVIDERS
# ============================================
# OpenAI (Optional)
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MAX_TOKENS=2000

# Anthropic (Optional)
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-3-opus-20240229
ANTHROPIC_MAX_TOKENS=2000

# AI Configuration
AI_ENABLED=false
AI_PROVIDER=openai
AI_DEFAULT_MODEL=gpt-4-turbo-preview
AI_TIMEOUT=30000
AI_MAX_RETRIES=3

# ============================================
# WHATSAPP
# ============================================
WHATSAPP_ENABLED=false
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=
WHATSAPP_WEBHOOK_SECRET=

# ============================================
# STORAGE (S3-compatible)
# ============================================
STORAGE_PROVIDER=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=homeo-clinic-uploads
AWS_S3_ENDPOINT=
STORAGE_PUBLIC_URL=https://your-bucket.s3.amazonaws.com

# ============================================
# EMAIL
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@homeoclinic.com
SMTP_FROM_NAME=Homeo Clinic

# ============================================
# SMS (Optional)
# ============================================
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# ============================================
# MULTI-TENANCY
# ============================================
APP_BASE_DOMAIN=homeoclinic.com
DEFAULT_CLINIC_SLUG=demo

# ============================================
# SECURITY
# ============================================
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100

# ============================================
# LOGGING
# ============================================
LOG_LEVEL=info
LOG_FORMAT=json

# ============================================
# MONITORING (Optional)
# ============================================
SENTRY_DSN=
SENTRY_ENVIRONMENT=development
DATADOG_API_KEY=

# ============================================
# FEATURES
# ============================================
FEATURE_AI_CONSULTATION=false
FEATURE_AI_SUMMARY=false
FEATURE_AI_WHATSAPP=false
FEATURE_AI_OCR=false
FEATURE_WHATSAPP=false
FEATURE_NOTEBOOK_IMPORT=false
FEATURE_VOICE_CONSULTATION=false

# ============================================
# RETENTION POLICIES
# ============================================
AI_ARTIFACT_RETENTION_DAYS=30
RAW_AUDIO_RETENTION_HOURS=24
NOTEBOOK_ORIGINAL_RETENTION_DAYS=365
AUDIT_LOG_RETENTION_DAYS=90
```

## apps/web/ Specific Environment Variables

```bash
# ============================================
# NEXT.JS WEB
# ============================================
NEXT_PUBLIC_APP_NAME=Homeo Clinic
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ============================================
# NEXTAUTH
# ============================================
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000

# ============================================
# FEATURES
# ============================================
NEXT_PUBLIC_ENABLE_AI=false
NEXT_PUBLIC_ENABLE_WHATSAPP=false
NEXT_PUBLIC_ENABLE_VOICE=false
```

## apps/mobile/ Specific Environment Variables

```bash
# ============================================
# EXPO MOBILE
# ============================================
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_APP_NAME=Homeo Clinic

# ============================================
# FEATURES
# ============================================
EXPO_PUBLIC_ENABLE_AI=false
EXPO_PUBLIC_ENABLE_WHATSAPP=false
EXPO_PUBLIC_ENABLE_VOICE=false
```

## apps/api/ Specific Environment Variables

```bash
# ============================================
# NESTJS API
# ============================================
PORT=3001
API_PREFIX=api/v1

# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/homeo_clinic?schema=public"

# ============================================
# REDIS
# ============================================
REDIS_URL=redis://localhost:6379

# ============================================
# JWT
# ============================================
JWT_SECRET=your-jwt-secret-change-in-production
JWT_EXPIRY=7d

# ============================================
# AI PROVIDERS
# ============================================
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
AI_ENABLED=false
AI_PROVIDER=openai

# ============================================
# WHATSAPP
# ============================================
WHATSAPP_ENABLED=false
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=

# ============================================
# STORAGE
# ============================================
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=homeo-clinic-uploads

# ============================================
# EMAIL
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# ============================================
# SECURITY
# ============================================
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_ENABLED=true
```

## Production Environment Variables

### Required for Production
```bash
NODE_ENV=production
DATABASE_URL=<managed-postgres-url>
REDIS_URL=<managed-redis-url>
NEXTAUTH_SECRET=<strong-random-secret>
JWT_SECRET=<strong-random-secret>
AWS_ACCESS_KEY_ID=<aws-access-key>
AWS_SECRET_ACCESS_KEY=<aws-secret-key>
```

### Recommended for Production
```bash
# AI Providers (if enabled)
OPENAI_API_KEY=<openai-api-key>
ANTHROPIC_API_KEY=<anthropic-api-key>

# WhatsApp (if enabled)
WHATSAPP_PHONE_NUMBER_ID=<whatsapp-phone-id>
WHATSAPP_ACCESS_TOKEN=<whatsapp-access-token>

# Monitoring
SENTRY_DSN=<sentry-dsn>
DATADOG_API_KEY=<datadog-api-key>

# Email
SMTP_HOST=<smtp-host>
SMTP_USER=<smtp-user>
SMTP_PASS=<smtp-password>
```

### Optional for Production
```bash
# SMS (if needed)
TWILIO_ACCOUNT_SID=<twilio-account-sid>
TWILIO_AUTH_TOKEN=<twilio-auth-token>
TWILIO_PHONE_NUMBER=<twilio-phone-number>

# Custom Domain
APP_BASE_DOMAIN=yourdomain.com
```

## Development Environment Variables

### Local Development
```bash
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/homeo_clinic?schema=public"
REDIS_URL=redis://localhost:6379
NEXTAUTH_SECRET=dev-secret-change-in-production
JWT_SECRET=dev-jwt-secret-change-in-production
```

### Docker Development
```bash
# Use docker-compose.yml for local services
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/homeo_clinic?schema=public
REDIS_URL=redis://redis:6379
```

## Environment Variable Categories

### Critical (Required for Basic Functionality)
- `DATABASE_URL` - Database connection
- `REDIS_URL` - Redis connection
- `NEXTAUTH_SECRET` - NextAuth secret
- `JWT_SECRET` - JWT signing secret

### Important (Required for Full Functionality)
- `AI_PROVIDER` - AI provider selection
- `WHATSAPP_ENABLED` - WhatsApp integration
- `STORAGE_PROVIDER` - File storage
- `SMTP_*` - Email configuration

### Optional (Enhanced Features)
- `OPENAI_API_KEY` - OpenAI integration
- `ANTHROPIC_API_KEY` - Anthropic integration
- `TWILIO_*` - SMS integration
- `SENTRY_DSN` - Error tracking
- `DATADOG_API_KEY` - Monitoring

### Development Only
- `NODE_ENV` - Environment mode
- `LOG_LEVEL` - Logging verbosity
- `FEATURE_*` - Feature flags

## Security Guidelines

### Secret Management
1. **Never commit secrets to git**
2. Use environment-specific `.env` files
3. Use secret management services in production:
   - Vercel Environment Variables
   - AWS Secrets Manager
   - HashiCorp Vault
4. Rotate secrets regularly
5. Use different secrets for different environments

### Strong Secrets
- Use cryptographically secure random strings
- Minimum 32 characters for secrets
- Use different secrets for different purposes
- Never reuse secrets across applications

### Sensitive Variables
These should never be logged or exposed:
- `DATABASE_URL`
- `REDIS_PASSWORD`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `WHATSAPP_ACCESS_TOKEN`
- `AWS_SECRET_ACCESS_KEY`
- `SMTP_PASS`
- `TWILIO_AUTH_TOKEN`

## Environment-Specific Configurations

### Development
```bash
NODE_ENV=development
LOG_LEVEL=debug
FEATURE_AI_CONSULTATION=true
FEATURE_AI_SUMMARY=true
FEATURE_AI_WHATSAPP=true
FEATURE_AI_OCR=true
```

### Staging
```bash
NODE_ENV=staging
LOG_LEVEL=info
FEATURE_AI_CONSULTATION=true
FEATURE_AI_SUMMARY=true
FEATURE_AI_WHATSAPP=false
FEATURE_AI_OCR=true
```

### Production
```bash
NODE_ENV=production
LOG_LEVEL=warn
FEATURE_AI_CONSULTATION=true
FEATURE_AI_SUMMARY=true
FEATURE_AI_WHATSAPP=true
FEATURE_AI_OCR=true
```

## Feature Flags

### AI Features
```bash
FEATURE_AI_CONSULTATION=false  # Voice consultation drafting
FEATURE_AI_SUMMARY=false      # Patient summary generation
FEATURE_AI_WHATSAPP=false     # WhatsApp message extraction
FEATURE_AI_OCR=false          # Notebook OCR
```

### Communication Features
```bash
FEATURE_WHATSAPP=false        # WhatsApp integration
FEATURE_VOICE_CONSULTATION=false  # Voice recording
```

### Import Features
```bash
FEATURE_NOTEBOOK_IMPORT=false  # Notebook import
```

## Validation Rules

### Database URL
- Must be valid PostgreSQL connection string
- Must include schema parameter
- Must use SSL in production

### Redis URL
- Must be valid Redis connection string
- Must include password if required

### API Keys
- Must be non-empty when feature is enabled
- Must be valid format for provider

### Secrets
- Must be minimum 32 characters
- Must be cryptographically random
- Must be unique per environment

## Loading Priority

1. System environment variables
2. `.env.local` (local development)
3. `.env.development` / `.env.production`
4. `.env` (default)

## Docker Compose Variables

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    environment:
      POSTGRES_DB: homeo_clinic
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
  
  redis:
    environment:
      REDIS_PASSWORD: 
  
  web:
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/homeo_clinic?schema=public
      REDIS_URL: redis://redis:6379
  
  api:
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/homeo_clinic?schema=public
      REDIS_URL: redis://redis:6379
```

## Vercel Environment Variables

### Web App
```bash
# Production
DATABASE_URL=${POSTGRES_URL}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=https://yourdomain.com
```

### API (Separate Deployment)
```bash
# Production
DATABASE_URL=${POSTGRES_URL}
REDIS_URL=${REDIS_URL}
JWT_SECRET=${JWT_SECRET}
OPENAI_API_KEY=${OPENAI_API_KEY}
```

## Testing Environment Variables

```bash
NODE_ENV=test
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/homeo_clinic_test?schema=public"
REDIS_URL=redis://localhost:6379/1
JWT_SECRET=test-secret
NEXTAUTH_SECRET=test-secret
AI_ENABLED=false
WHATSAPP_ENABLED=false
```

## Migration Strategy

### From Current App
1. Export existing environment variables
2. Map to new variable names
3. Add new required variables
4. Update application code to use new variables
5. Test in development first
6. Deploy to staging
7. Deploy to production

### Best Practices
1. Document all environment variables
2. Provide example values
3. Include validation in application startup
4. Fail fast on missing required variables
5. Log warnings for optional missing variables
