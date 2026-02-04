import type { Project } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

const API_BASE = "/api";

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE}/projects`);
  const result: ApiResponse<Project[]> = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch projects");
  }

  return result.data || [];
}

export async function fetchProjectById(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects/${id}`);
  const result: ApiResponse<Project> = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch project");
  }

  if (!result.data) {
    throw new Error("Project not found");
  }

  return result.data;
}
