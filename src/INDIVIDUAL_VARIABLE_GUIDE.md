# Individual Variable Modification Guide

## 🎯 Quick Start: Modifying Individual Settings

This guide shows you how to modify individual variables in your website configuration through the admin dashboard.

## ✅ Prerequisites

- Admin access to the dashboard
- Logged in at `/admin`

## 📝 Step-by-Step Guide

### 1. Access the Settings Page

```
Navigate to: /admin/dashboard/settings
```

Or click "Settings" from the admin sidebar.

### 2. Select the Appropriate Tab

Settings are organized into 9 tabs:

| Tab | Contains |
|-----|----------|
| **Company Info** | Company name, tagline, description, statistics |
| **Contact Details** | Email, phone, WhatsApp, address |
| **Social Media** | Facebook, Twitter, LinkedIn, GitHub, etc. |
| **Map Location** | Latitude/longitude for map display |
| **Home Page** | Hero section, CTAs, badges |
| **About Page** | Mission, vision, hero content |
| **Services Page** | Services hero section |
| **Portfolio Page** | Portfolio hero section |
| **Contact Page** | Contact page hero section |

### 3. Edit Individual Fields

Each field is independent:

- Click on any input field
- Type your new value
- The "Save All Changes" button will activate
- Continue editing other fields if needed

### 4. Save Your Changes

- Click the **"Save All Changes"** button (top right)
- Wait for the success message
- Page will automatically reload to apply changes

## 🎨 Common Modifications

### Change Company Name

1. Go to **Company Info** tab
2. Find "Company Name" field
3. Enter new name
4. Click "Save All Changes"

```
Field: Company Name
Example: "SOF for Software"
```

### Update Contact Email

1. Go to **Contact Details** tab
2. Find "Primary Email" field
3. Enter new email address
4. Click "Save All Changes"

```
Field: Primary Email
Example: "info@yourcompany.com"
```

### Update Social Media Links

1. Go to **Social Media** tab
2. Find the platform you want to update
3. Enter the full URL
4. Click "Save All Changes"

```
Field: Facebook
Example: "https://facebook.com/yourpage"
```

### Change Homepage Hero Title

1. Go to **Home Page** tab
2. Find "Hero Title" field
3. Enter new title
4. Find "Hero Title Highlight" for the colored part
5. Click "Save All Changes"

```
Field: Hero Title
Example: "Transforming Ideas into"

Field: Hero Title Highlight  
Example: "Digital Reality"

Result: "Transforming Ideas into Digital Reality"
```

### Update Map Location

1. Go to **Map Location** tab
2. Enter latitude and longitude
3. Click the "Preview on Google Maps" link to verify
4. Click "Save All Changes"

```
Field: Latitude
Example: 40.7128

Field: Longitude
Example: -74.0060

Result: Points to New York City
```

## 💡 Pro Tips

### Multiple Changes at Once
- You can edit multiple fields across different tabs
- All changes are tracked
- One "Save All Changes" saves everything

### Previewing Changes
- Changes are NOT applied until you save
- You can navigate between tabs without losing edits
- Click save when you're satisfied with all changes

### Reverting Changes
- If you made a mistake, reload the page before saving
- This discards all unsaved changes

### Required Fields
Some fields are required:
- ✅ Company Name (cannot be empty)
- ✅ Email (must be valid format)

### URL Fields
When entering URLs, use complete format:
```
✅ Correct: https://twitter.com/yourhandle
❌ Wrong: twitter.com/yourhandle
❌ Wrong: @yourhandle
```

### WhatsApp Number
Use country code + number format:
```
✅ Correct: 15551234567
❌ Wrong: +1 (555) 123-4567
❌ Wrong: (555) 123-4567
```

## 🔍 Field Reference

### Company Info Tab

| Field | Type | Example |
|-------|------|---------|
| Company Name | Text | SOF for Software |
| Short Name | Text | SOF |
| Full Name | Text | SOF for Software - Global Tech |
| Tagline | Text | Transforming Ideas |
| Description | Long Text | We are a leading... |
| Founded Year | Number | 2020 |
| Employee Count | Text | 50+ |
| Client Count | Text | 500+ |
| Project Count | Text | 500+ |

### Contact Details Tab

| Field | Type | Example |
|-------|------|---------|
| Primary Email | Email | info@company.com |
| Support Email | Email | support@company.com |
| Phone Number | Phone | +1 (555) 123-4567 |
| WhatsApp Number | Text | 15551234567 |
| Office Address | Long Text | 123 Main St, Suite 100 |
| City | Text | New York |
| Country | Text | United States |

### Social Media Tab

| Field | Type | Example |
|-------|------|---------|
| Facebook | URL | https://facebook.com/page |
| Twitter | URL | https://twitter.com/handle |
| LinkedIn | URL | https://linkedin.com/company/name |
| GitHub | URL | https://github.com/username |
| Instagram | URL | https://instagram.com/profile |
| YouTube | URL | https://youtube.com/@channel |

### Home Page Tab

| Field | Type | Example |
|-------|------|---------|
| Hero Badge | Text | Welcome to SOF |
| Hero Title | Text | Transforming Ideas into |
| Hero Title Highlight | Text | Digital Reality |
| Hero Description | Long Text | We create amazing... |
| Primary CTA Button | Text | Get Started |
| Secondary CTA Button | Text | View Projects |

## ⚡ Quick Examples

### Example 1: Rebrand Company
```
1. Company Info → Company Name: "New Brand Name"
2. Company Info → Tagline: "New Tagline"
3. Contact Details → Primary Email: "hello@newbrand.com"
4. Home Page → Hero Title: "Welcome to New Brand"
5. Save All Changes
```

### Example 2: Update Contact Information
```
1. Contact Details → Phone Number: "+1 (555) 999-8888"
2. Contact Details → WhatsApp Number: "15559998888"
3. Contact Details → Office Address: "456 New Street"
4. Contact Details → City: "Los Angeles"
5. Save All Changes
```

### Example 3: Add Social Media
```
1. Social Media → Facebook: "https://facebook.com/newpage"
2. Social Media → Instagram: "https://instagram.com/newprofile"
3. Social Media → Twitter: "https://twitter.com/newhandle"
4. Save All Changes
```

### Example 4: Update Home Page
```
1. Home Page → Hero Badge: "🚀 New Launch"
2. Home Page → Hero Title: "Building the Future of"
3. Home Page → Hero Title Highlight: "Technology"
4. Home Page → Primary CTA Button: "Start Free Trial"
5. Save All Changes
```

## 🔄 After Saving

Once you click "Save All Changes":

1. ✅ **Validation runs** - Checks for errors
2. ✅ **Data saves** - Sent to database
3. ✅ **Success message** - Confirmation toast appears
4. ✅ **Page reloads** - Automatically refreshes (1.5s delay)
5. ✅ **Changes live** - Visit public site to see updates

## ⚠️ Important Warnings

### Don't Close the Page
- Wait for the success message before closing
- Page will reload automatically
- Don't interrupt the save process

### Validation Errors
If you see an error:
- Read the error message carefully
- Fix the indicated field
- Try saving again

### Test After Saving
- Visit the public website
- Verify your changes appear correctly
- Check multiple pages if you edited multiple sections

## 🆘 Common Issues

### Save Button Disabled
**Reason:** No changes made yet  
**Solution:** Edit at least one field

### "Please log in to save settings"
**Reason:** Session expired  
**Solution:** Log in again at `/admin`

### "Validation failed"
**Reason:** Invalid data format  
**Solution:** Check email format, required fields, URL format

### Changes Don't Appear
**Reason:** Cache  
**Solution:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 📱 Mobile Editing

The settings page is responsive:
- Tabs scroll horizontally on mobile
- All fields are accessible
- Same functionality as desktop

## 🎓 Learning Path

**Beginner:** Start with Company Info and Contact Details  
**Intermediate:** Customize page content (Home, About, Services)  
**Advanced:** Fine-tune all settings for perfect branding

## 📞 Need Help?

If you're stuck:
1. Check the field hint text (below input)
2. Review examples in this guide
3. Check browser console for errors
4. Contact technical support

---

**Last Updated:** November 6, 2025  
**Difficulty:** ⭐ Easy (No coding required!)  
**Time Required:** 5-10 minutes for typical changes
