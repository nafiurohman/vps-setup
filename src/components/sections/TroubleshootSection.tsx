import React, { useState } from 'react';
import { AlertCircle, HelpCircle, Terminal, Search, Wrench, Shield, Database, Globe } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const troubleshootTabs = ['Common Issues', 'Performance', 'Security', 'Monitoring'] as const;

const commonIssues = [
  {
    title: 'SSH Connection Refused',
    category: 'SSH',
    problem: 'Tidak bisa connect ke VPS via SSH',
    symptoms: ['Connection refused', 'Connection timeout', 'No route to host'],
    solutions: [
      { label: 'Check SSH service status', code: 'sudo systemctl status ssh\nsudo systemctl start ssh' },
      { label: 'Check firewall rules', code: 'sudo ufw status\nsudo ufw allow 22/tcp' },
      { label: 'Check SSH port', code: 'sudo netstat -tulpn | grep :22\nss -tulpn | grep :22' },
      { label: 'Check SSH config', code: 'sudo nano /etc/ssh/sshd_config\n# Pastikan Port 22 tidak dikomentari' },
      { label: 'Restart SSH service', code: 'sudo systemctl restart ssh' },
    ],
  },
  {
    title: 'Nginx 502 Bad Gateway',
    category: 'Web Server',
    problem: 'Website menampilkan error 502 Bad Gateway',
    symptoms: ['502 Bad Gateway', 'upstream prematurely closed connection', 'connect() failed'],
    solutions: [
      { label: 'Check PHP-FPM status', code: 'sudo systemctl status php8.2-fpm\nsudo systemctl start php8.2-fpm' },
      { label: 'Check Nginx error logs', code: 'tail -f /var/log/nginx/error.log\ntail -f /var/log/nginx/myapp_error.log' },
      { label: 'Check PHP-FPM socket', code: 'ls -la /var/run/php/\nsudo chmod 666 /var/run/php/php8.2-fpm.sock' },
      { label: 'Test Nginx config', code: 'sudo nginx -t' },
      { label: 'Restart services', code: 'sudo systemctl restart php8.2-fpm nginx' },
      { label: 'Check upstream servers', code: '# Jika menggunakan reverse proxy\ncurl -I http://localhost:3000' },
    ],
  },
  {
    title: 'Out of Memory (OOM)',
    category: 'System',
    problem: 'Server kehabisan RAM, aplikasi crash atau lambat',
    symptoms: ['Killed', 'Out of memory', 'Cannot allocate memory', 'Process terminated'],
    solutions: [
      { label: 'Check memory usage', code: 'free -h\nps aux --sort=-%mem | head -10' },
      { label: 'Check OOM killer logs', code: 'dmesg | grep -i "killed process"\njournalctl -k | grep -i "out of memory"' },
      { label: 'Add swap space', code: `# Create 2GB swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab` },
      { label: 'Optimize applications', code: `# PHP memory limit
sudo nano /etc/php/8.2/fpm/php.ini
# memory_limit = 128M

# MySQL memory
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
# innodb_buffer_pool_size = 512M` },
    ],
  },
  {
    title: 'Permission Denied',
    category: 'File System',
    problem: 'Error permission saat akses file/folder',
    symptoms: ['Permission denied', 'Access denied', '403 Forbidden'],
    solutions: [
      { label: 'Check file ownership', code: 'ls -la /path/to/file\nls -la /home/deploy/apps/' },
      { label: 'Fix ownership (web files)', code: 'sudo chown -R www-data:www-data /home/deploy/apps/myapp/storage\nsudo chown -R www-data:www-data /home/deploy/apps/myapp/bootstrap/cache' },
      { label: 'Fix permissions (files)', code: 'sudo find /home/deploy/apps/myapp -type f -exec chmod 644 {} \\;' },
      { label: 'Fix permissions (directories)', code: 'sudo find /home/deploy/apps/myapp -type d -exec chmod 755 {} \\;' },
      { label: 'Laravel specific permissions', code: 'sudo chmod -R 775 /home/deploy/apps/myapp/storage\nsudo chmod -R 775 /home/deploy/apps/myapp/bootstrap/cache' },
    ],
  },
  {
    title: 'MySQL Connection Refused',
    category: 'Database',
    problem: 'Tidak bisa connect ke MySQL database',
    symptoms: ['Connection refused', 'Access denied', 'Can\'t connect to MySQL server'],
    solutions: [
      { label: 'Check MySQL service', code: 'sudo systemctl status mysql\nsudo systemctl start mysql' },
      { label: 'Check MySQL socket', code: 'ls -la /var/run/mysqld/\nsudo chmod 755 /var/run/mysqld/' },
      { label: 'Check MySQL users', code: `sudo mysql -e "SELECT user, host FROM mysql.user;"\nsudo mysql -e "SHOW GRANTS FOR 'myapp_user'@'localhost';"` },
      { label: 'Reset MySQL password', code: `# Stop MySQL
sudo systemctl stop mysql

# Start in safe mode
sudo mysqld_safe --skip-grant-tables &

# Reset password
mysql -u root
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
EXIT;

# Restart normally
sudo systemctl restart mysql` },
      { label: 'Check MySQL config', code: 'sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf\n# bind-address = 127.0.0.1' },
    ],
  },
  {
    title: 'Disk Space Full',
    category: 'System',
    problem: 'Disk penuh, tidak bisa write file',
    symptoms: ['No space left on device', 'Disk full', 'Write failed'],
    solutions: [
      { label: 'Check disk usage', code: 'df -h\ndu -sh /* | sort -rh | head -10' },
      { label: 'Find large files', code: 'sudo find / -type f -size +100M -exec ls -lh {} \\; | head -20\nsudo ncdu /' },
      { label: 'Clean system files', code: 'sudo apt clean\nsudo apt autoremove -y\nsudo journalctl --vacuum-time=7d' },
      { label: 'Clean log files', code: 'sudo find /var/log -name "*.log" -type f -size +50M\nsudo logrotate -f /etc/logrotate.conf' },
      { label: 'Clean Docker (if installed)', code: 'docker system prune -a\ndocker volume prune' },
      { label: 'Clean temp files', code: 'sudo rm -rf /tmp/*\nsudo rm -rf /var/tmp/*' },
    ],
  },
  {
    title: 'High CPU Usage',
    category: 'Performance',
    problem: 'CPU usage tinggi, server lambat',
    symptoms: ['High load average', 'Slow response', 'CPU 100%'],
    solutions: [
      { label: 'Check CPU usage', code: 'htop\ntop -c\nps aux --sort=-%cpu | head -10' },
      { label: 'Check load average', code: 'uptime\nw' },
      { label: 'Find CPU-intensive processes', code: 'ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -20' },
      { label: 'Check for runaway processes', code: 'pgrep -f "process_name"\npkill -f "process_name"' },
      { label: 'Analyze with iotop', code: 'sudo iotop -o' },
    ],
  },
  {
    title: 'SSL Certificate Issues',
    category: 'Security',
    problem: 'SSL certificate error atau expired',
    symptoms: ['Certificate expired', 'SSL handshake failed', 'NET::ERR_CERT_DATE_INVALID'],
    solutions: [
      { label: 'Check certificate status', code: 'sudo certbot certificates\nopenssl x509 -in /etc/letsencrypt/live/yourdomain.com/cert.pem -text -noout' },
      { label: 'Renew certificate', code: 'sudo certbot renew\nsudo certbot renew --force-renewal' },
      { label: 'Test SSL configuration', code: 'openssl s_client -connect yourdomain.com:443\ncurl -I https://yourdomain.com' },
      { label: 'Check Nginx SSL config', code: 'sudo nginx -t\ngrep -r "ssl_certificate" /etc/nginx/' },
      { label: 'Restart web server', code: 'sudo systemctl restart nginx' },
    ],
  },
];

const performanceIssues = [
  {
    title: 'Slow Website Loading',
    solutions: [
      { label: 'Enable Gzip compression', code: `# Add to Nginx config
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;` },
      { label: 'Enable browser caching', code: `# Add to Nginx config
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}` },
      { label: 'Optimize images', code: 'sudo apt install imagemagick\nmogrify -strip -interlace Plane -gaussian-blur 0.05 -quality 85% *.jpg' },
      { label: 'Enable OPcache (PHP)', code: `# In php.ini
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=10000` },
    ],
  },
  {
    title: 'Database Performance',
    solutions: [
      { label: 'Analyze slow queries', code: `# Enable slow query log
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
# slow_query_log = 1
# slow_query_log_file = /var/log/mysql/slow.log
# long_query_time = 2` },
      { label: 'Optimize MySQL config', code: `# Add to my.cnf
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
query_cache_size = 0
max_connections = 200` },
      { label: 'Check database indexes', code: `mysql -u root -p
USE myapp;
SHOW INDEX FROM table_name;
EXPLAIN SELECT * FROM table_name WHERE column = 'value';` },
    ],
  },
];

const securityIssues = [
  {
    title: 'Suspicious Login Attempts',
    solutions: [
      { label: 'Check auth logs', code: 'sudo tail -f /var/log/auth.log\ngrep "Failed password" /var/log/auth.log | tail -20' },
      { label: 'Check Fail2Ban status', code: 'sudo fail2ban-client status\nsudo fail2ban-client status sshd' },
      { label: 'Block suspicious IPs', code: 'sudo ufw deny from 192.168.1.100\nsudo fail2ban-client set sshd banip 192.168.1.100' },
      { label: 'Review SSH config', code: 'sudo nano /etc/ssh/sshd_config\n# PermitRootLogin no\n# PasswordAuthentication no' },
    ],
  },
  {
    title: 'Malware Detection',
    solutions: [
      { label: 'Install ClamAV', code: 'sudo apt install clamav clamav-daemon\nsudo freshclam\nsudo systemctl start clamav-daemon' },
      { label: 'Scan for malware', code: 'sudo clamscan -r /home/deploy/apps/\nsudo clamscan -r --infected --remove /var/www/' },
      { label: 'Check for rootkits', code: 'sudo apt install rkhunter\nsudo rkhunter --update\nsudo rkhunter --check' },
    ],
  },
];

export const TroubleshootSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof troubleshootTabs[number]>('Common Issues');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = commonIssues.filter(issue => 
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="troubleshoot" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🔧 Troubleshooting Guide</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Panduan lengkap mengatasi masalah umum VPS, optimasi performa, keamanan, dan monitoring sistem.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-full sm:max-w-md mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Cari masalah atau solusi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 btn-touch text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 flex-wrap">
          {troubleshootTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-mono text-xs sm:text-sm transition-all flex items-center gap-1 sm:gap-2 btn-touch",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {tab === 'Common Issues' && <AlertCircle size={14} className="sm:size-4" />}
              {tab === 'Performance' && <Wrench size={14} className="sm:size-4" />}
              {tab === 'Security' && <Shield size={14} className="sm:size-4" />}
              {tab === 'Monitoring' && <Terminal size={14} className="sm:size-4" />}
              <span className="whitespace-nowrap">{tab}</span>
            </button>
          ))}
        </div>

        {/* Common Issues Tab */}
        {activeTab === 'Common Issues' && (
          <div className="space-y-4">
            {filteredIssues.map((issue, index) => (
              <CollapsibleSection
                key={index}
                title={issue.title}
                defaultOpen={index === 0}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <AlertCircle size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Problem</h4>
                      <p className="text-sm text-muted-foreground mb-2">{issue.problem}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded">{issue.category}</span>
                      </div>
                      {issue.symptoms && (
                        <div>
                          <p className="text-xs font-medium mb-1">Common symptoms:</p>
                          <div className="flex flex-wrap gap-1">
                            {issue.symptoms.map((symptom, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-destructive/20 text-destructive rounded">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
            
            {filteredIssues.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada hasil yang ditemukan untuk "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'Performance' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="Website Performance Optimization"
              stepNumber={1}
              estimatedTime="30 menit"
              difficulty="Intermediate"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Optimasi performa website untuk meningkatkan kecepatan loading dan user experience.
                </p>

                {performanceIssues.map((issue, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-mono font-medium text-primary">{issue.title}</h4>
                    {issue.solutions.map((solution, sIndex) => (
                      <div key={sIndex}>
                        <p className="text-sm text-muted-foreground mb-1">{solution.label}:</p>
                        <CodeBlock code={solution.code} title={solution.label} />
                      </div>
                    ))}
                  </div>
                ))}

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <h5 className="font-mono font-medium text-sm text-primary mb-2">⚡ Performance Testing Tools</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <a href="https://pagespeed.web.dev/" target="_blank" className="text-primary hover:underline">Google PageSpeed Insights</a></li>
                    <li>• <a href="https://gtmetrix.com/" target="_blank" className="text-primary hover:underline">GTmetrix</a></li>
                    <li>• <a href="https://tools.pingdom.com/" target="_blank" className="text-primary hover:underline">Pingdom</a></li>
                    <li>• <code className="text-primary">curl -w "@curl-format.txt" -o /dev/null -s "http://example.com"</code></li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Server Performance Monitoring"
              stepNumber={2}
              estimatedTime="20 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# Real-time system monitoring
htop                    # Interactive process viewer
iotop -o               # I/O monitoring
iftop -i eth0          # Network monitoring

# System load and uptime
uptime
w

# Memory usage analysis
free -h
ps aux --sort=-%mem | head -10

# Disk I/O statistics
iostat -x 1 5

# Network statistics
ss -tuln
netstat -i`}
                  title="System Monitoring Commands"
                />

                <CodeBlock 
                  code={`# Install monitoring tools
sudo apt install htop iotop iftop sysstat -y

# Install Netdata (web-based monitoring)
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
# Access: http://YOUR_VPS_IP:19999

# Install Glances (terminal-based)
sudo apt install glances -y
glances

# Install Prometheus Node Exporter (for advanced monitoring)
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.6.1.linux-amd64.tar.gz
sudo mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/
sudo useradd --no-create-home --shell /bin/false node_exporter
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter`}
                  title="Install Monitoring Tools"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'Security' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="Security Incident Response"
              stepNumber={1}
              estimatedTime="Variable"
              difficulty="Advanced"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Langkah-langkah mengatasi insiden keamanan dan mencegah serangan.
                </p>

                {securityIssues.map((issue, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-mono font-medium text-destructive">{issue.title}</h4>
                    {issue.solutions.map((solution, sIndex) => (
                      <div key={sIndex}>
                        <p className="text-sm text-muted-foreground mb-1">{solution.label}:</p>
                        <CodeBlock code={solution.code} title={solution.label} />
                      </div>
                    ))}
                  </div>
                ))}

                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <h5 className="font-mono font-medium text-sm text-destructive mb-2">🚨 Security Emergency Checklist</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Isolate affected systems immediately</li>
                    <li>• Change all passwords (root, database, application)</li>
                    <li>• Check for unauthorized users: <code className="text-primary">cat /etc/passwd</code></li>
                    <li>• Review recent logins: <code className="text-primary">last -n 50</code></li>
                    <li>• Check for suspicious processes: <code className="text-primary">ps aux</code></li>
                    <li>• Scan for malware and rootkits</li>
                    <li>• Update all software immediately</li>
                    <li>• Review and strengthen firewall rules</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Security Hardening Checklist"
              stepNumber={2}
              estimatedTime="45 menit"
              difficulty="Advanced"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# 1. System Updates
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades

# 2. Firewall Configuration
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# 3. SSH Hardening
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no
# PasswordAuthentication no
# PubkeyAuthentication yes
# Port 2222
# MaxAuthTries 3
# ClientAliveInterval 300
# ClientAliveCountMax 2

# 4. Install Fail2Ban
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban`}
                  title="Basic Security Hardening"
                />

                <CodeBlock 
                  code={`# 5. File System Security
# Set proper permissions
sudo chmod 700 /root
sudo chmod 755 /home
sudo chmod 644 /etc/passwd
sudo chmod 600 /etc/shadow

# 6. Network Security
# Disable unused services
sudo systemctl disable bluetooth
sudo systemctl disable cups
sudo systemctl disable avahi-daemon

# 7. Kernel Security
# Add to /etc/sysctl.conf
echo 'net.ipv4.conf.default.rp_filter=1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.conf.all.rp_filter=1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.icmp_echo_ignore_broadcasts=1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.conf.all.accept_source_route=0' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.conf.all.accept_redirects=0' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.conf.all.secure_redirects=0' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.conf.all.send_redirects=0' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 8. Install Security Tools
sudo apt install lynis chkrootkit rkhunter -y

# Run security audit
sudo lynis audit system`}
                  title="Advanced Security Configuration"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'Monitoring' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="System Monitoring Setup"
              stepNumber={1}
              estimatedTime="30 menit"
              difficulty="Intermediate"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Setup monitoring komprehensif untuk memantau kesehatan server dan aplikasi.
                </p>

                <CodeBlock 
                  code={`# Install essential monitoring tools
sudo apt update
sudo apt install -y \\
  htop \\
  iotop \\
  iftop \\
  sysstat \\
  ncdu \\
  tree \\
  curl \\
  wget \\
  net-tools

# Enable sysstat data collection
sudo systemctl enable sysstat
sudo systemctl start sysstat`}
                  title="Install Monitoring Tools"
                />

                <CodeBlock 
                  code={`# Create monitoring script
nano ~/scripts/system-monitor.sh`}
                  title="Create Monitoring Script"
                />

                <CodeBlock 
                  code={`#!/bin/bash
# System monitoring script

echo "=== System Health Report ==="
echo "Date: $(date)"
echo "Uptime: $(uptime -p)"
echo ""

echo "=== CPU & Load ==="
echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
echo "CPU Usage:"
top -bn1 | grep "Cpu(s)" | awk '{print $2 $3 $4 $5 $6 $7 $8}'
echo ""

echo "=== Memory Usage ==="
free -h
echo ""

echo "=== Disk Usage ==="
df -h | grep -E '^/dev/'
echo ""

echo "=== Network Connections ==="
ss -tuln | grep LISTEN | wc -l
echo "Active connections: $(ss -tuln | grep LISTEN | wc -l)"
echo ""

echo "=== Top Processes (CPU) ==="
ps aux --sort=-%cpu | head -6
echo ""

echo "=== Top Processes (Memory) ==="
ps aux --sort=-%mem | head -6
echo ""

echo "=== Service Status ==="
services=("nginx" "mysql" "php8.2-fpm" "docker" "fail2ban")
for service in "\${services[@]}"; do
    if systemctl is-active --quiet "$service"; then
        echo "✅ $service: Running"
    else
        echo "❌ $service: Stopped"
    fi
done
echo ""

echo "=== Recent Errors ==="
echo "SSH failures (last 10):"
grep "Failed password" /var/log/auth.log | tail -5 | awk '{print $1, $2, $3, $11}'
echo ""

echo "=== Disk I/O ==="
iostat -x 1 1 | grep -A 20 "Device"
echo ""

echo "Report generated at: $(date)"`}
                  title="System Monitor Script"
                  language="bash"
                />

                <CodeBlock 
                  code={`# Make script executable
chmod +x ~/scripts/system-monitor.sh

# Run monitoring script
~/scripts/system-monitor.sh

# Setup cron job for regular monitoring
crontab -e
# Add line:
# 0 */6 * * * /home/deploy/scripts/system-monitor.sh >> /home/deploy/logs/system-monitor.log 2>&1`}
                  title="Setup Automated Monitoring"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Log Management & Analysis"
              stepNumber={2}
              estimatedTime="20 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# Important log locations
echo "System logs:"
echo "/var/log/syslog - System messages"
echo "/var/log/auth.log - Authentication logs"
echo "/var/log/kern.log - Kernel messages"
echo "/var/log/dmesg - Boot messages"
echo ""
echo "Service logs:"
echo "/var/log/nginx/ - Nginx logs"
echo "/var/log/mysql/ - MySQL logs"
echo "/var/log/php8.2-fpm.log - PHP-FPM logs"
echo ""
echo "Application logs:"
echo "/home/deploy/logs/ - Custom application logs"

# Real-time log monitoring
echo "\nReal-time monitoring commands:"
echo "tail -f /var/log/syslog"
echo "tail -f /var/log/nginx/error.log"
echo "journalctl -f -u nginx"
echo "journalctl -f -u mysql"`}
                  title="Log Locations & Monitoring"
                />

                <CodeBlock 
                  code={`# Setup log rotation
sudo nano /etc/logrotate.d/custom-apps`}
                  title="Setup Log Rotation"
                />

                <CodeBlock 
                  code={`# Custom log rotation configuration
/home/deploy/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0644 deploy deploy
    postrotate
        # Reload services if needed
        systemctl reload nginx > /dev/null 2>&1 || true
    endscript
}

/home/deploy/logs/app/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 0644 deploy deploy
    postrotate
        pm2 reloadLogs > /dev/null 2>&1 || true
    endscript
}`}
                  title="Log Rotation Config"
                />

                <CodeBlock 
                  code={`# Log analysis commands
# Find errors in logs
grep -i "error" /var/log/nginx/error.log | tail -20
grep -i "failed" /var/log/auth.log | tail -20

# Count log entries
wc -l /var/log/nginx/access.log

# Analyze access patterns
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10

# Find large log files
find /var/log -name "*.log" -type f -size +10M -exec ls -lh {} \;

# Clean old logs
sudo journalctl --vacuum-time=30d
sudo find /var/log -name "*.log.*.gz" -mtime +30 -delete`}
                  title="Log Analysis Commands"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

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
