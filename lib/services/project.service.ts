import { projectRepository } from "@/lib/repositories";
import { createProjectSchema, updateProjectSchema } from "@/lib/validations";
import type { Project, CreateProjectInput, UpdateProjectInput } from "@/lib/validations";
import type { IProjectService, IProjectRepository } from "@/lib/types";
import { NotFoundError } from "@/lib/types";

/**
 * Project service implementation
 * Handles business logic for project operations
 */
export class ProjectService implements IProjectService {
  constructor(private readonly repository: IProjectRepository = projectRepository) {}

  async getAll(): Promise<Project[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Project | null> {
    return this.repository.findById(id);
  }

  async create(input: CreateProjectInput): Promise<Project> {
    const validated = createProjectSchema.parse(input);
    return this.repository.create(validated);
  }

  async update(id: string, input: UpdateProjectInput): Promise<Project> {
    const validated = updateProjectSchema.parse(input);

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError("Project", id);
    }

    return this.repository.update(id, validated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError("Project", id);
    }

    return this.repository.delete(id);
  }
}

// Re-export NotFoundError for backwards compatibility
export { NotFoundError } from "@/lib/types";

// Singleton instance for dependency injection
export const projectService = new ProjectService();
