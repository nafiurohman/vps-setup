import React, { useState } from 'react';
import { Database, Server } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const dbTabs = ['MySQL', 'PostgreSQL', 'Redis'] as const;

export const DatabaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof dbTabs[number]>('MySQL');

  return (
    <section id="database" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">💾 Database Setup</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Konfigurasi database untuk aplikasi Anda. Pilih MySQL, PostgreSQL, atau Redis.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          {dbTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-lg font-mono text-sm transition-all",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MySQL */}
        {activeTab === 'MySQL' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="MySQL / MariaDB Installation"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# Install MySQL
sudo apt install mysql-server -y

# Secure installation
sudo mysql_secure_installation

# Jawab pertanyaan:
# - Set root password: Yes
# - Remove anonymous users: Yes
# - Disallow root login remotely: Yes
# - Remove test database: Yes
# - Reload privilege tables: Yes`}
                  title="Install MySQL"
                />

                <CodeBlock 
                  code={`# Login ke MySQL
sudo mysql -u root -p

# Buat database dan user
CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON myapp.* TO 'myapp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Test connection
mysql -u myapp_user -p myapp`}
                  title="Create Database & User"
                />

                <CodeBlock 
                  code={`# Edit config
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Recommended settings:
[mysqld]
max_connections = 200
innodb_buffer_pool_size = 1G  # 70% of RAM for DB-only server
innodb_log_file_size = 256M
query_cache_size = 0  # Disabled in MySQL 8+`}
                  title="MySQL Configuration"
                  language="ini"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* PostgreSQL */}
        {activeTab === 'PostgreSQL' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="PostgreSQL Installation"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Switch ke postgres user
sudo -i -u postgres

# Create user
createuser --interactive --pwprompt
# Enter name: myapp_user
# Enter password: strong_password
# Superuser: n
# Create databases: y
# Create roles: n

# Create database
createdb -O myapp_user myapp

# Exit postgres user
exit

# Test connection
psql -U myapp_user -d myapp -h localhost`}
                  title="Install PostgreSQL"
                />

                <CodeBlock 
                  code={`# Edit config
sudo nano /etc/postgresql/14/main/postgresql.conf

# Recommended settings:
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB

# Restart
sudo systemctl restart postgresql`}
                  title="PostgreSQL Configuration"
                  language="ini"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Redis */}
        {activeTab === 'Redis' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="Redis Installation (Cache/Queue)"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Redis adalah in-memory data store yang sering digunakan untuk caching dan queue.
                </p>

                <CodeBlock 
                  code={`# Install Redis
sudo apt install redis-server -y

# Configure
sudo nano /etc/redis/redis.conf

# Find and set:
# supervised systemd
# maxmemory 256mb
# maxmemory-policy allkeys-lru

# Restart & enable
sudo systemctl restart redis
sudo systemctl enable redis

# Test
redis-cli ping
# Should return: PONG`}
                  title="Install & Configure Redis"
                />

                <CodeBlock 
                  code={`# Basic Redis commands
redis-cli

# Set value
SET mykey "Hello"

# Get value
GET mykey

# Set with expiration (seconds)
SETEX mykey 3600 "Hello"

# Delete key
DEL mykey

# Check memory usage
INFO memory`}
                  title="Redis Basic Commands"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}
      </div>
    </section>
  );
};

export default DatabaseSection;
