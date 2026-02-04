import { createClient } from "@/lib/supabase/server";
import type { Project, CreateProjectInput, UpdateProjectInput } from "@/lib/validations";
import type { IProjectRepository } from "@/lib/types";
import { NotFoundError, DatabaseError } from "@/lib/types";
import { SUPABASE_ERROR_CODES, DB_TABLES } from "@/lib/config";

/**
 * Project repository implementation
 * Handles all database operations for projects
 */
export class ProjectRepository implements IProjectRepository {
  private readonly tableName = DB_TABLES.projects;

  async findAll(): Promise<Project[]> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*").order("id", { ascending: false });

      if (error) {
        throw new DatabaseError("findAll projects", new Error(error.message));
      }

      return (data ?? []).map((project) => ({
        ...project,
        extra_images: this.parseExtraImages(project.extra_images),
      })) as Project[];
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findAll projects", error instanceof Error ? error : undefined);
    }
  }

  async findById(id: string): Promise<Project | null> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*").eq("id", id).single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.NOT_FOUND) {
          return null;
        }
        throw new DatabaseError("findById project", new Error(error.message));
      }

      return {
        ...data,
        extra_images: this.parseExtraImages(data.extra_images),
      } as Project;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findById project", error instanceof Error ? error : undefined);
    }
  }

  async create(input: CreateProjectInput): Promise<Project> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from(this.tableName)
        .insert({
          ...input,
          extra_images: JSON.stringify(input.extra_images ?? []),
        })
        .select()
        .single();

      if (error) {
        throw new DatabaseError("create project", new Error(error.message));
      }

      return {
        ...data,
        extra_images: this.parseExtraImages(data.extra_images),
      } as Project;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("create project", error instanceof Error ? error : undefined);
    }
  }

  async update(id: string, input: UpdateProjectInput): Promise<Project> {
    try {
      const supabase = await createClient();

      const updateData = {
        ...input,
        ...(input.extra_images !== undefined && {
          extra_images: JSON.stringify(input.extra_images),
        }),
      };

      const { data, error } = await supabase.from(this.tableName).update(updateData).eq("id", id).select().single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.NOT_FOUND) {
          throw new NotFoundError("Project", id);
        }
        throw new DatabaseError("update project", new Error(error.message));
      }

      return {
        ...data,
        extra_images: this.parseExtraImages(data.extra_images),
      } as Project;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
      throw new DatabaseError("update project", error instanceof Error ? error : undefined);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from(this.tableName).delete().eq("id", id);

      if (error) {
        throw new DatabaseError("delete project", new Error(error.message));
      }
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("delete project", error instanceof Error ? error : undefined);
    }
  }

  /**
   * Parse extra_images field from database
   * Handles both JSON string and array formats
   */
  private parseExtraImages(extraImages: unknown): string[] {
    if (Array.isArray(extraImages)) {
      return extraImages;
    }
    if (typeof extraImages === "string") {
      try {
        const parsed = JSON.parse(extraImages);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }
}


export const projectRepository = new ProjectRepository();