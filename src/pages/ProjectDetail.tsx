import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, MessageCircle, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects/${id}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();
      setProject(data.project);

      if (data.project?.categoryId) {
        const catResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/categories/${data.project.categoryId}`,
          {
            headers: { Authorization: `Bearer ${publicAnonKey}` },
          }
        );
        const catData = await catResponse.json();
        setCategory(catData.category);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    if (project) {
      const message = `Hello, I'm interested in Project Code: ${project.projectCode} - ${project.name}`;
      const whatsappUrl = `https://wa.me/15551234567?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
            Project not found
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-500 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                {project.projectCode}
              </span>
              {category && (
                <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {category.name}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              {project.name}
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Images */}
              {project.images && project.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="grid grid-cols-1 gap-4">
                    {project.images.map((image: string, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                      >
                        <img
                          src={image}
                          alt={`${project.name} screenshot ${idx + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl text-slate-900 dark:text-white mb-4">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="sticky top-24 space-y-6"
              >
                {/* Demo Link */}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Demo
                  </a>
                )}

                {/* WhatsApp Contact */}
                <button
                  onClick={handleWhatsAppContact}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact via WhatsApp
                </button>

                {/* Project Info */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-slate-900 dark:text-white mb-4">
                    Project Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                        Project Code
                      </div>
                      <div className="text-slate-900 dark:text-white">
                        {project.projectCode}
                      </div>
                    </div>
                    {category && (
                      <div>
                        <div className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                          Category
                        </div>
                        <div className="text-slate-900 dark:text-white">
                          {category.name}
                        </div>
                      </div>
                    )}
                    {project.createdAt && (
                      <div>
                        <div className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                          Created
                        </div>
                        <div className="text-slate-900 dark:text-white">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Share Code */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
                  <h3 className="text-slate-900 dark:text-white mb-2">
                    Interested in this project?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Share the project code with us: <strong>{project.projectCode}</strong>
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(project.projectCode);
                      alert('Project code copied to clipboard!');
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-colors"
                  >
                    Copy Project Code
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
