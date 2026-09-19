import React from 'react';
import { companyData, teamDepartments } from '../data/companyData';

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-20 sm:py-28 border-t border-[rgba(24,54,59,0.08)] bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold tracking-wider text-[#687477] uppercase">
            Leadership & Organization
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#18363B] tracking-tight mt-2">
            Guided by experience, powered by dedicated teams.
          </h2>
          <p className="text-sm text-[#687477] mt-3 leading-relaxed">
            Executive oversight and coordinated departmental leadership based out of our Dindigul central office.
          </p>
        </div>

        {/* Senior Manager Profile — Large Portrait, Clean Profile, Minimal Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center pb-16 border-b border-[rgba(24,54,59,0.08)]">
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="w-full max-w-[280px] rounded-[16px] overflow-hidden bg-[#F1F1EE]">
              <img
                src={companyData.assets.management.seniorManagerAnjaliNayar}
                alt="Anjali Nayar - Senior Manager"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/5] object-cover object-top"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <p className="text-xs font-semibold text-[#2F7772] uppercase tracking-wider">
              Management
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#18363B]">
              Anjali Nayar
            </h3>
            <p className="text-sm font-medium text-[#687477]">
              Senior Manager · AGNUS GROUP OF COMPANY ENTERPRISES
            </p>
            <p className="text-sm sm:text-base text-[#687477] leading-relaxed pt-2 max-w-xl">
              Directs corporate operations, statutory governance, and quality management at Agnus Group. Responsible for standard operating procedures, ISO adherence, and seamless coordination across departmental teams.
            </p>
          </div>
        </div>

        {/* Operational Teams */}
        <div className="pt-14">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#18363B]">
              Operational Departments
            </h3>
            <p className="text-xs text-[#687477] mt-1">
              Our people and collaborative teams across departments, pictured during key corporate milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamDepartments.map((dept) => (
              <div key={dept.id} className="space-y-3">
                <div className="rounded-[14px] overflow-hidden bg-[#F1F1EE]">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-[#18363B]">
                    {dept.name}
                  </h4>
                  <p className="text-xs text-[#687477] mt-1 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
