import { voteRepository, projectRepository, DuplicateVoteError } from "@/lib/repositories";
import { voteRequestSchema } from "@/lib/validations";
import type { Vote, ProjectWithVotes } from "@/lib/validations";

export interface VoteResult {
  success: boolean;
  vote?: Vote;
  error?: string;
}

export interface VotingResults {
  projects: ProjectWithVotes[];
  total_votes: number;
}

export class VoteService {
  async vote(projectId: string, voterIp: string): Promise<VoteResult> {
    // Validate input
    const validated = voteRequestSchema.parse({ projectId });

    // Verify project exists
    const project = await projectRepository.findById(validated.projectId);
    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    try {
      const vote = await voteRepository.create({ project_id: validated.projectId }, voterIp);
      return { success: true, vote };
    } catch (error) {
      if (error instanceof DuplicateVoteError) {
        return {
          success: false,
          error: "You have already voted for this project",
        };
      }
      throw error;
    }
  }

  async getResults(): Promise<VotingResults> {
    const [projects, voteCounts, totalVotes] = await Promise.all([projectRepository.findAll(), voteRepository.countByProject(), voteRepository.getTotalCount()]);

    const projectsWithVotes: ProjectWithVotes[] = projects.map((project) => ({
      ...project,
      vote_count: voteCounts.get(project.id) || 0,
    }));

    // Sort by vote count descending
    projectsWithVotes.sort((a, b) => b.vote_count - a.vote_count);

    return {
      projects: projectsWithVotes,
      total_votes: totalVotes,
    };
  }

  async hasVoted(projectId: string, voterIp: string): Promise<boolean> {
    return voteRepository.hasVoted(projectId, voterIp);
  }

  async getVoteCountForProject(projectId: string): Promise<number> {
    const votes = await voteRepository.findByProjectId(projectId);
    return votes.length;
  }
}

export const voteService = new VoteService();
