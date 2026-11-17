import {MapPin, Maximize2, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {LOCATION_ACCESS} from '../data/harmoniaData';
import {InteractiveOfficeMap} from './InteractiveOfficeMap';

interface LocationSiteplanGalleryProps {
  quotaExceeded: boolean;
}

export function LocationSiteplanGallery({quotaExceeded}: LocationSiteplanGalleryProps) {
  const [mapView, setMapView] = useState<'siteplan' | 'location'>('siteplan');
  const [lightbox, setLightbox] = useState<{src: string; title: string; caption?: string} | null>(
    null,
  );

  return (
    <section
      id="lokasi"
      className="border-b border-slate-200/80 bg-white py-14 sm:py-20 dark:border-emerald-950/80 dark:bg-[#0B1A16]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#C49328] uppercase">
              04 · Lokasi Strategis, Siteplan &amp; Peta Kantor
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-slate-900 sm:text-3xl dark:text-white">
              Kawasan Ring 1 Kampus IPB Dramaga &amp; Lokasi Kantor Pemasaran
            </h2>
          </div>

          <div className="flex rounded-xl border border-slate-200 bg-[#F7F8F6] p-1 dark:border-emerald-900 dark:bg-[#0E201B]">
            <button
              type="button"
              onClick={() => setMapView('siteplan')}
              className={`min-h-[38px] rounded-lg px-3.5 text-xs font-semibold transition-colors ${
                mapView === 'siteplan'
                  ? 'bg-[#0E3B2E] text-white dark:bg-[#C49328] dark:text-[#071310]'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Official Siteplan
            </button>
            <button
              type="button"
              onClick={() => setMapView('location')}
              className={`min-h-[38px] rounded-lg px-3.5 text-xs font-semibold transition-colors ${
                mapView === 'location'
                  ? 'bg-[#0E3B2E] text-white dark:bg-[#C49328] dark:text-[#071310]'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Peta Akses IPB
            </button>
          </div>
        </div>

        {/* Siteplan / Location Map + Access Times */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
          className="mt-8 grid items-stretch gap-8 lg:grid-cols-12"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-[#F7F8F6] p-3 lg:col-span-7 dark:border-emerald-900/80 dark:bg-[#0E201B]">
            <button
              type="button"
              onClick={() =>
                setLightbox({
                  src:
                    mapView === 'siteplan'
                      ? '/assets/harmonia/webp/siteplan-official.webp'
                      : '/assets/harmonia/webp/location-map.webp',
                  title:
                    mapView === 'siteplan'
                      ? 'Official Siteplan Harmonia Student House Bogor'
                      : 'Peta Lokasi Strategis Ring 1 IPB Dramaga',
                })
              }
              aria-label="Perbesar peta atau siteplan"
              className="absolute top-5 right-5 z-10 flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white dark:bg-[#071310]/90 dark:text-slate-100"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={mapView}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
                className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-white"
              >
                <img
                  src={
                    mapView === 'siteplan'
                      ? '/assets/harmonia/webp/siteplan-official.webp'
                      : '/assets/harmonia/webp/location-map.webp'
                  }
                  alt={
                    mapView === 'siteplan'
                      ? 'Official Siteplan Harmonia Student House Bogor'
                      : 'Peta Lokasi Ring 1 IPB Dramaga'
                  }
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Siteplan Unit Composition Summary */}
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-emerald-900/80 dark:bg-[#071310]">
                <div className="font-mono-tabular text-base font-bold text-slate-900 dark:text-white">
                  18 Unit
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Apartkost 4 Kamar</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-emerald-900/80 dark:bg-[#071310]">
                <div className="font-mono-tabular text-base font-bold text-slate-900 dark:text-white">
                  5 Unit
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Rukost 5 Kamar</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-emerald-900/80 dark:bg-[#071310]">
                <div className="font-mono-tabular text-base font-bold text-slate-900 dark:text-white">
                  6 Unit
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Rukost 9 Kamar</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-emerald-900/80 dark:bg-[#071310]">
                <div className="font-mono-tabular text-base font-bold text-slate-900 dark:text-white">
                  4 Unit
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Ruko Harmonia</div>
              </div>
            </div>
          </div>

          {/* Access Distance List */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#F7F8F6] p-5 sm:p-7 lg:col-span-5 dark:border-emerald-900/80 dark:bg-[#0E201B]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0E3B2E] uppercase dark:text-[#E2B34B]">
                <MapPin className="h-4 w-4" />
                <span>Aksesibilitas Kawasan</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">
                Dekat Pusat Pendidikan &amp; Fasilitas Harian
              </h3>

              <div className="mt-6 divide-y divide-slate-200/80 dark:divide-emerald-950">
                {LOCATION_ACCESS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.note}</div>
                    </div>
                    <div className="font-mono-tabular shrink-0 text-sm font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 border-t border-slate-200/80 pt-4 text-xs leading-relaxed text-slate-600 dark:border-emerald-950 dark:text-slate-300">
              Permintaan hunian mahasiswa di sekitar Kampus IPB Dramaga terus meningkat setiap tahun,
              menjadikan Harmonia pilihan rasional untuk investasi jangka panjang.
            </p>
          </div>
        </motion.div>

        <InteractiveOfficeMap quotaExceeded={quotaExceeded} />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white p-4 dark:bg-[#0E201B]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {lightbox.title}
                  </h4>
                  {lightbox.caption && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{lightbox.caption}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Tutup galeri"
                  className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-slate-200 text-slate-700 dark:border-emerald-900 dark:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex max-h-[75vh] items-center justify-center overflow-auto">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[73vh] w-auto rounded-xl object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
