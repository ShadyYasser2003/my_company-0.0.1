# Services Setup Guide

## Quick Start: Initialize Default Services

The easiest way to populate your services is to use the **Quick Setup** feature.

### Option 1: One-Click Quick Setup (Recommended)

1. **Login to Admin Panel**
   - Go to `/admin`
   - Login with your admin credentials

2. **Navigate to Services**
   - Click "Services" in the admin navigation

3. **Click "Quick Setup" or "Add Default Services (6)"**
   - If no services exist, you'll see a green button
   - Click it to automatically add all 6 default services
   - Confirm the action

4. **Done!** 
   - All services are now live on your public website
   - Visit `/services` to see them

### Default Services Included

The Quick Setup adds these 6 professional services:

1. **Web Development** 🌐
   - Icon: Globe
   - Color: Cyan to Blue
   - Features:
     - React & Angular
     - ASP.NET Core
     - Progressive Web Apps
     - E-commerce Solutions

2. **Mobile Applications** 📱
   - Icon: Smartphone
   - Color: Blue to Purple
   - Features:
     - React Native
     - Flutter
     - Native iOS/Android
     - App Store Deployment

3. **AI & Machine Learning** 🧠
   - Icon: Brain
   - Color: Purple to Pink
   - Features:
     - Predictive Analytics
     - Natural Language Processing
     - Computer Vision
     - ChatBots

4. **Cloud Integration** ☁️
   - Icon: Cloud
   - Color: Green to Teal
   - Features:
     - AWS & Azure
     - Cloud Migration
     - Microservices
     - DevOps & CI/CD

5. **UI/UX Design** 🎨
   - Icon: Palette
   - Color: Pink to Rose
   - Features:
     - User Research
     - Wireframing
     - Prototyping
     - Design Systems

6. **Maintenance & Support** ⚙️
   - Icon: Settings
   - Color: Orange to Red
   - Features:
     - 24/7 Monitoring
     - Bug Fixes
     - Performance Optimization
     - Security Updates

---

## Option 2: Add Custom Services Manually

If you prefer to customize your services:

1. **Go to Admin → Services**
2. **Click "Add Service"**
3. **Fill in the form:**
   - **Title**: Your service name
   - **Description**: Brief overview
   - **Features**: One feature per line
   - **Icon**: Choose from 10 available icons
   - **Color**: Pick a gradient color scheme
4. **Preview** the service in real-time
5. **Click "Create"**

### Available Icons

- Globe (Web)
- Smartphone (Mobile)
- Brain (AI)
- Cloud (Cloud Services)
- Palette (Design)
- Settings (Support/Config)
- Zap (Performance)
- Database (Data)
- Code (Development)
- Shield (Security)

### Available Colors

- Cyan to Blue
- Blue to Purple
- Purple to Pink
- Green to Teal
- Pink to Rose
- Orange to Red
- Indigo to Purple
- Yellow to Orange

---

## Managing Services

### Edit a Service
1. Go to Admin → Services
2. Click the **Edit** button (pencil icon) on any service card
3. Make your changes
4. Click "Update"

### Delete a Service
1. Go to Admin → Services
2. Click the **Delete** button (trash icon) on any service card
3. Confirm deletion

### Reorder Services
Services are displayed in the order they were created. To reorder:
1. Delete services you want to move
2. Re-create them in your desired order

---

## Technical Details

### Backend API

Services are stored in the KV database with the prefix `service:`.

**Initialize Endpoint:**
```
POST /make-server-ea0e3e7d/services/initialize
Authorization: Bearer {accessToken}
```

**Get Services:**
```
GET /make-server-ea0e3e7d/services
```

**Create Service:**
```
POST /make-server-ea0e3e7d/services
Authorization: Bearer {accessToken}
Body: { title, description, features[], icon, color }
```

**Update Service:**
```
PUT /make-server-ea0e3e7d/services/:id
Authorization: Bearer {accessToken}
Body: { title, description, features[], icon, color }
```

**Delete Service:**
```
DELETE /make-server-ea0e3e7d/services/:id
Authorization: Bearer {accessToken}
```

### Data Structure

```typescript
{
  id: string,              // Auto-generated
  title: string,           // Service name
  description: string,     // Brief description
  features: string[],      // Array of features
  icon: string,           // Icon name (e.g., 'Globe')
  color: string,          // Tailwind gradient (e.g., 'from-cyan-500 to-blue-600')
  createdAt: string,      // ISO timestamp
  createdBy: string       // User ID
}
```

---

## Troubleshooting

### "Services already initialized" Message
- This means services already exist in your database
- You can still add more services manually
- Or delete existing services and re-initialize

### Services Not Showing on Public Site
1. Check that services exist in Admin → Services
2. Verify you're logged in as admin when adding services
3. Refresh the public `/services` page
4. Check browser console for errors

### Quick Setup Button Not Working
1. Make sure you're logged in as admin
2. Check your internet connection
3. Look for error messages in the browser console
4. Try refreshing the page and clicking again

---

## Best Practices

1. **Use Quick Setup First**: Start with default services and customize as needed
2. **Keep Descriptions Concise**: 1-2 sentences work best
3. **Limit Features**: 3-5 features per service for best display
4. **Match Icons to Services**: Choose icons that visually represent the service
5. **Use Varied Colors**: Different colors help distinguish services
6. **Update Regularly**: Keep service offerings current with your business

---

## Next Steps

After setting up services:

1. ✅ **Add Categories** (Admin → Categories)
2. ✅ **Create Projects** (Admin → Projects)
3. ✅ **Test Public Pages** (Visit /services, /portfolio)
4. ✅ **Customize Content** (Edit services as needed)

Need help? Check the other documentation files in the project root.
