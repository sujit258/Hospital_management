# HOMEOPATHIC CLINIC SaaS - Prisma Model Plan

## Model Migration Strategy

### Existing Models (Keep & Extend)
- **Hospital** → Rename to **Clinic**
- **User** → Extend with new roles
- **Patient** → Extend with homeopathic fields
- **Practitioner** → Rename to **DoctorProfile**
- **Appointment** → Extend with new types
- **Encounter** → Rename to **Consultation**
- **Prescription** → Extend with homeopathic items
- **AuditLog** → Keep, extend for AI events
- **Permission** → Keep
- **RolePermission** → Keep
- **UserPermission** → Keep

### New Models (Add)
- **ConsentRecord** - Consent management
- **AIArtifact** - AI intermediate artifacts
- **AIAuditEvent** - AI-specific audit events
- **WhatsAppTemplate** - WhatsApp message templates
- **WhatsAppMessage** - WhatsApp message tracking
- **FollowUp** - Follow-up management
- **FileAsset** - File storage management
- **ImportedRecord** - Notebook import records
- **Feedback** - Patient feedback
- **Notification** - Notification system

### Models to Remove
- **PatientRegistration** - Replace with proper patient registration flow
- **ContentPage** - Not needed for MVP
- **BlogPost** - Not needed for MVP
- **Media** - Replace with FileAsset
- **Invoice** - Keep but simplify for MVP
- **InvoiceItem** - Keep but simplify for MVP
- **Payment** - Keep but simplify for MVP

## Complete Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// CORE TENANCY
// ============================================

model Clinic {
  id                   String                @id @default(cuid())
  name                 String
  slug                 String                @unique
  customDomain         String?               @unique
  isActive             Boolean               @default(true)
  address              String?
  city                 String?
  state                String?
  pincode              String?
  phone                String?
  email                String?
  logo                 String?
  
  // AI Settings
  aiEnabled            Boolean               @default(false)
  aiProvider           String?
  aiModel              String?
  
  // WhatsApp Settings
  whatsappEnabled      Boolean               @default(false)
  whatsappPhoneNumber  String?
  whatsappBusinessId   String?
  
  users                User[]
  patients             Patient[]
  doctors              DoctorProfile[]
  appointments         Appointment[]
  consultations        Consultation[]
  prescriptions        Prescription[]
  followUps            FollowUp[]
  consentRecords       ConsentRecord[]
  aiArtifacts          AIArtifact[]
  aiAuditEvents        AIAuditEvent[]
  whatsappTemplates    WhatsAppTemplate[]
  whatsappMessages     WhatsAppMessage[]
  feedback             Feedback[]
  notifications        Notification[]
  fileAssets           FileAsset[]
  importedRecords      ImportedRecord[]
  auditLogs            AuditLog[]
  rolePermissions      RolePermission[]
  userPermissions      UserPermission[]
  
  createdAt            DateTime              @default(now())
  updatedAt            DateTime              @updatedAt

  @@index([slug])
  @@index([isActive])
}

model User {
  id              String           @id @default(cuid())
  clinic          Clinic?          @relation(fields: [clinicId], references: [id])
  clinicId        String?
  name            String?
  email           String
  phone           String?
  role            Role             @default(PATIENT)
  password        String?
  
  // Profile
  avatar          String?
  isActive        Boolean          @default(true)
  
  // Doctor Profile (if DOCTOR role)
  doctorProfile   DoctorProfile?
  
  // Patient Profile (if PATIENT role)
  patient         Patient?
  
  auditLogs       AuditLog[]
  userPermissions UserPermission[]
  
  // AI Review tracking
  reviewedAiArtifacts AIArtifact[] @relation("AIReviewer")
  
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@unique([email, clinicId])
  @@index([clinicId])
  @@index([role])
}

// ============================================
// DOCTOR PROFILE
// ============================================

model DoctorProfile {
  id            String         @id @default(cuid())
  clinic        Clinic?        @relation(fields: [clinicId], references: [id])
  clinicId      String?
  user          User           @relation(fields: [userId], references: [id])
  userId        String         @unique
  
  // Professional Details
  specialty     String?
  qualification String?
  experience    Int?
  languages     String[]       @default([])
  
  // Availability
  availability  String?
  
  // Homeopathic Specific
  homeopathicQualification String?
  registrationNumber      String?
  
  appointments  Appointment[]
  consultations Consultation[]
  prescriptions Prescription[]
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([clinicId])
}

// ============================================
// PATIENT
// ============================================

model Patient {
  id                   String                @id @default(cuid())
  clinic               Clinic?               @relation(fields: [clinicId], references: [id])
  clinicId             String?
  
  // Patient Code (auto-generated)
  patientCode          String                @unique
  
  // Personal Info
  firstName            String
  lastName             String?
  fullName             String
  gender               String
  dateOfBirth          DateTime
  
  // Contact
  phone                String
  whatsappNumber       String?
  email                String?
  
  // Address
  address              String?
  city                 String?
  state                String?
  pincode              String?
  
  // Emergency Contact
  emergencyContactName String?
  emergencyContactPhone String?
  
  // Medical
  bloodGroup           String?
  allergies            String?
  chronicConditions    String?
  
  // Notes
  notes                String?
  
  // Relations
  user                 User?                 @relation(fields: [userId], references: [id])
  userId               String?               @unique
  
  consultations        Consultation[]
  appointments         Appointment[]
  prescriptions        Prescription[]
  followUps            FollowUp[]
  consentRecords       ConsentRecord[]
  aiArtifacts          AIArtifact[]
  feedback             Feedback[]
  importedRecords      ImportedRecord[]
  
  createdAt            DateTime              @default(now())
  updatedAt            DateTime              @updatedAt
  createdBy            String?

  @@unique([clinicId, patientCode])
  @@index([clinicId])
  @@index([phone])
  @@index([dateOfBirth])
}

// ============================================
// APPOINTMENT
// ============================================

model Appointment {
  id             String            @id @default(cuid())
  clinic         Clinic?           @relation(fields: [clinicId], references: [id])
  clinicId       String?
  patient        Patient           @relation(fields: [patientId], references: [id])
  patientId      String
  doctor         DoctorProfile     @relation(fields: [doctorId], references: [id])
  doctorId       String
  
  // Timing
  appointmentDate DateTime
  startTime      DateTime
  endTime        DateTime
  
  // Type & Status
  type           AppointmentType
  status         AppointmentStatus @default(SCHEDULED)
  
  // Details
  reason         String?
  notes          String?
  
  // Consultation
  consultation   Consultation?
  
  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt

  @@index([clinicId])
  @@index([patientId])
  @@index([doctorId])
  @@index([appointmentDate])
  @@index([status])
}

enum AppointmentType {
  NEW_CONSULTATION
  FOLLOW_UP
  TELECONSULTATION
  OTHER
}

enum AppointmentStatus {
  SCHEDULED
  CONFIRMED
  CHECKED_IN
  COMPLETED
  CANCELLED
  NO_SHOW
}

// ============================================
// CONSULTATION
// ============================================

model Consultation {
  id             String         @id @default(cuid())
  clinic         Clinic?        @relation(fields: [clinicId], references: [id])
  clinicId       String?
  patient        Patient        @relation(fields: [patientId], references: [id])
  patientId      String
  doctor         DoctorProfile  @relation(fields: [doctorId], references: [id])
  doctorId       String
  appointment    Appointment?   @relation(fields: [appointmentId], references: [id])
  appointmentId  String?        @unique
  
  // Clinical Information
  chiefComplaint String?
  symptoms       String?
  observations   String?
  assessment     String?
  doctorNotes    String?
  
  // Homeopathic Specific
  constitution   String?
  temperament    String?
  modalities     String?
  
  // Follow-up
  followUpDate   DateTime?
  
  // AI Reference
  aiArtifactId   String?
  
  prescriptions  Prescription[]
  followUps      FollowUp[]
  
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  @@index([clinicId])
  @@index([patientId])
  @@index([doctorId])
}

// ============================================
// PRESCRIPTION
// ============================================

model Prescription {
  id             String             @id @default(cuid())
  clinic         Clinic?            @relation(fields: [clinicId], references: [id])
  clinicId       String?
  patient        Patient            @relation(fields: [patientId], references: [id])
  patientId      String
  doctor         DoctorProfile      @relation(fields: [doctorId], references: [id])
  doctorId       String
  consultation   Consultation?      @relation(fields: [consultationId], references: [id])
  consultationId String?
  
  // Items (JSON array of homeopathic remedies)
  items          PrescriptionItem[]
  
  // Additional Instructions
  instructions    String?
  followUpDate    DateTime?
  
  // PDF
  pdfUrl         String?
  
  status         PrescriptionStatus @default(DRAFT)
  
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt

  @@index([clinicId])
  @@index([patientId])
  @@index([doctorId])
}

model PrescriptionItem {
  id             String        @id @default(cuid())
  prescription   Prescription  @relation(fields: [prescriptionId], references: [id], onDelete: Cascade)
  prescriptionId String
  
  // Homeopathic Remedy
  remedy         String
  potency        String
  dose           String
  frequency      String
  duration       String
  instructions   String?
  
  createdAt      DateTime      @default(now())
}

enum PrescriptionStatus {
  DRAFT
  FINALIZED
  PRINTED
  SENT
}

// ============================================
// FOLLOW-UP
// ============================================

model FollowUp {
  id             String         @id @default(cuid())
  clinic         Clinic?        @relation(fields: [clinicId], references: [id])
  clinicId       String?
  patient        Patient        @relation(fields: [patientId], references: [id])
  patientId      String
  doctor         DoctorProfile  @relation(fields: [doctorId], references: [id])
  doctorId       String
  consultation   Consultation?  @relation(fields: [consultationId], references: [id])
  consultationId String?
  
  dueDate        DateTime
  status         FollowUpStatus @default(PENDING)
  notes          String?
  
  completedAt    DateTime?
  
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  @@index([clinicId])
  @@index([patientId])
  @@index([dueDate])
  @@index([status])
}

enum FollowUpStatus {
  PENDING
  COMPLETED
  RESCHEDULED
  CANCELLED
}

// ============================================
// CONSENT RECORD
// ============================================

model ConsentRecord {
  id             String        @id @default(cuid())
  clinic         Clinic        @relation(fields: [clinicId], references: [id])
  clinicId       String
  patient        Patient       @relation(fields: [patientId], references: [id])
  patientId      String
  
  purpose        ConsentPurpose
  version        String
  noticeVersion  String
  
  givenAt        DateTime
  withdrawnAt    DateTime?
  method         ConsentMethod
  language       String        @default("en")
  
  metadata       String?
  
  createdAt      DateTime      @default(now())

  @@index([clinicId])
  @@index([patientId])
  @@index([purpose])
}

enum ConsentPurpose {
  CLINIC_SERVICE
  AI_ORGANIZATION
  AI_SUMMARIZATION
  VOICE_PROCESSING
  NOTEBOOK_IMPORT
  WHATSAPP_COMMUNICATION
}

enum ConsentMethod {
  WEB_FORM
  MOBILE_APP
  PAPER_FORM
  VERBAL
}

// ============================================
// AI ARTIFACT
// ============================================

model AIArtifact {
  id             String          @id @default(cuid())
  clinic         Clinic?         @relation(fields: [clinicId], references: [id])
  clinicId       String?
  patient        Patient?        @relation(fields: [patientId], references: [id])
  patientId      String?
  
  sourceType     String
  sourceId       String?
  
  aiTask         AITask
  modelProvider  String
  modelVersion   String
  
  inputReference String?
  output         String          @db.Text
  
  confidence     Float?
  fieldConfidence String?        @db.Text // JSON
  
  status         AIArtifactStatus @default(GENERATED)
  
  reviewedBy     String?
  reviewedAt     DateTime?
  
  // Reviewer relation
  reviewer       User?           @relation("AIReviewer", fields: [reviewedById], references: [id])
  reviewedById   String?
  
  expiresAt      DateTime?
  
  createdAt      DateTime        @default(now())

  @@index([clinicId])
  @@index([patientId])
  @@index([status])
  @@index([expiresAt])
}

enum AITask {
  CONSULTATION_NOTES
  PATIENT_SUMMARY
  WHATSAPP_EXTRACTION
  NOTEBOOK_OCR
}

enum AIArtifactStatus {
  GENERATED
  VALIDATING
  AWAITING_REVIEW
  REVIEWED
  APPROVED
  REJECTED
  COMMITTED
  FAILED
  EXPIRED
}

// ============================================
// AI AUDIT EVENT
// ============================================

model AIAuditEvent {
  id             String        @id @default(cuid())
  clinic         Clinic        @relation(fields: [clinicId], references: [id])
  clinicId       String
  userId         String?
  
  action         AIAuditAction
  entityType     String?
  entityId       String?
  requestId      String?
  
  metadata       String?       @db.Text
  
  createdAt      DateTime      @default(now())

  @@index([clinicId])
  @@index([userId])
  @@index([action])
  @@index([createdAt])
}

enum AIAuditAction {
  AI_REQUESTED
  AI_STARTED
  AI_COMPLETED
  AI_FAILED
  AI_VALIDATION_FAILED
  AI_REVIEWED
  AI_FIELD_EDITED
  AI_FIELD_ACCEPTED
  AI_FIELD_REJECTED
  AI_APPROVED
  AI_REJECTED
  AI_COMMITTED
  AI_EXPIRED
  AI_SAFETY_FLAGGED
}

// ============================================
// WHATSAPP TEMPLATE
// ============================================

model WhatsAppTemplate {
  id             String        @id @default(cuid())
  clinic         Clinic        @relation(fields: [clinicId], references: [id])
  clinicId       String
  
  name           String
  templateType   String
  category       String
  language       String        @default("en")
  
  content        String        @db.Text
  variables      String[]      @default([])
  
  isActive       Boolean       @default(true)
  
  messages       WhatsAppMessage[]
  
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  @@unique([clinicId, name])
  @@index([clinicId])
}

// ============================================
// WHATSAPP MESSAGE
// ============================================

model WhatsAppMessage {
  id             String              @id @default(cuid())
  clinic         Clinic              @relation(fields: [clinicId], references: [id])
  clinicId       String
  template       WhatsAppTemplate?
  templateId     String?
  
  patientId      String?
  phoneNumber    String
  
  direction      MessageDirection
  status         MessageStatus       @default(QUEUED)
  
  content        String?             @db.Text
  variables      String?             @db.Text // JSON
  
  providerMessageId String?
  providerStatus   String?
  
  sentAt         DateTime?
  deliveredAt    DateTime?
  readAt         DateTime?
  failedAt       DateTime?
  error          String?
  
  createdAt      DateTime            @default(now())
  updatedAt      DateTime            @updatedAt

  @@index([clinicId])
  @@index([patientId])
  @@index([status])
  @@index([createdAt])
}

enum MessageDirection {
  OUTBOUND
  INBOUND
}

enum MessageStatus {
  QUEUED
  SENT
  DELIVERED
  READ
  FAILED
}

// ============================================
// FEEDBACK
// ============================================

model Feedback {
  id             String        @id @default(cuid())
  clinic         Clinic        @relation(fields: [clinicId], references: [id])
  clinicId       String
  patient        Patient?      @relation(fields: [patientId], references: [id])
  patientId      String?
  
  type           FeedbackType
  rating         Int?
  subject        String?
  message        String        @db.Text
  
  isAnonymous    Boolean       @default(false)
  
  createdAt      DateTime      @default(now())

  @@index([clinicId])
  @@index([patientId])
  @@index([type])
}

enum FeedbackType {
  CONSULTATION
  PRESCRIPTION
  SERVICE
  FACILITY
  OTHER
}

// ============================================
// NOTIFICATION
// ============================================

model Notification {
  id             String              @id @default(cuid())
  clinic         Clinic              @relation(fields: [clinicId], references: [id])
  clinicId       String
  userId         String?
  
  type           NotificationType
  title          String
  message        String              @db.Text
  metadata       String?             @db.Text
  
  status         NotificationStatus  @default(UNREAD)
  
  scheduledFor   DateTime?
  sentAt         DateTime?
  
  createdAt      DateTime            @default(now())

  @@index([clinicId])
  @@index([userId])
  @@index([status])
}

enum NotificationType {
  APPOINTMENT_REMINDER
  FOLLOW_UP_REMINDER
  PRESCRIPTION_READY
  FEEDBACK_REQUEST
  SYSTEM
}

enum NotificationStatus {
  UNREAD
  READ
  ARCHIVED
}

// ============================================
// FILE ASSET
// ============================================

model FileAsset {
  id             String        @id @default(cuid())
  clinic         Clinic        @relation(fields: [clinicId], references: [id])
  clinicId       String
  
  fileName       String
  fileType       String
  fileSize       Int
  mimeType       String
  
  storagePath    String
  storageProvider String       @default("s3")
  
  uploadedBy     String?
  
  // Associations
  entityType     String?
  entityId       String?
  
  createdAt      DateTime      @default(now())

  @@index([clinicId])
  @@index([entityType, entityId])
}

// ============================================
// IMPORTED RECORD
// ============================================

model ImportedRecord {
  id             String        @id @default(cuid())
  clinic         Clinic        @relation(fields: [clinicId], references: [id])
  clinicId       String
  patient        Patient?      @relation(fields: [patientId], references: [id])
  patientId      String?
  
  importBatchId  String
  sourceType     ImportSourceType
  
  // Extracted Data
  extractedData  String        @db.Text // JSON
  
  // OCR Results
  ocrConfidence  Float?
  ocrLanguage   String?
  
  // Status
  status         ImportStatus  @default(PENDING_REVIEW)
  
  reviewedBy     String?
  reviewedAt     DateTime?
  
  // Source File
  fileAssetId    String?
  
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  @@index([clinicId])
  @@index([patientId])
  @@index([importBatchId])
  @@index([status])
}

enum ImportSourceType {
  NOTEBOOK_PHOTO
  NOTEBOOK_PDF
  PRESCRIPTION_IMAGE
  LAB_REPORT
  DISCHARGE_SUMMARY
}

enum ImportStatus {
  PENDING_REVIEW
  APPROVED
  REJECTED
  NEEDS_REVIEW
  IMPORTED
}

// ============================================
// AUDIT LOG
// ============================================

model AuditLog {
  id         String    @id @default(cuid())
  clinic     Clinic?   @relation(fields: [clinicId], references: [id])
  clinicId   String?
  actor      User?     @relation(fields: [actorId], references: [id])
  actorId    String?
  
  action     String
  entity     String
  entityId   String?
  metadata   String?   @db.Text
  
  createdAt  DateTime  @default(now())

  @@index([clinicId])
  @@index([actorId])
  @@index([entity])
  @@index([createdAt])
}

// ============================================
// PERMISSIONS & ROLES
// ============================================

model Permission {
  id          String           @id @default(cuid())
  key         String           @unique
  label       String
  description String?
  roleLinks   RolePermission[]
  userLinks   UserPermission[]
  createdAt   DateTime         @default(now())
}

model RolePermission {
  id           String      @id @default(cuid())
  clinic       Clinic?     @relation(fields: [clinicId], references: [id])
  clinicId     String?
  role         Role
  permission   Permission  @relation(fields: [permissionId], references: [id])
  permissionId String
  createdAt    DateTime    @default(now())

  @@unique([clinicId, role, permissionId])
}

model UserPermission {
  id           String      @id @default(cuid())
  clinic       Clinic?     @relation(fields: [clinicId], references: [id])
  clinicId     String?
  user         User        @relation(fields: [userId], references: [id])
  userId       String
  permission   Permission  @relation(fields: [permissionId], references: [id])
  permissionId String
  allowed      Boolean     @default(true)
  createdAt    DateTime    @default(now())

  @@unique([clinicId, userId, permissionId])
}

enum Role {
  SUPER_ADMIN
  CLINIC_ADMIN
  DOCTOR
  RECEPTIONIST
  PATIENT
}
```

## Migration Steps

### Phase 1: Schema Restructuring
1. Rename `Hospital` to `Clinic`
2. Rename `Practitioner` to `DoctorProfile`
3. Rename `Encounter` to `Consultation`
4. Update all foreign key references
5. Remove unused models (ContentPage, BlogPost, Media, PatientRegistration)

### Phase 2: Extend Existing Models
1. Extend `Clinic` with AI and WhatsApp settings
2. Extend `User` with isActive and avatar
3. Extend `Patient` with homeopathic fields and patientCode
4. Extend `DoctorProfile` with homeopathic qualifications
5. Extend `Appointment` with new types and statuses
6. Extend `Consultation` with homeopathic fields
7. Refactor `Prescription` to use `PrescriptionItem` relation

### Phase 3: Add New Models
1. Add `ConsentRecord` and related enums
2. Add `AIArtifact` and `AIAuditEvent` with enums
3. Add `WhatsAppTemplate` and `WhatsAppMessage` with enums
4. Add `FollowUp` with enums
5. Add `FileAsset`
6. Add `ImportedRecord` with enums
7. Add `Feedback` with enums
8. Add `Notification` with enums

### Phase 4: Update Enums
1. Update `Role` enum (remove hospital-specific roles)
2. Add new enums for AI, WhatsApp, Consent, etc.

## Data Migration Strategy

### Patient Code Generation
- Generate patient codes for existing patients
- Format: HC-000001, HC-000002, etc.
- Use database sequence or counter

### Role Migration
- Map existing roles to new roles:
  - HOSPITAL_ADMIN → CLINIC_ADMIN
  - FRONT_DESK → RECEPTIONIST
  - Remove unused roles

### Data Cleanup
- Remove orphaned records
- Clean up unused models
- Update foreign key references

## Index Strategy

### Performance-Critical Indexes
- `Clinic`: slug, isActive
- `User`: clinicId, role
- `Patient`: clinicId, phone, dateOfBirth
- `Appointment`: clinicId, patientId, doctorId, appointmentDate, status
- `Consultation`: clinicId, patientId, doctorId
- `FollowUp`: clinicId, patientId, dueDate, status
- `AIArtifact`: clinicId, patientId, status, expiresAt
- `WhatsAppMessage`: clinicId, patientId, status, createdAt

### Security-Critical Indexes
- Audit logs by clinic, actor, entity, time
- AI audit events by clinic, user, action, time
- Consent records by clinic, patient, purpose

## Validation Rules

### Patient Code
- Must be unique per clinic
- Format: HC-XXXXXX
- Auto-generated on backend

### Phone Numbers
- Must be valid Indian phone format
- WhatsApp number optional but must be valid if provided

### Dates
- Date of birth must be in the past
- Appointment dates must be in the future (for new appointments)
- Follow-up dates must be after consultation date

### AI Artifacts
- Must have valid status transitions
- Cannot skip review for clinical tasks
- Must expire after configurable period

### Consent
- Must have valid purpose
- Cannot be withdrawn for past processing
- Must record version and timestamp
