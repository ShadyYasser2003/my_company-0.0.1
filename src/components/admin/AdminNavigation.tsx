import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Shield, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { GLOBAL_CONFIG } from '../../config/global';

export function AdminNavigation() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/categories', label: 'Categories' },
    { path: '/admin/projects', label: 'Projects' },
    { path: '/admin/services', label: 'Services' },
    { path: '/admin/messages', label: 'Messages' },
    { path: '/admin/initialize-data', label: 'Initialize Data' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900 dark:bg-slate-950 border-b border-slate-800 dark:border-slate-900"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-7 h-7 text-cyan-500 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/40 transition-all" />
            </div>
            <span className="text-white tracking-tight">
              <span className="font-semibold">{GLOBAL_CONFIG.company.nameShort}</span> Admin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span
                  className={`text-slate-300 hover:text-cyan-400 transition-colors ${
                    isActive(link.path) ? 'text-cyan-400' : ''
                  }`}
                >
                  {link.label}
                </span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeAdminNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* User Info */}
            {user && (
              <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-slate-300 text-sm">{user.email}</span>
              </div>
            )}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </motion.button>

            {/* Sign Out */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800"
            >
              {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* User Info Mobile */}
              {user && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-slate-300 text-sm">{user.email}</span>
                </div>
              )}

              {/* Navigation Links */}
              {adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-cyan-500 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Sign Out Mobile */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}