import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Brain, Cloud, Palette, Settings, Zap, Database, Code, Shield, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useSettings } from '../hooks/useSettings';
import { SEO } from '../components/SEO';

// Icon mapping
const iconComponents: Record<string, any> = {
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

export function Services() {
  const { settings } = useSettings();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Our Services - SOF for Software | Web, Mobile, AI & Cloud Solutions"
        description="Comprehensive technology services including web development, mobile app development, AI/ML solutions, cloud computing, UI/UX design, and DevOps. Expert team delivering enterprise-grade solutions worldwide."
        keywords="web development services, mobile app development, AI solutions, cloud computing services, UI/UX design, DevOps, software consulting, custom software development, enterprise solutions, digital transformation services"
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
              {settings.services.hero.titlePrefix}{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {settings.services.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {settings.services.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No services available at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const ServiceIcon = iconComponents[service.icon] || Settings;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all overflow-hidden"
                  >
                    {/* Gradient Border on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="absolute inset-[1px] bg-slate-50 dark:bg-slate-800 rounded-2xl" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <ServiceIcon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-slate-900 dark:text-white text-2xl mb-3">
                        {service.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {service.description}
                      </p>

                      <ul className="space-y-2">
                        {service.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-slate-900 dark:text-white mb-4">
              {settings.services.process.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {settings.services.process.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.services.process.steps.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-5xl bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-xl mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {phase.description}
                  </p>
                </div>
                {index < settings.services.process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}