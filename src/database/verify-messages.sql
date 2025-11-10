-- ============================================
-- Messages Table Verification Script
-- ============================================
-- Run this to verify your messages table is working correctly
-- ============================================

-- 1. Check if table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'messages') THEN
    RAISE NOTICE '✅ Table "messages" exists';
  ELSE
    RAISE NOTICE '❌ Table "messages" does NOT exist - Run messages-setup.sql first!';
  END IF;
END $$;

-- 2. Show table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'messages'
ORDER BY ordinal_position;

-- 3. Count total messages
SELECT 
  'Total Messages' as metric,
  COUNT(*) as count
FROM messages;

-- 4. Count unread messages
SELECT 
  'Unread Messages' as metric,
  COUNT(*) as count
FROM messages
WHERE read = false;

-- 5. Count read messages
SELECT 
  'Read Messages' as metric,
  COUNT(*) as count
FROM messages
WHERE read = true;

-- 6. Show recent messages (last 10)
SELECT 
  id,
  name,
  email,
  subject,
  CASE WHEN read THEN '✅ Read' ELSE '🔵 Unread' END as status,
  created_at
FROM messages
ORDER BY created_at DESC
LIMIT 10;

-- 7. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'messages';

-- 8. Check indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'messages';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '============================================';
  RAISE NOTICE '✅ Verification Complete!';
  RAISE NOTICE '';
  RAISE NOTICE 'If you see results above, your messages table is working correctly.';
  RAISE NOTICE 'If you see errors, run /database/messages-setup.sql to create the table.';
  RAISE NOTICE '============================================';
END $$;
