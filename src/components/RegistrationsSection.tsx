import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { corporateRegistrations } from '../data/companyData';

/** Clipboard write with a fallback for non-secure contexts / older browsers. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

type CopyState = { id: string; status: 'copied' | 'failed' } | null;

export const RegistrationsSection: React.FC = () => {
  const [copyState, setCopyState] = useState<CopyState>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending reset on unmount, and before starting a new one.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleCopy = useCallback(async (code: string, id: string) => {
    const ok = await copyText(code);
    if (timer.current) clearTimeout(timer.current);
    setCopyState({ id, status: ok ? 'copied' : 'failed' });
    timer.current = setTimeout(() => setCopyState(null), 2000);
  }, []);

  const announcement = (() => {
    if (!copyState) return '';
    const item = corporateRegistrations.find((r) => r.id === copyState.id);
    if (!item) return '';
    return copyState.status === 'copied'
      ? `${item.title} copied to clipboard`
      : `Couldn't copy ${item.title}. Select the number and copy it manually.`;
  })();

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="py-20 sm:py-28 border-t border-[rgba(24,54,59,0.08)] bg-[#F7F6F2]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: heading + context (stays in view while scrolling the list on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <h2
              id="credentials-heading"
              className="text-3xl sm:text-4xl font-bold text-[#18363B] leading-tight tracking-tight"
            >
              Official registrations and certifications
            </h2>
            <p className="text-base text-[#4A5A5E] leading-relaxed max-w-md">
              Agnus Group is registered under Indian state and central law. Each number below can be
              checked with the authority that issued it.
            </p>
            <p className="text-sm text-[#687477] leading-relaxed">
              Tap a number to copy it.
            </p>
          </div>

          {/* Right: ledger */}
          <ul className="lg:col-span-7 divide-y divide-[rgba(24,54,59,0.1)] border-y border-[rgba(24,54,59,0.1)]">
            {corporateRegistrations.map((item) => {
              const isCopied = copyState?.id === item.id && copyState.status === 'copied';
              const isFailed = copyState?.id === item.id && copyState.status === 'failed';

              return (
                <li
                  key={item.id}
                  id={`registration-item-${item.id}`}
                  className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8"
                >
                  {/* Text */}
                  <div className="min-w-0 space-y-1.5 sm:max-w-[22rem]">
                    <h3 className="text-lg font-semibold text-[#18363B] leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-[#4A5A5E] leading-snug">
                      {item.authority}
                    </p>
                    {item.description && (
                      <p className="text-sm text-[#687477] leading-relaxed">{item.description}</p>
                    )}
                  </div>

                  {/* One control: number + copy action, visually split but a single tap target */}
                  <button
                    id={`copy-credential-${item.id}`}
                    type="button"
                    onClick={() => handleCopy(item.code, item.id)}
                    aria-label={`Copy ${item.title}: ${item.code}`}
                    className={`group shrink-0 w-full sm:w-auto min-h-[44px] inline-flex items-stretch overflow-hidden rounded-lg border bg-white text-left
                      transition-colors duration-150 motion-reduce:transition-none
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7772] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F2]
                      ${isCopied ? 'border-[#18363B]' : 'border-[rgba(24,54,59,0.15)] hover:border-[#18363B]'}`}
                  >
                    <span className="flex-1 min-w-0 flex items-center px-4 py-2.5 font-mono text-[15px] font-semibold tracking-wide text-[#18363B] break-all">
                      {item.code}
                    </span>
                    <span
                      className={`flex items-center justify-center gap-1.5 min-w-[92px] px-3.5 border-l text-sm font-medium transition-colors duration-150 motion-reduce:transition-none
                        ${
                          isCopied
                            ? 'bg-[#18363B] text-white border-[#18363B]'
                            : isFailed
                              ? 'bg-[#FBEAE7] text-[#9A3324] border-[rgba(24,54,59,0.15)]'
                              : 'bg-[#F1F1EE] text-[#4A5A5E] border-[rgba(24,54,59,0.15)] group-hover:bg-[#18363B] group-hover:text-white group-hover:border-[#18363B]'
                        }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          Copied
                        </>
                      ) : isFailed ? (
                        'Copy failed'
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          Copy
                        </>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Screen-reader confirmation for copy actions */}
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
};