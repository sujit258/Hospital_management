# HOMEOPATHIC CLINIC SaaS - Folder Structure

## Root Structure

```
homeo-clinic/
├── apps/                    # Application packages
│   ├── web/                # Next.js web application
│   ├── mobile/             # React Native mobile app
│   └── api/                # NestJS backend API
├── packages/               # Shared packages
│   ├── types/              # Shared TypeScript types
│   ├── validation/         # Shared Zod schemas
│   ├── config/             # Shared configuration
│   └── ui/                 # Shared UI components
├── prisma/                 # Database schema and migrations
├── docs/                   # Documentation
├── docker/                 # Docker configurations
├── .env.example           # Environment variables template
├── package.json           # Root package.json
├── pnpm-workspace.yaml    # PNPM workspace configuration
├── turbo.json             # Turborepo configuration
└── README.md              # Main documentation
```

## apps/web/ - Next.js Web Application

```
apps/web/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth group routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/         # Dashboard group routes
│   │   │   ├── dashboard/
│   │   │   ├── patients/
│   │   │   ├── appointments/
│   │   │   ├── consultations/
│   │   │   ├── prescriptions/
│   │   │   ├── followups/
│   │   │   ├── whatsapp/
│   │   │   ├── imports/
│   │   │   ├── reports/
│   │   │   ├── ai-audit/
│   │   │   └── settings/
│   │   ├── api/                 # API routes (if needed)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── dashboard/           # Dashboard components
│   │   ├── patients/            # Patient components
│   │   ├── appointments/        # Appointment components
│   │   ├── consultations/       # Consultation components
│   │   ├── prescriptions/       # Prescription components
│   │   ├── followups/           # Follow-up components
│   │   ├── whatsapp/            # WhatsApp components
│   │   ├── ai/                  # AI-related components
│   │   │   ├── review-cards/
│   │   │   ├── confidence-badges/
│   │   │   └── source-links/
│   │   └── layout/              # Layout components
│   ├── lib/
│   │   ├── api/                 # API client
│   │   ├── auth/                # Auth utilities
│   │   └── utils/               # General utilities
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useClinic.ts
│   │   └── useAI.ts
│   └── styles/
│       └── globals.css
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## apps/mobile/ - React Native Mobile App

```
apps/mobile/
├── src/
│   ├── app/                      # Expo Router
│   │   ├── (auth)/              # Auth group
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── (tabs)/              # Tab navigation
│   │   │   ├── home.tsx
│   │   │   ├── find.tsx
│   │   │   ├── ai.tsx
│   │   │   ├── health.tsx
│   │   │   └── menu.tsx
│   │   ├── patients/
│   │   ├── appointments/
│   │   ├── consultations/
│   │   └── _layout.tsx
│   ├── components/
│   │   ├── ui/                  # UI components
│   │   ├── patients/
│   │   ├── appointments/
│   │   └── consultations/
│   ├── lib/
│   │   ├── api/                 # API client
│   │   └── utils/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useClinic.ts
│   └── styles/
├── assets/                      # Images, fonts
├── app.json
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## apps/api/ - NestJS Backend API

```
apps/api/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── guards/
│   │   │   ├── jwt.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   ├── clinics/                 # Clinic management
│   │   ├── clinics.controller.ts
│   │   ├── clinics.service.ts
│   │   ├── clinics.module.ts
│   │   └── dto/
│   ├── users/                   # User management
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   ├── doctors/                 # Doctor profiles
│   │   ├── doctors.controller.ts
│   │   ├── doctors.service.ts
│   │   ├── doctors.module.ts
│   │   └── dto/
│   ├── patients/                # Patient management
│   │   ├── patients.controller.ts
│   │   ├── patients.service.ts
│   │   ├── patients.module.ts
│   │   └── dto/
│   ├── appointments/            # Appointment scheduling
│   │   ├── appointments.controller.ts
│   │   ├── appointments.service.ts
│   │   ├── appointments.module.ts
│   │   └── dto/
│   ├── consultations/           # Consultation records
│   │   ├── consultations.controller.ts
│   │   ├── consultations.service.ts
│   │   ├── consultations.module.ts
│   │   └── dto/
│   ├── prescriptions/           # Prescription management
│   │   ├── prescriptions.controller.ts
│   │   ├── prescriptions.service.ts
│   │   ├── prescriptions.module.ts
│   │   └── dto/
│   ├── followups/               # Follow-up tracking
│   │   ├── followups.controller.ts
│   │   ├── followups.service.ts
│   │   ├── followups.module.ts
│   │   └── dto/
│   ├── whatsapp/                # WhatsApp integration
│   │   ├── whatsapp.controller.ts
│   │   ├── whatsapp.service.ts
│   │   ├── whatsapp.module.ts
│   │   ├── webhook.controller.ts
│   │   └── dto/
│   ├── feedback/                # Patient feedback
│   │   ├── feedback.controller.ts
│   │   ├── feedback.service.ts
│   │   ├── feedback.module.ts
│   │   └── dto/
│   ├── notifications/            # Notification system
│   │   ├── notifications.controller.ts
│   │   ├── notifications.service.ts
│   │   ├── notifications.module.ts
│   │   └── dto/
│   ├── reports/                 # Reporting module
│   │   ├── reports.controller.ts
│   │   ├── reports.service.ts
│   │   ├── reports.module.ts
│   │   └── dto/
│   ├── imports/                 # Notebook import
│   │   ├── imports.controller.ts
│   │   ├── imports.service.ts
│   │   ├── imports.module.ts
│   │   ├── ocr.service.ts
│   │   └── dto/
│   ├── ai/                      # AI Gateway (NEW)
│   │   ├── ai.gateway.ts
│   │   ├── ai.policy.ts
│   │   ├── ai.audit.service.ts
│   │   ├── ai.validation.service.ts
│   │   ├── ai.redaction.service.ts
│   │   ├── ai.safety.service.ts
│   │   ├── ai.controller.ts
│   │   ├── ai.module.ts
│   │   ├── providers/
│   │   │   ├── base.provider.ts
│   │   │   ├── openai.provider.ts
│   │   │   ├── anthropic.provider.ts
│   │   │   └── index.ts
│   │   ├── tasks/
│   │   │   ├── consultation-notes/
│   │   │   │   ├── consultation-notes.service.ts
│   │   │   │   ├── dto.ts
│   │   │   │   └── schemas.ts
│   │   │   ├── patient-summary/
│   │   │   │   ├── patient-summary.service.ts
│   │   │   │   ├── dto.ts
│   │   │   │   └── schemas.ts
│   │   │   ├── whatsapp-extraction/
│   │   │   │   ├── whatsapp-extraction.service.ts
│   │   │   │   ├── dto.ts
│   │   │   │   └── schemas.ts
│   │   │   └── notebook-ocr/
│   │   │       ├── notebook-ocr.service.ts
│   │   │       ├── dto.ts
│   │   │       └── schemas.ts
│   │   └── dto/
│   ├── audit/                   # Audit logging
│   │   ├── audit.service.ts
│   │   ├── audit.module.ts
│   │   └── dto/
│   ├── files/                   # File management
│   │   ├── files.controller.ts
│   │   ├── files.service.ts
│   │   ├── files.module.ts
│   │   └── dto/
│   ├── common/                  # Shared utilities
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   └── utils/
│   ├── main.ts                  # Application entry point
│   └── app.module.ts            # Root module
├── test/                        # Test files
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .eslintrc.js
```

## packages/types/ - Shared TypeScript Types

```
packages/types/
├── src/
│   ├── index.ts                 # Main export
│   ├── auth.types.ts
│   ├── clinic.types.ts
│   ├── user.types.ts
│   ├── patient.types.ts
│   ├── appointment.types.ts
│   ├── consultation.types.ts
│   ├── prescription.types.ts
│   ├── followup.types.ts
│   ├── whatsapp.types.ts
│   ├── ai.types.ts
│   ├── consent.types.ts
│   └── audit.types.ts
├── package.json
└── tsconfig.json
```

## packages/validation/ - Shared Zod Schemas

```
packages/validation/
├── src/
│   ├── index.ts                 # Main export
│   ├── auth.schema.ts
│   ├── clinic.schema.ts
│   ├── user.schema.ts
│   ├── patient.schema.ts
│   ├── appointment.schema.ts
│   ├── consultation.schema.ts
│   ├── prescription.schema.ts
│   ├── followup.schema.ts
│   ├── whatsapp.schema.ts
│   ├── ai.schema.ts
│   └── consent.schema.ts
├── package.json
└── tsconfig.json
```

## packages/config/ - Shared Configuration

```
packages/config/
├── src/
│   ├── index.ts
│   ├── database.config.ts
│   ├── redis.config.ts
│   ├── storage.config.ts
│   ├── whatsapp.config.ts
│   └── ai.config.ts
├── package.json
└── tsconfig.json
```

## packages/ui/ - Shared UI Components

```
packages/ui/
├── src/
│   ├── index.ts
│   ├── components/
│   │   ├── buttons/
│   │   ├── inputs/
│   │   ├── cards/
│   │   ├── modals/
│   │   ├── badges/
│   │   └── tables/
│   └── styles/
├── package.json
└── tsconfig.json
```

## prisma/ - Database Schema

```
prisma/
├── schema.prisma               # Main schema
├── seed.ts                     # Database seeding
└── migrations/                 # Migration files
```

## docs/ - Documentation

```
docs/
├── architecture.md             # Architecture overview
├── ai-safety.md                # AI safety documentation
├── ai-data-flow.md             # AI data flow documentation
├── consent.md                  # Consent management
├── retention.md                # Data retention policies
├── whatsapp.md                 # WhatsApp integration
├── notebook-import.md          # Notebook import process
├── security.md                 # Security documentation
└── deployment.md               # Deployment guide
```

## docker/ - Docker Configurations

```
docker/
├── Dockerfile.web              # Web app Dockerfile
├── Dockerfile.api              # API Dockerfile
├── Dockerfile.mobile          # Mobile build Dockerfile
└── docker-compose.yml         # Local development
```

## Root Configuration Files

```
homeo-clinic/
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # PNPM workspace configuration
├── turbo.json                 # Turborepo configuration
├── README.md                  # Main documentation
└── tsconfig.json              # Root TypeScript config
```

## Key Design Decisions

1. **Monorepo Structure**: Turborepo for efficient build and development
2. **Shared Packages**: Types, validation, config, and UI shared across apps
3. **Separate Backend**: NestJS API for robust backend architecture
4. **AI Module Isolation**: AI Gateway as separate module with strict boundaries
5. **Clear Separation**: Web, mobile, and API as separate applications
6. **Documentation**: Comprehensive docs folder for all major systems
