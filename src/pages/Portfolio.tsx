import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useSettings } from '../hooks/useSettings';
import { SEO } from '../components/SEO';

export function Portfolio() {
  const { settings } = useSettings();
  const [categories, setCategories] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, projectsRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/categories`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ea0e3e7d/projects`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
      ]);

      const categoriesData = await categoriesRes.json();
      const projectsData = await projectsRes.json();

      setCategories(categoriesData.categories || []);
      setProjects(projectsData.projects || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.categoryId === selectedCategory)
    : projects;

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Portfolio - SOF for Software | 500+ Successful Projects Worldwide"
        description="Explore our portfolio of 500+ successful software projects across web development, mobile apps, AI solutions, and cloud computing. Serving clients in 45+ countries with innovative technology solutions."
        keywords="software portfolio, web development projects, mobile app portfolio, AI projects, cloud solutions, case studies, client success stories, technology portfolio, software projects"
        type="website"
      />
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl text-slate-900 dark:text-white mb-6">
              {settings.portfolio.hero.titlePrefix}{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {settings.portfolio.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {settings.portfolio.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Category Filter */}
              {categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-3 justify-center mb-12"
                >
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-6 py-2 rounded-full transition-all ${
                      selectedCategory === null
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {settings.portfolio.filters.all}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-2 rounded-full transition-all ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Projects Grid */}
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    {settings.portfolio.emptyState.title}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                      className="group relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
                    >
                      {/* Project Image */}
                      {project.images && project.images.length > 0 ? (
                        <div className="aspect-video overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                          <img
                            src={project.images[0]}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                          <ExternalLink className="w-12 h-12 text-cyan-500" />
                        </div>
                      )}

                      {/* Project Info */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm">
                            {project.projectCode}
                          </span>
                        </div>

                        <h3 className="text-slate-900 dark:text-white text-xl mb-2">
                          {project.name}
                        </h3>

                        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.slice(0, 3).map((tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <Link
                          to={`/portfolio/${project.id}`}
                          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 transition-colors"
                        >
                          {settings.portfolio.card.viewButton}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}