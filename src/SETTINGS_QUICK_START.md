# Settings Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Initialize Settings (First Time Only)
1. Login to admin at `/admin`
2. Click "Initialize Settings" button on dashboard (if shown)
   - OR navigate to `/admin/initialize-settings`
3. Click "Initialize Settings Database"
4. Wait for success message

### Step 2: Update Your Content
1. Navigate to `/admin/settings`
2. Choose a tab:
   - **Company Info** - Your company name, tagline, stats
   - **Contact Details** - Email, phone, address
   - **Social Media** - All social links
   - **Map Location** - Google Maps coordinates
   - **Home/About/Services/Portfolio/Contact Pages** - Page content
3. Edit any field
4. Click "Save All Changes"
5. Page reloads with your updates! ✨

### Step 3: Verify Changes
1. Visit your public website
2. Check that your changes are live
3. All pages now use your custom content!

---

## 📝 What Can You Edit?

### Company Information
- Company Name (appears in header, footer, everywhere)
- Tagline (homepage hero)
- Description (about page, meta tags)
- Employee Count, Client Count, Project Count

### Contact Details
- Primary Email
- Support Email
- Phone Number
- WhatsApp Number (for WhatsApp integration)
- Office Address

### Social Media
- Facebook, Twitter, LinkedIn, GitHub
- Instagram, YouTube, Discord, Telegram

### Map Location
- Latitude & Longitude (for interactive map)
- Address display text

### Page Content
- Hero sections for all pages
- Call-to-action button text
- Mission and vision statements
- And much more!

---

## 💡 Pro Tips

### Tip #1: Preview Before Saving
Changes aren't applied until you click "Save All Changes"

### Tip #2: Use Reset Button
Made a mistake? Click "Reset" to undo your changes

### Tip #3: Google Maps Coordinates
1. Open Google Maps
2. Right-click your location
3. Click the coordinates at the top
4. Paste into Latitude/Longitude fields

### Tip #4: WhatsApp Format
WhatsApp number format: `15551234567` (country code + number, no spaces)

### Tip #5: Keep Backups
Before major changes, note down your current values

---

## ❓ FAQ

**Q: Where are my settings stored?**  
A: In Supabase database, safely persisted across deployments.

**Q: Can I revert to defaults?**  
A: Yes, go to `/admin/initialize-settings` and re-initialize.

**Q: Do I need to redeploy after changes?**  
A: No! Changes are instant - just save and reload.

**Q: Can multiple admins edit settings?**  
A: Yes, but last save wins. Communicate with your team.

**Q: What if I break something?**  
A: Settings can always be reset. Your code is safe!

---

## 🎯 Common Tasks

### Change Company Name
1. Settings → Company Info tab
2. Edit "Company Name" field
3. Save

### Update Contact Email
1. Settings → Contact Details tab
2. Edit "Primary Email" field
3. Save

### Change Homepage Hero
1. Settings → Home Page tab
2. Edit hero title, description, buttons
3. Save

### Update Social Links
1. Settings → Social Media tab
2. Edit URLs for each platform
3. Save

---

## 🆘 Troubleshooting

### Settings not showing?
- Check if you initialized settings
- Refresh the page
- Check browser console for errors

### Can't save changes?
- Verify you're logged in as admin
- Check your internet connection
- Try logging out and back in

### Changes not visible on website?
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Wait a few seconds and reload

---

## 📚 Additional Resources

- `/DATABASE_SETTINGS_GUIDE.md` - Complete documentation
- `/COMPLETE_DATABASE_IMPLEMENTATION.md` - Technical details
- Admin Dashboard - Inline help and tooltips

---

## ✅ Checklist for New Admins

- [ ] Login to admin panel
- [ ] Initialize settings database
- [ ] Update company information
- [ ] Update contact details
- [ ] Add social media links
- [ ] Verify map location
- [ ] Customize homepage content
- [ ] Test changes on public site
- [ ] Bookmark admin settings page

---

**Need Help?** Contact the development team or review the detailed guides in the project documentation.

**Last Updated:** November 6, 2025  
**Difficulty:** ⭐ Easy (No coding required!)
