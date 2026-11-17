import {ArrowRight, ChevronLeft, ChevronRight, Download, MessageCircle, Smartphone} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {BOOKLET_PDF_PATH, buildWhatsAppUrl, HERO_STORIES} from '../data/harmoniaData';

interface HeroSectionProps {
  onScrollToForm: (unitLabel?: string) => void;
  smartphoneFrameMode: boolean;
  onToggleSmartphoneFrameMode: () => void;
}

export function HeroSection({
  onScrollToForm,
  smartphoneFrameMode,
  onToggleSmartphoneFrameMode,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStory = HERO_STORIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_STORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_STORIES.length) % HERO_STORIES.length);
  };

  return (
    <section
      id="beranda"
      className="relative overflow-hidden border-b border-slate-200/80 bg-[#F7F8F6] dark:border-emerald-950/80 dark:bg-[#071310]"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-12 lg:px-10 lg:py-16">
        <div
          className={`grid items-center gap-8 lg:gap-12 ${
            smartphoneFrameMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'
          }`}
        >
          {/* Left Column (Desktop Copy & Market Proof; hidden below 9:16 hero on mobile via order) */}
          <div
            className={`order-2 flex flex-col justify-center ${
              smartphoneFrameMode ? 'hidden' : 'md:order-1 md:col-span-7 lg:col-span-7'
            }`}
          >
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#0E3B2E] dark:text-[#E2B34B]">
              <span>Harmonia Student House</span>
              <span aria-hidden="true">·</span>
              <span>Dramaga, Bogor</span>
              <span aria-hidden="true">·</span>
              <span>Isykariman Property Syariah</span>
            </div>

            <h1 className="font-display text-[clamp(2.15rem,4.3vw,3.65rem)] leading-[1.08] font-extrabold tracking-tight text-balance text-slate-900 dark:text-white">
              Investasi Properti, Bangun Potensi Masa Depan
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              Miliki aset investasi kost modern berkonsep{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                Tropical Contemporary
              </span>{' '}
              di kawasan Ring 1 Kampus IPB Dramaga. Legalitas SHM, akad sesuai prinsip syariah,
              serta didukung tim manajemen okupansi berpengalaman sejak 2021.
            </p>

            {/* Primary & Secondary Call-To-Action */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => onScrollToForm('Type Salak - Rukost 9 Kamar')}
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0E3B2E] px-6 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-all duration-200 hover:bg-[#14503F] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49328] dark:bg-[#C49328] dark:text-[#071310] dark:hover:bg-[#E2B34B]"
              >
                <span>Ajukan Pendaftaran Unit</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={buildWhatsAppUrl(
                  'Assalamualaikum Admin Harmonia Student House, saya tertarik konsultasi mengenai investasi kost di Ring 1 IPB Dramaga.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold whitespace-nowrap text-slate-800 transition-colors duration-200 hover:border-[#0E3B2E] hover:text-[#0E3B2E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49328] dark:border-emerald-900 dark:bg-[#0E201B] dark:text-slate-100 dark:hover:border-[#E2B34B]"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Konsultasi WhatsApp</span>
              </a>

              <a
                href={BOOKLET_PDF_PATH}
                download="Booklet-Harmonia-Student-House-Bogor.pdf"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium whitespace-nowrap text-slate-600 underline-offset-4 transition-colors hover:text-[#0E3B2E] hover:underline dark:text-slate-300 dark:hover:text-[#E2B34B]"
              >
                <Download className="h-4 w-4" />
                <span>Unduh Booklet PDF</span>
              </a>
            </div>

            {/* Quantified Market Metrics Strip */}
            <div className="mt-9 grid grid-cols-2 gap-4 border-t border-slate-200/90 pt-6 sm:grid-cols-4 dark:border-emerald-950">
              <div>
                <div className="font-mono-tabular text-2xl font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                  3.600+
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-400">
                  Mahasiswa Baru IPB / Tahun
                </div>
              </div>
              <div>
                <div className="font-mono-tabular text-2xl font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                  38.000+
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-400">
                  Mahasiswa Aktif IPB Bogor
                </div>
              </div>
              <div>
                <div className="font-mono-tabular text-2xl font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                  ± 4 Mnt
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-400">
                  Akses ke Kampus IPB (1,4 km)
                </div>
              </div>
              <div>
                <div className="font-mono-tabular text-2xl font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                  17,17%
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-400">
                  Proyeksi ROI + Capital Gain
                </div>
              </div>
            </div>
          </div>

          {/* Right Column / Mobile Hero: Native 9:16 Smartphone Story Frame */}
          <div
            className={`order-1 flex flex-col items-center ${
              smartphoneFrameMode ? 'mx-auto w-full max-w-[420px]' : 'md:order-2 md:col-span-5 lg:col-span-5'
            }`}
          >
            <div className="relative aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-3xl border border-slate-200 bg-[#0A221B] shadow-xl dark:border-emerald-900">
              {/* Top Story Progress Bars */}
              <div className="absolute inset-x-4 top-4 z-20 flex gap-1.5">
                {HERO_STORIES.map((story, idx) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Lihat sorotan ${story.title}`}
                    className="group flex h-6 flex-1 items-center py-2 focus-visible:outline-none"
                  >
                    <span
                      className={`block h-1 w-full rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? 'bg-[#E2B34B]'
                          : idx < activeIndex
                            ? 'bg-white/75'
                            : 'bg-white/30 group-hover:bg-white/55'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Animated Story Media */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory.id}
                  initial={{opacity: 0, scale: 1.03}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                  className="absolute inset-0"
                >
                  <img
                    src={currentStory.image}
                    alt={`${currentStory.title} — ${currentStory.subtitle}`}
                    fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Measured Scrim for 4.5:1+ Legibility */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05140F] via-[#05140F]/45 to-[#05140F]/25"
              />

              {/* Prev / Next Navigation Buttons */}
              <div className="absolute inset-x-3 top-1/2 z-20 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Slide sebelumnya"
                  className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Slide berikutnya"
                  className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Bottom Overlay Content inside 9:16 Frame */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
                <p className="text-xs font-semibold tracking-wider text-[#E2B34B] uppercase">
                  {currentStory.title}
                </p>
                <p className="mt-1 font-display text-xl leading-snug font-bold text-white sm:text-2xl">
                  {currentStory.subtitle}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-200">
                  SHM · Full Furnish · Akad Syariah Tanpa Riba &amp; Tanpa KPR Bank
                </p>

                <div className="mt-4 flex gap-2.5 md:hidden">
                  <button
                    type="button"
                    onClick={() => onScrollToForm()}
                    className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#C49328] px-4 text-xs font-bold whitespace-nowrap text-[#071310] transition-transform active:scale-[0.98]"
                  >
                    <span>Daftar Unit</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href={buildWhatsAppUrl(
                      'Assalamualaikum Admin Harmonia Student House, saya ingin konsultasi unit kost Ring 1 IPB.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-4 text-xs font-semibold whitespace-nowrap text-white backdrop-blur-sm"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Smartphone 9:16 Mode Switcher */}
            <div className="mt-3 hidden items-center justify-center md:flex">
              <button
                type="button"
                onClick={onToggleSmartphoneFrameMode}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-emerald-950 dark:hover:text-slate-200"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>
                  {smartphoneFrameMode
                    ? 'Kembalikan ke Tata Letak Desktop Penuh'
                    : 'Fokus Pratinjau Layar 9:16'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
