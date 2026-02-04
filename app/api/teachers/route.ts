import { type NextRequest } from "next/server";
import { teacherService } from "@/lib/services";
import { successResponse, serverErrorResponse } from "@/lib/api";

export async function GET(_request: NextRequest) {
  try {
    const teachers = await teacherService.getAll();
    return successResponse(teachers);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
