import { type NextRequest } from "next/server";
import { ZodError } from "zod";
import { voteService } from "@/lib/services";
import { voteRequestSchema } from "@/lib/validations";
import { successResponse, errorResponse, validationErrorResponse, serverErrorResponse, getClientIp } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validated = voteRequestSchema.parse(body);

    // Get voter IP
    const voterIp = getClientIp(request);

    // Process vote
    const result = await voteService.vote(validated.projectId, voterIp);

    if (!result.success) {
      const status = result.error?.includes("already voted") ? 409 : 400;
      return errorResponse(result.error || "Failed to vote", status);
    }

    return successResponse({ vote: result.vote }, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }
    return serverErrorResponse(error);
  }
}
