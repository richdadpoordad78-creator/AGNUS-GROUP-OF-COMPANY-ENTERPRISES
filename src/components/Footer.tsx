import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyData } from '../data/companyData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const registrations = [
    { label: 'GST', value: companyData.registrations.gstNo },
    { label: 'ISO 9001', value: companyData.registrations.isoNo },
    { label: 'MSME', value: companyData.registrations.msmeNo },
    { label: 'FSSAI', value: companyData.registrations.fssai },
  ];

  return (
    <footer className="bg-[#102427] text-[#9CB3B6] border-t border-[rgba(24,54,59,0.2)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-10">
        
        {/* Main Footer Layout: 3 Columns on desktop, clean left-aligned natural flow on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 text-left">
          
          {/* Column 1: Brand & Contact Coordinates (6 cols on md/lg) */}
          <div className="md:col-span-6 space-y-4">
            {/* Logo + Company Name */}
            <div className="flex items-center gap-3">
              <img
                src={companyData.assets.branding.logo}
                alt="Agnus Group"
                referrerPolicy="no-referrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] object-contain shrink-0"
              />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                AGNUS GROUP OF COMPANY ENTERPRISES
              </span>
            </div>

            {/* Address */}
            <p className="text-xs sm:text-sm text-[#9CB3B6] leading-relaxed max-w-md">
              {companyData.address}
            </p>

            {/* Contact Details with WhatsApp icons */}
            <div className="space-y-2.5 text-xs sm:text-sm text-[#B2C6C8] pt-1">
              {/* Direct Line */}
              <div className="flex items-center gap-2">
                <span className="text-white/60 shrink-0">Direct:</span>
                <a
                  href={`tel:${companyData.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {companyData.contact.phoneFormatted}
                </a>
                <a
                  href={`https://wa.me/91${companyData.contact.phone}?text=Hello%20Agnus%20Group`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Agnus Group on WhatsApp (Direct)"
                  title="WhatsApp Direct"
                  className="w-6 h-6 rounded flex items-center justify-center text-[#25D366] hover:text-[#3ce47d] hover:bg-white/5 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Office Line */}
              <div className="flex items-center gap-2">
                <span className="text-white/60 shrink-0">Office:</span>
                <a
                  href={`tel:${companyData.contact.officePhone}`}
                  className="hover:text-white transition-colors"
                >
                  {companyData.contact.officePhoneFormatted}
                </a>
                <a
                  href={`https://wa.me/91${companyData.contact.officePhone}?text=Hello%20Agnus%20Group`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Agnus Group on WhatsApp (Office)"
                  title="WhatsApp Office"
                  className="w-6 h-6 rounded flex items-center justify-center text-[#25D366] hover:text-[#3ce47d] hover:bg-white/5 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-white/60 shrink-0">Email:</span>
                <a
                  href={`mailto:${companyData.contact.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {companyData.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Links Container: 2 equal side-by-side columns on mobile (Organization & Information) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6 sm:gap-8 pt-2 md:pt-0">
            
            {/* Column 2: Organization Links */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                Organization
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#9CB3B6]">
                <li>
                  <a href="#overview" className="hover:text-white transition-colors block py-0.5">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors block py-0.5">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#credentials" className="hover:text-white transition-colors block py-0.5">
                    Credentials
                  </a>
                </li>
                <li>
                  <a href="#leadership" className="hover:text-white transition-colors block py-0.5">
                    Leadership
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Information Links */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                Information
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#9CB3B6]">
                <li>
                  <a href="#gallery" className="hover:text-white transition-colors block py-0.5">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white transition-colors block py-0.5">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors block py-0.5">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#location" className="hover:text-white transition-colors block py-0.5">
                    Location
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors block py-0.5">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Compliance Credentials: Clean 2x2 grid on mobile screens, single inline row on desktop */}
        <div className="pt-8 mt-8 border-t border-white/10 text-left">
          {/* Mobile View: 2-column tidy grid (eliminates awkward wrapping & dangling dots) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-2 text-xs text-[#81999C]">
            {registrations.map((reg) => (
              <div key={reg.label} className="flex items-baseline gap-1.5">
                <span className="text-white/80 font-medium">{reg.label}:</span>
                <span className="text-[11px] font-semibold text-[#A2B8BA]">{reg.value}</span>
              </div>
            ))}
          </div>

          {/* Desktop View: Single inline row with subtle dot separators */}
          <div className="hidden lg:flex items-center flex-wrap gap-y-1 text-xs text-[#81999C] tracking-wide">
            {registrations.map((reg, index) => (
              <React.Fragment key={reg.label}>
                <span className="text-white/80 font-medium">{reg.label}:</span>
                <span className="font-semibold text-[#A2B8BA] ml-1.5">{reg.value}</span>
                {index < registrations.length - 1 && (
                  <span className="mx-3 text-white/20">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Quiet Bottom Bar with Proper Vertical Spacing */}
        <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#81999C] text-left">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <p>© {currentYear} AGNUS GROUP OF COMPANY ENTERPRISES. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">·</span>
            <p>
              Website made by{' '}
              <a
                href="https://realamericantechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium hover:text-[#48A9A6] transition-colors underline underline-offset-2"
              >
                Real American Technologies
              </a>
            </p>
          </div>

          <a
            href="#overview"
            className="hover:text-white transition-colors inline-flex items-center gap-1 pt-2 sm:pt-0 self-start sm:self-auto text-xs sm:text-[11px]"
          >
            <span>Back to top</span>
            <span>↑</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
