import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Target, Eye, Award, Users, Sparkles, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useSettings } from '../hooks/useSettings';
import { SEO } from '../components/SEO';

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

export function About() {
  const { settings } = useSettings();
  
  return (
    <>
      <SEO
        title="About Us - SOF for Software | Our Mission, Vision & Global Team"
        description="Learn about SOF for Software, a leading global technology company with 50+ experts, 500+ successful projects, and operations in 45+ countries. Discover our mission to transform businesses through innovative software solutions."
        keywords="about SOF software, technology company, software development team, IT consulting company, global technology solutions, enterprise software, company mission, company vision"
        type="website"
      />
      <AboutContent settings={settings} />
    </>
  );
}

function AboutContent({ settings }: { settings: any }) {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower businesses with innovative software solutions that drive growth and transformation.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the global leader in intelligent software development, shaping the future of technology.',
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Excellence, integrity, innovation, and customer success are at the core of everything we do.',
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A diverse group of experts passionate about creating world-class software solutions.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
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
              {settings.about.hero.titlePrefix}{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {settings.about.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {settings.about.hero.descriptionExtended}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl text-slate-900 dark:text-white mb-6">
                {settings.about.mission.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {settings.about.mission.description}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {settings.about.vision.description}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {settings.about.team.descriptionExtended}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl blur-3xl" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NjE3NDI0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Core Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              These principles guide everything we do and shape our relationships with clients, partners, and team members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.about.values.map((value, index) => {
              const iconMap: Record<string, any> = {
                'Innovation First': Sparkles,
                'Client Success': Target,
                'Quality Excellence': Award,
                'Transparency': Shield,
                'Our Mission': Target,
                'Our Vision': Eye,
                'Our Values': Award,
                'Our Team': Users,
              };
              const Icon = iconMap[value.title] || Award;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {settings.about.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-2">
                  <AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
                </div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}