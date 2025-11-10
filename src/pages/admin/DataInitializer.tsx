import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useAuth } from '../../contexts/AuthContext';

// Import sample data
import { SAMPLE_CATEGORIES, SAMPLE_SERVICES, SAMPLE_PROJECTS } from '../../scripts/initialize-data';

interface InitStatus {
  categories: 'pending' | 'loading' | 'success' | 'error';
  services: 'pending' | 'loading' | 'success' | 'error';
  projects: 'pending' | 'loading' | 'success' | 'error';
}

export function DataInitializer() {
  const [status, setStatus] = useState<InitStatus>({
    categories: 'pending',
    services: 'pending',
    projects: 'pending',
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const { accessToken } = useAuth();

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const initializeCategories = async () => {
    setStatus(prev => ({ ...prev, categories: 'loading' }));
    addLog('Starting categories initialization...');

    try {
      const createdCategories: any[] = [];

      for (const category of SAMPLE_CATEGORIES) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/categories`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(category),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to create category: ${category.name}`);
        }

        const data = await response.json();
        createdCategories.push(data.category);
        addLog(`✓ Created category: ${category.name}`);
      }

      setStatus(prev => ({ ...prev, categories: 'success' }));
      addLog(`✓ Successfully created ${createdCategories.length} categories`);
      return createdCategories;
    } catch (error: any) {
      setStatus(prev => ({ ...prev, categories: 'error' }));
      addLog(`✗ Error creating categories: ${error.message}`);
      throw error;
    }
  };

  const initializeServices = async () => {
    setStatus(prev => ({ ...prev, services: 'loading' }));
    addLog('Starting services initialization...');

    try {
      for (const service of SAMPLE_SERVICES) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/services`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(service),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to create service: ${service.title}`);
        }

        addLog(`✓ Created service: ${service.title}`);
      }

      setStatus(prev => ({ ...prev, services: 'success' }));
      addLog(`✓ Successfully created ${SAMPLE_SERVICES.length} services`);
    } catch (error: any) {
      setStatus(prev => ({ ...prev, services: 'error' }));
      addLog(`✗ Error creating services: ${error.message}`);
      throw error;
    }
  };

  const initializeProjects = async (categories: any[]) => {
    setStatus(prev => ({ ...prev, projects: 'loading' }));
    addLog('Starting projects initialization...');

    try {
      // Create a map of category names to IDs
      const categoryMap = categories.reduce((acc, cat) => {
        acc[cat.name] = cat.id;
        return acc;
      }, {} as Record<string, string>);

      let projectsCreated = 0;

      for (const project of SAMPLE_PROJECTS) {
        const categoryId = categoryMap[project.category];
        
        if (!categoryId) {
          addLog(`⚠ Skipping project ${project.name} - category not found`);
          continue;
        }

        // Generate project code
        const code = `PRJ-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        const projectData = {
          code,
          name: project.name,
          categoryId,
          description: project.description,
          techStack: project.techStack.split(', '),
          mainImage: project.imageUrl || '',
          additionalImages: [],
          demoLink: project.demoLink || '',
        };

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(projectData),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to create project: ${project.name}`);
        }

        projectsCreated++;
        addLog(`✓ Created project: ${project.name} (${code})`);

        // Small delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setStatus(prev => ({ ...prev, projects: 'success' }));
      addLog(`✓ Successfully created ${projectsCreated} projects`);
    } catch (error: any) {
      setStatus(prev => ({ ...prev, projects: 'error' }));
      addLog(`✗ Error creating projects: ${error.message}`);
      throw error;
    }
  };

  const handleInitialize = async () => {
    if (!accessToken) {
      addLog('✗ Error: Not authenticated. Please log in first.');
      return;
    }

    setIsInitializing(true);
    setLogs([]);
    setStatus({
      categories: 'pending',
      services: 'pending',
      projects: 'pending',
    });

    addLog('=== Starting Database Initialization ===');

    try {
      // Step 1: Create categories
      const categories = await initializeCategories();

      // Step 2: Create services
      await initializeServices();

      // Step 3: Create projects
      await initializeProjects(categories);

      addLog('=== Database Initialization Complete! ===');
      addLog(`Total: ${categories.length} categories, ${SAMPLE_SERVICES.length} services, ${SAMPLE_PROJECTS.length} projects`);
    } catch (error) {
      addLog('=== Initialization Failed ===');
    } finally {
      setIsInitializing(false);
    }
  };

  const getStatusIcon = (state: 'pending' | 'loading' | 'success' | 'error') => {
    switch (state) {
      case 'loading':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-slate-900 dark:text-white mb-2">Database Initializer</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Populate your database with comprehensive sample data including categories, services, and portfolio projects.
          </p>
        </div>

        {/* Warning Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-900 dark:text-yellow-100 mb-2">Important Information</h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• This will create <strong>6 categories</strong>, <strong>6 services</strong>, and <strong>35+ portfolio projects</strong></li>
                <li>• All data can be edited or deleted later from the admin dashboard</li>
                <li>• Project codes will be auto-generated in format: PRJ-XXXXXXXX-XXXX</li>
                <li>• Images use Unsplash URLs and may be subject to their usage policies</li>
                <li>• This operation may take 1-2 minutes to complete</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Data Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg text-slate-900 dark:text-white mb-4">What will be created:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-slate-700">
              <div className="text-2xl text-cyan-600 dark:text-cyan-400 mb-1">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Categories</div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Web, Mobile, AI/ML, Cloud, Enterprise, E-Commerce
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-slate-700">
              <div className="text-2xl text-purple-600 dark:text-purple-400 mb-1">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Services</div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Complete service offerings with features
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-slate-700">
              <div className="text-2xl text-green-600 dark:text-green-400 mb-1">35</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Projects</div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Diverse portfolio across all categories
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-3"
        >
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {getStatusIcon(status.categories)}
            <span className="text-slate-900 dark:text-white">Categories</span>
            <span className="ml-auto text-sm text-slate-500">
              {status.categories === 'success' && '6 created'}
              {status.categories === 'loading' && 'Creating...'}
              {status.categories === 'pending' && 'Pending'}
              {status.categories === 'error' && 'Failed'}
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {getStatusIcon(status.services)}
            <span className="text-slate-900 dark:text-white">Services</span>
            <span className="ml-auto text-sm text-slate-500">
              {status.services === 'success' && '6 created'}
              {status.services === 'loading' && 'Creating...'}
              {status.services === 'pending' && 'Pending'}
              {status.services === 'error' && 'Failed'}
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {getStatusIcon(status.projects)}
            <span className="text-slate-900 dark:text-white">Projects</span>
            <span className="ml-auto text-sm text-slate-500">
              {status.projects === 'success' && '35 created'}
              {status.projects === 'loading' && 'Creating...'}
              {status.projects === 'pending' && 'Pending'}
              {status.projects === 'error' && 'Failed'}
            </span>
          </div>
        </motion.div>

        {/* Initialize Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleInitialize}
            disabled={isInitializing}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isInitializing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Initializing Database...
              </>
            ) : (
              <>
                <Database className="w-5 h-5" />
                Initialize Database with Sample Data
              </>
            )}
          </button>
        </motion.div>

        {/* Logs */}
        {logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700"
          >
            <h3 className="text-white mb-3 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Initialization Log
            </h3>
            <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-sm">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.includes('✓') ? 'text-green-400' :
                    log.includes('✗') ? 'text-red-400' :
                    log.includes('⚠') ? 'text-yellow-400' :
                    'text-slate-400'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
