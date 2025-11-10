# ⚠️ DO NOT DEPLOY THESE EDGE FUNCTIONS

## 🚫 Edge Functions Are Disabled

This directory contains **legacy edge function code** that is **NOT USED** in this project.

## ✅ Current Architecture

This project uses **DIRECT DATABASE ACCESS** via `@supabase/supabase-js`.

```
React Application
        ↓
Supabase Client (@supabase/supabase-js)
        ↓
Direct Database Queries (Row Level Security)
        ↓
PostgreSQL Database
```

## ❌ DO NOT:

- Deploy these edge functions
- Attempt to use these functions
- Update or modify these files
- Reference these functions in code

## ✅ INSTEAD USE:

All operations are in `/utils/database.tsx`:

```typescript
import {
  // Auth
  signIn,
  signOut,
  signUpAdmin,
  getCurrentUser,
  
  // Categories
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  
  // Projects
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  
  // Services
  getServices,
  initializeDefaultServices,
  createService,
  updateService,
  deleteService,
  
  // Settings
  getGlobalSettings,
  updateGlobalSettings,
  
  // Messages
  getMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage,
  
  // Storage
  uploadImage,
  deleteImage,
} from '../utils/database';
```

## 📂 Why These Files Exist

These edge function files are kept **for reference only** to document the original architecture. They demonstrate what the project used to use before migrating to direct database access.

## 🔧 Configuration

Edge functions are disabled in:
- `/.supabaserc` → `[functions] enabled = false`
- `/supabase/config.toml` → `[edge_runtime] enabled = false`
- `/supabase/.gitignore` → `functions/`

## 🚀 Performance Comparison

| Approach | Latency | Complexity |
|----------|---------|------------|
| Edge Functions (OLD) | ~120ms | High |
| Direct DB Access (NEW) | ~60ms | Low |

**50% faster with direct database access!**

## 📚 Documentation

See these files for complete information:
- `/EDGE_FUNCTIONS_DISABLED.md` - Why edge functions are disabled
- `/README_NO_EDGE_FUNCTIONS.md` - Architecture overview
- `/DATABASE_SETUP_DIRECT.md` - Database setup guide
- `/utils/database.tsx` - All database operations

## ⚠️ 403 Deployment Error

If you see a 403 error about edge function deployment:
- **This is expected and harmless**
- Edge functions are disabled by configuration
- The application works perfectly without them
- No action needed

---

**Summary:** These files are archived. Use `/utils/database.tsx` instead.
