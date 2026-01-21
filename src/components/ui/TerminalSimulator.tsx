import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2, RotateCcw, Copy, Check, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandResult {
  command: string;
  output: string;
  isError?: boolean;
  timestamp: Date;
}

interface TerminalSimulatorProps {
  className?: string;
  initialCommands?: string[];
}

// Command descriptions for help
const commandDescriptions: Record<string, string> = {
  'help': 'Menampilkan daftar semua command yang tersedia beserta deskripsinya',
  'clear': 'Membersihkan layar terminal dari semua output sebelumnya',
  'ls': 'List - Menampilkan daftar file dan direktori. Options: -l (detail), -a (hidden files), -la (kombinasi)',
  'pwd': 'Print Working Directory - Menampilkan path direktori saat ini',
  'whoami': 'Menampilkan username user yang sedang login',
  'date': 'Menampilkan tanggal dan waktu sistem saat ini',
  'uname': 'Menampilkan informasi sistem operasi. Options: -a (all info)',
  'cat': 'Concatenate - Menampilkan isi file. Syntax: cat <filename>',
  'echo': 'Mencetak text ke terminal. Syntax: echo <text>',
  'mkdir': 'Make Directory - Membuat direktori baru. Syntax: mkdir <dirname>',
  'touch': 'Membuat file kosong baru. Syntax: touch <filename>',
  'rm': 'Remove - Menghapus file. Options: -r (recursive), -f (force). Syntax: rm <file>',
  'cp': 'Copy - Menyalin file/direktori. Syntax: cp <source> <dest>',
  'mv': 'Move - Memindahkan atau rename file. Syntax: mv <source> <dest>',
  'chmod': 'Change Mode - Mengubah permission file. Syntax: chmod <mode> <file>',
  'chown': 'Change Owner - Mengubah kepemilikan file. Syntax: chown <user>:<group> <file>',
  'chgrp': 'Change Group - Mengubah group file. Syntax: chgrp <group> <file>',
  'ssh': 'Secure Shell - Koneksi remote ke server. Syntax: ssh user@host',
  'scp': 'Secure Copy - Transfer file via SSH. Syntax: scp <source> user@host:<dest>',
  'apt': 'Advanced Package Tool - Package manager Debian/Ubuntu. Commands: update, upgrade, install',
  'sudo': 'Super User Do - Menjalankan command dengan privilege root',
  'su': 'Switch User - Beralih ke user lain. Syntax: su - <username>',
  'systemctl': 'System Control - Mengelola services systemd. Commands: start, stop, status, restart, enable',
  'service': 'Mengelola system services (legacy). Syntax: service <name> <action>',
  'ufw': 'Uncomplicated Firewall - Konfigurasi firewall. Commands: status, enable, allow, deny',
  'iptables': 'Konfigurasi firewall level rendah (advanced)',
  'mysql': 'MySQL client - Koneksi ke database MySQL. Syntax: mysql -u <user> -p',
  'psql': 'PostgreSQL client - Koneksi ke database PostgreSQL',
  'redis-cli': 'Redis CLI - Koneksi ke Redis server',
  'docker': 'Docker container management. Commands: ps, images, run, stop, logs, exec',
  'docker-compose': 'Docker Compose - Mengelola multi-container. Commands: up, down, ps',
  'nginx': 'Nginx web server control. Options: -t (test config), -s (signal)',
  'php': 'PHP interpreter. Options: -v (version), -m (modules)',
  'composer': 'PHP dependency manager. Commands: install, update, require',
  'node': 'Node.js runtime. Options: -v (version)',
  'npm': 'Node Package Manager. Commands: install, run, start',
  'pm2': 'Node.js process manager. Commands: start, stop, list, logs',
  'git': 'Version control system. Commands: clone, pull, push, commit, status',
  'curl': 'Transfer data dari/ke server. Syntax: curl <url>',
  'wget': 'Download file dari web. Syntax: wget <url>',
  'tar': 'Archiver utility. Options: -xvf (extract), -cvf (create)',
  'zip': 'Compress files. Syntax: zip <archive.zip> <files>',
  'unzip': 'Extract zip archive. Syntax: unzip <archive.zip>',
  'grep': 'Search text pattern. Syntax: grep <pattern> <file>',
  'find': 'Mencari file/direktori. Syntax: find <path> -name <pattern>',
  'htop': 'Interactive process viewer (real-time monitoring)',
  'top': 'Process viewer - Menampilkan proses yang berjalan',
  'ps': 'Process Status - List proses. Options: aux (all users)',
  'kill': 'Menghentikan proses. Syntax: kill <PID> atau kill -9 <PID>',
  'killall': 'Menghentikan proses berdasarkan nama. Syntax: killall <name>',
  'free': 'Menampilkan penggunaan memory. Options: -h (human readable)',
  'df': 'Disk Free - Menampilkan penggunaan disk. Options: -h (human readable)',
  'du': 'Disk Usage - Ukuran direktori. Options: -sh (summary human)',
  'ncdu': 'NCurses Disk Usage - Interactive disk analyzer',
  'netstat': 'Network Statistics - Menampilkan koneksi jaringan. Options: -tulpn',
  'ss': 'Socket Statistics - Alternatif modern netstat',
  'ping': 'Test konektivitas jaringan. Syntax: ping <host>',
  'traceroute': 'Trace network route ke host',
  'ifconfig': 'Interface Configuration - Info network interface (legacy)',
  'ip': 'Show/manipulate network. Commands: addr, route, link',
  'nmap': 'Network scanner - Port scanning tool',
  'tail': 'Menampilkan akhir file. Options: -f (follow), -n (lines)',
  'head': 'Menampilkan awal file. Options: -n (lines)',
  'less': 'File pager - View file dengan scroll',
  'nano': 'Text editor sederhana untuk terminal',
  'vim': 'Vi Improved - Advanced text editor',
  'crontab': 'Manage cron jobs (scheduled tasks). Options: -e (edit), -l (list)',
  'history': 'Menampilkan command history yang sudah dijalankan',
  'man': 'Manual pages - Dokumentasi command. Syntax: man <command>',
  'which': 'Menampilkan lokasi executable. Syntax: which <command>',
  'whereis': 'Lokasi binary, source, dan manual. Syntax: whereis <command>',
  'alias': 'Membuat shortcut command. Syntax: alias name=command',
  'export': 'Set environment variable. Syntax: export VAR=value',
  'env': 'Menampilkan semua environment variables',
  'source': 'Execute commands dari file. Syntax: source <file>',
  'reboot': 'Restart sistem (requires sudo)',
  'shutdown': 'Shutdown sistem. Options: -h now, -r (reboot)',
  'passwd': 'Mengubah password user',
  'useradd': 'Membuat user baru. Syntax: useradd <username>',
  'usermod': 'Modifikasi user. Options: -aG (add to group)',
  'userdel': 'Menghapus user. Options: -r (remove home dir)',
  'groupadd': 'Membuat group baru',
  'groups': 'Menampilkan groups user',
  'id': 'Menampilkan user dan group IDs',
  'ln': 'Link - Membuat link. Options: -s (symbolic link)',
  'stat': 'Menampilkan informasi detail file',
  'file': 'Menentukan tipe file',
  'diff': 'Membandingkan isi file',
  'wc': 'Word Count - Menghitung baris, kata, karakter',
  'sort': 'Mengurutkan baris text',
  'uniq': 'Menghapus baris duplikat',
  'awk': 'Pattern scanning dan processing',
  'sed': 'Stream editor untuk transformasi text',
  'tee': 'Membaca stdin dan menulis ke stdout & file',
  'xargs': 'Build command dari stdin',
  'certbot': 'Let\'s Encrypt SSL certificate tool',
  'openssl': 'SSL/TLS toolkit',
  'ssh-keygen': 'Generate SSH key pairs',
  'ssh-copy-id': 'Copy SSH key ke server remote',
  'rsync': 'Remote sync - Sinkronisasi file/direktori',
  'fail2ban-client': 'Fail2Ban CLI - Manage banned IPs',
  'lsof': 'List Open Files - Menampilkan file yang terbuka',
  'journalctl': 'Query systemd journal logs',
  'dmesg': 'Kernel ring buffer messages',
  'uptime': 'Menampilkan system uptime dan load average',
  'hostname': 'Menampilkan/set hostname sistem',
  'timedatectl': 'Control system time dan date',
  'locale': 'Menampilkan locale settings',
};

// Simulated command responses
const commandResponses: Record<string, string | ((args: string[]) => string)> = {
  'help': () => {
    const categories = {
      '📁 File & Directory': ['ls', 'pwd', 'cd', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'cat', 'less', 'head', 'tail'],
      '🔐 Permissions': ['chmod', 'chown', 'chgrp', 'stat'],
      '👤 Users & Groups': ['whoami', 'id', 'su', 'sudo', 'useradd', 'usermod', 'userdel', 'groups', 'passwd'],
      '📦 Package Management': ['apt', 'apt-get', 'dpkg'],
      '⚙️ System & Services': ['systemctl', 'service', 'journalctl', 'reboot', 'shutdown', 'uptime', 'uname', 'hostname'],
      '🌐 Network': ['ping', 'curl', 'wget', 'netstat', 'ss', 'ifconfig', 'ip', 'ufw', 'ssh', 'scp', 'rsync'],
      '📊 Monitoring': ['top', 'htop', 'ps', 'free', 'df', 'du', 'ncdu', 'kill', 'killall'],
      '🐳 Docker': ['docker', 'docker-compose'],
      '🗄️ Database': ['mysql', 'psql', 'redis-cli'],
      '🌍 Web Server': ['nginx', 'certbot'],
      '💻 Development': ['git', 'node', 'npm', 'pm2', 'php', 'composer'],
      '🔧 Utilities': ['echo', 'date', 'grep', 'find', 'tar', 'zip', 'unzip', 'history', 'clear'],
    };

    let output = '╔══════════════════════════════════════════════════════════════════╗\n';
    output += '║                    📚 VPS TERMINAL HELP                          ║\n';
    output += '╚══════════════════════════════════════════════════════════════════╝\n\n';
    
    for (const [category, commands] of Object.entries(categories)) {
      output += `${category}\n`;
      output += `${'─'.repeat(50)}\n`;
      commands.forEach(cmd => {
        const desc = commandDescriptions[cmd] || 'No description';
        const shortDesc = desc.length > 45 ? desc.substring(0, 42) + '...' : desc;
        output += `  ${cmd.padEnd(15)} ${shortDesc}\n`;
      });
      output += '\n';
    }
    
    output += '💡 Tips:\n';
    output += '  • Ketik "man <command>" untuk info detail\n';
    output += '  • Gunakan ↑↓ untuk navigasi history\n';
    output += '  • Tekan Tab untuk auto-complete\n';
    
    return output;
  },

  'clear': '__CLEAR__',
  
  'ls': (args) => {
    const paths: Record<string, string> = {
      '': 'apps  backups  docker  logs  scripts  websites',
      '-la': `total 48
drwxr-xr-x  7 nafiurohman nafiurohman 4096 Jan 15 10:00 .
drwxr-xr-x  3 root        root        4096 Jan 10 08:00 ..
-rw-------  1 nafiurohman nafiurohman 2048 Jan 15 09:00 .bash_history
-rw-r--r--  1 nafiurohman nafiurohman  220 Jan 10 08:00 .bash_logout
-rw-r--r--  1 nafiurohman nafiurohman 3771 Jan 10 08:00 .bashrc
drwxr-xr-x  5 nafiurohman nafiurohman 4096 Jan 15 09:30 apps
drwxr-xr-x  4 nafiurohman nafiurohman 4096 Jan 14 02:00 backups
drwxr-xr-x  6 nafiurohman nafiurohman 4096 Jan 13 15:00 docker
drwxr-xr-x  4 nafiurohman nafiurohman 4096 Jan 15 09:45 logs
drwxr-xr-x  3 nafiurohman nafiurohman 4096 Jan 12 11:00 scripts
drwx------  2 nafiurohman nafiurohman 4096 Jan 10 08:00 .ssh
drwxr-xr-x  8 nafiurohman nafiurohman 4096 Jan 15 10:30 websites`,
      '-l': `drwxr-xr-x  5 nafiurohman nafiurohman 4096 Jan 15 09:30 apps
drwxr-xr-x  4 nafiurohman nafiurohman 4096 Jan 14 02:00 backups
drwxr-xr-x  6 nafiurohman nafiurohman 4096 Jan 13 15:00 docker
drwxr-xr-x  4 nafiurohman nafiurohman 4096 Jan 15 09:45 logs
drwxr-xr-x  3 nafiurohman nafiurohman 4096 Jan 12 11:00 scripts
drwxr-xr-x  8 nafiurohman nafiurohman 4096 Jan 15 10:30 websites`,
      '-a': '.  ..  .bash_history  .bash_logout  .bashrc  .ssh  .vimrc  apps  backups  docker  logs  scripts  websites',
    };
    return paths[args.join(' ')] || paths[''];
  },
  
  'pwd': '/home/nafiurohman',
  
  'whoami': 'nafiurohman',
  
  'id': 'uid=1000(nafiurohman) gid=1000(nafiurohman) groups=1000(nafiurohman),27(sudo),998(docker),33(www-data)',
  
  'groups': 'nafiurohman sudo docker www-data adm',
  
  'date': () => new Date().toString(),
  
  'uptime': () => {
    const days = Math.floor(Math.random() * 30) + 1;
    const hours = Math.floor(Math.random() * 24);
    const mins = Math.floor(Math.random() * 60);
    return ` ${new Date().toLocaleTimeString()} up ${days} days, ${hours}:${mins.toString().padStart(2, '0')},  1 user,  load average: 0.15, 0.10, 0.05`;
  },
  
  'hostname': 'nafiurohman-vps',
  
  'uname': (args) => {
    if (args.includes('-a')) {
      return 'Linux nafiurohman-vps 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 14 13:30:08 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux';
    }
    if (args.includes('-r')) {
      return '5.15.0-91-generic';
    }
    if (args.includes('-m')) {
      return 'x86_64';
    }
    return 'Linux';
  },
  
  'cat': (args) => {
    const files: Record<string, string> = {
      '/etc/os-release': `NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 22.04.3 LTS"
VERSION_ID="22.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"`,
      '/etc/hostname': 'nafiurohman-vps',
      '/etc/passwd': `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
nafiurohman:x:1000:1000:M. Nafiurohman:/home/nafiurohman:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
mysql:x:112:117:MySQL Server,,,:/nonexistent:/bin/false`,
      '.bashrc': `# ~/.bashrc: executed by bash for non-login shells.
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines in history
HISTCONTROL=ignoreboth

# append to history file
shopt -s histappend

# for setting history length
HISTSIZE=1000
HISTFILESIZE=2000`,
      '.bash_history': `ls -la
sudo apt update
docker ps
systemctl status nginx
ufw status
git status
npm run build
pm2 list
mysql -u root -p
curl -I https://nafiurohman.pages.dev`,
    };
    if (args.length === 0) return 'cat: missing operand\nUsage: cat <filename>';
    return files[args[0]] || `cat: ${args[0]}: No such file or directory`;
  },
  
  'echo': (args) => args.join(' ') || '',
  
  'man': (args) => {
    if (args.length === 0) return 'What manual page do you want?\nUsage: man <command>';
    const cmd = args[0];
    const desc = commandDescriptions[cmd];
    if (desc) {
      return `╔══════════════════════════════════════════════════════════════╗
║  MANUAL: ${cmd.toUpperCase().padEnd(50)}  ║
╚══════════════════════════════════════════════════════════════╝

NAME
    ${cmd} - ${desc}

SYNOPSIS
    ${cmd} [OPTIONS]... [ARGUMENTS]...

DESCRIPTION
    ${desc}

    This is a simulated manual page. For complete documentation,
    visit the official documentation or run on a real system.

SEE ALSO
    help - List all available commands

[Simulated - untuk dokumentasi lengkap, kunjungi official docs]`;
    }
    return `No manual entry for ${cmd}`;
  },
  
  'which': (args) => {
    if (args.length === 0) return 'Usage: which <command>';
    const paths: Record<string, string> = {
      'bash': '/usr/bin/bash',
      'docker': '/usr/bin/docker',
      'nginx': '/usr/sbin/nginx',
      'mysql': '/usr/bin/mysql',
      'php': '/usr/bin/php',
      'node': '/usr/bin/node',
      'npm': '/usr/bin/npm',
      'git': '/usr/bin/git',
      'python3': '/usr/bin/python3',
    };
    return paths[args[0]] || `${args[0]} not found`;
  },
  
  // Permissions commands
  'chmod': (args) => {
    if (args.length < 2) {
      return `chmod: Mengubah permission file/direktori

Usage: chmod [OPTIONS] MODE FILE

MODE dapat berupa:
  Numeric: 755, 644, 777, 600, dll
    - 7 = rwx (read + write + execute)
    - 6 = rw- (read + write)
    - 5 = r-x (read + execute)
    - 4 = r-- (read only)
    - 0 = --- (no permission)

  Symbolic: u+x, g-w, o=r, a+x
    - u = user (owner)
    - g = group
    - o = others
    - a = all

Examples:
  chmod 755 script.sh    # Owner: rwx, Group: r-x, Others: r-x
  chmod 644 file.txt     # Owner: rw-, Group: r--, Others: r--
  chmod +x script.sh     # Add execute permission
  chmod -R 755 folder/   # Recursive`;
    }
    return `[Simulated] chmod: changed permissions of '${args[args.length-1]}' to ${args[0]}`;
  },
  
  'chown': (args) => {
    if (args.length < 2) {
      return `chown: Mengubah kepemilikan file/direktori

Usage: chown [OPTIONS] OWNER[:GROUP] FILE

Options:
  -R    Recursive (untuk direktori)
  -v    Verbose mode

Examples:
  chown user file.txt           # Ubah owner
  chown user:group file.txt     # Ubah owner dan group
  chown :group file.txt         # Ubah group saja
  chown -R www-data:www-data /var/www  # Recursive

Common owners:
  root       - System administrator
  www-data   - Web server (Nginx/Apache)
  mysql      - MySQL database
  postgres   - PostgreSQL database`;
    }
    return `[Simulated] chown: changed ownership of '${args[args.length-1]}' to ${args[0]}`;
  },
  
  'chgrp': (args) => {
    if (args.length < 2) {
      return `chgrp: Mengubah group file/direktori

Usage: chgrp [OPTIONS] GROUP FILE

Options:
  -R    Recursive
  -v    Verbose

Examples:
  chgrp www-data file.txt
  chgrp -R docker /app`;
    }
    return `[Simulated] chgrp: changed group of '${args[args.length-1]}' to ${args[0]}`;
  },
  
  'stat': (args) => {
    if (args.length === 0) return 'stat: missing operand\nUsage: stat <file>';
    return `  File: ${args[0]}
  Size: 4096       Blocks: 8          IO Block: 4096   directory
Device: fe01h/65025d   Inode: 262537      Links: 2
Access: (0755/drwxr-xr-x)  Uid: ( 1000/vps-setup-by-bezn)   Gid: ( 1000/vps-setup-by-bezn)
Access: 2024-01-15 10:00:00.000000000 +0000
Modify: 2024-01-15 09:30:00.000000000 +0000
Change: 2024-01-15 09:30:00.000000000 +0000
 Birth: 2024-01-10 08:00:00.000000000 +0000`;
  },
  
  // File operations
  'mkdir': (args) => {
    if (args.length === 0) return 'mkdir: missing operand\nUsage: mkdir [-p] <directory>';
    if (args.includes('-p')) {
      return `[Simulated] mkdir: created directory path '${args[args.length-1]}'`;
    }
    return `[Simulated] mkdir: created directory '${args[0]}'`;
  },
  
  'touch': (args) => {
    if (args.length === 0) return 'touch: missing file operand\nUsage: touch <file>';
    return `[Simulated] touch: created file '${args[0]}'`;
  },
  
  'rm': (args) => {
    if (args.length === 0) return 'rm: missing operand\nUsage: rm [-rf] <file/directory>';
    const hasR = args.includes('-r') || args.includes('-rf') || args.includes('-fr');
    const file = args.filter(a => !a.startsWith('-'))[0];
    if (hasR) {
      return `[Simulated] rm: removed directory '${file}' recursively`;
    }
    return `[Simulated] rm: removed '${file}'`;
  },
  
  'cp': (args) => {
    if (args.length < 2) return 'cp: missing operand\nUsage: cp [-r] <source> <destination>';
    return `[Simulated] cp: copied '${args[0]}' to '${args[1]}'`;
  },
  
  'mv': (args) => {
    if (args.length < 2) return 'mv: missing operand\nUsage: mv <source> <destination>';
    return `[Simulated] mv: moved '${args[0]}' to '${args[1]}'`;
  },
  
  'ln': (args) => {
    if (args.length < 2) return 'ln: missing operand\nUsage: ln [-s] <target> <link_name>';
    if (args.includes('-s')) {
      return `[Simulated] ln: created symbolic link`;
    }
    return `[Simulated] ln: created hard link`;
  },
  
  // SSH & Network
  'ssh': (args) => {
    if (args.length === 0) {
      return `ssh: Secure Shell - Remote login program

Usage: ssh [OPTIONS] user@hostname

Options:
  -i <key>    Specify private key file
  -p <port>   Specify port (default: 22)
  -v          Verbose mode
  -L          Local port forwarding
  -R          Remote port forwarding

Examples:
  ssh root@192.168.1.100
  ssh -i ~/.ssh/id_rsa user@example.com
  ssh -p 2222 user@host

Official docs: https://www.openssh.com/`;
    }
    return `[Simulated] Connecting to ${args[args.length - 1]}...
Warning: This is a simulated environment.
Connection established (demo mode).

Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-91-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

Last login: Mon Jan 15 10:00:00 2024 from 192.168.1.1
vps-setup-by-bezn@vps-server:~$`;
  },
  
  'scp': (args) => {
    if (args.length < 2) {
      return `scp: Secure Copy - Transfer files via SSH

Usage: scp [OPTIONS] source destination

Examples:
  scp file.txt user@host:/path/
  scp user@host:/file.txt ./
  scp -r folder/ user@host:/path/
  scp -P 2222 file.txt user@host:/path/

Options:
  -r    Recursive (for directories)
  -P    Specify port
  -i    Specify private key`;
    }
    return `[Simulated] scp: transferred ${args[0]} successfully`;
  },
  
  'rsync': (args) => {
    if (args.length < 2) {
      return `rsync: Remote sync - Fast file transfer

Usage: rsync [OPTIONS] source destination

Common options:
  -a    Archive mode (preserves permissions)
  -v    Verbose
  -z    Compress during transfer
  -P    Progress + partial
  --delete  Delete extraneous files

Examples:
  rsync -avz /local/ user@host:/remote/
  rsync -avzP folder/ user@host:/backup/`;
    }
    return `[Simulated] rsync: synchronized successfully`;
  },
  
  'ping': (args) => {
    if (args.length === 0) return 'Usage: ping <host>';
    return `PING ${args[0]} (${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1): 56 data bytes
64 bytes: icmp_seq=0 ttl=64 time=0.${Math.floor(Math.random()*99)} ms
64 bytes: icmp_seq=1 ttl=64 time=0.${Math.floor(Math.random()*99)} ms
64 bytes: icmp_seq=2 ttl=64 time=0.${Math.floor(Math.random()*99)} ms
--- ${args[0]} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss`;
  },
  
  'curl': (args) => {
    if (args.length === 0) {
      return `curl: Transfer data from/to servers

Usage: curl [OPTIONS] <url>

Options:
  -X <method>   HTTP method (GET, POST, PUT, DELETE)
  -H <header>   Add header
  -d <data>     POST data
  -o <file>     Output to file
  -O            Save with remote filename
  -L            Follow redirects
  -v            Verbose
  -s            Silent mode

Examples:
  curl https://api.example.com/data
  curl -X POST -d '{"key":"value"}' -H 'Content-Type: application/json' https://api.example.com
  curl -O https://example.com/file.zip

Official docs: https://curl.se/docs/`;
    }
    return `[Simulated] HTTP/1.1 200 OK
Content-Type: text/html
{"status": "success", "message": "curl request simulated"}`;
  },
  
  'wget': (args) => {
    if (args.length === 0) return 'Usage: wget <url>';
    return `[Simulated] Downloading from ${args[0]}...
100%[===================>] 1,234,567    1.00MB/s    in 1.2s
'${args[0].split('/').pop() || 'index.html'}' saved`;
  },
  
  // APT Package Manager
  'apt': (args) => {
    if (args.length === 0) {
      return `apt: Advanced Package Tool

Usage: apt [command] [package]

Commands:
  update       Update package list
  upgrade      Upgrade installed packages
  install      Install package(s)
  remove       Remove package(s)
  purge        Remove package + config
  search       Search packages
  show         Show package info
  list         List packages
  autoremove   Remove unused packages
  autoclean    Clean package cache

Examples:
  sudo apt update
  sudo apt upgrade -y
  sudo apt install nginx mysql-server
  apt search nodejs

Official docs: https://wiki.debian.org/Apt`;
    }
    if (args[0] === 'update') {
      return `[Simulated] Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Hit:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease
Hit:3 http://archive.ubuntu.com/ubuntu jammy-security InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.`;
    }
    if (args[0] === 'upgrade') {
      return `[Simulated] Reading package lists... Done
Building dependency tree... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`;
    }
    if (args[0] === 'install') {
      const pkg = args.slice(1).join(' ') || 'package';
      return `[Simulated] Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  ${pkg}
0 upgraded, 1 newly installed, 0 to remove.
Setting up ${pkg}...
${pkg} has been installed successfully.`;
    }
    if (args[0] === 'search') {
      return `Sorting... Done
Full Text Search... Done
${args[1] || 'package'}/jammy 1.0.0 amd64
  Description of ${args[1] || 'package'}`;
    }
    return `apt: ${args.join(' ')} - [Simulated]`;
  },
  
  'sudo': (args) => {
    if (args.length === 0) return 'usage: sudo command\nRun command with superuser privileges';
    const cmd = args[0];
    const cmdArgs = args.slice(1);
    
    // Handle nested commands
    if (commandResponses[cmd]) {
      const response = commandResponses[cmd];
      if (typeof response === 'function') {
        return `[sudo] ${response(cmdArgs)}`;
      }
      return `[sudo] ${response}`;
    }
    return `[Simulated with sudo] ${args.join(' ')}`;
  },
  
  'su': (args) => {
    if (args.length === 0) return 'Usage: su - <username>\nSwitch user identity';
    return `[Simulated] Switched to user: ${args[args.length-1]}`;
  },
  
  // System & Services
  'systemctl': (args) => {
    if (args.length === 0) {
      return `systemctl: Control systemd services

Usage: systemctl [command] [service]

Commands:
  start <service>     Start a service
  stop <service>      Stop a service
  restart <service>   Restart a service
  reload <service>    Reload config
  status <service>    Show service status
  enable <service>    Enable at boot
  disable <service>   Disable at boot
  list-units          List all units
  daemon-reload       Reload systemd

Examples:
  sudo systemctl start nginx
  sudo systemctl status mysql
  sudo systemctl enable docker

Official docs: https://www.freedesktop.org/software/systemd/man/systemctl.html`;
    }
    const [action, service] = args;
    const services = ['nginx', 'mysql', 'docker', 'ssh', 'php8.2-fpm', 'redis-server', 'postgresql', 'fail2ban', 'ufw'];
    
    if (action === 'list-units') {
      return `UNIT                    LOAD   ACTIVE SUB     DESCRIPTION
docker.service          loaded active running Docker Application Container Engine
nginx.service           loaded active running A high performance web server
mysql.service           loaded active running MySQL Community Server
ssh.service             loaded active running OpenBSD Secure Shell server

4 loaded units listed. Pass --all to see loaded but inactive units.`;
    }
    
    if (!services.includes(service || '')) {
      if (service) return `Unit ${service}.service could not be found.`;
      return 'Missing service name. Usage: systemctl <action> <service>';
    }
    
    switch (action) {
      case 'status':
        return `● ${service}.service - ${service!.charAt(0).toUpperCase() + service!.slice(1)} Service
     Loaded: loaded (/lib/systemd/system/${service}.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2024-01-15 09:00:00 UTC; 6h ago
   Main PID: ${Math.floor(Math.random() * 10000) + 1000} (${service})
      Tasks: ${Math.floor(Math.random() * 20) + 1} (limit: 4915)
     Memory: ${Math.floor(Math.random() * 100) + 10}.${Math.floor(Math.random() * 9)}M
        CPU: ${Math.floor(Math.random() * 10)}ms
     CGroup: /system.slice/${service}.service`;
      case 'start':
        return `[Simulated] Started ${service}.service - ${service} Service`;
      case 'stop':
        return `[Simulated] Stopped ${service}.service - ${service} Service`;
      case 'restart':
        return `[Simulated] Restarted ${service}.service - ${service} Service`;
      case 'reload':
        return `[Simulated] Reloaded ${service}.service - ${service} Service`;
      case 'enable':
        return `Created symlink /etc/systemd/system/multi-user.target.wants/${service}.service → /lib/systemd/system/${service}.service.`;
      case 'disable':
        return `Removed /etc/systemd/system/multi-user.target.wants/${service}.service.`;
      default:
        return `Unknown action: ${action}`;
    }
  },
  
  'service': (args) => {
    if (args.length < 2) return 'Usage: service <name> <start|stop|status|restart>';
    return `[Simulated] ${args[0]} ${args[1]}`;
  },
  
  'journalctl': (args) => {
    if (args.length === 0) {
      return `journalctl: Query systemd journal

Usage: journalctl [OPTIONS]

Options:
  -u <service>    Show logs for service
  -f              Follow (like tail -f)
  -n <lines>      Show last N lines
  --since         Show since time
  --until         Show until time
  -p <priority>   Filter by priority

Examples:
  journalctl -u nginx -f
  journalctl -n 100
  journalctl --since "1 hour ago"`;
    }
    return `-- Logs begin at Mon 2024-01-10 08:00:00 UTC, end at Mon 2024-01-15 16:00:00 UTC. --
Jan 15 09:00:00 vps-server systemd[1]: Started service.
Jan 15 09:00:01 vps-server service[1234]: Service started successfully.
Jan 15 10:00:00 vps-server service[1234]: Processing request...`;
  },
  
  // Firewall
  'ufw': (args) => {
    if (args.length === 0) {
      return `ufw: Uncomplicated Firewall

Usage: ufw [command]

Commands:
  status          Show firewall status
  status verbose  Show detailed status
  enable          Enable firewall
  disable         Disable firewall
  allow <port>    Allow incoming port
  deny <port>     Deny incoming port
  delete <rule>   Delete rule
  reset           Reset all rules
  app list        List application profiles

Examples:
  sudo ufw status
  sudo ufw allow 22/tcp
  sudo ufw allow 'Nginx Full'
  sudo ufw deny 3306

Common ports:
  22   - SSH
  80   - HTTP
  443  - HTTPS
  3306 - MySQL
  5432 - PostgreSQL

Official docs: https://help.ubuntu.com/community/UFW`;
    }
    switch (args[0]) {
      case 'status':
        return `Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)`;
      case 'enable':
        return 'Firewall is active and enabled on system startup';
      case 'disable':
        return 'Firewall stopped and disabled on system startup';
      case 'allow':
        return `Rule added: ${args[1] || 'port'}
Rule added (v6): ${args[1] || 'port'}`;
      case 'deny':
        return `Rule added: ${args[1] || 'port'} DENY`;
      case 'app':
        if (args[1] === 'list') {
          return `Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH`;
        }
        return 'Usage: ufw app list';
      default:
        return `UFW: ${args.join(' ')}`;
    }
  },
  
  // Database
  'mysql': (args) => {
    if (args.length === 0) {
      return `mysql: MySQL Command-Line Client

Usage: mysql [OPTIONS] [database]

Options:
  -u <user>       Username
  -p              Prompt for password
  -h <host>       Server host
  -P <port>       Port number
  -e <statement>  Execute statement

Examples:
  mysql -u root -p
  mysql -u myuser -p mydatabase
  mysql -u root -p -e "SHOW DATABASES;"

Official docs: https://dev.mysql.com/doc/`;
    }
    if (args.includes('-u')) {
      return `[Simulated] Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 42
Server version: 8.0.35-0ubuntu0.22.04.1 (Ubuntu)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

mysql> `;
    }
    return 'Usage: mysql -u username -p [database]';
  },
  
  'psql': (args) => {
    if (args.length === 0) {
      return `psql: PostgreSQL interactive terminal

Usage: psql [OPTIONS] [dbname [username]]

Options:
  -U <user>       Username
  -h <host>       Server host
  -p <port>       Port number
  -d <dbname>     Database name
  -c <command>    Execute command

Examples:
  psql -U postgres
  psql -U myuser -d mydb
  psql -U postgres -c "\\l"

Official docs: https://www.postgresql.org/docs/`;
    }
    return `[Simulated] psql (14.10 (Ubuntu 14.10-0ubuntu0.22.04.1))
Type "help" for help.

postgres=# `;
  },
  
  'redis-cli': (args) => {
    return `[Simulated] 127.0.0.1:6379> PONG
Redis CLI - https://redis.io/docs/ui/cli/`;
  },
  
  // Docker
  'docker': (args) => {
    if (args.length === 0) {
      return `docker: Container management platform

Usage: docker [command]

Commands:
  ps            List running containers
  ps -a         List all containers
  images        List images
  run           Create and start container
  stop          Stop container
  start         Start stopped container
  restart       Restart container
  rm            Remove container
  rmi           Remove image
  exec          Execute command in container
  logs          View container logs
  build         Build image from Dockerfile
  pull          Pull image from registry
  push          Push image to registry
  compose       Docker Compose commands
  system        Manage Docker
  volume        Manage volumes
  network       Manage networks

Examples:
  docker ps
  docker run -d -p 80:80 nginx
  docker exec -it mycontainer bash
  docker logs -f mycontainer

Official docs: https://docs.docker.com/`;
    }
    switch (args[0]) {
      case 'ps':
        if (args.includes('-a')) {
          return `CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS                    PORTS                    NAMES
a1b2c3d4e5f6   nginx:alpine   "/docker-entrypoint.…"   2 hours ago    Up 2 hours                0.0.0.0:80->80/tcp       nginx
b2c3d4e5f6g7   mysql:8.0      "docker-entrypoint.s…"   2 hours ago    Up 2 hours                3306/tcp                 mysql
c3d4e5f6g7h8   redis:alpine   "docker-entrypoint.s…"   2 hours ago    Up 2 hours                6379/tcp                 redis
d4e5f6g7h8i9   node:20        "docker-entrypoint.s…"   3 days ago     Exited (0) 2 days ago                              app_old`;
        }
        return `CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS         PORTS                    NAMES
a1b2c3d4e5f6   nginx:alpine   "/docker-entrypoint.…"   2 hours ago    Up 2 hours     0.0.0.0:80->80/tcp       nginx
b2c3d4e5f6g7   mysql:8.0      "docker-entrypoint.s…"   2 hours ago    Up 2 hours     3306/tcp                 mysql
c3d4e5f6g7h8   redis:alpine   "docker-entrypoint.s…"   2 hours ago    Up 2 hours     6379/tcp                 redis`;
      case 'images':
        return `REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        alpine    a1b2c3d4e5f6   2 weeks ago    23.5MB
mysql        8.0       b2c3d4e5f6g7   2 weeks ago    446MB
redis        alpine    c3d4e5f6g7h8   2 weeks ago    28.5MB
node         20        d4e5f6g7h8i9   3 weeks ago    1.1GB
postgres     15        e5f6g7h8i9j0   3 weeks ago    379MB`;
      case '--version':
      case '-v':
        return 'Docker version 24.0.7, build afdd53b';
      case 'compose':
        if (args[1] === 'up') {
          return `[Simulated] Creating network "app_default" with the default driver
Creating app_db_1    ... done
Creating app_redis_1 ... done
Creating app_app_1   ... done
Creating app_nginx_1 ... done`;
        }
        if (args[1] === 'down') {
          return `[Simulated] Stopping app_nginx_1 ... done
Stopping app_app_1   ... done
Stopping app_redis_1 ... done
Stopping app_db_1    ... done
Removing app_nginx_1 ... done
Removing app_app_1   ... done
Removing app_redis_1 ... done
Removing app_db_1    ... done
Removing network app_default`;
        }
        if (args[1] === 'ps') {
          return `NAME          COMMAND                  SERVICE   STATUS    PORTS
app_nginx_1   "/docker-entrypoint.…"   nginx     running   0.0.0.0:80->80/tcp
app_app_1     "docker-php-entrypoi…"   app       running   9000/tcp
app_db_1      "docker-entrypoint.s…"   db        running   3306/tcp
app_redis_1   "docker-entrypoint.s…"   redis     running   6379/tcp`;
        }
        return `Usage: docker compose [up|down|ps|logs|build|restart]
Official docs: https://docs.docker.com/compose/`;
      case 'exec':
        return `[Simulated] Executing command in container...
root@container:/# `;
      case 'logs':
        return `[Simulated] Container logs:
2024-01-15 10:00:00 INFO: Application started
2024-01-15 10:00:01 INFO: Listening on port 3000
2024-01-15 10:05:00 INFO: Request received`;
      case 'run':
        return `[Simulated] Creating container...
Container created and started successfully.`;
      case 'stop':
        return `[Simulated] Stopping container: ${args[1] || 'container'}`;
      case 'rm':
        return `[Simulated] Removed container: ${args[1] || 'container'}`;
      case 'rmi':
        return `[Simulated] Removed image: ${args[1] || 'image'}`;
      case 'system':
        if (args[1] === 'df') {
          return `TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          5         3         1.88GB    500MB (26%)
Containers      4         3         123MB     45MB (36%)
Local Volumes   3         2         256MB     50MB (19%)
Build Cache     0         0         0B        0B`;
        }
        if (args[1] === 'prune') {
          return `[Simulated] Deleted unused data
Total reclaimed space: 1.2GB`;
        }
        return 'Usage: docker system [df|prune|info]';
      default:
        return `docker ${args.join(' ')} - [Simulated]`;
    }
  },
  
  'docker-compose': (args) => {
    const dockerCmd = commandResponses['docker'];
    if (typeof dockerCmd === 'function') {
      return dockerCmd(['compose', ...args]);
    }
    return 'docker-compose: command simulated';
  },
  
  // Web Server
  'nginx': (args) => {
    if (args.length === 0) {
      return `nginx: High-performance web server

Usage: nginx [OPTIONS]

Options:
  -t            Test configuration
  -T            Test and dump configuration
  -s <signal>   Send signal (stop, quit, reload, reopen)
  -v            Show version
  -V            Show version and configure options
  -c <file>     Use specific config file

Examples:
  sudo nginx -t           # Test config
  sudo nginx -s reload    # Reload config
  sudo nginx -s stop      # Stop server

Official docs: https://nginx.org/en/docs/`;
    }
    if (args[0] === '-t') {
      return `nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful`;
    }
    if (args[0] === '-v') {
      return 'nginx version: nginx/1.24.0 (Ubuntu)';
    }
    if (args[0] === '-V') {
      return `nginx version: nginx/1.24.0 (Ubuntu)
built with OpenSSL 3.0.2 15 Mar 2022
TLS SNI support enabled`;
    }
    if (args[0] === '-s') {
      return `[Simulated] nginx: signal ${args[1]} sent`;
    }
    return 'Usage: nginx [-t|-v|-V|-s signal]';
  },
  
  'certbot': (args) => {
    if (args.length === 0) {
      return `certbot: Let's Encrypt SSL certificate tool

Usage: certbot [command] [OPTIONS]

Commands:
  certonly      Obtain certificate only
  install       Install certificate
  renew         Renew certificates
  certificates  List certificates
  delete        Delete certificate
  --nginx       Use nginx plugin
  --apache      Use apache plugin

Examples:
  sudo certbot --nginx -d example.com
  sudo certbot renew --dry-run
  sudo certbot certificates

Official docs: https://certbot.eff.org/docs/`;
    }
    if (args.includes('--nginx')) {
      return `[Simulated] Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for ${args[args.indexOf('-d') + 1] || 'example.com'}
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem
Key is saved at: /etc/letsencrypt/live/example.com/privkey.pem`;
    }
    if (args[0] === 'renew') {
      return `[Simulated] Saving debug log to /var/log/letsencrypt/letsencrypt.log
- - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/example.com.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - -
Certificate not yet due for renewal

- - - - - - - - - - - - - - - - - - - - - - - - - - - -
No certificates are due for renewal.`;
    }
    return `certbot: ${args.join(' ')} - [Simulated]`;
  },
  
  // Development tools
  'git': (args) => {
    if (args.length === 0) {
      return `git: Distributed version control system

Usage: git [command] [OPTIONS]

Commands:
  init          Initialize repository
  clone         Clone repository
  status        Show working tree status
  add           Add files to staging
  commit        Record changes
  push          Push to remote
  pull          Fetch and merge
  fetch         Download objects
  branch        List/create branches
  checkout      Switch branches
  merge         Merge branches
  log           Show commit logs
  diff          Show changes
  stash         Stash changes

Examples:
  git clone https://github.com/user/repo.git
  git add .
  git commit -m "message"
  git push origin main

Official docs: https://git-scm.com/docs`;
    }
    switch (args[0]) {
      case 'status':
        return `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`;
      case '--version':
        return 'git version 2.34.1';
      case 'pull':
        return `Already up to date.`;
      case 'push':
        return `[Simulated] Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Writing objects: 100% (3/3), 300 bytes | 300.00 KiB/s, done.
To github.com:user/repo.git
   abc1234..def5678  main -> main`;
      case 'log':
        return `commit abc1234567890 (HEAD -> main, origin/main)
Author: vps-setup-by-bezn <bezn.sup@gmail.com>
Date:   Mon Jan 15 10:00:00 2024 +0000

    Update configuration

commit def0987654321
Author: vps-setup-by-bezn <bezn.sup@gmail.com>
Date:   Sun Jan 14 15:00:00 2024 +0000

    Initial commit`;
      default:
        return `git ${args.join(' ')} - [Simulated]`;
    }
  },
  
  'node': (args) => {
    if (args.includes('-v') || args.includes('--version')) {
      return 'v20.10.0';
    }
    return `Node.js JavaScript Runtime
Official docs: https://nodejs.org/docs/`;
  },
  
  'npm': (args) => {
    if (args.length === 0) {
      return `npm: Node Package Manager

Usage: npm [command]

Commands:
  install       Install packages
  uninstall     Remove packages
  update        Update packages
  run           Run script
  start         Run start script
  test          Run tests
  init          Initialize package.json
  list          List installed packages
  audit         Security audit
  cache         Manage cache

Examples:
  npm install express
  npm run build
  npm start

Official docs: https://docs.npmjs.com/`;
    }
    if (args[0] === '-v' || args[0] === '--version') {
      return '10.2.3';
    }
    if (args[0] === 'install' || args[0] === 'i') {
      return `[Simulated] added ${Math.floor(Math.random() * 100) + 50} packages in 3s`;
    }
    if (args[0] === 'run') {
      return `[Simulated] > ${args[1] || 'script'}\n> Running script...`;
    }
    return `npm ${args.join(' ')} - [Simulated]`;
  },
  
  'pm2': (args) => {
    if (args.length === 0) {
      return `pm2: Node.js Process Manager

Usage: pm2 [command] [OPTIONS]

Commands:
  start         Start application
  stop          Stop application
  restart       Restart application
  reload        Reload application
  delete        Delete from PM2
  list          List all processes
  logs          Display logs
  monit         Monitor all processes
  startup       Enable startup script
  save          Save process list

Examples:
  pm2 start app.js --name myapp
  pm2 list
  pm2 logs myapp
  pm2 restart all

Official docs: https://pm2.keymetrics.io/docs/`;
    }
    if (args[0] === 'list' || args[0] === 'ls') {
      return `┌─────┬────────────┬─────────────┬─────────┬─────────┬──────────┐
│ id  │ name       │ namespace   │ mode    │ status  │ cpu      │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┤
│ 0   │ myapp      │ default     │ fork    │ online  │ 0.1%     │
│ 1   │ api        │ default     │ cluster │ online  │ 0.2%     │
└─────┴────────────┴─────────────┴─────────┴─────────┴──────────┘`;
    }
    if (args[0] === 'logs') {
      return `[Simulated PM2 Logs]
0|myapp  | 2024-01-15 10:00:00: Server running on port 3000
0|myapp  | 2024-01-15 10:00:01: Database connected`;
    }
    return `pm2 ${args.join(' ')} - [Simulated]`;
  },
  
  'php': (args) => {
    if (args.includes('-v') || args.includes('--version')) {
      return `PHP 8.2.13 (cli) (built: Nov 21 2023 09:55:59) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.13, Copyright (c) Zend Technologies`;
    }
    if (args.includes('-m')) {
      return `[PHP Modules]
bcmath curl date dom fileinfo filter gd hash iconv json libxml mbstring
mysql mysqli openssl pcre PDO pdo_mysql pdo_pgsql redis session xml zip`;
    }
    return `PHP - Official docs: https://www.php.net/docs.php`;
  },
  
  'composer': (args) => {
    if (args.length === 0) {
      return `Composer: PHP Dependency Manager

Usage: composer [command] [OPTIONS]

Commands:
  install       Install dependencies
  update        Update dependencies
  require       Add dependency
  remove        Remove dependency
  dump-autoload Regenerate autoloader
  create-project Create new project

Examples:
  composer install
  composer require laravel/framework
  composer update --no-dev

Official docs: https://getcomposer.org/doc/`;
    }
    if (args[0] === '--version' || args[0] === '-V') {
      return 'Composer version 2.6.5 2023-10-06 10:11:52';
    }
    if (args[0] === 'install') {
      return `[Simulated] Installing dependencies from lock file
Nothing to install, update or remove
Generating optimized autoload files`;
    }
    return `composer ${args.join(' ')} - [Simulated]`;
  },
  
  // Monitoring commands
  'free': (args) => {
    if (args.includes('-h')) {
      return `               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       1.2Gi       1.4Gi        12Mi       1.2Gi       2.4Gi
Swap:          2.0Gi          0B       2.0Gi`;
    }
    return `               total        used        free      shared  buff/cache   available
Mem:         3997680     1258624     1496832       12288     1242224     2512384
Swap:        2097148           0     2097148`;
  },
  
  'df': (args) => {
    if (args.includes('-h')) {
      return `Filesystem      Size  Used Avail Use% Mounted on
udev            1.9G     0  1.9G   0% /dev
tmpfs           393M  1.1M  392M   1% /run
/dev/vda1        50G   15G   33G  31% /
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/vda15      105M  6.1M   99M   6% /boot/efi`;
    }
    return 'Usage: df -h (for human-readable output)';
  },
  
  'du': (args) => {
    if (args.includes('-sh')) {
      const target = args.filter(a => !a.startsWith('-'))[0] || '.';
      return `${Math.floor(Math.random() * 500) + 50}M\t${target}`;
    }
    return 'Usage: du -sh <directory>';
  },
  
  'htop': () => `[Simulated] htop - Interactive process viewer
Requires actual terminal. Install: sudo apt install htop
Official site: https://htop.dev/`,
  
  'top': () => `top - ${new Date().toLocaleTimeString()} up 15 days,  2:30,  1 user,  load average: 0.15, 0.10, 0.05
Tasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  0.7 sy,  0.0 ni, 96.8 id,  0.1 wa,  0.0 hi,  0.1 si,  0.0 st
MiB Mem :   3855.4 total,   1432.1 free,   1234.2 used,   1189.1 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   2456.3 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1234 root      20   0  456789  12345   1234 S   0.3   0.3   0:05.12 nginx
   2345 mysql     20   0  987654  98765   4567 S   0.2   2.5   1:23.45 mysqld
   3456 vps-setu+ 20   0  123456  23456   2345 S   0.1   0.6   0:01.23 node`,
  
  'ps': (args) => {
    if (args.includes('aux') || args.join('').includes('aux')) {
      return `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169432 11920 ?        Ss   Jan10   0:05 /sbin/init
root       456  0.0  0.2 234567 20480 ?        Ss   Jan10   0:10 /usr/sbin/sshd
www-data  1234  0.1  0.3 456789 30720 ?        S    09:00   0:05 nginx: worker
mysql     2345  0.2  2.5 987654 98765 ?        Sl   09:00   1:23 /usr/sbin/mysqld
vps-set+  3456  0.1  0.6 123456 23456 pts/0    Ss   10:00   0:01 node app.js`;
    }
    return `  PID TTY          TIME CMD
 3456 pts/0    00:00:00 bash
 3789 pts/0    00:00:00 ps`;
  },
  
  'kill': (args) => {
    if (args.length === 0) return 'Usage: kill [-9] <PID>';
    return `[Simulated] Sent signal to process ${args[args.length-1]}`;
  },
  
  'killall': (args) => {
    if (args.length === 0) return 'Usage: killall <process_name>';
    return `[Simulated] Killed all processes named: ${args[0]}`;
  },
  
  'netstat': (args) => {
    if (args.includes('-tulpn') || args.join('').includes('tulpn')) {
      return `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      456/sshd
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1234/nginx
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      1234/nginx
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      2345/mysqld
tcp        0      0 127.0.0.1:6379          0.0.0.0:*               LISTEN      3456/redis-server`;
    }
    return 'Usage: netstat -tulpn (show listening ports)';
  },
  
  'ss': (args) => {
    if (args.includes('-tulpn')) {
      return `Netid  State   Recv-Q  Send-Q   Local Address:Port    Peer Address:Port  Process
tcp    LISTEN  0       128          0.0.0.0:22          0.0.0.0:*      users:(("sshd",pid=456,fd=3))
tcp    LISTEN  0       511          0.0.0.0:80          0.0.0.0:*      users:(("nginx",pid=1234,fd=6))
tcp    LISTEN  0       511          0.0.0.0:443         0.0.0.0:*      users:(("nginx",pid=1234,fd=7))`;
    }
    return 'Usage: ss -tulpn (show listening ports)';
  },
  
  // Text processing
  'grep': (args) => {
    if (args.length === 0) return 'Usage: grep <pattern> <file>\nSearch for pattern in file';
    return `[Simulated] Searching for "${args[0]}" in ${args[1] || 'input'}...
Line 10: ${args[0]} found here
Line 25: another ${args[0]} match`;
  },
  
  'find': (args) => {
    if (args.length === 0) return 'Usage: find <path> -name <pattern>';
    return `[Simulated] Searching in ${args[0] || '/'}...
${args[0] || '.'}/file1.txt
${args[0] || '.'}/subdir/file2.txt`;
  },
  
  'tail': (args) => {
    if (args.length === 0) return 'Usage: tail [-f] [-n lines] <file>';
    return `[Simulated] Last 10 lines of ${args[args.length-1]}:
2024-01-15 09:55:00 INFO: Request processed
2024-01-15 09:56:00 INFO: Connection established
2024-01-15 09:57:00 INFO: Task completed
2024-01-15 09:58:00 INFO: Cache cleared
2024-01-15 09:59:00 INFO: Backup started`;
  },
  
  'head': (args) => {
    if (args.length === 0) return 'Usage: head [-n lines] <file>';
    return `[Simulated] First 10 lines of ${args[args.length-1]}`;
  },
  
  // Archive
  'tar': (args) => {
    if (args.length === 0) {
      return `tar: Archive utility

Usage: tar [OPTIONS] [FILES]

Common options:
  -c    Create archive
  -x    Extract archive
  -v    Verbose
  -f    Specify filename
  -z    Gzip compression
  -j    Bzip2 compression

Examples:
  tar -czvf archive.tar.gz folder/    # Create
  tar -xzvf archive.tar.gz            # Extract
  tar -tvf archive.tar.gz             # List contents`;
    }
    if (args.join('').includes('c')) {
      return `[Simulated] Creating archive...`;
    }
    if (args.join('').includes('x')) {
      return `[Simulated] Extracting archive...`;
    }
    return `tar ${args.join(' ')} - [Simulated]`;
  },
  
  'zip': (args) => {
    if (args.length < 2) return 'Usage: zip <archive.zip> <files>';
    return `[Simulated] adding: ${args.slice(1).join(', ')}`;
  },
  
  'unzip': (args) => {
    if (args.length === 0) return 'Usage: unzip <archive.zip>';
    return `[Simulated] Archive: ${args[0]}
  extracting: file1.txt
  extracting: file2.txt`;
  },
  
  // Security
  'fail2ban-client': (args) => {
    if (args.length === 0) {
      return `fail2ban-client: Fail2Ban management

Usage: fail2ban-client [command]

Commands:
  status        Show status
  status <jail> Show jail status
  set <jail> unbanip <ip>  Unban IP

Examples:
  fail2ban-client status
  fail2ban-client status sshd
  fail2ban-client set sshd unbanip 192.168.1.100

Official docs: https://www.fail2ban.org/`;
    }
    if (args[0] === 'status') {
      if (args[1] === 'sshd') {
        return `Status for the jail: sshd
|- Filter
|  |- Currently failed: 2
|  |- Total failed:     15
|  \`- File list:        /var/log/auth.log
\`- Actions
   |- Currently banned: 1
   |- Total banned:     5
   \`- Banned IP list:   192.168.1.100`;
      }
      return `Status
|- Number of jail:      1
\`- Jail list:   sshd`;
    }
    return `fail2ban-client ${args.join(' ')} - [Simulated]`;
  },
  
  'ssh-keygen': (args) => {
    if (args.length === 0) {
      return `ssh-keygen: Generate SSH key pairs

Usage: ssh-keygen [OPTIONS]

Options:
  -t <type>    Key type (rsa, ed25519, ecdsa)
  -b <bits>    Key bits (for RSA)
  -C <comment> Comment/email
  -f <file>    Output file

Examples:
  ssh-keygen -t ed25519 -C "email@example.com"
  ssh-keygen -t rsa -b 4096
  ssh-keygen -t ed25519 -f ~/.ssh/deploy_key`;
    }
    return `[Simulated] Generating public/private key pair...
Your public key has been saved in ~/.ssh/id_ed25519.pub`;
  },
  
  'ssh-copy-id': (args) => {
    if (args.length === 0) return 'Usage: ssh-copy-id user@host';
    return `[Simulated] Copying public key to ${args[args.length-1]}...
Number of key(s) added: 1

Now try logging into the machine.`;
  },
  
  // User management
  'useradd': (args) => {
    if (args.length === 0) return 'Usage: useradd [-m] [-s /bin/bash] <username>';
    return `[Simulated] useradd: user '${args[args.length-1]}' created`;
  },
  
  'usermod': (args) => {
    if (args.length < 2) return 'Usage: usermod [-aG group] <username>';
    return `[Simulated] usermod: modified user ${args[args.length-1]}`;
  },
  
  'userdel': (args) => {
    if (args.length === 0) return 'Usage: userdel [-r] <username>';
    return `[Simulated] userdel: user '${args[args.length-1]}' deleted`;
  },
  
  'passwd': (args) => {
    const user = args[0] || 'current user';
    return `[Simulated] passwd: password for ${user} updated successfully`;
  },

  'history': function() { return '__HISTORY__'; },
  
  'crontab': (args) => {
    if (args.includes('-l')) {
      return `# m h  dom mon dow   command
0 2 * * * /home/vps-setup-by-bezn/scripts/backup.sh
0 4 * * 0 /usr/bin/certbot renew
*/5 * * * * /home/vps-setup-by-bezn/scripts/health-check.sh`;
    }
    if (args.includes('-e')) {
      return '[Simulated] Opening crontab editor...';
    }
    return `crontab: Manage cron jobs

Usage: crontab [OPTIONS]
  -l    List current crontab
  -e    Edit crontab
  -r    Remove crontab

Cron format: minute hour day month weekday command
Examples:
  0 2 * * *     Daily at 2:00 AM
  */5 * * * *   Every 5 minutes
  0 0 * * 0     Weekly on Sunday`;
  },
  
  'timedatectl': (args) => {
    return `               Local time: Mon 2024-01-15 ${new Date().toLocaleTimeString()} UTC
           Universal time: Mon 2024-01-15 ${new Date().toLocaleTimeString()} UTC
                 RTC time: Mon 2024-01-15 ${new Date().toLocaleTimeString()}
                Time zone: Etc/UTC (UTC, +0000)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no`;
  },
  
  'env': () => `USER=nafiurohman
HOME=/home/nafiurohman
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
LANG=en_US.UTF-8
TERM=xterm-256color`,
  
  'export': (args) => {
    if (args.length === 0) return 'Usage: export VAR=value';
    return `[Simulated] Exported: ${args.join(' ')}`;
  },
  
  'alias': (args) => {
    if (args.length === 0) {
      return `alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias update='sudo apt update && sudo apt upgrade'`;
    }
    return `[Simulated] Alias set: ${args.join(' ')}`;
  },
  
  'source': (args) => {
    if (args.length === 0) return 'Usage: source <file>';
    return `[Simulated] Sourced ${args[0]}`;
  },
  
  'reboot': () => '[Simulated] System is going down for reboot NOW!',
  
  'shutdown': (args) => {
    if (args.includes('-h') && args.includes('now')) {
      return '[Simulated] System is going down for poweroff NOW!';
    }
    return 'Usage: shutdown -h now | shutdown -r now';
  },
  
  'ncdu': () => '[Simulated] NCurses Disk Usage - Interactive disk analyzer\nInstall: sudo apt install ncdu\nOfficial: https://dev.yorhel.nl/ncdu',
  
  // Additional comprehensive commands
  'traceroute': (args) => {
    if (args.length === 0) return 'Usage: traceroute <host>';
    return `traceroute to ${args[0]} (${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1), 30 hops max, 60 byte packets
 1  gateway (192.168.1.1)  1.234 ms  1.123 ms  1.456 ms
 2  10.0.0.1 (10.0.0.1)  5.678 ms  5.432 ms  5.789 ms
 3  ${args[0]} (${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1)  12.345 ms  12.123 ms  12.456 ms`;
  },
  
  'nslookup': (args) => {
    if (args.length === 0) return 'Usage: nslookup <domain>';
    return `Server:\t\t8.8.8.8
Address:\t8.8.8.8#53

Non-authoritative answer:
Name:\t${args[0]}
Address: ${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
  },
  
  'dig': (args) => {
    if (args.length === 0) return 'Usage: dig <domain>';
    return `; <<>> DiG 9.18.1-1ubuntu1.1-Ubuntu <<>> ${args[0]}
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;${args[0]}.\t\t\tIN\tA

;; ANSWER SECTION:
${args[0]}.\t300\tIN\tA\t${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}

;; Query time: 23 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Mon Jan 15 10:00:00 UTC 2024
;; MSG SIZE  rcvd: 58`;
  },
  
  'nmap': (args) => {
    if (args.length === 0) {
      return `nmap: Network exploration tool and security scanner

Usage: nmap [OPTIONS] <target>

Options:
  -sS    TCP SYN scan
  -sU    UDP scan
  -O     OS detection
  -A     Aggressive scan
  -p     Port specification

Examples:
  nmap 192.168.1.1
  nmap -sS -O 192.168.1.0/24
  nmap -p 80,443 example.com

Official docs: https://nmap.org/docs.html`;
    }
    return `Starting Nmap 7.80 ( https://nmap.org ) at ${new Date().toLocaleString()} UTC
Nmap scan report for ${args[args.length-1]}
Host is up (0.0012s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds`;
  },
  
  'screen': (args) => {
    if (args.length === 0) {
      return `screen: GNU Screen - Terminal multiplexer

Usage: screen [OPTIONS] [command]

Options:
  -S <name>     Session name
  -ls           List sessions
  -r <name>     Reattach to session
  -d            Detach session

Examples:
  screen -S mysession
  screen -ls
  screen -r mysession

Official docs: https://www.gnu.org/software/screen/`;
    }
    if (args[0] === '-ls') {
      return `There are screens on:
\t12345.mysession\t(01/15/2024 09:30:00 AM)\t(Attached)
\t12346.backup\t(01/15/2024 08:00:00 AM)\t(Detached)
2 Sockets in /var/run/screen/S-nafiurohman.`;
    }
    return `[Simulated] screen: ${args.join(' ')}`;
  },
  
  'tmux': (args) => {
    if (args.length === 0) {
      return `tmux: Terminal multiplexer

Usage: tmux [command]

Commands:
  new-session   Create new session
  list-sessions List sessions
  attach        Attach to session
  detach        Detach from session
  kill-session  Kill session

Examples:
  tmux new-session -s mysession
  tmux list-sessions
  tmux attach -t mysession

Official docs: https://github.com/tmux/tmux`;
    }
    if (args[0] === 'list-sessions' || args[0] === 'ls') {
      return `mysession: 1 windows (created Mon Jan 15 09:30:00 2024) [80x24] (attached)
backup: 1 windows (created Mon Jan 15 08:00:00 2024) [80x24]`;
    }
    return `[Simulated] tmux: ${args.join(' ')}`;
  },
  
  'w': () => {
    return ` 10:00:00 up 15 days,  2:30,  2 users,  load average: 0.15, 0.10, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
nafiurohman pts/0    192.168.1.100    09:30    0.00s  0.12s  0.01s w
root     pts/1    192.168.1.101    08:00    1:30m  0.05s  0.05s -bash`;
  },
  
  'jobs': () => {
    return `[1]+  Running                 nohup python3 app.py &
[2]-  Stopped                 vim config.txt`;
  },
  
  'file': (args) => {
    if (args.length === 0) return 'Usage: file <filename>';
    const filename = args[0];
    const extensions: Record<string, string> = {
      '.txt': 'ASCII text',
      '.py': 'Python script, ASCII text executable',
      '.js': 'ASCII text',
      '.sh': 'Bourne-Again shell script, ASCII text executable',
      '.jpg': 'JPEG image data',
      '.png': 'PNG image data',
      '.pdf': 'PDF document',
      '.zip': 'Zip archive data',
      '.tar': 'POSIX tar archive',
      '.gz': 'gzip compressed data'
    };
    const ext = Object.keys(extensions).find(e => filename.endsWith(e));
    return `${filename}: ${ext ? extensions[ext] : 'data'}`;
  },
  
  'lsof': (args) => {
    if (args.includes('-i')) {
      return `COMMAND   PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
sshd      456     root    3u  IPv4  12345      0t0  TCP *:ssh (LISTEN)
nginx    1234 www-data    6u  IPv4  23456      0t0  TCP *:http (LISTEN)
mysqld   2345    mysql   33u  IPv4  34567      0t0  TCP localhost:mysql (LISTEN)`;
    }
    return 'Usage: lsof -i (list open network files)';
  },
  
  'dmesg': () => `[    0.000000] Linux version 5.15.0-91-generic (buildd@)
[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-5.15.0-91-generic root=/dev/vda1
[    0.000000] KERNEL supported cpus:
[    0.000000]   Intel GenuineIntel
[    0.000000]   AMD AuthenticAMD
[    1.234567] systemd[1]: Detected virtualization kvm.
[    1.234567] systemd[1]: Set hostname to <vps-server-bezn>.`,
};

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ 
  className,
  initialCommands = []
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandResult[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initialCommands.forEach((cmd, index) => {
      setTimeout(() => {
        executeCommand(cmd);
      }, index * 500);
    });
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(' ');
    let output = '';
    let isError = false;

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (command === 'history') {
      output = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n');
    } else if (commandResponses[command]) {
      const response = commandResponses[command];
      if (typeof response === 'function') {
        output = response(args);
      } else {
        output = response;
      }
    } else {
      output = `bash: ${command}: command not found\n💡 Ketik 'help' untuk melihat daftar command yang tersedia.`;
      isError = true;
    }

    setHistory(prev => [...prev, {
      command: trimmedCmd,
      output,
      isError,
      timestamp: new Date()
    }]);

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = Object.keys(commandResponses);
      const matches = commands.filter(c => c.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, {
          command: input,
          output: matches.join('  '),
          timestamp: new Date()
        }]);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setHistory(prev => [...prev, {
        command: input + '^C',
        output: '',
        timestamp: new Date()
      }]);
      setInput('');
    }
  };

  const copyHistory = () => {
    const text = history.map(h => `$ ${h.command}\n${h.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearTerminal = () => {
    setHistory([]);
    setCommandHistory([]);
  };

  return (
    <div
      className={cn(
        "glass rounded-lg overflow-hidden border border-border flex flex-col",
        isMaximized ? "fixed inset-4 z-50" : "h-[600px]",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-primary/70" />
          </div>
          <Terminal size={14} className="text-muted-foreground ml-2" />
          <span className="text-xs font-mono text-muted-foreground">
            nafiurohman@nafiurohman-vps:~
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setHistory(prev => [...prev, {
              command: 'help',
              output: typeof commandResponses['help'] === 'function' ? commandResponses['help']([]) : '',
              timestamp: new Date()
            }])}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title="Show help"
          >
            <HelpCircle size={14} />
          </button>
          <button
            onClick={copyHistory}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title="Copy output"
          >
            {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
          </button>
          <button
            onClick={clearTerminal}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title="Clear terminal"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-background/80"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Welcome Message */}
        <div className="text-muted-foreground mb-4">
          <div className="text-primary">╔═══════════════════════════════════════════════════════════════════╗</div>
          <div className="text-primary">║                                                                   ║</div>
          <div className="text-primary">║  <span className="text-secondary font-bold">🖥️  VPS Terminal Simulator</span> - by <span className="text-accent">M. Nafiurohman</span>           ║</div>
          <div className="text-primary">║                                                                   ║</div>
          <div className="text-primary">║  Praktik command Linux tanpa risiko! 100+ commands tersedia      ║</div>
          <div className="text-primary">║  Ketik <span className="text-secondary">'help'</span> untuk melihat semua command yang tersedia.         ║</div>
          <div className="text-primary">║                                                                   ║</div>
          <div className="text-primary">║  📧 Email: nafiurohman25@gmail.com                                ║</div>
          <div className="text-primary">║  📱 WhatsApp: +62-813-5819-8565                                   ║</div>
          <div className="text-primary">║  🌐 Website: nafiurohman.pages.dev                                ║</div>
          <div className="text-primary">║                                                                   ║</div>
          <div className="text-primary">╚═══════════════════════════════════════════════════════════════════╝</div>
        </div>

        {/* Command History */}
        {history.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-primary text-sm">nafiurohman@nafiurohman-vps</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-secondary">~</span>
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground break-all">{item.command}</span>
            </div>
            <pre className={cn(
              "whitespace-pre-wrap mt-1 pl-4 text-xs sm:text-sm overflow-x-auto",
              item.isError ? "text-destructive" : "text-muted-foreground"
            )}>
              {item.output}
            </pre>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-wrap">
          <span className="text-primary text-sm">nafiurohman@nafiurohman-vps</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-secondary">~</span>
          <span className="text-muted-foreground">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-0 bg-transparent outline-none text-foreground"
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
          <span className="typing-cursor animate-pulse" />
        </form>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-muted/30 border-t border-border text-xs text-muted-foreground font-mono">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Simulated Environment
        </span>
        <span className="hidden sm:block">{commandHistory.length} commands | Ctrl+L: clear | Tab: autocomplete</span>
        <span className="sm:hidden">{commandHistory.length} cmds</span>
      </div>
    </div>
  );
};

export default TerminalSimulator;
