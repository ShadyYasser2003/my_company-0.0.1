# SOF for Software - Complete Portfolio & Admin Dashboard

> **✅ 403 Edge Function Error FIXED** - This project uses direct database access. No edge function deployment required. [See fix details](/403_ERROR_SOLUTION_COMPLETE.md)

A modern, animated, full-stack web application for a technology company, built with React, Tailwind CSS, and Supabase.

## 🚀 Features

### Public Website
- **Animated Hero Section** - Eye-catching landing page with gradient animations and motion effects
- **About Page** - Company story, mission, vision, and core values
- **Services** - Interactive service cards showcasing web, mobile, AI, cloud, UI/UX, and maintenance services
- **Portfolio** - Dynamic project showcase with category filtering
- **Project Details** - Full project pages with WhatsApp integration for inquiries
- **Contact Page** - Form with WhatsApp quick contact button
- **Dark/Light Theme** - Smooth animated theme switching
- **Responsive Design** - Works perfectly on all devices

### Admin Dashboard
- **Secure Authentication** - Sign up and login system using Supabase Auth
- **Dashboard Overview** - Stats, recent projects, and quick actions
- **Category Management** - Full CRUD operations for project categories
- **Project Management** - Create, edit, and delete portfolio projects
- **Auto-generated Project Codes** - Unique codes like `P2025-EDU-01` for each project
- **WhatsApp Link Generator** - Easy copy of WhatsApp inquiry links with project codes
- **Theme Sync** - Dark/Light mode works across admin and public pages

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Architecture**: Direct Database Access (No Edge Functions)
- **Routing**: React Router
- **State**: React Context API

## 📁 Project Structure

```
/
├── App.tsx                      # Main app with routing
├── contexts/
│   ├── ThemeContext.tsx         # Dark/Light theme provider
│   └── AuthContext.tsx          # Authentication provider
├── components/
│   ├── Navigation.tsx           # Main navigation bar
│   ├── Footer.tsx               # Site footer
│   └── admin/
│       └── AdminLayout.tsx      # Admin dashboard layout
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── About.tsx                # About page
│   ├── Services.tsx             # Services page
│   ├── Portfolio.tsx            # Portfolio listing
│   ├── ProjectDetail.tsx        # Project detail page
│   ├── Contact.tsx              # Contact page
│   └── admin/
│       ├── AdminLogin.tsx       # Admin authentication
│       ├── AdminDashboard.tsx   # Admin overview
│       ├── AdminCategories.tsx  # Category management
│       └── AdminProjects.tsx    # Project management
├── supabase/
│   └── functions/
│       └── server/
│           └── index.tsx        # API routes for backend
└── utils/
    └── supabase/
        └── info.tsx             # Supabase configuration
```

## 🎨 Design Features

### Animations
- Smooth page transitions with Motion
- Scroll-based reveal animations
- Hover effects on cards and buttons
- Micro-interactions throughout
- Theme switch animation
- Loading states with spinners

### Color Palette
- **Primary**: Cyan (#06B6D4) to Blue (#2563EB) gradients
- **Dark Mode**: Slate backgrounds with cyan accents
- **Light Mode**: White/Slate backgrounds with vibrant accents

### Components
- Gradient buttons with glow effects
- Animated stat cards
- Interactive project cards
- Modal dialogs with smooth transitions
- Table with hover effects
- Theme toggle with icon animation

## 🔧 Setup & Usage

### Admin Access
1. Navigate to `/admin`
2. **First Time**: Click "Sign Up" to create admin account
3. **Login**: Use your email and password
4. Access the dashboard at `/admin/dashboard`

### Creating Categories
1. Go to `/admin/categories`
2. Click "Add Category"
3. Enter name and description
4. Categories help organize your projects

### Adding Projects
1. Go to `/admin/projects`
2. Click "Add Project"
3. Fill in:
   - Project name
   - Select category
   - Description
   - Tech stack (comma-separated)
   - Image URLs (one per line)
   - Demo link (optional)
4. Project code is auto-generated (e.g., `P2025-EDU-0123`)

### WhatsApp Integration
- Each project has a unique code
- In admin, click "Copy WhatsApp Link" button
- Share with clients - opens WhatsApp with prefilled message
- Message includes project code for easy reference

### Managing Content
- **Edit**: Click edit icon to modify categories/projects
- **Delete**: Click delete icon with confirmation dialog
- **View**: Click external link to preview projects
- **Copy Code**: Quick copy project codes to clipboard

## 🎯 User Journey

### Public Visitor
1. Lands on animated hero section
2. Explores services and company info
3. Browses portfolio with category filters
4. Clicks project to see details
5. Contacts via WhatsApp with project code
6. Submits contact form or calls directly

### Admin User
1. Logs into admin dashboard
2. Views stats and recent activity
3. Creates/manages categories
4. Adds/edits portfolio projects
5. Generates WhatsApp links for inquiries
6. Views public site in new tab

## 🔐 Authentication

The app uses Supabase Auth with:
- **Email/Password Authentication**
- **Session Management**
- **Protected Routes** - Admin pages require login
- **Auto-confirmation** - Emails auto-confirmed (since email server not configured)
- **Secure Tokens** - JWT access tokens for API calls

## 📊 Database Structure

The app uses Supabase KV Store with:

### Categories
```typescript
{
  id: string;           // "cat-1234567890"
  name: string;         // "Education"
  description: string;  // "Educational projects"
  icon: string;         // "Folder"
  createdAt: string;    // ISO timestamp
  createdBy: string;    // User ID
}
```

### Projects
```typescript
{
  id: string;           // "proj-1234567890"
  projectCode: string;  // "P2025-EDU-0123"
  name: string;         // "Learning Management System"
  categoryId: string;   // Reference to category
  description: string;  // Full description
  techStack: string[];  // ["React", "Node.js", "MongoDB"]
  images: string[];     // Array of image URLs
  demoLink: string;     // Optional demo URL
  createdAt: string;    // ISO timestamp
  createdBy: string;    // User ID
}
```

## 🌐 API Routes

All routes are prefixed with `/make-server-ea0e3e7d`

### Public Routes
- `GET /categories` - List all categories
- `GET /categories/:id` - Get single category
- `GET /projects` - List all projects (optional `?categoryId=`)
- `GET /projects/:id` - Get single project

### Protected Routes (Require Auth)
- `POST /auth/signup` - Create admin account
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category
- `POST /projects` - Create project (auto-generates code)
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## 💡 Key Features Explained

### Project Code Generation
When creating a project, the system automatically generates a unique code:
```
Format: P{YEAR}-{CATEGORY}-{TIMESTAMP}
Example: P2025-EDU-1234
```

### WhatsApp Integration
```javascript
const message = `Hello, I'm interested in Project Code: ${projectCode} - ${projectName}`;
const url = `https://wa.me/15551234567?text=${encodeURIComponent(message)}`;
```
Replace `15551234567` with actual WhatsApp business number.

### Theme Switching
- Uses localStorage to persist preference
- Applies class to document root
- Smooth transitions between modes
- All components respect theme

## 🎨 Customization

### Colors
Update gradient colors in components:
```jsx
className="bg-gradient-to-r from-cyan-500 to-blue-600"
```

### WhatsApp Number
Update in:
- `/pages/Contact.tsx`
- `/pages/ProjectDetail.tsx`

### Company Info
Update in:
- `/components/Footer.tsx` - Contact details
- `/pages/About.tsx` - Company story
- `/pages/Home.tsx` - Tagline and stats

### Services
Modify service list in:
- `/pages/Services.tsx`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚦 Getting Started

1. **First Visit**: Go to homepage to see the site
2. **Add Content**: Visit `/admin` to sign up and add projects
3. **View Portfolio**: Check `/portfolio` to see your projects
4. **Test Features**: Try theme toggle, WhatsApp links, filters

## 🔒 Security Notes

- Admin routes are protected with authentication
- Service role key stays on server
- Public anon key used for public data
- Access tokens validate protected operations
- Always use HTTPS in production

## 🎁 Bonus Features

- Copy project codes with one click
- Filter portfolio by category
- Search and sort projects
- Recent projects widget
- Stats dashboard
- Confirmation dialogs for deletions
- Error handling with user-friendly messages
- Loading states throughout

## 📈 Future Enhancements

Potential additions:
- Image upload to Supabase Storage
- Project analytics and views
- Client testimonials section
- Blog/News section
- Team members page
- Multi-language support
- Email notifications
- Advanced search and filters

## 🤝 Support

For questions or issues:
- Check the admin dashboard for stats
- Review browser console for errors
- Verify Supabase connection
- Ensure authentication is working

---

**Built with ❤️ for SOF for Software**

*Transforming Ideas into Intelligent Software*