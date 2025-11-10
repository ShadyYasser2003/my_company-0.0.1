/**
 * Settings Status Indicator Component
 * Shows whether settings are loaded from database or fallback defaults
 */

import React from 'react';
import { Database, AlertCircle, CheckCircle } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { motion } from 'motion/react';

export function SettingsStatusIndicator() {
  const { isFromDatabase, loading } = useSettings();

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (isFromDatabase) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
      >
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm">Using Database Settings</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400"
    >
      <AlertCircle className="w-4 h-4" />
      <span className="text-sm">Using Default Settings</span>
    </motion.div>
  );
}
