# SOF for Software - Setup Guide

## Database Setup

Your application requires a Supabase database table to store global settings. Follow these steps to set up the database:

### Step 1: Access Database Setup Page

1. Navigate to `/admin` and log in
2. Click on **Database Setup** in the navigation menu
3. Click **Copy SQL** to copy the SQL script

### Step 2: Run SQL in Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Paste the copied SQL script
6. Click **Run** to execute

### Step 3: Initialize Settings

1. Return to your admin panel
2. Navigate to **Initialize Settings**
3. Click **Initialize Settings** to populate default values

## What the SQL Script Does

The setup script creates the `global_settings` table with:

- **Table Structure**: Stores configuration as JSONB
- **Row Level Security (RLS)**: Enabled for data protection
- **Public Read Access**: Allows the public site to read settings
- **Authenticated Write Access**: Only authenticated admins can modify settings
- **Indexes**: Optimized for fast lookups

## Troubleshooting

### Error: "Could not find the table 'public.global_settings'"

This means the database table hasn't been created yet. Follow the database setup steps above.

### Error: "Not authenticated"

Make sure you're logged in to the admin panel before trying to save settings.

### Error 403: Deployment Failed

This is related to Supabase permissions and edge functions. The database setup should resolve this by creating the necessary tables with proper RLS policies.

## Next Steps

After completing the database setup:

1. ✅ Initialize default settings
2. ✅ Customize settings through the Admin Settings page
3. ✅ Initialize default services via the Initialize Data page
4. ✅ Add your own categories and projects

## Support

If you encounter any issues, check the browser console for detailed error messages.
