// Core Types
export interface Clinic {
  id: string;
  name: string;
  slug: string;
  customDomain?: string;
  isActive: boolean;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  logo?: string;
  aiEnabled: boolean;
  aiProvider?: string;
  aiModel?: string;
  whatsappEnabled: boolean;
  whatsappPhoneNumber?: string;
  whatsappBusinessId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  clinicId?: string;
  name?: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  clinicId?: string;
  patientCode: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  gender: string;
  dateOfBirth: Date;
  phone: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  allergies?: string;
  chronicConditions?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DoctorProfile {
  id: string;
  clinicId?: string;
  userId: string;
  specialty?: string;
  qualification?: string;
  experience?: number;
  languages: string[];
  availability?: string;
  homeopathicQualification?: string;
  registrationNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  clinicId?: string;
  patientId: string;
  doctorId: string;
  appointmentDate: Date;
  startTime: Date;
  endTime: Date;
  type: AppointmentType;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Consultation {
  id: string;
  clinicId?: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  chiefComplaint?: string;
  symptoms?: string;
  observations?: string;
  assessment?: string;
  doctorNotes?: string;
  constitution?: string;
  temperament?: string;
  modalities?: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: string;
  clinicId?: string;
  patientId: string;
  doctorId: string;
  consultationId?: string;
  instructions?: string;
  followUpDate?: Date;
  pdfUrl?: string;
  status: PrescriptionStatus;
  items: PrescriptionItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionItem {
  id: string;
  prescriptionId: string;
  remedy: string;
  potency: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions?: string;
  createdAt: Date;
}

export interface FollowUp {
  id: string;
  clinicId?: string;
  patientId: string;
  doctorId: string;
  consultationId?: string;
  dueDate: Date;
  status: FollowUpStatus;
  notes?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CLINIC_ADMIN = 'CLINIC_ADMIN',
  DOCTOR = 'DOCTOR',
  RECEPTIONIST = 'RECEPTIONIST',
  PATIENT = 'PATIENT'
}

export enum AppointmentType {
  NEW_CONSULTATION = 'NEW_CONSULTATION',
  FOLLOW_UP = 'FOLLOW_UP',
  TELECONSULTATION = 'TELECONSULTATION',
  OTHER = 'OTHER'
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export enum PrescriptionStatus {
  DRAFT = 'DRAFT',
  FINALIZED = 'FINALIZED',
  PRINTED = 'PRINTED',
  SENT = 'SENT'
}

export enum FollowUpStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  RESCHEDULED = 'RESCHEDULED',
  CANCELLED = 'CANCELLED'
}
