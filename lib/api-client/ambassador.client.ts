import type { Ambassador } from '@/lib/validations'
import type { ApiResponse } from '@/lib/api'

const API_BASE = '/api'

export async function fetchAmbassadors(): Promise<Ambassador[]> {
  const response = await fetch(`${API_BASE}/ambassadors`)
  const result: ApiResponse<Ambassador[]> = await response.json()
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch ambassadors')
  }
  
  return result.data || []
}

export async function fetchAmbassadorById(id: string): Promise<Ambassador> {
  const response = await fetch(`${API_BASE}/ambassadors/${id}`)
  const result: ApiResponse<Ambassador> = await response.json()
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch ambassador')
  }
  
  if (!result.data) {
    throw new Error('Ambassador not found')
  }
  
  return result.data
}
