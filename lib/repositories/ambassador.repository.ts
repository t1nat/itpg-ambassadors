import { createClient } from "@/lib/supabase/server";
import type { Ambassador, CreateAmbassadorInput, UpdateAmbassadorInput } from "@/lib/validations";
import type { IAmbassadorRepository } from "@/lib/types";
import { NotFoundError, DatabaseError } from "@/lib/types";
import { SUPABASE_ERROR_CODES, DB_TABLES } from "@/lib/config";

/**
 * Ambassador repository implementation
 * Handles all database operations for ambassadors
 */
export class AmbassadorRepository implements IAmbassadorRepository {
  private readonly tableName = DB_TABLES.ambassadors;

  async findAll(): Promise<Ambassador[]> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*").order("created_at", { ascending: false });

      if (error) {
        throw new DatabaseError("findAll ambassadors", new Error(error.message));
      }

      return (data ?? []) as Ambassador[];
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findAll ambassadors", error instanceof Error ? error : undefined);
    }
  }

  async findById(id: string): Promise<Ambassador | null> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).select("*").eq("id", id).single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.NOT_FOUND) {
          return null;
        }
        throw new DatabaseError("findById ambassador", new Error(error.message));
      }

      return data as Ambassador;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("findById ambassador", error instanceof Error ? error : undefined);
    }
  }

  async create(input: CreateAmbassadorInput): Promise<Ambassador> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).insert(input).select().single();

      if (error) {
        throw new DatabaseError("create ambassador", new Error(error.message));
      }

      return data as Ambassador;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("create ambassador", error instanceof Error ? error : undefined);
    }
  }

  async update(id: string, input: UpdateAmbassadorInput): Promise<Ambassador> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from(this.tableName).update(input).eq("id", id).select().single();

      if (error) {
        if (error.code === SUPABASE_ERROR_CODES.NOT_FOUND) {
          throw new NotFoundError("Ambassador", id);
        }
        throw new DatabaseError("update ambassador", new Error(error.message));
      }

      return data as Ambassador;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
      throw new DatabaseError("update ambassador", error instanceof Error ? error : undefined);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from(this.tableName).delete().eq("id", id);

      if (error) {
        throw new DatabaseError("delete ambassador", new Error(error.message));
      }
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("delete ambassador", error instanceof Error ? error : undefined);
    }
  }
}

// Singleton instance for dependency injection
export const ambassadorRepository = new AmbassadorRepository();
