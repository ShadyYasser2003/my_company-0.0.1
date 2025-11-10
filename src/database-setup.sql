-- ============================================================================
-- GLOBAL SETTINGS TABLE SETUP
-- ============================================================================
-- Run this SQL in your Supabase SQL Editor to set up the settings system
-- This creates the table and security policies for global configuration
-- ============================================================================

-- Create global_settings table
CREATE TABLE IF NOT EXISTS global_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  settings JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Add comment to table
COMMENT ON TABLE global_settings IS 'Stores global website configuration and settings';

-- Enable Row Level Security
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean setup)
DROP POLICY IF EXISTS "Allow public read access" ON global_settings;
DROP POLICY IF EXISTS "Allow authenticated insert/update" ON global_settings;

-- Policy 1: Allow everyone to read settings (needed for public website)
CREATE POLICY "Allow public read access" ON global_settings
  FOR SELECT
  USING (true);

-- Policy 2: Allow authenticated users to insert and update
-- This allows admin users to manage settings
CREATE POLICY "Allow authenticated insert/update" ON global_settings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for faster lookups by key
CREATE INDEX IF NOT EXISTS idx_global_settings_key ON global_settings(key);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_global_settings_updated_at ON global_settings;
CREATE TRIGGER update_global_settings_updated_at
    BEFORE UPDATE ON global_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION QUERIES (optional - run these to verify setup)
-- ============================================================================

-- Check if table exists
-- SELECT EXISTS (
--   SELECT FROM information_schema.tables 
--   WHERE table_schema = 'public' 
--   AND table_name = 'global_settings'
-- ) AS table_exists;

-- Check RLS is enabled
-- SELECT relname, relrowsecurity 
-- FROM pg_class 
-- WHERE relname = 'global_settings';

-- Check policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
-- FROM pg_policies 
-- WHERE tablename = 'global_settings';

-- ============================================================================
-- SUCCESS!
-- ============================================================================
-- Table created successfully. You can now:
-- 1. Go to /admin/initialize-settings to populate with default values
-- 2. Or use /admin/settings to manage your configuration
-- ============================================================================
