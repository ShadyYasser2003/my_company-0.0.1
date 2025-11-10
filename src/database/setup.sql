-- ============================================
-- SOF for Software - Database Setup Script
-- ============================================
-- Run this script in your Supabase SQL Editor
-- Location: Supabase Dashboard > SQL Editor > New Query
-- ============================================

-- Create global_settings table
CREATE TABLE IF NOT EXISTS global_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  settings JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON global_settings;
DROP POLICY IF EXISTS "Allow authenticated insert/update" ON global_settings;

-- Allow public read access (for loading settings on public site)
CREATE POLICY "Allow public read access" ON global_settings
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert/update settings
CREATE POLICY "Allow authenticated insert/update" ON global_settings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_global_settings_key ON global_settings(key);

-- ============================================
-- Messages Table
-- ============================================

-- Create messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON messages;
DROP POLICY IF EXISTS "Allow authenticated read/update/delete" ON messages;

-- Allow anyone to insert messages (for contact form)
CREATE POLICY "Allow public insert" ON messages
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read/update/delete messages
CREATE POLICY "Allow authenticated read/update/delete" ON messages
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Database setup completed successfully!';
  RAISE NOTICE 'You can now initialize settings from the admin panel.';
  RAISE NOTICE 'Messages table created for contact form submissions.';
END $$;
