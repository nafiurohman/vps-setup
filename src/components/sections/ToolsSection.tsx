import React from 'react';
import { Wrench, FileCode, Activity, Shield } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';

export const ToolsSection: React.FC = () => {
  return (
    <section id="tools" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🛠️ Useful Tools & Scripts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scripts dan tools untuk backup, deployment, monitoring, dan security.
          </p>
        </div>

        {/* Backup Scripts */}
        <CollapsibleSection
          title="Database Backup Scripts"
          defaultOpen={true}
        >
          <div className="space-y-4">
            <h4 className="font-mono font-medium">MySQL Backup Script</h4>
            <CodeBlock 
              code={`nano ~/scripts/backup-mysql.sh`}
              title="Create Script"
            />
            <CodeBlock 
              code={`#!/bin/bash
BACKUP_DIR="/home/deploy/backups/databases"
DATE=$(date +%Y%m%d_%H%M%S)
DB_USER="myapp_user"
DB_PASS="strong_password"
DB_NAME="myapp"

# Create backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/\${DB_NAME}_\${DATE}.sql.gz

# Delete backups older than 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: \${DB_NAME}_\${DATE}.sql.gz"`}
              title="backup-mysql.sh"
            />

            <h4 className="font-mono font-medium mt-6">PostgreSQL Backup Script</h4>
            <CodeBlock 
              code={`#!/bin/bash
BACKUP_DIR="/home/deploy/backups/databases"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="myapp"
DB_USER="myapp_user"

export PGPASSWORD="strong_password"
pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_DIR/\${DB_NAME}_\${DATE}.sql.gz

find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: \${DB_NAME}_\${DATE}.sql.gz"`}
              title="backup-postgres.sh"
            />

            <CodeBlock 
              code={`# Make executable
chmod +x ~/scripts/backup-mysql.sh

# Setup cron job
crontab -e

# Add daily backup at 2 AM
0 2 * * * /home/deploy/scripts/backup-mysql.sh >> /home/deploy/logs/backup.log 2>&1`}
              title="Setup Cron"
            />
          </div>
        </CollapsibleSection>

        {/* Deployment Script */}
        <CollapsibleSection
          title="Deployment Script (Laravel Example)"
        >
          <div className="space-y-4">
            <CodeBlock 
              code={`nano ~/scripts/deploy-laravel.sh`}
              title="Create Script"
            />
            <CodeBlock 
              code={`#!/bin/bash
APP_DIR="/home/deploy/apps/myapp"

cd $APP_DIR

echo "🚀 Starting deployment..."

# Git pull
echo "📥 Pulling latest code..."
git pull origin main

# Composer install
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader

# NPM
echo "🎨 Building assets..."
npm install
npm run build

# Laravel specific
echo "⚡ Running Laravel commands..."
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# Permissions
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Reload services
echo "🔄 Reloading services..."
sudo systemctl reload php8.2-fpm
sudo systemctl reload nginx

echo "✅ Deployment completed!"`}
              title="deploy-laravel.sh"
            />
          </div>
        </CollapsibleSection>

        {/* Health Check */}
        <CollapsibleSection
          title="Server Health Check Script"
        >
          <div className="space-y-4">
            <CodeBlock 
              code={`#!/bin/bash

echo "=== Server Health Check ==="
echo "Date: $(date)"
echo ""

echo "=== CPU & Memory ==="
top -bn1 | head -n 5

echo ""
echo "=== Disk Usage ==="
df -h | grep -E '^/dev/'

echo ""
echo "=== Services Status ==="
echo -n "Nginx: "; systemctl is-active nginx
echo -n "MySQL: "; systemctl is-active mysql
echo -n "Docker: "; systemctl is-active docker

echo ""
echo "=== Network Connections ==="
netstat -tuln | grep LISTEN

echo ""
echo "=== Recent Logins ==="
last -n 5`}
              title="health-check.sh"
            />
          </div>
        </CollapsibleSection>

        {/* Monitoring */}
        <CollapsibleSection
          title="System Monitoring"
        >
          <div className="space-y-4">
            <CodeBlock 
              code={`# Htop - interactive process viewer
sudo apt install htop -y
htop

# Netdata - real-time monitoring dashboard
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
# Access: http://YOUR_VPS_IP:19999

# Glances - monitoring tool
sudo apt install glances -y
glances`}
              title="Install Monitoring Tools"
            />

            <CodeBlock 
              code={`# CPU & Memory
htop

# Disk usage
df -h
ncdu /

# Network
iftop -i eth0
netstat -tulpn

# Logs
tail -f /var/log/nginx/error.log
journalctl -u nginx -f`}
              title="Basic Monitoring Commands"
            />
          </div>
        </CollapsibleSection>

        {/* Security Hardening */}
        <CollapsibleSection
          title="Additional Security Hardening"
        >
          <div className="space-y-4">
            <CodeBlock 
              code={`# Disable unused services
sudo systemctl disable bluetooth
sudo systemctl disable cups

# Install and configure AppArmor
sudo apt install apparmor apparmor-utils -y
sudo systemctl enable apparmor
sudo systemctl start apparmor

# Install logwatch
sudo apt install logwatch -y
sudo logwatch --detail High --mailto your@email.com --service all --range today`}
              title="Security Measures"
            />

            <CodeBlock 
              code={`# Automatic Security Updates
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades

# Configure
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
# Uncomment and set:
# Unattended-Upgrade::Mail "your@email.com";
# Unattended-Upgrade::Automatic-Reboot "true";
# Unattended-Upgrade::Automatic-Reboot-Time "02:00";`}
              title="Auto Updates"
            />
          </div>
        </CollapsibleSection>
      </div>
    </section>
  );
};

export default ToolsSection;
