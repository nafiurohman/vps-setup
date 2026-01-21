import React, { useState } from 'react';
import { Globe, Lock, Code } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

export const WebServerSection: React.FC = () => {
  return (
    <section id="webserver" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🌐 Web Server</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Setup Nginx, SSL, PHP, dan Node.js untuk serve aplikasi web Anda.
          </p>
        </div>

        {/* Nginx */}
        <CollapsibleSection
          title="Nginx Installation & Configuration"
          defaultOpen={true}
        >
          <div className="space-y-4">
            <CodeBlock 
              code={`# Install Nginx
sudo apt install nginx -y

# Start and enable
sudo systemctl start nginx
sudo systemctl enable nginx

# Test
curl localhost
# atau buka http://YOUR_VPS_IP di browser`}
              title="Install Nginx"
            />

            <h4 className="font-mono font-medium mt-6">Basic Site Configuration</h4>
            <CodeBlock 
              code={`sudo nano /etc/nginx/sites-available/myapp`}
              title="Create Config File"
            />

            <CodeBlock 
              code={`server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /home/deploy/apps/myapp/public;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }

    location ~ /\\.ht {
        deny all;
    }
}`}
              title="Nginx Site Config"
              language="nginx"
            />

            <CodeBlock 
              code={`# Enable site
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload
sudo systemctl reload nginx`}
              title="Enable Site"
            />

            <h4 className="font-mono font-medium mt-6">Reverse Proxy (Node.js/Python)</h4>
            <CodeBlock 
              code={`server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}
              title="Reverse Proxy Config"
              language="nginx"
            />
          </div>
        </CollapsibleSection>

        {/* SSL */}
        <CollapsibleSection
          title="SSL/TLS (Let's Encrypt)"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Let's Encrypt menyediakan SSL certificate gratis dan otomatis renewal.
            </p>

            <CodeBlock 
              code={`# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run

# Verify auto-renewal timer
sudo systemctl status certbot.timer`}
              title="SSL Setup"
            />

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h5 className="font-mono font-medium text-sm text-primary mb-2">✅ Setelah SSL aktif</h5>
              <p className="text-sm text-muted-foreground">
                Certbot akan otomatis menambahkan redirect HTTP ke HTTPS dan mengupdate config Nginx.
                Certificate akan auto-renew setiap 90 hari.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* PHP */}
        <CollapsibleSection
          title="PHP (untuk Laravel/WordPress)"
        >
          <div className="space-y-4">
            <CodeBlock 
              code={`# Add repository
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

# Install PHP 8.2 with extensions
sudo apt install -y \\
  php8.2-fpm \\
  php8.2-cli \\
  php8.2-common \\
  php8.2-mysql \\
  php8.2-pgsql \\
  php8.2-redis \\
  php8.2-xml \\
  php8.2-curl \\
  php8.2-mbstring \\
  php8.2-zip \\
  php8.2-bcmath \\
  php8.2-gd \\
  php8.2-intl`}
              title="Install PHP"
            />

            <CodeBlock 
              code={`# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version`}
              title="Install Composer"
            />
          </div>
        </CollapsibleSection>

        {/* Node.js */}
        <CollapsibleSection
          title="Node.js & NPM"
        >
          <div className="space-y-4">
            <CodeBlock 
              code={`# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node LTS
nvm install --lts
nvm use --lts
node --version
npm --version`}
              title="Install via NVM (Recommended)"
            />

            <CodeBlock 
              code={`# Alternative: NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs`}
              title="Install via NodeSource"
            />

            <CodeBlock 
              code={`# Install PM2 (process manager)
sudo npm install -g pm2

# Setup PM2 startup
pm2 startup

# Start app
pm2 start app.js --name myapp

# Save process list
pm2 save`}
              title="PM2 Process Manager"
            />
          </div>
        </CollapsibleSection>
      </div>
    </section>
  );
};

export default WebServerSection;
