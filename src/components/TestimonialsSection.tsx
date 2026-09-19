import React, { useCallback, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { clientTestimonials } from '../data/companyData';

/** Strip quote marks baked into the data; the design supplies its own. */
const cleanQuote = (quote: string) => quote.replace(/^[\s“"']+|[\s”"']+$/g, '');

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const preview = (quote: string, max = 72) => {
  const q = cleanQuote(quote);
  return q.length > max ? `${q.slice(0, max).trimEnd()}…` : q;
};

/** Scale the type to the quote so short ones feel bold and long ones stay readable. */
const quoteSize = (len: number) =>
  len <= 140
    ? 'text-3xl sm:text-4xl lg:text-[2.6rem]'
    : len <= 260
      ? 'text-2xl sm:text-3xl lg:text-[2rem]'
      : 'text-xl sm:text-2xl';

export const TestimonialsSection: React.FC = () => {
  const total = clientTestimonials.length;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const go = useCallback(
    (index: number, focus = false) => {
      const next = (index + total) % total;
      setActive(next);
      if (focus) tabRefs.current[next]?.focus();
    },
    [total],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        go(active + 1, true);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        go(active - 1, true);
        break;
      case 'Home':
        e.preventDefault();
        go(0, true);
        break;
      case 'End':
        e.preventDefault();
        go(total - 1, true);
        break;
    }
  };

  if (total === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-[#18363B] text-[#F7F6F2] py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <div className="max-w-2xl">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight"
          >
            What our clients say
          </h2>
          <p className="mt-4 text-base text-[#A9BBBD] leading-relaxed">
            Feedback from clients and commercial partners across South India who rely on our
            products and service.
          </p>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Stage: the active quote */}
          <div className="lg:col-span-7">
            <span
              aria-hidden="true"
              className="block font-serif text-8xl sm:text-9xl leading-[0.6] h-12 sm:h-16 text-[#6FBDB5] select-none"
            >
              “
            </span>

            {/* All quotes share one grid cell, so the stage is always as tall as the
                longest quote and nothing jumps when you switch. */}
            <div className="mt-6 grid">
              {clientTestimonials.map((item, i) => {
                const isActive = i === active;
                const text = cleanQuote(item.quote);
                return (
                  <figure
                    key={item.id}
                    id={`testimonial-panel-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`testimonial-tab-${item.id}`}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
                      isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                  >
                    <blockquote>
                      <p
                        className={`${quoteSize(text.length)} font-medium leading-[1.25] tracking-tight text-pretty`}
                      >
                        {text}
                      </p>
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      <span aria-hidden="true" className="h-px w-10 bg-[#6FBDB5]" />
                      <span className="text-base font-semibold">{item.name}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            {total > 1 && (
              <div className="mt-10 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous testimonial"
                  className="h-11 w-11 rounded-full border border-[rgba(247,246,242,0.25)] flex items-center justify-center hover:bg-[#F7F6F2] hover:text-[#18363B] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBDB5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18363B]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next testimonial"
                  className="h-11 w-11 rounded-full border border-[rgba(247,246,242,0.25)] flex items-center justify-center hover:bg-[#F7F6F2] hover:text-[#18363B] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBDB5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18363B]"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <span className="ml-1 text-sm text-[#A9BBBD] tabular-nums" aria-hidden="true">
                  {active + 1} / {total}
                </span>
              </div>
            )}
          </div>

          {/* Index: who said it */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Client testimonials"
            onKeyDown={onKeyDown}
            className="lg:col-span-5 border-l border-[rgba(247,246,242,0.15)]"
          >
            {clientTestimonials.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  id={`testimonial-tab-${item.id}`}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`testimonial-panel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group relative -ml-px w-full flex items-center gap-4 pl-5 pr-2 py-4 text-left border-l-2 transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:bg-[rgba(247,246,242,0.06)] ${
                    isActive
                      ? 'border-[#6FBDB5]'
                      : 'border-transparent hover:border-[rgba(247,246,242,0.35)]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold tracking-wide transition-colors duration-200 motion-reduce:transition-none ${
                      isActive
                        ? 'bg-[#6FBDB5] text-[#18363B]'
                        : 'bg-[rgba(247,246,242,0.08)] text-[#A9BBBD] group-hover:text-[#F7F6F2]'
                    }`}
                  >
                    {initials(item.name)}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[15px] font-semibold leading-snug transition-colors duration-200 motion-reduce:transition-none ${
                        isActive ? 'text-[#F7F6F2]' : 'text-[#C9D5D6] group-hover:text-[#F7F6F2]'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="block truncate text-sm text-[#A9BBBD] leading-snug mt-0.5">
                      {preview(item.quote)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};