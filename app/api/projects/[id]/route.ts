import { type NextRequest } from "next/server";
import { projectService } from "@/lib/services";
import { successResponse, notFoundResponse, serverErrorResponse } from "@/lib/api";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const project = await projectService.getById(id);

    if (!project) {
      return notFoundResponse("Project");
    }

    return successResponse(project);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
