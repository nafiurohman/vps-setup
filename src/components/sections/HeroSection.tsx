import React, { useEffect, useState } from 'react';
import { ArrowDown, BookOpen, CheckSquare, Terminal } from 'lucide-react';
import TypingAnimation from '../ui/TypingAnimation';

export const HeroSection: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-secondary/10 rounded-full blur-3xl opacity-20" />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Terminal Window */}
        <div className="max-w-2xl mx-auto mb-8 terminal animate-fade-up">
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="ml-4 text-xs text-muted-foreground font-mono">
              root@vps ~ 
            </span>
          </div>
          <div className="p-6 text-left">
            <div className="flex items-center gap-2 text-lg md:text-xl font-mono">
              <span className="text-primary">$</span>
              <TypingAnimation
                text="sudo ./setup-server.sh --production"
                speed={60}
                className="text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 glitch animate-fade-up"
          data-text="VPS Setup Guide"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-gradient">VPS Setup Guide</span>
        </h1>

        {/* Tagline */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Panduan Lengkap Setup VPS dari Nol hingga{' '}
          <span className="text-primary font-semibold">Production-Ready</span>
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <button
            onClick={() => scrollToSection('preparation')}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono font-semibold rounded-lg hover:neon-glow transition-all duration-300 hover:scale-105"
          >
            <Terminal size={20} />
            Mulai Setup
          </button>
          <button
            onClick={() => scrollToSection('checklist')}
            className="flex items-center gap-2 px-8 py-4 border border-primary/50 text-primary font-mono font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            <CheckSquare size={20} />
            Lihat Checklist
          </button>
        </div>

        
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />
    </section>
  );
};

export default HeroSection;
