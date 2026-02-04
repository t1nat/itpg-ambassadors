import { type NextRequest } from "next/server";
import { voteService } from "@/lib/services";
import { voteRequestSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError, getClientIp } from "@/lib/api";
import { HTTP_STATUS } from "@/lib/config";
import { voteRateLimiter } from "@/lib/utils/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    // Get voter IP first for rate limiting
    const voterIp = getClientIp(request);

    // Reject requests with unknown IP
    if (voterIp === "unknown") {
      return errorResponse("Unable to determine client IP", HTTP_STATUS.BAD_REQUEST);
    }

    // Check rate limit before processing
    voteRateLimiter(voterIp);

    const body = await request.json();

    // Validate input
    const validated = voteRequestSchema.parse(body);

    // Process vote
    const result = await voteService.vote(validated.projectId, voterIp);

    if (!result.success) {
      const status = result.error?.includes("already voted") ? HTTP_STATUS.CONFLICT : HTTP_STATUS.BAD_REQUEST;
      return errorResponse(result.error ?? "Failed to vote", status);
    }

    return successResponse({ vote: result.vote }, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleApiError(error);
  }
}
