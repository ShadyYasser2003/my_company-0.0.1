-- ============================================
-- Messages Table Setup
-- ============================================
-- Quick setup for messages table only
-- Run this in Supabase SQL Editor if you already have global_settings table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Messages table created successfully!';
  RAISE NOTICE '📧 Contact form is now ready to receive submissions';
  RAISE NOTICE '👀 View messages at: /admin/messages';
END $$;
