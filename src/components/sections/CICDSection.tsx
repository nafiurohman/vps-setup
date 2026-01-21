import React, { useState } from 'react';
import { GitBranch, Github, GitlabIcon, RefreshCw, CheckCircle, XCircle, Clock, Zap, FileCode, Server, Package } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const cicdTabs = ['GitHub Actions', 'GitLab CI'] as const;

export const CICDSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof cicdTabs[number]>('GitHub Actions');

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🔄 CI/CD Pipeline Setup</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Otomasi deployment dengan Continuous Integration dan Continuous Deployment.
            Deploy aplikasi ke VPS secara otomatis setiap kali push ke repository.
          </p>
        </div>

        {/* What is CI/CD */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-xl font-mono font-semibold mb-4 flex items-center gap-2">
            <RefreshCw className="text-primary" size={20} />
            Apa itu CI/CD?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-mono font-medium text-primary">Continuous Integration (CI)</h3>
              <p className="text-sm text-muted-foreground">
                CI adalah praktik pengembangan dimana developer secara reguler menggabungkan (merge) 
                perubahan kode ke repository utama. Setiap perubahan akan otomatis di-build dan di-test.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Build</span>
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Test</span>
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Lint</span>
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Security Scan</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-mono font-medium text-secondary">Continuous Deployment (CD)</h3>
              <p className="text-sm text-muted-foreground">
                CD adalah praktik dimana setiap perubahan yang lolos semua tahap CI akan secara 
                otomatis di-deploy ke server production atau staging.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary">Deploy</span>
                <span className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary">Rollback</span>
                <span className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary">Notify</span>
                <span className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary">Monitor</span>
              </div>
            </div>
          </div>

          {/* Pipeline Flow */}
          <div className="mt-6 p-4 rounded-lg bg-muted/30">
            <h4 className="text-sm font-mono font-medium mb-4">Pipeline Flow:</h4>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <div className="flex items-center gap-2 p-2 rounded bg-muted">
                <FileCode size={16} className="text-primary" />
                <span>Push Code</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2 p-2 rounded bg-muted">
                <Package size={16} className="text-primary" />
                <span>Build</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2 p-2 rounded bg-muted">
                <CheckCircle size={16} className="text-primary" />
                <span>Test</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2 p-2 rounded bg-muted">
                <Server size={16} className="text-secondary" />
                <span>Deploy</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2 p-2 rounded bg-primary/20 text-primary">
                <Zap size={16} />
                <span>Live!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-xl font-mono font-semibold mb-4">📋 Prerequisites</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm mb-2">Di VPS:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ User dengan sudo access (bukan root)</li>
                <li>✓ SSH key sudah di-setup</li>
                <li>✓ Git sudah terinstall</li>
                <li>✓ Docker (optional) sudah ready</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm mb-2">Di Repository:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ SSH private key sebagai secret</li>
                <li>✓ VPS IP/hostname sebagai secret</li>
                <li>✓ Username untuk SSH</li>
                <li>✓ Path deployment di server</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          {cicdTabs.map((tab) => (
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
              {tab === 'GitHub Actions' ? <Github size={18} /> : <GitlabIcon size={18} />}
              {tab}
            </button>
          ))}
        </div>

        {/* GitHub Actions */}
        {activeTab === 'GitHub Actions' && (
          <div className="space-y-6">
            {/* What is GitHub Actions */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-mono font-semibold mb-3 flex items-center gap-2">
                <Github size={20} />
                Apa itu GitHub Actions?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                GitHub Actions adalah platform CI/CD yang terintegrasi langsung dengan GitHub repository.
                Anda bisa mengotomasi workflow seperti build, test, dan deploy langsung dari repository.
                GitHub Actions menggunakan file YAML yang disimpan di <code className="text-primary">.github/workflows/</code>.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">🆓</div>
                  <div className="text-xs text-muted-foreground">Free tier 2000 mins/bulan</div>
                </div>
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">📦</div>
                  <div className="text-xs text-muted-foreground">Marketplace Actions</div>
                </div>
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">🔐</div>
                  <div className="text-xs text-muted-foreground">Built-in Secrets</div>
                </div>
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-xs text-muted-foreground">Logs & Monitoring</div>
                </div>
              </div>
            </div>

            <CollapsibleSection
              title="Step 1: Setup SSH Keys di VPS"
              stepNumber={1}
              estimatedTime="5 menit"
              difficulty="Beginner"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  GitHub Actions memerlukan SSH access ke VPS untuk deploy. Buat SSH key khusus untuk CI/CD.
                </p>

                <CodeBlock 
                  code={`# Di LOCAL machine, generate SSH key untuk CI/CD
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_key

# Copy public key ke VPS
ssh-copy-id -i ~/.ssh/github_actions_key.pub deploy@YOUR_VPS_IP

# Test connection
ssh -i ~/.ssh/github_actions_key deploy@YOUR_VPS_IP

# PENTING: Copy isi private key (untuk disimpan di GitHub Secrets)
cat ~/.ssh/github_actions_key`}
                  title="Generate Deploy Key"
                />

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <h5 className="font-mono font-medium text-sm text-primary mb-2">🔐 Security Tips</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Gunakan key terpisah khusus untuk CI/CD</li>
                    <li>• Jangan gunakan key pribadi Anda</li>
                    <li>• Private key HANYA disimpan di GitHub Secrets</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 2: Setup GitHub Secrets"
              stepNumber={2}
              estimatedTime="5 menit"
              difficulty="Beginner"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Simpan informasi sensitif di GitHub Secrets agar tidak terekspos di repository.
                </p>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-mono font-medium text-sm mb-3">Cara menambahkan secrets:</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Buka repository di GitHub</li>
                    <li>Pergi ke <strong>Settings → Secrets and variables → Actions</strong></li>
                    <li>Klik <strong>New repository secret</strong></li>
                    <li>Tambahkan secrets berikut:</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">VPS_HOST</span>
                    <span className="text-xs text-muted-foreground">IP address VPS (contoh: 192.168.1.100)</span>
                  </div>
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">VPS_USERNAME</span>
                    <span className="text-xs text-muted-foreground">Username SSH (contoh: deploy)</span>
                  </div>
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">VPS_SSH_KEY</span>
                    <span className="text-xs text-muted-foreground">Private key (isi file github_actions_key)</span>
                  </div>
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">VPS_PORT</span>
                    <span className="text-xs text-muted-foreground">SSH port (default: 22)</span>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 3: Workflow untuk Laravel"
              stepNumber={3}
              estimatedTime="10 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Buat file workflow di <code className="text-primary">.github/workflows/deploy.yml</code>
                </p>

                <CodeBlock 
                  code={`name: Deploy Laravel to VPS

on:
  push:
    branches: [main, master]
  workflow_dispatch:  # Manual trigger

env:
  APP_PATH: /home/deploy/apps/myapp

jobs:
  test:
    name: 🧪 Run Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          extensions: mbstring, xml, ctype, json, bcmath, pdo_mysql
          coverage: none
      
      - name: Install dependencies
        run: composer install --prefer-dist --no-progress
      
      - name: Copy environment
        run: cp .env.example .env
      
      - name: Generate key
        run: php artisan key:generate
      
      - name: Run tests
        run: php artisan test

  deploy:
    name: 🚀 Deploy to VPS
    runs-on: ubuntu-latest
    needs: test  # Hanya deploy jika test berhasil
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: \${{ secrets.VPS_SSH_KEY }}
      
      - name: Add VPS to known_hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H \${{ secrets.VPS_HOST }} >> ~/.ssh/known_hosts
      
      - name: Deploy to VPS
        run: |
          ssh \${{ secrets.VPS_USERNAME }}@\${{ secrets.VPS_HOST }} << 'EOF'
            cd \${{ env.APP_PATH }}
            
            # Pull latest code
            git pull origin main
            
            # Install dependencies
            composer install --no-dev --optimize-autoloader
            
            # Run migrations
            php artisan migrate --force
            
            # Clear and rebuild cache
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            php artisan optimize
            
            # Restart queue workers (if using)
            php artisan queue:restart
            
            # Reload PHP-FPM
            sudo systemctl reload php8.2-fpm
            
            echo "✅ Deployment completed!"
          EOF
      
      - name: Notify success
        if: success()
        run: echo "🎉 Deployment successful!"
      
      - name: Notify failure
        if: failure()
        run: echo "❌ Deployment failed!"`}
                  title=".github/workflows/deploy.yml"
                  language="yaml"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 4: Workflow untuk Node.js"
              stepNumber={4}
              estimatedTime="10 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`name: Deploy Node.js to VPS

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  APP_PATH: /home/deploy/apps/nodeapp
  NODE_VERSION: '20'

jobs:
  build-and-test:
    name: 🔨 Build & Test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build

  deploy:
    name: 🚀 Deploy to VPS
    runs-on: ubuntu-latest
    needs: build-and-test
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: \${{ secrets.VPS_SSH_KEY }}
      
      - name: Add known hosts
        run: ssh-keyscan -H \${{ secrets.VPS_HOST }} >> ~/.ssh/known_hosts
      
      - name: Deploy via SSH
        run: |
          ssh \${{ secrets.VPS_USERNAME }}@\${{ secrets.VPS_HOST }} << 'EOF'
            cd \${{ env.APP_PATH }}
            
            # Pull latest
            git pull origin main
            
            # Install production dependencies
            npm ci --production
            
            # Build if needed
            npm run build
            
            # Restart with PM2
            pm2 restart ecosystem.config.js --env production
            
            # Or restart specific app
            # pm2 restart myapp
            
            echo "✅ Node.js deployment completed!"
          EOF`}
                  title=".github/workflows/deploy-node.yml"
                  language="yaml"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 5: Workflow dengan Docker"
              stepNumber={5}
              estimatedTime="15 menit"
              difficulty="Advanced"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Deploy menggunakan Docker untuk konsistensi environment antara development dan production.
                </p>

                <CodeBlock 
                  code={`name: Docker Deploy to VPS

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build-push:
    name: 🐳 Build & Push Docker Image
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    outputs:
      image_tag: \${{ steps.meta.outputs.tags }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=
            type=raw,value=latest
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}

  deploy:
    name: 🚀 Deploy to VPS
    runs-on: ubuntu-latest
    needs: build-push
    
    steps:
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: \${{ secrets.VPS_SSH_KEY }}
      
      - name: Deploy container
        run: |
          ssh \${{ secrets.VPS_USERNAME }}@\${{ secrets.VPS_HOST }} << 'EOF'
            # Login to registry
            echo \${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u \${{ github.actor }} --password-stdin
            
            # Pull new image
            docker pull \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
            
            # Stop and remove old container
            docker stop myapp || true
            docker rm myapp || true
            
            # Run new container
            docker run -d \\
              --name myapp \\
              --restart unless-stopped \\
              -p 3000:3000 \\
              --env-file /home/deploy/apps/.env \\
              \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
            
            # Cleanup old images
            docker image prune -f
            
            echo "✅ Docker deployment completed!"
          EOF`}
                  title=".github/workflows/docker-deploy.yml"
                  language="yaml"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* GitLab CI */}
        {activeTab === 'GitLab CI' && (
          <div className="space-y-6">
            {/* What is GitLab CI */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-mono font-semibold mb-3 flex items-center gap-2">
                <GitlabIcon size={20} />
                Apa itu GitLab CI/CD?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                GitLab CI/CD adalah fitur bawaan GitLab untuk continuous integration dan deployment.
                Konfigurasi pipeline disimpan di file <code className="text-primary">.gitlab-ci.yml</code> di root repository.
                GitLab menyediakan shared runners gratis atau Anda bisa setup self-hosted runner.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs text-muted-foreground">400 mins/bulan (free)</div>
                </div>
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">📦</div>
                  <div className="text-xs text-muted-foreground">Container Registry</div>
                </div>
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">🔐</div>
                  <div className="text-xs text-muted-foreground">Protected Variables</div>
                </div>
                <div className="p-3 rounded bg-muted/30 text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-xs text-muted-foreground">Environments</div>
                </div>
              </div>
            </div>

            <CollapsibleSection
              title="Step 1: Setup Variables di GitLab"
              stepNumber={1}
              estimatedTime="5 menit"
              difficulty="Beginner"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Simpan credentials di GitLab CI/CD Variables.
                </p>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-mono font-medium text-sm mb-3">Cara menambahkan variables:</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Buka project di GitLab</li>
                    <li>Pergi ke <strong>Settings → CI/CD → Variables</strong></li>
                    <li>Klik <strong>Add variable</strong></li>
                    <li>Centang <strong>"Mask variable"</strong> untuk data sensitif</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">SSH_PRIVATE_KEY</span>
                    <span className="text-xs text-muted-foreground">Private key untuk SSH (masked)</span>
                  </div>
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">VPS_HOST</span>
                    <span className="text-xs text-muted-foreground">IP atau hostname VPS</span>
                  </div>
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">VPS_USER</span>
                    <span className="text-xs text-muted-foreground">Username SSH</span>
                  </div>
                  <div className="p-3 rounded bg-muted/30 flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">DEPLOY_PATH</span>
                    <span className="text-xs text-muted-foreground">Path aplikasi di server</span>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 2: GitLab CI untuk Laravel"
              stepNumber={2}
              estimatedTime="10 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Buat file <code className="text-primary">.gitlab-ci.yml</code> di root repository.
                </p>

                <CodeBlock 
                  code={`stages:
  - test
  - build
  - deploy

variables:
  MYSQL_DATABASE: test_db
  MYSQL_ROOT_PASSWORD: secret

# Cache Composer dependencies
cache:
  paths:
    - vendor/
    - node_modules/

# Test Stage
test:
  stage: test
  image: php:8.2-cli
  services:
    - mysql:8.0
  before_script:
    - apt-get update && apt-get install -y git unzip libzip-dev libpng-dev
    - docker-php-ext-install pdo_mysql zip gd
    - curl -sS https://getcomposer.org/installer | php
    - php composer.phar install --prefer-dist --no-progress
    - cp .env.testing .env
    - php artisan key:generate
  script:
    - php artisan test --parallel
  only:
    - merge_requests
    - main

# Build Stage
build:
  stage: build
  image: node:20-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - public/build/
    expire_in: 1 hour
  only:
    - main

# Deploy Stage
deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan -H $VPS_HOST >> ~/.ssh/known_hosts
  script:
    - |
      ssh $VPS_USER@$VPS_HOST << EOF
        cd $DEPLOY_PATH
        
        # Maintenance mode
        php artisan down --retry=60
        
        # Pull latest
        git pull origin main
        
        # Install dependencies
        composer install --no-dev --optimize-autoloader
        
        # Run migrations
        php artisan migrate --force
        
        # Rebuild cache
        php artisan config:cache
        php artisan route:cache
        php artisan view:cache
        
        # Restart queue
        php artisan queue:restart
        
        # Bring back online
        php artisan up
        
        echo "✅ Deployment completed!"
      EOF
  environment:
    name: production
    url: https://yourdomain.com
  only:
    - main
  when: manual  # Require manual trigger`}
                  title=".gitlab-ci.yml"
                  language="yaml"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 3: GitLab CI untuk Node.js"
              stepNumber={3}
              estimatedTime="10 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "20"

cache:
  key: \${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/

# Test Stage
test:
  stage: test
  image: node:\${NODE_VERSION}-alpine
  script:
    - npm ci --cache .npm
    - npm run lint
    - npm test
  coverage: '/Lines\\s*:\\s*(\\d+\\.\\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

# Build Stage
build:
  stage: build
  image: node:\${NODE_VERSION}-alpine
  script:
    - npm ci --cache .npm
    - npm run build
  artifacts:
    paths:
      - dist/
      - build/
    expire_in: 1 day
  only:
    - main
    - tags

# Deploy Stage
deploy:
  stage: deploy
  image: alpine:latest
  dependencies:
    - build
  before_script:
    - apk add --no-cache openssh-client rsync
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | ssh-add -
    - mkdir -p ~/.ssh && chmod 700 ~/.ssh
    - ssh-keyscan -H $VPS_HOST >> ~/.ssh/known_hosts
  script:
    # Sync build files
    - rsync -avz --delete dist/ $VPS_USER@$VPS_HOST:$DEPLOY_PATH/
    
    # Restart app
    - |
      ssh $VPS_USER@$VPS_HOST << EOF
        cd $DEPLOY_PATH
        npm ci --production
        pm2 restart ecosystem.config.js
        echo "✅ Deployed!"
      EOF
  environment:
    name: production
  only:
    - main`}
                  title=".gitlab-ci.yml (Node.js)"
                  language="yaml"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Step 4: Docker Deploy dengan GitLab"
              stepNumber={4}
              estimatedTime="15 menit"
              difficulty="Advanced"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`stages:
  - build
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

# Build Docker Image
build:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
    # Also tag as latest
    - docker tag $DOCKER_IMAGE $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main

# Deploy to VPS
deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | ssh-add -
    - mkdir -p ~/.ssh && chmod 700 ~/.ssh
    - ssh-keyscan -H $VPS_HOST >> ~/.ssh/known_hosts
  script:
    - |
      ssh $VPS_USER@$VPS_HOST << EOF
        # Login to GitLab registry
        docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
        
        # Pull new image
        docker pull $DOCKER_IMAGE
        
        # Stop old container
        docker stop myapp || true
        docker rm myapp || true
        
        # Run new container
        docker run -d \\
          --name myapp \\
          --restart unless-stopped \\
          -p 3000:3000 \\
          --env-file $DEPLOY_PATH/.env \\
          $DOCKER_IMAGE
        
        # Cleanup
        docker image prune -f
        
        echo "✅ Docker deployed!"
      EOF
  environment:
    name: production
  only:
    - main`}
                  title=".gitlab-ci.yml (Docker)"
                  language="yaml"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Best Practices */}
        <div className="glass rounded-lg p-6 mt-8">
          <h3 className="text-lg font-mono font-semibold mb-4">💡 CI/CD Best Practices</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm text-primary mb-2">✅ Do's</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Selalu test sebelum deploy</li>
                <li>• Gunakan environment secrets</li>
                <li>• Implement rollback strategy</li>
                <li>• Monitor deployment status</li>
                <li>• Keep pipeline fast (&lt;10 mins)</li>
                <li>• Use caching untuk dependencies</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-sm text-destructive mb-2">❌ Don'ts</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Jangan hardcode credentials</li>
                <li>• Jangan deploy tanpa testing</li>
                <li>• Jangan ignore failed builds</li>
                <li>• Jangan deploy ke production otomatis tanpa review</li>
                <li>• Jangan skip security scans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CICDSection;
