-- Migration: Update tables with proper constraints and indexes
-- Run this migration to improve the database schema

-- Add indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_ambassadors_created_at ON public.ambassadors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teachers_created_at ON public.teachers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- Add indexes for vote queries
CREATE INDEX IF NOT EXISTS idx_votes_project_id ON public.votes(project_id);
CREATE INDEX IF NOT EXISTS idx_votes_voter_ip ON public.votes(voter_ip);
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON public.votes(created_at DESC);

-- Add composite index for vote uniqueness check
CREATE INDEX IF NOT EXISTS idx_votes_project_ip ON public.votes(project_id, voter_ip);

-- Add updated_at columns for tracking modifications
ALTER TABLE public.ambassadors 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE public.teachers 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_ambassadors_updated_at ON public.ambassadors;
CREATE TRIGGER update_ambassadors_updated_at
    BEFORE UPDATE ON public.ambassadors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON public.teachers;
CREATE TRIGGER update_teachers_updated_at
    BEFORE UPDATE ON public.teachers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add check constraints for data integrity
ALTER TABLE public.ambassadors
DROP CONSTRAINT IF EXISTS check_ambassador_age,
ADD CONSTRAINT check_ambassador_age CHECK (age IS NULL OR (age > 0 AND age < 150));

-- Add comment explaining the table structure
COMMENT ON TABLE public.ambassadors IS 'EP Ambassador Program ambassadors. Name and bio fields store JSON with localized text.';
COMMENT ON TABLE public.teachers IS 'EP Ambassador Program teachers/coordinators. Name, subject, and bio fields store JSON with localized text.';
COMMENT ON TABLE public.projects IS 'EP Ambassador Program projects. Title and description fields store JSON with localized text.';
COMMENT ON TABLE public.votes IS 'Votes for projects. Limited to one vote per IP per project.';

-- Add comments on columns
COMMENT ON COLUMN public.ambassadors.name IS 'JSON object with localized names: {"bg": "...", "en": "..."}';
COMMENT ON COLUMN public.ambassadors.bio IS 'JSON object with localized biographies';
COMMENT ON COLUMN public.teachers.name IS 'JSON object with localized names';
COMMENT ON COLUMN public.teachers.subject IS 'JSON object with localized subject names';
COMMENT ON COLUMN public.projects.title IS 'JSON object with localized titles';
COMMENT ON COLUMN public.projects.description IS 'JSON object with localized descriptions';
COMMENT ON COLUMN public.projects.extra_images IS 'JSON array of additional image URLs';
