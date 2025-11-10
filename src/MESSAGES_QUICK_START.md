# 📧 Messages Quick Start

## 🚀 3-Step Setup

### 1️⃣ Create Database Table
Go to **Supabase Dashboard** → **SQL Editor** → Paste & Run:

```sql
-- Copy from: /database/messages-setup.sql
-- OR use: /database/setup.sql for complete setup
```

### 2️⃣ Test Contact Form
- Visit: `/contact` page
- Fill out and submit the form
- See success message ✅

### 3️⃣ View in Admin
- Login: `/admin`
- Click: **"Messages"** tab
- See your message! 🎉

---

## 📍 Key Locations

### Files
- **Contact Form**: `/pages/Contact.tsx`
- **Admin Messages**: `/pages/admin/AdminMessages.tsx`
- **Database Setup**: `/database/messages-setup.sql`
- **Full Guide**: `/MESSAGING_SYSTEM_GUIDE.md`

### Routes
- **Public Contact**: `https://your-site.com/contact`
- **Admin Messages**: `https://your-site.com/admin/messages`

---

## ⚡ Features at a Glance

✅ **Visitors Can:**
- Submit messages through contact form
- Get instant success confirmation
- Automatic validation

✅ **Admins Can:**
- View all messages in dashboard
- Filter: All / Unread / Read
- Search by name, email, subject
- Mark as read (automatic on view)
- Delete messages
- Reply via email with one click
- See unread count badge
- Refresh to get latest messages

---

## 🎯 Common Actions

### View New Messages
```
1. Go to /admin/messages
2. Look for red "X new" badge
3. Click "Unread" filter
```

### Reply to Message
```
1. Click message to open
2. Click "Reply via Email" button
3. Compose in your email client
```

### Delete Message
```
1. Open message details
2. Click trash icon
3. Confirm deletion
```

---

## 🔍 Database Query Examples

```sql
-- View all messages
SELECT * FROM messages ORDER BY created_at DESC;

-- Count unread messages
SELECT COUNT(*) FROM messages WHERE read = false;

-- Mark all as read
UPDATE messages SET read = true;

-- Delete old messages
DELETE FROM messages WHERE created_at < NOW() - INTERVAL '90 days';
```

---

## 🚨 Quick Troubleshooting

**Problem**: Messages not showing?
- ✓ Run database setup SQL
- ✓ Check you're logged in
- ✓ Click Refresh button
- ✓ Check browser console

**Problem**: Form not submitting?
- ✓ Verify Supabase connection
- ✓ Check table name is `messages`
- ✓ Check browser network tab
- ✓ Verify RLS policies

---

## 🎊 You're All Set!

Your messaging system is ready! Test it now:
1. Send a test message from `/contact`
2. View it in `/admin/messages`
3. Reply with one click!

For detailed information, see: **/MESSAGING_SYSTEM_GUIDE.md**
