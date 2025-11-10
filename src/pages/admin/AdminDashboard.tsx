import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FolderTree, FileCode, TrendingUp, Activity, Settings, Database, Sliders, Mail, AlertTriangle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase/client';
import { fetchSettingsFromDB } from '../../utils/settingsDatabase';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalProjects: 0,
    totalServices: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [settingsInitialized, setSettingsInitialized] = useState(true);
  const [databaseSetupNeeded, setDatabaseSetupNeeded] = useState(false);
  const { accessToken } = useAuth();

  useEffect(() => {
    fetchStats();
    checkSettings();
  }, []);

  const checkSettings = async () => {
    try {
      const result = await fetchSettingsFromDB();
      
      // Check if table doesn't exist
      if (result.tableNotFound) {
        setDatabaseSetupNeeded(true);
        setSettingsInitialized(false);
        return;
      }
      
      setDatabaseSetupNeeded(false);
      setSettingsInitialized(result.success && !!result.settings);
    } catch (error) {
      console.error('Error checking settings:', error);
      setSettingsInitialized(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const authHeader = session?.access_token 
        ? `Bearer ${session.access_token}` 
        : `Bearer ${publicAnonKey}`;

      const [categoriesRes, projectsRes, servicesRes, messagesRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/categories`, {
          headers: { Authorization: authHeader },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects`, {
          headers: { Authorization: authHeader },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/services`, {
          headers: { Authorization: authHeader },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/messages`, {
          headers: { Authorization: authHeader },
        }),
      ]);

      // Parse responses with error handling
      let categoriesData = { categories: [] };
      let projectsData = { projects: [] };
      let servicesData = { services: [] };
      let messagesData = { messages: [] };

      if (categoriesRes.ok) {
        try {
          categoriesData = await categoriesRes.json();
        } catch (e) {
          console.error('Failed to parse categories response:', e);
        }
      }

      if (projectsRes.ok) {
        try {
          projectsData = await projectsRes.json();
        } catch (e) {
          console.error('Failed to parse projects response:', e);
        }
      }

      if (servicesRes.ok) {
        try {
          servicesData = await servicesRes.json();
        } catch (e) {
          console.error('Failed to parse services response:', e);
        }
      }

      if (messagesRes.ok) {
        try {
          messagesData = await messagesRes.json();
        } catch (e) {
          console.error('Failed to parse messages response:', e);
        }
      } else {
        console.log('Messages request failed with status:', messagesRes.status);
      }

      const categories = categoriesData.categories || [];
      const projects = projectsData.projects || [];
      const services = servicesData.services || [];
      const messages = messagesData.messages || [];
      
      const unreadCount = messages.filter((m: any) => !m.read).length;

      setStats({
        totalCategories: categories.length,
        totalProjects: projects.length,
        totalServices: services.length,
        totalMessages: messages.length,
        unreadMessages: unreadCount,
      });

      // Get most recent projects
      const sorted = [...projects].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRecentProjects(sorted.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Categories',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'from-cyan-500 to-blue-600',
      link: '/admin/categories',
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FileCode,
      color: 'from-purple-500 to-pink-600',
      link: '/admin/projects',
    },
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: Settings,
      color: 'from-green-500 to-teal-600',
      link: '/admin/services',
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      icon: Mail,
      color: 'from-orange-500 to-red-600',
      link: '/admin/messages',
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} new` : undefined,
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl text-slate-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Welcome back! Here's an overview of your content.
        </p>

        {/* Database Setup Warning */}
        {databaseSetupNeeded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-slate-900 dark:text-white mb-2">
                  Database Setup Required
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  The <code className="px-2 py-1 bg-red-100 dark:bg-red-900/40 rounded">global_settings</code> table 
                  doesn't exist in your Supabase database. You need to run the setup SQL script before using the settings features.
                </p>
                <Link
                  to="/admin/database-setup"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700 transition-all"
                >
                  <Database className="w-5 h-5" />
                  Go to Database Setup
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={card.link}
                className="block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-3xl text-slate-900 dark:text-white mb-1">
                    {card.value}
                  </div>
                  {(card as any).badge && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">
                      {(card as any).badge}
                    </span>
                  )}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {card.title}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-slate-900 dark:text-white">
              Recent Projects
            </h2>
            <Link
              to="/admin/projects"
              className="text-cyan-500 hover:text-cyan-600 transition-colors"
            >
              View All
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No projects yet
              </p>
              <Link
                to="/admin/projects"
                className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg transition-all"
              >
                Create First Project
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-900 dark:text-white">
                        {project.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs">
                        {project.projectCode}
                      </span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Link
                    to={`/portfolio/${project.id}`}
                    target="_blank"
                    className="text-cyan-500 hover:text-cyan-600 transition-colors"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Settings Initialization Banner */}
        {!settingsInitialized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Sliders className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-slate-900 dark:text-white mb-2">
                  Initialize Settings Database
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Enable database-driven configuration by initializing your settings. You'll be able to control all website content from the Admin Settings page without code changes.
                </p>
                <Link
                  to="/admin/global-settings-init"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  <Sliders className="w-5 h-5" />
                  Initialize Settings
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Data Initialization Banner */}
        {stats.totalProjects === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-slate-900 dark:text-white mb-2">
                  Quick Start: Initialize Sample Data
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Get started quickly by populating your database with 6 categories, 6 services, and 35+ professional portfolio projects. All data can be customized or removed later.
                </p>
                <Link
                  to="/admin/initialize-data"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  <Database className="w-5 h-5" />
                  Initialize Database
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Link
            to="/admin/categories"
            className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 hover:border-cyan-500 transition-all"
          >
            <FolderTree className="w-8 h-8 text-cyan-500 mb-3" />
            <h3 className="text-slate-900 dark:text-white mb-2">
              Manage Categories
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Organize your projects into categories
            </p>
          </Link>

          <Link
            to="/admin/projects"
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 hover:border-purple-500 transition-all"
          >
            <FileCode className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-slate-900 dark:text-white mb-2">
              Manage Projects
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Add, edit, or remove projects from your portfolio
            </p>
          </Link>

          <Link
            to="/admin/services"
            className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-600/10 border border-green-500/20 hover:border-green-500 transition-all"
          >
            <Settings className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="text-slate-900 dark:text-white mb-2">
              Manage Services
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Add and manage your service offerings
            </p>
          </Link>

          <Link
            to="/admin/initialize-data"
            className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 hover:border-orange-500 transition-all"
          >
            <Database className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="text-slate-900 dark:text-white mb-2">
              Initialize Data
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Populate with sample portfolio & services
            </p>
          </Link>

          <Link
            to="/admin/settings"
            className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 hover:border-indigo-500 transition-all md:col-span-2 lg:col-span-1"
          >
            <Sliders className="w-8 h-8 text-indigo-500 mb-3" />
            <h3 className="text-slate-900 dark:text-white mb-2">
              Global Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Edit company info, contact details & social media
            </p>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}