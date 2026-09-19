import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Copy, MapPin } from 'lucide-react';
import { companyData } from '../data/companyData';

/* ---------- Opening hours: the schedule is the single source of truth ---------- */

const TIME_ZONE = 'Asia/Kolkata';
const TIME_ZONE_ALIASES = [TIME_ZONE, 'Asia/Calcutta'];
const CLOSING_SOON_MIN = 30; // show a countdown in the last 30 minutes before closing

interface DayHours {
  open: number; // minutes since midnight
  close: number;
}

const STANDARD_DAY: DayHours = { open: 9 * 60, close: 19 * 60 + 30 }; // 9:00 AM to 7:30 PM

/** Index = day of week (0 = Sunday … 6 = Saturday). null = closed all day. */
const SCHEDULE: (DayHours | null)[] = [
  null, // Sunday
  STANDARD_DAY, // Monday
  STANDARD_DAY,
  STANDARD_DAY,
  STANDARD_DAY,
  STANDARD_DAY,
  STANDARD_DAY, // Saturday
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // display Monday first
const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function formatTime(min: number): string {
  const h24 = Math.floor(min / 60);
  const m = min % 60;
  const h12 = h24 % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${h24 >= 12 ? 'PM' : 'AM'}`;
}

const sameHours = (a: DayHours | null, b: DayHours | null): boolean =>
  a === b || (!!a && !!b && a.open === b.open && a.close === b.close);

interface HoursRow {
  label: string;
  value: string;
  days: number[];
}

/** Collapses consecutive days with identical hours, e.g. "Monday to Saturday". */
function buildHoursRows(): HoursRow[] {
  const groups: { days: number[]; hours: DayHours | null }[] = [];
  for (const day of WEEK_ORDER) {
    const hours = SCHEDULE[day];
    const last = groups[groups.length - 1];
    if (last && sameHours(last.hours, hours)) last.days.push(day);
    else groups.push({ days: [day], hours });
  }
  return groups.map(({ days, hours }) => {
    const first = DAY_NAMES[days[0]];
    const last = DAY_NAMES[days[days.length - 1]];
    const label = days.length === 1 ? first : days.length === 2 ? `${first} and ${last}` : `${first} to ${last}`;
    const value = hours ? `${formatTime(hours.open)} to ${formatTime(hours.close)}` : 'Closed';
    return { label, value, days };
  });
}

const HOURS_ROWS = buildHoursRows();

/* ---------- Live status ---------- */

type StatusKind = 'open' | 'closing' | 'closed';

interface OfficeStatus {
  day: number;
  kind: StatusKind;
  label: string;
  detail: string;
  /** Milliseconds until the text next needs to change. */
  nextChangeMs: number;
}

/** Current day and time at the office (India time), whatever the visitor's timezone. */
function getOfficeNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return {
    day: WEEKDAYS[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    seconds: Number(get('second')),
  };
}

function getStatus(): OfficeStatus {
  const { day, minutes, seconds } = getOfficeNow();
  const today = SCHEDULE[day];
  /** ms from now until the given minute-of-day today (at least 1s, so a timer never spins). */
  const msUntil = (targetMin: number) => Math.max((targetMin * 60 - (minutes * 60 + seconds)) * 1000, 1000);

  if (today && minutes >= today.open && minutes < today.close) {
    const left = today.close - minutes;
    if (left <= CLOSING_SOON_MIN) {
      return {
        day,
        kind: 'closing',
        label: 'Closing soon',
        detail: `Closes in ${left} ${left === 1 ? 'minute' : 'minutes'}, at ${formatTime(today.close)}`,
        nextChangeMs: msUntil(minutes + 1),
      };
    }
    return {
      day,
      kind: 'open',
      label: 'Open now',
      detail: `Closes at ${formatTime(today.close)}`,
      nextChangeMs: msUntil(today.close - CLOSING_SOON_MIN),
    };
  }

  const label = today ? 'Closed' : 'Closed today';

  if (today && minutes < today.open) {
    return {
      day,
      kind: 'closed',
      label,
      detail: `Opens today at ${formatTime(today.open)}`,
      nextChangeMs: msUntil(today.open),
    };
  }

  // After closing, or a closed day: find the next open day. Wording changes at midnight.
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const hours = SCHEDULE[d];
    if (hours) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[d];
      return {
        day,
        kind: 'closed',
        label,
        detail: `Opens ${when} at ${formatTime(hours.open)}`,
        nextChangeMs: msUntil(24 * 60),
      };
    }
  }
  return { day, kind: 'closed', label, detail: 'Hours are not available right now', nextChangeMs: msUntil(24 * 60) };
}

const DOT_COLOR: Record<StatusKind, string> = {
  open: 'bg-[#2F7772]',
  closing: 'bg-[#B45309]',
  closed: 'bg-[#9AA5A7]',
};

/**
 * null until mounted, so server and client markup match and the status is never stale-rendered.
 * Updates are scheduled for the next moment the text actually changes, not polled.
 */
function useOfficeStatus() {
  const [status, setStatus] = useState<OfficeStatus | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      if (timer) clearTimeout(timer);
      const next = getStatus();
      setStatus(next);
      timer = setTimeout(tick, next.nextChangeMs);
    };
    tick();
    // Timers are throttled in background tabs, so refresh as soon as the tab is visible again.
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return status;
}

/** True when the visitor is not in India time, so we can label the hours as IST. */
function useIsOutsideOfficeTimeZone() {
  const [outside, setOutside] = useState(false);
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setOutside(Boolean(tz) && !TIME_ZONE_ALIASES.includes(tz));
    } catch {
      /* leave as false */
    }
  }, []);
  return outside;
}

/* ---------- Clipboard ---------- */

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
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

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7772] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F2]';

interface CopyButtonProps {
  text: string;
  label: string;
  announce: string;
  variant?: 'text' | 'outline';
}

/** Copies `text`, confirms visually, and announces the result to screen readers. */
const CopyButton: React.FC<CopyButtonProps> = ({ text, label, announce, variant = 'text' }) => {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    const ok = await copyText(text);
    if (timer.current) clearTimeout(timer.current);
    setState(ok ? 'copied' : 'failed');
    timer.current = setTimeout(() => setState('idle'), 2000);
  }, [text]);

  const styles =
    variant === 'outline'
      ? 'h-14 px-8 rounded-lg border border-[rgba(24,54,59,0.25)] text-base font-semibold text-[#18363B] hover:border-[#2F7772] hover:text-[#2F7772]'
      : 'min-h-[44px] -ml-2 px-2 rounded-md text-sm font-medium text-[#18363B] hover:text-[#2F7772]';

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center justify-center gap-2 transition-colors duration-150 motion-reduce:transition-none ${styles} ${focusRing}`}
      >
        {state === 'copied' ? (
          <Check className="w-4 h-4 text-[#2F7772]" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed, try again' : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied' ? announce : state === 'failed' ? 'Could not copy to clipboard' : ''}
      </span>
    </>
  );
};

const formatCoord = (value: number, positive: string, negative: string) =>
  `${Math.abs(value).toFixed(6)}° ${value >= 0 ? positive : negative}`;

/* ---------- Component ---------- */

export const LocationSection: React.FC = () => {
  const { latitude, longitude, mapsEmbedUrl } = companyData.location;

  const status = useOfficeStatus();
  const outsideOfficeTz = useIsOutsideOfficeTimeZone();

  // Embedded maps trap scrolling (especially on phones), so the map stays inert until the visitor opts in.
  const [mapActive, setMapActive] = useState(false);

  // If the embed hasn't loaded 10s after it scrolls into view, offer a link that doesn't depend on it.
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapSlow, setMapSlow] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el || mapLoaded) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      timer = setTimeout(() => setMapSlow(true), 10_000);
    };
    if (typeof IntersectionObserver === 'undefined') {
      start();
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        start();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [mapLoaded]);

  const showMapFallback = mapSlow && !mapLoaded;

  const coordsLabel = `${formatCoord(latitude, 'N', 'S')}, ${formatCoord(longitude, 'E', 'W')}`;
  const coordsForCopy = `${latitude}, ${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const viewUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="py-20 sm:py-28 bg-[#F7F6F2]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/*
          Mobile order: heading, address and actions, map, hours.
          Desktop: text on the left, a portrait map on the right with room to breathe.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_1fr] gap-x-8 gap-y-10 lg:gap-y-14">
          {/* Heading, address, actions */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <h2
              id="location-heading"
              className="text-4xl sm:text-5xl font-bold text-[#18363B] leading-[1.05] tracking-tight"
            >
              <span className="block">Visit our</span>
              <span className="block">head office</span>
            </h2>

            <div className="mt-8">
              <h3 className="text-base font-semibold text-[#18363B]">{companyData.companyName}</h3>
              <address className="mt-2 not-italic text-lg sm:text-xl text-[#4A5A5E] leading-snug max-w-md">
                {companyData.address}
              </address>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-[#18363B] text-white text-base font-semibold hover:bg-[#2F7772] transition-colors duration-150 motion-reduce:transition-none ${focusRing}`}
              >
                Get directions
                <ArrowUpRight
                  className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
                  aria-hidden="true"
                />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <CopyButton
                variant="outline"
                text={companyData.address}
                label="Copy address"
                announce="Address copied to clipboard"
              />
            </div>
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className="relative overflow-hidden rounded-2xl bg-[#E9E8E3] h-[300px] sm:h-[380px] lg:h-auto lg:aspect-[4/5] lg:self-start lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1"
          >
            {/* Shows behind the iframe until the map has loaded */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-[#4A5A5E]"
            >
              <MapPin className="w-5 h-5" />
              {showMapFallback ? 'The map is taking a while to load.' : 'Loading map…'}
            </div>

            <iframe
              title={`Map showing the ${companyData.companyName} head office in Dindigul`}
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="relative w-full h-full"
            />

            {/* Pointer-only guard. Keyboard users can still reach the map directly. */}
            {!mapActive && (
              <div
                aria-hidden="true"
                onPointerDown={() => setMapActive(true)}
                className="absolute inset-0 z-10 flex cursor-pointer items-end p-4"
              >
                {!showMapFallback && (
                  <span className="pointer-events-none rounded-full bg-white/95 px-3.5 py-2 text-sm font-medium text-[#18363B] shadow-sm">
                    Tap or click to explore the map
                  </span>
                )}
              </div>
            )}

            {mapActive && (
              <button
                type="button"
                onClick={() => setMapActive(false)}
                className={`absolute top-3 left-1/2 z-10 -translate-x-1/2 min-h-[44px] rounded-full bg-white px-4 text-sm font-medium text-[#18363B] shadow-sm hover:text-[#2F7772] transition-colors duration-150 motion-reduce:transition-none ${focusRing}`}
              >
                Done with map
              </button>
            )}

            {showMapFallback && (
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute bottom-4 left-4 z-20 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-[#18363B] shadow-sm hover:text-[#2F7772] ${focusRing}`}
              >
                Open in Google Maps
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>

          {/* Hours, then GPS tucked away */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
            <div className="max-w-md rounded-2xl bg-white p-6 sm:p-7 ring-1 ring-[rgba(24,54,59,0.06)]">
              <h3 className="text-base font-semibold text-[#18363B]">Opening hours</h3>

              {/* Reserve the space so the layout doesn't shift when the status appears */}
              <div className="mt-4 min-h-[3.25rem]">
                {status && (
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-[0.6rem] h-2.5 w-2.5 rounded-full shrink-0 ${DOT_COLOR[status.kind]}`}
                    />
                    <div>
                      <p className="text-lg font-semibold leading-snug text-[#18363B]">{status.label}</p>
                      <p className="text-[15px] leading-snug text-[#4A5A5E]">{status.detail}</p>
                    </div>
                  </div>
                )}
              </div>

              <dl className="mt-5 space-y-2.5 text-[15px]">
                {HOURS_ROWS.map((row) => {
                  const isToday = status ? row.days.includes(status.day) : false;
                  const tone = isToday ? 'font-semibold text-[#18363B]' : 'text-[#4A5A5E]';
                  return (
                    <div key={row.label} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
                      <dt className={`flex items-baseline gap-2 ${tone}`}>
                        {row.label}
                        {isToday && <span className="text-xs font-medium text-[#2F7772]">Today</span>}
                      </dt>
                      <dd className={tone}>{row.value}</dd>
                    </div>
                  );
                })}
              </dl>

              {outsideOfficeTz && (
                <p className="mt-4 text-sm text-[#4A5A5E]">All times are India Standard Time.</p>
              )}
            </div>

            <details className="group mt-6 max-w-md">
              <summary
                className={`flex w-fit cursor-pointer list-none items-center gap-1.5 min-h-[44px] rounded-md text-sm font-medium text-[#4A5A5E] hover:text-[#18363B] [&::-webkit-details-marker]:hidden ${focusRing}`}
              >
                GPS coordinates
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-2">
                <p className="font-mono text-[14px] text-[#4A5A5E] leading-relaxed">{coordsLabel}</p>
                <CopyButton
                  text={coordsForCopy}
                  label="Copy coordinates"
                  announce="Coordinates copied to clipboard"
                />
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};