# Database-Driven Configuration System

## Overview

The website now uses a **complete database-driven configuration system** where ALL text content, settings, and variables can be controlled from the Admin Dashboard and are stored in Supabase.

## Key Features

✅ **Full Admin Control** - Manage ALL website content from one place  
✅ **Database Persistence** - All settings saved to Supabase  
✅ **Real-time Updates** - Changes reflect immediately across the entire site  
✅ **No Code Changes** - Update content without touching code files  
✅ **Centralized Management** - One dashboard for all configuration  

## How It Works

### 1. **Settings Storage**
- All configuration is stored in Supabase KV store with key `settings:global`
- Settings include: company info, contact details, social media, page content, etc.
- Admin updates are saved to database via REST API

### 2. **Settings Loading**
- On app startup, settings are fetched from database
- Database settings are merged with default configuration
- Settings are cached for performance

### 3. **Admin Dashboard**
- Navigate to `/admin/dashboard` → Settings
- Edit ANY configuration value
- Click "Save All Changes" to persist to database
- Page reloads to apply changes

## Admin Settings Sections

### 🏢 Company Info Tab
- Company Name, Short Name, Full Name
- Tagline, Description, Slogan
- Founded Year
- Employee Count, Client Count, Project Count

### 📞 Contact Details Tab
- Primary Email, Support Email, Sales Email
- Phone Number, WhatsApp Number
- Office Address, City, Country

### 🌐 Social Media Tab
- Facebook, Twitter, LinkedIn, GitHub
- Instagram, YouTube, Discord, Telegram

### 📍 Map Location Tab
- Latitude & Longitude (for Google Maps)
- Address Display Text
- Live preview link

### 🏠 Home Page Tab
- Hero Section: Badge, Title, Description
- Call-to-Action Buttons
- Scroll Indicator Text

### ℹ️ About Page Tab
- Hero Section Content
- Mission Statement
- Vision Statement

### 🛠️ Services Page Tab
- Hero Section Content
- Page Description

### 💼 Portfolio Page Tab
- Hero Section Content
- Page Description

### 📧 Contact Page Tab
- Hero Section Content
- Form Labels & Messages

## API Endpoints

### Get Settings
```
GET /supabase/functions/v1/make-server-ea0e3e7d/settings
```
Returns current settings or null if not initialized.

### Update Settings (Admin Only)
```
PUT /supabase/functions/v1/make-server-ea0e3e7d/settings
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "company": { ... },
  "contact": { ... },
  "social": { ... },
  ...
}
```

### Contact Form Messages
```
POST /supabase/functions/v1/make-server-ea0e3e7d/messages
```
Public endpoint for contact form submissions.

## Usage in Code

### Using Static Config (Fallback)
```tsx
import { GLOBAL_CONFIG } from './config/global';

// Still works as fallback
const companyName = GLOBAL_CONFIG.company.name;
```

### Using Dynamic Config (Recommended)
```tsx
import { useGlobalConfig } from './hooks/useGlobalConfig';

function MyComponent() {
  const config = useGlobalConfig();
  return <h1>{config.company.name}</h1>;
}
```

### Using Specific Sections
```tsx
import { useCompanyInfo, useContactInfo } from './hooks/useGlobalConfig';

function MyComponent() {
  const company = useCompanyInfo();
  const contact = useContactInfo();
  
  return (
    <div>
      <h1>{company.name}</h1>
      <p>{contact.email}</p>
    </div>
  );
}
```

## Files Structure

```
/config
  ├── global.tsx           # Default/fallback configuration
  └── globalConfig.tsx     # Dynamic config helpers

/utils
  └── settingsLoader.tsx   # Settings loading & caching

/hooks
  └── useGlobalConfig.tsx  # React hooks for config

/pages/admin
  └── AdminSettings.tsx    # Admin settings management UI

/supabase/functions/server
  └── index.tsx            # API endpoints (GET/PUT settings)
```

## How to Update Website Content

### Option 1: Admin Dashboard (Recommended)
1. Login to admin at `/admin`
2. Navigate to Dashboard → Settings
3. Select the tab for content you want to edit
4. Make your changes
5. Click "Save All Changes"
6. Page reloads with updated content

### Option 2: Direct Database (Advanced)
Update the `settings:global` key in Supabase KV store directly.

### Option 3: Code Changes (Not Recommended)
Edit `/config/global.tsx` - but this won't persist if database settings exist.

## Benefits

### For Admins
- ✅ Update content without code knowledge
- ✅ Changes persist across deployments
- ✅ Preview changes before publishing
- ✅ All content in one place

### For Developers
- ✅ Separation of content and code
- ✅ Easy to extend with new settings
- ✅ Type-safe configuration
- ✅ Backward compatible

### For Users
- ✅ Consistent content across all pages
- ✅ Fast loading with caching
- ✅ Always up-to-date information

## Migration from Old System

The system is **fully backward compatible**:
- Old code using `GLOBAL_CONFIG` still works
- Database settings override defaults when available
- No breaking changes to existing code

## Troubleshooting

### Settings Not Updating?
1. Check browser console for errors
2. Verify you're logged in as admin
3. Clear browser cache and reload
4. Check Supabase connection

### Settings Reverting to Defaults?
1. Verify settings saved in database
2. Check `/supabase/functions/v1/make-server-ea0e3e7d/settings` returns data
3. Look for errors in settings loader

### Can't Access Admin Settings?
1. Login at `/admin`
2. Navigate to Settings via sidebar
3. Ensure you have admin permissions

## Future Enhancements

Potential additions:
- 🔄 Real-time sync without page reload
- 📝 Change history/versioning
- 🌍 Multi-language support
- 🎨 Theme customization
- 📊 Analytics integration

## Support

For questions or issues:
1. Check this guide
2. Review code comments in related files
3. Check admin dashboard for inline help
4. Contact development team

---

**Last Updated:** November 6, 2025  
**Version:** 2.0.0  
**Status:** Production Ready ✅
