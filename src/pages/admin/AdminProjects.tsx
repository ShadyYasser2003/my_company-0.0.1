import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, Loader2, X, Copy, ExternalLink, Upload, Image as ImageIcon } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useAuth } from '../../contexts/AuthContext';

export function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    techStack: '',
    mainImage: '',
    additionalImages: [] as string[],
    demoLink: '',
  });
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesInputRef = useRef<HTMLInputElement>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/categories`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
      ]);

      const projectsData = await projectsRes.json();
      const categoriesData = await categoriesRes.json();

      setProjects(projectsData.projects || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result as string;
          
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/upload-image`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                image: base64Image,
                filename: file.name,
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to upload image');
          }

          const data = await response.json();
          resolve(data.url);
        } catch (error: any) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, mainImage: url });
    } catch (error: any) {
      console.error('Error uploading main image:', error);
      alert(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleAdditionalImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = files.map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      setFormData({ 
        ...formData, 
        additionalImages: [...formData.additionalImages, ...urls] 
      });
    } catch (error: any) {
      console.error('Error uploading additional images:', error);
      alert(error.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleMainImageDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, mainImage: url });
    } catch (error: any) {
      console.error('Error uploading main image:', error);
      alert(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleAdditionalImagesDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = files.map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      setFormData({ 
        ...formData, 
        additionalImages: [...formData.additionalImages, ...urls] 
      });
    } catch (error: any) {
      console.error('Error uploading additional images:', error);
      alert(error.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = [...formData.additionalImages];
    newImages.splice(index, 1);
    setFormData({ ...formData, additionalImages: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const techStack = formData.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name,
        categoryId: formData.categoryId,
        description: formData.description,
        techStack,
        mainImage: formData.mainImage,
        additionalImages: formData.additionalImages,
        demoLink: formData.demoLink,
      };

      const url = editingProject
        ? `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects/${editingProject.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects`;

      const response = await fetch(url, {
        method: editingProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save project');
      }

      await fetchData();
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving project:', error);
      alert(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete project');
      }

      await fetchData();
    } catch (error: any) {
      console.error('Error deleting project:', error);
      alert(error.message);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      categoryId: project.categoryId,
      description: project.description || '',
      techStack: project.techStack?.join(', ') || '',
      mainImage: project.mainImage || '',
      additionalImages: project.additionalImages || [],
      demoLink: project.demoLink || '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({
      name: '',
      categoryId: '',
      description: '',
      techStack: '',
      mainImage: '',
      additionalImages: [],
      demoLink: '',
    });
  };

  const copyProjectCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Project code copied to clipboard!');
  };

  const copyWhatsAppLink = (project: any) => {
    const message = `Hello, I'm interested in Project Code: ${project.projectCode} - ${project.name}`;
    const whatsappUrl = `https://wa.me/15551234567?text=${encodeURIComponent(message)}`;
    navigator.clipboard.writeText(whatsappUrl);
    alert('WhatsApp link copied to clipboard!');
  };

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
              Projects
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your portfolio projects
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No projects yet
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Create First Project
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-slate-900 dark:text-white">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-slate-900 dark:text-white">
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-slate-900 dark:text-white">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-slate-900 dark:text-white">
                      Tech Stack
                    </th>
                    <th className="px-6 py-4 text-right text-slate-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {projects.map((project) => {
                    const category = categories.find((c) => c.id === project.categoryId);
                    return (
                      <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {project.mainImage && (
                              <img 
                                src={project.mainImage} 
                                alt={project.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <div className="text-slate-900 dark:text-white">
                                {project.name}
                              </div>
                              <div className="text-slate-600 dark:text-slate-400 text-sm line-clamp-1">
                                {project.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => copyProjectCode(project.projectCode)}
                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                          >
                            <span className="text-sm">{project.projectCode}</span>
                            <Copy className="w-3 h-3" />
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-600 dark:text-slate-400">
                            {category?.name || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {project.techStack?.slice(0, 2).map((tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack?.length > 2 && (
                              <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                                +{project.techStack.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => copyWhatsAppLink(project)}
                              className="p-2 rounded-lg hover:bg-green-500/10 text-green-600 dark:text-green-400 transition-colors"
                              title="Copy WhatsApp Link"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <a
                              href={`/portfolio/${project.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
                              title="View Project"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleEdit(project)}
                              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-3xl my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-slate-900 dark:text-white">
                  {editingProject ? 'Edit Project' : 'Add Project'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 dark:text-white mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="My Awesome Project"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-900 dark:text-white mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    placeholder="Brief description of the project..."
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-white mb-2">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) =>
                      setFormData({ ...formData, techStack: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="React, TypeScript, Node.js, MongoDB"
                  />
                </div>

                {/* Main/Cover Image Upload */}
                <div>
                  <label className="block text-slate-900 dark:text-white mb-2">
                    Main/Cover Image * (Shown on portfolio card)
                  </label>
                  <div
                    onDrop={handleMainImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => mainImageInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 cursor-pointer hover:border-cyan-500 transition-colors"
                  >
                    {formData.mainImage ? (
                      <div className="relative">
                        <img
                          src={formData.mainImage}
                          alt="Main"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData({ ...formData, mainImage: '' });
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        {uploading ? (
                          <Loader2 className="w-12 h-12 mx-auto text-cyan-500 animate-spin mb-3" />
                        ) : (
                          <Upload className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                        )}
                        <p className="text-slate-600 dark:text-slate-400">
                          Drop image here or click to upload
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                          Single image only
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={mainImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Additional Images Upload */}
                <div>
                  <label className="block text-slate-900 dark:text-white mb-2">
                    Additional Images (Shown in project detail)
                  </label>
                  <div
                    onDrop={handleAdditionalImagesDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => additionalImagesInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 cursor-pointer hover:border-cyan-500 transition-colors"
                  >
                    {formData.additionalImages.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3">
                        {formData.additionalImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              alt={`Additional ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAdditionalImage(idx);
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <div
                          className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg h-24 flex items-center justify-center"
                        >
                          <Plus className="w-8 h-8 text-slate-400" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        {uploading ? (
                          <Loader2 className="w-12 h-12 mx-auto text-cyan-500 animate-spin mb-3" />
                        ) : (
                          <ImageIcon className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                        )}
                        <p className="text-slate-600 dark:text-slate-400">
                          Drop images here or click to upload
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                          Multiple images allowed
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={additionalImagesInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesUpload}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-white mb-2">
                    Demo Link (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.demoLink}
                    onChange={(e) =>
                      setFormData({ ...formData, demoLink: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="https://demo.example.com"
                  />
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
                    disabled={uploading}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : editingProject ? 'Update' : 'Create'}
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
