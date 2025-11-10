/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                          SETTINGS CONTEXT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is the SINGLE SOURCE OF TRUTH for all website settings.
 * All settings are loaded from the database and made available globally.
 * 
 * Usage in components:
 *   import { useSettings } from '../hooks/useSettings';
 *   const { settings, loading, refresh } = useSettings();
 *   <h1>{settings.company.name}</h1>
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchSettingsFromDB } from '../utils/settingsDatabase';
import { GLOBAL_CONFIG } from '../config/global';

// Define the settings structure (matches database JSONB structure)
export interface Settings {
  company: {
    name: string;
    nameShort: string;
    nameFull: string;
    tagline: string;
    taglineExtended: string;
    description: string;
    descriptionLong: string;
    slogan: string;
    foundedYear: number;
    employeeCount: string;
    clientCount: string;
    projectCount: string;
    countriesServed: string;
  };
  contact: {
    email: string;
    emailSupport: string;
    emailSales: string;
    phone: string;
    phoneFormatted: string;
    phoneInternational: string;
    whatsapp: string;
    address: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    timezone: string;
    mapShareLink: string;
    latitude: number;
    longitude: number;
  };
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
    youtube: string;
    discord: string;
    telegram: string;
  };
  navigation: {
    links: Array<{ path: string; label: string }>;
    adminLabel: string;
    adminDashboardLabel: string;
    mobileMenuLabel: string;
    closeMenuLabel: string;
  };
  home: {
    hero: {
      badge: string;
      badgeIcon: string;
      title: string;
      titleHighlight: string;
      titleFull: string;
      description: string;
      descriptionShort: string;
      ctaPrimary: string;
      ctaPrimaryIcon: boolean;
      ctaSecondary: string;
      scrollIndicatorText: string;
    };
    stats: Array<{
      value: string;
      label: string;
      icon: string;
    }>;
    globalPresence: {
      badge: string;
      badgeIcon: string;
      title: string;
      description: string;
      metrics: Array<{
        value: number;
        suffix: string;
        label: string;
        sublabel: string;
      }>;
      regions: Array<{
        name: string;
        count: string;
      }>;
    };
    devops: {
      badge: string;
      badgeIcon: string;
      title: string;
      description: string;
      capabilities: Array<{
        title: string;
        description: string;
        features: string[];
        icon: string;
        color: string;
      }>;
      metrics: Array<{
        value: number;
        suffix: string;
        label: string;
      }>;
    };
    cicdPipeline: {
      badge: string;
      badgeIcon: string;
      title: string;
      description: string;
      successTitle: string;
      successDescription: string;
      metrics: Array<{
        value: number;
        suffix: string;
        label: string;
      }>;
    };
    technologies: {
      badge: string;
      badgeIcon: string;
      title: string;
      description: string;
      categories: Array<{
        name: string;
        icon: string;
        technologies: string[];
        color: string;
      }>;
    };
    whyChoose: {
      badge: string;
      badgeIcon: string;
      title: string;
      description: string;
      features: Array<{
        title: string;
        description: string;
        icon: string;
        color: string;
      }>;
    };
    performance: {
      badge: string;
      badgeIcon: string;
      title: string;
      description: string;
      metrics: Array<{
        value: number;
        suffix: string;
        label: string;
        icon: string;
        description: string;
      }>;
    };
    cta: {
      badge: string;
      title: string;
      titleAlt: string;
      description: string;
      descriptionAlt: string;
      buttonText: string;
      buttonTextAlt: string;
      buttonIcon: boolean;
    };
  };
  about: {
    hero: {
      badge: string;
      badgeIcon: string;
      title: string;
      titlePrefix: string;
      titleHighlight: string;
      description: string;
      descriptionExtended: string;
    };
    mission: {
      title: string;
      icon: string;
      description: string;
      descriptionShort: string;
    };
    vision: {
      title: string;
      icon: string;
      description: string;
      descriptionShort: string;
    };
    values: Array<{
      title: string;
      description: string;
      icon: string;
      color: string;
    }>;
    team: {
      title: string;
      titleAlt: string;
      description: string;
      descriptionExtended: string;
      icon: string;
    };
    stats: Array<{
      value: string;
      label: string;
      icon: string;
    }>;
  };
  services: {
    hero: {
      badge: string;
      badgeIcon: string;
      title: string;
      titlePrefix: string;
      titleHighlight: string;
      description: string;
      descriptionExtended: string;
    };
    emptyState: {
      title: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
    fallbackServices: any[];
    process: {
      title: string;
      description: string;
      steps: Array<{
        step: string;
        title: string;
        description: string;
      }>;
    };
  };
  portfolio: {
    hero: {
      badge: string;
      badgeIcon: string;
      title: string;
      titlePrefix: string;
      titleHighlight: string;
      description: string;
      descriptionExtended: string;
    };
    filters: {
      all: string;
      allLabel: string;
      categoryLabel: string;
      searchPlaceholder: string;
      sortLabel: string;
      sortOptions: {
        newest: string;
        oldest: string;
        nameAZ: string;
        nameZA: string;
      };
    };
    emptyState: {
      title: string;
      description: string;
      descriptionAlt: string;
      ctaText: string;
      ctaLink: string;
    };
    card: {
      viewButton: string;
      viewButtonAlt: string;
      techStackLabel: string;
      categoryLabel: string;
      dateLabel: string;
    };
    projectDetail: any;
  };
  contactPage: {
    hero: {
      badge: string;
      badgeIcon: string;
      title: string;
      titlePrefix: string;
      titleHighlight: string;
      description: string;
      descriptionExtended: string;
    };
    form: {
      title: string;
      subtitle: string;
      nameLabel: string;
      nameRequired: string;
      namePlaceholder: string;
      emailLabel: string;
      emailRequired: string;
      emailInvalid: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phoneOptional: string;
      phonePlaceholder: string;
      projectTypeLabel: string;
      projectTypePlaceholder: string;
      projectTypeRequired: string;
      projectTypes: string[];
      budgetLabel: string;
      budgetOptional: string;
      budgetPlaceholder: string;
      budgetRanges: string[];
      messageLabel: string;
      messageRequired: string;
      messagePlaceholder: string;
      messageMinLength: string;
      submitButton: string;
      submitButtonIcon: boolean;
      submitting: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
      tryAgainButton: string;
    };
    info: {
      title: string;
      subtitle: string;
      emailLabel: string;
      emailDescription: string;
      phoneLabel: string;
      phoneDescription: string;
      addressLabel: string;
      addressDescription: string;
      whatsappLabel: string;
      whatsappDescription: string;
      followUs: string;
      followUsDescription: string;
      businessHours: string;
      businessHoursTime: string;
      responseTime: string;
      responseTimeValue: string;
    };
    whatsapp: {
      buttonText: string;
      buttonTextAlt: string;
      buttonIcon: boolean;
      defaultMessage: string;
      projectInquiryMessage: string;
    };
    map: {
      title: string;
      titleHighlight: string;
      description: string;
    };
  };
  footer: {
    description: string;
    quickLinksTitle: string;
    quickLinks: Array<{ to: string; label: string }>;
    servicesTitle: string;
    servicesList: string[];
    contactTitle: string;
    followUsTitle: string;
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      buttonText: string;
      successMessage: string;
    };
    legal: {
      copyright: string;
      privacyPolicy: string;
      termsOfService: string;
      cookiePolicy: string;
    };
  };
  whatsappWidget: {
    enabled: boolean;
    position: string;
    defaultMessage: string;
    showOnPages: string[];
    buttonText: string;
    buttonIcon: string;
    color: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logoUrl: string;
    faviconUrl: string;
    ogImageUrl: string;
  };
  admin: any;
  colors: any;
  animations: any;
  localization: any;
  settings: any;
  externalLinks: any;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isFromDatabase: boolean; // Track if settings came from DB
}

// Create context
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider component
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(GLOBAL_CONFIG as Settings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromDatabase, setIsFromDatabase] = useState(false);

  // Load settings from database
  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Loading settings from database...');
      const result = await fetchSettingsFromDB();

      if (result.success && result.settings) {
        // Database settings found - use them!
        console.log('✅ Settings loaded from database');
        setSettings(result.settings);
        setIsFromDatabase(true);
      } else if (result.tableNotFound) {
        // Table doesn't exist - use hardcoded defaults (silent fallback)
        console.log('⚠️ Database table not found - using defaults');
        setSettings(GLOBAL_CONFIG as Settings);
        setIsFromDatabase(false);
      } else {
        // Database exists but no settings - use defaults
        console.log('📝 No settings in database - using defaults');
        setSettings(GLOBAL_CONFIG as Settings);
        setIsFromDatabase(false);
      }
    } catch (err: any) {
      console.error('❌ Error loading settings:', err);
      setError(err.message);
      // Fall back to defaults on error
      setSettings(GLOBAL_CONFIG as Settings);
      setIsFromDatabase(false);
    } finally {
      setLoading(false);
    }
  };

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Refresh function for manual reload
  const refresh = async () => {
    await loadSettings();
  };

  // Show loading screen while fetching settings
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Loading settings...</p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">Fetching from database</p>
        </div>
      </div>
    );
  }

  return (
    <SettingsContext.Provider 
      value={{ 
        settings, 
        loading, 
        error, 
        refresh,
        isFromDatabase 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}