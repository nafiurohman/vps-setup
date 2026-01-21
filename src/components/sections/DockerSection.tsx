import React from 'react';
import { Container, ExternalLink, Info } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';

export const DockerSection: React.FC = () => {
  return (
    <section id="docker" className="py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🐳 Docker & Docker Compose</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Containerize aplikasi untuk deployment yang konsisten, portable, dan mudah di-scale.
          </p>
        </div>

        {/* What is Docker */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-xl font-mono font-semibold mb-4 flex items-center gap-2">
            <Info className="text-primary" size={20} />
            Apa itu Docker?
          </h2>
          
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Docker</strong> adalah platform open-source untuk developing, shipping, dan running aplikasi dalam container. 
              Container adalah unit standar software yang mengemas kode beserta semua dependensinya sehingga aplikasi berjalan secara konsisten 
              di berbagai environment (development, staging, production).
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-mono font-medium text-sm mb-2 text-primary">🎯 Keuntungan Docker</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Konsistensi environment (dev = prod)</li>
                  <li>✓ Isolasi aplikasi dan dependensi</li>
                  <li>✓ Deployment cepat dan mudah</li>
                  <li>✓ Resource lebih efisien dari VM</li>
                  <li>✓ Scalability horizontal mudah</li>
                  <li>✓ Version control untuk infrastructure</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-mono font-medium text-sm mb-2 text-secondary">📦 Konsep Utama</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>Image:</strong> Template read-only untuk container</li>
                  <li><strong>Container:</strong> Instance dari image yang berjalan</li>
                  <li><strong>Dockerfile:</strong> Script untuk build image</li>
                  <li><strong>Registry:</strong> Penyimpanan image (Docker Hub)</li>
                  <li><strong>Volume:</strong> Persistent data storage</li>
                  <li><strong>Network:</strong> Komunikasi antar container</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mt-4">
              <h5 className="font-mono font-medium text-sm text-primary mb-2 flex items-center gap-2">
                <ExternalLink size={14} />
                Official Documentation
              </h5>
              <p className="text-sm">
                Untuk dokumentasi lengkap, kunjungi:{' '}
                <a 
                  href="https://docs.docker.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://docs.docker.com/
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Docker Installation */}
        <CollapsibleSection
          title="Docker Installation"
          stepNumber={1}
          estimatedTime="10 menit"
          difficulty="Beginner"
          defaultOpen={true}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Instalasi Docker Engine pada Ubuntu. Docker akan menjalankan container dengan kernel Linux host.
            </p>

            <CodeBlock 
              code={`# Hapus versi lama Docker (jika ada)
# Perintah ini menghapus package Docker yang mungkin sudah terinstall
sudo apt remove docker docker-engine docker.io containerd runc

# Install dependencies yang diperlukan
# - apt-transport-https: Mengaktifkan apt untuk download via HTTPS
# - ca-certificates: Certificate authority untuk verifikasi SSL
# - curl: Tool untuk transfer data dari URL
# - gnupg: GNU Privacy Guard untuk verifikasi signature
# - lsb-release: Menampilkan info distribusi Linux
sudo apt install -y \\
  apt-transport-https \\
  ca-certificates \\
  curl \\
  gnupg \\
  lsb-release

# Tambahkan Docker GPG key (untuk verifikasi package)
# GPG key memastikan package yang didownload asli dari Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Tambahkan Docker repository ke apt sources
# Ini memungkinkan apt untuk menemukan package Docker
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \\
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`}
              title="1. Persiapan Repository"
            />

            <CodeBlock 
              code={`# Update package list dengan repository baru
sudo apt update

# Install Docker Engine dan komponennya:
# - docker-ce: Docker Community Edition (engine utama)
# - docker-ce-cli: Command-line interface untuk Docker
# - containerd.io: Container runtime
# - docker-buildx-plugin: Plugin untuk build multi-platform
# - docker-compose-plugin: Docker Compose v2 sebagai plugin
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Tambahkan user saat ini ke group docker
# Ini memungkinkan menjalankan docker tanpa sudo
sudo usermod -aG docker $USER

# Aktifkan perubahan group tanpa logout
# Atau bisa logout dan login kembali
newgrp docker

# Test instalasi dengan menjalankan container hello-world
docker run hello-world

# Cek versi Docker yang terinstall
docker --version
docker compose version

# Enable Docker service agar start otomatis saat boot
sudo systemctl enable docker`}
              title="2. Install Docker"
            />

            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
              <h5 className="font-mono font-medium text-sm text-secondary mb-2">💡 Tips</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Setelah <code>usermod -aG docker</code>, perlu logout/login agar berlaku</li>
                <li>• Gunakan <code>newgrp docker</code> untuk apply langsung tanpa logout</li>
                <li>• Jika error permission, coba jalankan dengan <code>sudo</code></li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* Docker Compose */}
        <CollapsibleSection
          title="Docker Compose - Multi-Container Orchestration"
          stepNumber={2}
          estimatedTime="15 menit"
          difficulty="Intermediate"
        >
          <div className="space-y-4">
            <div className="text-muted-foreground text-sm space-y-2">
              <p>
                <strong className="text-foreground">Docker Compose</strong> adalah tool untuk mendefinisikan dan menjalankan 
                multi-container Docker applications. Dengan Compose, kamu bisa mengkonfigurasi semua services aplikasi 
                dalam satu file YAML.
              </p>
              <p>
                Dokumentasi lengkap: <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://docs.docker.com/compose/</a>
              </p>
            </div>

            <CodeBlock 
              code={`# docker-compose.yml
# File konfigurasi Docker Compose untuk full-stack application
# Versi 3.8 adalah versi stabil dengan fitur lengkap

version: '3.8'

services:
  # ======================
  # NGINX - Web Server / Reverse Proxy
  # ======================
  # Nginx bertindak sebagai reverse proxy, meneruskan request ke container app
  nginx:
    image: nginx:alpine          # Image ringan berbasis Alpine Linux (~23MB)
    container_name: nginx        # Nama container untuk identifikasi
    ports:
      - "80:80"                  # Map port 80 host ke port 80 container (HTTP)
      - "443:443"                # Map port 443 host ke port 443 container (HTTPS)
    volumes:
      # Mount file konfigurasi Nginx dari host
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro  # :ro = read-only
      # Mount folder aplikasi
      - ./apps:/var/www/html
    depends_on:
      - app                      # Tunggu container 'app' start dulu
    restart: unless-stopped      # Auto restart kecuali di-stop manual
    networks:
      - app-network

  # ======================
  # APP - Application Container
  # ======================
  # Container untuk aplikasi (PHP/Node/Python)
  app:
    build: 
      context: ./app             # Path ke Dockerfile
      dockerfile: Dockerfile     # Nama file Dockerfile
    container_name: app
    volumes:
      # Mount source code untuk development
      # Perubahan di host langsung terlihat di container
      - ./apps/myapp:/var/www/html
    environment:
      # Environment variables untuk konfigurasi aplikasi
      # Nilai ini bisa diakses di dalam aplikasi
      - APP_ENV=production
      - APP_DEBUG=false
      - DB_HOST=db               # Hostname = nama service
      - DB_PORT=3306
      - DB_DATABASE=myapp
      - DB_USERNAME=myapp_user
      - DB_PASSWORD=strong_password
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - db                       # Tunggu database ready
      - redis                    # Tunggu redis ready
    restart: unless-stopped
    networks:
      - app-network

  # ======================
  # DB - MySQL Database
  # ======================
  # Container database MySQL 8.0
  db:
    image: mysql:8.0
    container_name: mysql
    environment:
      # Konfigurasi awal MySQL
      MYSQL_ROOT_PASSWORD: root_password_kuat    # Password root (WAJIB diganti!)
      MYSQL_DATABASE: myapp                       # Database yang dibuat otomatis
      MYSQL_USER: myapp_user                      # User non-root
      MYSQL_PASSWORD: strong_password             # Password user
    volumes:
      # Named volume untuk persistent data
      # Data tidak hilang meski container dihapus
      - db_data:/var/lib/mysql
      # Mount custom config (optional)
      - ./mysql/my.cnf:/etc/mysql/conf.d/my.cnf:ro
    ports:
      - "3306:3306"              # Expose untuk akses dari host (optional)
    restart: unless-stopped
    networks:
      - app-network

  # ======================
  # REDIS - Cache & Queue
  # ======================
  # Redis untuk caching dan message queue
  redis:
    image: redis:alpine          # Image ringan (~28MB)
    container_name: redis
    command: redis-server --appendonly yes  # Aktifkan persistence
    volumes:
      - redis_data:/data         # Persistent storage
    restart: unless-stopped
    networks:
      - app-network

# ======================
# VOLUMES
# ======================
# Named volumes untuk persistent data
# Data disimpan di /var/lib/docker/volumes/
volumes:
  db_data:                       # Volume untuk MySQL
    driver: local
  redis_data:                    # Volume untuk Redis
    driver: local

# ======================
# NETWORKS
# ======================
# Custom network untuk komunikasi antar container
networks:
  app-network:
    driver: bridge               # Default network driver`}
              title="docker-compose.yml - Full Stack Example"
              language="yaml"
            />

            <div className="p-4 rounded-lg bg-muted/30">
              <h5 className="font-mono font-medium text-sm text-primary mb-2">📝 Penjelasan Key Concepts</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p><strong>services:</strong> Definisi container yang akan dijalankan</p>
                  <p><strong>image:</strong> Docker image yang digunakan</p>
                  <p><strong>build:</strong> Build image dari Dockerfile</p>
                  <p><strong>ports:</strong> Port mapping host:container</p>
                </div>
                <div>
                  <p><strong>volumes:</strong> Mount folder/file ke container</p>
                  <p><strong>environment:</strong> Environment variables</p>
                  <p><strong>depends_on:</strong> Urutan start container</p>
                  <p><strong>networks:</strong> Network untuk komunikasi</p>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={`# Menjalankan semua services di background (-d = detached mode)
docker compose up -d

# Melihat status semua container
docker compose ps

# Melihat logs semua container (follow mode)
docker compose logs -f

# Melihat logs container tertentu
docker compose logs -f nginx
docker compose logs -f app

# Stop semua container tanpa menghapus
docker compose stop

# Start container yang sudah di-stop
docker compose start

# Restart semua container
docker compose restart

# Stop dan hapus semua container, network, volume
docker compose down

# Rebuild image dan restart
docker compose up -d --build

# Scale service (misal: jalankan 3 instance app)
docker compose up -d --scale app=3`}
              title="Docker Compose Commands"
            />
          </div>
        </CollapsibleSection>

        {/* Common Docker Commands */}
        <CollapsibleSection
          title="Essential Docker Commands"
          stepNumber={3}
          estimatedTime="10 menit"
          difficulty="Beginner"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Command-command Docker yang paling sering digunakan untuk mengelola containers dan images.
            </p>

            <CodeBlock 
              code={`# ====================
# CONTAINER MANAGEMENT
# ====================

# List container yang sedang berjalan
docker ps

# List semua container (termasuk yang stopped)
docker ps -a

# Jalankan container baru dari image
# -d: detached (background)
# -p: port mapping
# --name: nama container
docker run -d -p 80:80 --name webserver nginx

# Stop container
docker stop <container_id>
docker stop webserver

# Start container yang sudah ada
docker start <container_id>

# Restart container
docker restart <container_id>

# Hapus container (harus stop dulu)
docker rm <container_id>

# Force hapus container yang sedang jalan
docker rm -f <container_id>

# Masuk ke dalam container (interactive bash)
docker exec -it <container_id> bash
docker exec -it webserver sh  # untuk alpine (tidak ada bash)

# Jalankan command di dalam container
docker exec <container_id> ls -la /var/www

# Lihat logs container
docker logs <container_id>
docker logs -f <container_id>  # follow (real-time)
docker logs --tail 100 <container_id>  # 100 baris terakhir`}
              title="Container Management"
            />

            <CodeBlock 
              code={`# ====================
# IMAGE MANAGEMENT
# ====================

# List semua images
docker images
docker image ls

# Pull image dari Docker Hub
docker pull nginx:latest
docker pull mysql:8.0
docker pull node:20-alpine

# Build image dari Dockerfile
docker build -t myapp:latest .
docker build -t myapp:v1.0 -f Dockerfile.prod .

# Tag image (untuk push ke registry)
docker tag myapp:latest username/myapp:latest

# Push image ke Docker Hub
docker login
docker push username/myapp:latest

# Hapus image
docker rmi <image_id>
docker rmi nginx:latest

# Hapus semua unused images
docker image prune -a`}
              title="Image Management"
            />

            <CodeBlock 
              code={`# ====================
# VOLUME & NETWORK
# ====================

# List volumes
docker volume ls

# Buat volume
docker volume create myvolume

# Hapus volume
docker volume rm myvolume

# List networks
docker network ls

# Buat network
docker network create mynetwork

# Hubungkan container ke network
docker network connect mynetwork <container_id>

# ====================
# SYSTEM & CLEANUP
# ====================

# Info sistem Docker
docker info
docker version

# Lihat disk usage
docker system df

# Cleanup unused resources (hati-hati!)
docker system prune          # Hapus stopped containers, unused networks, dangling images
docker system prune -a       # Hapus semua unused images juga
docker system prune --volumes  # Termasuk volumes

# Inspect detail container/image
docker inspect <container_id>
docker inspect nginx:latest`}
              title="Volume, Network & System"
            />

            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h5 className="font-mono font-medium text-sm text-destructive mb-2">⚠️ Peringatan</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code>docker system prune -a</code> menghapus SEMUA unused images</li>
                <li>• <code>docker system prune --volumes</code> menghapus data volumes</li>
                <li>• Selalu backup data penting sebelum cleanup</li>
                <li>• Gunakan named volumes untuk data yang perlu persist</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* Dockerfile */}
        <CollapsibleSection
          title="Dockerfile - Building Custom Images"
          stepNumber={4}
          estimatedTime="15 menit"
          difficulty="Intermediate"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Dockerfile adalah script yang berisi instruksi untuk membangun Docker image. 
              Setiap instruksi membuat layer baru di image.
            </p>

            <CodeBlock 
              code={`# ====================
# Dockerfile untuk Laravel/PHP Application
# ====================

# Base image - PHP 8.2 dengan FPM (FastCGI Process Manager)
# Alpine Linux dipilih karena ukurannya kecil (~5MB)
FROM php:8.2-fpm-alpine

# Label metadata
LABEL maintainer="bezn.sup@gmail.com"
LABEL version="1.0"
LABEL description="Laravel Application Container"

# Set working directory
# Semua command selanjutnya dijalankan dari direktori ini
WORKDIR /var/www/html

# Install system dependencies
# apk adalah package manager untuk Alpine Linux
RUN apk add --no-cache \\
    # Build dependencies (akan dihapus nanti)
    $PHPIZE_DEPS \\
    # Library untuk extension PHP
    libpng-dev \\
    libjpeg-turbo-dev \\
    freetype-dev \\
    libzip-dev \\
    icu-dev \\
    oniguruma-dev \\
    # Tools yang diperlukan
    git \\
    curl \\
    zip \\
    unzip

# Install PHP extensions
# docker-php-ext-configure: konfigurasi extension
# docker-php-ext-install: install extension
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \\
    && docker-php-ext-install -j$(nproc) \\
    pdo \\
    pdo_mysql \\
    gd \\
    mbstring \\
    zip \\
    bcmath \\
    intl \\
    opcache

# Install Composer (PHP dependency manager)
# Disalin dari official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy source code aplikasi
# .dockerignore digunakan untuk exclude file yang tidak perlu
COPY . .

# Install dependencies PHP (production mode)
# --no-dev: skip development dependencies
# --optimize-autoloader: optimasi autoloading
RUN composer install --no-dev --optimize-autoloader

# Set permissions
# www-data adalah user default untuk web server
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 9000 (PHP-FPM default port)
EXPOSE 9000

# Command yang dijalankan saat container start
CMD ["php-fpm"]`}
              title="Dockerfile - PHP/Laravel"
              language="dockerfile"
            />

            <CodeBlock 
              code={`# ====================
# Dockerfile untuk Node.js Application
# ====================

# Stage 1: Build
# Multi-stage build untuk menghasilkan image yang lebih kecil
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files terlebih dahulu
# Ini memungkinkan Docker cache layer dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build aplikasi (jika ada build step)
RUN npm run build

# Stage 2: Production
# Image akhir hanya berisi file yang diperlukan untuk production
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files dari stage builder
COPY --from=builder /app/dist ./dist

# Buat user non-root untuk security
RUN addgroup -g 1001 -S nodejs \\
    && adduser -S nodejs -u 1001

# Ganti ke user non-root
USER nodejs

# Expose port aplikasi
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start aplikasi
CMD ["node", "dist/index.js"]`}
              title="Dockerfile - Node.js (Multi-stage)"
              language="dockerfile"
            />

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h5 className="font-mono font-medium text-sm text-primary mb-2">💡 Best Practices Dockerfile</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gunakan multi-stage build untuk image yang lebih kecil</li>
                <li>• Urutkan instruksi dari yang jarang berubah ke sering berubah</li>
                <li>• Gabungkan RUN commands untuk mengurangi layers</li>
                <li>• Jangan jalankan sebagai root (buat user non-root)</li>
                <li>• Gunakan .dockerignore untuk exclude file yang tidak perlu</li>
                <li>• Selalu gunakan tag spesifik (hindari :latest)</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* Resources */}
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="text-primary" size={20} />
            📚 Resources & Documentation
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://docs.docker.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <h4 className="font-mono font-medium text-sm text-primary mb-1">Docker Docs</h4>
              <p className="text-xs text-muted-foreground">Dokumentasi resmi Docker Engine</p>
            </a>
            <a 
              href="https://docs.docker.com/compose/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <h4 className="font-mono font-medium text-sm text-primary mb-1">Docker Compose</h4>
              <p className="text-xs text-muted-foreground">Panduan Docker Compose</p>
            </a>
            <a 
              href="https://hub.docker.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <h4 className="font-mono font-medium text-sm text-primary mb-1">Docker Hub</h4>
              <p className="text-xs text-muted-foreground">Registry untuk Docker images</p>
            </a>
            <a 
              href="https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <h4 className="font-mono font-medium text-sm text-primary mb-1">Dockerfile Best Practices</h4>
              <p className="text-xs text-muted-foreground">Best practices untuk Dockerfile</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DockerSection;
