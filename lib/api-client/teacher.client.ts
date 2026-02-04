import { apiClient } from "./axios-instance";
import type { Teacher } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

export async function fetchTeachers(): Promise<Teacher[]> {
  const response = await apiClient.get<ApiResponse<Teacher[]>>("/teachers");
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch teachers");
  }

  return result.data || [];
}

export async function fetchTeacherById(id: string): Promise<Teacher> {
  const response = await apiClient.get<ApiResponse<Teacher>>(`/teachers/${id}`);
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch teacher");
  }

  if (!result.data) {
    throw new Error("Teacher not found");
  }

  return result.data;
}
