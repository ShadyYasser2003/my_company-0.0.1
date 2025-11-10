import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/global';
import { useSettings } from '../hooks/useSettings';
import { InteractiveMap } from '../components/InteractiveMap';
import { projectId } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { SEO } from '../components/SEO';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Import supabase client
      const { supabase } = await import('../utils/supabase/client');
      
      // Save message to database
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            read: false,
          },
        ]);

      if (error) {
        throw error;
      }

      // Success notification
      toast.success('Message Sent Successfully!', {
        description: 'Thank you for reaching out. We\'ll get back to you soon!',
        icon: <CheckCircle className="w-5 h-5" />,
        duration: 5000,
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, settings.contactPage.form.successTimeoutMs);
    } catch (error) {
      console.error('Error saving message:', error);
      
      // Error notification
      toast.error('Failed to Send Message', {
        description: 'Something went wrong. Please try again or contact us directly.',
        icon: <XCircle className="w-5 h-5" />,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = 'Hello! I would like to discuss a project with you.';
    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  const { settings } = useSettings();

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
              {settings.contactPage.hero.titlePrefix}{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {settings.contactPage.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {settings.contactPage.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl text-slate-900 dark:text-white mb-6">
                {settings.contactPage.info.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                {settings.contactPage.info.subtitle}
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: settings.contactPage.info.addressLabel,
                    content: settings.contact.address,
                  },
                  {
                    icon: Phone,
                    title: settings.contactPage.info.phoneLabel,
                    content: settings.contact.phone,
                  },
                  {
                    icon: Mail,
                    title: settings.contactPage.info.emailLabel,
                    content: settings.contact.email,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {settings.contactPage.whatsapp.buttonText}
              </motion.button>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-slate-900 dark:text-white mb-2"
                  >
                    {settings.contactPage.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder={settings.contactPage.form.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-slate-900 dark:text-white mb-2"
                  >
                    {settings.contactPage.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder={settings.contactPage.form.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-slate-900 dark:text-white mb-2"
                  >
                    {settings.contactPage.form.projectTypeLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder={settings.contactPage.form.projectTypePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-900 dark:text-white mb-2"
                  >
                    {settings.contactPage.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder={settings.contactPage.form.messagePlaceholder}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitted || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {settings.contactPage.form.successTitle}
                    </>
                  ) : (
                    <>
                      {settings.contactPage.form.submitButton}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
              {settings.contactPage.map.title}{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {settings.contactPage.map.titleHighlight}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {settings.contactPage.map.description}
            </p>
          </motion.div>

          <InteractiveMap 
            latitude={settings.contact.latitude}
            longitude={settings.contact.longitude}
            address={settings.contact.address}
          />
        </div>
      </section>
    </div>
  );
}