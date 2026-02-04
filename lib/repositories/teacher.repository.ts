import { createClient } from '@/lib/supabase/server'
import type { Teacher, CreateTeacherInput, UpdateTeacherInput } from '@/lib/validations'

export class TeacherRepository {
  async findAll(): Promise<Teacher[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch teachers: ${error.message}`)
    }

    return (data || []) as Teacher[]
  }

  async findById(id: string): Promise<Teacher | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw new Error(`Failed to fetch teacher: ${error.message}`)
    }

    return data as Teacher
  }

  async create(input: CreateTeacherInput): Promise<Teacher> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('teachers')
      .insert(input)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create teacher: ${error.message}`)
    }

    return data as Teacher
  }

  async update(id: string, input: UpdateTeacherInput): Promise<Teacher> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('teachers')
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update teacher: ${error.message}`)
    }

    return data as Teacher
  }

  async delete(id: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to delete teacher: ${error.message}`)
    }
  }
}

export const teacherRepository = new TeacherRepository()
