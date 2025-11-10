/**
 * DATABASE INITIALIZATION SCRIPT
 * 
 * This script populates the database with comprehensive sample data:
 * - 6 Categories
 * - 30+ Portfolio Projects
 * - 6 Services
 * 
 * Run this by copying the initialization functions and calling them from the admin dashboard
 */

// ============================================
// CATEGORIES DATA
// ============================================
export const SAMPLE_CATEGORIES = [
  {
    name: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies',
    icon: 'Globe',
  },
  {
    name: 'Mobile Applications',
    description: 'Native iOS and Android apps with seamless user experiences',
    icon: 'Smartphone',
  },
  {
    name: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by artificial intelligence and ML',
    icon: 'Brain',
  },
  {
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and serverless architectures',
    icon: 'Cloud',
  },
  {
    name: 'Enterprise Systems',
    description: 'Large-scale enterprise applications and integrations',
    icon: 'Database',
  },
  {
    name: 'E-Commerce',
    description: 'Complete e-commerce platforms with payment integration',
    icon: 'ShoppingCart',
  },
];

// ============================================
// SERVICES DATA
// ============================================
export const SAMPLE_SERVICES = [
  {
    title: 'Web Development',
    description: 'Build modern, responsive websites and web applications that deliver exceptional user experiences across all devices.',
    features: [
      'Responsive Design',
      'Progressive Web Apps',
      'Single Page Applications',
      'API Integration',
      'Performance Optimization',
      'SEO Best Practices',
    ],
    icon: 'Globe',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Mobile Applications',
    description: 'Create powerful native and cross-platform mobile apps for iOS and Android with seamless performance.',
    features: [
      'iOS Development (Swift)',
      'Android Development (Kotlin)',
      'React Native Apps',
      'Flutter Apps',
      'App Store Deployment',
      'Push Notifications',
    ],
    icon: 'Smartphone',
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Leverage artificial intelligence and machine learning to build intelligent, data-driven solutions.',
    features: [
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'Chatbots & Virtual Assistants',
      'Recommendation Systems',
      'Deep Learning Models',
    ],
    icon: 'Brain',
    color: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Cloud Integration',
    description: 'Design and implement scalable cloud infrastructure with industry-leading providers.',
    features: [
      'AWS Cloud Solutions',
      'Azure Integration',
      'Google Cloud Platform',
      'Serverless Architecture',
      'Microservices',
      'Container Orchestration',
    ],
    icon: 'Cloud',
    color: 'from-blue-500 to-purple-600',
  },
  {
    title: 'UI/UX Design',
    description: 'Create beautiful, intuitive user interfaces that delight users and drive engagement.',
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Design Systems',
      'Usability Testing',
      'Responsive Design',
    ],
    icon: 'Palette',
    color: 'from-green-500 to-teal-600',
  },
  {
    title: 'Maintenance & Support',
    description: 'Ensure your applications run smoothly with comprehensive maintenance and support services.',
    features: [
      '24/7 Monitoring',
      'Bug Fixes & Updates',
      'Performance Optimization',
      'Security Patches',
      'Technical Support',
      'Backup & Recovery',
    ],
    icon: 'Settings',
    color: 'from-orange-500 to-red-600',
  },
];

// ============================================
// PORTFOLIO PROJECTS DATA
// ============================================
export const SAMPLE_PROJECTS = [
  // WEB DEVELOPMENT PROJECTS (10)
  {
    name: 'GlobalTech E-Commerce Platform',
    category: 'Web Development',
    description: 'A comprehensive e-commerce platform serving over 2 million users worldwide with advanced features including real-time inventory management, AI-powered product recommendations, and multi-currency support. Built with React, Node.js, and PostgreSQL.',
    techStack: 'React, Node.js, PostgreSQL, Redis, AWS, Stripe, Elasticsearch',
    demoLink: 'https://example.com/globaltech',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
  },
  {
    name: 'MedConnect Healthcare Portal',
    category: 'Web Development',
    description: 'Secure healthcare management system connecting patients, doctors, and hospitals. Features include appointment scheduling, electronic health records, telemedicine video calls, and HIPAA-compliant data storage.',
    techStack: 'Next.js, Express, MongoDB, Socket.io, WebRTC, AWS S3',
    demoLink: 'https://example.com/medconnect',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
  },
  {
    name: 'EduLearn Learning Management System',
    category: 'Web Development',
    description: 'Complete LMS platform with course management, video streaming, quizzes, certificates, and student progress tracking. Supports 100,000+ concurrent users with optimized CDN delivery.',
    techStack: 'Vue.js, Django, PostgreSQL, Cloudflare, Vimeo API, Stripe',
    demoLink: 'https://example.com/edulearn',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
  },
  {
    name: 'SmartHome IoT Dashboard',
    category: 'Web Development',
    description: 'Real-time IoT dashboard for smart home device management. Monitor and control lighting, temperature, security cameras, and energy consumption from a unified interface.',
    techStack: 'React, FastAPI, InfluxDB, MQTT, WebSocket, Chart.js',
    demoLink: 'https://example.com/smarthome',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
  },
  {
    name: 'FinanceTrack Budget Manager',
    category: 'Web Development',
    description: 'Personal finance management application with bank integration, expense tracking, budget planning, and investment portfolio monitoring. Features AI-powered spending insights.',
    techStack: 'Angular, .NET Core, SQL Server, Plaid API, Chart.js',
    demoLink: 'https://example.com/financetrack',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
  },
  {
    name: 'TravelHub Booking Platform',
    category: 'Web Development',
    description: 'Multi-vendor travel booking platform integrating flights, hotels, and car rentals. Features include dynamic pricing, real-time availability, and instant booking confirmations.',
    techStack: 'React, Node.js, MySQL, Redis, Amadeus API, PayPal',
    demoLink: 'https://example.com/travelhub',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  },
  {
    name: 'SocialConnect Community Platform',
    category: 'Web Development',
    description: 'Social networking platform with real-time messaging, content feeds, groups, events, and live streaming. Supports 500K+ active users with scalable architecture.',
    techStack: 'Next.js, GraphQL, PostgreSQL, Redis, AWS, WebRTC',
    demoLink: 'https://example.com/socialconnect',
    imageUrl: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800',
  },
  {
    name: 'PropertyPro Real Estate Portal',
    category: 'Web Development',
    description: 'Comprehensive real estate platform with property listings, virtual tours, mortgage calculators, and agent matching. Includes map-based search and neighborhood analytics.',
    techStack: 'React, Django, PostgreSQL, Mapbox, Twilio, AWS S3',
    demoLink: 'https://example.com/propertypro',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  },
  {
    name: 'FoodieHub Restaurant Platform',
    category: 'Web Development',
    description: 'Restaurant discovery and food delivery platform with online ordering, table reservations, reviews, and loyalty programs. Integrates with POS systems.',
    techStack: 'Vue.js, Node.js, MongoDB, Stripe, Google Maps API',
    demoLink: 'https://example.com/foodiehub',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
  },
  {
    name: 'JobMatch Career Portal',
    category: 'Web Development',
    description: 'AI-powered job matching platform connecting employers and candidates. Features resume parsing, skill matching, video interviews, and applicant tracking system.',
    techStack: 'React, Spring Boot, PostgreSQL, Elasticsearch, AWS Lambda',
    demoLink: 'https://example.com/jobmatch',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
  },

  // MOBILE APPLICATIONS (10)
  {
    name: 'FitLife Fitness Tracker',
    category: 'Mobile Applications',
    description: 'Comprehensive fitness tracking app with workout plans, nutrition tracking, progress photos, and social features. Integrates with wearable devices and provides personalized AI coaching.',
    techStack: 'React Native, Node.js, MongoDB, HealthKit, Google Fit',
    demoLink: 'https://apps.apple.com/fitlife',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
  },
  {
    name: 'ShopNow Mobile Commerce',
    category: 'Mobile Applications',
    description: 'Feature-rich mobile shopping app with AR product visualization, one-click checkout, price comparison, and personalized recommendations. Supports offline browsing.',
    techStack: 'Flutter, Firebase, ARCore, ARKit, Stripe, GraphQL',
    demoLink: 'https://play.google.com/shopnow',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
  },
  {
    name: 'RideShare Transport App',
    category: 'Mobile Applications',
    description: 'Real-time ride-sharing application for drivers and passengers with live tracking, in-app payments, route optimization, and driver ratings. Serves 50+ cities.',
    techStack: 'Swift, Kotlin, Node.js, PostgreSQL, Google Maps, Socket.io',
    demoLink: 'https://apps.apple.com/rideshare',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
  },
  {
    name: 'MindfulMoments Meditation App',
    category: 'Mobile Applications',
    description: 'Meditation and mindfulness app with guided sessions, sleep stories, breathing exercises, and mood tracking. Features offline downloads and Apple Watch support.',
    techStack: 'Swift, SwiftUI, Firebase, AVFoundation, HealthKit',
    demoLink: 'https://apps.apple.com/mindful',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  },
  {
    name: 'TaskMaster Productivity App',
    category: 'Mobile Applications',
    description: 'Advanced task management and productivity app with Kanban boards, time tracking, team collaboration, and smart reminders. Syncs across all devices.',
    techStack: 'React Native, GraphQL, PostgreSQL, Redux, Push Notifications',
    demoLink: 'https://apps.apple.com/taskmaster',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
  },
  {
    name: 'PetCare Companion',
    category: 'Mobile Applications',
    description: 'Comprehensive pet care app with vet appointments, vaccination reminders, pet health records, and community features. Includes pet identification via image recognition.',
    techStack: 'Flutter, Firebase, TensorFlow Lite, Cloud Vision API',
    demoLink: 'https://play.google.com/petcare',
    imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800',
  },
  {
    name: 'BankPro Mobile Banking',
    category: 'Mobile Applications',
    description: 'Secure mobile banking app with biometric authentication, instant transfers, bill payments, investment tracking, and cardless ATM withdrawals. Bank-grade security.',
    techStack: 'Kotlin, Swift, OAuth2, Fingerprint API, Push Notifications',
    demoLink: 'https://apps.apple.com/bankpro',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
  },
  {
    name: 'PhotoPro Image Editor',
    category: 'Mobile Applications',
    description: 'Professional-grade photo editing app with AI-powered enhancements, filters, layers, and cloud storage. Export to multiple formats and resolutions.',
    techStack: 'Swift, Metal, Core Image, TensorFlow Lite, AWS S3',
    demoLink: 'https://apps.apple.com/photopro',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
  },
  {
    name: 'LanguageLearn Education App',
    category: 'Mobile Applications',
    description: 'Interactive language learning app with speech recognition, gamification, daily challenges, and native speaker conversations. Supports 25+ languages.',
    techStack: 'React Native, Firebase, Speech API, TensorFlow, Stripe',
    demoLink: 'https://apps.apple.com/languagelearn',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
  },
  {
    name: 'EventHub Ticket Platform',
    category: 'Mobile Applications',
    description: 'Event discovery and ticketing app with QR code scanning, seat selection, live event updates, and social sharing. Digital wallet integration for tickets.',
    techStack: 'Flutter, Node.js, MongoDB, QR Scanner, Apple Pay, Google Pay',
    demoLink: 'https://play.google.com/eventhub',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
  },

  // AI & MACHINE LEARNING PROJECTS (6)
  {
    name: 'VisionAI Object Detection System',
    category: 'AI & Machine Learning',
    description: 'Advanced computer vision system for real-time object detection and classification. Used in manufacturing quality control, detecting defects with 99.2% accuracy.',
    techStack: 'Python, TensorFlow, OpenCV, YOLOv8, FastAPI, Docker',
    demoLink: 'https://example.com/visionai',
    imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
  },
  {
    name: 'ChatGenius AI Assistant',
    category: 'AI & Machine Learning',
    description: 'Intelligent chatbot powered by GPT-4 with custom training on company knowledge base. Handles customer support, sales inquiries, and internal help desk.',
    techStack: 'Python, OpenAI API, LangChain, Pinecone, FastAPI, React',
    demoLink: 'https://example.com/chatgenius',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
  },
  {
    name: 'PredictPro Sales Forecasting',
    category: 'AI & Machine Learning',
    description: 'ML-powered sales forecasting system analyzing historical data, market trends, and seasonal patterns. Provides actionable insights for inventory and staffing.',
    techStack: 'Python, Scikit-learn, XGBoost, Pandas, Flask, PostgreSQL',
    demoLink: 'https://example.com/predictpro',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  },
  {
    name: 'VoiceClone Speech Synthesis',
    category: 'AI & Machine Learning',
    description: 'Neural network-based voice cloning system for creating realistic synthetic voices. Used in audiobook production and accessibility applications.',
    techStack: 'Python, PyTorch, Tacotron2, WaveGlow, FastAPI, AWS',
    demoLink: 'https://example.com/voiceclone',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
  },
  {
    name: 'FraudGuard Detection System',
    category: 'AI & Machine Learning',
    description: 'Real-time fraud detection system for financial transactions using anomaly detection and pattern recognition. Reduces fraud by 87% while minimizing false positives.',
    techStack: 'Python, TensorFlow, Kafka, Redis, Elasticsearch, Docker',
    demoLink: 'https://example.com/fraudguard',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
  },
  {
    name: 'HealthPredict Diagnostic AI',
    category: 'AI & Machine Learning',
    description: 'Medical imaging analysis system for early disease detection. Assists radiologists in identifying anomalies in X-rays, MRIs, and CT scans with high accuracy.',
    techStack: 'Python, TensorFlow, ResNet, DICOM, FastAPI, PostgreSQL',
    demoLink: 'https://example.com/healthpredict',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
  },

  // CLOUD SOLUTIONS (4)
  {
    name: 'ScaleCloud Microservices Platform',
    category: 'Cloud Solutions',
    description: 'Enterprise microservices architecture deployed on AWS with auto-scaling, load balancing, and multi-region failover. Handles 10M+ requests/day.',
    techStack: 'Kubernetes, Docker, AWS EKS, Terraform, Prometheus, Grafana',
    demoLink: 'https://example.com/scalecloud',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  },
  {
    name: 'DataLake Analytics Platform',
    category: 'Cloud Solutions',
    description: 'Serverless data lake solution for big data analytics processing petabytes of data. Real-time ETL pipelines with automated data governance.',
    techStack: 'AWS Lambda, S3, Athena, Glue, Redshift, Apache Spark',
    demoLink: 'https://example.com/datalake',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  },
  {
    name: 'SecureVault Cloud Storage',
    category: 'Cloud Solutions',
    description: 'Enterprise-grade encrypted cloud storage solution with end-to-end encryption, versioning, and compliance features. SOC 2 and GDPR compliant.',
    techStack: 'Azure Blob Storage, Key Vault, CDN, .NET Core, React',
    demoLink: 'https://example.com/securevault',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
  },
  {
    name: 'StreamFlow Video Platform',
    category: 'Cloud Solutions',
    description: 'Scalable video streaming platform with adaptive bitrate, CDN distribution, and live streaming capabilities. Supports millions of concurrent viewers.',
    techStack: 'AWS MediaConvert, CloudFront, Lambda, DynamoDB, React',
    demoLink: 'https://example.com/streamflow',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
  },

  // ENTERPRISE SYSTEMS (3)
  {
    name: 'ERPPro Enterprise Resource Planning',
    category: 'Enterprise Systems',
    description: 'Complete ERP system managing inventory, accounting, HR, CRM, and supply chain. Deployed across 50+ corporate locations with 10,000+ users.',
    techStack: 'Java Spring, Oracle DB, Angular, Kafka, Redis, Docker',
    demoLink: 'https://example.com/erppro',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  },
  {
    name: 'SupplyChain Management System',
    category: 'Enterprise Systems',
    description: 'End-to-end supply chain management platform with real-time tracking, automated procurement, vendor management, and predictive analytics.',
    techStack: '.NET Core, SQL Server, React, SignalR, Power BI, Azure',
    demoLink: 'https://example.com/supplychain',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
  },
  {
    name: 'WorkforceHub HR Platform',
    category: 'Enterprise Systems',
    description: 'Comprehensive HRIS with recruitment, onboarding, payroll, performance management, and employee self-service. Integrates with major payroll providers.',
    techStack: 'Django, PostgreSQL, Vue.js, Celery, Redis, AWS',
    demoLink: 'https://example.com/workforcehub',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
  },

  // E-COMMERCE PROJECTS (2)
  {
    name: 'MarketPlace Multi-Vendor Platform',
    category: 'E-Commerce',
    description: 'Large-scale multi-vendor marketplace with vendor dashboards, commission management, dispute resolution, and integrated shipping. Processes $10M+ monthly.',
    techStack: 'Next.js, Node.js, PostgreSQL, Stripe Connect, AWS, Redis',
    demoLink: 'https://example.com/marketplace',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  },
  {
    name: 'FashionHub Luxury E-Commerce',
    category: 'E-Commerce',
    description: 'High-end fashion e-commerce platform with virtual try-on, personal stylist AI, subscription boxes, and VIP member programs. Features AR fitting room.',
    techStack: 'React, GraphQL, MongoDB, Shopify API, ARKit, Stripe',
    demoLink: 'https://example.com/fashionhub',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
  },
];

// ============================================
// INITIALIZATION HELPERS
// ============================================

export function generateProjectCode(): string {
  const prefix = 'PRJ';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function formatProjectForDatabase(project: any, categoryId: string) {
  return {
    code: generateProjectCode(),
    name: project.name,
    categoryId: categoryId,
    description: project.description,
    techStack: project.techStack.split(', '),
    mainImage: project.imageUrl || '',
    additionalImages: [],
    demoLink: project.demoLink || '',
    createdAt: new Date().toISOString(),
  };
}
