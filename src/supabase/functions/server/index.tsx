import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize storage bucket for project images
const BUCKET_NAME = 'make-ea0e3e7d-project-images';
(async () => {
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
  if (!bucketExists) {
    await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    console.log('Created storage bucket:', BUCKET_NAME);
  }
})();


// ============== AUTH ROUTES ==============

// Sign up (admin creation)
app.post('/make-server-ea0e3e7d/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'admin' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ data });
  } catch (error) {
    console.log('Signup exception:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// ============== CATEGORY ROUTES ==============

// Get all categories
app.get('/make-server-ea0e3e7d/categories', async (c) => {
  try {
    const categories = await kv.getByPrefix('category:');
    return c.json({ categories: categories || [] });
  } catch (error) {
    console.log('Error fetching categories:', error);
    return c.json({ error: 'Failed to fetch categories' }, 500);
  }
});

// Get single category
app.get('/make-server-ea0e3e7d/categories/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const category = await kv.get(`category:${id}`);
    
    if (!category) {
      return c.json({ error: 'Category not found' }, 404);
    }
    
    return c.json({ category });
  } catch (error) {
    console.log('Error fetching category:', error);
    return c.json({ error: 'Failed to fetch category' }, 500);
  }
});

// Create category (auth required)
app.post('/make-server-ea0e3e7d/categories', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const { name, description, icon } = await c.req.json();
    const id = `cat-${Date.now()}`;
    
    const category = {
      id,
      name,
      description,
      icon: icon || 'Folder',
      createdAt: new Date().toISOString(),
      createdBy: user.id,
    };

    await kv.set(`category:${id}`, category);
    return c.json({ category });
  } catch (error) {
    console.log('Error creating category:', error);
    return c.json({ error: 'Failed to create category' }, 500);
  }
});

// Update category (auth required)
app.put('/make-server-ea0e3e7d/categories/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    const existing = await kv.get(`category:${id}`);
    
    if (!existing) {
      return c.json({ error: 'Category not found' }, 404);
    }

    const updates = await c.req.json();
    const category = {
      ...existing,
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`category:${id}`, category);
    return c.json({ category });
  } catch (error) {
    console.log('Error updating category:', error);
    return c.json({ error: 'Failed to update category' }, 500);
  }
});

// Delete category (auth required)
app.delete('/make-server-ea0e3e7d/categories/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`category:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting category:', error);
    return c.json({ error: 'Failed to delete category' }, 500);
  }
});

// ============== IMAGE UPLOAD ROUTES ==============

// Upload project image (auth required)
app.post('/make-server-ea0e3e7d/upload-image', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const body = await c.req.json();
    const { image, filename } = body;
    
    if (!image || !filename) {
      return c.json({ error: 'Image data and filename required' }, 400);
    }

    // Remove data URL prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${filename}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(uniqueFilename, buffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      console.log('Upload error:', error);
      return c.json({ error: 'Failed to upload image' }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uniqueFilename);

    return c.json({ url: publicUrl });
  } catch (error) {
    console.log('Error uploading image:', error);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

// Delete image (auth required)
app.delete('/make-server-ea0e3e7d/delete-image', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const { url } = await c.req.json();
    
    // Extract filename from URL
    const filename = url.split('/').pop();
    
    if (!filename) {
      return c.json({ error: 'Invalid URL' }, 400);
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filename]);

    if (error) {
      console.log('Delete error:', error);
      return c.json({ error: 'Failed to delete image' }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting image:', error);
    return c.json({ error: 'Failed to delete image' }, 500);
  }
});

// ============== PROJECT ROUTES ==============

// Get all projects
app.get('/make-server-ea0e3e7d/projects', async (c) => {
  try {
    const categoryId = c.req.query('categoryId');
    let projects = await kv.getByPrefix('project:');
    
    if (categoryId) {
      projects = projects.filter((p: any) => p.categoryId === categoryId);
    }
    
    return c.json({ projects: projects || [] });
  } catch (error) {
    console.log('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Get single project
app.get('/make-server-ea0e3e7d/projects/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const project = await kv.get(`project:${id}`);
    
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }
    
    return c.json({ project });
  } catch (error) {
    console.log('Error fetching project:', error);
    return c.json({ error: 'Failed to fetch project' }, 500);
  }
});

// Create project (auth required)
app.post('/make-server-ea0e3e7d/projects', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const body = await c.req.json();
    const { name, categoryId, description, techStack, mainImage, additionalImages, demoLink } = body;
    
    // Generate project code
    const category = await kv.get(`category:${categoryId}`);
    const categoryCode = category?.name?.substring(0, 3).toUpperCase() || 'GEN';
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-4);
    const projectCode = `P${year}-${categoryCode}-${timestamp}`;
    
    const id = `proj-${Date.now()}`;
    
    const project = {
      id,
      projectCode,
      name,
      categoryId,
      description,
      techStack: techStack || [],
      mainImage: mainImage || '',
      additionalImages: additionalImages || [],
      images: [mainImage, ...(additionalImages || [])].filter(Boolean), // For backward compatibility
      demoLink: demoLink || '',
      createdAt: new Date().toISOString(),
      createdBy: user.id,
    };

    await kv.set(`project:${id}`, project);
    return c.json({ project });
  } catch (error) {
    console.log('Error creating project:', error);
    return c.json({ error: 'Failed to create project' }, 500);
  }
});

// Update project (auth required)
app.put('/make-server-ea0e3e7d/projects/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    const existing = await kv.get(`project:${id}`);
    
    if (!existing) {
      return c.json({ error: 'Project not found' }, 404);
    }

    const updates = await c.req.json();
    const project = {
      ...existing,
      ...updates,
      id,
      projectCode: existing.projectCode, // Don't allow code changes
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${id}`, project);
    return c.json({ project });
  } catch (error) {
    console.log('Error updating project:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

// Delete project (auth required)
app.delete('/make-server-ea0e3e7d/projects/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`project:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// ============== SERVICE ROUTES ==============

// Initialize default services (auth required, one-time setup)
app.post('/make-server-ea0e3e7d/services/initialize', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    // Check if services already exist
    const existingServices = await kv.getByPrefix('service:');
    if (existingServices && existingServices.length > 0) {
      return c.json({ 
        message: 'Services already initialized', 
        count: existingServices.length 
      });
    }

    // Default services data
    const defaultServices = [
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern frameworks and technologies',
        features: ['React & Angular', 'ASP.NET Core', 'Progressive Web Apps', 'E-commerce Solutions'],
        icon: 'Globe',
        color: 'from-cyan-500 to-blue-600',
      },
      {
        title: 'Mobile Applications',
        description: 'Native and cross-platform mobile apps for iOS and Android',
        features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment'],
        icon: 'Smartphone',
        color: 'from-blue-500 to-purple-600',
      },
      {
        title: 'AI & Machine Learning',
        description: 'Intelligent solutions powered by artificial intelligence',
        features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'ChatBots'],
        icon: 'Brain',
        color: 'from-purple-500 to-pink-600',
      },
      {
        title: 'Cloud Integration',
        description: 'Scalable cloud infrastructure and migration services',
        features: ['AWS & Azure', 'Cloud Migration', 'Microservices', 'DevOps & CI/CD'],
        icon: 'Cloud',
        color: 'from-green-500 to-teal-600',
      },
      {
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that users love',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        icon: 'Palette',
        color: 'from-pink-500 to-rose-600',
      },
      {
        title: 'Maintenance & Support',
        description: 'Ongoing support to keep your applications running smoothly',
        features: ['24/7 Monitoring', 'Bug Fixes', 'Performance Optimization', 'Security Updates'],
        icon: 'Settings',
        color: 'from-orange-500 to-red-600',
      },
    ];

    // Create all services
    const createdServices = [];
    for (const serviceData of defaultServices) {
      const id = `service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const service = {
        id,
        ...serviceData,
        createdAt: new Date().toISOString(),
        createdBy: user.id,
      };
      await kv.set(`service:${id}`, service);
      createdServices.push(service);
      // Small delay to ensure unique IDs
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    return c.json({ 
      message: 'Services initialized successfully', 
      count: createdServices.length,
      services: createdServices
    });
  } catch (error) {
    console.log('Error initializing services:', error);
    return c.json({ error: 'Failed to initialize services' }, 500);
  }
});

// ============== SERVICE ROUTES ==============

// Get all services
app.get('/make-server-ea0e3e7d/services', async (c) => {
  try {
    const services = await kv.getByPrefix('service:');
    return c.json({ services: services || [] });
  } catch (error) {
    console.log('Error fetching services:', error);
    return c.json({ error: 'Failed to fetch services' }, 500);
  }
});

// Get single service
app.get('/make-server-ea0e3e7d/services/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const service = await kv.get(`service:${id}`);
    
    if (!service) {
      return c.json({ error: 'Service not found' }, 404);
    }
    
    return c.json({ service });
  } catch (error) {
    console.log('Error fetching service:', error);
    return c.json({ error: 'Failed to fetch service' }, 500);
  }
});

// Create service (auth required)
app.post('/make-server-ea0e3e7d/services', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const { title, description, features, icon, color } = await c.req.json();
    const id = `service-${Date.now()}`;
    
    const service = {
      id,
      title,
      description,
      features: features || [],
      icon: icon || 'Settings',
      color: color || 'from-cyan-500 to-blue-600',
      createdAt: new Date().toISOString(),
      createdBy: user.id,
    };

    await kv.set(`service:${id}`, service);
    return c.json({ service });
  } catch (error) {
    console.log('Error creating service:', error);
    return c.json({ error: 'Failed to create service' }, 500);
  }
});

// Update service (auth required)
app.put('/make-server-ea0e3e7d/services/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    const existing = await kv.get(`service:${id}`);
    
    if (!existing) {
      return c.json({ error: 'Service not found' }, 404);
    }

    const updates = await c.req.json();
    const service = {
      ...existing,
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`service:${id}`, service);
    return c.json({ service });
  } catch (error) {
    console.log('Error updating service:', error);
    return c.json({ error: 'Failed to update service' }, 500);
  }
});

// Delete service (auth required)
app.delete('/make-server-ea0e3e7d/services/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`service:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting service:', error);
    return c.json({ error: 'Failed to delete service' }, 500);
  }
});

// ============== SETTINGS ROUTES ==============

// Get global settings
app.get('/make-server-ea0e3e7d/settings', async (c) => {
  try {
    const settings = await kv.get('settings:global');
    return c.json({ settings: settings || null });
  } catch (error) {
    console.log('Error fetching settings:', error);
    return c.json({ error: 'Failed to fetch settings' }, 500);
  }
});

// Update global settings (auth required)
app.put('/make-server-ea0e3e7d/settings', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const settings = await c.req.json();
    
    const updatedSettings = {
      ...settings,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id,
    };

    await kv.set('settings:global', updatedSettings);
    return c.json({ settings: updatedSettings });
  } catch (error) {
    console.log('Error updating settings:', error);
    return c.json({ error: 'Failed to update settings' }, 500);
  }
});

// ============== MESSAGES/CONTACT FORM ROUTES ==============

// Get all messages (auth required)
app.get('/make-server-ea0e3e7d/messages', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const messages = await kv.getByPrefix('message:');
    return c.json({ messages: messages || [] });
  } catch (error) {
    console.log('Error fetching messages:', error);
    return c.json({ error: 'Failed to fetch messages' }, 500);
  }
});

// Create message (public - from contact form)
app.post('/make-server-ea0e3e7d/messages', async (c) => {
  try {
    const { name, email, phone, projectType, budget, message } = await c.req.json();
    const id = `msg-${Date.now()}`;
    
    const messageData = {
      id,
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`message:${id}`, messageData);
    return c.json({ message: messageData });
  } catch (error) {
    console.log('Error creating message:', error);
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

// Mark message as read (auth required)
app.put('/make-server-ea0e3e7d/messages/:id/read', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    const existing = await kv.get(`message:${id}`);
    
    if (!existing) {
      return c.json({ error: 'Message not found' }, 404);
    }

    const updated = {
      ...existing,
      read: true,
      readAt: new Date().toISOString(),
      readBy: user.id,
    };

    await kv.set(`message:${id}`, updated);
    return c.json({ message: updated });
  } catch (error) {
    console.log('Error marking message as read:', error);
    return c.json({ error: 'Failed to update message' }, 500);
  }
});

// Delete message (auth required)
app.delete('/make-server-ea0e3e7d/messages/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in as admin' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`message:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting message:', error);
    return c.json({ error: 'Failed to delete message' }, 500);
  }
});

Deno.serve(app.fetch);
