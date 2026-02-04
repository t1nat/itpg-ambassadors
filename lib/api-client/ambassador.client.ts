import { apiClient } from "./axios-instance";
import type { Ambassador } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

export async function fetchAmbassadors(): Promise<Ambassador[]> {
  const response = await apiClient.get<ApiResponse<Ambassador[]>>("/ambassadors");
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch ambassadors");
  }

  return result.data || [];
}

export async function fetchAmbassadorById(id: string): Promise<Ambassador> {
  const response = await apiClient.get<ApiResponse<Ambassador>>(`/ambassadors/${id}`);
  const result = response.data;

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch ambassador");
  }

  if (!result.data) {
    throw new Error("Ambassador not found");
  }

  return result.data;
}
