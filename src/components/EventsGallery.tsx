import React, { useState } from 'react';
import { corporateEvents } from '../data/companyData';
import { GalleryItem } from '../types';

interface EventsGalleryProps {
  onOpenEventModal: (event: GalleryItem, index: number) => void;
}

export const EventsGallery: React.FC<EventsGalleryProps> = ({ onOpenEventModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Annual Event', 'Celebration', 'Corporate Milestone', 'Team Gathering'];

  const filteredEvents = activeCategory === 'All'
    ? corporateEvents
    : corporateEvents.filter(e => e.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 border-t border-[rgba(24,54,59,0.08)] bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header & Minimal Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wider text-[#687477] uppercase">
              Corporate Archive
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18363B] tracking-tight mt-2">
              Events & Company Milestones
            </h2>
            <p className="text-sm text-[#687477] mt-3 leading-relaxed">
              Moments from our annual assemblies, team conferences, and celebrations in Dindigul.
            </p>
          </div>

          {/* Minimal Text Filter — No Pill Slop */}
          <div className="flex flex-wrap items-center gap-5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors font-medium ${
                  activeCategory === cat
                    ? 'text-[#18363B] underline underline-offset-8 decoration-2'
                    : 'text-[#687477] hover:text-[#18363B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pure Photography Grid — No Captions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => {
            const originalIndex = corporateEvents.findIndex(e => e.id === event.id);
            return (
              <div
                key={event.id}
                id={`event-item-${event.id}`}
                onClick={() => onOpenEventModal(event, originalIndex)}
                className="group cursor-pointer"
              >
                <div className="rounded-[16px] overflow-hidden bg-[#F1F1EE] aspect-[4/3] border border-[rgba(24,54,59,0.06)]">
                  <img
                    src={event.image}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
