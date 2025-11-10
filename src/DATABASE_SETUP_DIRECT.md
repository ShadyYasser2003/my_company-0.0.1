# Direct Database Setup Guide (No Edge Functions)

## 🎯 Overview

This application has been updated to use **direct Supabase database operations** instead of Edge Functions. This eliminates the 403 deployment error and simplifies the architecture.

## ✅ Benefits of Direct Database Approach

1. **No Edge Function Deployment Required** - Eliminates 403 permission errors
2. **Simpler Architecture** - Direct client-to-database communication
3. **Better Performance** - No extra hop through edge functions
4. **Easier Debugging** - Direct error messages from database
5. **Standard Supabase Patterns** - Uses official Supabase client library

## 📋 Database Setup Steps

### Step 1: Connect to Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query

### Step 2: Run Database Schema

Execute this SQL to create all required tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Folder',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  main_image TEXT,
  additional_images TEXT[] DEFAULT '{}',
  demo_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  icon TEXT DEFAULT 'Settings',
  color TEXT DEFAULT 'from-cyan-500 to-blue-600',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Global Settings table
CREATE TABLE IF NOT EXISTS global_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  settings_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Messages/Contact Form table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  read_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER global_settings_updated_at BEFORE UPDATE ON global_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Step 3: Set Up Row Level Security (RLS)

Execute this SQL to configure security policies:

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read, admin write)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

-- Projects policies (public read, admin write)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Services policies (public read, admin write)
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- Global settings policies (public read, admin write)
CREATE POLICY "Anyone can view global settings"
  ON global_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert global settings"
  ON global_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update global settings"
  ON global_settings FOR UPDATE
  TO authenticated
  USING (true);

-- Messages policies (public insert, admin read/update/delete)
CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete messages"
  ON messages FOR DELETE
  TO authenticated
  USING (true);
```

### Step 4: Create Storage Bucket for Images

1. In Supabase Dashboard, go to **Storage**
2. Click **New bucket**
3. Name it: `project-images`
4. Make it **Public**
5. Click **Create bucket**

### Step 5: Set Storage Policies

In the Storage section, set up these policies for the `project-images` bucket:

```sql
-- Allow public to view images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'project-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');
```

## 🔧 How It Works

### Architecture Overview

```
┌─────────────────┐
│   React App     │
│  (Client Side)  │
└────────┬────────┘
         │
         │ Direct calls via @supabase/supabase-js
         │
         ▼
┌─────────────────┐
│  Supabase API   │
│   (Managed by   │
│    Supabase)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│    Database     │
└─────────────────┘
```

### New Database Utilities

All database operations are handled by `/utils/database.tsx`:

**Auth Operations:**
- `signUpAdmin()` - Create admin account
- `signIn()` - Login
- `signOut()` - Logout
- `getCurrentUser()` - Get current user

**Category Operations:**
- `getCategories()` - Fetch all categories
- `getCategory(id)` - Fetch single category
- `createCategory(data)` - Create new category
- `updateCategory(id, data)` - Update category
- `deleteCategory(id)` - Delete category

**Project Operations:**
- `getProjects(categoryId?)` - Fetch all projects (optionally filtered)
- `getProject(id)` - Fetch single project
- `createProject(data)` - Create new project (auto-generates project code)
- `updateProject(id, data)` - Update project
- `deleteProject(id)` - Delete project

**Service Operations:**
- `getServices()` - Fetch all services
- `getService(id)` - Fetch single service
- `initializeDefaultServices()` - One-click setup of 6 default services
- `createService(data)` - Create new service
- `updateService(id, data)` - Update service
- `deleteService(id)` - Delete service

**Settings Operations:**
- `getGlobalSettings()` - Fetch global settings
- `updateGlobalSettings(data)` - Update global settings

**Message Operations:**
- `getMessages()` - Fetch all contact form messages
- `createMessage(data)` - Submit contact form (public)
- `markMessageAsRead(id)` - Mark message as read
- `deleteMessage(id)` - Delete message

**Storage Operations:**
- `uploadImage(file, filename)` - Upload image to Supabase Storage
- `deleteImage(url)` - Delete image from Supabase Storage

## 📝 Usage Examples

### Example 1: Fetching Categories

```typescript
import { getCategories } from '../utils/database';

function MyComponent() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    async function loadCategories() {
      const { categories, error } = await getCategories();
      if (!error) {
        setCategories(categories);
      }
    }
    loadCategories();
  }, []);
  
  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Creating a Project

```typescript
import { createProject } from '../utils/database';

async function handleCreateProject(formData) {
  const { project, error } = await createProject({
    name: formData.name,
    category_id: formData.categoryId,
    description: formData.description,
    tech_stack: formData.techStack,
    main_image: formData.mainImage,
    additional_images: formData.additionalImages,
    demo_link: formData.demoLink,
  });
  
  if (error) {
    console.error('Failed to create project:', error);
    return;
  }
  
  console.log('Project created with code:', project.project_code);
}
```

### Example 3: Uploading an Image

```typescript
import { uploadImage } from '../utils/database';

async function handleImageUpload(file: File) {
  const { url, error } = await uploadImage(file, file.name);
  
  if (error) {
    console.error('Upload failed:', error);
    return;
  }
  
  console.log('Image uploaded:', url);
  // Use the URL in your project
}
```

## 🔍 Troubleshooting

### Error: "relation does not exist"

**Solution:** Run the database schema SQL from Step 2

### Error: "new row violates row-level security policy"

**Solution:** 
1. Make sure you're signed in for write operations
2. Check RLS policies are set up correctly (Step 3)

### Error: "permission denied for table"

**Solution:** Run the RLS policies SQL from Step 3

### Images not uploading

**Solution:**
1. Create the `project-images` bucket (Step 4)
2. Set up storage policies (Step 5)
3. Make the bucket public

### Settings not saving

**Solution:**
1. Make sure the `global_settings` table exists
2. Check RLS policies allow authenticated users to write
3. Verify you're signed in as an admin

## 🚀 What Changed from Edge Functions

### Before (Edge Functions):
```typescript
// Old approach - required edge function deployment
const response = await fetch(
  'https://project.supabase.co/functions/v1/make-server/categories',
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
```

### After (Direct Database):
```typescript
// New approach - direct database access
import { getCategories } from '../utils/database';
const { categories, error } = await getCategories();
```

## ✨ Advantages

1. **No 403 Errors** - No edge function deployment needed
2. **Better Type Safety** - TypeScript interfaces for all operations
3. **Automatic Error Handling** - Consistent error responses
4. **Simpler Setup** - Just SQL schema, no edge function config
5. **Official Patterns** - Uses Supabase recommended approach

## 📚 Next Steps

1. ✅ Run the SQL schema (Step 2)
2. ✅ Set up RLS policies (Step 3)
3. ✅ Create storage bucket (Step 4)
4. ✅ Set storage policies (Step 5)
5. ✅ Create your first admin account
6. ✅ Initialize default services
7. ✅ Start adding categories and projects!

---

**Note:** The edge function files (`/supabase/functions/server/`) remain in the codebase for reference but are no longer used or deployed. The entire application now uses direct database operations via `/utils/database.tsx`.
