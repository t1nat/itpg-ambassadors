import { apiClient } from "./axios-instance";
import type { Project } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await apiClient.get<ApiResponse<Project[]>>("/projects");
  return data.data || [];
}

export async function fetchProjectById(id: string): Promise<Project> {
  const { data } = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);

  if (!data.data) {
    throw new Error("Project not found");
  }

  return data.data;
}
