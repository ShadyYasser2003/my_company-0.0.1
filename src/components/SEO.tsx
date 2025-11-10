import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEO({
  title = 'SOF for Software - Innovative Technology Solutions',
  description = 'Leading global technology company offering web, mobile, AI, and cloud-based solutions. Transform your vision into reality with cutting-edge software development.',
  keywords = 'software development, web development, mobile apps, AI solutions, cloud computing, technology company, custom software, digital transformation, IT services, enterprise solutions',
  image = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  url = 'https://sof4software.com',
  type = 'website',
  author = 'SOF 4 Software',
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    const currentUrl = `${url}${location.pathname}`;

    // Standard Meta Tags
    updateMetaTag('description', description, true);
    updateMetaTag('keywords', keywords, true);
    updateMetaTag('author', author, true);
    updateMetaTag('robots', 'index, follow', true);
    updateMetaTag('googlebot', 'index, follow', true);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0', true);
    updateMetaTag('theme-color', '#0891b2', true);

    // Open Graph Meta Tags (Facebook, LinkedIn)
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'SOF for Software');
    updateMetaTag('og:locale', 'en_US');

    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:site', '@SOFsoftware', true);
    updateMetaTag('twitter:creator', '@SOFsoftware', true);

    // Article specific tags
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime);
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime);
    }

    // Additional SEO tags
    updateMetaTag('application-name', 'SOF for Software', true);
    updateMetaTag('apple-mobile-web-app-title', 'SOF', true);
    updateMetaTag('apple-mobile-web-app-capable', 'yes', true);
    updateMetaTag('mobile-web-app-capable', 'yes', true);
    updateMetaTag('format-detection', 'telephone=no', true);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, location.pathname]);

  return null;
}

// Structured Data Helper
export function addStructuredData(data: object) {
  useEffect(() => {
    let script = document.querySelector('script[type="application/ld+json"]');
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(data);

    return () => {
      script?.remove();
    };
  }, [data]);

  return null;
}

// Organization Structured Data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SOF for Software',
  alternateName: 'SOF',
  url: 'https://sofsoftware.com',
  logo: 'https://sofsoftware.com/logo.png',
  description: 'Leading global technology company offering web, mobile, AI, and cloud-based solutions.',
  foundingDate: '2015',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-234-567-8900',
    contactType: 'customer service',
    email: 'info@sofsoftware.com',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Arabic'],
  },
  sameAs: [
    'https://www.linkedin.com/company/sofsoftware',
    'https://twitter.com/SOFsoftware',
    'https://github.com/sofsoftware',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Multiple Locations Worldwide',
  },
};

// Website Structured Data
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SOF for Software',
  url: 'https://sofsoftware.com',
  description: 'Leading global technology company offering web, mobile, AI, and cloud-based solutions.',
  publisher: {
    '@type': 'Organization',
    name: 'SOF for Software',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://sofsoftware.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};
