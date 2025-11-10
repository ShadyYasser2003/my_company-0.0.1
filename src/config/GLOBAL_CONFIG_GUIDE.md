# 🎨 Global Configuration Guide

## Overview

The `global.tsx` file is the **single source of truth** for all text content, labels, URLs, colors, and customizable values throughout your entire website. This guide explains how to use and customize it.

---

## 📋 Table of Contents

1. [What's Included](#whats-included)
2. [How to Edit](#how-to-edit)
3. [Configuration Sections](#configuration-sections)
4. [Helper Functions](#helper-functions)
5. [Best Practices](#best-practices)
6. [Testing Changes](#testing-changes)
7. [Troubleshooting](#troubleshooting)

---

## ✅ What's Included

### **Complete Configuration:**
- ✅ Company information
- ✅ Contact details (email, phone, WhatsApp)
- ✅ Social media links
- ✅ All page content (Home, About, Services, Portfolio, Contact)
- ✅ Admin panel text
- ✅ Navigation labels
- ✅ Footer content
- ✅ Color schemes
- ✅ Animation settings
- ✅ Helper functions

### **Total Variables:** 500+

---

## 🔧 How to Edit

### **Step 1: Open the File**
```
Location: /config/global.tsx
```

### **Step 2: Find What You Want to Change**

Use Ctrl+F (or Cmd+F) to search for the text you want to change.

**Example:** To change the company name:
1. Search for "SOF for Software"
2. Update the value in `company.name`

### **Step 3: Edit the Value**

```typescript
// ❌ WRONG - Don't change the property name
sofName: 'My Company',

// ✅ CORRECT - Only change the value
name: 'My Company',
```

### **Step 4: Save and Test**
- Save the file
- Refresh your browser
- Check if changes appear correctly

---

## 📚 Configuration Sections

### 1. **Company Information**

```typescript
company: {
  name: 'SOF for Software',           // Full company name
  nameShort: 'SOF',                    // Short name (used in logo)
  tagline: 'Transforming Ideas...',    // Main tagline
  description: 'We build cutting...',  // Short description
  foundedYear: 2020,                   // Year established
  clientCount: '500+',                 // Number of clients
}
```

**Where it's used:**
- Logo in navigation
- Footer
- About page
- Meta tags

---

### 2. **Contact Information**

```typescript
contact: {
  email: 'shadyyasser665@gmail.com',   // Main email
  phone: '+20 122-511-9842',            // Phone number
  whatsapp: '201225119842',             // WhatsApp (no + or spaces!)
  address: '123 Tech Street...',        // Physical address
}
```

**⚠️ WhatsApp Format:**
- Remove the `+` sign
- Remove all spaces and dashes
- Format: `[country code][number]`
- Example: `201225119842` for +20 122-511-9842

**Where it's used:**
- Contact page
- Footer
- WhatsApp button

---

### 3. **Social Media Links**

```typescript
social: {
  facebook: 'https://facebook.com/yourpage',
  twitter: 'https://twitter.com/yourhandle',
  linkedin: 'https://linkedin.com/company/yourcompany',
  github: 'https://github.com/yourusername',
}
```

**Where it's used:**
- Footer social icons
- Contact page
- All pages (via footer)

---

### 4. **Navigation**

```typescript
navigation: {
  links: [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
  ],
}
```

**Where it's used:**
- Main navigation bar
- Mobile menu
- Footer links

---

### 5. **Home Page**

```typescript
home: {
  hero: {
    title: 'Transforming Ideas Into',
    titleHighlight: 'Intelligent Software',
    description: 'We build cutting-edge...',
    ctaPrimary: 'Start Your Project',
    ctaSecondary: 'View Portfolio',
  },
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '50+', label: 'Global Clients' },
    { value: '99%', label: 'Client Satisfaction' },
  ],
  // ... more sections
}
```

**Sections included:**
- Hero section
- Statistics
- Global presence
- DevOps capabilities
- CI/CD pipeline
- Technologies
- Why choose us
- Performance metrics
- Call to action

---

### 6. **About Page**

```typescript
about: {
  hero: {
    title: 'About SOF for Software',
    description: 'A global technology company...',
  },
  mission: {
    title: 'Our Mission',
    description: 'To empower businesses...',
  },
  vision: {
    title: 'Our Vision',
    description: 'To be the global leader...',
  },
  values: [
    { title: 'Innovation First', description: '...' },
    { title: 'Client Success', description: '...' },
    // ...
  ],
}
```

---

### 7. **Services Page**

```typescript
services: {
  hero: {
    title: 'Our Services',
    description: 'Comprehensive technology solutions...',
  },
  fallbackServices: [
    {
      title: 'Web Development',
      description: 'Custom web applications...',
      features: ['Responsive Design', 'PWA', ...],
      icon: 'Globe',
      color: 'from-cyan-500 to-blue-600',
    },
    // ... more services
  ],
}
```

**Note:** Services are primarily loaded from the database. Fallback services are only shown if the database is empty.

---

### 8. **Portfolio Page**

```typescript
portfolio: {
  hero: {
    title: 'Our Portfolio',
    description: 'Explore our latest projects...',
  },
  filters: {
    all: 'All Projects',
    searchPlaceholder: 'Search projects...',
  },
  projectDetail: {
    backButton: 'Back to Portfolio',
    technologiesTitle: 'Technologies Used',
    // ...
  },
}
```

---

### 9. **Contact Page**

```typescript
contact: {
  hero: {
    title: 'Get In Touch',
    description: "Have a project in mind?...",
  },
  form: {
    nameLabel: 'Your Name',
    emailLabel: 'Email Address',
    messageLabel: 'Project Details',
    submitButton: 'Send Message',
    successMessage: 'Message sent successfully!',
    // ... all form fields
  },
  whatsapp: {
    buttonText: 'Chat on WhatsApp',
    defaultMessage: 'Hello! I would like to discuss...',
  },
}
```

---

### 10. **Admin Panel**

```typescript
admin: {
  login: {
    title: 'Admin Portal',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    loginButton: 'Sign In',
    // ...
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back',
    // ...
  },
  // ... categories, projects, services, dataInitializer
}
```

---

### 11. **Footer**

```typescript
footer: {
  description: 'Transforming ideas into...',
  quickLinksTitle: 'Quick Links',
  servicesTitle: 'Services',
  contactTitle: 'Contact Us',
  legal: {
    copyright: 'SOF for Software. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
}
```

---

### 12. **Colors & Theme**

```typescript
colors: {
  primary: 'cyan-500',
  secondary: 'blue-600',
  accent: 'purple-500',
  success: 'green-500',
  danger: 'red-500',
  warning: 'yellow-500',
  gradientPrimary: 'from-cyan-500 to-blue-600',
  // ... more colors
}
```

**Color Format:** Use Tailwind CSS color names without the dash
- ✅ `'cyan-500'`
- ❌ `'bg-cyan-500'`

---

### 13. **Animation Settings**

```typescript
animations: {
  enabled: true,  // Set to false to disable all animations
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
  },
  delay: {
    short: 0.1,
    medium: 0.2,
    long: 0.3,
  },
}
```

---

### 14. **General Settings**

```typescript
settings: {
  siteName: 'SOF for Software',
  siteUrl: 'https://sofforsoftware.com',
  defaultMetaImage: '/og-image.jpg',
  googleAnalyticsId: '',  // Add your GA ID
  maintenanceMode: false,
  itemsPerPage: 12,
  maxUploadSize: 5242880,  // 5MB
}
```

---

## 🔧 Helper Functions

### **1. getWhatsAppUrl()**

Generates WhatsApp URL with optional custom message.

```typescript
import { getWhatsAppUrl } from '../config/global';

// Use default message
const url1 = getWhatsAppUrl();

// Use custom message
const url2 = getWhatsAppUrl('Hi! I want to discuss a project');

// Open in new tab
window.open(getWhatsAppUrl(), '_blank');
```

---

### **2. getGradient()**

Get gradient class from color name.

```typescript
import { getGradient } from '../config/global';

const gradient = getGradient('cyan');  // Returns: 'from-cyan-500 to-blue-600'
const gradient = getGradient('purple'); // Returns: 'from-purple-500 to-pink-600'
```

---

### **3. getAnimationPreset()**

Get pre-configured animation settings.

```typescript
import { getAnimationPreset } from '../config/global';

const fadeIn = getAnimationPreset('fadeIn');
const fadeInUp = getAnimationPreset('fadeInUp');
const scaleIn = getAnimationPreset('scaleIn');

// Use with Framer Motion
<motion.div {...fadeInUp}>
  Content
</motion.div>
```

---

## ✅ Best Practices

### **1. Always Use Global Config**

❌ **Bad:**
```typescript
<h1>Welcome to SOF for Software</h1>
```

✅ **Good:**
```typescript
import { GLOBAL_CONFIG } from '../config/global';

<h1>Welcome to {GLOBAL_CONFIG.company.name}</h1>
```

---

### **2. Keep Consistent Formatting**

```typescript
// ✅ Good - Consistent quotes and spacing
email: 'info@company.com',
phone: '+1 234-567-8900',

// ❌ Bad - Inconsistent
email:"info@company.com",
phone:'+1 234-567-8900'   ,
```

---

### **3. Don't Change Property Names**

```typescript
// ❌ WRONG - Changes structure
company: {
  companyName: 'My Company',  // Changed from 'name'
}

// ✅ CORRECT - Only changes value
company: {
  name: 'My Company',
}
```

---

### **4. Use Descriptive Values**

```typescript
// ❌ Bad - Too vague
description: 'We do stuff',

// ✅ Good - Clear and professional
description: 'We build cutting-edge web, mobile, and AI solutions',
```

---

### **5. Test After Changes**

After editing:
1. Save the file
2. Refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
3. Check all affected pages
4. Verify mobile responsiveness
5. Test in dark mode

---

## 🧪 Testing Changes

### **Quick Test Checklist:**

```
Navigation & Footer:
□ Company name appears in logo
□ Navigation links work
□ Footer shows correct contact info
□ Social media links work

Home Page:
□ Hero title and description updated
□ Stats show correct numbers
□ CTA buttons have right text
□ All sections display properly

About Page:
□ Mission and vision updated
□ Values show correctly
□ Company info accurate

Services Page:
□ Service descriptions correct
□ Features list accurate

Portfolio Page:
□ Portfolio title updated
□ Filters work correctly
□ Project details show

Contact Page:
□ Form labels correct
□ WhatsApp button works
□ Contact info displays
□ Form validation messages

Admin Panel:
□ Login page labels
□ Dashboard titles
□ Form labels correct
```

---

## 🐛 Troubleshooting

### **Problem: Changes don't appear**

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check for syntax errors in file
4. Restart development server

---

### **Problem: WhatsApp button doesn't work**

**Solution:**
1. Check `contact.whatsapp` format (no + or spaces)
2. Verify helper function is imported
3. Test URL in browser directly

**Example:**
```typescript
// ❌ Wrong format
whatsapp: '+20 122-511-9842',

// ✅ Correct format
whatsapp: '201225119842',
```

---

### **Problem: Syntax error after editing**

**Common causes:**
- Missing comma
- Unmatched quotes
- Missing bracket

**Solution:**
1. Check file for red underlines in editor
2. Ensure all quotes match (' or ")
3. Verify all brackets are closed
4. Check console for error messages

---

### **Problem: Text not changing on specific page**

**Solution:**
1. Check if page uses global config
2. Look for hardcoded text in page file
3. Search for the text across all files
4. Add import if missing:
```typescript
import { GLOBAL_CONFIG } from '../config/global';
```

---

## 📝 Editing Examples

### **Example 1: Change Company Name**

```typescript
company: {
  name: 'Your Company Name',  // Change this
  nameShort: 'YCN',            // Change this too
}
```

**Affects:**
- Logo in navigation
- Footer
- About page
- Meta tags

---

### **Example 2: Update Contact Info**

```typescript
contact: {
  email: 'info@yourcompany.com',
  phone: '+1 555-123-4567',
  whatsapp: '15551234567',  // Format: country code + number
  address: 'Your Address Here',
}
```

**Affects:**
- Contact page
- Footer
- WhatsApp button

---

### **Example 3: Customize Hero Section**

```typescript
home: {
  hero: {
    title: 'Your Custom',
    titleHighlight: 'Headline Here',
    description: 'Your description goes here...',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Learn More',
  },
}
```

**Affects:**
- Homepage hero section only

---

### **Example 4: Update Social Links**

```typescript
social: {
  facebook: 'https://facebook.com/yourpage',
  twitter: 'https://twitter.com/yourhandle',
  linkedin: 'https://linkedin.com/company/yourcompany',
  github: 'https://github.com/yourusername',
}
```

**Affects:**
- Footer social icons
- All pages (via footer)

---

### **Example 5: Customize Form Labels**

```typescript
contact: {
  form: {
    nameLabel: 'Full Name',
    emailLabel: 'Email',
    messageLabel: 'Your Message',
    submitButton: 'Submit',
  },
}
```

**Affects:**
- Contact form only

---

## 🎨 Color Customization

### **Available Color Variables:**

```typescript
colors: {
  primary: 'cyan-500',      // Main brand color
  secondary: 'blue-600',    // Secondary color
  accent: 'purple-500',     // Accent highlights
  success: 'green-500',     // Success states
  danger: 'red-500',        // Errors/warnings
  warning: 'yellow-500',    // Warnings
}
```

### **Gradient Options:**

```typescript
// Pre-defined gradients
gradientPrimary: 'from-cyan-500 to-blue-600',
gradientSecondary: 'from-purple-500 to-pink-600',
gradientSuccess: 'from-green-500 to-teal-600',
```

### **Using GRADIENTS Helper:**

```typescript
import { GRADIENTS } from '../config/global';

// Available gradients:
GRADIENTS.cyan    // Cyan to Blue
GRADIENTS.blue    // Blue to Purple
GRADIENTS.purple  // Purple to Pink
GRADIENTS.pink    // Pink to Rose
GRADIENTS.green   // Green to Teal
GRADIENTS.orange  // Orange to Red
```

---

## 📊 Configuration Statistics

```
Total Configuration Items:
├── Company Info:         12 variables
├── Contact Info:         12 variables
├── Social Links:          8 variables
├── Navigation:            5 variables
├── Home Page:          100+ variables
├── About Page:          30+ variables
├── Services Page:       40+ variables
├── Portfolio Page:      50+ variables
├── Contact Page:        80+ variables
├── Admin Panel:        150+ variables
├── Footer:              20+ variables
├── Colors:              30+ variables
├── Animations:          15+ variables
└── Settings:            15+ variables

Total: 500+ configurable values
```

---

## ✅ Validation Checklist

Before deploying changes:

```
□ All company info updated
□ Contact details accurate
□ Social media links work
□ Email addresses valid
□ Phone numbers formatted correctly
□ WhatsApp number correct (no + or spaces)
□ All URLs start with https://
□ No syntax errors
□ Tested on desktop
□ Tested on mobile
□ Tested in light mode
□ Tested in dark mode
□ All pages checked
□ Forms work correctly
□ Admin panel accessible
```

---

## 📚 Quick Reference

### **Most Commonly Edited:**

1. `company.name` - Company name
2. `company.nameShort` - Short name for logo
3. `contact.email` - Email address
4. `contact.phone` - Phone number
5. `contact.whatsapp` - WhatsApp number
6. `social.*` - Social media links
7. `home.hero.*` - Homepage content
8. `footer.description` - Footer text

### **Import Statement:**

```typescript
import { GLOBAL_CONFIG } from '../config/global';
```

### **Using Values:**

```typescript
{GLOBAL_CONFIG.company.name}
{GLOBAL_CONFIG.contact.email}
{GLOBAL_CONFIG.home.hero.title}
```

---

## 🎓 Learning Resources

### **File Location:**
```
/config/global.tsx
```

### **Related Documentation:**
- `/config/README.md` - Configuration overview
- `/QUICK_REFERENCE.md` - Quick access guide
- `/README_UPDATED.md` - Complete system documentation

### **Support:**
- Check console for errors
- Use browser DevTools
- Search file for text you want to change
- Test changes incrementally

---

**Last Updated:** November 3, 2025
**Version:** 2.0 - Complete Upgrade
**Status:** ✅ Production Ready
