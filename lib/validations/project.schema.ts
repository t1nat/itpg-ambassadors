import { z } from "zod";
import { localizedTextSchema } from "./ambassador.schema";

export const projectSchema = z.object({
  id: z.string().uuid(),
  title: localizedTextSchema,
  description: localizedTextSchema.nullable().optional(),
  short_description: localizedTextSchema.nullable(),
  long_description: localizedTextSchema.nullable(),
  image_url: z.string().url().nullable(),
  extra_images: z.array(z.string().url()).default([]),
  year: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});

export const createProjectSchema = projectSchema.omit({
  id: true,
  created_at: true,
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectWithVotesSchema = projectSchema.extend({
  vote_count: z.number().int().nonnegative(),
});

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectWithVotes = z.infer<typeof projectWithVotesSchema>;
