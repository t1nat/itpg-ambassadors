import { z } from "zod";

// Localized text schema for multi-language support
export const localizedTextSchema = z.record(z.string(), z.string());

export const ambassadorSchema = z.object({
  id: z.string().uuid(),
  name: localizedTextSchema,
  bio: localizedTextSchema.nullable(),
  image_url: z.string().url().nullable(),
  year: z.string().nullable().optional(),
  age: z.number().int().positive().nullable().optional(),
  created_at: z.string().datetime().optional(),
});

export const createAmbassadorSchema = ambassadorSchema.omit({
  id: true,
  created_at: true,
});

export const updateAmbassadorSchema = createAmbassadorSchema.partial();

export type Ambassador = z.infer<typeof ambassadorSchema>;
export type CreateAmbassadorInput = z.infer<typeof createAmbassadorSchema>;
export type UpdateAmbassadorInput = z.infer<typeof updateAmbassadorSchema>;
