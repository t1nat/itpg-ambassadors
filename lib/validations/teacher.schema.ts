import { z } from "zod";
import { localizedTextSchema } from "./ambassador.schema";

export const teacherSchema = z.object({
  id: z.string().uuid(),
  name: localizedTextSchema,
  subject: localizedTextSchema.nullable(),
  bio: localizedTextSchema.nullable(),
  image_url: z.string().url().nullable(),
  created_at: z.string().datetime().optional(),
});

export const createTeacherSchema = teacherSchema.omit({
  id: true,
  created_at: true,
});

export const updateTeacherSchema = createTeacherSchema.partial();

export type Teacher = z.infer<typeof teacherSchema>;
export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
