# 🔧 Messages System Troubleshooting Guide

## Quick Navigation
- [Table Not Found Error](#table-not-found-error) ⭐ YOU ARE HERE
- [Permission Denied Error](#permission-denied-error)
- [Messages Not Appearing](#messages-not-appearing)
- [Form Not Submitting](#form-not-submitting)
- [Can't Delete Messages](#cant-delete-messages)
- [General Debugging](#general-debugging)

---

## Table Not Found Error ⭐

### Error Message
```
Error: "Could not find the table 'public.messages' in the schema cache"
Code: PGRST205
```

### Cause
The `messages` table doesn't exist in your Supabase database.

### Solution: Create the Table

**Option 1: Use Supabase Dashboard (Recommended)**

1. **Open Supabase**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Click "SQL Editor" in left sidebar

2. **Create New Query**
   - Click "New Query" button

3. **Copy SQL**
   - Open `/database/messages-setup.sql` in your project
   - Copy ALL the content (lines 1-50)

4. **Paste and Run**
   - Paste into Supabase SQL Editor
   - Click "Run" button (or Ctrl+Enter)
   - Wait for "Success" message

5. **Verify**
   - Click "Table Editor" in Supabase
   - You should see "messages" in the table list

**Option 2: Manual Table Creation**

If you prefer to paste SQL directly, use this:

```sql
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

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON messages;
DROP POLICY IF EXISTS "Allow authenticated read/update/delete" ON messages;

CREATE POLICY "Allow public insert" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read/update/delete" ON messages
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);
```

### After Creating Table

1. **Hard Refresh Browser**
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

2. **Test Contact Form**
   - Go to `/contact`
   - Submit a test message
   - Should see success notification

3. **Check Admin Dashboard**
   - Go to `/admin/messages`
   - Should see your test message

---

## Permission Denied Error

### Error Message
```
Error: "permission denied for table messages"
```

### Cause
Row Level Security (RLS) policies are missing or incorrect.

### Solution

**Step 1: Enable RLS**
```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

**Step 2: Create Policies**
```sql
-- Drop old policies
DROP POLICY IF EXISTS "Allow public insert" ON messages;
DROP POLICY IF EXISTS "Allow authenticated read/update/delete" ON messages;

-- Allow public to insert
CREATE POLICY "Allow public insert" ON messages
  FOR INSERT WITH CHECK (true);

-- Allow authenticated to read/update/delete
CREATE POLICY "Allow authenticated read/update/delete" ON messages
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

**Step 3: Verify Policies**
```sql
SELECT * FROM pg_policies WHERE tablename = 'messages';
```

You should see 2 policies:
- "Allow public insert"
- "Allow authenticated read/update/delete"

---

## Messages Not Appearing

### Symptoms
- Contact form submits successfully
- No error messages
- But messages don't show in admin dashboard

### Possible Causes & Solutions

**1. Not Logged In**
- Make sure you're logged into `/admin`
- Check the user icon in admin nav shows your email

**2. Messages in Database but Not Loading**

Check if messages exist:
```sql
SELECT * FROM messages ORDER BY created_at DESC;
```

If you see messages:
- Click "Refresh" button in admin dashboard
- Clear browser cache and hard refresh
- Check browser console for errors

**3. Wrong Table Name**

Verify table name is exactly `messages` (lowercase):
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_name LIKE '%message%';
```

**4. RLS Blocking Access**

Temporarily disable RLS to test:
```sql
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
```

If messages appear, RLS policies are the issue. Re-enable RLS and fix policies:
```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- Then run the policy SQL from above
```

---

## Form Not Submitting

### Symptoms
- Click "Send Message" button
- Nothing happens or error in console

### Solutions

**1. Check Browser Console**
- Open browser DevTools (F12)
- Go to Console tab
- Look for red errors
- Common errors and fixes below

**2. Supabase Connection Issue**

Check if Supabase is connected:
```typescript
// In browser console, run:
const { supabase } = await import('/utils/supabase/client.tsx');
const { data, error } = await supabase.from('messages').select('count');
console.log('Connection test:', data, error);
```

If error, check `/utils/supabase/info.tsx`:
- Verify `projectId` is correct
- Should match your Supabase project URL

**3. Form Validation Error**

Make sure all fields are filled:
- Name (required)
- Email (required, valid format)
- Subject (required)
- Message (required)

**4. CORS Error**

If you see CORS error:
- Go to Supabase Dashboard
- Settings → API
- Check "API URL" matches your `projectId`
- Check "anon public" key is correct

**5. Network Error**

Check Network tab in DevTools:
- Should see POST request to Supabase
- Status should be 201 (Created)
- If 401: Authentication issue
- If 403: Permission issue
- If 404: Wrong table name

---

## Can't Delete Messages

### Symptoms
- Click delete button
- Error or nothing happens

### Solutions

**1. Not Authenticated**
- Make sure you're logged in
- Check user email shows in admin nav
- Try logging out and back in

**2. RLS Policy Issue**

Check if delete is allowed:
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'messages' 
  AND cmd = 'ALL';
```

Should see policy with:
- `cmd`: ALL
- `using`: `auth.role() = 'authenticated'`

If not, run:
```sql
CREATE POLICY "Allow authenticated read/update/delete" ON messages
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

**3. Message ID Issue**

Check console for errors like "invalid UUID"
- The message ID might be malformed
- Try selecting a different message
- Refresh the page

---

## General Debugging

### Check Table Structure
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'messages'
ORDER BY ordinal_position;
```

Expected columns:
1. id - uuid - NO
2. name - text - NO
3. email - text - NO
4. subject - text - NO
5. message - text - NO
6. read - boolean - YES (default false)
7. created_at - timestamp with time zone - YES
8. updated_at - timestamp with time zone - YES

### Check Indexes
```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'messages';
```

Expected indexes:
- idx_messages_created_at
- idx_messages_read
- idx_messages_email

### Check RLS Status
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'messages';
```

`rowsecurity` should be `true`

### View All Messages
```sql
SELECT 
  id,
  name,
  email,
  subject,
  SUBSTRING(message, 1, 50) as message_preview,
  read,
  created_at
FROM messages
ORDER BY created_at DESC
LIMIT 10;
```

### Count Messages
```sql
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE read = false) as unread,
  COUNT(*) FILTER (WHERE read = true) as read
FROM messages;
```

### Test Insert Manually
```sql
INSERT INTO messages (name, email, subject, message)
VALUES ('Test User', 'test@example.com', 'Test Subject', 'Test message content');
```

If this works, the table is fine. Issue is in the app.

### Test RLS Policies
```sql
-- Test as anonymous user (should work)
SET ROLE anon;
INSERT INTO messages (name, email, subject, message)
VALUES ('Anon Test', 'anon@test.com', 'Test', 'Test message');
-- Should succeed

-- Reset role
RESET ROLE;
```

---

## Browser Debugging

### Clear Everything
1. Clear browser cache
2. Clear local storage (DevTools → Application → Local Storage → Clear)
3. Clear session storage
4. Hard refresh (Ctrl+Shift+R)

### Check Network Requests

In DevTools → Network tab:
1. Submit a message
2. Look for request to Supabase
3. Check request payload
4. Check response

**Good Response:**
```json
Status: 201 Created
Response: (empty or success)
```

**Bad Response Examples:**

```json
Status: 404
Error: "table not found"
Fix: Create table
```

```json
Status: 401
Error: "JWT expired"
Fix: Refresh page, login again
```

```json
Status: 403
Error: "permission denied"
Fix: Check RLS policies
```

### Check Authentication

In browser console:
```javascript
const { supabase } = await import('./utils/supabase/client.tsx');
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
```

If `session` is null and you're logged in:
- Try logging out and back in
- Check auth cookies aren't blocked

---

## Complete Reset (Nuclear Option)

If nothing works, start fresh:

### 1. Drop Table
```sql
DROP TABLE IF EXISTS messages CASCADE;
```

### 2. Recreate Table
Run the complete SQL from `/database/messages-setup.sql`

### 3. Clear Browser Data
- Clear cache
- Clear cookies
- Clear local storage
- Close all browser tabs
- Restart browser

### 4. Restart Dev Server
- Stop your development server
- Clear node_modules cache if needed
- Restart server
- Open fresh browser window

### 5. Test Fresh
- Go to `/contact`
- Submit message
- Check `/admin/messages`

---

## Still Having Issues?

### Diagnostic Checklist

Run through this checklist:

- [ ] Table `messages` exists in Supabase
- [ ] Table has 8 columns
- [ ] RLS is enabled
- [ ] 2 policies exist
- [ ] 3 indexes exist
- [ ] Can insert via SQL directly
- [ ] Browser console shows no errors
- [ ] Network tab shows successful requests
- [ ] Logged into admin panel
- [ ] Supabase project ID is correct
- [ ] No CORS errors

### Get Help

If all else fails:

1. **Check Supabase Logs**
   - Supabase Dashboard → Logs
   - Look for errors

2. **Check Application Logs**
   - Browser console
   - Server logs

3. **Verify Files**
   - `/utils/supabase/client.tsx` - correct config?
   - `/utils/supabase/info.tsx` - correct projectId?
   - `/pages/Contact.tsx` - correct table name?
   - `/pages/admin/AdminMessages.tsx` - correct table name?

---

## Prevention Tips

### Regular Maintenance

1. **Backup Messages**
   ```sql
   COPY messages TO '/path/to/backup.csv' CSV HEADER;
   ```

2. **Monitor Table Size**
   ```sql
   SELECT pg_size_pretty(pg_total_relation_size('messages'));
   ```

3. **Clean Old Messages**
   ```sql
   -- Backup first, then:
   DELETE FROM messages 
   WHERE created_at < NOW() - INTERVAL '90 days';
   ```

### Best Practices

- Run `/database/verify-messages.sql` weekly
- Keep Supabase project active
- Monitor error logs
- Test after any database changes
- Document any custom modifications

---

## Quick Reference

### Files
- SQL Setup: `/database/messages-setup.sql`
- Verification: `/database/verify-messages.sql`
- Contact Form: `/pages/Contact.tsx`
- Admin Dashboard: `/pages/admin/AdminMessages.tsx`

### URLs
- Contact Form: `https://yoursite.com/contact`
- Admin Messages: `https://yoursite.com/admin/messages`
- Supabase Dashboard: `https://supabase.com/dashboard`

### Commands
```sql
-- Create table
\i /database/messages-setup.sql

-- Verify table
SELECT * FROM information_schema.tables WHERE table_name = 'messages';

-- Count messages
SELECT COUNT(*) FROM messages;

-- View recent
SELECT * FROM messages ORDER BY created_at DESC LIMIT 5;
```

---

**Last Updated:** Nov 7, 2025  
**Version:** 1.0
