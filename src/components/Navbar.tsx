import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Phone, Mail } from 'lucide-react';
import { companyData } from '../data/companyData';

interface DropdownItem {
  name: string;
  href: string;
  id: string;
  description?: string;
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Grouped items for "Company" dropdown
  const companyItems: DropdownItem[] = [
    { name: 'Leadership', href: '#leadership', id: 'leadership', description: 'Executive & operations team' },
    { name: 'Gallery', href: '#gallery', id: 'gallery', description: 'Real corporate & event archive' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials', description: 'Partner & client reviews' },
    { name: 'FAQ', href: '#faq', id: 'faq', description: 'Frequently asked questions' },
    { name: 'Location', href: '#location', id: 'location', description: 'Office & headquarters map' },
  ];

  const primaryLinks = [
    { name: 'Overview', href: '#overview', id: 'overview' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Credentials', href: '#credentials', id: 'credentials' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const companySectionIds = companyItems.map((item) => item.id);
  const allSectionIds = ['overview', 'about', 'credentials', ...companySectionIds, 'contact'];

  // Scroll detection for sticky header styling & active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll offset
      const scrollPos = window.scrollY + 140;
      for (let i = allSectionIds.length - 1; i >= 0; i--) {
        const id = allSectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCompanyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setIsCompanyOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover handlers with debounce for smooth dropdown UX
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsCompanyOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsCompanyOpen(false);
    }, 150);
  };

  // Check if active section belongs to the Company dropdown
  const isCompanyActive = companySectionIds.includes(activeSection);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[rgba(24,54,59,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3.5 sm:py-4'
            : 'bg-[#F7F6F2] border-b border-transparent py-4.5 sm:py-5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6">
          
          {/* Logo & Company Name */}
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group focus:outline-none"
          >
            <img
              src={companyData.assets.branding.logo}
              alt="Agnus Group"
              referrerPolicy="no-referrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] sm:rounded-[8px] object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#18363B] whitespace-nowrap">
              AGNUS GROUP
            </span>
          </a>

          {/* Desktop Navigation (5 Primary Items with Consistent 32px Equal Gaps) */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8 text-[14px]">
              
              {/* 1. Overview */}
              <a
                id="nav-link-overview"
                href="#overview"
                className={`relative py-1 font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === 'overview'
                    ? 'text-[#18363B] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2F7772] after:rounded-full'
                    : 'text-[#687477] hover:text-[#18363B]'
                }`}
              >
                Overview
              </a>

              {/* 2. About */}
              <a
                id="nav-link-about"
                href="#about"
                className={`relative py-1 font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === 'about'
                    ? 'text-[#18363B] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2F7772] after:rounded-full'
                    : 'text-[#687477] hover:text-[#18363B]'
                }`}
              >
                About
              </a>

              {/* 3. Credentials */}
              <a
                id="nav-link-credentials"
                href="#credentials"
                className={`relative py-1 font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === 'credentials'
                    ? 'text-[#18363B] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2F7772] after:rounded-full'
                    : 'text-[#687477] hover:text-[#18363B]'
                }`}
              >
                Credentials
              </a>

              {/* 4. Company (Dropdown: Leadership, Gallery, Testimonials, FAQ, Location) */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="nav-dropdown-company-btn"
                  type="button"
                  onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                  aria-expanded={isCompanyOpen}
                  aria-haspopup="true"
                  className={`relative py-1 font-medium transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                    isCompanyActive || isCompanyOpen
                      ? 'text-[#18363B] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2F7772] after:rounded-full'
                      : 'text-[#687477] hover:text-[#18363B]'
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isCompanyOpen ? 'rotate-180 text-[#2F7772]' : 'text-[#687477]'
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel */}
                {isCompanyOpen && (
                  <div
                    id="nav-company-dropdown-menu"
                    className="absolute left-0 top-full mt-2 w-64 rounded-[14px] bg-white p-2 shadow-[0_14px_34px_rgba(24,54,59,0.12)] border border-[rgba(24,54,59,0.08)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="space-y-0.5">
                      {companyItems.map((item) => {
                        const isSubActive = activeSection === item.id;
                        return (
                          <a
                            key={item.name}
                            id={`nav-sublink-${item.id}`}
                            href={item.href}
                            onClick={() => setIsCompanyOpen(false)}
                            className={`flex flex-col px-3.5 py-2.5 rounded-[9px] transition-all duration-150 ${
                              isSubActive
                                ? 'bg-[#F1F1EE] text-[#18363B]'
                                : 'text-[#18363B] hover:bg-[#F7F6F2] hover:text-[#2F7772]'
                            }`}
                          >
                            <span className="font-semibold text-xs text-[#18363B] flex items-center justify-between">
                              <span>{item.name}</span>
                              {isSubActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2F7772]" />
                              )}
                            </span>
                            {item.description && (
                              <span className="text-[11px] text-[#687477] mt-0.5 line-clamp-1">
                                {item.description}
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Contact */}
              <a
                id="nav-link-contact"
                href="#contact"
                className={`relative py-1 font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === 'contact'
                    ? 'text-[#18363B] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2F7772] after:rounded-full'
                    : 'text-[#687477] hover:text-[#18363B]'
                }`}
              >
                Contact
              </a>
            </nav>

            {/* Primary Call-to-Action: Strengthened "Connect" Button */}
            <div className="pl-4 border-l border-[rgba(24,54,59,0.12)]">
              <a
                id="nav-connect-btn"
                href="#contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#18363B] hover:bg-[#234B52] text-white text-[13.5px] font-semibold shadow-[0_2px_8px_rgba(24,54,59,0.12)] hover:shadow-[0_6px_20px_rgba(24,54,59,0.22)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap"
              >
                <span>Connect</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-white/90" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Trigger (below 1024px) */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center rounded-[10px] text-[#18363B] hover:bg-black/5 active:scale-95 transition-all"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Polished Mobile Menu Drawer with Smooth Slide & Clear Close (X) Button */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#F7F6F2] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-250 border-l border-[rgba(24,54,59,0.08)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Mobile Drawer Header with Clear Close (X) */}
              <div className="flex items-center justify-between pb-5 border-b border-[rgba(24,54,59,0.08)]">
                <a
                  href="#overview"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <img
                    src={companyData.assets.branding.logo}
                    alt="Agnus Group"
                    className="w-7 h-7 rounded-[6px] object-contain"
                  />
                  <span className="font-bold text-base text-[#18363B]">AGNUS GROUP</span>
                </a>

                <button
                  id="mobile-menu-close-btn"
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 -mr-1 flex items-center justify-center rounded-[10px] bg-white border border-[rgba(24,54,59,0.08)] text-[#18363B] hover:bg-[#F1F1EE] active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grouped Navigation Links with Active States */}
              <nav className="mt-6 space-y-5">
                {/* Primary Section */}
                <div className="space-y-1">
                  <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#687477]">
                    Main Pages
                  </p>
                  {primaryLinks.slice(0, 3).map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-[10px] text-sm font-semibold transition-colors ${
                          isActive
                            ? 'bg-white text-[#18363B] shadow-xs border border-[rgba(24,54,59,0.06)]'
                            : 'text-[#687477] hover:text-[#18363B] hover:bg-black/5'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7772]" />}
                      </a>
                    );
                  })}
                </div>

                {/* Company Dropdown Group */}
                <div className="space-y-1 pt-2 border-t border-[rgba(24,54,59,0.08)]">
                  <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#687477]">
                    Company Directory
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {companyItems.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-white text-[#18363B] font-semibold shadow-xs border border-[rgba(24,54,59,0.06)]'
                              : 'text-[#687477] hover:text-[#18363B] hover:bg-black/5'
                          }`}
                        >
                          <span>{item.name}</span>
                          <span className="text-xs text-[#687477]/70">0{companyItems.indexOf(item) + 1}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="pt-2 border-t border-[rgba(24,54,59,0.08)]">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-[10px] text-sm font-semibold transition-colors ${
                      activeSection === 'contact'
                        ? 'bg-white text-[#18363B] shadow-xs border border-[rgba(24,54,59,0.06)]'
                        : 'text-[#687477] hover:text-[#18363B] hover:bg-black/5'
                    }`}
                  >
                    <span>Contact Details</span>
                    <ArrowRight className="w-4 h-4 text-[#687477]" />
                  </a>
                </div>
              </nav>
            </div>

            {/* Mobile Footer with Direct Call/Email & Connect Button */}
            <div className="pt-6 mt-6 border-t border-[rgba(24,54,59,0.08)] space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${companyData.contact.phone}`}
                  className="p-2.5 rounded-[10px] bg-white border border-[rgba(24,54,59,0.08)] text-[#18363B] flex items-center justify-center gap-1.5 font-medium active:bg-[#F1F1EE]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2F7772]" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`mailto:${companyData.contact.email}`}
                  className="p-2.5 rounded-[10px] bg-white border border-[rgba(24,54,59,0.08)] text-[#18363B] flex items-center justify-center gap-1.5 font-medium active:bg-[#F1F1EE]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2F7772]" />
                  <span>Email</span>
                </a>
              </div>

              {/* Primary Mobile CTA */}
              <a
                id="mobile-connect-btn"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-[10px] bg-[#18363B] active:bg-[#234B52] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Connect With Agnus Group</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
