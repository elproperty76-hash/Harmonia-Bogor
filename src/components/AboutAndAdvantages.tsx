import {motion} from 'motion/react';
import {
  ADVANTAGES,
  FOUR_PILLARS,
  OCCUPANCY_STRATEGIES,
  OWNERSHIP_PILLARS,
} from '../data/harmoniaData';

export function AboutAndAdvantages() {
  return (
    <section
      id="tentang"
      className="border-b border-slate-200/80 bg-white py-14 sm:py-20 dark:border-emerald-950/80 dark:bg-[#0B1A16]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* 01. Tentang Harmonia */}
        <motion.div
          initial={{opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:aspect-auto lg:h-full dark:border-emerald-900 dark:bg-[#0E201B]">
              <img
                src="/assets/harmonia/webp/about-facade.webp"
                alt="Fasad Harmonia Student House Dramaga-Bogor"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#C49328] uppercase">
              01 · Tentang Harmonia
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-slate-900 sm:text-3xl dark:text-white">
              Hunian Investasi Kost Modern di Pusat Pendidikan Dramaga-Bogor
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Harmonia Student House Dramaga-Bogor adalah aset properti kost berkonsep modern
              minimalis dan Tropical Contemporary. Dirancang khusus untuk menjawab tingginya
              kebutuhan hunian mahasiswa IPB, menghadirkan kenyamanan, fasilitas lengkap, dan
              potensi pendapatan sewa berkelanjutan.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FOUR_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-xl border border-slate-200/90 bg-[#F7F8F6] p-4 dark:border-emerald-900/80 dark:bg-[#0E201B]"
                >
                  <div className="font-mono-tabular text-xs font-semibold text-[#C49328]">
                    {pillar.number}.
                  </div>
                  <h3 className="mt-1 font-display text-base font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sistem Kepemilikan Syariah */}
        <motion.div
          initial={{opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-16 border-t border-slate-200/80 pt-14 dark:border-emerald-950"
        >
          <div className="max-w-2xl">
            <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#C49328] uppercase">
              Sistem Kepemilikan Mudah
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-slate-900 sm:text-3xl dark:text-white">
              Skema Transaksi Murni Syariah &amp; Sertifikat Hak Milik
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {OWNERSHIP_PILLARS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200/90 bg-[#F7F8F6] p-6 dark:border-emerald-900/80 dark:bg-[#0E201B]"
              >
                <h3 className="font-display text-lg font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Keunggulan Kawasan & Jaminan Okupansi */}
        <motion.div
          initial={{opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.12}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-16 grid gap-10 border-t border-slate-200/80 pt-14 lg:grid-cols-12 dark:border-emerald-950"
        >
          <div className="lg:col-span-7">
            <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#C49328] uppercase">
              Keunggulan Harmonia
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              8 Nilai Lebih Bagi Investor &amp; Penghuni
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ADVANTAGES.map((adv, idx) => (
                <div
                  key={adv.title}
                  className="border-b border-slate-200/80 pb-4 dark:border-emerald-950"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono-tabular text-xs font-semibold text-[#C49328]">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {adv.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Jaminan Okupansi */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#0E3B2E] p-6 text-white sm:p-8 lg:col-span-5 dark:border-emerald-800/80 dark:bg-[#102922]">
            <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#E2B34B] uppercase">
              Jaminan Okupansi
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
              Dikelola Tim Profesional Sejak 2021
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/90">
              Harmonia Student House didukung tim manajemen kost berpengalaman sejak 2021 yang
              secara aktif menjaga okupansi dan menargetkan tingkat hunian hingga 100%.
            </p>

            <div className="mt-6 space-y-4 border-t border-white/15 pt-6">
              {OCCUPANCY_STRATEGIES.map((strategy) => (
                <div key={strategy.title}>
                  <h4 className="font-display text-sm font-bold text-[#E2B34B]">
                    {strategy.title}
                  </h4>
                  <p className="mt-0.5 text-sm leading-relaxed text-emerald-50/85">
                    {strategy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
