/**
 * Service interfaces for business logic layer
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
  ProjectWithVotes,
} from "@/lib/validations";

/**
 * Base service interface with common CRUD operations
 */
export interface IBaseService<T, CreateInput, UpdateInput> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(input: CreateInput): Promise<T>;
  update(id: string, input: UpdateInput): Promise<T>;
  delete(id: string): Promise<void>;
}

/**
 * Ambassador service interface
 */
export interface IAmbassadorService extends IBaseService<Ambassador, CreateAmbassadorInput, UpdateAmbassadorInput> {
  sortByName(ambassadors: Ambassador[], locale: string): Ambassador[];
}

/**
 * Teacher service interface
 */
export interface ITeacherService extends IBaseService<Teacher, CreateTeacherInput, UpdateTeacherInput> {
  sortByName(teachers: Teacher[], locale: string): Teacher[];
}

/**
 * Project service interface
 */
export interface IProjectService extends IBaseService<Project, CreateProjectInput, UpdateProjectInput> {
  // Add any project-specific methods here
}

/**
 * Vote result type
 */
export interface VoteResult {
  success: boolean;
  vote?: Vote;
  error?: string;
}

/**
 * Voting results aggregation type
 */
export interface VotingResults {
  projects: ProjectWithVotes[];
  totalVotes: number;
}

/**
 * Vote service interface
 */
export interface IVoteService {
  vote(projectId: string, voterIp: string): Promise<VoteResult>;
  getResults(): Promise<VotingResults>;
  hasVoted(projectId: string, voterIp: string): Promise<boolean>;
  getVoteCountForProject(projectId: string): Promise<number>;
}
