import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { to: '/', text: 'Home' },
    { to: '/features', text: 'Features' },
    { to: '/about', text: 'About' },
    { to: '/dashboard', text: 'Dashboard' }
  ];

  const supportLinks = [
    { href: '/help', text: 'Help Center' },
    { href: '/contact', text: 'Contact Us' },
    { href: '/privacy', text: 'Privacy Policy' },
    { href: '/terms', text: 'Terms of Service' }
  ];

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-glass-border-light dark:border-glass-border-dark">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-lg group-hover:rotate-3 transition-all-custom">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground-light dark:text-foreground-dark">
                Resume<span className="text-primary">Pro</span>
              </span>
            </Link>
            <p className="text-foreground-light/70 dark:text-foreground-dark/70 mb-8 max-w-sm text-base leading-relaxed">
              Empowering job seekers with state-of-the-art AI technology to optimize resumes and accelerate career growth.
            </p>
            <div className="flex space-x-5">
              {['Twitter', 'LinkedIn', 'GitHub'].map((label) => (
                <a
                  key={label}
                  href={`https://${label.toLowerCase()}.com`}
                  className="text-foreground-light/50 dark:text-foreground-dark/50 hover:text-primary transition-all-custom"
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">{label}</span>
                  <div className="w-6 h-6 border-2 border-current rounded-md"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-light dark:text-foreground-dark mb-6">
              Product
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.to} className="text-base text-foreground-light/70 dark:text-foreground-dark/70 hover:text-primary transition-all-custom">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-light dark:text-foreground-dark mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-base text-foreground-light/70 dark:text-foreground-dark/70 hover:text-primary transition-all-custom">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-glass-border-light dark:border-glass-border-dark mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-light/50 dark:text-foreground-dark/50">
            © 2024 ResumePro. All rights reserved.
          </p>
          <div className="flex items-center space-x-8 text-sm text-foreground-light/50 dark:text-foreground-dark/50">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>System Status: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
