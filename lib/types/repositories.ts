/**
 * Repository interfaces for data access layer
 * Enables dependency injection and easier testing
 */

import type {
  Ambassador,
  CreateAmbassadorInput,
  UpdateAmbassadorInput,
  Teacher,
  CreateTeacherInput,
  UpdateTeacherInput,
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  Vote,
  CreateVoteInput,
} from "@/lib/validations";

/**
 * Base repository interface with common CRUD operations
 */
export interface IBaseRepository<T, CreateInput, UpdateInput> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(input: CreateInput): Promise<T>;
  update(id: string, input: UpdateInput): Promise<T>;
  delete(id: string): Promise<void>;
}

/**
 * Ambassador repository interface
 */
export interface IAmbassadorRepository extends IBaseRepository<Ambassador, CreateAmbassadorInput, UpdateAmbassadorInput> {
  // Add any ambassador-specific methods here
}

/**
 * Teacher repository interface
 */
export interface ITeacherRepository extends IBaseRepository<Teacher, CreateTeacherInput, UpdateTeacherInput> {
  // Add any teacher-specific methods here
}

/**
 * Project repository interface
 */
export interface IProjectRepository extends IBaseRepository<Project, CreateProjectInput, UpdateProjectInput> {
  // Add any project-specific methods here
}

/**
 * Vote repository interface
 */
export interface IVoteRepository {
  findAll(): Promise<Vote[]>;
  findByProjectId(projectId: string): Promise<Vote[]>;
  countByProject(): Promise<Map<string, number>>;
  getTotalCount(): Promise<number>;
  create(input: CreateVoteInput, voterIp: string): Promise<Vote>;
  delete(id: string): Promise<void>;
  hasVoted(projectId: string, voterIp: string): Promise<boolean>;
}
