/**
 * Settings Accessor
 * 
 * This file provides a centralized way to access settings that ALWAYS
 * pulls from the database (via settingsLoader) instead of hardcoded defaults.
 * 
 * USAGE:
 * Instead of: import { GLOBAL_CONFIG } from '../config/global';
 * Use:        import { CONFIG } from '../config/settingsAccessor';
 * 
 * Then use CONFIG exactly like you used GLOBAL_CONFIG:
 * - CONFIG.company.name
 * - CONFIG.home.hero.title
 * - etc.
 */

import { getSettings } from '../utils/settingsLoader';

/**
 * Proxy object that always returns current settings from database
 * This ensures every access gets the latest database values
 */
export const CONFIG = new Proxy({}, {
  get(target, prop) {
    const settings = getSettings();
    return settings[prop];
  }
});

/**
 * Helper function to get current settings
 * Use this when you need the entire settings object
 */
export function getCurrentSettings() {
  return getSettings();
}

/**
 * Helper functions to access specific sections
 * These are convenient wrappers that always pull from database
 */
export function getCompanyInfo() {
  return getSettings().company;
}

export function getContactInfo() {
  return getSettings().contact;
}

export function getSocialLinks() {
  return getSettings().social;
}

export function getNavigationConfig() {
  return getSettings().navigation;
}

export function getHomePageConfig() {
  return getSettings().home;
}

export function getAboutPageConfig() {
  return getSettings().about;
}

export function getServicesPageConfig() {
  return getSettings().services;
}

export function getPortfolioPageConfig() {
  return getSettings().portfolio;
}

export function getContactPageConfig() {
  return getSettings().contactPage;
}

export function getFooterConfig() {
  return getSettings().footer;
}

export function getColorsConfig() {
  return getSettings().colors;
}

export function getAnimationsConfig() {
  return getSettings().animations;
}

/**
 * Helper function for WhatsApp URL (for Contact page)
 */
export function getWhatsAppUrl(message: string = '') {
  const settings = getSettings();
  const whatsappNumber = settings.contact?.whatsapp || '201225119842';
  const defaultMessage = settings.contactPage?.whatsapp?.defaultMessage || 'Hello! I would like to discuss a project with you.';
  const finalMessage = message || defaultMessage;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`;
}
