import React from 'react';
import TerminalSimulator from '@/components/ui/TerminalSimulator';

const TerminalPage = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">💻 Terminal Lab</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Praktik menjalankan command Linux langsung di browser. Terminal simulator ini
            mensimulasikan environment VPS untuk latihan tanpa risiko.
          </p>
        </div>

        <div className="glass rounded-lg p-4 mb-6">
          <h3 className="font-mono font-medium mb-3">📝 Petunjuk Penggunaan:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ketik <code className="text-primary">help</code> untuk melihat daftar command</li>
              <li>• Ketik <code className="text-primary">man &lt;command&gt;</code> untuk info detail</li>
              <li>• Gunakan <kbd className="px-1 py-0.5 bg-muted rounded text-xs">↑</kbd> <kbd className="px-1 py-0.5 bg-muted rounded text-xs">↓</kbd> untuk navigasi history</li>
              <li>• Tekan <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Tab</kbd> untuk auto-complete</li>
            </ul>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+L</kbd> untuk clear screen</li>
              <li>• <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+C</kbd> untuk cancel command</li>
              <li>• Ini adalah simulator - command berjalan di mode demo</li>
              <li>• 100+ commands tersedia untuk dipraktikkan!</li>
            </ul>
          </div>
        </div>

        <TerminalSimulator />

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-primary">🎯 File & Directory</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code>ls -la</code> - List files detail</li>
              <li><code>pwd</code> - Current directory</li>
              <li><code>mkdir folder</code> - Buat folder</li>
              <li><code>touch file.txt</code> - Buat file</li>
              <li><code>cat file</code> - Baca file</li>
              <li><code>cp / mv / rm</code> - Copy/Move/Delete</li>
            </ul>
          </div>
          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-secondary">🔐 Permissions & Users</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code>chmod 755 file</code> - Ubah permission</li>
              <li><code>chown user:group file</code> - Ubah owner</li>
              <li><code>whoami</code> - User saat ini</li>
              <li><code>id</code> - User & group info</li>
              <li><code>sudo command</code> - Run as root</li>
              <li><code>passwd</code> - Ubah password</li>
            </ul>
          </div>
          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-accent">⚙️ System & Services</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code>systemctl status nginx</code></li>
              <li><code>ufw status</code> - Firewall</li>
              <li><code>docker ps</code> - Containers</li>
              <li><code>free -h</code> - Memory usage</li>
              <li><code>df -h</code> - Disk usage</li>
              <li><code>top</code> - Process monitor</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-primary">🌐 Network</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code>ping host</code> - Test koneksi</li>
              <li><code>curl url</code> - HTTP request</li>
              <li><code>netstat -tulpn</code> - Open ports</li>
              <li><code>ssh user@host</code> - Remote login</li>
              <li><code>scp file user@host:</code> - Transfer file</li>
            </ul>
          </div>
          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-secondary">📦 Package & Development</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code>apt update</code> - Update package list</li>
              <li><code>apt install pkg</code> - Install package</li>
              <li><code>git status</code> - Git status</li>
              <li><code>npm install</code> - Install deps</li>
              <li><code>pm2 list</code> - Process manager</li>
            </ul>
          </div>
          <div className="glass rounded-lg p-4">
            <h4 className="font-mono font-medium text-sm mb-3 text-accent">🐳 Docker</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code>docker ps</code> - List containers</li>
              <li><code>docker images</code> - List images</li>
              <li><code>docker compose up</code> - Start services</li>
              <li><code>docker logs container</code> - View logs</li>
              <li><code>docker exec -it container bash</code></li>
            </ul>
          </div>
        </div>

        {/* Command Categories */}
        <div className="glass rounded-lg p-6">
          <h3 className="font-mono font-medium mb-4">📚 Kategori Command yang Tersedia</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded bg-muted/30">
              <span className="text-primary font-medium">📁 Files</span>
              <p className="text-xs text-muted-foreground">ls, cat, cp, mv, rm, mkdir, touch, chmod, chown</p>
            </div>
            <div className="p-3 rounded bg-muted/30">
              <span className="text-secondary font-medium">👤 Users</span>
              <p className="text-xs text-muted-foreground">whoami, id, su, sudo, useradd, passwd, groups</p>
            </div>
            <div className="p-3 rounded bg-muted/30">
              <span className="text-accent font-medium">⚙️ System</span>
              <p className="text-xs text-muted-foreground">systemctl, journalctl, uname, uptime, reboot</p>
            </div>
            <div className="p-3 rounded bg-muted/30">
              <span className="text-primary font-medium">🌐 Network</span>
              <p className="text-xs text-muted-foreground">ping, curl, wget, ssh, scp, netstat, ufw</p>
            </div>
            <div className="p-3 rounded bg-muted/30">
              <span className="text-secondary font-medium">📊 Monitoring</span>
              <p className="text-xs text-muted-foreground">top, htop, ps, free, df, du, kill</p>
            </div>
            <div className="p-3 rounded bg-muted/30">
              <span className="text-accent font-medium">🐳 Docker</span>
              <p className="text-xs text-muted-foreground">docker, docker-compose, images, containers</p>
            </div>
            <div className="p-3 rounded bg-muted/30">
              <span className="text-primary font-medium">💾 Database</span>
              <p className="text-xs text-muted-foreground">mysql, psql, redis-cli</p>
            </div>
            <div className="p-3 rounded bg-muted/30">
              <span className="text-secondary font-medium">💻 Dev Tools</span>
              <p className="text-xs text-muted-foreground">git, node, npm, pm2, php, composer</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="glass rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Dibuat oleh <span className="text-primary font-medium">bezn.project</span> | 
            bezn.sup@gmail.com | 
            085189643588 | 
            @bezn.project |
            www.beznproject.site
          </p>
        </div>
      </div>
    </section>
  );
};

export default TerminalPage;
