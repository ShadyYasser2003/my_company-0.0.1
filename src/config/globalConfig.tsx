/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    DYNAMIC GLOBAL CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This module provides dynamic configuration that can be updated from the
 * admin dashboard and stored in the database.
 * 
 * Usage:
 * - Import getConfig() to get current configuration
 * - Configuration is loaded from database on app startup
 * - Admin can update all values through the Settings page
 * - Changes are persisted to Supabase and reflected immediately
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { getSettings } from '../utils/settingsLoader';
import { GLOBAL_CONFIG } from './global';

/**
 * Get the current global configuration
 * Returns database settings merged with defaults
 */
export function getConfig() {
  return getSettings();
}

/**
 * Export default config for backward compatibility
 * This will use database values when available
 */
export function getCompanyInfo() {
  return getConfig().company;
}

export function getContactInfo() {
  return getConfig().contact;
}

export function getSocialLinks() {
  return getConfig().social;
}

export function getNavigationConfig() {
  return getConfig().navigation;
}

export function getHomePageConfig() {
  return getConfig().home;
}

export function getAboutPageConfig() {
  return getConfig().about;
}

export function getServicesPageConfig() {
  return getConfig().services;
}

export function getPortfolioPageConfig() {
  return getConfig().portfolio;
}

export function getContactPageConfig() {
  return getConfig().contactPage;
}

// Export the static config as fallback
export { GLOBAL_CONFIG };
