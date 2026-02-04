// Ambassador service
export { ambassadorService, AmbassadorService } from "./ambassador.service";

// Teacher service
export { teacherService, TeacherService } from "./teacher.service";

// Project service
export { projectService, ProjectService } from "./project.service";

// Vote service
export { voteService, VoteService } from "./vote.service";
export type { VoteResult, VotingResults } from "./vote.service";

// Re-export error types from types module for backwards compatibility
export { NotFoundError } from "@/lib/types";
