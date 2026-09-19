import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { companyData } from '../data/companyData';
import { ContactMessage } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    phone: '',
    email: '',
    subject: 'General Business Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/91${companyData.contact.phone}?text=${encodeURIComponent(
    `Hello Agnus Group Team, I am ${formData.name || 'a visitor'}. ${formData.message || 'I would like to inquire about your services and operations in Dindigul.'}`
  )}`;

  const mailtoUrl = `mailto:${companyData.contact.email}?subject=${encodeURIComponent(
    formData.subject || 'Inquiry regarding AGNUS GROUP OF COMPANY ENTERPRISES'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-[rgba(24,54,59,0.08)] bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Company Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#687477] uppercase">
                Contact Desk
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#18363B] tracking-tight mt-2">
                Get in touch with our team.
              </h2>
              <p className="text-sm text-[#687477] mt-3 leading-relaxed">
                Direct all business inquiries, partnerships, and statutory verifications to our administrative office in Dindigul.
              </p>
            </div>

            <div className="space-y-4 pt-2 text-sm">
              <div>
                <p className="text-xs text-[#687477]">Mobile Helpline</p>
                <a
                  href={`tel:${companyData.contact.phone}`}
                  className="font-semibold text-base text-[#18363B] hover:text-[#2F7772] transition-colors"
                >
                  {companyData.contact.phoneFormatted}
                </a>
              </div>

              <div>
                <p className="text-xs text-[#687477]">Office Phone</p>
                <a
                  href={`tel:${companyData.contact.officePhone}`}
                  className="font-semibold text-base text-[#18363B] hover:text-[#2F7772] transition-colors"
                >
                  {companyData.contact.officePhoneFormatted}
                </a>
              </div>

              <div>
                <p className="text-xs text-[#687477]">Email Address</p>
                <a
                  href={`mailto:${companyData.contact.email}`}
                  className="font-semibold text-base text-[#18363B] hover:text-[#2F7772] transition-colors"
                >
                  {companyData.contact.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F7772] hover:text-[#18363B] transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Simple Clean Contact Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="space-y-4 py-8">
                <h3 className="text-xl font-bold text-[#18363B]">
                  Thank you, {formData.name}.
                </h3>
                <p className="text-sm text-[#687477] leading-relaxed max-w-md">
                  Your message has been received. Our office will respond shortly. You may also send your query directly via email or WhatsApp.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={mailtoUrl}
                    className="text-xs font-semibold text-[#18363B] underline underline-offset-4"
                  >
                    Open in Mail Client
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'General Business Inquiry', message: '' });
                    }}
                    className="text-xs text-[#687477] hover:text-[#18363B]"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#18363B] mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-[rgba(24,54,59,0.12)] focus:border-[#18363B] focus:outline-none text-sm text-[#18363B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-[#18363B] mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your contact number"
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-[rgba(24,54,59,0.12)] focus:border-[#18363B] focus:outline-none text-sm text-[#18363B]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#18363B] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-[rgba(24,54,59,0.12)] focus:border-[#18363B] focus:outline-none text-sm text-[#18363B]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-[#18363B] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you?"
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-[rgba(24,54,59,0.12)] focus:border-[#18363B] focus:outline-none text-sm text-[#18363B] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="px-5 py-2.5 rounded-[10px] bg-[#18363B] hover:bg-[#2F7772] text-white text-sm font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
