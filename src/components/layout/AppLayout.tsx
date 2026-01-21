import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Server, Home, Settings, Database, Globe, Container, Wrench, 
  AlertTriangle, CheckSquare, Terminal, GitBranch, ChevronLeft,
  ChevronRight, Search, Menu, X, BookOpen, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { id: '/', label: 'Home', icon: Home, description: 'Overview & intro' },
  { id: '/preparation', label: 'Persiapan', icon: Settings, description: 'Pilih VPS & resource' },
  { id: '/setup', label: 'Setup Guide', icon: Terminal, description: 'Langkah-langkah setup' },
  { id: '/security', label: 'Security', icon: Shield, description: 'Firewall & hardening' },
  { id: '/database', label: 'Database', icon: Database, description: 'MySQL, PostgreSQL, Redis' },
  { id: '/webserver', label: 'Web Server', icon: Globe, description: 'Nginx, SSL, PHP, Node' },
  { id: '/docker', label: 'Docker', icon: Container, description: 'Containerization' },
  { id: '/cicd', label: 'CI/CD', icon: GitBranch, description: 'GitHub Actions & GitLab' },
  { id: '/tools', label: 'Tools & Scripts', icon: Wrench, description: 'Backup, deploy, monitor' },
  { id: '/terminal', label: 'Terminal Lab', icon: Terminal, description: 'Praktik command' },
  { id: '/troubleshoot', label: 'Troubleshooting', icon: AlertTriangle, description: 'Solusi masalah' },
  { id: '/checklist', label: 'Final Checklist', icon: CheckSquare, description: 'Production ready' },
];

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 border-r border-border bg-card/50 backdrop-blur-sm transition-all duration-300 z-40",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Server className="text-primary" size={20} />
              </div>
              <span className="font-mono font-bold text-sm">
                <span className="text-primary">VPS</span> Guide
              </span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="p-2 rounded-lg bg-primary/10 mx-auto">
              <Server className="text-primary" size={20} />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-muted border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <div className="space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon size={18} className={cn(isActive && "text-primary")} />
                  {!sidebarCollapsed && (
                    <div className="flex flex-col items-start">
                      <span className={cn("font-medium", isActive && "text-primary")}>
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen size={14} />
              <span>by <a href="https://nafiurohman.pages.dev">M. Nafiurohman</a></span>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Header & Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        {/* Mobile Header */}
        <header className="h-14 glass-strong border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Server className="text-primary" size={18} />
            </div>
            <span className="font-mono font-bold text-sm">
              <span className="text-primary">VPS</span> Guide
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Progress Bar */}
        <div className="h-0.5 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "absolute top-full left-0 right-0 glass-strong border-b border-border transition-all duration-300 overflow-hidden",
            mobileMenuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="p-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            {/* Mobile Nav */}
            <nav className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
              {filteredMenuItems.map((item) => {
                const isActive = location.pathname === item.id;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg text-left transition-all",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen lg:min-h-0">
        {/* Desktop Progress Bar */}
        <div className="hidden lg:block fixed top-0 left-0 right-0 h-1 bg-muted z-30">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        {/* Content with padding for mobile header */}
        <div className="pt-16 lg:pt-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
