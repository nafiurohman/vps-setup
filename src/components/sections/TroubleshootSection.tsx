import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';

const issues = [
  {
    title: 'SSH Connection Refused',
    problem: 'Tidak bisa connect ke VPS via SSH',
    solutions: [
      { label: 'Check firewall', code: 'sudo ufw status' },
      { label: 'Check SSH service', code: 'sudo systemctl status ssh' },
      { label: 'Check SSH port', code: 'sudo netstat -tulpn | grep ssh' },
      { label: 'Check IP address', code: 'ip addr show' },
    ],
  },
  {
    title: 'Nginx 502 Bad Gateway',
    problem: 'Website menampilkan error 502',
    solutions: [
      { label: 'Check PHP-FPM', code: 'sudo systemctl status php8.2-fpm' },
      { label: 'Check error logs', code: 'tail -f /var/log/nginx/error.log' },
      { label: 'Check socket', code: 'ls -la /var/run/php/' },
      { label: 'Restart services', code: 'sudo systemctl restart php8.2-fpm nginx' },
    ],
  },
  {
    title: 'Out of Memory',
    problem: 'Server kehabisan RAM',
    solutions: [
      { label: 'Check memory', code: 'free -h' },
      { label: 'Check processes', code: 'ps aux --sort=-%mem | head' },
      { label: 'Add swap', code: `sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab` },
    ],
  },
  {
    title: 'Permission Denied',
    problem: 'Error permission saat akses file/folder',
    solutions: [
      { label: 'Check ownership', code: 'ls -la /path/to/file' },
      { label: 'Fix ownership', code: 'sudo chown -R user:group /path' },
      { label: 'Fix permissions (files)', code: 'sudo find /path -type f -exec chmod 644 {} \\;' },
      { label: 'Fix permissions (folders)', code: 'sudo find /path -type d -exec chmod 755 {} \\;' },
    ],
  },
  {
    title: 'MySQL Connection Refused',
    problem: 'Tidak bisa connect ke MySQL',
    solutions: [
      { label: 'Check MySQL service', code: 'sudo systemctl status mysql' },
      { label: 'Check MySQL socket', code: 'ls -la /var/run/mysqld/' },
      { label: 'Check MySQL users', code: "sudo mysql -e \"SELECT user, host FROM mysql.user;\"" },
      { label: 'Restart MySQL', code: 'sudo systemctl restart mysql' },
    ],
  },
  {
    title: 'Disk Space Full',
    problem: 'Disk penuh, tidak bisa write file',
    solutions: [
      { label: 'Check disk usage', code: 'df -h' },
      { label: 'Find large files', code: 'sudo du -sh /* | sort -rh | head -10' },
      { label: 'Clean apt cache', code: 'sudo apt clean && sudo apt autoremove -y' },
      { label: 'Clean journal logs', code: 'sudo journalctl --vacuum-time=7d' },
      { label: 'Find large files interactive', code: 'sudo ncdu /' },
    ],
  },
];

export const TroubleshootSection: React.FC = () => {
  return (
    <section id="troubleshoot" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🔧 Troubleshooting</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Solusi untuk masalah umum yang sering ditemui saat setup dan maintenance VPS.
          </p>
        </div>

        {/* Issues */}
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <CollapsibleSection
              key={index}
              title={issue.title}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <AlertCircle size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Problem</h4>
                    <p className="text-sm text-muted-foreground">{issue.problem}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono font-medium text-sm flex items-center gap-2">
                    <HelpCircle size={16} className="text-primary" />
                    Solutions
                  </h4>
                  {issue.solutions.map((solution, sIndex) => (
                    <div key={sIndex}>
                      <p className="text-sm text-muted-foreground mb-1">{solution.label}:</p>
                      <CodeBlock code={solution.code} title={solution.label} />
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>
          ))}
        </div>

        {/* General Tips */}
        <div className="glass rounded-lg p-6 mt-8">
          <h3 className="font-mono font-semibold text-lg mb-4">💡 General Debugging Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm mb-2">Check Logs</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code className="text-primary">journalctl -xe</code> - System logs</li>
                <li>• <code className="text-primary">tail -f /var/log/syslog</code></li>
                <li>• <code className="text-primary">/var/log/nginx/error.log</code></li>
                <li>• <code className="text-primary">/var/log/mysql/error.log</code></li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm mb-2">Check Services</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code className="text-primary">systemctl status [service]</code></li>
                <li>• <code className="text-primary">systemctl restart [service]</code></li>
                <li>• <code className="text-primary">systemctl list-units --failed</code></li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm mb-2">Check Resources</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code className="text-primary">htop</code> - CPU/RAM</li>
                <li>• <code className="text-primary">df -h</code> - Disk space</li>
                <li>• <code className="text-primary">free -h</code> - Memory</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm mb-2">Check Network</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code className="text-primary">netstat -tulpn</code></li>
                <li>• <code className="text-primary">ss -tulpn</code></li>
                <li>• <code className="text-primary">curl -I localhost</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TroubleshootSection;
