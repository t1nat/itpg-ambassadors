import { ambassadorRepository } from "@/lib/repositories";
import { createAmbassadorSchema, updateAmbassadorSchema } from "@/lib/validations";
import type { Ambassador, CreateAmbassadorInput, UpdateAmbassadorInput } from "@/lib/validations";
import type { IAmbassadorService, IAmbassadorRepository } from "@/lib/types";
import { NotFoundError, getLocalizedText } from "@/lib/types";

/**
 * Ambassador service implementation
 * Handles business logic for ambassador operations
 */
export class AmbassadorService implements IAmbassadorService {
  constructor(private readonly repository: IAmbassadorRepository = ambassadorRepository) {}

  async getAll(): Promise<Ambassador[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Ambassador | null> {
    return this.repository.findById(id);
  }

  async create(input: CreateAmbassadorInput): Promise<Ambassador> {
    const validated = createAmbassadorSchema.parse(input);
    return this.repository.create(validated);
  }

  async update(id: string, input: UpdateAmbassadorInput): Promise<Ambassador> {
    const validated = updateAmbassadorSchema.parse(input);

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError("Ambassador", id);
    }

    return this.repository.update(id, validated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError("Ambassador", id);
    }

    return this.repository.delete(id);
  }

  /**
   * Sort ambassadors by localized name
   */
  sortByName(ambassadors: Ambassador[], locale: string): Ambassador[] {
    return [...ambassadors].sort((a, b) => {
      const nameA = getLocalizedText(a.name, locale);
      const nameB = getLocalizedText(b.name, locale);
      return nameA.localeCompare(nameB, locale);
    });
  }
}

// Re-export NotFoundError for backwards compatibility
export { NotFoundError } from "@/lib/types";

// Singleton instance for dependency injection
export const ambassadorService = new AmbassadorService();
