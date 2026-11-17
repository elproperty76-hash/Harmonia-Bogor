import {Quote} from 'lucide-react';
import {motion} from 'motion/react';
import {CLIENT_TESTIMONIALS} from '../data/harmoniaData';

export function TestimonialsSection() {
  return (
    <section
      id="testimoni"
      className="border-b border-slate-200/80 bg-white py-14 sm:py-20 dark:border-emerald-950/80 dark:bg-[#0B1A16]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#C49328] uppercase">
            05 · Testimoni Investor &amp; Mitra
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-slate-900 sm:text-3xl dark:text-white">
            Pengalaman Pemilik Unit &amp; Mitra Investasi Syariah
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Cerita nyata para pemilik unit Apartkost, Rumah Kost, dan Ruko Harmonia mengenai
            transparansi akad, legalitas SHM, serta pengelolaan okupansi mahasiswa IPB.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CLIENT_TESTIMONIALS.map((item, idx) => (
            <motion.blockquote
              key={item.id}
              initial={{opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.15}}
              transition={{
                duration: 0.4,
                delay: Math.min(idx * 0.06, 0.2),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#F7F8F6] p-6 dark:border-emerald-900/80 dark:bg-[#0E201B]"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <Quote className="h-5 w-5 text-[#C49328]" aria-hidden="true" />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.unitOwned}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-200">
                  “{item.quote}”
                </p>

                <p className="mt-3 text-xs font-medium text-[#0E3B2E] dark:text-[#E2B34B]">
                  Hasil: {item.outcome}
                </p>
              </div>

              <footer className="mt-6 flex items-center gap-3.5 border-t border-slate-200/80 pt-4 dark:border-emerald-950">
                <div
                  aria-hidden="true"
                  className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0E3B2E] text-sm font-bold text-[#E2B34B] dark:bg-[#14362C]"
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <cite className="block truncate font-display text-sm font-bold not-italic text-slate-900 dark:text-white">
                    {item.name}
                  </cite>
                  <div className="truncate text-xs text-slate-600 dark:text-slate-400">
                    {item.role} · {item.organization}
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
