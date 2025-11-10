/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                          USE SETTINGS HOOK
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Simple hook to access settings from anywhere in the app.
 * 
 * Usage:
 *   import { useSettings } from '../hooks/useSettings';
 *   
 *   function MyComponent() {
 *     const { settings, loading } = useSettings();
 *     
 *     if (loading) return <div>Loading...</div>;
 *     
 *     return <h1>{settings.company.name}</h1>;
 *   }
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

export function useSettings() {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
}
