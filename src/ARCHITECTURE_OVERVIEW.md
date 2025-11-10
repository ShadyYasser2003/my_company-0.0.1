# Architecture Overview - Visual Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SOF FOR SOFTWARE APPLICATION                      │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
         ┌──────────▼──────────┐    ┌──────────▼───────────┐
         │  PUBLIC WEBSITE     │    │  ADMIN DASHBOARD     │
         │  (Main Portfolio)   │    │  (Management Panel)  │
         └──────────┬──────────┘    └──────────┬───────────┘
                    │                           │
         ┌──────────▼──────────┐    ┌──────────▼───────────┐
         │                     │    │                      │
         │  PUBLIC ROUTES      │    │  ADMIN ROUTES        │
         │  ---------------    │    │  ---------------     │
         │  /                  │    │  /admin              │
         │  /about             │    │  /admin/dashboard    │
         │  /services          │    │  /admin/categories   │
         │  /portfolio         │    │  /admin/projects     │
         │  /contact           │    │                      │
         │                     │    │                      │
         └──────────┬──────────┘    └──────────┬───────────┘
                    │                           │
         ┌──────────▼──────────┐    ┌──────────▼───────────┐
         │                     │    │                      │
         │  PUBLIC LAYOUT      │    │  ADMIN LAYOUT        │
         │  ---------------    │    │  ---------------     │
         │  • Navigation       │    │  • Admin Header      │
         │  • Page Content     │    │  • Sidebar Menu      │
         │  • Footer           │    │  • Content Area      │
         │                     │    │  • NO Footer         │
         │                     │    │                      │
         └──────────┬──────────┘    └──────────┬───────────┘
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │  SHARED INFRASTRUCTURE    │
                    │  -----------------------  │
                    │  • Auth Context           │
                    │  • Theme Context          │
                    │  • Global Config          │
                    │  • Supabase Backend       │
                    │  • UI Components          │
                    │  • Database (KV Store)    │
                    └───────────────────────────┘
```

---

## Component Hierarchy

### Public Website
```
App.tsx
 └── PublicLayout
      ├── Navigation
      │    ├── Logo
      │    ├── Menu Items (Home, About, Services, Portfolio, Contact)
      │    └── Theme Toggle
      ├── Page Content
      │    ├── Home
      │    ├── About
      │    ├── Services
      │    ├── Portfolio
      │    └── Contact
      └── Footer
           ├── Company Info
           ├── Quick Links
           ├── Services
           └── Contact Info
```

### Admin Dashboard
```
App.tsx
 └── Admin Routes
      ├── AdminLogin (no layout)
      └── AdminLayout
           ├── Header
           │    ├── Logo "SOF Admin"
           │    ├── Back to Website
           │    ├── Theme Toggle
           │    ├── User Profile
           │    └── Sign Out
           ├── Sidebar
           │    ├── Dashboard
           │    ├── Categories
           │    └── Projects
           └── Content Area
                ├── AdminDashboard
                ├── AdminCategories
                └── AdminProjects
```

---

## Data Flow Diagram

### Public Website Flow
```
User Visit
    ↓
Public Page (/)
    ↓
Fetch Projects from Backend
    ↓
Display Portfolio
    ↓
User Submits Contact Form
    ↓
POST to Backend
    ↓
Success Message
```

### Admin Dashboard Flow
```
Admin Navigates to /admin
    ↓
AdminLogin Page
    ↓
Enter Credentials
    ↓
Auth Context → Supabase Auth
    ↓
Authentication Success
    ↓
Redirect to /admin/dashboard
    ↓
AdminLayout Checks Auth
    ↓
Load Dashboard Data
    ↓
Admin Manages Content
    ↓
CRUD Operations via Backend
    ↓
Updates Reflected on Public Site
```

---

## Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────┐
│                    User Authentication                       │
└─────────────────────────────────────────────────────────────┘

PUBLIC WEBSITE                    ADMIN DASHBOARD
     │                                 │
     │ No Auth Required                │ Auth Required
     │                                 │
     ↓                                 ↓
 Browse Freely                    Navigate to /admin
     │                                 │
     │                                 ↓
     │                            Login Page
     │                                 │
     │                                 ↓
     │                          Enter Credentials
     │                                 │
     │                                 ↓
     │                       Supabase Auth Validates
     │                                 │
     │                      ┌──────────┴──────────┐
     │                      │                     │
     │                  Success               Failure
     │                      │                     │
     │                      ↓                     ↓
     │              Store Session          Show Error
     │                      │                     │
     │                      ↓                     │
     │              Redirect to Dashboard         │
     │                      │                     │
     │                      ↓                     │
     │              Check Auth on                 │
     │              Each Request                  │
     │                      │                     │
     │              ┌───────┴────────┐           │
     │              │                │           │
     │         Authorized      Unauthorized      │
     │              │                │           │
     │              ↓                ↓           │
     │         Show Content    Redirect ────────┘
     │                          to Login
     │
     └──────────────────────────────────────────────────────────┐
                                                                 │
                    BACKEND API                                  │
                         │                                       │
                    ┌────┴────┐                                 │
                    │         │                                 │
              Public API   Protected API                        │
                    │         │                                 │
                    │         └── Validates Token ──────────────┘
                    │                   │
                    │              ┌────┴────┐
                    │              │         │
                    │          Valid    Invalid
                    │              │         │
                    │              ↓         ↓
                    │         Process   401 Error
                    │         Request
                    │              │
                    └──────────────┴────────────────────────────┐
                                                                 │
                              DATABASE                           │
                                  │                              │
                    ┌─────────────┴─────────────┐               │
                    │                           │               │
             Public Data                  Admin Data            │
          (Categories, Projects)    (CRUD Operations) ──────────┘
```

---

## Request Flow Examples

### Public Portfolio View
```
1. User → Visits /portfolio
2. Portfolio Component → Mounts
3. useEffect → Fetches data
4. API Call → GET /make-server-ea0e3e7d/projects
5. Backend → Queries database
6. Database → Returns projects
7. Backend → Returns JSON
8. Frontend → Renders projects
9. User → Sees portfolio
```

### Admin Create Project
```
1. Admin → Logged in at /admin/projects
2. Admin → Clicks "Add New Project"
3. Form → Opens
4. Admin → Fills details
5. Admin → Clicks "Save Project"
6. Frontend → Validates form
7. API Call → POST /make-server-ea0e3e7d/projects
              Headers: { Authorization: Bearer <token> }
8. Backend → Validates token
9. Backend → Checks user authentication
10. Backend → Generates project code (PRJ-001)
11. Database → Inserts project
12. Backend → Returns success + project data
13. Frontend → Updates UI
14. Frontend → Shows success message
15. Public Site → Now shows new project automatically
```

---

## File Structure with Purpose

```
/
├── App.tsx                          # Main routing & layout logic
│
├── components/
│   ├── Navigation.tsx               # 🌐 Public navigation (NO admin)
│   ├── Footer.tsx                   # 🌐 Public footer
│   └── admin/
│       └── AdminLayout.tsx          # 🔐 Admin layout (sidebar, header)
│
├── pages/
│   ├── Home.tsx                     # 🌐 Public homepage
│   ├── About.tsx                    # 🌐 Public about page
│   ├── Services.tsx                 # 🌐 Public services page
│   ├── Portfolio.tsx                # 🌐 Public portfolio list
│   ├── ProjectDetail.tsx            # 🌐 Public project details
│   ├── Contact.tsx                  # 🌐 Public contact form
│   └── admin/
│       ├── AdminLogin.tsx           # 🔐 Admin login page
│       ├── AdminDashboard.tsx       # 🔐 Admin overview
│       ├── AdminCategories.tsx      # 🔐 Category management
│       └── AdminProjects.tsx        # 🔐 Project management
│
├── contexts/
│   ├── AuthContext.tsx              # ✅ Shared authentication
│   └── ThemeContext.tsx             # ✅ Shared theme system
│
├── config/
│   └── global.tsx                   # ✅ All text content & settings
│
├── utils/
│   └── supabase/
│       └── info.tsx                 # ✅ Supabase connection
│
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx            # ✅ Backend API routes
│           └── kv_store.tsx         # ✅ Database utilities
│
└── styles/
    └── globals.css                  # ✅ Global styles
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
└─────────────────────────────────────────────────────────────┘

Layer 1: Route Protection
─────────────────────────
• Public routes → Open to all
• /admin → Login required
• /admin/* → Authentication check

Layer 2: Component Protection
──────────────────────────────
• AdminLayout → Checks auth on mount
• Redirects if not authenticated
• useEffect monitors auth state

Layer 3: Backend Protection
────────────────────────────
• Public endpoints → No auth needed
• Admin endpoints → Token validation
• Supabase verifies each request

Layer 4: Database Protection
─────────────────────────────
• Row-level security (RLS)
• Supabase enforces permissions
• Service role for admin operations

Layer 5: No Information Leakage
────────────────────────────────
• Public site → No admin links
• No hints about admin panel
• Clean separation of concerns
```

---

## Deployment Architecture

### Current: Monolithic Deployment
```
┌──────────────────────────────────┐
│      Single Deployment           │
│                                  │
│  ┌────────────────────────────┐ │
│  │   Public Website           │ │
│  │   + Admin Dashboard        │ │
│  └────────────────────────────┘ │
│              │                   │
│              ↓                   │
│  ┌────────────────────────────┐ │
│  │   Shared Backend           │ │
│  │   (Supabase Edge Function)│ │
│  └────────────────────────────┘ │
│              │                   │
│              ↓                   │
│  ┌────────────────────────────┐ │
│  │   Database                 │ │
│  │   (Supabase Postgres)      │ │
│  └────────────────────────────┘ │
└──────────────────────────────────┘

Benefits:
✅ Simple deployment
✅ Shared infrastructure
✅ Single codebase
✅ Easy to maintain
```

### Future: Split Deployment (Optional)
```
┌─────────────────────┐    ┌─────────────────────┐
│  www.domain.com     │    │  admin.domain.com   │
│                     │    │                     │
│  ┌───────────────┐ │    │ ┌───────────────┐  │
│  │ Public Site   │ │    │ │ Admin Panel   │  │
│  └───────────────┘ │    │ └───────────────┘  │
└──────────┬──────────┘    └──────────┬─────────┘
           │                          │
           └──────────┬───────────────┘
                      │
           ┌──────────▼──────────────┐
           │   Shared Backend        │
           │   (Supabase)            │
           └──────────┬──────────────┘
                      │
           ┌──────────▼──────────────┐
           │   Database              │
           │   (Supabase Postgres)   │
           └─────────────────────────┘

Benefits:
✅ Complete isolation
✅ Independent scaling
✅ Separate deployment cycles
✅ Enhanced security
```

---

## Theme System

```
┌─────────────────────────────────────────┐
│         Theme Context                    │
│  (Shared between Public & Admin)        │
└─────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   Light Mode            Dark Mode
        │                     │
┌───────▼───────┐    ┌────────▼────────┐
│  Light Theme  │    │   Dark Theme    │
│  -----------  │    │   -----------   │
│  • White BG   │    │   • Dark BG     │
│  • Dark Text  │    │   • Light Text  │
│  • Light UI   │    │   • Dark UI     │
└───────────────┘    └─────────────────┘

Toggle Available In:
✅ Public Navigation
✅ Admin Header
✅ Mobile Menus

Persistence:
✅ Saved to localStorage
✅ Persists across sessions
✅ Synced between public & admin
```

---

## Summary

This architecture provides:

✅ **Clear Separation**: Public and Admin are distinct
✅ **Shared Resources**: Efficient code reuse
✅ **Security**: Multiple protection layers
✅ **Scalability**: Can split deployments later
✅ **Maintainability**: Easy to understand and modify
✅ **Flexibility**: Add features to either side independently

The system is designed to be:
- **Simple** for end users
- **Powerful** for administrators
- **Maintainable** for developers
- **Secure** by default
- **Scalable** for growth

---

For detailed implementation, see:
- `/ADMIN_SEPARATION.md` - Detailed explanation
- `/DEVELOPER_NOTES.md` - Technical details
- `/ADMIN_ACCESS_GUIDE.md` - User guide
- `/QUICK_REFERENCE.md` - Quick lookup
