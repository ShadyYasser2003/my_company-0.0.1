import { useState, useEffect } from 'react';
import { getSettings, loadSettings } from '../utils/settingsLoader';

/**
 * React hook to get global configuration
 * Automatically updates when settings change
 */
export function useGlobalConfig() {
  const [config, setConfig] = useState(getSettings());

  useEffect(() => {
    // Load latest settings
    loadSettings().then((settings) => {
      setConfig(settings);
    });
  }, []);

  return config;
}

/**
 * Hook to get specific section of config
 */
export function useCompanyInfo() {
  const config = useGlobalConfig();
  return config.company;
}

export function useContactInfo() {
  const config = useGlobalConfig();
  return config.contact;
}

export function useSocialLinks() {
  const config = useGlobalConfig();
  return config.social;
}

export function useNavigationConfig() {
  const config = useGlobalConfig();
  return config.navigation;
}

export function useHomePageConfig() {
  const config = useGlobalConfig();
  return config.home;
}

export function useAboutPageConfig() {
  const config = useGlobalConfig();
  return config.about;
}

export function useServicesPageConfig() {
  const config = useGlobalConfig();
  return config.services;
}

export function usePortfolioPageConfig() {
  const config = useGlobalConfig();
  return config.portfolio;
}

export function useContactPageConfig() {
  const config = useGlobalConfig();
  return config.contactPage;
}
