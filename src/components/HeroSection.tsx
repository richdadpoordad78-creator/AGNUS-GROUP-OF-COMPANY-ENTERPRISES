import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { companyData } from '../data/companyData';

interface HeroSectionProps {
  onOpenImage?: (url: string, title: string, description: string, category?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenImage }) => {
  const trustStats = [
    {
      value: 'ISO 9001:2015',
      label: 'Certified Systems',
    },
    {
      value: '15+ Years',
      label: 'Regional Presence',
    },
    {
      value: '500+',
      label: 'Projects Delivered',
    },
    {
      value: 'Tamil Nadu',
      label: 'Statewide Network',
    },
  ];

  return (
    <section id="overview" className="pt-8 pb-14 sm:pt-12 sm:pb-16 bg-[#F7F6F2] border-b border-[rgba(24,54,59,0.08)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Clean Editorial Content Matching Navbar Typography & Colors */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6 order-2 lg:order-1"
          >
            <div className="space-y-4 sm:space-y-5">
              
              {/* Overline matching Navbar section headers */}
              <p className="text-[11px] font-semibold tracking-wider text-[#687477] uppercase">
                Agnus Group
              </p>

              {/* Solid Headline in Brand Dark Tone */}
              <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-bold text-[#18363B] leading-[1.14] tracking-tight">
                Building businesses with quality, integrity and purpose.
              </h1>

              {/* Concise, confident one-liner */}
              <p className="text-[#687477] text-base sm:text-lg leading-relaxed max-w-lg font-normal">
                Headquartered in Dindigul, Agnus Group delivers ISO-certified quality across Tamil Nadu.
              </p>

              {/* Action Buttons: Matching Navbar Radius (rounded-[10px]), Font, and Styling */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  id="hero-explore-btn"
                  href="#about"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#18363B] hover:bg-[#234B52] text-white text-[13.5px] sm:text-[14px] font-semibold shadow-[0_2px_8px_rgba(24,54,59,0.12)] hover:shadow-[0_6px_20px_rgba(24,54,59,0.22)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap"
                >
                  <span>Explore Our Company</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-white/90" />
                </a>

                <a
                  id="hero-credentials-link"
                  href="#credentials"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-[10px] bg-white hover:bg-[#F1F1EE] text-[#18363B] text-[13.5px] sm:text-[14px] font-semibold border border-[rgba(24,54,59,0.12)] hover:border-[rgba(24,54,59,0.2)] shadow-xs transition-all duration-200 whitespace-nowrap"
                >
                  <span>View Credentials</span>
                </a>
              </div>
            </div>

            {/* Minimal Stat Bar: Pure Typographic Stats with Dividers */}
            <div className="pt-6 border-t border-[rgba(24,54,59,0.1)] mt-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-[rgba(24,54,59,0.12)]">
                {trustStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      idx === 0 ? 'sm:pr-4' : idx === trustStats.length - 1 ? 'sm:pl-4' : 'sm:px-4'
                    }`}
                  >
                    <span className="text-base sm:text-lg font-bold text-[#18363B] tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-[#687477] uppercase tracking-wide mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Architectural Photo with matching rounded-[12px] frame */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col order-1 lg:order-2"
          >
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[350px] lg:min-h-full rounded-[12px] overflow-hidden border border-[rgba(24,54,59,0.08)] bg-white shadow-[0_4px_20px_rgba(24,54,59,0.05)] group">
              <img
                src={companyData.assets.branding.office}
                alt="Agnus Group Corporate Facility"
                referrerPolicy="no-referrer"
                onClick={() =>
                  onOpenImage?.(
                    companyData.assets.branding.office,
                    'Agnus Group Corporate Facility',
                    'Central headquarters on Old Karur Road, Dindigul, Tamil Nadu.',
                    'Facility'
                  )
                }
                className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-95 cursor-pointer"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
