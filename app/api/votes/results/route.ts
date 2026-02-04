import { type NextRequest } from 'next/server'
import { voteService } from '@/lib/services'
import { successResponse, serverErrorResponse } from '@/lib/api'

export async function GET(_request: NextRequest) {
  try {
    const results = await voteService.getResults()
    return successResponse(results)
  } catch (error) {
    return serverErrorResponse(error)
  }
}
