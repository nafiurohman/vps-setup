import React, { useState, useEffect } from 'react';
import { Terminal, Users, Key, Shield, FolderTree, Flame, Package } from 'lucide-react';
import CollapsibleSection from '../ui/CollapsibleSection';
import CodeBlock from '../ui/CodeBlock';
import FileTree from '../ui/FileTree';

const directoryStructure = [
  {
    name: 'home/deploy/',
    type: 'folder' as const,
    children: [
      {
        name: 'apps/',
        type: 'folder' as const,
        children: [
          { name: 'app1/', type: 'folder' as const, children: [
            { name: '.env', type: 'file' as const },
            { name: 'storage/', type: 'folder' as const },
            { name: 'public/', type: 'folder' as const },
          ]},
          { name: 'app2/', type: 'folder' as const },
        ],
      },
      {
        name: 'docker/',
        type: 'folder' as const,
        children: [
          { name: 'nginx/', type: 'folder' as const, children: [
            { name: 'nginx.conf', type: 'file' as const },
          ]},
          { name: 'mysql/', type: 'folder' as const },
          { name: 'docker-compose.yml', type: 'file' as const },
        ],
      },
      {
        name: 'backups/',
        type: 'folder' as const,
        children: [
          { name: 'databases/', type: 'folder' as const },
          { name: 'files/', type: 'folder' as const },
        ],
      },
      {
        name: 'logs/',
        type: 'folder' as const,
        children: [
          { name: 'nginx/', type: 'folder' as const },
          { name: 'app/', type: 'folder' as const },
          { name: 'system/', type: 'folder' as const },
        ],
      },
      {
        name: 'scripts/',
        type: 'folder' as const,
        children: [
          { name: 'backup.sh', type: 'file' as const },
          { name: 'deploy.sh', type: 'file' as const },
          { name: 'monitor.sh', type: 'file' as const },
        ],
      },
    ],
  },
];

export const SetupGuideSection: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('vps-setup-completed-steps');
    if (saved) {
      setCompletedSteps(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleStepComplete = (step: number, completed: boolean) => {
    const newCompleted = new Set(completedSteps);
    if (completed) {
      newCompleted.add(step);
    } else {
      newCompleted.delete(step);
    }
    setCompletedSteps(newCompleted);
    localStorage.setItem('vps-setup-completed-steps', JSON.stringify([...newCompleted]));
  };

  return (
    <section id="setup" className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">🚀 Setup Guide</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ikuti langkah-langkah berikut untuk setup VPS dari awal hingga siap production.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-mono text-primary">{completedSteps.size}/9 steps</span>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{ width: `${(completedSteps.size / 9) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step 1: SSH Access */}
        <CollapsibleSection
          title="Akses Awal SSH"
          stepNumber={1}
          estimatedTime="5-10 menit"
          difficulty="Beginner"
          defaultOpen={true}
          isCompleted={completedSteps.has(1)}
          onComplete={(completed) => toggleStepComplete(1, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Langkah pertama adalah mengakses VPS melalui SSH. Ada dua metode utama:
              menggunakan password atau SSH key.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-mono font-medium mb-2">🔑 Password Login</h4>
                <CodeBlock 
                  code={`# Login dengan password
ssh root@YOUR_VPS_IP

# Contoh
ssh root@192.168.1.100`}
                  title="Password Login"
                />
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-mono font-medium mb-2">🔐 SSH Key Login</h4>
                <CodeBlock 
                  code={`# Login dengan SSH key
ssh -i /path/to/private_key root@YOUR_VPS_IP

# Generate SSH key (di local machine)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`}
                  title="SSH Key Login"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h5 className="font-mono font-medium text-sm mb-2">🔧 Troubleshooting</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>Connection refused:</strong> Check firewall atau pastikan SSH service berjalan</li>
                <li><strong>Permission denied:</strong> Pastikan password benar atau SSH key sesuai</li>
                <li><strong>Timeout:</strong> Check IP address dan koneksi internet</li>
                <li><strong>Host key verification failed:</strong> <code className="text-primary">ssh-keygen -R YOUR_VPS_IP</code></li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* Step 2: Update System */}
        <CollapsibleSection
          title="Update Sistem"
          stepNumber={2}
          estimatedTime="5-15 menit"
          difficulty="Beginner"
          isCompleted={completedSteps.has(2)}
          onComplete={(completed) => toggleStepComplete(2, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Update sistem operasi ke versi terbaru untuk mendapatkan security patches dan bug fixes.
            </p>

            <CodeBlock 
              code={`# Update package list
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Dist upgrade (hati-hati di production!)
sudo apt dist-upgrade -y

# Bersihkan package yang tidak digunakan
sudo apt autoremove -y
sudo apt autoclean`}
              title="Update Commands"
            />

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h5 className="font-mono font-medium text-sm text-primary mb-2">⚠️ Perhatian</h5>
              <p className="text-sm text-muted-foreground">
                <code>dist-upgrade</code> bisa mengubah kernel dan package penting. 
                Gunakan dengan hati-hati di server production dan pastikan backup sudah ada.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Step 3: User Management */}
        <CollapsibleSection
          title="Manajemen User & Privilege"
          stepNumber={3}
          estimatedTime="5 menit"
          difficulty="Beginner"
          isCompleted={completedSteps.has(3)}
          onComplete={(completed) => toggleStepComplete(3, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Buat user baru untuk menggantikan root. Ini adalah best practice keamanan.
            </p>

            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="p-2 rounded bg-destructive/20 text-destructive font-mono">root</div>
                <span className="text-muted-foreground">→</span>
                <div className="p-2 rounded bg-primary/20 text-primary font-mono">sudo user</div>
                <span className="text-muted-foreground">→</span>
                <div className="p-2 rounded bg-secondary/20 text-secondary font-mono">app user</div>
              </div>
            </div>

            <CodeBlock 
              code={`# Buat user baru
sudo adduser deploy

# Tambahkan ke sudo group
sudo usermod -aG sudo deploy

# Verifikasi groups
groups deploy

# Switch ke user baru
su - deploy`}
              title="User Management"
            />
          </div>
        </CollapsibleSection>

        {/* Step 4: SSH Key for New User */}
        <CollapsibleSection
          title="SSH Key untuk User Baru"
          stepNumber={4}
          estimatedTime="5 menit"
          difficulty="Beginner"
          isCompleted={completedSteps.has(4)}
          onComplete={(completed) => toggleStepComplete(4, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Setup SSH key untuk user baru agar bisa login tanpa password root.
            </p>

            <CodeBlock 
              code={`# Sebagai user baru (deploy)
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Buat/edit authorized_keys
nano ~/.ssh/authorized_keys
# Paste public key dari local machine

# Set permission yang benar
chmod 600 ~/.ssh/authorized_keys

# Test dari local machine
ssh deploy@YOUR_VPS_IP`}
              title="Setup SSH Key"
            />
          </div>
        </CollapsibleSection>

        {/* Step 5: SSH Hardening */}
        <CollapsibleSection
          title="Hardening SSH"
          stepNumber={5}
          estimatedTime="10 menit"
          difficulty="Intermediate"
          isCompleted={completedSteps.has(5)}
          onComplete={(completed) => toggleStepComplete(5, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Konfigurasi SSH untuk meningkatkan keamanan server.
            </p>

            <CodeBlock 
              code={`sudo nano /etc/ssh/sshd_config`}
              title="Edit SSH Config"
            />

            <CodeBlock 
              code={`# Disable root login
PermitRootLogin no

# Force SSH key (disable password)
PasswordAuthentication no
PubkeyAuthentication yes

# Ganti port (optional)
Port 2222

# Limit auth attempts
MaxAuthTries 3

# Auto disconnect idle
ClientAliveInterval 300
ClientAliveCountMax 2

# Whitelist users
AllowUsers deploy`}
              title="SSH Configuration"
              language="ini"
            />

            <CodeBlock 
              code={`# Restart SSH service
sudo systemctl restart ssh
sudo systemctl status ssh`}
              title="Apply Changes"
            />

            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h5 className="font-mono font-medium text-sm mb-2">⚠️ PENTING!</h5>
              <p className="text-sm text-muted-foreground">
                Jangan tutup terminal sebelum test login SSH dengan user baru di terminal lain!
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Step 6: Directory Structure */}
        <CollapsibleSection
          title="Struktur Direktori"
          stepNumber={6}
          estimatedTime="5 menit"
          difficulty="Beginner"
          isCompleted={completedSteps.has(6)}
          onComplete={(completed) => toggleStepComplete(6, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Buat struktur direktori yang terorganisir untuk aplikasi, docker, backup, dan scripts.
            </p>

            <FileTree data={directoryStructure} title="Recommended Directory Structure" />

            <CodeBlock 
              code={`# Buat semua direktori sekaligus
mkdir -p ~/apps ~/docker ~/backups/{databases,files} ~/logs/{nginx,app,system} ~/scripts`}
              title="Create Directories"
            />
          </div>
        </CollapsibleSection>

        {/* Step 7: Firewall */}
        <CollapsibleSection
          title="Firewall (UFW)"
          stepNumber={7}
          estimatedTime="10 menit"
          difficulty="Intermediate"
          isCompleted={completedSteps.has(7)}
          onComplete={(completed) => toggleStepComplete(7, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              UFW (Uncomplicated Firewall) adalah firewall yang mudah digunakan untuk Ubuntu/Debian.
            </p>

            <CodeBlock 
              code={`# Install UFW
sudo apt install ufw -y

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (PENTING!)
sudo ufw allow 22/tcp
# atau jika ganti port
sudo ufw allow 2222/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow custom ports (contoh)
sudo ufw allow 3000/tcp  # Node.js dev
sudo ufw allow 8080/tcp  # Alternative HTTP

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose
sudo ufw status numbered

# Delete rule by number
sudo ufw delete [number]`}
              title="UFW Configuration"
            />

            <div className="glass rounded-lg p-4">
              <h5 className="font-mono font-medium text-sm mb-3">📋 Common Ports Reference</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {[
                  { port: '22', service: 'SSH' },
                  { port: '80', service: 'HTTP' },
                  { port: '443', service: 'HTTPS' },
                  { port: '3306', service: 'MySQL' },
                  { port: '5432', service: 'PostgreSQL' },
                  { port: '6379', service: 'Redis' },
                  { port: '27017', service: 'MongoDB' },
                  { port: '3000', service: 'Node.js' },
                ].map((item) => (
                  <div key={item.port} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <span className="font-mono text-primary">{item.port}</span>
                    <span className="text-muted-foreground">{item.service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Step 8: Fail2Ban */}
        <CollapsibleSection
          title="Fail2Ban (Brute Force Protection)"
          stepNumber={8}
          estimatedTime="10 menit"
          difficulty="Intermediate"
          isCompleted={completedSteps.has(8)}
          onComplete={(completed) => toggleStepComplete(8, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Fail2Ban melindungi server dari serangan brute-force dengan memblokir IP yang mencurigakan.
            </p>

            <CodeBlock 
              code={`# Install Fail2Ban
sudo apt install fail2ban -y

# Copy config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit config
sudo nano /etc/fail2ban/jail.local`}
              title="Install Fail2Ban"
            />

            <CodeBlock 
              code={`[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = 22
logpath = /var/log/auth.log`}
              title="Fail2Ban Configuration"
              language="ini"
            />

            <CodeBlock 
              code={`# Start & enable
sudo systemctl enable --now fail2ban

# Check status
sudo fail2ban-client status
sudo fail2ban-client status sshd

# Unban IP
sudo fail2ban-client set sshd unbanip 192.168.1.100`}
              title="Manage Fail2Ban"
            />
          </div>
        </CollapsibleSection>

        {/* Step 9: Essential Packages */}
        <CollapsibleSection
          title="Essential Packages"
          stepNumber={9}
          estimatedTime="5-10 menit"
          difficulty="Beginner"
          isCompleted={completedSteps.has(9)}
          onComplete={(completed) => toggleStepComplete(9, completed)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Install package-package penting untuk development dan monitoring.
            </p>

            <CodeBlock 
              code={`# Development tools
sudo apt install -y \\
  git \\
  curl \\
  wget \\
  unzip \\
  zip \\
  build-essential \\
  software-properties-common \\
  apt-transport-https \\
  ca-certificates \\
  gnupg \\
  lsb-release`}
              title="Development Tools"
            />

            <CodeBlock 
              code={`# System monitoring
sudo apt install -y \\
  htop \\
  iotop \\
  iftop \\
  ncdu \\
  tmux \\
  vim`}
              title="Monitoring Tools"
            />

            <CodeBlock 
              code={`# Network tools
sudo apt install -y \\
  net-tools \\
  dnsutils \\
  traceroute \\
  nmap`}
              title="Network Tools"
            />
          </div>
        </CollapsibleSection>
      </div>
    </section>
  );
};

export default SetupGuideSection;
