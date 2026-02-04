import { type NextRequest } from "next/server";
import { ambassadorService } from "@/lib/services";
import { successResponse, notFoundResponse, serverErrorResponse } from "@/lib/api";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const ambassador = await ambassadorService.getById(id);

    if (!ambassador) {
      return notFoundResponse("Ambassador");
    }

    return successResponse(ambassador);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
