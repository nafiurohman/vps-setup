import React from 'react';
import { Shield, Server, Activity, Zap } from 'lucide-react';
import InteractiveChecklist from '../ui/InteractiveChecklist';

const securityChecklist = [
  { id: 'ssh-key', label: 'SSH key authentication enabled', description: 'Password login disabled' },
  { id: 'root-disabled', label: 'Root login disabled', description: 'PermitRootLogin no in sshd_config' },
  { id: 'firewall', label: 'Firewall configured and enabled', description: 'UFW with proper rules' },
  { id: 'fail2ban', label: 'Fail2Ban installed and configured', description: 'Brute force protection active' },
  { id: 'ssl', label: 'SSL/TLS certificates installed', description: "Let's Encrypt or similar" },
  { id: 'auto-updates', label: 'Automatic security updates enabled', description: 'unattended-upgrades configured' },
  { id: 'strong-passwords', label: 'Strong passwords for all services', description: 'Database, apps, etc.' },
  { id: 'backups', label: 'Regular backups scheduled', description: 'Cron jobs for database & files' },
];

const servicesChecklist = [
  { id: 'nginx', label: 'Nginx installed and configured', description: 'Web server running' },
  { id: 'database', label: 'Database installed and secured', description: 'MySQL/PostgreSQL ready' },
  { id: 'php-node', label: 'PHP/Node.js installed (if needed)', description: 'Runtime environment ready' },
  { id: 'docker', label: 'Docker installed (if needed)', description: 'Container runtime ready' },
  { id: 'redis', label: 'Redis/cache configured (if needed)', description: 'Caching layer active' },
];

const monitoringChecklist = [
  { id: 'log-rotation', label: 'Log rotation configured', description: 'Prevent disk full from logs' },
  { id: 'monitoring-tools', label: 'Monitoring tools installed', description: 'htop, netdata, etc.' },
  { id: 'backup-tested', label: 'Backup scripts tested', description: 'Verify restore works' },
  { id: 'alerts', label: 'Alert system configured', description: 'Email or Slack notifications' },
];

const performanceChecklist = [
  { id: 'timezone', label: 'Server timezone set correctly', description: 'timedatectl set-timezone' },
  { id: 'ntp', label: 'NTP synchronized', description: 'Time sync enabled' },
  { id: 'swap', label: 'Swap configured (if needed)', description: 'For low RAM servers' },
  { id: 'db-optimized', label: 'Database optimized', description: 'Buffer pool, connections, etc.' },
  { id: 'caching', label: 'Caching configured', description: 'Redis, OPcache, etc.' },
];

export const FinalChecklistSection: React.FC = () => {
  return (
    <section id="final-checklist" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">✅ Final Checklist</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pastikan semua item sudah dicek sebelum server production-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Security */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-primary" size={24} />
              <h3 className="font-mono font-semibold text-lg">Security</h3>
            </div>
            <InteractiveChecklist
              title="🔒 Security Checklist"
              items={securityChecklist}
              storageKey="vps-security-checklist"
            />
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Server className="text-secondary" size={24} />
              <h3 className="font-mono font-semibold text-lg">Services</h3>
            </div>
            <InteractiveChecklist
              title="🖥️ Services Checklist"
              items={servicesChecklist}
              storageKey="vps-services-checklist"
            />
          </div>

          {/* Monitoring */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-primary" size={24} />
              <h3 className="font-mono font-semibold text-lg">Monitoring</h3>
            </div>
            <InteractiveChecklist
              title="📊 Monitoring Checklist"
              items={monitoringChecklist}
              storageKey="vps-monitoring-checklist"
            />
          </div>

          {/* Performance */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-secondary" size={24} />
              <h3 className="font-mono font-semibold text-lg">Performance</h3>
            </div>
            <InteractiveChecklist
              title="⚡ Performance Checklist"
              items={performanceChecklist}
              storageKey="vps-performance-checklist"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalChecklistSection;
