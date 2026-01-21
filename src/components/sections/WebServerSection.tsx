import React, { useState } from 'react';
import { Globe, Lock, Code, Server, Shield, Zap, Settings, FileText, Database, Terminal } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const webServerTabs = ['Nginx', 'Apache', 'Performance'] as const;

export const WebServerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof webServerTabs[number]>('Nginx');

  return (
    <section id="webserver" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🌐 Web Server Setup</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Setup lengkap web server dengan Nginx/Apache, SSL, PHP, Node.js, dan optimasi performa untuk production.
          </p>
        </div>

        {/* Web Server Comparison */}
        <div className="glass rounded-lg p-6 mb-8">
          <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
            <Server className="text-primary" size={20} />
            Nginx vs Apache - Pilih yang Tepat
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h4 className="font-mono font-medium text-primary mb-3">🚀 Nginx (Recommended)</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground"><strong>Kelebihan:</strong></p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• Performa tinggi untuk static files</li>
                  <li>• Memory usage rendah</li>
                  <li>• Excellent reverse proxy</li>
                  <li>• Load balancing built-in</li>
                  <li>• HTTP/2 & HTTP/3 support</li>
                </ul>
                <p className="text-muted-foreground mt-2"><strong>Cocok untuk:</strong> Modern apps, API, microservices, high traffic</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-muted-foreground mb-3">🏛️ Apache</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground"><strong>Kelebihan:</strong></p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• .htaccess support</li>
                  <li>• Banyak modules</li>
                  <li>• Dokumentasi lengkap</li>
                  <li>• Mature & stable</li>
                </ul>
                <p className="text-muted-foreground mt-2"><strong>Cocok untuk:</strong> Legacy apps, shared hosting, WordPress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          {webServerTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-3 rounded-lg font-mono text-sm transition-all flex items-center gap-2",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {tab === 'Nginx' && <Server size={18} />}
              {tab === 'Apache' && <Globe size={18} />}
              {tab === 'Performance' && <Zap size={18} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Nginx Tab */}
        {activeTab === 'Nginx' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="Nginx Installation & Basic Setup"
              stepNumber={1}
              estimatedTime="10 menit"
              difficulty="Beginner"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Nginx adalah web server performa tinggi yang juga berfungsi sebagai reverse proxy, load balancer, dan HTTP cache.
                </p>

                <CodeBlock 
                  code={`# Update package list
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Start and enable auto-start
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx

# Test installation
curl -I localhost
# atau buka http://YOUR_VPS_IP di browser

# Check Nginx version
nginx -v`}
                  title="Install Nginx"
                />

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <h5 className="font-mono font-medium text-sm text-primary mb-2">📁 Nginx Directory Structure</h5>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><code>/etc/nginx/</code> - Main configuration directory</p>
                    <p><code>/etc/nginx/nginx.conf</code> - Main config file</p>
                    <p><code>/etc/nginx/sites-available/</code> - Available site configs</p>
                    <p><code>/etc/nginx/sites-enabled/</code> - Enabled site configs (symlinks)</p>
                    <p><code>/var/log/nginx/</code> - Log files</p>
                    <p><code>/var/www/html/</code> - Default document root</p>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Nginx Main Configuration"
              stepNumber={2}
              estimatedTime="15 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Konfigurasi utama Nginx untuk optimasi performa dan keamanan.
                </p>

                <CodeBlock 
                  code={`sudo nano /etc/nginx/nginx.conf`}
                  title="Edit Main Config"
                />

                <CodeBlock 
                  code={`# /etc/nginx/nginx.conf
# Optimized configuration for production

user www-data;
# Set to number of CPU cores
worker_processes auto;

# Maximum file descriptors per worker
worker_rlimit_nofile 65535;

pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    # Maximum connections per worker
    worker_connections 1024;
    
    # Use epoll for better performance on Linux
    use epoll;
    
    # Accept multiple connections at once
    multi_accept on;
}

http {
    ##
    # Basic Settings
    ##
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    
    # Timeout settings
    keepalive_timeout 65;
    keepalive_requests 100;
    client_body_timeout 12;
    client_header_timeout 12;
    send_timeout 10;
    
    # Buffer sizes
    client_body_buffer_size 10K;
    client_header_buffer_size 1k;
    client_max_body_size 8m;
    large_client_header_buffers 2 1k;
    
    types_hash_max_size 2048;
    server_tokens off;  # Hide Nginx version
    
    # MIME types
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    ##
    # SSL Settings (for HTTPS)
    ##
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    ##
    # Logging Settings
    ##
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;
    
    ##
    # Gzip Settings
    ##
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    ##
    # Rate Limiting
    ##
    limit_req_zone $binary_remote_addr zone=login:10m rate=10r/m;
    limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
    
    ##
    # Virtual Host Configs
    ##
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}`}
                  title="Optimized nginx.conf"
                  language="nginx"
                />

                <CodeBlock 
                  code={`# Test configuration
sudo nginx -t

# If OK, reload
sudo systemctl reload nginx

# Check if reload successful
sudo systemctl status nginx`}
                  title="Apply Configuration"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Virtual Host Configuration (PHP/Laravel)"
              stepNumber={3}
              estimatedTime="20 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Konfigurasi virtual host untuk aplikasi PHP/Laravel dengan optimasi keamanan dan performa.
                </p>

                <CodeBlock 
                  code={`sudo nano /etc/nginx/sites-available/myapp.conf`}
                  title="Create Site Config"
                />

                <CodeBlock 
                  code={`# /etc/nginx/sites-available/myapp.conf
# Production-ready Laravel/PHP configuration

server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Document root
    root /home/deploy/apps/myapp/public;
    index index.php index.html index.htm;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Logging
    access_log /var/log/nginx/myapp_access.log;
    error_log /var/log/nginx/myapp_error.log;
    
    # Main location block
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    # PHP-FPM configuration
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        
        # Security
        fastcgi_hide_header X-Powered-By;
        
        # Timeouts
        fastcgi_connect_timeout 60s;
        fastcgi_send_timeout 60s;
        fastcgi_read_timeout 60s;
    }
    
    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|txt)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Laravel specific
    location ~ /\.(?!well-known).* {
        deny all;
    }
    
    # Deny access to sensitive files
    location ~ /(\.|composer\.(json|lock)|package\.json|yarn\.lock) {
        deny all;
        return 404;
    }
    
    # Rate limiting for login
    location ~ ^/(login|admin) {
        limit_req zone=login burst=5 nodelay;
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    # Favicon
    location = /favicon.ico {
        access_log off;
        log_not_found off;
    }
    
    # Robots.txt
    location = /robots.txt {
        access_log off;
        log_not_found off;
    }
}`}
                  title="Laravel/PHP Virtual Host"
                  language="nginx"
                />

                <CodeBlock 
                  code={`# Enable site
sudo ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check if site is accessible
curl -H "Host: yourdomain.com" http://localhost`}
                  title="Enable Site"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Reverse Proxy Configuration (Node.js/API)"
              stepNumber={4}
              estimatedTime="15 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Konfigurasi Nginx sebagai reverse proxy untuk aplikasi Node.js, Python, atau API backend.
                </p>

                <CodeBlock 
                  code={`sudo nano /etc/nginx/sites-available/api.conf`}
                  title="Create API Config"
                />

                <CodeBlock 
                  code={`# /etc/nginx/sites-available/api.conf
# Reverse proxy for Node.js/API applications

# Upstream servers (for load balancing)
upstream api_backend {
    # Single server
    server 127.0.0.1:3000;
    
    # Multiple servers for load balancing
    # server 127.0.0.1:3001;
    # server 127.0.0.1:3002;
    
    # Health check
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name api.yourdomain.com;
    
    # Rate limiting
    limit_req zone=api burst=20 nodelay;
    
    # Logging
    access_log /var/log/nginx/api_access.log;
    error_log /var/log/nginx/api_error.log;
    
    # Main proxy location
    location / {
        # Proxy settings
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $server_name;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffering
        proxy_buffering on;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
        
        # Cache bypass
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://api_backend/health;
        access_log off;
    }
    
    # WebSocket support
    location /ws {
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket specific timeouts
        proxy_read_timeout 86400;
    }
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}`}
                  title="API Reverse Proxy Config"
                  language="nginx"
                />

                <CodeBlock 
                  code={`# Enable API site
sudo ln -s /etc/nginx/sites-available/api.conf /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Test proxy (make sure your Node.js app is running on port 3000)
curl -H "Host: api.yourdomain.com" http://localhost`}
                  title="Enable API Site"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Load Balancing & High Availability"
              stepNumber={5}
              estimatedTime="20 menit"
              difficulty="Advanced"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Konfigurasi load balancing untuk distribusi traffic ke multiple backend servers.
                </p>

                <CodeBlock 
                  code={`# /etc/nginx/sites-available/loadbalancer.conf
# Advanced load balancing configuration

# Define upstream servers
upstream app_servers {
    # Load balancing methods:
    # - round_robin (default)
    # - least_conn (least connections)
    # - ip_hash (sticky sessions)
    # - hash (custom key)
    
    least_conn;  # Use least connections method
    
    # Backend servers
    server 10.0.1.10:3000 weight=3 max_fails=3 fail_timeout=30s;
    server 10.0.1.11:3000 weight=2 max_fails=3 fail_timeout=30s;
    server 10.0.1.12:3000 weight=1 max_fails=3 fail_timeout=30s backup;
    
    # Health check
    keepalive 32;
}

# Upstream for static files (CDN/Storage servers)
upstream static_servers {
    server 10.0.2.10:80;
    server 10.0.2.11:80 backup;
}

server {
    listen 80;
    server_name app.yourdomain.com;
    
    # Main application
    location / {
        proxy_pass http://app_servers;
        
        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Health check
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_next_upstream_tries 3;
        proxy_next_upstream_timeout 10s;
    }
    
    # Static files to CDN/Storage
    location /static/ {
        proxy_pass http://static_servers;
        proxy_cache_valid 200 1d;
        expires 1d;
    }
    
    # Health check endpoint
    location /nginx-health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}`}
                  title="Load Balancer Config"
                  language="nginx"
                />

                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                  <h5 className="font-mono font-medium text-sm text-secondary mb-2">⚖️ Load Balancing Methods</h5>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>round_robin:</strong> Default, distribusi merata bergiliran</p>
                    <p><strong>least_conn:</strong> Kirim ke server dengan koneksi paling sedikit</p>
                    <p><strong>ip_hash:</strong> Sticky session berdasarkan IP client</p>
                    <p><strong>hash:</strong> Custom hash key (misal: $request_uri)</p>
                    <p><strong>weight:</strong> Bobot server (weight=3 dapat 3x lebih banyak traffic)</p>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        )}

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
