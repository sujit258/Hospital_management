import { z } from 'zod';
import { Role, AppointmentType, AppointmentStatus, PrescriptionStatus, FollowUpStatus } from '@homeo-clinic/types';

// Common Schemas
export const idSchema = z.string().cuid();
export const emailSchema = z.string().email();
export const phoneSchema = z.string().regex(/^[0-9]{10}$/, 'Invalid phone number');
export const dateSchema = z.coerce.date();
export const slugSchema = z.string().regex(/^[a-z0-9-]+$/, 'Invalid slug');

// Clinic Schema
export const clinicSchema = z.object({
  name: z.string().min(2),
  slug: slugSchema,
  customDomain: z.string().url().optional(),
  isActive: z.boolean().default(true),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  phone: phoneSchema.optional(),
  email: emailSchema.optional(),
  logo: z.string().url().optional(),
  aiEnabled: z.boolean().default(false),
  aiProvider: z.string().optional(),
  aiModel: z.string().optional(),
  whatsappEnabled: z.boolean().default(false),
  whatsappPhoneNumber: phoneSchema.optional(),
  whatsappBusinessId: z.string().optional(),
});

// User Schema
export const userSchema = z.object({
  name: z.string().min(2).optional(),
  email: emailSchema,
  phone: phoneSchema.optional(),
  role: z.nativeEnum(Role),
  avatar: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

// Patient Schema
export const patientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  fullName: z.string().min(2),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: dateSchema,
  phone: phoneSchema,
  whatsappNumber: phoneSchema.optional(),
  email: emailSchema.optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: phoneSchema.optional(),
  bloodGroup: z.string().optional(),
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  notes: z.string().optional(),
});

// Doctor Profile Schema
export const doctorProfileSchema = z.object({
  specialty: z.string().optional(),
  qualification: z.string().optional(),
  experience: z.number().min(0).optional(),
  languages: z.array(z.string()).default([]),
  availability: z.string().optional(),
  homeopathicQualification: z.string().optional(),
  registrationNumber: z.string().optional(),
});

// Appointment Schema
export const appointmentSchema = z.object({
  patientId: idSchema,
  doctorId: idSchema,
  appointmentDate: dateSchema,
  startTime: dateSchema,
  endTime: dateSchema,
  type: z.nativeEnum(AppointmentType),
  status: z.nativeEnum(AppointmentStatus).default(AppointmentStatus.SCHEDULED),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

// Consultation Schema
export const consultationSchema = z.object({
  patientId: idSchema,
  doctorId: idSchema,
  appointmentId: idSchema.optional(),
  chiefComplaint: z.string().optional(),
  symptoms: z.string().optional(),
  observations: z.string().optional(),
  assessment: z.string().optional(),
  doctorNotes: z.string().optional(),
  constitution: z.string().optional(),
  temperament: z.string().optional(),
  modalities: z.string().optional(),
  followUpDate: dateSchema.optional(),
});

// Prescription Item Schema
export const prescriptionItemSchema = z.object({
  remedy: z.string().min(2),
  potency: z.string().min(1),
  dose: z.string().min(1),
  frequency: z.string().min(1),
  duration: z.string().min(1),
  instructions: z.string().optional(),
});

// Prescription Schema
export const prescriptionSchema = z.object({
  patientId: idSchema,
  doctorId: idSchema,
  consultationId: idSchema.optional(),
  items: z.array(prescriptionItemSchema).min(1),
  instructions: z.string().optional(),
  followUpDate: dateSchema.optional(),
  status: z.nativeEnum(PrescriptionStatus).default(PrescriptionStatus.DRAFT),
});

// FollowUp Schema
export const followUpSchema = z.object({
  patientId: idSchema,
  doctorId: idSchema,
  consultationId: idSchema.optional(),
  dueDate: dateSchema,
  status: z.nativeEnum(FollowUpStatus).default(FollowUpStatus.PENDING),
  notes: z.string().optional(),
});
