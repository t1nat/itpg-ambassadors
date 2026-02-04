import { createClient } from "@/lib/supabase/server";
import type { Vote, CreateVoteInput } from "@/lib/validations";
import type { IVoteRepository } from "@/lib/types";
import { DuplicateError, DatabaseError } from "@/lib/types";
import { SUPABASE_ERROR_CODES, DB_TABLES } from "@/lib/config";

/**
 * Vote count interface for aggregation
 */
export interface VoteCount {
  project_id: string;
  count: number;
}

/**
 * Vote repository implementation
 * Handles all database operations for votes
 */
export class VoteRepository implements IVoteRepository {
  private readonly tableName = DB_TABLES.votes;

  async findAll(): Promise<Vote[]> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*");

      if (error) {
        throw new DatabaseError("findAll votes", new Error(error.message));
      }

      return (data ?? []) as Vote[];
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findAll votes", error instanceof Error ? error : undefined);
    }
  }

  async findByProjectId(projectId: string): Promise<Vote[]> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*").eq("project_id", projectId);

      if (error) {
        throw new DatabaseError("findByProjectId votes", new Error(error.message));
      }

      return (data ?? []) as Vote[];
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findByProjectId votes", error instanceof Error ? error : undefined);
    }
  }

  async countByProject(): Promise<Map<string, number>> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("project_id");

      if (error) {
        throw new DatabaseError("countByProject votes", new Error(error.message));
      }

      const countMap = new Map<string, number>();
      if (data) {
        for (const vote of data) {
          const count = countMap.get(vote.project_id) ?? 0;
          countMap.set(vote.project_id, count + 1);
        }
      }

      return countMap;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("countByProject votes", error instanceof Error ? error : undefined);
    }
  }

  async getTotalCount(): Promise<number> {
    try {
      const supabase = await createClient();
      const { count, error } = await supabase.from(this.tableName).select("*", { count: "exact", head: true });

      if (error) {
        throw new DatabaseError("getTotalCount votes", new Error(error.message));
      }

      return count ?? 0;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("getTotalCount votes", error instanceof Error ? error : undefined);
    }
  }

  async create(input: CreateVoteInput, voterIp: string): Promise<Vote> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from(this.tableName)
        .insert({
          project_id: input.project_id,
          voter_ip: voterIp,
        })
        .select()
        .single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.UNIQUE_VIOLATION) {
          throw new DuplicateError("Vote", "You have already voted for this project");
        }
        throw new DatabaseError("create vote", new Error(error.message));
      }

      return data as Vote;
    } catch (error) {
      if (error instanceof DuplicateError || error instanceof DatabaseError) throw error;
      throw new DatabaseError("create vote", error instanceof Error ? error : undefined);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from(this.tableName).delete().eq("id", id);

      if (error) {
        throw new DatabaseError("delete vote", new Error(error.message));
      }
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("delete vote", error instanceof Error ? error : undefined);
    }
  }

  async hasVoted(projectId: string, voterIp: string): Promise<boolean> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("id").eq("project_id", projectId).eq("voter_ip", voterIp).single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.NOT_FOUND) {
          return false;
        }
        throw new DatabaseError("hasVoted check", new Error(error.message));
      }

      return !!data;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("hasVoted check", error instanceof Error ? error : undefined);
    }
  }
}

// Legacy export for backwards compatibility - use DuplicateError from @/lib/types instead
export { DuplicateError as DuplicateVoteError } from "@/lib/types";

// Singleton instance for dependency injection
export const voteRepository = new VoteRepository();
