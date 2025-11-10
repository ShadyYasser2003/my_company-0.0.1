/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    GLOBAL CONFIGURATION - SOF for Software
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This file contains ALL text content, labels, colors, links and customizable
 * values for the entire website. This is the single source of truth for all
 * configuration.
 * 
 * NOTE: This is the default configuration. Values can be overridden from the
 * admin dashboard and stored in the database. The database values take precedence.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// WhatsApp Helper Function
export function getWhatsAppUrl(message: string = 'Hello! I would like to discuss a project with you.'): string {
  const whatsappNumber = GLOBAL_CONFIG.contact.whatsapp;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

// Main Configuration Object
export const GLOBAL_CONFIG = {
  //  ═══════════════════════════════════════════════════════════════════════════
  //   COMPANY INFORMATION
  //  ═══════════════════════════════════════════════════════════════════════════
  company: {
    name: 'SOF for Software',
    nameShort: 'SOF',
    nameFull: 'SOF for Software Solutions',
    tagline: 'Innovative Technology Solutions',
    taglineExtended: 'Building the Future, One Line of Code at a Time',
    description: 'Leading provider of web, mobile, AI, and cloud solutions',
    descriptionLong: 'We are a global technology company specializing in cutting-edge software development, AI integration, and cloud infrastructure. Our team of experts delivers world-class solutions to businesses worldwide.',
    slogan: 'Transform Your Vision into Reality',
    foundedYear: 2015,
    employeeCount: '50+',
    clientCount: '200+',
    projectCount: '500+',
    countriesServed: '45+',
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   CONTACT INFORMATION
  //  ═══════════════════════════════════════════════════════════════════════════
  contact: {
    email: 'info@sofsoftware.com',
    emailSupport: 'support@sofsoftware.com',
    emailSales: 'sales@sofsoftware.com',
    phone: '+20 122 511 9842',
    phoneFormatted: '+20 122-511-9842',
    phoneInternational: '+20 122 511 9842',
    whatsapp: '201225119842', // No + or spaces!
    address: '123 Tech Boulevard, Innovation District',
    addressLine1: '123 Tech Boulevard',
    addressLine2: 'Innovation District',
    city: 'Cairo',
    country: 'Egypt',
    timezone: 'GMT+2',
    mapShareLink: 'https://maps.google.com/?q=30.0444,31.2357',
    latitude: 30.0444,
    longitude: 31.2357,
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   SOCIAL MEDIA LINKS
  //  ═══════════════════════════════════════════════════════════════════════════
  social: {
    facebook: 'https://facebook.com/sofsoftware',
    twitter: 'https://twitter.com/sofsoftware',
    linkedin: 'https://linkedin.com/company/sof-software',
    github: 'https://github.com/sofsoftware',
    instagram: 'https://instagram.com/sofsoftware',
    youtube: 'https://youtube.com/@sofsoftware',
    discord: 'https://discord.gg/sofsoftware',
    telegram: 'https://t.me/sofsoftware',
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   NAVIGATION
  //  ═══════════════════════════════════════════════════════════════════════════
  navigation: {
    links: [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About' },
      { path: '/services', label: 'Services' },
      { path: '/portfolio', label: 'Portfolio' },
      { path: '/contact', label: 'Contact' },
    ],
    adminLabel: 'Admin Panel',
    adminDashboardLabel: 'Dashboard',
    mobileMenuLabel: 'Menu',
    closeMenuLabel: 'Close',
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   HOME PAGE
  //  ═══════════════════════════════════════════════════════════════════════════
  home: {
    hero: {
      badge: 'Welcome to Innovation',
      badgeIcon: 'Sparkles',
      title: 'Transform Your Business with',
      titleHighlight: 'Cutting-Edge Technology',
      titleFull: 'Transform Your Business with Cutting-Edge Technology',
      description: 'We deliver world-class web, mobile, AI, and cloud solutions that drive growth and innovation for businesses worldwide.',
      descriptionShort: 'Innovation-driven software solutions',
      ctaPrimary: 'Start Your Project',
      ctaPrimaryIcon: true,
      ctaSecondary: 'View Our Work',
      scrollIndicatorText: 'Scroll to explore',
    },
    stats: [
      { value: { value: 500, suffix: '+' }, label: 'Projects Delivered', icon: 'CheckCircle' },
      { value: { value: 50, suffix: '+' }, label: 'Global Clients', icon: 'Users' },
      { value: { value: 99, suffix: '%' }, label: 'Client Satisfaction', icon: 'TrendingUp' },
    ],
    globalPresence: {
      badge: 'Global Reach',
      badgeIcon: 'Globe',
      title: 'Trusted Worldwide',
      description: 'Serving clients across continents with localized support and global expertise',
      metrics: [
        { value: 45, suffix: '+', label: 'Countries', sublabel: 'Active presence' },
        { value: 200, suffix: '+', label: 'Clients', sublabel: 'Worldwide' },
        { value: 24, suffix: '/7', label: 'Support', sublabel: 'Always available' },
      ],
      regions: [
        { name: 'North America', count: '50+' },
        { name: 'Europe', count: '75+' },
        { name: 'Asia Pacific', count: '60+' },
        { name: 'Middle East', count: '15+' },
      ],
    },
    devops: {
      badge: 'DevOps Excellence',
      badgeIcon: 'Workflow',
      title: 'Streamlined Development & Operations',
      description: 'Modern DevOps practices for faster delivery and better reliability',
      capabilities: [
        {
          title: 'Infrastructure as Code',
          description: 'Automated infrastructure provisioning and management',
          features: ['Terraform', 'CloudFormation', 'Ansible'],
          icon: 'Server',
          color: 'from-blue-500 to-cyan-600',
        },
        {
          title: 'Continuous Integration',
          description: 'Automated testing and build pipelines',
          features: ['GitHub Actions', 'Jenkins', 'GitLab CI'],
          icon: 'GitBranch',
          color: 'from-purple-500 to-pink-600',
        },
        {
          title: 'Container Orchestration',
          description: 'Scalable container management',
          features: ['Kubernetes', 'Docker Swarm', 'ECS'],
          icon: 'Package',
          color: 'from-green-500 to-teal-600',
        },
      ],
      metrics: [
        { value: 95, suffix: '%', label: 'Deployment Success Rate' },
        { value: 10, suffix: 'min', label: 'Average Deploy Time' },
        { value: 99.9, suffix: '%', label: 'System Uptime' },
      ],
    },
    cicdPipeline: {
      badge: 'Automated Pipeline',
      badgeIcon: 'GitBranch',
      title: 'Complete CI/CD Pipeline Journey',
      description: 'From code commit to production deployment—fully automated, tested, and secure',
      successTitle: 'Pipeline Complete!',
      successDescription: 'Your application is live in production with zero downtime',
      // CI/CD Pipeline Stages - Fully editable from admin dashboard
      stages: [
        {
          stage: 'Code Commit',
          icon: 'Code2',
          description: 'Developer pushes code to Git repository',
          details: ['Git Push', 'Branch Protection', 'Code Review'],
          color: 'from-cyan-500 to-blue-600',
          position: 'left',
        },
        {
          stage: 'Build & Compile',
          icon: 'Package',
          description: 'Source code is compiled and dependencies are resolved',
          details: ['NPM Install', 'Webpack Build', 'Artifact Creation'],
          color: 'from-blue-500 to-purple-600',
          position: 'right',
        },
        {
          stage: 'Automated Testing',
          icon: 'TestTube',
          description: 'Comprehensive testing suite runs automatically',
          details: ['Unit Tests', 'Integration Tests', 'E2E Tests'],
          color: 'from-purple-500 to-pink-600',
          position: 'left',
        },
        {
          stage: 'Security Scan',
          icon: 'Shield',
          description: 'Code is scanned for vulnerabilities and security issues',
          details: ['SAST', 'Dependency Check', 'License Validation'],
          color: 'from-pink-500 to-rose-600',
          position: 'right',
        },
        {
          stage: 'Quality Gates',
          icon: 'FileCheck',
          description: 'Code quality metrics are validated',
          details: ['Code Coverage', 'Code Smells', 'Technical Debt'],
          color: 'from-orange-500 to-red-600',
          position: 'left',
        },
        {
          stage: 'Container Build',
          icon: 'Server',
          description: 'Application is containerized using Docker',
          details: ['Docker Build', 'Image Tagging', 'Registry Push'],
          color: 'from-yellow-500 to-orange-600',
          position: 'right',
        },
        {
          stage: 'Staging Deploy',
          icon: 'Upload',
          description: 'Application is deployed to staging environment',
          details: ['Kubernetes Deploy', 'Health Checks', 'Smoke Tests'],
          color: 'from-green-500 to-teal-600',
          position: 'left',
        },
        {
          stage: 'Production Release',
          icon: 'CheckCircle',
          description: 'Approved release is deployed to production',
          details: ['Blue-Green Deploy', 'Rollback Ready', 'Monitoring Active'],
          color: 'from-teal-500 to-cyan-600',
          position: 'right',
        },
      ],
      metrics: [
        { value: 15, suffix: 'min', label: 'Build Time' },
        { value: 99, suffix: '%', label: 'Success Rate' },
        { value: 0, suffix: '', label: 'Downtime' },
      ],
    },
    technologies: {
      badge: 'Tech Stack',
      badgeIcon: 'Code2',
      title: 'Cutting-Edge Technologies',
      description: 'We use the latest tools and frameworks to build robust solutions',
      categories: [
        {
          name: 'Frontend',
          icon: 'Smartphone',
          technologies: ['React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'Tailwind CSS'],
          color: 'from-cyan-500 to-blue-600',
        },
        {
          name: 'Backend',
          icon: 'Server',
          technologies: ['Node.js', 'Python', 'Java', 'Go', 'PHP', 'Ruby'],
          color: 'from-green-500 to-teal-600',
        },
        {
          name: 'Cloud & DevOps',
          icon: 'Cloud',
          technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
          color: 'from-purple-500 to-pink-600',
        },
        {
          name: 'Database',
          icon: 'Database',
          technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch'],
          color: 'from-orange-500 to-red-600',
        },
      ],
    },
    whyChoose: {
      badge: 'Why Choose Us',
      badgeIcon: 'Star',
      title: 'Excellence in Every Project',
      description: 'What sets us apart from the competition',
      features: [
        {
          title: 'Expert Team',
          description: 'Seasoned professionals with years of experience',
          icon: 'Users',
          color: 'from-cyan-500 to-blue-600',
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock assistance whenever you need',
          icon: 'Clock',
          color: 'from-green-500 to-teal-600',
        },
        {
          title: 'Agile Methodology',
          description: 'Flexible and iterative development approach',
          icon: 'Zap',
          color: 'from-purple-500 to-pink-600',
        },
        {
          title: 'Security First',
          description: 'Enterprise-grade security in every solution',
          icon: 'Shield',
          color: 'from-orange-500 to-red-600',
        },
      ],
    },
    performance: {
      badge: 'Performance',
      badgeIcon: 'Zap',
      title: 'Built for Speed & Scale',
      description: 'Optimized for maximum performance',
      metrics: [
        {
          value: 99.9,
          suffix: '%',
          label: 'Uptime',
          icon: 'Activity',
          description: 'Guaranteed reliability',
        },
        {
          value: 200,
          suffix: 'ms',
          label: 'Response Time',
          icon: 'Zap',
          description: 'Lightning fast',
        },
        {
          value: 1,
          suffix: 'M+',
          label: 'Requests/Day',
          icon: 'TrendingUp',
          description: 'Handles scale',
        },
      ],
    },
    cta: {
      badge: 'Ready to Start?',
      title: 'Let\'s Build Something Amazing',
      titleAlt: 'Transform Your Ideas into Reality',
      description: 'Get in touch with our team to discuss your project',
      descriptionAlt: 'Schedule a free consultation today',
      buttonText: 'Start Your Project',
      buttonTextAlt: 'Contact Us',
      buttonIcon: true,
    },
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   ABOUT PAGE
  //  ═══════════════════════════════════════════════════════════════════════════
  about: {
    hero: {
      badge: 'About Us',
      badgeIcon: 'Users',
      title: 'About',
      titlePrefix: 'Innovating for',
      titleHighlight: 'Tomorrow',
      description: 'We are a team of passionate technologists building the future',
      descriptionExtended: 'Founded in 2015, we have grown into a global technology leader',
    },
    mission: {
      title: 'Our Mission',
      icon: 'Target',
      description: 'To empower businesses through innovative technology solutions',
      descriptionShort: 'Empower through innovation',
    },
    vision: {
      title: 'Our Vision',
      icon: 'Eye',
      description: 'To be the world\'s most trusted technology partner',
      descriptionShort: 'Trusted technology partner',
    },
    values: [
      {
        title: 'Innovation',
        description: 'Constantly pushing the boundaries of what\'s possible',
        icon: 'Lightbulb',
        color: 'from-cyan-500 to-blue-600',
      },
      {
        title: 'Excellence',
        description: 'Delivering the highest quality in everything we do',
        icon: 'Award',
        color: 'from-purple-500 to-pink-600',
      },
      {
        title: 'Integrity',
        description: 'Building trust through transparency and honesty',
        icon: 'Shield',
        color: 'from-green-500 to-teal-600',
      },
    ],
    team: {
      title: 'Meet Our Team',
      titleAlt: 'The People Behind the Code',
      description: 'Talented professionals dedicated to your success',
      descriptionExtended: 'Our diverse team brings together expertise from around the world',
      icon: 'Users',
    },
    stats: [
      { value: 50, suffix: '+', label: 'Team Members', icon: 'Users' },
      { value: 500, suffix: '+', label: 'Projects Completed', icon: 'CheckCircle' },
      { value: 45, suffix: '+', label: 'Countries Served', icon: 'Globe' },
      { value: 99, suffix: '%', label: 'Success Rate', icon: 'TrendingUp' },
    ],
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   SERVICES PAGE
  //  ═══════════════════════════════════════════════════════════════════════════
  services: {
    hero: {
      badge: 'Our Services',
      badgeIcon: 'Briefcase',
      title: 'Services We',
      titleHighlight: 'Offer',
      description: 'Comprehensive technology solutions for your business',
    },
    fallbackServices: [
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern frameworks',
        features: ['Responsive Design', 'Progressive Web Apps', 'E-commerce Solutions'],
        icon: 'Globe',
        color: 'from-cyan-500 to-blue-600',
      },
      {
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile applications',
        features: ['iOS & Android', 'React Native', 'Flutter Development'],
        icon: 'Smartphone',
        color: 'from-purple-500 to-pink-600',
      },
      {
        title: 'AI & Machine Learning',
        description: 'Intelligent solutions powered by artificial intelligence',
        features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
        icon: 'Brain',
        color: 'from-orange-500 to-red-600',
      },
      {
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and services',
        features: ['AWS, Azure, GCP', 'Migration Services', 'Cloud Optimization'],
        icon: 'Cloud',
        color: 'from-green-500 to-teal-600',
      },
    ],
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   PORTFOLIO PAGE
  //  ═══════════════════════════════════════════════════════════════════════════
  portfolio: {
    hero: {
      badge: 'Our Work',
      badgeIcon: 'Briefcase',
      title: 'Featured',
      titleHighlight: 'Projects',
      description: 'Showcasing our best work and client success stories',
    },
    filters: {
      all: 'All Projects',
      web: 'Web Development',
      mobile: 'Mobile Apps',
      ai: 'AI & ML',
      cloud: 'Cloud Solutions',
    },
    viewProject: 'View Project',
    viewDetails: 'View Details',
    backToPortfolio: 'Back to Portfolio',
    emptyState: 'No projects found',
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   CONTACT PAGE
  //  ═══════════════════════════════════════════════════════════════════════════
  contactPage: {
    hero: {
      titlePrefix: 'Get in',
      titleHighlight: 'Touch',
      description: 'Have a project in mind? Let\'s discuss how we can help',
    },
    info: {
      title: 'Contact Information',
      subtitle: 'Reach out to us through any of these channels',
      addressLabel: 'Our Office',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address',
    },
    whatsapp: {
      buttonText: 'Chat on WhatsApp',
      defaultMessage: 'Hello! I would like to discuss a project with you.',
    },
    form: {
      nameLabel: 'Full Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'john@example.com',
      projectTypeLabel: 'Project Type',
      projectTypePlaceholder: 'Web Development, Mobile App, etc.',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Tell us about your project...',
      submitButton: 'Send Message',
      successTitle: 'Message Sent!',
      successMessage: 'Thank you for reaching out. We\'ll get back to you soon!',
      errorTitle: 'Failed to Send',
      errorMessage: 'Something went wrong. Please try again.',
      successTimeoutMs: 3000,
    },
    map: {
      title: 'Visit Our',
      titleHighlight: 'Office',
      description: 'Find us at our headquarters or schedule a virtual meeting',
    },
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   ADMIN PANEL
  //  ═══════════════════════════════════════════════════════════════════════════
  admin: {
    login: {
      title: 'Admin',
      loginSubtitle: 'Sign in to your admin account',
      signupSubtitle: 'Create a new admin account',
      emailLabel: 'Email',
      emailPlaceholder: 'admin@sofsoftware.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      nameLabel: 'Full Name',
      namePlaceholder: 'John Doe',
      loginButton: 'Sign In',
      signupButton: 'Create Account',
      switchToSignup: 'Don\'t have an account? Sign up',
      switchToLogin: 'Already have an account? Login',
      backToHome: 'Back to Home',
      processing: 'Processing...',
      signupSuccessMessage: 'Account created successfully! Please log in.',
    },
    navigation: {
      dashboard: 'Dashboard',
      categories: 'Categories',
      projects: 'Projects',
      services: 'Services',
      messages: 'Messages',
      settings: 'Settings',
      dataInitializer: 'Data Initializer',
      logout: 'Logout',
    },
  },

  //  ═══════════════════════════════════════════════════════════════════════════
  //   FOOTER
  //  ═══════════════════════════════════════════════════════════════════════════
  footer: {
    companySection: {
      title: 'About SOF',
      description: 'Leading technology solutions provider',
    },
    quickLinks: {
      title: 'Quick Links',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    contact: {
      title: 'Contact Us',
    },
    social: {
      title: 'Follow Us',
    },
    copyright: '© 2025 SOF for Software. All rights reserved.',
    developedBy: 'Developed with',
    developedByLink: 'SOF Team',
  },
};
