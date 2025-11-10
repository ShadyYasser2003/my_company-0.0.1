import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Shield, Rocket, Globe, Server, GitBranch, Workflow, TrendingUp, Users, Code2, Database, Cloud, Lock, CheckCircle2, Activity, Clock, Cpu, Smartphone, Play, AlertCircle, Package, TestTube, FileCheck, Upload, CheckCircle } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { SEO, addStructuredData, organizationSchema, websiteSchema } from '../components/SEO';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Home() {
  const { settings } = useSettings();

  // Add structured data for SEO
  addStructuredData({
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema],
  });
  
  return (
    <div className="min-h-screen">
      <SEO
        title="SOF for Software - Innovative Technology Solutions | Web, Mobile, AI & Cloud"
        description="Leading global technology company offering cutting-edge web development, mobile apps, AI solutions, and cloud computing services. Transform your vision into reality with 500+ successful projects across 45+ countries."
        keywords="software development, web development, mobile app development, AI solutions, cloud computing, digital transformation, custom software, enterprise solutions, technology consulting, IT services, DevOps, CI/CD, full-stack development"
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 dark:opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center pt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span>{settings.home.hero.badge}</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl text-slate-900 dark:text-white mb-6">
                {settings.home.hero.title}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    {settings.home.hero.titleHighlight}
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-cyan-500/20 -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </h1>

              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                {settings.home.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 transition-all"
                  >
                    {settings.home.hero.ctaPrimary}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
                  >
                    {settings.home.hero.ctaSecondary}
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            >
              {settings.home.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-cyan-500 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Global Presence Section */}
      <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-4">
              <Globe className="w-4 h-4" />
              <span>{settings.home.globalPresence.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              {settings.home.globalPresence.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {settings.home.globalPresence.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {settings.home.globalPresence.metrics.map((stat, index) => {
              const iconMap: Record<string, any> = {
                Rocket,
                Globe,
                Activity,
                Clock,
              };
              const StatIcon = iconMap[stat.label.includes('Project') ? 'Rocket' : 
                                       stat.label.includes('Countries') ? 'Globe' : 
                                       stat.label.includes('Uptime') ? 'Activity' : 'Clock'];
              const colorMap = [
                'from-cyan-500 to-blue-600',
                'from-blue-500 to-purple-600',
                'from-green-500 to-teal-600',
                'from-purple-500 to-pink-600'
              ];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <StatIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorMap[index]} opacity-0 group-hover:opacity-10 blur-xl transition-opacity -z-10`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Global Clients Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Trusted by leading organizations worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80 dark:opacity-60 bg-[rgba(43,145,109,0)]">
              {settings.home.globalPresence.regions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {region.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DevOps & Automation Excellence */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 mb-4">
              <Workflow className="w-4 h-4" />
              <span>DevOps & Automation</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              Enterprise-Grade DevOps Solutions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Streamline your software delivery with cutting-edge CI/CD pipelines and infrastructure automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GitBranch,
                title: 'CI/CD Pipelines',
                description: 'Automated testing, building, and deployment workflows',
                features: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'Azure DevOps'],
                color: 'from-cyan-500 to-blue-600',
              },
              {
                icon: Cloud,
                title: 'Cloud Infrastructure',
                description: 'Scalable cloud architecture and infrastructure as code',
                features: ['AWS', 'Azure', 'Google Cloud', 'Terraform'],
                color: 'from-blue-500 to-purple-600',
              },
              {
                icon: Server,
                title: 'Container Orchestration',
                description: 'Kubernetes and Docker container management at scale',
                features: ['Kubernetes', 'Docker', 'Docker Swarm', 'Helm'],
                color: 'from-purple-500 to-pink-600',
              },
              {
                icon: Activity,
                title: 'Monitoring & Observability',
                description: 'Real-time monitoring and comprehensive logging solutions',
                features: ['Prometheus', 'Grafana', 'ELK Stack', 'DataDog'],
                color: 'from-green-500 to-teal-600',
              },
              {
                icon: Lock,
                title: 'Security & Compliance',
                description: 'Automated security scanning and compliance management',
                features: ['SAST/DAST', 'Vulnerability Scanning', 'SOC 2', 'GDPR'],
                color: 'from-orange-500 to-red-600',
              },
              {
                icon: Zap,
                title: 'Automation Scripts',
                description: 'Custom automation for repetitive tasks and workflows',
                features: ['Python Scripts', 'Bash Scripts', 'PowerShell', 'Ansible'],
                color: 'from-pink-500 to-rose-600',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity -z-10`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 4, delay: index * 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* DevOps Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {settings.home.devops.metrics.map((metric, index) => (
                <div key={index}>
                  <div className="text-4xl text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CI/CD Pipeline Visualization */}
      <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 mb-4">
              <GitBranch className="w-4 h-4" />
              <span>{settings?.home?.cicdPipeline?.badge || 'Automated Pipeline'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              {settings?.home?.cicdPipeline?.title || 'Complete CI/CD Pipeline Journey'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {settings?.home?.cicdPipeline?.description || 'From code commit to production deployment—fully automated, tested, and secure'}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Vertical Pipeline Flow */}
            <div className="relative">
              {/* Animated Connection Line */}
              <motion.div
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ transformOrigin: 'top' }}
              />

              {/* Pipeline Stages - Dynamic from settings */}
              {settings?.home?.cicdPipeline?.stages && settings.home.cicdPipeline.stages.length > 0 ? settings.home.cicdPipeline.stages.map((step, index) => {
                // Map icon string to actual icon component
                const iconMap: Record<string, any> = {
                  Code2, Package, TestTube, Shield, FileCheck, Server, Upload, CheckCircle,
                  GitBranch, Workflow, Database, Cloud, Lock, Activity, Clock, Cpu
                };
                const IconComponent = iconMap[step.icon] || Code2;
                const delay = 0.1 * (index + 1);
                
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: step.position === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay, duration: 0.4 }}
                  className={`relative mb-12 flex ${step.position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}
                >
                  {/* Stage Content */}
                  <div className={`flex-1 ${step.position === 'right' ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${step.position === 'right' ? 'md:flex-row-reverse md:justify-end' : ''}`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl text-slate-900 dark:text-white">{step.stage}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-[12px] text-[14px] text-left">{step.description}</p>
                      <div className={`flex flex-wrap gap-2 ${step.position === 'right' ? 'md:justify-end' : ''}`}>
                        {step.details.map((detail, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: delay + (idx * 0.05), duration: 0.2 }}
                            className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs"
                          >
                            {detail}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Stage Number Badge */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay, type: 'spring', stiffness: 200 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white text-xl">{index + 1}</span>
                    </motion.div>
                    {/* Pulsing Ring Animation */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color}`}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2, delay }}
                    />
                  </div>
                </motion.div>
                );
              }) : null}
            </div>

            {/* Pipeline Success Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border-2 border-green-500/30 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl text-slate-900 dark:text-white mb-2">
                {settings?.home?.cicdPipeline?.successTitle || 'Pipeline Complete!'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {settings?.home?.cicdPipeline?.successDescription || 'Your application is live in production with zero downtime'}
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                {settings?.home?.cicdPipeline?.metrics && settings.home.cicdPipeline.metrics.map((metric, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white dark:bg-slate-800">
                    <div className="text-2xl text-green-600 dark:text-green-400 mb-1">
                      {metric.value === 0 ? (
                        metric.value
                      ) : (
                        <><AnimatedCounter end={metric.value} />{metric.suffix}</>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 mb-4">
              <Code2 className="w-4 h-4" />
              <span>Technology Stack</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              Powered by Cutting-Edge Technologies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              We leverage the best tools and frameworks to build robust, scalable applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: 'Frontend',
                icon: Code2,
                technologies: ['React', 'Angular', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
                color: 'from-cyan-500 to-blue-600',
              },
              {
                category: 'Backend',
                icon: Server,
                technologies: ['Node.js', 'ASP.NET Core', 'Python', 'Java', 'GraphQL', 'REST APIs'],
                color: 'from-purple-500 to-pink-600',
              },
              {
                category: 'Mobile Apps',
                icon: Smartphone,
                technologies: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'Xamarin', 'Ionic'],
                color: 'from-pink-500 to-rose-600',
              },
              {
                category: 'Database & AI',
                icon: Database,
                technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'TensorFlow', 'PyTorch', 'OpenAI'],
                color: 'from-green-500 to-teal-600',
              },
            ].map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -30 : index === 2 ? 30 : 0, y: index === 1 ? -30 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stack.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <stack.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl text-slate-900 dark:text-white mb-4">{stack.category}</h3>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.2) + (idx * 0.1), duration: 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              {settings.home.whyChoose.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {settings.home.whyChoose.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.home.whyChoose.features.map((item, index) => {
              const icons = { Innovation: Sparkles, Reliability: Shield, Scalability: Rocket, Speed: Zap };
              const IconComponent = icons[item.title as keyof typeof icons] || Sparkles;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real-Time Performance Metrics */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>{settings.home.performance.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              {settings.home.performance.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {settings.home.performance.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {settings.home.performance.metrics.map((item, index) => {
              const iconMap: Record<string, any> = {
                Clock: Zap,
                CheckCircle2,
                Users,
                Cpu,
              };
              const colorMap = [
                'from-yellow-500 to-orange-600',
                'from-green-500 to-teal-600',
                'from-blue-500 to-purple-600',
                'from-cyan-500 to-blue-600',
              ];
              const IconComponent = iconMap[item.icon] || Zap;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all text-center"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[index]} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter end={item.value} />{item.suffix}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">{item.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              {settings.home.cta.title}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {settings.home.cta.description}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-cyan-600 shadow-lg hover:shadow-2xl transition-all"
              >
                {settings.home.cta.buttonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}