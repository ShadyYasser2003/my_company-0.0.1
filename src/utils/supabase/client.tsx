import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

/**
 * Shared Supabase client instance
 * Use this instead of creating multiple clients
 */
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
