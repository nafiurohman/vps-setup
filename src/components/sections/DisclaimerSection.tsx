import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, Shield, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DisclaimerSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const disclaimerPoints = [
    {
      icon: <Shield size={18} />,
      title: 'Panduan Edukatif',
      text: 'Panduan ini bersifat edukatif dan umum. Konfigurasi mungkin perlu disesuaikan dengan kebutuhan spesifik server dan aplikasi Anda.',
    },
    {
      icon: <CheckCircle size={18} />,
      title: 'Backup Data',
      text: 'SELALU backup data dan konfigurasi sebelum melakukan perubahan apapun pada server production.',
    },
    {
      icon: <AlertTriangle size={18} />,
      title: 'Disclaimer',
      text: 'Kami tidak bertanggung jawab atas kerusakan sistem, kehilangan data, atau masalah lain yang mungkin timbul dari penggunaan panduan ini.',
    },
    {
      icon: <Shield size={18} />,
      title: 'OS Compatibility',
      text: 'Panduan ini dioptimalkan untuk Ubuntu 22.04 LTS dan Debian 11+. Command mungkin berbeda untuk distro lain.',
    },
  ];

  return (
    <section id="disclaimer" className="py-16">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "glass rounded-xl overflow-hidden transition-all duration-300",
            "border border-destructive/30 bg-destructive/5"
          )}
        >
          {/* Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-destructive/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <AlertTriangle className="text-destructive" size={24} />
              </div>
              <div className="text-left">
                <h2 className="font-mono font-semibold text-lg">
                  ⚠️ Disclaimer & Peringatan Penting
                </h2>
                <p className="text-sm text-muted-foreground">
                  Baca sebelum memulai setup VPS
                </p>
              </div>
            </div>
            <ChevronDown
              size={24}
              className={cn(
                "text-muted-foreground transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </button>

          {/* Content */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-6 pb-6 border-t border-destructive/20">
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                {disclaimerPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-lg bg-muted/30"
                  >
                    <div className="flex-shrink-0 mt-0.5 text-destructive">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-mono font-medium text-sm mb-1">
                        {point.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {point.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-mono font-medium text-sm text-primary mb-2">
                  💡 Tips Sebelum Mulai:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Siapkan terminal/SSH client (PuTTY, Terminal, iTerm)</li>
                  <li>• Catat semua credential dan password yang dibuat</li>
                  <li>• Buka tab browser untuk dokumentasi tambahan jika diperlukan</li>
                  <li>• Gunakan password manager untuk menyimpan credential</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;
