// Ambassador schemas and types
export {
  ambassadorSchema,
  createAmbassadorSchema,
  updateAmbassadorSchema,
  localizedTextSchema,
  type Ambassador,
  type CreateAmbassadorInput,
  type UpdateAmbassadorInput,
} from './ambassador.schema'

// Teacher schemas and types
export {
  teacherSchema,
  createTeacherSchema,
  updateTeacherSchema,
  type Teacher,
  type CreateTeacherInput,
  type UpdateTeacherInput,
} from './teacher.schema'

// Project schemas and types
export {
  projectSchema,
  createProjectSchema,
  updateProjectSchema,
  projectWithVotesSchema,
  type Project,
  type CreateProjectInput,
  type UpdateProjectInput,
  type ProjectWithVotes,
} from './project.schema'

// Vote schemas and types
export {
  voteSchema,
  createVoteSchema,
  voteRequestSchema,
  type Vote,
  type CreateVoteInput,
  type VoteRequest,
} from './vote.schema'
