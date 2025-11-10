import { GLOBAL_CONFIG } from '../config/global';
import { fetchSettingsFromDB } from './settingsDatabase';

let cachedSettings: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

/**
 * Deep merge two objects
 */
function deepMerge(target: any, source: any): any {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Load settings from database and merge with defaults
 */
export async function loadSettings(): Promise<any> {
  // Return cached settings if available
  if (cachedSettings) {
    return cachedSettings;
  }

  // If already loading, wait for the existing promise
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  isLoading = true;
  
  loadPromise = (async () => {
    try {
      // Load settings via direct database access
      const result = await fetchSettingsFromDB();
      
      if (result.success && result.settings) {
        // Merge database settings with default config
        // Database settings take precedence
        cachedSettings = deepMerge(GLOBAL_CONFIG, result.settings);
      } else {
        console.log('Settings not found in database or failed to load, using defaults');
        // Use default config if no settings in database
        cachedSettings = GLOBAL_CONFIG;
      }
      
      return cachedSettings;
    } catch (error) {
      console.error('Error loading settings:', error);
      // Fallback to default config on error
      cachedSettings = GLOBAL_CONFIG;
      return cachedSettings;
    } finally {
      isLoading = false;
      loadPromise = null;
    }
  })();

  return loadPromise;
}

/**
 * Initialize settings on app startup
 * Alias for loadSettings for backwards compatibility
 */
export async function initializeSettings(): Promise<any> {
  return loadSettings();
}

/**
 * Clear cached settings (useful for testing or forcing reload)
 */
export function clearSettingsCache(): void {
  cachedSettings = null;
  isLoading = false;
  loadPromise = null;
}

/**
 * Get current cached settings without reloading
 */
export function getCachedSettings(): any {
  return cachedSettings || GLOBAL_CONFIG;
}

/**
 * Get settings synchronously (returns cached or defaults)
 * This is the main function components should use
 * 
 * IMPORTANT: This will initially return defaults, but App.tsx loads
 * database settings on startup and they will be used thereafter
 */
export function getSettings(): any {
  // ALWAYS prefer cached settings from database over defaults
  if (cachedSettings) {
    return cachedSettings;
  }
  
  // Only use GLOBAL_CONFIG as temporary fallback during initial load
  console.warn('[Settings] Using default config - database settings not yet loaded');
  return GLOBAL_CONFIG;
}

/**
 * Reload settings from database
 * Useful after admin updates settings
 */
export async function reloadSettings(): Promise<any> {
  clearSettingsCache();
  return loadSettings();
}