import type { Teacher } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

const API_BASE = "/api";

export async function fetchTeachers(): Promise<Teacher[]> {
  const response = await fetch(`${API_BASE}/teachers`);
  const result: ApiResponse<Teacher[]> = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch teachers");
  }

  return result.data || [];
}

export async function fetchTeacherById(id: string): Promise<Teacher> {
  const response = await fetch(`${API_BASE}/teachers/${id}`);
  const result: ApiResponse<Teacher> = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch teacher");
  }

  if (!result.data) {
    throw new Error("Teacher not found");
  }

  return result.data;
}
