import { createClient } from "@/lib/supabase/server";
import type { Teacher, CreateTeacherInput, UpdateTeacherInput } from "@/lib/validations";
import type { ITeacherRepository } from "@/lib/types";
import { NotFoundError, DatabaseError } from "@/lib/types";
import { SUPABASE_ERROR_CODES, DB_TABLES } from "@/lib/config";

/**
 * Teacher repository implementation
 * Handles all database operations for teachers
 */
export class TeacherRepository implements ITeacherRepository {
  private readonly tableName = DB_TABLES.teachers;

  async findAll(): Promise<Teacher[]> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*").order("created_at", { ascending: false });

      if (error) {
        throw new DatabaseError("findAll teachers", new Error(error.message));
      }

      return (data ?? []) as Teacher[];
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findAll teachers", error instanceof Error ? error : undefined);
    }
  }

  async findById(id: string): Promise<Teacher | null> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*").eq("id", id).single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.NOT_FOUND) {
          return null;
        }
        throw new DatabaseError("findById teacher", new Error(error.message));
      }

      return data as Teacher;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findById teacher", error instanceof Error ? error : undefined);
    }
  }

  async create(input: CreateTeacherInput): Promise<Teacher> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).insert(input).select().single();

      if (error) {
        throw new DatabaseError("create teacher", new Error(error.message));
      }

      return data as Teacher;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("create teacher", error instanceof Error ? error : undefined);
    }
  }

  async update(id: string, input: UpdateTeacherInput): Promise<Teacher> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).update(input).eq("id", id).select().single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.NOT_FOUND) {
          throw new NotFoundError("Teacher", id);
        }
        throw new DatabaseError("update teacher", new Error(error.message));
      }

      return data as Teacher;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
      throw new DatabaseError("update teacher", error instanceof Error ? error : undefined);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from(this.tableName).delete().eq("id", id);

      if (error) {
        throw new DatabaseError("delete teacher", new Error(error.message));
      }
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("delete teacher", error instanceof Error ? error : undefined);
    }
  }
}

// Singleton instance for dependency injection
export const teacherRepository = new TeacherRepository();
