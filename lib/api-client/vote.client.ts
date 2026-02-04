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
  const { data } = await apiClient.post<ApiResponse<VoteResponse>>("/votes", { projectId });

  if (!data.data?.vote) {
    throw new Error("Vote not created");
  }

  return data.data.vote;
}

export async function fetchVotingResults(): Promise<VotingResultsResponse> {
  const { data } = await apiClient.get<ApiResponse<VotingResultsResponse>>("/votes/results");

  if (!data.data) {
    throw new Error("No results found");
  }

  return data.data;
}
