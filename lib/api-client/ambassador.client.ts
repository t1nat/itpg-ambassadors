import { apiClient } from "./axios-instance";
import type { Ambassador } from "@/lib/validations";
import type { ApiResponse } from "@/lib/api";

export async function fetchAmbassadors(): Promise<Ambassador[]> {
  const { data } = await apiClient.get<ApiResponse<Ambassador[]>>("/ambassadors");
  return data.data || [];
}

export async function fetchAmbassadorById(id: string): Promise<Ambassador> {
  const { data } = await apiClient.get<ApiResponse<Ambassador>>(`/ambassadors/${id}`);

  if (!data.data) {
    throw new Error("Ambassador not found");
  }

  return data.data;
}
