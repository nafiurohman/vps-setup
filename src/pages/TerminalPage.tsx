import React from 'react';
import TerminalSimulator from '@/components/ui/TerminalSimulator';
import { ExternalLink, Terminal, Code, BookOpen, Zap, Shield, Monitor } from 'lucide-react';

const TerminalPage = () => {
  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient flex items-center justify-center gap-2">
              <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
              Terminal Lab
            </span>
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            Praktik menjalankan command Linux langsung di browser. Terminal simulator ini
            mensimulasikan environment VPS untuk latihan tanpa risiko dengan 100+ commands tersedia.
          </p>
        </div>

        {/* Quick Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="glass rounded-lg p-4 text-center">
            <Code className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1">100+ Commands</h3>
            <p className="text-xs text-muted-foreground">Linux commands lengkap</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <Shield className="w-6 h-6 text-secondary mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1">Safe Environment</h3>
            <p className="text-xs text-muted-foreground">Latihan tanpa risiko</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1">Real-time</h3>
            <p className="text-xs text-muted-foreground">Response seperti VPS asli</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <Monitor className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1">Interactive</h3>
            <p className="text-xs text-muted-foreground">Auto-complete & history</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="glass rounded-lg p-4 sm:p-6 mb-6">
          <h3 className="font-mono font-medium mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            📝 Petunjuk Penggunaan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Ketik <code className="text-primary bg-muted px-1 rounded">help</code> untuk melihat daftar command</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Ketik <code className="text-primary bg-muted px-1 rounded">man &lt;command&gt;</code> untuk info detail</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Gunakan <kbd className="px-2 py-1 bg-muted rounded text-xs">↑</kbd> <kbd className="px-2 py-1 bg-muted rounded text-xs">↓</kbd> untuk navigasi history</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Tekan <kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd> untuk auto-complete</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-secondary">•</span>
                <span><kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+L</kbd> untuk clear screen</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">•</span>
                <span><kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+C</kbd> untuk cancel command</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">•</span>
                <span>Ini adalah simulator - command berjalan di mode demo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">•</span>
                <span>Semua command aman untuk dipraktikkan!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Simulator */}
        <TerminalSimulator className="mb-6" />

        {/* Command Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-primary flex items-center gap-2">
              🎯 File & Directory
              <a href="https://www.gnu.org/software/coreutils/manual/" target="_blank" rel="noopener noreferrer" className="text-xs opacity-60 hover:opacity-100">
                <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="text-primary">ls -la</code> <span className="text-muted-foreground">- List files detail</span></div>
              <div><code className="text-primary">pwd</code> <span className="text-muted-foreground">- Current directory</span></div>
              <div><code className="text-primary">mkdir folder</code> <span className="text-muted-foreground">- Buat folder</span></div>
              <div><code className="text-primary">touch file.txt</code> <span className="text-muted-foreground">- Buat file</span></div>
              <div><code className="text-primary">cat file</code> <span className="text-muted-foreground">- Baca file</span></div>
              <div><code className="text-primary">cp / mv / rm</code> <span className="text-muted-foreground">- Copy/Move/Delete</span></div>
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-secondary flex items-center gap-2">
              🔐 Permissions & Users
              <a href="https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html" target="_blank" rel="noopener noreferrer" className="text-xs opacity-60 hover:opacity-100">
                <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="text-secondary">chmod 755 file</code> <span className="text-muted-foreground">- Ubah permission</span></div>
              <div><code className="text-secondary">chown user:group file</code> <span className="text-muted-foreground">- Ubah owner</span></div>
              <div><code className="text-secondary">whoami</code> <span className="text-muted-foreground">- User saat ini</span></div>
              <div><code className="text-secondary">id</code> <span className="text-muted-foreground">- User & group info</span></div>
              <div><code className="text-secondary">sudo command</code> <span className="text-muted-foreground">- Run as root</span></div>
              <div><code className="text-secondary">passwd</code> <span className="text-muted-foreground">- Ubah password</span></div>
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-accent flex items-center gap-2">
              ⚙️ System & Services
              <a href="https://www.freedesktop.org/software/systemd/man/systemctl.html" target="_blank" rel="noopener noreferrer" className="text-xs opacity-60 hover:opacity-100">
                <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="text-accent">systemctl status nginx</code></div>
              <div><code className="text-accent">ufw status</code> <span className="text-muted-foreground">- Firewall</span></div>
              <div><code className="text-accent">docker ps</code> <span className="text-muted-foreground">- Containers</span></div>
              <div><code className="text-accent">free -h</code> <span className="text-muted-foreground">- Memory usage</span></div>
              <div><code className="text-accent">df -h</code> <span className="text-muted-foreground">- Disk usage</span></div>
              <div><code className="text-accent">top</code> <span className="text-muted-foreground">- Process monitor</span></div>
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-primary flex items-center gap-2">
              🌐 Network & Security
              <a href="https://www.openssh.com/manual.html" target="_blank" rel="noopener noreferrer" className="text-xs opacity-60 hover:opacity-100">
                <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="text-primary">ping host</code> <span className="text-muted-foreground">- Test koneksi</span></div>
              <div><code className="text-primary">curl url</code> <span className="text-muted-foreground">- HTTP request</span></div>
              <div><code className="text-primary">netstat -tulpn</code> <span className="text-muted-foreground">- Open ports</span></div>
              <div><code className="text-primary">ssh user@host</code> <span className="text-muted-foreground">- Remote login</span></div>
              <div><code className="text-primary">scp file user@host:</code> <span className="text-muted-foreground">- Transfer file</span></div>
              <div><code className="text-primary">ufw allow 80</code> <span className="text-muted-foreground">- Firewall rule</span></div>
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-secondary flex items-center gap-2">
              📦 Package & Development
              <a href="https://wiki.debian.org/Apt" target="_blank" rel="noopener noreferrer" className="text-xs opacity-60 hover:opacity-100">
                <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="text-secondary">apt update</code> <span className="text-muted-foreground">- Update package list</span></div>
              <div><code className="text-secondary">apt install pkg</code> <span className="text-muted-foreground">- Install package</span></div>
              <div><code className="text-secondary">git status</code> <span className="text-muted-foreground">- Git status</span></div>
              <div><code className="text-secondary">npm install</code> <span className="text-muted-foreground">- Install deps</span></div>
              <div><code className="text-secondary">pm2 list</code> <span className="text-muted-foreground">- Process manager</span></div>
              <div><code className="text-secondary">composer install</code> <span className="text-muted-foreground">- PHP deps</span></div>
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-accent flex items-center gap-2">
              🐳 Docker & Containers
              <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer" className="text-xs opacity-60 hover:opacity-100">
                <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="text-accent">docker ps</code> <span className="text-muted-foreground">- List containers</span></div>
              <div><code className="text-accent">docker images</code> <span className="text-muted-foreground">- List images</span></div>
              <div><code className="text-accent">docker compose up</code> <span className="text-muted-foreground">- Start services</span></div>
              <div><code className="text-accent">docker logs container</code> <span className="text-muted-foreground">- View logs</span></div>
              <div><code className="text-accent">docker exec -it container bash</code></div>
              <div><code className="text-accent">docker system prune</code> <span className="text-muted-foreground">- Clean up</span></div>
            </div>
          </div>
        </div>

        {/* Comprehensive Command Categories */}
        <div className="glass rounded-lg p-4 sm:p-6">
          <h3 className="font-mono font-medium mb-4 flex items-center gap-2">
            📚 Kategori Command yang Tersedia
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">100+ Commands</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-primary font-medium block mb-1">📁 Files</span>
              <p className="text-xs text-muted-foreground leading-relaxed">ls, cat, cp, mv, rm, mkdir, touch, chmod, chown, find, grep</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-secondary font-medium block mb-1">👤 Users</span>
              <p className="text-xs text-muted-foreground leading-relaxed">whoami, id, su, sudo, useradd, passwd, groups, usermod</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-accent font-medium block mb-1">⚙️ System</span>
              <p className="text-xs text-muted-foreground leading-relaxed">systemctl, journalctl, uname, uptime, reboot, hostname</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-primary font-medium block mb-1">🌐 Network</span>
              <p className="text-xs text-muted-foreground leading-relaxed">ping, curl, wget, ssh, scp, netstat, ufw, rsync</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-secondary font-medium block mb-1">📊 Monitoring</span>
              <p className="text-xs text-muted-foreground leading-relaxed">top, htop, ps, free, df, du, kill, lsof, dmesg</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-accent font-medium block mb-1">🐳 Docker</span>
              <p className="text-xs text-muted-foreground leading-relaxed">docker, docker-compose, images, containers, logs</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-primary font-medium block mb-1">💾 Database</span>
              <p className="text-xs text-muted-foreground leading-relaxed">mysql, psql, redis-cli, mongosh</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-secondary font-medium block mb-1">💻 Dev Tools</span>
              <p className="text-xs text-muted-foreground leading-relaxed">git, node, npm, pm2, php, composer, python</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-accent font-medium block mb-1">🌍 Web Server</span>
              <p className="text-xs text-muted-foreground leading-relaxed">nginx, apache, certbot, openssl</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-primary font-medium block mb-1">🔒 Security</span>
              <p className="text-xs text-muted-foreground leading-relaxed">fail2ban, ssh-keygen, ufw, iptables</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-secondary font-medium block mb-1">📦 Archive</span>
              <p className="text-xs text-muted-foreground leading-relaxed">tar, zip, unzip, gzip, 7z</p>
            </div>
            <div className="p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-accent font-medium block mb-1">🔧 Utilities</span>
              <p className="text-xs text-muted-foreground leading-relaxed">echo, date, history, clear, man, which, crontab</p>
            </div>
          </div>
        </div>

        {/* Popular Commands Quick Reference */}
        <div className="glass rounded-lg p-4 sm:p-6">
          <h3 className="font-mono font-medium mb-4">⚡ Popular Commands - Quick Reference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-primary mb-2">Essential Commands</h4>
              <div className="space-y-1 text-xs">
                <div><code className="bg-muted px-1 rounded">help</code> - Show all commands</div>
                <div><code className="bg-muted px-1 rounded">clear</code> - Clear terminal</div>
                <div><code className="bg-muted px-1 rounded">history</code> - Command history</div>
                <div><code className="bg-muted px-1 rounded">man ls</code> - Manual for ls</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-secondary mb-2">File Operations</h4>
              <div className="space-y-1 text-xs">
                <div><code className="bg-muted px-1 rounded">ls -la</code> - List all files</div>
                <div><code className="bg-muted px-1 rounded">cat /etc/os-release</code> - View OS info</div>
                <div><code className="bg-muted px-1 rounded">find . -name "*.txt"</code> - Find files</div>
                <div><code className="bg-muted px-1 rounded">chmod 755 script.sh</code> - Set permissions</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-accent mb-2">System Info</h4>
              <div className="space-y-1 text-xs">
                <div><code className="bg-muted px-1 rounded">uname -a</code> - System info</div>
                <div><code className="bg-muted px-1 rounded">free -h</code> - Memory usage</div>
                <div><code className="bg-muted px-1 rounded">df -h</code> - Disk usage</div>
                <div><code className="bg-muted px-1 rounded">ps aux</code> - Running processes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Credits */}
        <div className="glass rounded-lg p-4 sm:p-6 text-center">
          <h3 className="font-mono font-medium mb-4">👨‍💻 Dibuat oleh</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary font-medium">M. Nafiurohman</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-secondary">Webikin</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <a href="mailto:nafiurohman25@gmail.com" className="hover:text-primary transition-colors flex items-center gap-1">
                📧 nafiurohman25@gmail.com
              </a>
              <a href="https://wa.me/6281358198565" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                📱 +62-813-5819-8565
              </a>
              <a href="https://nafiurohman.pages.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                🌐 nafiurohman.pages.dev
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
            <p>VPS Setup Guide - Panduan lengkap konfigurasi VPS untuk production</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
