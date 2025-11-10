import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, Loader2, X, Globe, Smartphone, Brain, Cloud, Palette, Settings, Zap, Database, Code, Shield } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useAuth } from '../../contexts/AuthContext';

// Available icons for services
const availableIcons = {
  Globe,
  Smartphone,
  Brain,
  Cloud,
  Palette,
  Settings,
  Zap,
  Database,
  Code,
  Shield,
};

// Available gradient colors
const availableColors = [
  { name: 'Cyan to Blue', value: 'from-cyan-500 to-blue-600' },
  { name: 'Blue to Purple', value: 'from-blue-500 to-purple-600' },
  { name: 'Purple to Pink', value: 'from-purple-500 to-pink-600' },
  { name: 'Green to Teal', value: 'from-green-500 to-teal-600' },
  { name: 'Pink to Rose', value: 'from-pink-500 to-rose-600' },
  { name: 'Orange to Red', value: 'from-orange-500 to-red-600' },
  { name: 'Indigo to Purple', value: 'from-indigo-500 to-purple-600' },
  { name: 'Yellow to Orange', value: 'from-yellow-500 to-orange-600' },
];

export function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: '',
    icon: 'Settings',
    color: 'from-cyan-500 to-blue-600',
  });
  const { accessToken } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/services`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const features = formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        description: formData.description,
        features,
        icon: formData.icon,
        color: formData.color,
      };

      const url = editingService
        ? `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/services/${editingService.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/services`;

      const response = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save service');
      }

      await fetchServices();
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving service:', error);
      alert(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/services/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete service');
      }

      await fetchServices();
    } catch (error: any) {
      console.error('Error deleting service:', error);
      alert(error.message);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || '',
      features: service.features?.join('\n') || '',
      icon: service.icon || 'Settings',
      color: service.color || 'from-cyan-500 to-blue-600',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      features: '',
      icon: 'Settings',
      color: 'from-cyan-500 to-blue-600',
    });
  };

  const handleInitializeServices = async () => {
    if (!confirm('This will add 6 default services. Continue?')) return;

    try {
      setInitializing(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/services/initialize`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize services');
      }

      alert(data.message || 'Services initialized successfully!');
      await fetchServices();
    } catch (error: any) {
      console.error('Error initializing services:', error);
      alert(error.message);
    } finally {
      setInitializing(false);
    }
  };

  const IconComponent = availableIcons[formData.icon as keyof typeof availableIcons] || Settings;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-slate-900 dark:text-white mb-2">
              Services
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your service offerings
            </p>
          </div>
          <div className="flex items-center gap-3">
            {services.length === 0 && (
              <button
                onClick={handleInitializeServices}
                disabled={initializing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add 6 default services"
              >
                {initializing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                Quick Setup
              </button>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Service
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No services yet
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={handleInitializeServices}
                disabled={initializing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {initializing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Add Default Services (6)
                  </>
                )}
              </button>
              <span className="text-slate-400">or</span>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Custom Service
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const ServiceIcon = availableIcons[service.icon as keyof typeof availableIcons] || Settings;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all overflow-hidden"
                >
                  {/* Gradient Border on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-[1px] bg-slate-50 dark:bg-slate-800 rounded-2xl" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                      <ServiceIcon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-slate-900 dark:text-white text-xl mb-2">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <ul className="space-y-1 mb-4">
                      {service.features?.slice(0, 3).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                      {service.features?.length > 3 && (
                        <li className="text-slate-500 dark:text-slate-500 text-sm pl-3.5">
                          +{service.features.length - 3} more
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => handleEdit(service)}
                        className="flex-1 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="flex-1 p-2 rounded-lg hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-2xl my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-slate-900 dark:text-white">
                  {editingService ? 'Edit Service' : 'Add Service'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-900 dark:text-white mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Web Development"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-white mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder="Brief description of the service..."
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-white mb-2">
                    Features (one per line) *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder="React & Angular&#10;ASP.NET Core&#10;Progressive Web Apps&#10;E-commerce Solutions"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 dark:text-white mb-2">
                      Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    >
                      {Object.keys(availableIcons).map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-900 dark:text-white mb-2">
                      Color Gradient
                    </label>
                    <select
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    >
                      {availableColors.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                    Preview:
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${formData.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-900 dark:text-white">
                        {formData.title || 'Service Title'}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm line-clamp-1">
                        {formData.description || 'Service description'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    {editingService ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
