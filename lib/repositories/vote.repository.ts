import { createClient } from "@/lib/supabase/server";
import type { Vote, CreateVoteInput } from "@/lib/validations";

export interface VoteCount {
  project_id: string;
  count: number;
}

export class VoteRepository {
  async findAll(): Promise<Vote[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("votes").select("*");

    if (error) {
      throw new Error(`Failed to fetch votes: ${error.message}`);
    }

    return (data || []) as Vote[];
  }

  async findByProjectId(projectId: string): Promise<Vote[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("votes").select("*").eq("project_id", projectId);

    if (error) {
      throw new Error(`Failed to fetch votes for project: ${error.message}`);
    }

    return (data || []) as Vote[];
  }

  async countByProject(): Promise<Map<string, number>> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("votes").select("project_id");

    if (error) {
      throw new Error(`Failed to count votes: ${error.message}`);
    }

    const countMap = new Map<string, number>();
    if (data) {
      data.forEach((vote) => {
        const count = countMap.get(vote.project_id) || 0;
        countMap.set(vote.project_id, count + 1);
      });
    }

    return countMap;
  }

  async getTotalCount(): Promise<number> {
    const supabase = await createClient();
    const { count, error } = await supabase.from("votes").select("*", { count: "exact", head: true });

    if (error) {
      throw new Error(`Failed to count total votes: ${error.message}`);
    }

    return count || 0;
  }

  async create(input: CreateVoteInput, voterIp: string): Promise<Vote> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("votes")
      .insert({
        project_id: input.project_id,
        voter_ip: voterIp,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new DuplicateVoteError("You have already voted for this project");
      }
      throw new Error(`Failed to create vote: ${error.message}`);
    }

    return data as Vote;
  }

  async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("votes").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete vote: ${error.message}`);
    }
  }

  async hasVoted(projectId: string, voterIp: string): Promise<boolean> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("votes").select("id").eq("project_id", projectId).eq("voter_ip", voterIp).single();

    if (error) {
      if (error.code === "PGRST116") {
        return false;
      }
      throw new Error(`Failed to check vote: ${error.message}`);
    }

    return !!data;
  }
}

export class DuplicateVoteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateVoteError";
  }
}

export const voteRepository = new VoteRepository();
