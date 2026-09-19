import React from 'react';
import { companyData } from '../data/companyData';

export const AboutSection: React.FC = () => {
  const commitments = [
    {
      title: "Statutory Rigor",
      description: "Full public accountability across tax, industrial, and food safety registrations."
    },
    {
      title: "Process Standards",
      description: "Operating workflows adhering strictly to ISO quality management benchmarks."
    },
    {
      title: "Regional Roots",
      description: "Long-standing investment in sustainable employment and vendor partnerships in Dindigul."
    },
    {
      title: "Direct Coordination",
      description: "Centralized communications and client support from our Old Karur Road headquarters."
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-[rgba(24,54,59,0.08)] bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Large Section Heading */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#687477] uppercase">
              About The Enterprise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18363B] leading-tight tracking-tight">
              A regional enterprise anchored in governance and discipline.
            </h2>
            <p className="text-sm text-[#687477] pt-2">
              Central Office · Old Karur Road, N S Nagar, Dindigul, Tamil Nadu 624001
            </p>
          </div>

          {/* Right: Editorial Narrative & Commitments */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-[#687477] leading-relaxed">
              <p>
                Headquartered on Old Karur Road in Dindigul, Agnus Group operates with ISO-benchmarked quality systems and statutory governance, serving partners and communities across Tamil Nadu with centralized commercial and distribution services.
              </p>
              <p className="text-sm text-[#687477]">
                We maintain active certifications with the Ministry of MSME, the Goods & Services Tax Network, the Food Safety & Standards Authority of India, and accredited ISO quality assurance bodies.
              </p>
            </div>

            {/* Commitments: Clean Editorial List with Dividers, Not Card Boxes */}
            <div className="pt-6 border-t border-[rgba(24,54,59,0.08)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {commitments.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="font-semibold text-sm text-[#18363B]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#687477] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
