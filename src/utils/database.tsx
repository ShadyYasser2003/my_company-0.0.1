import { supabase } from './supabase/client';

// ============== AUTH OPERATIONS ==============

/**
 * Sign up a new admin user
 */
export async function signUpAdmin(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'admin',
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

// ============== CATEGORY OPERATIONS ==============

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

/**
 * Get all categories
 */
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { categories: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return { categories: [], error: error.message };
  }
}

/**
 * Get a single category by ID
 */
export async function getCategory(id: string) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { category: data, error: null };
  } catch (error: any) {
    return { category: null, error: error.message };
  }
}

/**
 * Create a new category
 */
export async function createCategory(category: Omit<Category, 'id' | 'created_at' | 'created_by'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('categories')
      .insert([{
        ...category,
        created_by: user?.id,
      }])
      .select()
      .single();

    if (error) throw error;
    return { category: data, error: null };
  } catch (error: any) {
    return { category: null, error: error.message };
  }
}

/**
 * Update an existing category
 */
export async function updateCategory(id: string, updates: Partial<Category>) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { category: data, error: null };
  } catch (error: any) {
    return { category: null, error: error.message };
  }
}

/**
 * Delete a category
 */
export async function deleteCategory(id: string) {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// ============== PROJECT OPERATIONS ==============

export interface Project {
  id: string;
  project_code: string;
  name: string;
  category_id: string;
  description: string;
  tech_stack: string[];
  main_image: string;
  additional_images: string[];
  demo_link: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

/**
 * Get all projects (optionally filtered by category)
 */
export async function getProjects(categoryId?: string) {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { projects: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return { projects: [], error: error.message };
  }
}

/**
 * Get a single project by ID
 */
export async function getProject(id: string) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { project: data, error: null };
  } catch (error: any) {
    return { project: null, error: error.message };
  }
}

/**
 * Generate a unique project code
 */
async function generateProjectCode(categoryId: string) {
  try {
    // Get category name for code prefix
    const { data: category } = await supabase
      .from('categories')
      .select('name')
      .eq('id', categoryId)
      .single();

    const categoryCode = category?.name?.substring(0, 3).toUpperCase() || 'GEN';
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-4);
    
    return `P${year}-${categoryCode}-${timestamp}`;
  } catch (error) {
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-4);
    return `P${year}-GEN-${timestamp}`;
  }
}

/**
 * Create a new project
 */
export async function createProject(project: Omit<Project, 'id' | 'project_code' | 'created_at' | 'created_by'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const projectCode = await generateProjectCode(project.category_id);
    
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        ...project,
        project_code: projectCode,
        created_by: user?.id,
      }])
      .select()
      .single();

    if (error) throw error;
    return { project: data, error: null };
  } catch (error: any) {
    return { project: null, error: error.message };
  }
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, updates: Partial<Project>) {
  try {
    // Don't allow changing project_code
    const { project_code, ...safeUpdates } = updates;
    
    const { data, error } = await supabase
      .from('projects')
      .update(safeUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { project: data, error: null };
  } catch (error: any) {
    return { project: null, error: error.message };
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// ============== SERVICE OPERATIONS ==============

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

/**
 * Get all services
 */
export async function getServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { services: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return { services: [], error: error.message };
  }
}

/**
 * Get a single service by ID
 */
export async function getService(id: string) {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { service: data, error: null };
  } catch (error: any) {
    return { service: null, error: error.message };
  }
}

/**
 * Initialize default services (one-time setup)
 */
export async function initializeDefaultServices() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if services already exist
    const { data: existing } = await supabase
      .from('services')
      .select('id')
      .limit(1);

    if (existing && existing.length > 0) {
      return { 
        message: 'Services already initialized', 
        count: existing.length,
        error: null 
      };
    }

    const defaultServices = [
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern frameworks and technologies',
        features: ['React & Angular', 'ASP.NET Core', 'Progressive Web Apps', 'E-commerce Solutions'],
        icon: 'Globe',
        color: 'from-cyan-500 to-blue-600',
        created_by: user?.id,
      },
      {
        title: 'Mobile Applications',
        description: 'Native and cross-platform mobile apps for iOS and Android',
        features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment'],
        icon: 'Smartphone',
        color: 'from-blue-500 to-purple-600',
        created_by: user?.id,
      },
      {
        title: 'AI & Machine Learning',
        description: 'Intelligent solutions powered by artificial intelligence',
        features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'ChatBots'],
        icon: 'Brain',
        color: 'from-purple-500 to-pink-600',
        created_by: user?.id,
      },
      {
        title: 'Cloud Integration',
        description: 'Scalable cloud infrastructure and migration services',
        features: ['AWS & Azure', 'Cloud Migration', 'Microservices', 'DevOps & CI/CD'],
        icon: 'Cloud',
        color: 'from-green-500 to-teal-600',
        created_by: user?.id,
      },
      {
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that users love',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        icon: 'Palette',
        color: 'from-pink-500 to-rose-600',
        created_by: user?.id,
      },
      {
        title: 'Maintenance & Support',
        description: 'Ongoing support to keep your applications running smoothly',
        features: ['24/7 Monitoring', 'Bug Fixes', 'Performance Optimization', 'Security Updates'],
        icon: 'Settings',
        color: 'from-orange-500 to-red-600',
        created_by: user?.id,
      },
    ];

    const { data, error } = await supabase
      .from('services')
      .insert(defaultServices)
      .select();

    if (error) throw error;

    return { 
      message: 'Services initialized successfully', 
      count: data.length,
      services: data,
      error: null 
    };
  } catch (error: any) {
    return { 
      message: null, 
      count: 0,
      services: [],
      error: error.message 
    };
  }
}

/**
 * Create a new service
 */
export async function createService(service: Omit<Service, 'id' | 'created_at' | 'created_by'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('services')
      .insert([{
        ...service,
        created_by: user?.id,
      }])
      .select()
      .single();

    if (error) throw error;
    return { service: data, error: null };
  } catch (error: any) {
    return { service: null, error: error.message };
  }
}

/**
 * Update an existing service
 */
export async function updateService(id: string, updates: Partial<Service>) {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { service: data, error: null };
  } catch (error: any) {
    return { service: null, error: error.message };
  }
}

/**
 * Delete a service
 */
export async function deleteService(id: string) {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// ============== SETTINGS OPERATIONS ==============

export interface GlobalSettings {
  id?: string;
  settings_data: any;
  updated_at?: string;
  updated_by?: string;
}

/**
 * Get global settings
 */
export async function getGlobalSettings() {
  try {
    const { data, error } = await supabase
      .from('global_settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return { settings: data?.settings_data || null, error: null };
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return { settings: null, error: error.message };
  }
}

/**
 * Update global settings
 */
export async function updateGlobalSettings(settings: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if settings exist
    const { data: existing } = await supabase
      .from('global_settings')
      .select('id')
      .limit(1)
      .single();

    let result;
    if (existing) {
      // Update existing
      result = await supabase
        .from('global_settings')
        .update({
          settings_data: settings,
          updated_by: user?.id,
        })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Insert new
      result = await supabase
        .from('global_settings')
        .insert([{
          settings_data: settings,
          updated_by: user?.id,
        }])
        .select()
        .single();
    }

    if (result.error) throw result.error;
    return { settings: result.data.settings_data, error: null };
  } catch (error: any) {
    return { settings: null, error: error.message };
  }
}

// ============== MESSAGE OPERATIONS ==============

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  budget: string;
  message: string;
  read: boolean;
  created_at?: string;
  read_at?: string;
  read_by?: string;
}

/**
 * Get all messages (admin only)
 */
export async function getMessages() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { messages: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return { messages: [], error: error.message };
  }
}

/**
 * Create a new message (public - from contact form)
 */
export async function createMessage(message: Omit<Message, 'id' | 'read' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        ...message,
        read: false,
      }])
      .select()
      .single();

    if (error) throw error;
    return { message: data, error: null };
  } catch (error: any) {
    return { message: null, error: error.message };
  }
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(id: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('messages')
      .update({
        read: true,
        read_at: new Date().toISOString(),
        read_by: user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { message: data, error: null };
  } catch (error: any) {
    return { message: null, error: error.message };
  }
}

/**
 * Delete a message
 */
export async function deleteMessage(id: string) {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// ============== STORAGE OPERATIONS ==============

/**
 * Upload an image to Supabase Storage
 */
export async function uploadImage(file: File | Blob, filename: string) {
  try {
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${filename}`;
    const bucketName = 'project-images';

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFilename, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(uniqueFilename);

    return { url: publicUrl, error: null };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return { url: null, error: error.message };
  }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(url: string) {
  try {
    const bucketName = 'project-images';
    const filename = url.split('/').pop();
    
    if (!filename) {
      throw new Error('Invalid image URL');
    }

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filename]);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return { error: error.message };
  }
}
