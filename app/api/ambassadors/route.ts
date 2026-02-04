import { type NextRequest } from "next/server";
import { ambassadorService } from "@/lib/services";
import { successResponse, handleApiError } from "@/lib/api";

export async function GET(_request: NextRequest) {
  try {
    const ambassadors = await ambassadorService.getAll();
    return successResponse(ambassadors);
  } catch (error) {
    return handleApiError(error);
  }
}
