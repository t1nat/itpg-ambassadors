import { apiClient } from "./axios-instance";
import type { Project } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

export async function fetchProjects(): Promise<Project[]> {
  const response = await apiClient.get<ApiResponse<Project[]>>("/projects");
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch projects");
  }

  return result.data || [];
}

export async function fetchProjectById(id: string): Promise<Project> {
  const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch project");
  }

  if (!result.data) {
    throw new Error("Project not found");
  }

  return result.data;
}
