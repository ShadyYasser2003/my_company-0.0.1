# 🎛️ Complete Admin Dashboard Guide

## Overview

Your admin dashboard now has **complete control** over every aspect of your website, including a dedicated settings section for global configuration.

---

## 🚀 Admin Dashboard Features

### **1. Dashboard** (`/admin/dashboard`)
- **Overview statistics** - Projects, categories, services count
- **Recent projects** - Latest 5 projects with quick view
- **Quick actions** - Fast access to all sections
- **Initialize banner** - Shows when no projects exist

### **2. Categories** (`/admin/categories`)
✅ **Full CRUD Operations:**
- Create new categories
- Edit existing categories
- Delete categories
- Assign icons
- View project count per category

**Features:**
- Icon selection from lucide-react
- Description field
- Auto-generated IDs
- Project tracking

### **3. Projects** (`/admin/projects`)
✅ **Complete Project Management:**
- Create projects with auto-generated codes
- Edit all project details
- Delete projects
- Upload images (main + additional)
- Assign to categories
- Add tech stack
- Set demo links
- Search and filter

**Project Fields:**
- Project name
- Category assignment
- Description
- Tech stack (array)
- Main image
- Additional images
- Demo/live URL
- Auto-generated project code (PRJ-XXXXXXXX-XXXX)

### **4. Services** (`/admin/services`)
✅ **Service Management:**
- Create services
- Edit service details
- Delete services
- Assign icons and colors
- Add feature lists
- One-click initialize (6 default services)

**Service Fields:**
- Title
- Description
- Features (array)
- Icon selection
- Color gradient
- Created timestamp

### **5. Initialize Data** (`/admin/initialize-data`)
✅ **Quick Setup:**
- 6 categories
- 6 services
- 35+ portfolio projects
- Real-time progress logs
- Status indicators
- One-click initialization

### **6. Settings** (`/admin/settings`) ⭐ NEW!
✅ **Global Configuration:**

**Company Info Tab:**
- Company name
- Short name (for logo)
- Tagline
- Description

**Contact Details Tab:**
- Email address
- Phone number
- WhatsApp number
- Office address

**Social Media Tab:**
- Facebook URL
- Twitter URL
- LinkedIn URL
- GitHub URL

**Features:**
- Live preview
- Save/Reset buttons
- Success/error notifications
- Tabbed interface
- Form validation

---

## 📊 Admin Access Summary

### **What You Can Manage:**

| Section | What You Can Do | Database Stored |
|---------|----------------|-----------------|
| **Categories** | Create, Edit, Delete, Assign Icons | ✅ Yes |
| **Projects** | Full CRUD, Upload Images, Set Tech Stack | ✅ Yes |
| **Services** | Full CRUD, Icons, Colors, Features | ✅ Yes |
| **Settings** | Edit Company Info, Contact, Social Media | ⚠️ LocalStorage* |
| **Data Init** | Populate Sample Data (47 items) | ✅ Yes |

*Settings currently save to localStorage for demo. In production, implement database storage.

---

## 🎯 How to Access Everything

### **Login to Admin Panel:**
```
URL: /admin
Email: Your admin email
Password: Your password
```

### **Navigate to Sections:**
```
Dashboard:       /admin/dashboard
Categories:      /admin/categories
Projects:        /admin/projects
Services:        /admin/services
Initialize Data: /admin/initialize-data
Settings:        /admin/settings
```

---

## 💡 Common Admin Tasks

### **Task 1: Add a New Project**
1. Go to `/admin/projects`
2. Click "+ Add New Project"
3. Fill in:
   - Project name
   - Select category
   - Description
   - Tech stack (comma-separated)
   - Upload main image
   - (Optional) Upload additional images
   - (Optional) Add demo link
4. Click "Save Project"
5. Project code auto-generated!

**Result:** Project appears on `/portfolio` page

---

### **Task 2: Edit Company Information**
1. Go to `/admin/settings`
2. Click "Company Info" tab
3. Edit:
   - Company name → Updates logo & footer
   - Short name → Updates navigation logo
   - Tagline → Updates homepage
   - Description → Updates footer
4. Click "Save Changes"
5. Refresh public pages to see changes

**Result:** Updates across entire website

---

### **Task 3: Update Contact Details**
1. Go to `/admin/settings`
2. Click "Contact Details" tab
3. Edit:
   - Email → Contact page & footer
   - Phone → Contact page & footer
   - WhatsApp → WhatsApp button
   - Address → Contact page & footer & map
4. Click "Save Changes"

**⚠️ WhatsApp Format:** `201225119842` (no + or spaces!)

**Result:** All contact info updated

---

### **Task 4: Set Social Media Links**
1. Go to `/admin/settings`
2. Click "Social Media" tab
3. Enter full URLs:
   - `https://facebook.com/yourpage`
   - `https://twitter.com/yourhandle`
   - `https://linkedin.com/company/yourcompany`
   - `https://github.com/yourusername`
4. Click "Save Changes"

**Result:** Footer social icons link correctly

---

### **Task 5: Create a Service**
1. Go to `/admin/services`
2. Click "+ Add Service"
3. Fill in:
   - Title
   - Description
   - Features (one per line)
   - Select icon
   - Select color gradient
4. Click "Save Service"

**Result:** Service appears on `/services` page

---

### **Task 6: Initialize Sample Data**
1. Go to `/admin/initialize-data`
2. Review what will be created:
   - 6 categories
   - 6 services
   - 35 projects
3. Click "Initialize Database with Sample Data"
4. Wait 1-2 minutes
5. Check status: All should show "Success"

**Result:** Complete portfolio populated!

---

### **Task 7: Delete a Project**
1. Go to `/admin/projects`
2. Find the project
3. Click trash icon
4. Confirm deletion
5. Project removed

**Result:** Project no longer appears on website

---

### **Task 8: Edit a Category**
1. Go to `/admin/categories`
2. Click edit icon on category
3. Modify name, description, or icon
4. Click "Save Category"

**Result:** Updated across all projects in that category

---

## 🗺️ Interactive Map Feature

### **Map on Contact Page:**
The contact page now includes an **interactive Google Map** with your office location!

**Features:**
- Full Google Maps embed
- "Get Directions" button
- "Open Map" button
- Location card overlay
- Map features (parking, transport, etc.)

**Configured In:**
- Map link: `GLOBAL_CONFIG.contact.mapShareLink`
- Address: `GLOBAL_CONFIG.contact.address`

**Update Map Location:**
1. Get your Google Maps share link
2. Open `/config/global.tsx`
3. Update `contact.mapShareLink`
4. Update `contact.address`
5. Save file

**Example:**
```typescript
contact: {
  mapShareLink: 'https://share.google/YourLink',
  address: 'Your Real Address Here',
}
```

---

## 📁 All Admin Routes

```
Public Routes:
├── /               → Homepage
├── /about          → About page
├── /services       → Services page
├── /portfolio      → Portfolio grid
├── /portfolio/:id  → Project details
└── /contact        → Contact form + map

Admin Routes:
├── /admin                    → Login page
├── /admin/dashboard          → Overview
├── /admin/categories         → Categories management
├── /admin/projects           → Projects management
├── /admin/services           → Services management
├── /admin/initialize-data    → Data initialization
└── /admin/settings           → Global settings ⭐ NEW
```

---

## 🎨 Settings Configuration

### **What Settings Control:**

**Company Info:**
```
company.name         → Logo, Footer, About page
company.nameShort    → Navigation logo
company.tagline      → Homepage hero
company.description  → Footer, Meta tags
```

**Contact Details:**
```
contact.email       → Contact page, Footer
contact.phone       → Contact page, Footer
contact.whatsapp    → WhatsApp button
contact.address     → Contact page, Footer, Map
```

**Social Media:**
```
social.facebook     → Footer icon
social.twitter      → Footer icon
social.linkedin     → Footer icon
social.github       → Footer icon
```

---

## ✅ Complete Checklist

### **Initial Setup:**
- [ ] Login to admin panel
- [ ] Initialize sample data (or skip if adding manually)
- [ ] Update company information in settings
- [ ] Update contact details in settings
- [ ] Set social media links in settings
- [ ] Upload logo (if custom)

### **Content Management:**
- [ ] Create categories (or use initialized)
- [ ] Add/edit projects
- [ ] Add/edit services
- [ ] Upload project images
- [ ] Add tech stacks
- [ ] Set demo links

### **Verification:**
- [ ] Check homepage displays correctly
- [ ] Verify about page content
- [ ] Test services page
- [ ] Browse portfolio
- [ ] Test project detail pages
- [ ] Verify contact form works
- [ ] Check map displays correctly
- [ ] Test WhatsApp button
- [ ] Verify social media links
- [ ] Test mobile responsiveness

---

## 🔧 Advanced Configuration

### **For Permanent Changes:**
Instead of using the Settings page (localStorage), you can edit the configuration file directly:

**File:** `/config/global.tsx`

**Benefits:**
- Changes persist for all users
- No database needed
- Version controlled
- Type-safe

**Edit:**
```typescript
export const GLOBAL_CONFIG = {
  company: {
    name: 'Your Company Name',
    // ... more fields
  },
  contact: {
    email: 'your@email.com',
    // ... more fields
  },
  // ... more config
}
```

---

## 🎯 Quick Reference

### **Most Used Actions:**

**Add Project:**
```
/admin/projects → "+ Add New Project"
```

**Edit Settings:**
```
/admin/settings → Select Tab → Edit → Save
```

**View All Data:**
```
/admin/dashboard → See statistics
```

**Initialize Sample Data:**
```
/admin/initialize-data → Click button
```

**Manage Categories:**
```
/admin/categories → CRUD operations
```

---

## 📊 Database Structure

All data is stored in **Supabase KV Store**:

```
Keys:
├── category:{id}   → Category data
├── service:{id}    → Service data
└── project:{id}    → Project data

Settings (localStorage):
├── companySettings
├── contactSettings
└── socialSettings
```

---

## 🎓 Tips & Best Practices

### **Categories:**
- Create broad categories first
- Use descriptive names
- Choose appropriate icons
- Keep descriptions concise

### **Projects:**
- Use high-quality images
- Be specific in descriptions
- List actual technologies used
- Include live demo links when possible
- Keep tech stack relevant

### **Services:**
- Highlight key features
- Use action-oriented language
- Choose contrasting colors
- Keep feature lists to 5-7 items

### **Settings:**
- Test changes before saving
- Use consistent branding
- Verify contact info accuracy
- Check social links work

---

## 🐛 Troubleshooting

### **Settings not saving:**
- Check browser console for errors
- Ensure localStorage is enabled
- Try different browser
- Clear cache and retry

### **Map not displaying:**
- Verify share link format
- Check internet connection
- Try opening link directly
- Update embed URL if needed

### **Projects not showing:**
- Verify category exists
- Check project code generated
- Refresh browser
- Check database connection

### **Images not uploading:**
- Check file size (< 5MB)
- Verify file type (jpg, png, webp)
- Check internet connection
- Try different image

---

## 📚 Related Documentation

- **[Global Config Guide](config/GLOBAL_CONFIG_GUIDE.md)** - Configuration details
- **[Data Initialization](DATA_INITIALIZATION_GUIDE.md)** - Sample data guide
- **[Admin Access](ADMIN_ACCESS_GUIDE.md)** - Admin panel guide
- **[Quick Reference](QUICK_REFERENCE.md)** - Quick commands

---

## 🎉 Summary

Your admin dashboard provides:
- ✅ **Complete CRUD** for all content
- ✅ **Categories management** with icons
- ✅ **Projects management** with images
- ✅ **Services management** with features
- ✅ **Global settings** for company info
- ✅ **Data initialization** (47 items)
- ✅ **Interactive map** on contact page
- ✅ **Professional interface** with animations
- ✅ **Mobile responsive** admin panel

**Everything is accessible and manageable from the admin dashboard!**

---

**Status:** ✅ Complete
**Features:** All Working
**Access Level:** Full Control
**Last Updated:** November 3, 2025
