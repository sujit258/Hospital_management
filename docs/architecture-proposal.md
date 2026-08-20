# HOMEOPATHIC CLINIC SaaS - Architecture Proposal

## Current State Analysis

### Strengths
- Next.js 14 with App Router and TypeScript
- PostgreSQL with Prisma ORM  
- Multi-tenant architecture (Hospital model)
- RBAC system with role-based permissions
- NextAuth authentication
- Basic models: Patient, Appointment, Encounter, Prescription
- Tenant isolation via hospitalId

### Gaps to Address
- Missing AI Gateway architecture
- No WhatsApp integration
- No AI safety controls and audit logging
- No mobile-responsive interface
- Not structured as monorepo with Turborepo
- Missing many homeopathic-specific features

### Out of Scope (Simplified MVP)
- Consent management system
- Complex AI artifact review workflow
- Notebook OCR import
- Voice consultation
- Native mobile app (React Native) - using responsive web instead

## Recommended Architecture

**Hybrid Approach:** Restructure existing foundation into monorepo, extend models, add AI safety layer, implement missing features.

### Key Changes
1. Restructure to Turborepo monorepo
2. Add NestJS backend API (separate from Next.js web)
3. Extend Prisma models for simplified AI and WhatsApp
4. Implement simplified AI Gateway with basic safety controls
5. Add Redis + BullMQ for background jobs
6. Integrate WhatsApp Cloud API
7. Create mobile-responsive web interface (no native mobile app)

## Proposed Monorepo Structure

```
homeo-clinic/
  apps/
    web/              # Next.js web application (existing, refactored, mobile-responsive)
    api/              # NestJS backend API (new)
  packages/
    types/            # Shared TypeScript types
    validation/       # Shared Zod schemas
    config/           # Shared configuration
    ui/               # Shared UI components (mobile-responsive)
  prisma/
    schema.prisma
    seed.ts
    migrations/
  docs/
    architecture.md
    ai-safety.md
    ai-data-flow.md
    whatsapp.md
    security.md
    deployment.md
  docker/
    Dockerfile.web
    Dockerfile.api
  .env.example
  package.json
  pnpm-workspace.yaml
  turbo.json
  README.md
```

## Backend Module Structure (apps/api/src/)

```
apps/api/src/
  auth/              # Authentication module
  clinics/           # Clinic management
  users/             # User management
  doctors/           # Doctor profiles
  patients/          # Patient management
  appointments/      # Appointment scheduling
  consultations/     # Consultation records
  prescriptions/     # Prescription management
  followups/         # Follow-up tracking
  whatsapp/          # WhatsApp integration
  feedback/          # Patient feedback
  notifications/     # Notification system
  reports/           # Reporting module
  ai/                # Simplified AI Gateway (NEW)
    ai.gateway.ts
    ai.policy.ts
    ai.audit.service.ts
    ai.validation.service.ts
    ai.safety.service.ts
    ai.providers/
    tasks/
      patient-summary/
      whatsapp-extraction/
  audit/             # Audit logging
  files/             # File management
  common/            # Shared utilities
```

## Technology Stack Alignment

### Web (apps/web)
- Keep: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- Add: TanStack Query, React Hook Form, Zod, date-fns, Lucide
- Focus: Mobile-responsive design, touch-friendly interactions
- Remove: React Query (upgrade to TanStack Query)

### Backend (apps/api) - NEW
- Node.js
- TypeScript
- NestJS
- Prisma (shared schema)
- PostgreSQL (shared database)
- Redis
- BullMQ
- Swagger/OpenAPI
- Pino structured logging

### Infrastructure
- S3-compatible object storage
- Official Meta WhatsApp Cloud API
- Managed PostgreSQL
- Managed Redis
- Web hosting (Vercel for web, separate for API)

## Migration Strategy

### Phase 0: Repository Restructuring
- Initialize Turborepo
- Create monorepo structure
- Move existing web code to apps/web
- Set up shared packages

### Phase 1: Backend Foundation
- Create NestJS API structure
- Set up Prisma with simplified models
- Implement authentication
- Implement tenant isolation

### Phase 2: Core Features Migration
- Migrate patient management
- Migrate appointments
- Migrate consultations
- Migrate prescriptions

### Phase 3: New Features
- Simplified AI Gateway implementation
- WhatsApp integration
- Mobile-responsive web interface

### Phase 4: Production Hardening
- Security hardening
- Performance optimization
- Monitoring and deployment

## Database Migration Strategy

### Existing Models to Keep
- Hospital → rename to Clinic
- User → extend with new roles
- Patient → extend with homeopathic fields
- Practitioner → rename to DoctorProfile
- Appointment → extend with new types
- Encounter → rename to Consultation
- Prescription → extend with homeopathic items
- AuditLog → Keep, extend for AI events
- Permission → Keep
- RolePermission → Keep
- UserPermission → Keep

### New Models to Add
- WhatsAppTemplate - WhatsApp message templates
- WhatsAppMessage - WhatsApp message tracking
- FollowUp - Follow-up management
- FileAsset - File storage management
- Feedback - Patient feedback
- Notification - Notification system
- AIAuditEvent - Simplified AI audit events

### Models to Remove
- PatientRegistration - Replace with proper patient registration flow
- ContentPage - Not needed for MVP
- BlogPost - Not needed for MVP
- Media - Replace with FileAsset
- Invoice - Keep but simplify for MVP
- InvoiceItem - Keep but simplify for MVP
- Payment - Keep but simplify for MVP
- ConsentRecord - Out of scope for simplified MVP
- AIArtifact - Out of scope for simplified MVP
- ImportedRecord - Out of scope for simplified MVP (no notebook OCR)

## Security Considerations

### Existing Security (Keep)
- Password hashing with bcrypt
- RBAC system
- Tenant isolation
- Audit logging

### New Security Requirements
- AI Gateway as untrusted input
- Data minimization for AI
- Provider privacy controls
- Retention policies
- Enhanced audit logging for AI

## AI Safety Architecture (Simplified)

### Core Principle
AI may OBSERVE, EXTRACT, STRUCTURE, SUMMARIZE and HIGHLIGHT.
AI must NOT independently diagnose, prescribe, or make clinical decisions.

### Safety Layers (Simplified)
1. AI Gateway abstraction
2. Data minimization
3. Output validation
4. Basic safety checks
5. Simple audit logging
6. Confidence evaluation

### Clinical Information Flow (Simplified)
AI draft → basic validation → human review → approval → official record → audit log

## Deployment Strategy

### Development
- Local development with Docker Compose
- Local PostgreSQL, Redis
- Local web and API servers

### Production
- Managed PostgreSQL
- Managed Redis
- S3-compatible storage
- Vercel for web
- Separate hosting for API
- Meta WhatsApp Cloud API

## Timeline Estimate (Simplified)

- Phase 0: 1-2 days (Repository Architecture)
- Phase 1: 3-5 days (Database + Auth + Tenant Isolation)
- Phase 2: 2-3 days (Patient Management)
- Phase 3: 2-3 days (Appointments)
- Phase 4: 3-4 days (Consultations + Prescriptions + Follow-ups)
- Phase 5: 2-3 days (Dashboard + Reports)
- Phase 6: 3-4 days (WhatsApp Integration)
- Phase 7: 3-4 days (Simplified AI Integration)
- Phase 8: 2-3 days (Responsive Web Optimization)
- Phase 9: 2-3 days (Security + Performance + Production)

Total: ~23-34 days for simplified MVP
