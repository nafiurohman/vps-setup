import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, Key, Zap, Terminal, FileText } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const securityTabs = ['Basic Security', 'Advanced Hardening', 'Monitoring', 'Incident Response'] as const;

export const SecuritySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof securityTabs[number]>('Basic Security');

  return (
    <section id="security" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🔒 Security & Hardening</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Panduan lengkap keamanan VPS dari basic hardening hingga advanced security monitoring dan incident response.
          </p>
        </div>

        {/* Security Threat Overview */}
        <div className="glass rounded-lg p-6 mb-8">
          <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-destructive" size={20} />
            Common Security Threats
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h4 className="font-mono font-medium text-destructive mb-2">🔓 Brute Force</h4>
              <p className="text-sm text-muted-foreground">Automated login attempts to crack passwords</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h4 className="font-mono font-medium text-destructive mb-2">🦠 Malware</h4>
              <p className="text-sm text-muted-foreground">Malicious software and rootkits</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h4 className="font-mono font-medium text-destructive mb-2">🌐 DDoS</h4>
              <p className="text-sm text-muted-foreground">Distributed denial of service attacks</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h4 className="font-mono font-medium text-destructive mb-2">💉 Injection</h4>
              <p className="text-sm text-muted-foreground">SQL injection and code injection attacks</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {securityTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg font-mono text-sm transition-all flex items-center gap-2",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {tab === 'Basic Security' && <Shield size={16} />}
              {tab === 'Advanced Hardening' && <Lock size={16} />}
              {tab === 'Monitoring' && <Eye size={16} />}
              {tab === 'Incident Response' && <AlertTriangle size={16} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Basic Security Tab */}
        {activeTab === 'Basic Security' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="SSH Security Hardening"
              stepNumber={1}
              estimatedTime="15 menit"
              difficulty="Beginner"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  SSH adalah pintu masuk utama ke server. Mengamankan SSH adalah prioritas utama keamanan VPS.
                </p>

                <CodeBlock 
                  code={`# Backup original SSH config
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Edit SSH configuration
sudo nano /etc/ssh/sshd_config`}
                  title="Backup & Edit SSH Config"
                />

                <CodeBlock 
                  code={`# /etc/ssh/sshd_config
# Essential SSH security settings

# Change default port (security through obscurity)
Port 2222

# Disable root login
PermitRootLogin no

# Use SSH keys only (disable password authentication)
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# Limit authentication attempts
MaxAuthTries 3
MaxSessions 2

# Timeout idle connections
ClientAliveInterval 300
ClientAliveCountMax 2

# Disable empty passwords
PermitEmptyPasswords no

# Disable X11 forwarding (if not needed)
X11Forwarding no

# Disable unused authentication methods
ChallengeResponseAuthentication no
KerberosAuthentication no
GSSAPIAuthentication no

# Allow specific users only
AllowUsers deploy

# Protocol version
Protocol 2

# Host key algorithms (modern, secure)
HostKeyAlgorithms rsa-sha2-512,rsa-sha2-256,ecdsa-sha2-nistp256,ecdsa-sha2-nistp384,ecdsa-sha2-nistp521,ssh-ed25519

# Ciphers (strong encryption)
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr

# MAC algorithms
MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha2-256,hmac-sha2-512

# Key exchange algorithms
KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp521,ecdh-sha2-nistp384,ecdh-sha2-nistp256,diffie-hellman-group16-sha512

# Disable TCP forwarding (if not needed)
AllowTcpForwarding no
GatewayPorts no

# Disable agent forwarding
AllowAgentForwarding no

# Use privilege separation
UsePrivilegeSeparation sandbox

# Log level
LogLevel VERBOSE

# Banner (optional warning message)
Banner /etc/ssh/banner.txt`}
                  title="Secure SSH Configuration"
                  language="ini"
                />

                <CodeBlock 
                  code={`# Create SSH banner
sudo nano /etc/ssh/banner.txt`}
                  title="Create SSH Banner"
                />

                <CodeBlock 
                  code={`***************************************************************************
                            NOTICE TO USERS
***************************************************************************

This computer system is the private property of its owner, whether
individual, corporate or government. It is for authorized use only.
Users (authorized or unauthorized) have no explicit or implicit
expectation of privacy.

Any or all uses of this system and all files on this system may be
intercepted, monitored, recorded, copied, audited, inspected, and
disclosed to your employer, to authorized site, government, and law
enforcement personnel, as well as authorized officials of government
agencies, both domestic and foreign.

By using this system, the user consents to such interception, monitoring,
recording, copying, auditing, inspection, and disclosure at the
discretion of such personnel or officials. Unauthorized or improper use
of this system may result in civil and criminal penalties and
administrative or disciplinary action, as appropriate. By continuing to
use this system you indicate your awareness of and consent to these terms
and conditions of use. LOG OFF IMMEDIATELY if you do not agree to the
conditions stated in this warning.

***************************************************************************`}
                  title="SSH Banner Content"
                />

                <CodeBlock 
                  code={`# Test SSH configuration
sudo sshd -t

# If test passes, restart SSH
sudo systemctl restart ssh

# Check SSH status
sudo systemctl status ssh

# Update firewall for new SSH port
sudo ufw delete allow 22/tcp
sudo ufw allow 2222/tcp

# Test SSH connection with new settings (from another terminal)
ssh -p 2222 deploy@YOUR_VPS_IP`}
                  title="Apply SSH Configuration"
                />

                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <h5 className="font-mono font-medium text-sm text-destructive mb-2">⚠️ CRITICAL WARNING</h5>
                  <p className="text-sm text-muted-foreground">
                    NEVER close your current SSH session until you've tested the new configuration in a separate terminal!
                    Keep the current session open as a backup in case something goes wrong.
                  </p>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Firewall Configuration (UFW)"
              stepNumber={2}
              estimatedTime="10 menit"
              difficulty="Beginner"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  UFW (Uncomplicated Firewall) adalah interface sederhana untuk iptables yang memudahkan konfigurasi firewall.
                </p>

                <CodeBlock 
                  code={`# Install UFW (usually pre-installed)
sudo apt install ufw -y

# Reset UFW to defaults
sudo ufw --force reset

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (use your custom port)
sudo ufw allow 2222/tcp comment 'SSH'

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Allow specific application ports
sudo ufw allow 3000/tcp comment 'Node.js App'
sudo ufw allow from 192.168.1.0/24 to any port 3306 comment 'MySQL from local network'

# Enable UFW
sudo ufw enable

# Check UFW status
sudo ufw status verbose
sudo ufw status numbered`}
                  title="Basic UFW Configuration"
                />

                <CodeBlock 
                  code={`# Advanced UFW rules

# Rate limiting for SSH (prevent brute force)
sudo ufw limit 2222/tcp comment 'SSH rate limit'

# Allow specific IP ranges
sudo ufw allow from 10.0.0.0/8 comment 'Private network'
sudo ufw allow from 172.16.0.0/12 comment 'Private network'
sudo ufw allow from 192.168.0.0/16 comment 'Private network'

# Block specific countries (using GeoIP)
# sudo ufw deny from 1.2.3.0/24 comment 'Block suspicious range'

# Allow ping (ICMP)
sudo ufw allow in on eth0 to any port 22 proto icmp

# Logging
sudo ufw logging on

# Delete rules by number
sudo ufw status numbered
sudo ufw delete [number]

# Disable UFW (if needed)
# sudo ufw disable`}
                  title="Advanced UFW Rules"
                />

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <h5 className="font-mono font-medium text-sm text-primary mb-2">🔥 UFW Best Practices</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Always test rules before applying to production</li>
                    <li>• Use comments to document rule purposes</li>
                    <li>• Regularly review and clean up unused rules</li>
                    <li>• Monitor UFW logs: <code className="text-primary">sudo tail -f /var/log/ufw.log</code></li>
                    <li>• Backup UFW rules: <code className="text-primary">sudo cp -r /etc/ufw /etc/ufw.backup</code></li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Fail2Ban - Intrusion Prevention"
              stepNumber={3}
              estimatedTime="15 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Fail2Ban melindungi server dari serangan brute-force dengan memblokir IP yang mencurigakan secara otomatis.
                </p>

                <CodeBlock 
                  code={`# Install Fail2Ban
sudo apt install fail2ban -y

# Start and enable Fail2Ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check Fail2Ban status
sudo systemctl status fail2ban`}
                  title="Install Fail2Ban"
                />

                <CodeBlock 
                  code={`# Create local configuration (don't edit jail.conf directly)
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit local configuration
sudo nano /etc/fail2ban/jail.local`}
                  title="Create Local Configuration"
                />

                <CodeBlock 
                  code={`# /etc/fail2ban/jail.local
# Fail2Ban configuration

[DEFAULT]
# Ban settings
bantime = 1h
findtime = 10m
maxretry = 5

# Email notifications (optional)
destemail = admin@yourdomain.com
sender = fail2ban@yourdomain.com
mta = sendmail

# Action to take when IP is banned
action = %(action_mwl)s

# Whitelist IPs (your office, home, etc.)
ignoreip = 127.0.0.1/8 ::1 192.168.1.0/24 10.0.0.0/8

# SSH jail
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 24h

# Nginx jails
[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 10

[nginx-botsearch]
enabled = true
filter = nginx-botsearch
logpath = /var/log/nginx/access.log
maxretry = 2

# MySQL jail
[mysqld-auth]
enabled = true
filter = mysqld-auth
logpath = /var/log/mysql/error.log
maxretry = 3

# Apache jails (if using Apache)
[apache-auth]
enabled = false
filter = apache-auth
logpath = /var/log/apache2/error.log
maxretry = 3

[apache-badbots]
enabled = false
filter = apache-badbots
logpath = /var/log/apache2/access.log
maxretry = 2

# Custom application jail
[myapp]
enabled = true
filter = myapp
logpath = /home/deploy/logs/app/error.log
maxretry = 5
bantime = 2h`}
                  title="Fail2Ban Configuration"
                  language="ini"
                />

                <CodeBlock 
                  code={`# Create custom filter for your application
sudo nano /etc/fail2ban/filter.d/myapp.conf`}
                  title="Create Custom Filter"
                />

                <CodeBlock 
                  code={`# /etc/fail2ban/filter.d/myapp.conf
# Custom filter for application logs

[Definition]
# Regex pattern to match failed login attempts
failregex = ^.*Failed login attempt from <HOST>.*$
            ^.*Authentication failed for <HOST>.*$
            ^.*Invalid credentials from <HOST>.*$

# Ignore successful logins
ignoreregex = ^.*Successful login.*$`}
                  title="Custom Filter Configuration"
                />

                <CodeBlock 
                  code={`# Restart Fail2Ban to apply changes
sudo systemctl restart fail2ban

# Check Fail2Ban status
sudo fail2ban-client status

# Check specific jail status
sudo fail2ban-client status sshd

# Manually ban/unban IP
sudo fail2ban-client set sshd banip 192.168.1.100
sudo fail2ban-client set sshd unbanip 192.168.1.100

# Check banned IPs
sudo fail2ban-client get sshd banip

# Monitor Fail2Ban logs
sudo tail -f /var/log/fail2ban.log`}
                  title="Manage Fail2Ban"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Advanced Hardening Tab */}
        {activeTab === 'Advanced Hardening' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="Kernel Security & Sysctl Hardening"
              stepNumber={1}
              estimatedTime="20 menit"
              difficulty="Advanced"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Konfigurasi kernel Linux untuk meningkatkan keamanan sistem pada level yang lebih dalam.
                </p>

                <CodeBlock 
                  code={`# Backup original sysctl configuration
sudo cp /etc/sysctl.conf /etc/sysctl.conf.backup

# Create custom security configuration
sudo nano /etc/sysctl.d/99-security.conf`}
                  title="Create Security Configuration"
                />

                <CodeBlock 
                  code={`# /etc/sysctl.d/99-security.conf
# Kernel security hardening configuration

# Network Security
# =================

# Disable IP forwarding (unless you need routing)
net.ipv4.ip_forward = 0
net.ipv6.conf.all.forwarding = 0

# Disable source routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv6.conf.default.accept_source_route = 0

# Disable ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0

# Disable secure ICMP redirects
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.default.secure_redirects = 0

# Don't send ICMP redirects
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0

# Enable reverse path filtering (anti-spoofing)
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignore ICMP ping requests
net.ipv4.icmp_echo_ignore_all = 0
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Ignore bogus ICMP error responses
net.ipv4.icmp_ignore_bogus_error_responses = 1

# Enable TCP SYN cookies (DDoS protection)
net.ipv4.tcp_syncookies = 1

# Disable IPv6 (if not needed)
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1

# TCP hardening
net.ipv4.tcp_timestamps = 0
net.ipv4.tcp_sack = 0
net.ipv4.tcp_dsack = 0
net.ipv4.tcp_fack = 0

# Memory Protection
# =================

# Enable ASLR (Address Space Layout Randomization)
kernel.randomize_va_space = 2

# Restrict access to kernel logs
kernel.dmesg_restrict = 1

# Restrict access to kernel pointers
kernel.kptr_restrict = 2

# Disable magic SysRq key
kernel.sysrq = 0

# Restrict ptrace to same user processes
kernel.yama.ptrace_scope = 1

# File System Security
# ====================

# Restrict core dumps
fs.suid_dumpable = 0

# Increase inotify limits
fs.inotify.max_user_watches = 524288
fs.inotify.max_user_instances = 256

# Process Security
# ================

# Restrict process scheduling
kernel.sched_rt_period_us = 1000000
kernel.sched_rt_runtime_us = 950000

# Memory overcommit handling
vm.overcommit_memory = 2
vm.overcommit_ratio = 80

# Swap usage
vm.swappiness = 10
vm.vfs_cache_pressure = 50`}
                  title="Kernel Security Configuration"
                  language="ini"
                />

                <CodeBlock 
                  code={`# Apply sysctl changes
sudo sysctl -p /etc/sysctl.d/99-security.conf

# Verify changes
sudo sysctl -a | grep -E "(net.ipv4.ip_forward|kernel.randomize_va_space|net.ipv4.tcp_syncookies)"

# Test network security
sudo sysctl net.ipv4.conf.all.rp_filter
sudo sysctl net.ipv4.icmp_echo_ignore_broadcasts`}
                  title="Apply Configuration"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="AppArmor Security Profiles"
              stepNumber={2}
              estimatedTime="25 menit"
              difficulty="Advanced"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  AppArmor adalah sistem Mandatory Access Control (MAC) yang membatasi akses program ke sistem resources.
                </p>

                <CodeBlock 
                  code={`# Install AppArmor utilities
sudo apt install apparmor apparmor-utils apparmor-profiles apparmor-profiles-extra -y

# Check AppArmor status
sudo apparmor_status

# Enable AppArmor
sudo systemctl enable apparmor
sudo systemctl start apparmor

# Check loaded profiles
sudo aa-status`}
                  title="Install & Enable AppArmor"
                />

                <CodeBlock 
                  code={`# Common AppArmor commands

# Put profile in complain mode (learning mode)
sudo aa-complain /usr/sbin/nginx

# Put profile in enforce mode
sudo aa-enforce /usr/sbin/nginx

# Disable profile
sudo aa-disable /usr/sbin/nginx

# Generate profile for application
sudo aa-genprof /usr/bin/myapp

# Update existing profile
sudo aa-logprof

# Check profile syntax
sudo apparmor_parser -r /etc/apparmor.d/usr.sbin.nginx`}
                  title="AppArmor Management"
                />

                <CodeBlock 
                  code={`# Create custom profile for Node.js application
sudo nano /etc/apparmor.d/usr.bin.node`}
                  title="Create Custom Profile"
                />

                <CodeBlock 
                  code={`# /etc/apparmor.d/usr.bin.node
# AppArmor profile for Node.js applications

#include <tunables/global>

/usr/bin/node {
  #include <abstractions/base>
  #include <abstractions/nameservice>
  #include <abstractions/openssl>
  #include <abstractions/ssl_certs>

  # Node.js binary
  /usr/bin/node mr,

  # Application files
  /home/deploy/apps/** r,
  /home/deploy/apps/**/node_modules/** r,
  /home/deploy/apps/**/package.json r,

  # Logs
  /home/deploy/logs/app/** rw,
  /var/log/pm2/** rw,

  # Temporary files
  /tmp/** rw,
  /var/tmp/** rw,

  # System libraries
  /lib/x86_64-linux-gnu/** mr,
  /usr/lib/x86_64-linux-gnu/** mr,

  # Proc and sys access
  @{PROC}/sys/kernel/random/uuid r,
  @{PROC}/meminfo r,
  @{PROC}/stat r,
  @{PROC}/uptime r,

  # Network access
  network inet stream,
  network inet dgram,
  network inet6 stream,
  network inet6 dgram,

  # Deny dangerous capabilities
  deny capability sys_admin,
  deny capability sys_module,
  deny capability sys_rawio,

  # Deny access to sensitive files
  deny /etc/shadow r,
  deny /etc/gshadow r,
  deny /root/** rw,
}`}
                  title="Node.js AppArmor Profile"
                />

                <CodeBlock 
                  code={`# Load and enforce the profile
sudo apparmor_parser -r /etc/apparmor.d/usr.bin.node
sudo aa-enforce /usr/bin/node

# Test the profile
sudo aa-status | grep node

# Monitor AppArmor logs
sudo tail -f /var/log/kern.log | grep apparmor
sudo dmesg | grep -i apparmor`}
                  title="Load & Test Profile"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="File System Security & Permissions"
              stepNumber={3}
              estimatedTime="15 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# Secure important system files
sudo chmod 600 /etc/shadow
sudo chmod 600 /etc/gshadow
sudo chmod 644 /etc/passwd
sudo chmod 644 /etc/group
sudo chmod 600 /boot/grub/grub.cfg

# Secure SSH directory
sudo chmod 700 /root/.ssh
sudo chmod 600 /root/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Secure log files
sudo chmod 640 /var/log/auth.log
sudo chmod 640 /var/log/syslog
sudo chown root:adm /var/log/auth.log
sudo chown root:adm /var/log/syslog`}
                  title="Secure File Permissions"
                />

                <CodeBlock 
                  code={`# Find and fix world-writable files
sudo find / -type f -perm -002 -exec ls -l {} \\; 2>/dev/null

# Find and fix files with no owner
sudo find / -nouser -o -nogroup -exec ls -l {} \\; 2>/dev/null

# Find SUID/SGID files (potential security risk)
sudo find / -type f \\( -perm -4000 -o -perm -2000 \\) -exec ls -l {} \\; 2>/dev/null

# Remove unnecessary SUID bits (be careful!)
# sudo chmod u-s /path/to/file

# Find large files (potential indicators of compromise)
sudo find / -type f -size +100M -exec ls -lh {} \\; 2>/dev/null`}
                  title="Security Audit Commands"
                />

                <CodeBlock 
                  code={`# Setup file integrity monitoring with AIDE
sudo apt install aide -y

# Initialize AIDE database
sudo aideinit

# Move database to secure location
sudo mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db

# Run integrity check
sudo aide --check

# Update database after legitimate changes
sudo aide --update
sudo mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db

# Setup daily AIDE check
echo '0 2 * * * root /usr/bin/aide --check | mail -s "AIDE Report" admin@yourdomain.com' | sudo tee -a /etc/crontab`}
                  title="File Integrity Monitoring"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'Monitoring' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="Security Monitoring & Logging"
              stepNumber={1}
              estimatedTime="30 menit"
              difficulty="Intermediate"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Setup monitoring komprehensif untuk mendeteksi aktivitas mencurigakan dan serangan keamanan.
                </p>

                <CodeBlock 
                  code={`# Install security monitoring tools
sudo apt install -y \\
  logwatch \\
  rkhunter \\
  chkrootkit \\
  lynis \\
  clamav \\
  clamav-daemon

# Update virus definitions
sudo freshclam

# Start ClamAV daemon
sudo systemctl start clamav-daemon
sudo systemctl enable clamav-daemon`}
                  title="Install Security Tools"
                />

                <CodeBlock 
                  code={`# Create security monitoring script
nano ~/scripts/security-monitor.sh`}
                  title="Create Monitoring Script"
                />

                <CodeBlock 
                  code={`#!/bin/bash
# Security monitoring script

LOG_FILE="/home/deploy/logs/security-monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "=== Security Monitor Report - $DATE ===" >> $LOG_FILE

# Check for failed SSH attempts
echo "Failed SSH attempts (last 24h):" >> $LOG_FILE
grep "Failed password" /var/log/auth.log | grep "$(date '+%b %d')" | wc -l >> $LOG_FILE

# Check for successful SSH logins
echo "Successful SSH logins (last 24h):" >> $LOG_FILE
grep "Accepted password\\|Accepted publickey" /var/log/auth.log | grep "$(date '+%b %d')" | wc -l >> $LOG_FILE

# Check for new users
echo "System users:" >> $LOG_FILE
awk -F: '$3 >= 1000 && $3 < 65534 {print $1}' /etc/passwd >> $LOG_FILE

# Check for listening ports
echo "Listening ports:" >> $LOG_FILE
ss -tuln | grep LISTEN >> $LOG_FILE

# Check for unusual processes
echo "Top CPU processes:" >> $LOG_FILE
ps aux --sort=-%cpu | head -5 >> $LOG_FILE

# Check disk usage
echo "Disk usage:" >> $LOG_FILE
df -h | grep -E '^/dev/' >> $LOG_FILE

# Check for rootkits (quick scan)
echo "Rootkit scan:" >> $LOG_FILE
sudo chkrootkit -q >> $LOG_FILE 2>&1

# Check system integrity
echo "System file changes:" >> $LOG_FILE
sudo find /etc /usr/bin /usr/sbin -type f -mtime -1 2>/dev/null | head -10 >> $LOG_FILE

echo "=== End Report ===" >> $LOG_FILE
echo "" >> $LOG_FILE`}
                  title="Security Monitor Script"
                  language="bash"
                />

                <CodeBlock 
                  code={`# Make script executable
chmod +x ~/scripts/security-monitor.sh

# Setup automated security monitoring
crontab -e

# Add these lines:
# Run security monitor every 6 hours
0 */6 * * * /home/deploy/scripts/security-monitor.sh

# Daily rootkit scan
0 3 * * * /usr/bin/rkhunter --check --skip-keypress --report-warnings-only | mail -s "RKHunter Report" admin@yourdomain.com

# Weekly system audit
0 4 * * 0 /usr/bin/lynis audit system --quiet | mail -s "Lynis Security Audit" admin@yourdomain.com

# Daily virus scan
0 2 * * * /usr/bin/clamscan -r /home/deploy/apps --quiet --infected --remove | mail -s "ClamAV Scan Report" admin@yourdomain.com`}
                  title="Setup Automated Monitoring"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Real-time Security Monitoring"
              stepNumber={2}
              estimatedTime="20 menit"
              difficulty="Advanced"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# Install OSSEC HIDS (Host Intrusion Detection System)
wget -q -O - https://updates.atomicorp.com/installers/atomic | sudo bash
sudo yum install ossec-hids-server -y

# Alternative: Install Wazuh (modern OSSEC fork)
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo apt-key add -
echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list
sudo apt update
sudo apt install wazuh-agent -y`}
                  title="Install HIDS"
                />

                <CodeBlock 
                  code={`# Setup real-time log monitoring with multitail
sudo apt install multitail -y

# Monitor multiple logs simultaneously
multitail /var/log/auth.log /var/log/nginx/error.log /var/log/fail2ban.log

# Create monitoring dashboard script
nano ~/scripts/security-dashboard.sh`}
                  title="Real-time Log Monitoring"
                />

                <CodeBlock 
                  code={`#!/bin/bash
# Security monitoring dashboard

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
NC='\\033[0m' # No Color

clear
echo -e "${GREEN}=== Security Dashboard ===${NC}"
echo "Last updated: $(date)"
echo ""

# System load
echo -e "${YELLOW}System Load:${NC}"
uptime

# Failed login attempts (last hour)
echo -e "${YELLOW}Failed SSH attempts (last hour):${NC}"
grep "Failed password" /var/log/auth.log | grep "$(date '+%b %d %H')" | wc -l

# Active connections
echo -e "${YELLOW}Active connections:${NC}"
ss -tuln | grep LISTEN | wc -l

# Fail2Ban status
echo -e "${YELLOW}Fail2Ban banned IPs:${NC}"
sudo fail2ban-client status sshd | grep "Banned IP list" | cut -d: -f2

# Disk usage alerts
echo -e "${YELLOW}Disk usage alerts:${NC}"
df -h | awk '$5 > 80 {print $0}' | grep -v "Filesystem"

# Memory usage
echo -e "${YELLOW}Memory usage:${NC}"
free -h | grep Mem

# Top processes by CPU
echo -e "${YELLOW}Top CPU processes:${NC}"
ps aux --sort=-%cpu | head -3 | tail -2

# Recent file changes in sensitive directories
echo -e "${YELLOW}Recent changes in /etc (last 24h):${NC}"
sudo find /etc -type f -mtime -1 2>/dev/null | wc -l

echo ""
echo -e "${GREEN}Dashboard refresh every 30 seconds. Press Ctrl+C to exit.${NC}"
sleep 30
exec $0`}
                  title="Security Dashboard Script"
                  language="bash"
                />

                <CodeBlock 
                  code={`# Make dashboard executable
chmod +x ~/scripts/security-dashboard.sh

# Run security dashboard
~/scripts/security-dashboard.sh

# Setup log rotation for security logs
sudo nano /etc/logrotate.d/security-logs`}
                  title="Setup Dashboard"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Incident Response Tab */}
        {activeTab === 'Incident Response' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="Security Incident Response Plan"
              stepNumber={1}
              estimatedTime="Variable"
              difficulty="Advanced"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Langkah-langkah sistematis untuk merespons insiden keamanan dan meminimalkan dampak serangan.
                </p>

                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <h5 className="font-mono font-medium text-sm text-destructive mb-2">🚨 IMMEDIATE RESPONSE CHECKLIST</h5>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Isolate affected systems immediately</li>
                    <li>Document everything (screenshots, logs, commands)</li>
                    <li>Preserve evidence before making changes</li>
                    <li>Notify stakeholders and authorities if required</li>
                    <li>Begin containment and eradication</li>
                    <li>Plan recovery and lessons learned</li>
                  </ol>
                </div>

                <CodeBlock 
                  code={`# STEP 1: IMMEDIATE ISOLATION
# Disconnect from network (if possible)
sudo ip link set eth0 down

# Or block all traffic except SSH
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT DROP
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A OUTPUT -o lo -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT

# Save current state
sudo iptables-save > /tmp/emergency-iptables.rules`}
                  title="Emergency Isolation"
                />

                <CodeBlock 
                  code={`# STEP 2: EVIDENCE COLLECTION
# Create incident directory
mkdir -p ~/incident-$(date +%Y%m%d-%H%M%S)
cd ~/incident-$(date +%Y%m%d-%H%M%S)

# Collect system information
uname -a > system-info.txt
date > timestamp.txt
uptime >> system-info.txt
who >> system-info.txt
w >> system-info.txt

# Collect process information
ps aux > processes.txt
ps -ef > processes-tree.txt
lsof > open-files.txt

# Collect network information
netstat -tulpn > network-connections.txt
ss -tulpn > network-connections-ss.txt
arp -a > arp-table.txt

# Collect user information
last > login-history.txt
lastlog > last-login.txt
cat /etc/passwd > users.txt
cat /etc/group > groups.txt

# Collect log files
sudo cp /var/log/auth.log auth.log
sudo cp /var/log/syslog syslog
sudo cp /var/log/kern.log kern.log
sudo cp /var/log/nginx/access.log nginx-access.log 2>/dev/null || true
sudo cp /var/log/nginx/error.log nginx-error.log 2>/dev/null || true

# Memory dump (if tools available)
# sudo dd if=/dev/mem of=memory-dump.img bs=1M count=1024

# File system timeline
sudo find / -type f -mtime -1 > recent-files.txt 2>/dev/null`}
                  title="Evidence Collection"
                />

                <CodeBlock 
                  code={`# STEP 3: THREAT ANALYSIS
# Check for suspicious processes
ps aux | grep -E "(nc|netcat|ncat|socat|wget|curl)" | grep -v grep

# Check for unusual network connections
netstat -tulpn | grep -E ":(1234|4444|5555|6666|7777|8888|9999)"

# Check for backdoors in common locations
sudo find /tmp /var/tmp /dev/shm -type f -executable
sudo find /home -name ".*" -type f -executable
sudo find /etc -name "*" -type f -mtime -7

# Check crontabs for malicious entries
sudo cat /etc/crontab
sudo ls -la /etc/cron.*
sudo crontab -l -u root
crontab -l

# Check for modified system binaries
sudo find /usr/bin /usr/sbin /bin /sbin -type f -mtime -7

# Check startup scripts
sudo find /etc/init.d /etc/systemd/system -type f -mtime -7`}
                  title="Threat Analysis"
                />

                <CodeBlock 
                  code={`# STEP 4: CONTAINMENT & ERADICATION
# Kill suspicious processes
sudo pkill -f "suspicious_process"

# Remove malicious files
sudo rm -f /tmp/malicious_file
sudo rm -f /var/tmp/backdoor

# Clean up crontabs
sudo crontab -r -u root  # Remove root crontab
crontab -r  # Remove user crontab

# Reset passwords for all users
sudo passwd root
sudo passwd deploy
# ... other users

# Regenerate SSH host keys
sudo rm /etc/ssh/ssh_host_*
sudo ssh-keygen -A
sudo systemctl restart ssh

# Update all software
sudo apt update && sudo apt upgrade -y

# Scan for malware
sudo clamscan -r / --infected --remove

# Check for rootkits
sudo rkhunter --check --skip-keypress
sudo chkrootkit`}
                  title="Containment & Eradication"
                />

                <CodeBlock 
                  code={`# STEP 5: RECOVERY & HARDENING
# Restore from clean backup (if available)
# sudo rsync -av /backup/clean-system/ /

# Strengthen security
# Re-run all security hardening steps
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp
sudo ufw enable

# Update Fail2Ban configuration
sudo systemctl restart fail2ban

# Enable additional monitoring
sudo systemctl enable auditd
sudo systemctl start auditd

# Create incident report
cat > incident-report.txt << EOF
SECURITY INCIDENT REPORT
========================
Date: $(date)
Incident ID: INC-$(date +%Y%m%d-%H%M%S)

SUMMARY:
[Describe what happened]

TIMELINE:
[When was it discovered, when did it start, etc.]

IMPACT:
[What systems/data were affected]

ROOT CAUSE:
[How did the attacker get in]

ACTIONS TAKEN:
[What was done to contain and eradicate]

LESSONS LEARNED:
[What can be improved]

RECOMMENDATIONS:
[Security improvements to implement]
EOF`}
                  title="Recovery & Documentation"
                />

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <h5 className="font-mono font-medium text-sm text-primary mb-2">📋 Post-Incident Actions</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Conduct thorough security audit</li>
                    <li>• Update incident response procedures</li>
                    <li>• Implement additional security controls</li>
                    <li>• Train team on lessons learned</li>
                    <li>• Consider third-party security assessment</li>
                    <li>• Review and update backup procedures</li>
                    <li>• Monitor systems closely for reinfection</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Forensic Analysis Tools"
              stepNumber={2}
              estimatedTime="30 menit"
              difficulty="Expert"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Tools dan teknik untuk analisis forensik digital dalam investigasi insiden keamanan.
                </p>

                <CodeBlock 
                  code={`# Install forensic tools
sudo apt install -y \\
  sleuthkit \\
  autopsy \\
  foremost \\
  scalpel \\
  binwalk \\
  hexdump \\
  strings \\
  file \\
  volatility \\
  yara

# Install additional analysis tools
sudo apt install -y \\
  tcpdump \\
  wireshark-common \\
  nmap \\
  masscan \\
  nikto \\
  sqlmap`}
                  title="Install Forensic Tools"
                />

                <CodeBlock 
                  code={`# Network traffic analysis
# Capture network traffic
sudo tcpdump -i eth0 -w /tmp/traffic-capture.pcap

# Analyze captured traffic
tcpdump -r /tmp/traffic-capture.pcap | head -20

# Extract files from network capture
foremost -i /tmp/traffic-capture.pcap -o /tmp/extracted-files/

# File analysis
# Get file information
file suspicious-file
strings suspicious-file | head -20
hexdump -C suspicious-file | head -20

# Binary analysis
binwalk suspicious-file
objdump -d suspicious-binary | head -20

# Memory analysis (if memory dump available)
volatility -f memory-dump.img imageinfo
volatility -f memory-dump.img --profile=LinuxUbuntu2004x64 linux_pslist`}
                  title="Forensic Analysis Commands"
                />

                <CodeBlock 
                  code={`# Create forensic analysis script
nano ~/scripts/forensic-analysis.sh`}
                  title="Create Analysis Script"
                />

                <CodeBlock 
                  code={`#!/bin/bash
# Forensic analysis automation script

ANALYSIS_DIR="forensic-analysis-$(date +%Y%m%d-%H%M%S)"
mkdir -p $ANALYSIS_DIR
cd $ANALYSIS_DIR

echo "Starting forensic analysis at $(date)"

# System snapshot
echo "=== System Information ===" > system-snapshot.txt
uname -a >> system-snapshot.txt
cat /proc/version >> system-snapshot.txt
cat /proc/cpuinfo | grep "model name" | head -1 >> system-snapshot.txt
cat /proc/meminfo | grep MemTotal >> system-snapshot.txt

# Process analysis
echo "=== Process Analysis ===" > process-analysis.txt
ps aux --sort=-%cpu >> process-analysis.txt
echo "\\n=== Process Tree ===" >> process-analysis.txt
pstree -p >> process-analysis.txt

# Network analysis
echo "=== Network Analysis ===" > network-analysis.txt
netstat -tulpn >> network-analysis.txt
echo "\\n=== ARP Table ===" >> network-analysis.txt
arp -a >> network-analysis.txt
echo "\\n=== Routing Table ===" >> network-analysis.txt
route -n >> network-analysis.txt

# File system analysis
echo "=== File System Analysis ===" > filesystem-analysis.txt
df -h >> filesystem-analysis.txt
echo "\\n=== Recent Files ===" >> filesystem-analysis.txt
find / -type f -mtime -1 2>/dev/null | head -50 >> filesystem-analysis.txt

# Log analysis
echo "=== Log Analysis ===" > log-analysis.txt
echo "Failed SSH attempts:" >> log-analysis.txt
grep "Failed password" /var/log/auth.log | tail -20 >> log-analysis.txt
echo "\\nSuccessful logins:" >> log-analysis.txt
grep "Accepted" /var/log/auth.log | tail -10 >> log-analysis.txt

# Hash important files
echo "=== File Hashes ===" > file-hashes.txt
find /etc /usr/bin /usr/sbin -type f -exec sha256sum {} \\; 2>/dev/null >> file-hashes.txt

echo "Forensic analysis completed at $(date)"
echo "Results saved in: $(pwd)"

# Create summary report
cat > forensic-summary.txt << EOF
FORENSIC ANALYSIS SUMMARY
========================
Analysis Date: $(date)
System: $(uname -a)

FILES ANALYZED:
- system-snapshot.txt: System information
- process-analysis.txt: Running processes
- network-analysis.txt: Network connections
- filesystem-analysis.txt: File system state
- log-analysis.txt: Security logs
- file-hashes.txt: System file hashes

NEXT STEPS:
1. Review all generated files
2. Compare file hashes with known good values
3. Investigate suspicious processes/connections
4. Correlate timeline with log entries
5. Document findings in incident report
EOF`}
                  title="Forensic Analysis Script"
                  language="bash"
                />

                <CodeBlock 
                  code={`# Make script executable
chmod +x ~/scripts/forensic-analysis.sh

# Run forensic analysis
~/scripts/forensic-analysis.sh

# Create evidence package
tar -czf evidence-package-$(date +%Y%m%d-%H%M%S).tar.gz forensic-analysis-*

# Calculate hash of evidence package
sha256sum evidence-package-*.tar.gz > evidence-hash.txt

echo "Evidence package created and hashed for integrity verification"`}
                  title="Package Evidence"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* General Security Tips */}
        <div className="glass rounded-lg p-6 mt-8">
          <h3 className="font-mono font-semibold text-lg mb-4">💡 Security Best Practices</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-mono font-medium text-primary">✅ Do's</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep all software updated regularly</li>
                <li>• Use strong, unique passwords</li>
                <li>• Enable two-factor authentication</li>
                <li>• Regular security audits and monitoring</li>
                <li>• Backup data regularly and test restores</li>
                <li>• Use principle of least privilege</li>
                <li>• Monitor logs and set up alerts</li>
                <li>• Document security procedures</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-mono font-medium text-destructive">❌ Don'ts</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Don't use default passwords</li>
                <li>• Don't run services as root</li>
                <li>• Don't ignore security updates</li>
                <li>• Don't expose unnecessary services</li>
                <li>• Don't trust user input without validation</li>
                <li>• Don't store sensitive data in plain text</li>
                <li>• Don't disable security features for convenience</li>
                <li>• Don't forget to monitor and audit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;