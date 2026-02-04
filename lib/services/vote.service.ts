import { voteRepository, projectRepository } from "@/lib/repositories";
import { voteRequestSchema } from "@/lib/validations";
import type { Vote, ProjectWithVotes } from "@/lib/validations";
import type { IVoteService, IVoteRepository, IProjectRepository, VoteResult, VotingResults } from "@/lib/types";
import { DuplicateError } from "@/lib/types";

// Re-export types for backwards compatibility
export type { VoteResult, VotingResults } from "@/lib/types";

/**
 * Vote service implementation
 * Handles business logic for voting operations
 */
export class VoteService implements IVoteService {
  constructor(
    private readonly voteRepo: IVoteRepository = voteRepository,
    private readonly projectRepo: IProjectRepository = projectRepository,
  ) {}

  async vote(projectId: string, voterIp: string): Promise<VoteResult> {
    // Validate input
    const validated = voteRequestSchema.parse({ projectId });

    // Verify project exists
    const project = await this.projectRepo.findById(validated.projectId);
    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    try {
      const vote = await this.voteRepo.create({ project_id: validated.projectId }, voterIp);
      return { success: true, vote };
    } catch (error) {
      if (error instanceof DuplicateError) {
        return {
          success: false,
          error: "You have already voted for this project",
        };
      }
      throw error;
    }
  }

  async getResults(): Promise<VotingResults> {
    const [projects, voteCounts, totalVotes] = await Promise.all([this.projectRepo.findAll(), this.voteRepo.countByProject(), this.voteRepo.getTotalCount()]);

    const projectsWithVotes: ProjectWithVotes[] = projects.map((project) => ({
      ...project,
      vote_count: voteCounts.get(project.id) ?? 0,
    }));

    // Sort by vote count descending
    projectsWithVotes.sort((a, b) => b.vote_count - a.vote_count);

    return {
      projects: projectsWithVotes,
      totalVotes,
    };
  }

  async hasVoted(projectId: string, voterIp: string): Promise<boolean> {
    return this.voteRepo.hasVoted(projectId, voterIp);
  }

  async getVoteCountForProject(projectId: string): Promise<number> {
    const votes = await this.voteRepo.findByProjectId(projectId);
    return votes.length;
  }
}

// Singleton instance for dependency injection
export const voteService = new VoteService();
