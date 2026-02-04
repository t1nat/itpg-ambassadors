import type { Vote, ProjectWithVotes } from '@/lib/validations'
import type { ApiResponse } from '@/lib/api'

const API_BASE = '/api'

export interface VoteResponse {
  vote: Vote
}

export interface VotingResultsResponse {
  projects: ProjectWithVotes[]
  total_votes: number
}

export async function submitVote(projectId: string): Promise<Vote> {
  const response = await fetch(`${API_BASE}/votes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  })
  
  const result: ApiResponse<VoteResponse> = await response.json()
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to vote')
  }
  
  if (!result.data?.vote) {
    throw new Error('Vote not created')
  }
  
  return result.data.vote
}

export async function fetchVotingResults(): Promise<VotingResultsResponse> {
  const response = await fetch(`${API_BASE}/votes/results`)
  const result: ApiResponse<VotingResultsResponse> = await response.json()
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch voting results')
  }
  
  if (!result.data) {
    throw new Error('No results found')
  }
  
  return result.data
}
