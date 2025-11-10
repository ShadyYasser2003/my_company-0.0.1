# Quick Settings Reference Card

## 🚀 Getting Started (3 Steps)

### 1️⃣ Database Setup
```bash
1. Open Supabase Dashboard → SQL Editor
2. Copy/paste SQL from /database/setup.sql
3. Execute
```

### 2️⃣ Initialize Settings
```bash
1. Go to /admin/global-settings-init
2. Click "Initialize Settings"
3. Wait for ✓ success
```

### 3️⃣ Edit Settings
```bash
1. Go to /admin/settings
2. Edit any values
3. Click "Save All Settings"
```

---

## 🔗 Quick Links

| Page | URL | Purpose |
|------|-----|---------|
| **Settings Initializer** | `/admin/global-settings-init` | First-time setup |
| **Settings Editor** | `/admin/settings` | Edit all variables |
| **Database Setup** | `/admin/database-setup` | Create tables |

---

## 🎨 Using Settings in Components

### Import Hook
```tsx
import { useGlobalConfig, useCompanyInfo } from '../hooks/useGlobalConfig';
```

### Use in Component
```tsx
function MyComponent() {
  const company = useCompanyInfo();
  
  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.tagline}</p>
    </div>
  );
}
```

---

## 🪝 Available Hooks

```tsx
useGlobalConfig()      // Everything
useCompanyInfo()       // Company details
useContactInfo()       // Contact information
useSocialLinks()       // Social media URLs
useNavigationConfig()  // Menu items
useHomePageConfig()    // Home page content
useAboutPageConfig()   // About page content
useServicesPageConfig() // Services page content
usePortfolioPageConfig() // Portfolio page content
useContactPageConfig()  // Contact page content
```

---

## 📊 Settings Structure

```
global_settings (table)
  └── key: "site_config"
      └── settings (JSONB):
          ├── company
          ├── contact
          ├── social
          ├── navigation
          ├── home
          ├── about
          ├── services
          ├── portfolio
          ├── contactPage
          └── admin
```

---

## ⚡ Common Tasks

### Change Company Name
1. `/admin/settings` → Company tab
2. Edit "Company Name" field
3. Save

### Update Phone Number
1. `/admin/settings` → Contact tab
2. Edit "Phone" field
3. Save

### Change Hero Text
1. `/admin/settings` → Home Page tab
2. Expand "Hero Section"
3. Edit "Title" or "Description"
4. Save

### Update Social Links
1. `/admin/settings` → Social tab
2. Edit any social media URL
3. Save

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Settings not loading | Run `/admin/global-settings-init` |
| Changes not appearing | Hard refresh (Ctrl+F5) |
| Table doesn't exist | Run `/database/setup.sql` |
| Can't save | Check you're logged in |

---

## 💡 Pro Tips

✅ **Always use hooks** - Never import GLOBAL_CONFIG directly
✅ **Test after saving** - Check changes on public site
✅ **Keep backups** - Export settings before major changes
✅ **Use descriptive values** - Makes editing easier later

❌ **Don't edit code** - Use admin panel instead
❌ **Don't store secrets** - Settings are publicly readable
❌ **Don't mutate directly** - Use admin panel to save

---

## 📞 Quick Values

Access these from admin settings:

- Company Name: `company.name`
- Tagline: `company.tagline`
- Email: `contact.email`
- Phone: `contact.phone`
- WhatsApp: `contact.whatsapp`
- Facebook: `social.facebook`
- Hero Title: `home.hero.title`
- About Description: `about.hero.description`

---

**Need more help?** See `GLOBAL_SETTINGS_DATABASE_INTEGRATION.md`
