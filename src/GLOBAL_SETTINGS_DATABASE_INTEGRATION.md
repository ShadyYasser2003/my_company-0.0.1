# Global Settings Database Integration Guide

## 🎯 Overview

All website variables (text, colors, links, labels) are now stored in the `global_settings` database table and can be controlled from the admin dashboard. This eliminates the need to edit code files to change website content.

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     WEBSITE ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1. APP STARTUP (App.tsx)                             │  │
│  │    • Calls loadSettings()                            │  │
│  │    • Shows loading screen                            │  │
│  │    • Waits for settings to load from database        │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 2. SETTINGS LOADER (utils/settingsLoader.tsx)        │  │
│  │    • Fetches from global_settings table              │  │
│  │    • Merges with default GLOBAL_CONFIG               │  │
│  │    • Caches settings in memory                       │  │
│  │    • Returns merged configuration                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 3. COMPONENTS USE HOOKS                              │  │
│  │    • useGlobalConfig() for all settings              │  │
│  │    • useCompanyInfo() for company data               │  │
│  │    • useContactInfo() for contact data               │  │
│  │    • etc.                                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 4. RENDER WITH DATABASE VALUES                       │  │
│  │    • All text, colors, links from database           │  │
│  │    • No hardcoded values                             │  │
│  │    • Dynamic and updatable                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Step 1: Database Setup (One-Time)

1. **Run the Setup SQL**
   - Go to Supabase Dashboard → SQL Editor
   - Open `/database/setup.sql`
   - Copy and run the SQL to create the `global_settings` table

2. **Verify Table Created**
   - Go to Table Editor
   - Look for `global_settings` table
   - It should have columns: `id`, `key`, `settings`, `created_at`, `updated_at`, `updated_by`

### Step 2: Initialize Settings (One-Time)

1. **Navigate to Admin Panel**
   - Go to `/admin` and log in
   - Click "Init Settings" in the navigation

2. **Run Initialization**
   - Click "Initialize Settings" button
   - Wait for all steps to complete:
     - ✓ Check database table
     - ✓ Verify settings structure
     - ✓ Initialize settings
   - You should see "Settings initialized successfully!"

3. **Verify Initialization**
   - Go to Admin → Settings
   - You should see all 9 tabs with editable fields
   - All values should match the defaults from `/config/global.tsx`

### Step 3: Edit Settings (Ongoing)

1. **Navigate to Settings Page**
   - Go to `/admin/settings`
   - You'll see 9 organized tabs

2. **Edit Any Value**
   - Company Info, Contact, Social Links, etc.
   - All fields are editable

3. **Save Changes**
   - Click "💾 Save All Settings" at the top
   - Page will reload with new values
   - Changes are immediate across entire website

## 📁 File Structure

```
/config
  ├── global.tsx              # Default configuration (fallback)
  └── globalConfig.tsx        # Functions to get config dynamically

/utils
  ├── settingsLoader.tsx      # Load from database, cache, merge
  ├── settingsDatabase.tsx    # Direct database operations
  └── settingsApi.tsx         # (Legacy - not used)

/hooks
  └── useGlobalConfig.tsx     # React hooks for components

/pages/admin
  ├── AdminSettingsEnhanced.tsx      # Main settings editor
  └── GlobalSettingsInitializer.tsx  # One-time initialization

/database
  └── setup.sql               # Database table creation script
```

## 🎨 How Components Use Settings

### Before (Hardcoded):
```tsx
function Header() {
  return (
    <h1>SOF for Software</h1>
    <p>Transforming Ideas Into Intelligent Software</p>
  );
}
```

### After (Database-Driven):
```tsx
import { useCompanyInfo } from '../hooks/useGlobalConfig';

function Header() {
  const company = useCompanyInfo();
  
  return (
    <h1>{company.name}</h1>
    <p>{company.tagline}</p>
  );
}
```

## 🔧 Available Hooks

```tsx
// Get entire configuration
const config = useGlobalConfig();

// Get specific sections
const company = useCompanyInfo();
const contact = useContactInfo();
const social = useSocialLinks();
const nav = useNavigationConfig();
const home = useHomePageConfig();
const about = useAboutPageConfig();
const services = useServicesPageConfig();
const portfolio = usePortfolioPageConfig();
const contactPage = useContactPageConfig();
```

## 🗄️ Database Structure

### Table: `global_settings`

| Column       | Type        | Description                           |
|--------------|-------------|---------------------------------------|
| id           | UUID        | Primary key                           |
| key          | TEXT        | Settings identifier (e.g., 'site_config') |
| settings     | JSONB       | Complete settings object              |
| created_at   | TIMESTAMPTZ | Creation timestamp                    |
| updated_at   | TIMESTAMPTZ | Last update timestamp                 |
| updated_by   | UUID        | User who last updated (FK to auth.users) |

### Row Level Security (RLS)

- **Public Read Access**: Anyone can read settings (needed for public website)
- **Authenticated Write**: Only authenticated users can modify settings

## 📝 Settings Object Structure

The settings object stored in the database follows this structure:

```json
{
  "company": {
    "name": "SOF for Software",
    "tagline": "Transforming Ideas Into Intelligent Software",
    "description": "...",
    "foundedYear": 2020,
    "employeeCount": "50+",
    ...
  },
  "contact": {
    "email": "shadyyasser665@gmail.com",
    "phone": "+20 122-511-9842",
    "whatsapp": "201225119842",
    "address": "...",
    ...
  },
  "social": {
    "facebook": "https://facebook.com/sofforsoftware",
    "twitter": "...",
    "linkedin": "...",
    ...
  },
  "navigation": { ... },
  "home": { ... },
  "about": { ... },
  "services": { ... },
  "portfolio": { ... },
  "contactPage": { ... },
  "admin": { ... }
}
```

## 🔄 Update Flow

```
1. Admin opens Settings page
   ↓
2. AdminSettingsEnhanced.tsx loads from database
   ↓
3. Admin edits values in form
   ↓
4. Admin clicks "Save All Settings"
   ↓
5. saveSettingsToDB() saves to database
   ↓
6. Page reloads
   ↓
7. loadSettings() fetches new values
   ↓
8. All components re-render with new values
   ↓
9. Changes appear immediately across website
```

## ⚙️ Technical Details

### Cache Strategy

- Settings are cached in memory after first load
- Cache is cleared when settings are saved
- `reloadSettings()` can be called to force refresh

### Merge Strategy

- Database values override defaults
- Missing database values fall back to defaults
- Deep merge ensures no missing properties
- Prevents errors if database is incomplete

### Error Handling

- If database is unavailable → use defaults
- If table doesn't exist → use defaults (silent)
- If load fails → use defaults and log error
- Never blocks app startup

### Performance

- Single database query on app startup
- Settings cached in memory
- No subsequent database calls until refresh
- Fast component rendering

## 🎛️ Admin Settings Page

The enhanced settings page (`/admin/settings`) provides:

### 9 Organized Tabs

1. **🏢 Company** - Name, tagline, description, stats
2. **📞 Contact** - Email, phone, WhatsApp, address, map
3. **🌐 Social** - All social media links
4. **🧭 Navigation** - Menu items and labels
5. **🏠 Home Page** - Hero, stats, sections, CTA
6. **ℹ️ About** - Mission, vision, values, team
7. **🛠️ Services** - Service page configuration
8. **💼 Portfolio** - Portfolio page settings
9. **📧 Contact** - Contact form labels and messages

### Features

- **Search**: Find settings across all tabs
- **Expand/Collapse**: Manage complex nested settings
- **Validation**: Prevents saving invalid data
- **Auto-save indicator**: Shows when changes are saved
- **Real-time preview**: See changes after save
- **Bulk operations**: Save all settings at once

## 🚨 Troubleshooting

### Settings not loading

1. Check database table exists: `global_settings`
2. Run initialization: `/admin/global-settings-init`
3. Check browser console for errors
4. Verify RLS policies allow public read

### Changes not appearing

1. Hard refresh browser (Ctrl+F5)
2. Clear browser cache
3. Check settings were saved successfully
4. Verify no console errors

### Database errors

1. Ensure table exists (run setup.sql)
2. Check RLS policies are correct
3. Verify user is authenticated for writes
4. Check Supabase connection

### Reset to defaults

1. Go to `/admin/global-settings-init`
2. Click "Update Settings"
3. This re-syncs with `/config/global.tsx`

## 📚 Best Practices

### 1. Always Use Hooks
```tsx
// ✅ Good
const config = useGlobalConfig();
<h1>{config.company.name}</h1>

// ❌ Bad
import { GLOBAL_CONFIG } from '../config/global';
<h1>{GLOBAL_CONFIG.company.name}</h1>
```

### 2. Destructure What You Need
```tsx
// ✅ Good
const { name, tagline } = useCompanyInfo();

// ❌ Wasteful
const config = useGlobalConfig();
const name = config.company.name;
```

### 3. Handle Loading State
```tsx
const company = useCompanyInfo();

if (!company) {
  return <div>Loading...</div>;
}

return <h1>{company.name}</h1>;
```

### 4. Don't Mutate Settings Directly
```tsx
// ❌ Bad
const config = useGlobalConfig();
config.company.name = "New Name"; // Won't persist!

// ✅ Good
// Use Admin Settings page to edit
```

## 🔐 Security Notes

- **Public Read Access**: Settings are publicly readable (needed for website)
- **Authenticated Write**: Only logged-in admins can modify
- **No Sensitive Data**: Don't store passwords or API keys in settings
- **RLS Protection**: Row Level Security prevents unauthorized changes

## 🎯 Summary

**Before**: Edit `/config/global.tsx` → Deploy code → Wait for build
**After**: Edit in Admin Panel → Click Save → Changes immediate

All website content is now **database-driven**, **instantly editable**, and **requires zero code changes**!

## 🆘 Support

If you encounter any issues:

1. Check this guide
2. Review browser console for errors
3. Verify database setup is complete
4. Check Supabase dashboard for table/RLS issues
5. Try re-initialization from `/admin/global-settings-init`

---

**Last Updated**: November 7, 2025
**Version**: 1.0.0
