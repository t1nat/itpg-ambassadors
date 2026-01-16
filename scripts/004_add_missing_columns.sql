-- Add missing columns to existing tables
-- Run this if you already created tables with the old schema

-- Add age column to ambassadors table
ALTER TABLE ambassadors ADD COLUMN IF NOT EXISTS age INTEGER;

-- Add missing columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS extra_images TEXT DEFAULT '[]';

-- Update existing projects to have descriptions (if they exist)
-- This is optional - you can add descriptions through the admin interface