import {ArrowRight, ArrowUpRight, MessageCircle, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {
  buildWhatsAppUrl,
  PROJECT_GALLERY_ITEMS,
  ProjectCaseStudy,
} from '../data/harmoniaData';

interface ProjectGallerySectionProps {
  onSelectProjectUnit: (unitLabel: string) => void;
}

const CATEGORIES = ['Semua', 'Hunian Kost', 'Komersial', 'Interior & Fasad'] as const;

export function ProjectGallerySection({onSelectProjectUnit}: ProjectGallerySectionProps) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('Semua');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectCaseStudy | null>(null);

  const visibleProjects =
    filter === 'Semua'
      ? PROJECT_GALLERY_ITEMS
      : PROJECT_GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section
      id="proyek"
      className="border-b border-slate-200/80 bg-[#F7F8F6] py-14 sm:py-20 dark:border-emerald-950/80 dark:bg-[#071310]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header & Category Filter */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#C49328] uppercase">
              03 · Galeri Proyek &amp; Studi Kasus
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-slate-900 sm:text-3xl dark:text-white">
              Portofolio Klaster &amp; Studi Kasus Pengembangan Kawasan
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter kategori proyek"
            className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 dark:border-emerald-900 dark:bg-[#0E201B]"
          >
            {CATEGORIES.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(category)}
                  className={`min-h-[36px] shrink-0 rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#0E3B2E] text-white dark:bg-[#C49328] dark:text-[#071310]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-emerald-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 9:16 Responsive Portrait Cards (Mobile Horizontal Story Rail -> Desktop 3-Column Grid) */}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.12}}
              transition={{
                duration: 0.35,
                delay: Math.min(index * 0.05, 0.2),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-[9/16] w-[78vw] max-w-[330px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200/90 bg-[#0A221B] md:w-auto md:max-w-none dark:border-emerald-900/80"
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Measured Gradient Scrim */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04100C] via-[#04100C]/45 to-transparent"
              />

              {/* Card Body inside 9:16 Frame */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-[#E2B34B]">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate text-emerald-100/90">{project.subtitle}</span>
                </div>

                <h3 className="mt-1.5 font-display text-xl leading-snug font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-200">
                  {project.shortDescription}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-3.5">
                  <div className="font-mono-tabular text-xs font-semibold text-[#E2B34B]">
                    {project.metrics[project.metrics.length - 1]?.value}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCaseStudy(project)}
                    className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl bg-white/95 px-3.5 text-xs font-bold whitespace-nowrap text-[#0E3B2E] transition-colors hover:bg-[#E2B34B] hover:text-[#071310] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2B34B]"
                  >
                    <span>Studi Kasus</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={() => setActiveCaseStudy(null)}
          >
            <motion.div
              initial={{opacity: 0, y: 16, scale: 0.98}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 12, scale: 0.98}}
              transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white dark:border-emerald-900 dark:bg-[#0E201B]"
            >
              <div className="grid md:grid-cols-12">
                <div className="relative aspect-[4/3] bg-slate-100 md:col-span-5 md:aspect-auto dark:bg-[#071310]">
                  <img
                    src={activeCaseStudy.image}
                    alt={activeCaseStudy.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6 sm:p-7 md:col-span-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-[#C49328]">
                        {activeCaseStudy.category} · {activeCaseStudy.subtitle}
                      </div>
                      <h3 className="mt-1 font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                        {activeCaseStudy.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveCaseStudy(null)}
                      aria-label="Tutup studi kasus"
                      className="flex min-h-[38px] min-w-[38px] shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:border-emerald-900 dark:text-slate-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Metrics Grid */}
                  <div className="mt-4 grid grid-cols-1 gap-2.5 border-y border-slate-200/80 py-3.5 sm:grid-cols-3 dark:border-emerald-950">
                    {activeCaseStudy.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {metric.label}
                        </div>
                        <div className="font-mono-tabular mt-0.5 text-sm font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Case Study Breakdown */}
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Tantangan Perencanaan
                      </div>
                      <p className="mt-0.5 leading-relaxed text-slate-600 dark:text-slate-300">
                        {activeCaseStudy.caseStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Solusi Desain &amp; Struktur
                      </div>
                      <p className="mt-0.5 leading-relaxed text-slate-600 dark:text-slate-300">
                        {activeCaseStudy.caseStudy.solution}
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Hasil &amp; Nilai Investasi
                      </div>
                      <p className="mt-0.5 leading-relaxed text-slate-600 dark:text-slate-300">
                        {activeCaseStudy.caseStudy.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        const targetUnit = activeCaseStudy.unitReference;
                        setActiveCaseStudy(null);
                        onSelectProjectUnit(targetUnit);
                      }}
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#0E3B2E] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#14503F] dark:bg-[#C49328] dark:text-[#071310]"
                    >
                      <span>Ajukan Minat Unit Ini</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <a
                      href={buildWhatsAppUrl(
                        `Assalamualaikum Admin Harmonia, saya ingin berdiskusi tentang studi kasus ${activeCaseStudy.title}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-800 dark:border-emerald-900 dark:bg-[#071310] dark:text-slate-200"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Tanya via WA</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
