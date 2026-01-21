import React from 'react';
import { Server, Github, Mail, Phone, Instagram, ArrowUp, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resources = [
    { name: 'Docker Docs', url: 'https://docs.docker.com/' },
    { name: 'Nginx Docs', url: 'https://nginx.org/en/docs/' },
    { name: 'Ubuntu Docs', url: 'https://help.ubuntu.com/' },
    { name: 'Let\'s Encrypt', url: 'https://letsencrypt.org/docs/' },
    { name: 'GitHub Actions', url: 'https://docs.github.com/en/actions' },
    { name: 'PM2 Docs', url: 'https://pm2.keymetrics.io/docs/' },
  ];

  return (
    <footer className="relative py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Server className="text-primary" size={24} />
              </div>
              <span className="font-mono font-bold text-lg">
                <span className="text-primary">VPS</span> Setup Guide
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              Panduan lengkap untuk setup VPS dari nol hingga production-ready.
              Dibuat dengan ❤️ oleh <span className="text-primary font-medium">bezn.project</span> untuk komunitas DevOps Indonesia.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <a 
                href="mailto:bezn.sup@gmail.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} />
                bezn.sup@gmail.com
              </a>
              <a 
                href="https://wa.me/6285189643588" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={16} />
                +62 851-8964-3588
              </a>
              <a 
                href="https://instagram.com/bezn.project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={16} />
                @bezn.project
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://instagram.com/bezn.project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:bezn.sup@gmail.com"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-semibold mb-4">📚 Menu Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  🏠 Home
                </a>
              </li>
              <li>
                <a href="/preparation" className="text-muted-foreground hover:text-primary transition-colors">
                  📋 Persiapan VPS
                </a>
              </li>
              <li>
                <a href="/setup" className="text-muted-foreground hover:text-primary transition-colors">
                  ⚙️ Setup Guide
                </a>
              </li>
              <li>
                <a href="/database" className="text-muted-foreground hover:text-primary transition-colors">
                  💾 Database
                </a>
              </li>
              <li>
                <a href="/docker" className="text-muted-foreground hover:text-primary transition-colors">
                  🐳 Docker
                </a>
              </li>
              <li>
                <a href="/terminal" className="text-muted-foreground hover:text-primary transition-colors">
                  💻 Terminal Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="font-mono font-semibold mb-4">🔗 Official Docs</h4>
            <ul className="space-y-2 text-sm">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {resource.name}
                    <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p className="flex items-center gap-1 justify-center md:justify-start">
              Made with <Heart size={14} className="text-destructive" /> by{' '}
              <a 
                href="https://instagram.com/bezn.project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                bezn.project
              </a>
            </p>
            <p className="mt-1">
              Last updated: January 2025 • Version 2.0.0
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            <ArrowUp size={16} />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
