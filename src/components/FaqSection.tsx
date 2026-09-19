import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { faqData } from '../data/companyData';

export const FaqSection: React.FC = () => {
  // First item open by default for immediate context
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-[rgba(24,54,59,0.08)] bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Direct Contact CTA */}
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold tracking-wider text-[#687477] uppercase">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18363B] tracking-tight leading-tight">
              Everything You Need to Know
            </h2>
            <p className="text-sm sm:text-base text-[#687477] leading-relaxed">
              Find quick answers about our product offerings, delivery services, ordering process, and bulk accommodations.
            </p>

            <div className="pt-4">
              <div className="p-6 rounded-[14px] bg-white border border-[rgba(24,54,59,0.08)] space-y-3">
                <h4 className="font-semibold text-sm text-[#18363B]">
                  Have a specific inquiry?
                </h4>
                <p className="text-xs text-[#687477] leading-relaxed">
                  Our customer support team is available during working hours to assist with customized requirements or immediate orders.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#18363B] hover:text-[#2F7772] transition-colors underline underline-offset-4"
                >
                  <span>Contact our team directly</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 divide-y divide-[rgba(24,54,59,0.08)] border-y border-[rgba(24,54,59,0.08)]">
            {faqData.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  id={`faq-item-${item.id}`}
                  className="py-6 first:pt-0 last:pb-0 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-start justify-between gap-4 text-left group focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="text-xs font-semibold text-[#687477] mt-0.5 select-none shrink-0">
                        0{index + 1}
                      </span>
                      <span className="font-semibold text-base sm:text-lg text-[#18363B] group-hover:text-[#2F7772] transition-colors leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <span className="w-7 h-7 rounded-full border border-[rgba(24,54,59,0.1)] bg-white flex items-center justify-center text-[#18363B] shrink-0 mt-0.5 group-hover:border-[#2F7772] group-hover:text-[#2F7772] transition-colors">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="pt-3.5 pl-8 sm:pl-9 pr-4 text-sm sm:text-base text-[#687477] leading-relaxed animate-in fade-in duration-200"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
