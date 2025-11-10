# 🚀 Quick Start Guide - SOF for Software

## ⚠️ IMPORTANT: First-Time Setup Required

Before you can use the admin settings, you **MUST** create the database table in Supabase.

### Step 1: Create the Database Table ⚡

1. **Navigate to Database Setup**
   - Go to: `/admin/database-setup`
   - Or click "Database Setup" in the admin navigation

2. **Copy the SQL Script**
   - Click the "Copy SQL" button on the setup page

3. **Run in Supabase**
   - Open your [Supabase Dashboard](https://app.supabase.com)
   - Go to **SQL Editor** (left sidebar)
   - Click **New Query**
   - Paste the SQL script
   - Click **Run**

4. **Verify Success**
   - You should see a success message
   - The table `global_settings` is now created

### Step 2: Initialize Settings 📝

1. **Navigate to Initialize Settings**
   - Go to: `/admin/initialize-settings`

2. **Click Initialize**
   - This populates the database with default values
   - Wait for the success message

3. **Done!**
   - You can now use the Admin Settings page
   - All settings are editable from the admin panel

---

## Common Errors & Solutions

### ❌ Error: "Could not find the table 'public.global_settings'"

**Solution:** You haven't run the database setup SQL yet. Follow Step 1 above.

### ❌ Error: "Not authenticated"

**Solution:** Make sure you're logged in to the admin panel.

### ❌ Error: 403 Deployment Failed

**Solution:** This is resolved once you create the database table (Step 1).

---

## What You Get

✅ **6 Default Services** - Web, Mobile, AI, Cloud, DevOps, Consulting  
✅ **35+ Portfolio Projects** - Ready-to-use examples across all categories  
✅ **6 Categories** - Web, Mobile, AI/ML, Cloud, E-commerce, Custom  
✅ **Global Settings** - Control all text, colors, and links from one place  
✅ **Dark/Light Theme** - Automatic theme switching  
✅ **WhatsApp Integration** - Direct project inquiries  

---

## Next Steps

1. ✅ Run database setup SQL
2. ✅ Initialize settings
3. 📝 Customize your company information in Admin Settings
4. 🎨 Add your own projects and categories
5. 📧 Check messages from contact form
6. 🚀 Launch your website!

---

## Need Help?

- Check the `/SETUP.md` file for detailed instructions
- Visit the Database Setup page for SQL script
- Check browser console for error details
