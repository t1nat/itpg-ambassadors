import { apiClient } from "./axios-instance";
import type { Vote, ProjectWithVotes } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

export interface VoteResponse {
  vote: Vote;
}

export interface VotingResultsResponse {
  projects: ProjectWithVotes[];
  total_votes: number;
}

export async function submitVote(projectId: string): Promise<Vote> {
  const response = await apiClient.post<ApiResponse<VoteResponse>>("/votes", { projectId });
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to vote");
  }

  if (!result.data?.vote) {
    throw new Error("Vote not created");
  }

  return result.data.vote;
}

export async function fetchVotingResults(): Promise<VotingResultsResponse> {
  const response = await apiClient.get<ApiResponse<VotingResultsResponse>>("/votes/results");
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch voting results");
  }

  if (!result.data) {
    throw new Error("No results found");
  }

  return result.data;
}
