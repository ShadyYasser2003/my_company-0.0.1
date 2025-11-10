# Database-Driven Variables Architecture

## 🎯 Overview

The website now uses a **completely database-driven variable system** built from the ground up. All website content, labels, and settings are stored in the Supabase database and loaded dynamically on every page load.

---

## 📋 Architecture Components

### 1. **Database Structure**
- **Table**: `global_settings`
- **Key Column**: `key` (value: `"site_config"`)
- **Settings Column**: `settings` (JSONB containing all website variables)

### 2. **Frontend Components**

#### `/contexts/SettingsContext.tsx` ✨ NEW
- **The single source of truth** for all settings
- Loads settings from database on app initialization
- Provides settings to all components via React Context
- Automatically falls back to hardcoded defaults if database is unavailable

#### `/hooks/useSettings.tsx` ✨ NEW
- Simple hook for accessing settings in any component
- Usage: `const { settings, loading } = useSettings();`
- Returns current settings and loading state

#### `/utils/settingsDatabase.tsx` (Existing)
- Low-level database operations
- `fetchSettingsFromDB()` - Loads from database
- `saveSettingsToDB()` - Saves to database

---

## 🔄 How It Works

### **1. App Initialization** (`/App.tsx`)
```tsx
<SettingsProvider>
  {/* All app content */}
</SettingsProvider>
```

### **2. Loading Settings** (Automatic)
1. App starts → `SettingsProvider` initializes
2. Calls `fetchSettingsFromDB()` to load from Supabase
3. If successful → Uses database settings ✅
4. If database empty → Falls back to `GLOBAL_CONFIG` defaults ⚠️

### **3. Using Settings in Components**
```tsx
import { useSettings } from '../hooks/useSettings';

function MyComponent() {
  const { settings, loading } = useSettings();
  
  return <h1>{settings.company.name}</h1>;
}
```

### **4. Admin Updates** (`/admin/settings`)
1. Admin edits settings in the dashboard
2. Clicks "Save" → Saves to `global_settings` table
3. Page reloads → Loads fresh settings from database
4. All public pages now show updated values ✨

---

## 📁 Files Updated

### ✨ **New Files Created**
- `/contexts/SettingsContext.tsx` - Settings provider
- `/hooks/useSettings.tsx` - Settings hook
- `/DATABASE_ARCHITECTURE.md` - This documentation

### 🔧 **Modified Files**
- `/App.tsx` - Wrapped in `SettingsProvider`
- `/components/Navigation.tsx` - Uses `useSettings()` instead of `GLOBAL_CONFIG`
- `/components/Footer.tsx` - Uses `useSettings()`
- `/pages/Home.tsx` - Uses `useSettings()`
- `/pages/About.tsx` - Uses `useSettings()`
- `/pages/Contact.tsx` - Uses `useSettings()`
- `/pages/admin/AdminSettings.tsx` - Refreshes settings after save

---

## 🎨 Benefits

### ✅ **Advantages**
1. **Single Source of Truth** - Database is the only authority
2. **No Code Changes Needed** - All updates via admin panel
3. **Instant Updates** - Change once, reflects everywhere
4. **Clean Architecture** - Built from scratch with database in mind
5. **Fallback Safety** - Works even if database is unavailable

### ⚡ **Performance**
- Settings loaded once on app initialization
- Cached in React Context for instant access
- No repeated database calls during navigation

---

## 🚀 Usage Guide

### **For Developers**

#### **Adding a New Page**
```tsx
import { useSettings } from '../hooks/useSettings';

export function NewPage() {
  const { settings } = useSettings();
  
  return (
    <div>
      <h1>{settings.company.name}</h1>
      <p>{settings.company.description}</p>
    </div>
  );
}
```

#### **Adding a New Setting Field**
1. Go to `/pages/admin/AdminSettings.tsx`
2. Add the new field to the form
3. Update the `settings` state structure
4. Save from admin panel
5. Use in components: `settings.yourNewField`

### **For Administrators**

#### **Editing Website Content**
1. Login to admin panel: `/admin`
2. Navigate to: **Admin Dashboard > Settings**
3. Choose a tab (Company, Contact, Social, etc.)
4. Edit the values
5. Click **Save Settings**
6. Page will reload with new values ✨

---

## 🛠️ Database Setup

If the `global_settings` table doesn't exist:

1. Go to `/admin/database-setup`
2. Copy the SQL script
3. Open Supabase SQL Editor
4. Paste and run the script
5. Initialize settings from `/admin/global-settings-init`

---

## 🔍 Verification

To verify the system is working:

1. Visit `/admin/settings-verification`
2. Runs 6 automated checks:
   - ✅ Database table exists
   - ✅ Settings row exists
   - ✅ Settings have data
   - ✅ Public can read
   - ✅ Admin can write
   - ✅ Frontend loads from DB

---

## 📊 Data Flow Diagram

```
┌─────────────────┐
│   Supabase DB   │
│ global_settings │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│SettingsContext  │  ← Loads on app start
│  (React Context)│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  useSettings()  │  ← Used in components
│      Hook       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Components    │  ← Display dynamic content
│ (Home, About,   │
│  Nav, Footer)   │
└─────────────────┘
```

---

## ⚠️ Important Notes

1. **Always use `useSettings()`** - Never import `GLOBAL_CONFIG` directly in components
2. **GLOBAL_CONFIG is now a fallback** - Only used if database is empty
3. **Admin saves reload the page** - This ensures all components get fresh data
4. **Settings are cached** - No performance impact from database access

---

## 🎯 Migration Complete!

The website is now **100% database-driven**. All public pages load their content from the `global_settings` table, and the admin panel provides full control over every variable without touching code!

---

**Built with ❤️ by SOF for Software**
