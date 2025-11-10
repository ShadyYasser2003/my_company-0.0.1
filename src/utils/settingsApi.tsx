/**
 * Settings API Utility
 * Centralized API calls for settings management with proper error handling
 */

import { projectId } from './supabase/info';

export interface SettingsApiResponse {
  success: boolean;
  settings?: any;
  error?: string;
}

/**
 * Fetch settings from the database
 */
export async function fetchSettings(): Promise<SettingsApiResponse> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/settings`
    );

    if (!response.ok) {
      if (response.status === 404) {
        // Settings not initialized yet
        return { success: true, settings: null };
      }
      return { 
        success: false, 
        error: `Failed to fetch settings: ${response.status}` 
      };
    }

    const data = await response.json();
    return { success: true, settings: data.settings };
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to fetch settings' 
    };
  }
}

/**
 * Save complete settings to the database
 */
export async function saveSettings(
  settings: any, 
  accessToken: string
): Promise<SettingsApiResponse> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/settings`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(settings),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return { 
        success: false, 
        error: errorData.error || `Save failed: ${response.status}` 
      };
    }

    const result = await response.json();
    return { success: true, settings: result.settings };
  } catch (error: any) {
    console.error('Error saving settings:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to save settings' 
    };
  }
}

/**
 * Update a specific setting path (partial update)
 * @param path - Array of keys representing the path to the setting (e.g., ['company', 'name'])
 * @param value - The new value for the setting
 * @param accessToken - User's access token
 */
export async function updateSettingPath(
  path: string[],
  value: any,
  accessToken: string
): Promise<SettingsApiResponse> {
  try {
    // First, fetch current settings
    const fetchResult = await fetchSettings();
    if (!fetchResult.success) {
      return fetchResult;
    }

    // Merge the update into current settings
    const settings = fetchResult.settings || {};
    let current = settings;
    
    // Navigate to the parent object
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    // Set the value
    current[path[path.length - 1]] = value;

    // Save the updated settings
    return await saveSettings(settings, accessToken);
  } catch (error: any) {
    console.error('Error updating setting path:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to update setting' 
    };
  }
}

/**
 * Initialize settings with default values
 */
export async function initializeSettings(
  defaultSettings: any,
  accessToken: string
): Promise<SettingsApiResponse> {
  try {
    // Check if settings already exist
    const fetchResult = await fetchSettings();
    
    if (fetchResult.settings) {
      return { 
        success: false, 
        error: 'Settings already initialized' 
      };
    }

    // Save default settings
    return await saveSettings(defaultSettings, accessToken);
  } catch (error: any) {
    console.error('Error initializing settings:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to initialize settings' 
    };
  }
}

/**
 * Validate settings object
 */
export function validateSettings(settings: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required top-level sections
  const requiredSections = ['company', 'contact', 'social'];
  for (const section of requiredSections) {
    if (!settings[section]) {
      errors.push(`Missing required section: ${section}`);
    }
  }

  // Validate company info
  if (settings.company) {
    if (!settings.company.name || settings.company.name.trim() === '') {
      errors.push('Company name is required');
    }
  }

  // Validate contact info
  if (settings.contact) {
    if (settings.contact.email && !isValidEmail(settings.contact.email)) {
      errors.push('Invalid email format');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Helper function to validate email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
