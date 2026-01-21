import React, { useState, useEffect } from 'react';
import { Server, Search, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearch: (query: string) => void;
  scrollProgress: number;
}

const menuItems = [
  { id: 'home', label: 'Home' },
  { id: 'preparation', label: 'Persiapan' },
  { id: 'setup', label: 'Setup Guide' },
  { id: 'security', label: 'Security' },
  { id: 'database', label: 'Database' },
  { id: 'webserver', label: 'Web Server' },
  { id: 'docker', label: 'Docker' },
  { id: 'tools', label: 'Tools' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
];

export const Header: React.FC<HeaderProps> = ({ onSearch, scrollProgress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-strong shadow-lg" : "bg-transparent"
      )}
    >
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 group"
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Server className="text-primary" size={24} />
            </div>
            <span className="font-mono font-bold text-lg hidden sm:block">
              <span className="text-primary">VPS</span> Setup Guide
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="hidden md:block">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </form>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 glass-strong border-t border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </form>

          {/* Mobile Nav Items */}
          <nav className="grid grid-cols-2 gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-3 text-sm text-left rounded-lg hover:bg-muted transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
