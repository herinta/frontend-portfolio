import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

interface VisitorLog {
  id: number;
  city: string;
  country: string;
  device: string;
  browser: string;
  referrer: string;
  created_at: string;
}

const OWNER_STORAGE_KEY = 'portfolio_owner_ignore';
const SESSION_LOGGED_KEY = 'portfolio_visit_logged';

function parseUserAgent(ua: string): { device: string; browser: string } {
  let os = 'Desktop';
  if (/iPhone|iPad|iPod/i.test(ua)) os = 'iPhone / iOS';
  else if (/Android/i.test(ua)) os = 'Android Phone';
  else if (/Windows/i.test(ua)) os = 'Windows PC';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'MacBook / macOS';
  else if (/Linux/i.test(ua)) os = 'Linux PC';

  let browser = 'Browser';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/OPR\//i.test(ua)) browser = 'Opera';
  else if (/Chrome\//i.test(ua)) browser = 'Chrome';
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';

  return { device: os, browser };
}

export const VisitorTracker: React.FC = () => {
  const isMePage =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/me' || window.location.pathname === '/me/');

  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [ignoreThisDevice, setIgnoreThisDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(OWNER_STORAGE_KEY) === 'true';
  });

  // 1. Track visitor if on '/' and NOT on '/me'
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If accessing /me, automatically mark this browser as owner so even accidental '/' visits are ignored
    if (isMePage) {
      localStorage.setItem(OWNER_STORAGE_KEY, 'true');
      setIgnoreThisDevice(true);
      fetchVisitorLogs();
      return;
    }

    // Do not count if this browser has been marked as owner
    if (localStorage.getItem(OWNER_STORAGE_KEY) === 'true') {
      return;
    }

    // Do not count multiple refreshes in the same browser tab session
    if (sessionStorage.getItem(SESSION_LOGGED_KEY) === 'true') {
      return;
    }

    const recordVisit = async () => {
      try {
        sessionStorage.setItem(SESSION_LOGGED_KEY, 'true');

        let city = 'Unknown';
        let country = 'Indonesia';

        try {
          const geoRes = await fetch('https://ipapi.co/json/');
          if (geoRes.ok) {
            const geo = await geoRes.json();
            city = geo.city || geo.region || city;
            country = geo.country_name || country;
          }
        } catch {
          // Fallback silently if adblocker blocks lookup
        }

        const { device, browser } = parseUserAgent(navigator.userAgent);
        const referrer = document.referrer
          ? new URL(document.referrer).hostname
          : 'Direct (Ketik / Klik Langsung)';

        await supabase.from('visitor_logs').insert([
          {
            city,
            country,
            device,
            browser,
            referrer,
          },
        ]);
      } catch (err) {
        console.error('Visitor tracking error:', err);
      }
    };

    recordVisit();
  }, [isMePage]);

  const fetchVisitorLogs = async () => {
    setLoading(true);
    setDbError(null);
    try {
      const { data, error } = await supabase
        .from('visitor_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        setDbError(error.message);
      } else if (data) {
        setLogs(data as VisitorLog[]);
      }
    } catch (err: any) {
      setDbError(err?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const toggleIgnoreDevice = () => {
    const nextVal = !ignoreThisDevice;
    if (nextVal) {
      localStorage.setItem(OWNER_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(OWNER_STORAGE_KEY);
    }
    setIgnoreThisDevice(nextVal);
  };

  // Only render the dashboard UI when on `/me`
  if (!isMePage) return null;

  const uniqueCities = new Set(logs.map((l) => l.city).filter((c) => c && c !== 'Unknown')).size;

  return (
    <>
      {/* Floating Owner Trigger Pill (Only visible on /me) */}
      <div className="fixed bottom-5 right-5 z-[110] flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            fetchVisitorLogs();
          }}
          className="px-4 py-2.5 rounded-full bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-bold shadow-2xl border border-indigo-400/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Owner Mode (/me) • {logs.length} Views</span>
        </button>
      </div>

      {/* Owner Visitor Analytics Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsOpen(false)}
          data-lenis-prevent="true"
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] rounded-3xl bg-white text-slate-800 shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    /me OWNER DASHBOARD
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold">
                    Portfolio Visitor Tracker
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Memantau kunjungan HRD / orang lain yang membuka halaman utama (/)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchVisitorLogs}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer transition-colors"
                >
                  ↻ Refresh
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold cursor-pointer transition-colors"
                >
                  Tutup ✕
                </button>
              </div>
            </div>

            {/* Summary Bar */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Kunjungan (/)
                </span>
                <span className="text-2xl font-black text-indigo-950">{logs.length}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Kota Terdeteksi
                </span>
                <span className="text-2xl font-black text-emerald-700">{uniqueCities}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Proteksi Browser Ini
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {ignoreThisDevice
                      ? 'Aktif (Buka / tidak dihitung)'
                      : 'Nonaktif (Ikut dihitung)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleIgnoreDevice}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    ignoreThisDevice
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {ignoreThisDevice ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Body / Table */}
            <div className="flex-1 overflow-y-auto p-5">
              {dbError ? (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3 text-xs">
                  <p className="font-bold text-sm">
                    ⚠️ Tabel `visitor_logs` belum dibuat di Supabase kamu.
                  </p>
                  <p>
                    Jalankan SQL berikut sekali saja di menu <strong>SQL Editor</strong> pada dashboard Supabase kamu:
                  </p>
                  <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto select-all">
{`create table if not exists public.visitor_logs (
  id bigint generated by default as identity primary key,
  ip_address text,
  city text,
  country text,
  device text,
  browser text,
  referrer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.visitor_logs enable row level security;

create policy "Allow public insert" on public.visitor_logs
  for insert with check (true);

create policy "Allow public select" on public.visitor_logs
  for select using (true);`}
                  </pre>
                </div>
              ) : loading ? (
                <p className="text-center py-12 text-sm text-slate-500">
                  Memuat riwayat pengunjung...
                </p>
              ) : logs.length === 0 ? (
                <p className="text-center py-12 text-sm text-slate-500">
                  Belum ada data kunjungan di `/`.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-mono border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Waktu (WIB)</th>
                        <th className="py-3 px-4">Lokasi (Kota)</th>
                        <th className="py-3 px-4">Perangkat &amp; Browser</th>
                        <th className="py-3 px-4">Sumber Masuk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                            {new Date(log.created_at).toLocaleString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            <span className="font-bold text-indigo-950">{log.city}</span>,{' '}
                            <span className="text-slate-500">{log.country}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                              {log.device}
                            </span>{' '}
                            <span className="text-slate-500">• {log.browser}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{log.referrer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
