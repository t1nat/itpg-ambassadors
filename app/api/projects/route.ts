import { type NextRequest } from 'next/server'
import { projectService } from '@/lib/services'
import { successResponse, serverErrorResponse } from '@/lib/api'

export async function GET(_request: NextRequest) {
  try {
    const projects = await projectService.getAll()
    return successResponse(projects)
  } catch (error) {
    return serverErrorResponse(error)
  }
}
