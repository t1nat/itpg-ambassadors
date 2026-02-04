import { apiClient } from "./axios-instance";
import type { Teacher } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

export async function fetchTeachers(): Promise<Teacher[]> {
  const { data } = await apiClient.get<ApiResponse<Teacher[]>>("/teachers");
  return data.data || [];
}

export async function fetchTeacherById(id: string): Promise<Teacher> {
  const { data } = await apiClient.get<ApiResponse<Teacher>>(`/teachers/${id}`);

  if (!data.data) {
    throw new Error("Teacher not found");
  }

  return data.data;
}
