import { type NextRequest } from "next/server";
import { teacherService } from "@/lib/services";
import { successResponse, notFoundResponse, serverErrorResponse } from "@/lib/api";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const teacher = await teacherService.getById(id);

    if (!teacher) {
      return notFoundResponse("Teacher");
    }

    return successResponse(teacher);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
