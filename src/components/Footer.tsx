import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useSettings } from '../hooks/useSettings';

export function Footer() {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: settings.social.facebook, label: 'Facebook' },
    { icon: Twitter, href: settings.social.twitter, label: 'Twitter' },
    { icon: Linkedin, href: settings.social.linkedin, label: 'LinkedIn' },
    { icon: Github, href: settings.social.github, label: 'Github' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Code2 className="w-8 h-8 text-cyan-500" />
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl animate-pulse" />
              </div>
              <span className="text-slate-900 dark:text-white tracking-tight">
                <span className="font-semibold">{settings.company.nameShort}</span> for Software
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {settings.footer.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white mb-4">{settings.footer.quickLinksTitle}</h3>
            <ul className="space-y-2">
              {settings.footer.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white mb-4">{settings.footer.servicesTitle}</h3>
            <ul className="space-y-2">
              {settings.footer.servicesList.map((service) => (
                <li key={service} className="text-slate-600 dark:text-slate-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-900 dark:text-white mb-4">{settings.footer.contactTitle}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>{settings.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>{settings.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>{settings.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 dark:text-slate-400 text-center md:text-left">
              © {currentYear} {settings.footer.legal.copyright}
            </p>
            <div className="flex gap-6 text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-cyan-500 transition-colors">
                {settings.footer.legal.privacyPolicy}
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                {settings.footer.legal.termsOfService}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}