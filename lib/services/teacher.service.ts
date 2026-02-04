import { teacherRepository } from "@/lib/repositories";
import { createTeacherSchema, updateTeacherSchema } from "@/lib/validations";
import type { Teacher, CreateTeacherInput, UpdateTeacherInput } from "@/lib/validations";
import type { ITeacherService, ITeacherRepository } from "@/lib/types";
import { NotFoundError, getLocalizedText } from "@/lib/types";

/**
 * Teacher service implementation
 * Handles business logic for teacher operations
 */
export class TeacherService implements ITeacherService {
  constructor(private readonly repository: ITeacherRepository = teacherRepository) {}

  async getAll(): Promise<Teacher[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Teacher | null> {
    return this.repository.findById(id);
  }

  async create(input: CreateTeacherInput): Promise<Teacher> {
    const validated = createTeacherSchema.parse(input);
    return this.repository.create(validated);
  }

  async update(id: string, input: UpdateTeacherInput): Promise<Teacher> {
    const validated = updateTeacherSchema.parse(input);

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError("Teacher", id);
    }

    return this.repository.update(id, validated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError("Teacher", id);
    }

    return this.repository.delete(id);
  }

  /**
   * Sort teachers by localized name
   */
  sortByName(teachers: Teacher[], locale: string): Teacher[] {
    return [...teachers].sort((a, b) => {
      const nameA = getLocalizedText(a.name, locale);
      const nameB = getLocalizedText(b.name, locale);
      return nameA.localeCompare(nameB, locale);
    });
  }
}

// Re-export NotFoundError for backwards compatibility
export { NotFoundError } from "@/lib/types";

// Singleton instance for dependency injection
export const teacherService = new TeacherService();
