import { teacherRepository } from "@/lib/repositories";
import { createTeacherSchema, updateTeacherSchema } from "@/lib/validations";
import type { Teacher, CreateTeacherInput, UpdateTeacherInput } from "@/lib/validations";

export class TeacherService {
  async getAll(): Promise<Teacher[]> {
    return teacherRepository.findAll();
  }

  async getById(id: string): Promise<Teacher | null> {
    return teacherRepository.findById(id);
  }

  async create(input: CreateTeacherInput): Promise<Teacher> {
    const validated = createTeacherSchema.parse(input);
    return teacherRepository.create(validated);
  }

  async update(id: string, input: UpdateTeacherInput): Promise<Teacher> {
    const validated = updateTeacherSchema.parse(input);

    const existing = await teacherRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Teacher with id ${id} not found`);
    }

    return teacherRepository.update(id, validated);
  }

  async delete(id: string): Promise<void> {
    const existing = await teacherRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Teacher with id ${id} not found`);
    }

    return teacherRepository.delete(id);
  }

  sortByName(teachers: Teacher[], locale: string): Teacher[] {
    return [...teachers].sort((a, b) => {
      const nameA = this.getLocalizedName(a.name, locale);
      const nameB = this.getLocalizedName(b.name, locale);
      return nameA.localeCompare(nameB, locale);
    });
  }

  private getLocalizedName(name: Record<string, string>, locale: string): string {
    return name[locale] || name["bg"] || Object.values(name)[0] || "";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const teacherService = new TeacherService();
