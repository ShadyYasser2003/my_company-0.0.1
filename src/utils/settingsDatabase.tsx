/**
 * Direct Database Settings Management
 * Uses Supabase client directly instead of Edge Functions
 */

import { supabase } from './supabase/client';

export interface SettingsResponse {
  success: boolean;
  settings?: any;
  error?: string;
  tableNotFound?: boolean;  // Flag to indicate table doesn't exist
}

/**
 * Fetch settings directly from database
 */
export async function fetchSettingsFromDB(): Promise<SettingsResponse> {
  try {
    const { data, error } = await supabase
      .from('global_settings')
      .select('settings')
      .eq('key', 'site_config')
      .single();

    if (error) {
      // If no settings exist yet, return success with null
      if (error.code === 'PGRST116') {
        return { success: true, settings: null };
      }
      // If table doesn't exist (PGRST205), return success with flag to use defaults (silent)
      if (error.code === 'PGRST205' || error.message?.includes('not found')) {
        return { success: true, settings: null, tableNotFound: true };
      }
      console.error('Error fetching settings:', error);
      return { success: true, settings: null, error: error.message };
    }

    return { success: true, settings: data?.settings };
  } catch (error: any) {
    // Always succeed and fall back to defaults (silent)
    return { success: true, settings: null, tableNotFound: true };
  }
}

/**
 * Save settings directly to database
 */
export async function saveSettingsToDB(settings: any): Promise<SettingsResponse> {
  try {
    // Check if user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (!session || sessionError) {
      return { success: false, error: 'Not authenticated' };
    }

    // First, try to update existing settings
    const { data: existingData, error: checkError } = await supabase
      .from('global_settings')
      .select('id')
      .eq('key', 'site_config')
      .single();

    // Check if table doesn't exist
    if (checkError && (checkError.code === 'PGRST205' || checkError.message?.includes('not found'))) {
      return { 
        success: false, 
        error: 'Database table not found. Please run database setup first.',
        tableNotFound: true 
      };
    }

    let result;
    
    if (existingData) {
      // Update existing settings
      result = await supabase
        .from('global_settings')
        .update({
          settings: settings,
          updated_at: new Date().toISOString(),
          updated_by: session.user.id,
        })
        .eq('key', 'site_config')
        .select()
        .single();
    } else {
      // Insert new settings
      result = await supabase
        .from('global_settings')
        .insert({
          key: 'site_config',
          settings: settings,
          updated_by: session.user.id,
        })
        .select()
        .single();
    }

    if (result.error) {
      // Check for table not found error
      if (result.error.code === 'PGRST205' || result.error.message?.includes('not found')) {
        return { 
          success: false, 
          error: 'Database table not found. Please run database setup first.',
          tableNotFound: true 
        };
      }
      console.error('Error saving settings:', result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true, settings: result.data.settings };
  } catch (error: any) {
    console.error('Error saving settings:', error);
    // Check if it's a table not found error
    if (error.message?.includes('not found') || error.code === 'PGRST205') {
      return { 
        success: false, 
        error: 'Database table not found. Please run database setup first.',
        tableNotFound: true 
      };
    }
    return { success: false, error: error.message || 'Failed to save settings' };
  }
}

/**
 * Initialize settings with default values
 */
export async function initializeSettingsInDB(defaultSettings: any): Promise<SettingsResponse> {
  try {
    // Check if settings already exist
    const existing = await fetchSettingsFromDB();
    
    if (existing.settings) {
      return { success: false, error: 'Settings already initialized' };
    }

    // Save default settings
    return await saveSettingsToDB(defaultSettings);
  } catch (error: any) {
    console.error('Error initializing settings:', error);
    return { success: false, error: error.message || 'Failed to initialize settings' };
  }
}

/**
 * Create the global_settings table if it doesn't exist
 * Call this function once during setup
 */
export async function createSettingsTable(): Promise<{ success: boolean; error?: string }> {
  try {
    // Note: This requires database admin access
    // In production, run this SQL directly in Supabase SQL Editor
    console.log('Please run the following SQL in your Supabase SQL Editor:');
    console.log(`
      -- Create global_settings table
      CREATE TABLE IF NOT EXISTS global_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT UNIQUE NOT NULL,
        settings JSONB NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        updated_by UUID REFERENCES auth.users(id)
      );

      -- Enable RLS
      ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;

      -- Allow public read access (for loading settings)
      CREATE POLICY "Allow public read access" ON global_settings
        FOR SELECT
        USING (true);

      -- Allow authenticated users to insert/update
      CREATE POLICY "Allow authenticated insert/update" ON global_settings
        FOR ALL
        USING (auth.role() = 'authenticated')
        WITH CHECK (auth.role() = 'authenticated');

      -- Create index for faster lookups
      CREATE INDEX IF NOT EXISTS idx_global_settings_key ON global_settings(key);
    `);
    
    return { 
      success: true,
      error: 'Please run the SQL above in Supabase SQL Editor to create the table'
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}