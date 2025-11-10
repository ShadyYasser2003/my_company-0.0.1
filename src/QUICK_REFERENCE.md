# Quick Reference Card

## 🌐 Public Website vs 🔐 Admin Dashboard

---

## Access URLs

| Section | URL | Auth Required |
|---------|-----|---------------|
| **Public Website** | `/`, `/about`, `/services`, `/portfolio`, `/contact` | ❌ No |
| **Admin Login** | `/admin` | ❌ No (login page) |
| **Admin Dashboard** | `/admin/dashboard` | ✅ Yes |
| **Admin Categories** | `/admin/categories` | ✅ Yes |
| **Admin Projects** | `/admin/projects` | ✅ Yes |

---

## Key Differences

| Feature | Public Website | Admin Dashboard |
|---------|---------------|-----------------|
| **Navigation** | Public menu (Home, About, etc.) | Admin sidebar (Dashboard, Categories, Projects) |
| **Footer** | ✅ Yes | ❌ No |
| **Admin Links** | ❌ None | N/A |
| **Theme Toggle** | ✅ Yes | ✅ Yes |
| **User Profile** | ❌ No | ✅ Yes (top right) |
| **Sign Out** | N/A | ✅ Yes (top right) |
| **Back to Website** | N/A | ✅ Yes (top right) |

---

## File Quick Reference

### Want to change...

| What to Change | File Location |
|----------------|---------------|
| **Any text content** | `/config/global.tsx` |
| **Public navigation items** | `/config/global.tsx` → `navigation.links` |
| **Admin sidebar items** | `/components/admin/AdminLayout.tsx` → `navItems` |
| **Company name** | `/config/global.tsx` → `company.name` |
| **Contact info** | `/config/global.tsx` → `contact` |
| **Social media links** | `/config/global.tsx` → `social` |
| **Colors** | `/config/global.tsx` → `colors` |
| **Public layout** | `/App.tsx` → `PublicLayout` |
| **Admin layout** | `/components/admin/AdminLayout.tsx` |

---

## Component Structure

### Public Pages
```
Navigation (public menu)
    ↓
Page Content
    ↓
Footer
```

### Admin Pages
```
Admin Header (user, theme, logout)
    ↓
Sidebar | Content
    ↓
(No Footer)
```

---

## Common Tasks

### Add a New Public Page
1. Create component in `/pages/YourPage.tsx`
2. Add route in `/App.tsx` with `PublicLayout`
3. Add to nav in `/config/global.tsx` → `navigation.links`

### Add a New Admin Page
1. Create component in `/pages/admin/YourPage.tsx`
2. Add route in `/App.tsx` under admin routes
3. Add to sidebar in `/components/admin/AdminLayout.tsx` → `navItems`

### Change Text Content
1. Open `/config/global.tsx`
2. Find the section (home, about, contact, etc.)
3. Edit the value
4. Save - changes reflect immediately

### Change Colors
1. Open `/config/global.tsx`
2. Edit `colors` section
3. Or edit `/styles/globals.css` for custom styles

---

## Authentication

### Public Website
- No authentication needed
- Everyone can view
- Contact form available to all

### Admin Dashboard
- Login required
- Navigate to `/admin`
- Enter credentials
- Access dashboard

---

## API Endpoints

### Public (No Auth)
```
GET  /make-server-ea0e3e7d/categories
GET  /make-server-ea0e3e7d/projects
POST /make-server-ea0e3e7d/contact
```

### Admin (Auth Required)
```
POST   /make-server-ea0e3e7d/categories
PUT    /make-server-ea0e3e7d/categories
DELETE /make-server-ea0e3e7d/categories

POST   /make-server-ea0e3e7d/projects
PUT    /make-server-ea0e3e7d/projects
DELETE /make-server-ea0e3e7d/projects
```

---

## Documentation Files

| File | Purpose |
|------|---------|
| `/ADMIN_SEPARATION.md` | Complete architecture explanation |
| `/ADMIN_ACCESS_GUIDE.md` | User guide for admins |
| `/DEVELOPER_NOTES.md` | Technical implementation details |
| `/config/README.md` | Global configuration guide |
| `/QUICK_REFERENCE.md` | This file - quick lookup |

---

## Key Reminders

✅ **Public site has NO admin links**
✅ **Admin accessed via `/admin` URL directly**
✅ **Both use same database and backend**
✅ **Edit content in `/config/global.tsx`**
✅ **Public layout includes footer, admin does not**
✅ **Theme works in both sections**

---

## Emergency Checklist

### Can't find admin panel?
→ Navigate to `/admin`

### Changes not showing?
→ Hard refresh (Ctrl/Cmd + Shift + R)

### Can't log in?
→ Check Supabase credentials in console

### Admin links showing on public site?
→ Check `/components/Navigation.tsx` - should have NO admin links

### Want to add content?
→ Edit `/config/global.tsx` first, then components

---

## Support Resources

1. **Read the Docs**: Start with `/ADMIN_SEPARATION.md`
2. **Global Config**: Check `/config/global.tsx`
3. **Developer Guide**: See `/DEVELOPER_NOTES.md`
4. **User Guide**: See `/ADMIN_ACCESS_GUIDE.md`

---

## Quick Win Checklist

- [ ] Confirm `/admin` shows login page
- [ ] Verify public site has no admin links
- [ ] Test login and access dashboard
- [ ] Check "Back to Website" works
- [ ] Verify theme toggle works in both
- [ ] Test creating a project
- [ ] View project on public portfolio
- [ ] Test sign out

---

**Remember**: Public and Admin are now completely separate modules. Make changes confidently knowing they won't interfere with each other! 🚀
