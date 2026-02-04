import { projectRepository } from '@/lib/repositories'
import { createProjectSchema, updateProjectSchema } from '@/lib/validations'
import type { Project, CreateProjectInput, UpdateProjectInput } from '@/lib/validations'

export class ProjectService {
  async getAll(): Promise<Project[]> {
    return projectRepository.findAll()
  }

  async getById(id: string): Promise<Project | null> {
    return projectRepository.findById(id)
  }

  async create(input: CreateProjectInput): Promise<Project> {
    const validated = createProjectSchema.parse(input)
    return projectRepository.create(validated)
  }

  async update(id: string, input: UpdateProjectInput): Promise<Project> {
    const validated = updateProjectSchema.parse(input)
    
    const existing = await projectRepository.findById(id)
    if (!existing) {
      throw new NotFoundError(`Project with id ${id} not found`)
    }

    return projectRepository.update(id, validated)
  }

  async delete(id: string): Promise<void> {
    const existing = await projectRepository.findById(id)
    if (!existing) {
      throw new NotFoundError(`Project with id ${id} not found`)
    }

    return projectRepository.delete(id)
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const projectService = new ProjectService()
