import { createClient } from "@/lib/supabase/server";
import type { Project, CreateProjectInput, UpdateProjectInput } from "@/lib/validations";

export class ProjectRepository {
  async findAll(): Promise<Project[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }

    return (data || []).map((project) => ({
      ...project,
      extra_images: this.parseExtraImages(project.extra_images),
    })) as Project[];
  }

  async findById(id: string): Promise<Project | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Failed to fetch project: ${error.message}`);
    }

    return {
      ...data,
      extra_images: this.parseExtraImages(data.extra_images),
    } as Project;
  }

  async create(input: CreateProjectInput): Promise<Project> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .insert({
        ...input,
        extra_images: JSON.stringify(input.extra_images || []),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }

    return {
      ...data,
      extra_images: this.parseExtraImages(data.extra_images),
    } as Project;
  }

  async update(id: string, input: UpdateProjectInput): Promise<Project> {
    const supabase = await createClient();

    const updateData = {
      ...input,
      ...(input.extra_images && { extra_images: JSON.stringify(input.extra_images) }),
    };

    const { data, error } = await supabase.from("projects").update(updateData).eq("id", id).select().single();

    if (error) {
      throw new Error(`Failed to update project: ${error.message}`);
    }

    return {
      ...data,
      extra_images: this.parseExtraImages(data.extra_images),
    } as Project;
  }

  async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  }

  private parseExtraImages(extraImages: unknown): string[] {
    if (Array.isArray(extraImages)) {
      return extraImages;
    }
    if (typeof extraImages === "string") {
      try {
        return JSON.parse(extraImages);
      } catch {
        return [];
      }
    }
    return [];
  }
}

export const projectRepository = new ProjectRepository();
