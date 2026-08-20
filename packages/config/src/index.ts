import { z } from 'zod';

// Database Config
export const databaseConfigSchema = z.object({
  url: z.string().url(),
  directUrl: z.string().url().optional(),
});

// Redis Config
export const redisConfigSchema = z.object({
  url: z.string().url(),
  host: z.string().optional(),
  port: z.number().optional(),
  password: z.string().optional(),
});

// Storage Config
export const storageConfigSchema = z.object({
  provider: z.enum(['s3', 'local']),
  accessKeyId: z.string().optional(),
  secretAccessKey: z.string().optional(),
  region: z.string().optional(),
  bucket: z.string().optional(),
  endpoint: z.string().url().optional(),
  publicUrl: z.string().url().optional(),
});

// AI Config
export const aiConfigSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.enum(['openai', 'anthropic']).optional(),
  model: z.string().optional(),
  maxTokens: z.number().optional(),
  timeout: z.number().optional(),
  maxRetries: z.number().optional(),
});

// WhatsApp Config
export const whatsappConfigSchema = z.object({
  enabled: z.boolean().default(false),
  phoneNumberId: z.string().optional(),
  accessToken: z.string().optional(),
  businessAccountId: z.string().optional(),
  webhookVerifyToken: z.string().optional(),
  webhookSecret: z.string().optional(),
});

// App Config
export const appConfigSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  apiUrl: z.string().url(),
  baseDomain: z.string().optional(),
  defaultClinicSlug: z.string().optional(),
});

// Complete Config
export const configSchema = z.object({
  app: appConfigSchema,
  database: databaseConfigSchema,
  redis: redisConfigSchema,
  storage: storageConfigSchema,
  ai: aiConfigSchema,
  whatsapp: whatsappConfigSchema,
});

export type Config = z.infer<typeof configSchema>;
