import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import DisclaimerSection from '@/components/sections/DisclaimerSection';
import PreparationSection from '@/components/sections/PreparationSection';
import SetupGuideSection from '@/components/sections/SetupGuideSection';
import DatabaseSection from '@/components/sections/DatabaseSection';
import WebServerSection from '@/components/sections/WebServerSection';
import DockerSection from '@/components/sections/DockerSection';
import ToolsSection from '@/components/sections/ToolsSection';
import TroubleshootSection from '@/components/sections/TroubleshootSection';
import FinalChecklistSection from '@/components/sections/FinalChecklistSection';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simple search - scroll to first matching section
    if (query) {
      const sections = document.querySelectorAll('section');
      for (const section of sections) {
        if (section.textContent?.toLowerCase().includes(query.toLowerCase())) {
          section.scrollIntoView({ behavior: 'smooth' });
          break;
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} scrollProgress={scrollProgress} />
      
      <main>
        <HeroSection />
        <DisclaimerSection />
        <PreparationSection />
        <SetupGuideSection />
        <section id="security" className="hidden" /> {/* Anchor for nav */}
        <DatabaseSection />
        <WebServerSection />
        <DockerSection />
        <ToolsSection />
        <TroubleshootSection />
        <FinalChecklistSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
