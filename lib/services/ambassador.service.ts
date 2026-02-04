import { ambassadorRepository } from "@/lib/repositories";
import { createAmbassadorSchema, updateAmbassadorSchema } from "@/lib/validations";
import type { Ambassador, CreateAmbassadorInput, UpdateAmbassadorInput } from "@/lib/validations";

export class AmbassadorService {
  async getAll(): Promise<Ambassador[]> {
    return ambassadorRepository.findAll();
  }

  async getById(id: string): Promise<Ambassador | null> {
    return ambassadorRepository.findById(id);
  }

  async create(input: CreateAmbassadorInput): Promise<Ambassador> {
    const validated = createAmbassadorSchema.parse(input);
    return ambassadorRepository.create(validated);
  }

  async update(id: string, input: UpdateAmbassadorInput): Promise<Ambassador> {
    const validated = updateAmbassadorSchema.parse(input);

    const existing = await ambassadorRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Ambassador with id ${id} not found`);
    }

    return ambassadorRepository.update(id, validated);
  }

  async delete(id: string): Promise<void> {
    const existing = await ambassadorRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Ambassador with id ${id} not found`);
    }

    return ambassadorRepository.delete(id);
  }

  sortByName(ambassadors: Ambassador[], locale: string): Ambassador[] {
    return [...ambassadors].sort((a, b) => {
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

export const ambassadorService = new AmbassadorService();
