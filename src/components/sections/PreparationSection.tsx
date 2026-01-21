import React from 'react';
import { Server, Cloud, Cpu, Globe, CheckSquare, Layers } from 'lucide-react';
import ComparisonTable from '../ui/ComparisonTable';
import ResourceCalculator from '../ui/ResourceCalculator';
import InteractiveChecklist from '../ui/InteractiveChecklist';
import { cn } from '@/lib/utils';

const vpsTypes = {
  columns: [
    { id: 'shared', title: 'Shared VPS', icon: <Layers size={20} className="text-secondary" /> },
    { id: 'dedicated', title: 'Dedicated VPS', icon: <Server size={20} className="text-primary" /> },
    { id: 'cloud', title: 'Cloud VPS', icon: <Cloud size={20} className="text-secondary" />, highlight: true },
    { id: 'managed', title: 'Managed VPS', icon: <Cpu size={20} className="text-muted-foreground" /> },
  ],
  rows: [
    { feature: 'Harga', values: { shared: '💰 Murah', dedicated: '💸 Mahal', cloud: '💰 Fleksibel', managed: '💸 Premium' } },
    { feature: 'Resource Dedicated', values: { shared: false, dedicated: true, cloud: true, managed: true } },
    { feature: 'Scalability', values: { shared: '❌ Terbatas', dedicated: '⚠️ Manual', cloud: '✅ Otomatis', managed: '✅ Otomatis' } },
    { feature: 'Maintenance', values: { shared: 'Self', dedicated: 'Self', cloud: 'Self', managed: 'Provider' } },
    { feature: 'Use Case', values: { shared: 'Dev/Test', dedicated: 'Production', cloud: 'API/Apps', managed: 'Non-teknis' } },
    { feature: 'Cocok Untuk', values: { shared: 'Pemula', dedicated: 'Enterprise', cloud: 'Startup', managed: 'Bisnis Kecil' } },
  ],
};

const osOptions = [
  {
    id: 'ubuntu-22',
    name: 'Ubuntu 22.04 LTS',
    recommended: true,
    pros: ['Support hingga 2027', 'Komunitas besar', 'Dokumentasi lengkap', 'Kompatibel semua stack'],
    cons: ['Versi package kadang tidak terbaru'],
    command: 'lsb_release -a',
  },
  {
    id: 'ubuntu-20',
    name: 'Ubuntu 20.04 LTS',
    recommended: false,
    pros: ['Stabil', 'Banyak tutorial', 'Support hingga 2025'],
    cons: ['Package lebih lama', 'Beberapa library perlu update manual'],
    command: 'lsb_release -a',
  },
  {
    id: 'debian-11',
    name: 'Debian 11 (Bullseye)',
    recommended: false,
    pros: ['Sangat stabil', 'Minimal resource', 'Security focused'],
    cons: ['Package konservatif', 'Kurang tutorial dibanding Ubuntu'],
    command: 'cat /etc/debian_version',
  },
  {
    id: 'centos',
    name: 'CentOS / Rocky Linux',
    recommended: false,
    pros: ['Enterprise-grade', 'RHEL compatible'],
    cons: ['Command berbeda', 'Kurang resource online'],
    command: 'cat /etc/redhat-release',
  },
];

const vpsProviders = [
  { name: 'DigitalOcean', cpu: '1-32', ram: '1-256GB', storage: '25-500GB', bandwidth: '1-12TB', price: '$5-500', location: 'Global', rating: '⭐⭐⭐⭐⭐' },
  { name: 'Vultr', cpu: '1-24', ram: '1-96GB', storage: '25-400GB', bandwidth: '1-10TB', price: '$5-320', location: 'Global', rating: '⭐⭐⭐⭐⭐' },
  { name: 'Linode', cpu: '1-32', ram: '1-256GB', storage: '25-512GB', bandwidth: '1-20TB', price: '$5-480', location: 'Global', rating: '⭐⭐⭐⭐' },
  { name: 'AWS Lightsail', cpu: '1-8', ram: '512MB-32GB', storage: '20-640GB', bandwidth: '1-7TB', price: '$3.5-160', location: 'Global', rating: '⭐⭐⭐⭐' },
  { name: 'Contabo', cpu: '4-12', ram: '8-60GB', storage: '200-1.6TB', bandwidth: 'Unlimited', price: '$6-36', location: 'EU/US/Asia', rating: '⭐⭐⭐' },
  { name: 'IDCloudHost', cpu: '1-16', ram: '1-64GB', storage: '20-200GB', bandwidth: 'Unlimited', price: 'Rp50k-2jt', location: 'Indonesia', rating: '⭐⭐⭐⭐' },
];

const preSetupChecklist = [
  { id: 'vps-ready', label: 'VPS sudah dibeli dan aktif', description: 'Pastikan status VPS sudah running' },
  { id: 'credentials', label: 'IP address, username, password/SSH key sudah diterima', description: 'Check email dari provider' },
  { id: 'domain', label: 'Domain sudah disiapkan (optional)', description: 'Pointing DNS ke IP VPS' },
  { id: 'backup-plan', label: 'Backup strategy sudah direncanakan', description: 'Tentukan jadwal backup' },
  { id: 'security-plan', label: 'Security plan sudah dibuat', description: 'Firewall, SSH hardening, dll' },
  { id: 'ssh-client', label: 'SSH client sudah terinstall', description: 'Terminal, PuTTY, atau iTerm' },
];

export const PreparationSection: React.FC = () => {
  return (
    <section id="preparation" className="py-16">
      <div className="container mx-auto px-4 space-y-16">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">📋 Persiapan VPS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sebelum memulai setup, pastikan Anda sudah memilih VPS yang tepat dan memenuhi
            requirement yang dibutuhkan.
          </p>
        </div>

        {/* 4.1 Jenis VPS */}
        <div className="space-y-4">
          <h3 className="text-xl font-mono font-semibold flex items-center gap-2">
            <span className="badge-step text-sm">4.1</span>
            Jenis VPS
          </h3>
          <ComparisonTable 
            columns={vpsTypes.columns} 
            rows={vpsTypes.rows}
            title="Perbandingan Tipe VPS"
          />
        </div>

        {/* 4.2 Resource Calculator */}
        <div className="space-y-4">
          <h3 className="text-xl font-mono font-semibold flex items-center gap-2">
            <span className="badge-step text-sm">4.2</span>
            Resource Requirements
          </h3>
          <ResourceCalculator />
        </div>

        {/* 4.3 Sistem Operasi */}
        <div className="space-y-4">
          <h3 className="text-xl font-mono font-semibold flex items-center gap-2">
            <span className="badge-step text-sm">4.3</span>
            Sistem Operasi
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {osOptions.map((os) => (
              <div
                key={os.id}
                className={cn(
                  "glass rounded-lg p-5 transition-all card-hover",
                  os.recommended && "border-primary/50 bg-primary/5"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono font-semibold">{os.name}</h4>
                  {os.recommended && (
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Kelebihan:</p>
                    <ul className="text-sm space-y-1">
                      {os.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-primary">+</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Kekurangan:</p>
                    <ul className="text-sm space-y-1">
                      {os.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-destructive">-</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-2 bg-muted rounded text-xs font-mono text-muted-foreground">
                  $ {os.command}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4.4 VPS Providers */}
        <div className="space-y-4">
          <h3 className="text-xl font-mono font-semibold flex items-center gap-2">
            <span className="badge-step text-sm">4.4</span>
            VPS Provider Comparison
          </h3>
          <div className="glass rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-mono">Provider</th>
                    <th className="px-4 py-3 text-center font-mono">CPU</th>
                    <th className="px-4 py-3 text-center font-mono">RAM</th>
                    <th className="px-4 py-3 text-center font-mono">Storage</th>
                    <th className="px-4 py-3 text-center font-mono">Bandwidth</th>
                    <th className="px-4 py-3 text-center font-mono">Price</th>
                    <th className="px-4 py-3 text-center font-mono">Location</th>
                    <th className="px-4 py-3 text-center font-mono">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {vpsProviders.map((provider, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{provider.name}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{provider.cpu}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{provider.ram}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{provider.storage}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{provider.bandwidth}</td>
                      <td className="px-4 py-3 text-center text-primary font-mono">{provider.price}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{provider.location}</td>
                      <td className="px-4 py-3 text-center">{provider.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4.5 Network & Location Tips */}
        <div className="space-y-4">
          <h3 className="text-xl font-mono font-semibold flex items-center gap-2">
            <span className="badge-step text-sm">4.5</span>
            Network & Location Tips
          </h3>
          <div className="glass rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Globe className="text-secondary flex-shrink-0" size={24} />
              <div>
                <h4 className="font-mono font-medium mb-2">Pilih Lokasi Server yang Tepat</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Target Indonesia:</strong> Pilih Singapore, Jakarta, atau data center terdekat</li>
                  <li>• <strong>Target Global:</strong> Pilih US (West Coast) atau EU (Frankfurt/Amsterdam)</li>
                  <li>• <strong>Latency Check:</strong> Gunakan <code className="text-primary">ping</code> atau <a href="https://cloudping.info" target="_blank" className="text-secondary hover:underline">cloudping.info</a></li>
                  <li>• <strong>Tip:</strong> Bandwidth minimal 1 Gbps untuk production app</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4.6 Pre-Setup Checklist */}
        <div id="checklist" className="space-y-4">
          <h3 className="text-xl font-mono font-semibold flex items-center gap-2">
            <span className="badge-step text-sm">4.6</span>
            Pre-Setup Checklist
          </h3>
          <InteractiveChecklist
            title="✅ Sebelum Mulai Setup"
            items={preSetupChecklist}
            storageKey="vps-pre-setup-checklist"
          />
        </div>
      </div>
    </section>
  );
};

export default PreparationSection;
