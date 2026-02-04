import { z } from "zod";

export const voteSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  voter_ip: z.string(),
  created_at: z.string().datetime().optional(),
});

export const createVoteSchema = z.object({
  project_id: z.string().uuid(),
});

export const voteRequestSchema = z.object({
  projectId: z.string().uuid(),
});

export type Vote = z.infer<typeof voteSchema>;
export type CreateVoteInput = z.infer<typeof createVoteSchema>;
export type VoteRequest = z.infer<typeof voteRequestSchema>;
