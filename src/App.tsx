import React, { useState } from 'react';
import { FaviconMeta } from './components/FaviconMeta';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegistrationsSection } from './components/RegistrationsSection';
import { AboutSection } from './components/AboutSection';
import { LeadershipSection } from './components/LeadershipSection';
import { EventsGallery } from './components/EventsGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { corporateEvents } from './data/companyData';
import { GalleryItem } from './types';

export default function App() {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    description: string;
    category?: string;
    eventIndex: number | null;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
    description: '',
    category: undefined,
    eventIndex: null
  });

  const handleOpenEventModal = (event: GalleryItem, index: number) => {
    setLightbox({
      isOpen: true,
      imageUrl: event.image,
      title: event.title,
      description: `${event.date} — ${event.description}`,
      category: event.category,
      eventIndex: index
    });
  };

  const handleNextEvent = () => {
    if (lightbox.eventIndex === null) return;
    const nextIndex = (lightbox.eventIndex + 1) % corporateEvents.length;
    const nextEvent = corporateEvents[nextIndex];
    setLightbox({
      isOpen: true,
      imageUrl: nextEvent.image,
      title: nextEvent.title,
      description: `${nextEvent.date} — ${nextEvent.description}`,
      category: nextEvent.category,
      eventIndex: nextIndex
    });
  };

  const handlePrevEvent = () => {
    if (lightbox.eventIndex === null) return;
    const prevIndex = (lightbox.eventIndex - 1 + corporateEvents.length) % corporateEvents.length;
    const prevEvent = corporateEvents[prevIndex];
    setLightbox({
      isOpen: true,
      imageUrl: prevEvent.image,
      title: prevEvent.title,
      description: `${prevEvent.date} — ${prevEvent.description}`,
      category: prevEvent.category,
      eventIndex: prevIndex
    });
  };

  const handleCloseLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#18363B] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#2F7772] selection:text-white">
      {/* Favicon & Meta Tags */}
      <FaviconMeta />

      {/* Sticky Header & Navbar */}
      <Navbar />

      {/* Main Content Regions */}
      <main className="flex-1">
        <HeroSection />
        <RegistrationsSection />
        <AboutSection />
        <LeadershipSection />
        <EventsGallery onOpenEventModal={handleOpenEventModal} />
        <TestimonialsSection />
        <FaqSection />
        <LocationSection />
        <ContactSection />
      </main>

      {/* Corporate Comprehensive Footer */}
      <Footer />

      {/* Interactive Lightbox Viewer */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        onClose={handleCloseLightbox}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        description={lightbox.description}
        category={lightbox.category}
        onNext={lightbox.eventIndex !== null ? handleNextEvent : undefined}
        onPrev={lightbox.eventIndex !== null ? handlePrevEvent : undefined}
        hasNavigation={lightbox.eventIndex !== null}
      />
    </div>
  );
}

