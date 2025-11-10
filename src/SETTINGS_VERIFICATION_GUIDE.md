# Settings Verification System Guide

## Overview

The Settings Verification System is a comprehensive diagnostic tool that checks whether all your website settings are properly saved to and loaded from the database, rather than from the default `global.tsx` file.

## Access the Verification Tool

**URL:** `/admin/settings-verification`

Or navigate via:
1. Admin Dashboard
2. Click "Verify DB" in the top navigation
3. Or click "Verify Database" button on the Settings page

---

## What Does It Check?

The verification system performs 6 comprehensive checks:

### 1. **Database Table Check**
- ✅ Verifies that the `global_settings` table exists
- ✅ Confirms the table is accessible
- ❌ Alerts if table is missing or inaccessible

### 2. **Database Fetch**
- ✅ Attempts to load settings from the database
- ✅ Counts how many root-level configuration keys exist
- ⚠️ Warns if no settings are found (not initialized)
- ❌ Errors if fetch fails

### 3. **Hook Loading Check** ⭐ **MOST IMPORTANT**
- ✅ Checks what the `useGlobalConfig()` hook actually loads
- ✅ Compares loaded data with database data
- ✅ Compares loaded data with default `GLOBAL_CONFIG`
- ⚠️ **WARNING if loading from `global.tsx` instead of database**

### 4. **Variable Count**
- Shows total number of variables in:
  - Database settings
  - Live hook data
  - Default config file
- Helps identify missing or extra variables

### 5. **Save Test**
- ✅ Tests writing data to the database
- ✅ Adds a test timestamp to verify writes work
- ✅ Reads back the data to confirm it was saved
- ❌ Alerts if save fails

### 6. **Final Summary**
- Provides overall pass/fail status
- Summarizes any issues found

---

## How to Use

### Step 1: Access the Page
Navigate to `/admin/settings-verification`

### Step 2: Run Verification
The verification runs automatically on page load, or click **"Run Verification"** to run it again.

### Step 3: Review Results
Each check will show one of these statuses:

| Status | Icon | Meaning |
|--------|------|---------|
| ✅ Success | Green checkmark | Check passed - working correctly |
| ⚠️ Warning | Yellow alert | Potential issue - review details |
| ❌ Error | Red X | Critical failure - needs fixing |
| ℹ️ Info | Blue info | Informational message |

### Step 4: Check Data Comparison
Scroll down to see side-by-side comparison:
- **Database Data** - What's stored in the database
- **Live Hook Data** - What the website is actually using

Compare key values like:
- Company Name
- Email
- Phone Number

**They should match!** If they don't, the hook is not loading from the database.

### Step 5: Export Report (Optional)
Click **"Export Report"** to download a JSON file with all verification data for debugging.

---

## Understanding the Results

### ✅ Perfect Result
```
✓ Table exists and is accessible
✓ Successfully fetched settings from database
✓ Hook is loading values from DATABASE
✓ Successfully saved test data to database
✓ Verified: Saved data matches what was written
✓ ALL CHECKS PASSED
```

**This means:** Everything is working perfectly. Your settings are being saved to and loaded from the database.

---

### ⚠️ Common Warning
```
⚠️ Hook is loading DEFAULT values from global.tsx (NOT from database)
```

**This means:** The website is using hardcoded values from `/config/global.tsx` instead of database values.

**Why this happens:**
1. Settings were never initialized in the database
2. Database table doesn't exist
3. Cache needs to be cleared

**How to fix:**
1. Go to `/admin/global-settings-init`
2. Click "Initialize Settings in Database"
3. Go back to Settings page and save your changes
4. Run verification again

---

### ❌ Critical Error
```
✗ Table does not exist or is not accessible
```

**This means:** The database table hasn't been created yet.

**How to fix:**
1. Go to `/admin/database-setup`
2. Run the database setup
3. Create the `global_settings` table
4. Initialize settings

---

## Verification Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  1. Make changes in Admin Settings                           │
│  2. Click "Save All Changes"                                 │
│  3. Navigate to Settings Verification                        │
│  4. Check that Hook is loading from DATABASE                 │
│  5. Compare Database Data vs Live Hook Data                  │
│  6. Confirm they match                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Sources Explained

### Three Data Sources

1. **`global.tsx` (Default Config)**
   - Location: `/config/global.tsx`
   - Purpose: Default/fallback values
   - Should NOT be used if database is set up

2. **Database (`global_settings` table)**
   - Table: `global_settings`
   - Key: `site_config`
   - Purpose: Live, editable settings
   - Should be the PRIMARY source

3. **Live Hook Data**
   - What `useGlobalConfig()` returns
   - What the website actually uses
   - Should match DATABASE, not defaults

---

## Troubleshooting

### Problem: Hook Loading from global.tsx

**Symptoms:**
- Warning: "Hook is loading DEFAULT values from global.tsx"
- Database Data shows values, but Live Hook Data doesn't match

**Solution:**
```bash
1. Check database has data:
   - Run verification
   - Look at "Database Fetch" step
   - Should show "Successfully fetched settings"

2. If no data in database:
   - Go to /admin/global-settings-init
   - Click "Initialize Settings"
   
3. If data exists but hook not loading:
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R)
   - Check browser console for errors
```

---

### Problem: Save Test Fails

**Symptoms:**
- Error: "Failed to save to database"
- Error: "Not authenticated"

**Solution:**
```bash
1. Ensure you're logged in
   - Check admin session is active
   - Re-login if necessary

2. Check permissions:
   - User must be authenticated
   - Check Supabase RLS policies
   
3. Check table exists:
   - Run database setup
   - Verify table in Supabase dashboard
```

---

### Problem: Variable Count Mismatch

**Symptoms:**
- Database: 0 variables
- Live: 150 variables
- Default: 150 variables

**Solution:**
This means database is empty. Initialize settings:
```bash
1. Go to /admin/global-settings-init
2. Click "Initialize Settings in Database"
3. Verify count increases to 150+
```

---

## Best Practices

### ✅ DO:
- Run verification after every settings save
- Compare Database vs Live data
- Export reports when debugging issues
- Check verification before deploying

### ❌ DON'T:
- Don't edit `global.tsx` to change live values
- Don't assume settings saved without verification
- Don't skip initialization steps
- Don't ignore warnings

---

## Quick Reference

| Action | Where | What It Does |
|--------|-------|-------------|
| Initialize Settings | `/admin/global-settings-init` | Creates initial database record |
| Edit Settings | `/admin/settings` | Modify configuration values |
| Verify Settings | `/admin/settings-verification` | Check database integration |
| Database Setup | `/admin/database-setup` | Create required tables |

---

## FAQ

**Q: Why do I need this verification?**
A: To ensure your settings changes are actually being saved to and loaded from the database, not from hardcoded defaults.

**Q: How often should I verify?**
A: After every "Save All Changes" in the Settings page, at least until you're confident it's working.

**Q: What if all checks pass?**
A: Great! Your system is working correctly. Your website is using database values.

**Q: Can I skip verification?**
A: You can, but you risk making changes that aren't actually applied to the live site.

**Q: What's the difference between "Database Data" and "Live Hook Data"?**
A: Database Data is what's stored. Live Hook Data is what the website uses. They should match.

---

## Technical Details

### How It Works

1. **Direct Database Query**
   ```typescript
   const { data } = await supabase
     .from('global_settings')
     .select('*')
     .eq('key', 'site_config')
     .single();
   ```

2. **Hook Data Fetch**
   ```typescript
   clearSettingsCache();
   const hookData = await loadSettings();
   ```

3. **Comparison**
   ```typescript
   const isUsingDefaults = 
     JSON.stringify(hookData) === JSON.stringify(GLOBAL_CONFIG);
   ```

### Database Structure

```sql
global_settings
├── id (uuid, primary key)
├── key (text, unique) -- Always 'site_config'
├── settings (jsonb) -- All configuration data
├── created_at (timestamptz)
├── updated_at (timestamptz)
└── updated_by (uuid) -- References auth.users
```

---

## Support

If verification fails and you can't resolve it:

1. Export the verification report
2. Check browser console for errors
3. Review Supabase logs
4. Check database table exists
5. Verify RLS policies are correct

---

**Last Updated:** November 2025
**Version:** 1.0
