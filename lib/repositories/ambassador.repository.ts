import { createClient } from "@/lib/supabase/server";
import type { Ambassador, CreateAmbassadorInput, UpdateAmbassadorInput } from "@/lib/validations";

export class AmbassadorRepository {
  async findAll(): Promise<Ambassador[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("ambassadors").select("*").order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch ambassadors: ${error.message}`);
    }

    return (data || []) as Ambassador[];
  }

  async findById(id: string): Promise<Ambassador | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("ambassadors").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Failed to fetch ambassador: ${error.message}`);
    }

    return data as Ambassador;
  }

  async create(input: CreateAmbassadorInput): Promise<Ambassador> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("ambassadors").insert(input).select().single();

    if (error) {
      throw new Error(`Failed to create ambassador: ${error.message}`);
    }

    return data as Ambassador;
  }

  async update(id: string, input: UpdateAmbassadorInput): Promise<Ambassador> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("ambassadors").update(input).eq("id", id).select().single();

    if (error) {
      throw new Error(`Failed to update ambassador: ${error.message}`);
    }

    return data as Ambassador;
  }

  async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("ambassadors").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete ambassador: ${error.message}`);
    }
  }
}

export const ambassadorRepository = new AmbassadorRepository();
