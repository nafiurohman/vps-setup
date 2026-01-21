import React, { useState } from 'react';
import { Database, Server, Shield, Zap, BarChart3, Settings } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const dbTabs = ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'Backup & Recovery'] as const;

export const DatabaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof dbTabs[number]>('MySQL');

  return (
    <section id="database" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">💾 Database Setup & Management</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Setup lengkap database MySQL, PostgreSQL, Redis, MongoDB dengan optimasi performa, keamanan, dan strategi backup.
          </p>
        </div>

        {/* Database Comparison */}
        <div className="glass rounded-lg p-6 mb-8">
          <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
            <Database className="text-primary" size={20} />
            Database Comparison
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h4 className="font-mono font-medium text-primary mb-2">🐬 MySQL</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Most popular RDBMS</li>
                <li>• Great for web applications</li>
                <li>• ACID compliant</li>
                <li>• Strong community support</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
              <h4 className="font-mono font-medium text-secondary mb-2">🐘 PostgreSQL</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Advanced features</li>
                <li>• JSON support</li>
                <li>• Full-text search</li>
                <li>• Extensible</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h4 className="font-mono font-medium text-destructive mb-2">⚡ Redis</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• In-memory data store</li>
                <li>• Caching & sessions</li>
                <li>• Pub/Sub messaging</li>
                <li>• Very fast</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-mono font-medium text-muted-foreground mb-2">🍃 MongoDB</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Document database</li>
                <li>• Schema-less</li>
                <li>• Horizontal scaling</li>
                <li>• JSON-like documents</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {dbTabs.map((tab) => (
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
              {tab === 'MySQL' && <Database size={16} />}
              {tab === 'PostgreSQL' && <Server size={16} />}
              {tab === 'Redis' && <Zap size={16} />}
              {tab === 'MongoDB' && <Settings size={16} />}
              {tab === 'Backup & Recovery' && <Shield size={16} />}
              {tab}
            </button>
          ))}
        </div>

        {/* MySQL */}
        {activeTab === 'MySQL' && (
          <div className="space-y-6">
            <CollapsibleSection
              title="MySQL Installation & Configuration"
              stepNumber={1}
              estimatedTime="15 menit"
              difficulty="Beginner"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  MySQL adalah sistem manajemen database relasional yang paling populer untuk aplikasi web.
                </p>

                <CodeBlock 
                  code={`# Update package list
sudo apt update

# Install MySQL Server
sudo apt install mysql-server -y

# Start and enable MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Check MySQL status
sudo systemctl status mysql

# Check MySQL version
mysql --version`}
                  title="Install MySQL"
                />

                <CodeBlock 
                  code={`# Run MySQL secure installation
sudo mysql_secure_installation

# Jawab pertanyaan berikut:
# 1. Set root password? [Y/n] Y
# 2. Remove anonymous users? [Y/n] Y
# 3. Disallow root login remotely? [Y/n] Y
# 4. Remove test database? [Y/n] Y
# 5. Reload privilege tables? [Y/n] Y`}
                  title="Secure MySQL Installation"
                />

                <CodeBlock 
                  code={`# Login to MySQL as root
sudo mysql -u root -p

# Create database
CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create user with strong password
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';

# Grant privileges
GRANT ALL PRIVILEGES ON myapp.* TO 'myapp_user'@'localhost';

# Apply changes
FLUSH PRIVILEGES;

# Show databases
SHOW DATABASES;

# Show users
SELECT user, host FROM mysql.user;

# Exit MySQL
EXIT;

# Test connection with new user
mysql -u myapp_user -p myapp`}
                  title="Create Database & User"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="MySQL Performance Optimization"
              stepNumber={2}
              estimatedTime="20 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Optimasi konfigurasi MySQL untuk performa maksimal berdasarkan spesifikasi server.
                </p>

                <CodeBlock 
                  code={`# Edit MySQL configuration
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf`}
                  title="Edit MySQL Config"
                />

                <CodeBlock 
                  code={`# /etc/mysql/mysql.conf.d/mysqld.cnf
# Production-optimized MySQL configuration

[mysqld]
# Basic Settings
user = mysql
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
port = 3306
basedir = /usr
datadir = /var/lib/mysql
tmpdir = /tmp
lc-messages-dir = /usr/share/mysql

# Network Settings
bind-address = 127.0.0.1  # Only local connections
mysqlx-bind-address = 127.0.0.1

# Connection Settings
max_connections = 200
max_connect_errors = 1000
connect_timeout = 60
wait_timeout = 28800
interactive_timeout = 28800

# Buffer Settings (adjust based on RAM)
# For 2GB RAM server:
innodb_buffer_pool_size = 1G        # 50-70% of RAM
innodb_log_file_size = 256M         # 25% of buffer pool
innodb_log_buffer_size = 16M
innodb_flush_log_at_trx_commit = 2  # Better performance, slight risk

# Query Cache (disabled in MySQL 8.0+)
# query_cache_type = 1
# query_cache_size = 64M
# query_cache_limit = 2M

# MyISAM Settings
key_buffer_size = 128M
read_buffer_size = 2M
read_rnd_buffer_size = 16M
sort_buffer_size = 8M
join_buffer_size = 8M

# Thread Settings
thread_cache_size = 50
thread_stack = 256K

# Table Settings
table_open_cache = 4000
table_definition_cache = 1400

# Logging
log_error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
log_queries_not_using_indexes = 1

# Binary Logging (for replication/backup)
log_bin = /var/log/mysql/mysql-bin.log
binlog_expire_logs_seconds = 604800  # 7 days
max_binlog_size = 100M

# InnoDB Settings
innodb_file_per_table = 1
innodb_flush_method = O_DIRECT
innodb_lock_wait_timeout = 50
innodb_rollback_on_timeout = 1
innodb_print_all_deadlocks = 1

# Security
local_infile = 0
skip_show_database

# Character Set
character_set_server = utf8mb4
collation_server = utf8mb4_unicode_ci

[mysql]
default_character_set = utf8mb4

[client]
default_character_set = utf8mb4`}
                  title="Optimized MySQL Configuration"
                  language="ini"
                />

                <CodeBlock 
                  code={`# Create MySQL log directory
sudo mkdir -p /var/log/mysql
sudo chown mysql:mysql /var/log/mysql

# Test configuration
sudo mysqld --help --verbose | head -1

# Restart MySQL
sudo systemctl restart mysql

# Check if MySQL started successfully
sudo systemctl status mysql

# Monitor MySQL performance
mysql -u root -p -e "SHOW GLOBAL STATUS LIKE 'Connections';"
mysql -u root -p -e "SHOW GLOBAL STATUS LIKE 'Threads_connected';"
mysql -u root -p -e "SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_read_requests';"`}
                  title="Apply Configuration"
                />

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <h5 className="font-mono font-medium text-sm text-primary mb-2">📈 MySQL Performance Monitoring</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <code className="text-primary">SHOW PROCESSLIST;</code> - Active connections</li>
                    <li>• <code className="text-primary">SHOW GLOBAL STATUS;</code> - Server statistics</li>
                    <li>• <code className="text-primary">SHOW GLOBAL VARIABLES;</code> - Configuration values</li>
                    <li>• <code className="text-primary">EXPLAIN SELECT ...</code> - Query execution plan</li>
                    <li>• Install MySQLTuner: <code className="text-primary">wget mysqltuner.pl</code></li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="MySQL Security & User Management"
              stepNumber={3}
              estimatedTime="15 menit"
              difficulty="Intermediate"
            >
              <div className="space-y-4">
                <CodeBlock 
                  code={`# Create application-specific users
mysql -u root -p

# Read-only user for reporting
CREATE USER 'readonly_user'@'localhost' IDENTIFIED BY 'ReadOnlyPass123!';
GRANT SELECT ON myapp.* TO 'readonly_user'@'localhost';

# Backup user
CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'BackupPass123!';
GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER ON *.* TO 'backup_user'@'localhost';

# Application user with limited privileges
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'AppUserPass123!';
GRANT SELECT, INSERT, UPDATE, DELETE ON myapp.* TO 'app_user'@'localhost';

# Show user privileges
SHOW GRANTS FOR 'app_user'@'localhost';

FLUSH PRIVILEGES;`}
                  title="User Management"
                />

                <CodeBlock 
                  code={`# Enable MySQL audit logging (if needed)
# Install audit plugin
INSTALL PLUGIN audit_log SONAME 'audit_log.so';

# Configure audit in my.cnf
# [mysqld]
# audit_log_file = /var/log/mysql/audit.log
# audit_log_policy = ALL
# audit_log_rotate_on_size = 100M

# Password validation plugin
INSTALL PLUGIN validate_password SONAME 'validate_password.so';

# Set password policy
SET GLOBAL validate_password.policy = MEDIUM;
SET GLOBAL validate_password.length = 12;
SET GLOBAL validate_password.mixed_case_count = 1;
SET GLOBAL validate_password.number_count = 1;
SET GLOBAL validate_password.special_char_count = 1;

# Show password validation settings
SHOW VARIABLES LIKE 'validate_password%';`}
                  title="Security Configuration"
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
