# 🎨 Global Configuration Guide

## ⭐ COMPLETE UPGRADE - Version 2.0!

The global configuration has been **completely overhauled** with **500+ configurable variables** covering every aspect of your website!

---

## 📋 Quick Links

- **[Complete Guide](GLOBAL_CONFIG_GUIDE.md)** - Full documentation with examples
- **[Upgrade Summary](../GLOBAL_CONFIG_UPGRADE_SUMMARY.md)** - What's new
- **[Configuration File](global.tsx)** - The actual config

---

## 🚀 Overview

All text content, labels, colors, links, and customizable values for the SOF for Software website are centralized in `/config/global.tsx`. This makes it easy for developers and designers to update the website content without modifying component files.

### **What's Included:**
- ✅ **Company Information** - Name, tagline, descriptions, statistics
- ✅ **Contact Details** - Email, phone, WhatsApp, address
- ✅ **Social Media** - All social platform links
- ✅ **Navigation** - Menu items and labels
- ✅ **Home Page** - All sections (Hero, Stats, DevOps, CI/CD, Technologies, etc.)
- ✅ **About Page** - Mission, vision, values, team
- ✅ **Services Page** - Hero, fallback services
- ✅ **Portfolio Page** - Filters, labels, project details
- ✅ **Contact Page** - Form fields, validation messages, WhatsApp
- ✅ **Admin Panel** - All admin interface text
- ✅ **Footer** - Links, content, legal
- ✅ **Colors & Theme** - Color schemes and gradients
- ✅ **Animations** - Duration and delay settings
- ✅ **Settings** - Site metadata, upload limits, etc.

---

## 🔧 How to Use

### **Step 1: Open the Configuration File**
```
Location: /config/global.tsx
```

### **Step 2: Find What You Want to Change**
Use Ctrl+F (Cmd+F on Mac) to search for the text you want to modify.

### **Step 3: Edit the Value**
```typescript
// ✅ CORRECT - Only change the value
name: 'Your Company Name',

// ❌ WRONG - Don't change the property name
yourCompanyName: 'Your Company Name',
```

### **Step 4: Save and Test**
- Save the file
- Refresh browser (Ctrl+Shift+R)
- Verify changes appear correctly

---

## 📚 Common Edits

### **1. Change Company Name**
```typescript
company: {
  name: 'Your Company Name',     // Full name
  nameShort: 'YCN',               // Short name (logo)
  tagline: 'Your tagline here',   // Main tagline
}
```

**Affects:** Logo, footer, about page, meta tags

---

### **2. Update Contact Information**
```typescript
contact: {
  email: 'info@yourcompany.com',
  phone: '+1 555-123-4567',
  whatsapp: '15551234567',        // ⚠️ No + or spaces!
  address: 'Your Address Here',
}
```

**⚠️ WhatsApp Format:**
- Remove `+` sign
- Remove spaces and dashes
- Format: `[country code][number]`
- Example: `15551234567` for +1 555-123-4567

**Affects:** Contact page, footer, WhatsApp button

---

### **3. Set Social Media Links**
```typescript
social: {
  facebook: 'https://facebook.com/yourpage',
  twitter: 'https://twitter.com/yourhandle',
  linkedin: 'https://linkedin.com/company/yourcompany',
  github: 'https://github.com/yourusername',
  instagram: 'https://instagram.com/yourhandle',
  youtube: 'https://youtube.com/@yourchannel',
}
```

**Affects:** Footer social icons, all pages

---

### **4. Customize Home Page Hero**
```typescript
home: {
  hero: {
    title: 'Your Custom',
    titleHighlight: 'Headline',
    description: 'Your description goes here...',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Learn More',
  },
}
```

**Affects:** Homepage hero section only

---

### **5. Update Statistics**
```typescript
home: {
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '50+', label: 'Global Clients' },
    { value: '99%', label: 'Client Satisfaction' },
  ],
}
```

**Affects:** Homepage statistics section

---

### **6. Modify Form Labels**
```typescript
contact: {
  form: {
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    messageLabel: 'Your Message',
    submitButton: 'Send Message',
    successMessage: 'Message sent successfully!',
  },
}
```

**Affects:** Contact form only

---

## 🎨 Color Customization

### **Basic Colors:**
```typescript
colors: {
  primary: 'cyan-500',       // Main brand color
  secondary: 'blue-600',     // Secondary color
  accent: 'purple-500',      // Accent highlights
  success: 'green-500',      // Success states
  danger: 'red-500',         // Errors
  warning: 'yellow-500',     // Warnings
}
```

### **Gradients:**
```typescript
colors: {
  gradientPrimary: 'from-cyan-500 to-blue-600',
  gradientSecondary: 'from-purple-500 to-pink-600',
  gradientSuccess: 'from-green-500 to-teal-600',
}
```

**Format:** Use Tailwind color names without `bg-` prefix

---

## 🔧 Helper Functions

### **1. getWhatsAppUrl()**
Generate WhatsApp URLs easily:

```typescript
import { getWhatsAppUrl } from '../config/global';

// Use default message
const url = getWhatsAppUrl();

// Use custom message
const url = getWhatsAppUrl('Hi! I want to discuss a project');

// Open WhatsApp
window.open(getWhatsAppUrl(), '_blank');
```

---

### **2. getGradient()**
Get gradient classes:

```typescript
import { getGradient } from '../config/global';

const gradient = getGradient('cyan');  // Returns: 'from-cyan-500 to-blue-600'

// Use in component
<div className={`bg-gradient-to-r ${getGradient('purple')}`}>
  Content
</div>
```

---

### **3. getAnimationPreset()**
Pre-configured animations:

```typescript
import { getAnimationPreset } from '../config/global';

// Use with Framer Motion
<motion.div {...getAnimationPreset('fadeInUp')}>
  Content
</motion.div>
```

Available presets: `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `scaleIn`

---

## 📊 Configuration Structure

```
GLOBAL_CONFIG (500+ variables)
├── company (12 variables)
├── contact (12 variables)
├── social (8 variables)
├── navigation (5 variables)
├── home (100+ variables)
│   ├── hero
│   ├── stats
│   ├── globalPresence
│   ├── devops
│   ├── cicdPipeline
│   ├── technologies
│   ├── whyChoose
│   ├── performance
│   └── cta
├── about (30+ variables)
├── services (40+ variables)
├── portfolio (50+ variables)
├── contact (80+ variables)
├── admin (150+ variables)
│   ├── login
│   ├── navigation
│   ├── dashboard
│   ├── categories
│   ├── projects
│   ├── services
│   └── dataInitializer
├── footer (20+ variables)
├── colors (30+ variables)
├── animations (15+ variables)
├── localization (10+ variables)
├── settings (15+ variables)
└── externalLinks (6 variables)
```

---

## 💡 Best Practices

### **1. Always Use Global Config**
```typescript
// ❌ Bad - Hardcoded
<h1>SOF for Software</h1>

// ✅ Good - From config
import { GLOBAL_CONFIG } from '../config/global';
<h1>{GLOBAL_CONFIG.company.name}</h1>
```

---

### **2. Keep Consistent Formatting**
```typescript
// ✅ Good
email: 'info@company.com',
phone: '+1 234-567-8900',

// ❌ Bad
email:"info@company.com",
phone:'+1 234-567-8900'   ,
```

---

### **3. Don't Change Property Names**
```typescript
// ❌ WRONG
company: {
  companyName: 'My Company',  // Changed property name
}

// ✅ CORRECT
company: {
  name: 'My Company',  // Only changed value
}
```

---

### **4. Test After Changes**
1. Save the file
2. Hard refresh (Ctrl+Shift+R)
3. Check all affected pages
4. Test mobile view
5. Verify dark mode

---

## 🐛 Troubleshooting

### **Issue: Changes don't appear**
**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check for syntax errors
4. Restart dev server

---

### **Issue: WhatsApp button doesn't work**
**Solution:**
1. Check number format (no + or spaces)
2. Format: `201225119842` not `+20 122-511-9842`
3. Verify helper function imported

---

### **Issue: Syntax error**
**Common causes:**
- Missing comma
- Unmatched quotes
- Missing bracket

**Solution:**
1. Check for red underlines in editor
2. Verify all quotes match
3. Check brackets are closed
4. Look at console errors

---

## 📝 Quick Reference

### **Import Configuration:**
```typescript
import { GLOBAL_CONFIG } from '../config/global';
```

### **Import Helpers:**
```typescript
import { getWhatsAppUrl, getGradient, getAnimationPreset } from '../config/global';
```

### **Most Used Values:**
```typescript
{GLOBAL_CONFIG.company.name}
{GLOBAL_CONFIG.company.nameShort}
{GLOBAL_CONFIG.contact.email}
{GLOBAL_CONFIG.contact.phone}
{GLOBAL_CONFIG.home.hero.title}
{GLOBAL_CONFIG.footer.copyright}
```

---

## 📚 Full Documentation

For complete documentation with detailed examples:

### **📖 [GLOBAL_CONFIG_GUIDE.md](GLOBAL_CONFIG_GUIDE.md)**
Complete guide including:
- All configuration sections
- Helper function details
- Testing checklist
- Troubleshooting guide
- Color customization
- Animation presets
- Best practices

### **📊 [Upgrade Summary](../GLOBAL_CONFIG_UPGRADE_SUMMARY.md)**
What's new in Version 2.0:
- New features added
- Files modified
- Verification checklist
- Usage examples
- Migration guide

---

## ✅ Testing Checklist

After making changes:

```
Basic:
□ Company name appears in logo
□ Navigation links work
□ Footer shows correct info
□ Contact details accurate

Pages:
□ Home page displays correctly
□ About page content updated
□ Services page works
□ Portfolio page functional
□ Contact form labels correct

Features:
□ WhatsApp button works
□ Social media links work
□ Admin panel accessible
□ Forms validate correctly

Responsive:
□ Desktop view
□ Tablet view
□ Mobile view
□ Dark mode
```

---

## 🎓 Next Steps

1. ✅ Review this guide
2. ✅ Read the complete guide ([GLOBAL_CONFIG_GUIDE.md](GLOBAL_CONFIG_GUIDE.md))
3. ✅ Customize your company information
4. ✅ Update contact details
5. ✅ Set social media links
6. ✅ Test all pages
7. ✅ Deploy changes

---

## 📊 Statistics

```
Total Variables:       500+
Configuration Sections: 14
Helper Functions:        3
Gradient Presets:        9
Animation Presets:       6
Documentation Pages:     2
Lines of Code:        1200+
```

---

## 🆘 Need Help?

1. **Check the complete guide:** [GLOBAL_CONFIG_GUIDE.md](GLOBAL_CONFIG_GUIDE.md)
2. **Review examples:** See usage examples above
3. **Search the file:** Use Ctrl+F to find text
4. **Check console:** Look for error messages
5. **Test incrementally:** Make small changes and test

---

## 🎉 Summary

Your website now has:
- ✅ **500+ configurable variables**
- ✅ **Single source of truth**
- ✅ **Complete page coverage**
- ✅ **Helper functions**
- ✅ **Full documentation**
- ✅ **Type-safe configuration**
- ✅ **Production ready**

**Everything can be customized from one file!**

---

**Status:** ✅ Production Ready
**Version:** 2.0 - Complete Upgrade
**Last Updated:** November 3, 2025
