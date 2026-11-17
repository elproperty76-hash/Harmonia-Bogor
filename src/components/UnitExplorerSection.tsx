import {ArrowRight, Maximize2, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {
  formatRupiah,
  IJAROH_INCLUSIONS,
  UNIT_TYPES,
  UnitTypeSpec,
} from '../data/harmoniaData';

interface UnitExplorerSectionProps {
  onSelectUnitForForm: (unitLabel: string) => void;
}

export function UnitExplorerSection({onSelectUnitForForm}: UnitExplorerSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(UNIT_TYPES[0].id);
  const [visualMode, setVisualMode] = useState<'exterior' | 'interior' | 'denah'>('exterior');
  const [floorplanIndex, setFloorplanIndex] = useState(0);
  const [managementMode, setManagementMode] = useState<'managed' | 'self'>('managed');
  const [occupancyRate, setOccupancyRate] = useState<100 | 85>(100);
  const [zoomImage, setZoomImage] = useState<{src: string; title: string} | null>(null);

  const unit: UnitTypeSpec =
    UNIT_TYPES.find((item) => item.id === selectedId) ?? UNIT_TYPES[0];

  const handleSelectUnit = (id: string) => {
    setSelectedId(id);
    setFloorplanIndex(0);
  };

  const fin = unit.financials;
  const occupancyFactor = occupancyRate / 100;
  const effectiveGrossMonthly = Math.round(fin.grossMonthlyIncome * occupancyFactor);
  const operationalCostMonthly =
    managementMode === 'managed' ? fin.totalOperationalMonthly : 0;
  const effectiveNetMonthly = Math.max(0, effectiveGrossMonthly - operationalCostMonthly);
  const effectiveNetYearly = effectiveNetMonthly * 12;
  const effectiveRoiPercent =
    (effectiveNetYearly / fin.initialInvestment) * 100;
  const totalCombinedRoi = effectiveRoiPercent + fin.capitalGainPercent;

  return (
    <section
      id="unit"
      className="border-b border-slate-200/80 bg-[#F7F8F6] py-14 sm:py-20 dark:border-emerald-950/80 dark:bg-[#071310]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#C49328] uppercase">
              02 · Pilihan Unit, Denah &amp; Simulasi ROI
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-slate-900 sm:text-3xl dark:text-white">
              Bandingkan 5 Tipe Aset Produktif Harmonia
            </h2>
          </div>

          {/* Interactive Unit Segmented Tabs */}
          <div
            role="tablist"
            aria-label="Pilihan tipe unit Harmonia"
            className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 dark:border-emerald-900 dark:bg-[#0E201B]"
          >
            {UNIT_TYPES.map((item) => {
              const active = item.id === unit.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectUnit(item.id)}
                  className={`min-h-[38px] shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    active
                      ? 'bg-[#0E3B2E] text-white dark:bg-[#C49328] dark:text-[#071310]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-emerald-950'
                  }`}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unit Showcase Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={unit.id}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
            className="mt-8 grid items-start gap-8 lg:grid-cols-12"
          >
            {/* Visual Column (Exterior / Interior / Floorplan with 9:16 mobile & crisp aspect ratio) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 lg:col-span-5 dark:border-emerald-900/80 dark:bg-[#0E201B]">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-[#071310]">
                  <button
                    type="button"
                    onClick={() => setVisualMode('exterior')}
                    className={`min-h-[34px] rounded-md px-3 text-xs font-semibold transition-colors ${
                      visualMode === 'exterior'
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-[#143028] dark:text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Fasad
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualMode('interior')}
                    className={`min-h-[34px] rounded-md px-3 text-xs font-semibold transition-colors ${
                      visualMode === 'interior'
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-[#143028] dark:text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Interior
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualMode('denah')}
                    className={`min-h-[34px] rounded-md px-3 text-xs font-semibold transition-colors ${
                      visualMode === 'denah'
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-[#143028] dark:text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Denah
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const src =
                      visualMode === 'exterior'
                        ? unit.exteriorImage
                        : visualMode === 'interior'
                          ? unit.interiorImage
                          : unit.floorplans[floorplanIndex].image;
                    setZoomImage({
                      src,
                      title: `${unit.name} — ${
                        visualMode === 'denah'
                          ? unit.floorplans[floorplanIndex].label
                          : unit.category
                      }`,
                    });
                  }}
                  aria-label="Perbesar gambar unit"
                  className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-[#C49328] hover:text-slate-900 dark:border-emerald-900 dark:text-slate-300"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {visualMode === 'denah' ? (
                <div>
                  <div className="mb-2 flex gap-2">
                    {unit.floorplans.map((fp, idx) => (
                      <button
                        key={fp.label}
                        type="button"
                        onClick={() => setFloorplanIndex(idx)}
                        className={`min-h-[32px] rounded-lg border px-2.5 text-xs font-medium transition-colors ${
                          floorplanIndex === idx
                            ? 'border-[#0E3B2E] bg-[#0E3B2E] text-white dark:border-[#C49328] dark:bg-[#C49328] dark:text-[#071310]'
                            : 'border-slate-200 text-slate-600 dark:border-emerald-900 dark:text-slate-300'
                        }`}
                      >
                        {fp.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                    <img
                      src={unit.floorplans[floorplanIndex].image}
                      alt={`${unit.name} ${unit.floorplans[floorplanIndex].label}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[9/14] overflow-hidden rounded-xl bg-slate-100 sm:aspect-[4/5] dark:bg-[#071310]">
                  <img
                    src={visualMode === 'exterior' ? unit.exteriorImage : unit.interiorImage}
                    alt={`${unit.name} — ${visualMode}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                    <div className="text-xs font-medium text-[#E2B34B]">{unit.category}</div>
                    <div className="font-display text-lg font-bold text-white">
                      {unit.name} · {unit.unitCount} Unit di Siteplan
                    </div>
                  </div>
                </div>
              )}

              {/* Unit Technical Specs Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200/80 pt-4 dark:border-emerald-950">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Luas Tanah</div>
                  <div className="font-mono-tabular text-sm font-bold text-slate-900 dark:text-white">
                    {unit.landArea}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Luas Bangunan</div>
                  <div className="font-mono-tabular text-sm font-bold text-slate-900 dark:text-white">
                    {unit.buildingArea}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Kapasitas</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {unit.bedroomsLabel}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Kamar Mandi</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {unit.bathroomsLabel}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {unit.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                {unit.highlights.map((h, i) => (
                  <span key={h}>
                    {i > 0 && <span className="mr-3">·</span>}
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Financial & ROI Table Column */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 lg:col-span-7 dark:border-emerald-900/80 dark:bg-[#0E201B]">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center dark:border-emerald-950">
                <div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Nilai Investasi Awal ({unit.name})
                  </div>
                  <div className="font-mono-tabular mt-1 text-2xl font-bold text-[#0E3B2E] sm:text-3xl dark:text-[#E2B34B]">
                    {formatRupiah(fin.initialInvestment)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-[#071310]">
                    <button
                      type="button"
                      onClick={() => setManagementMode('managed')}
                      className={`min-h-[34px] rounded-md px-2.5 text-xs font-semibold transition-colors ${
                        managementMode === 'managed'
                          ? 'bg-white text-slate-900 shadow-xs dark:bg-[#143028] dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Kerja Sama
                    </button>
                    <button
                      type="button"
                      onClick={() => setManagementMode('self')}
                      className={`min-h-[34px] rounded-md px-2.5 text-xs font-semibold transition-colors ${
                        managementMode === 'self'
                          ? 'bg-white text-slate-900 shadow-xs dark:bg-[#143028] dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Mandiri
                    </button>
                  </div>

                  <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-[#071310]">
                    <button
                      type="button"
                      onClick={() => setOccupancyRate(100)}
                      className={`font-mono-tabular min-h-[34px] rounded-md px-2.5 text-xs font-semibold transition-colors ${
                        occupancyRate === 100
                          ? 'bg-white text-slate-900 shadow-xs dark:bg-[#143028] dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      100% Okupansi
                    </button>
                    <button
                      type="button"
                      onClick={() => setOccupancyRate(85)}
                      className={`font-mono-tabular min-h-[34px] rounded-md px-2.5 text-xs font-semibold transition-colors ${
                        occupancyRate === 85
                          ? 'bg-white text-slate-900 shadow-xs dark:bg-[#143028] dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      85%
                    </button>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-200/70 dark:divide-emerald-950">
                    <tr>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">
                        Total Kamar / Lantai
                      </td>
                      <td className="font-mono-tabular py-2.5 text-right font-semibold text-slate-900 dark:text-white">
                        {unit.id === 'ruko' ? '2 Lantai' : `${unit.roomCount} Kamar`}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">
                        Estimasi Pendapatan Sewa / {unit.id === 'ruko' ? 'Unit' : 'Kamar'}
                      </td>
                      <td className="font-mono-tabular py-2.5 text-right font-semibold text-slate-900 dark:text-white">
                        {formatRupiah(fin.rentPerRoomMonthly)} / bln
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-medium text-slate-900 dark:text-white">
                        Total Pendapatan Kotor / Bulan ({occupancyRate}%)
                      </td>
                      <td className="font-mono-tabular py-2.5 text-right font-bold text-slate-900 dark:text-white">
                        {formatRupiah(effectiveGrossMonthly)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">
                        Biaya Ijaroh / Pengelolaan / Bulan
                      </td>
                      <td className="font-mono-tabular py-2.5 text-right font-medium text-slate-700 dark:text-slate-300">
                        {managementMode === 'managed'
                          ? formatRupiah(operationalCostMonthly)
                          : 'Rp 0 (Kelola Mandiri)'}
                      </td>
                    </tr>
                    <tr className="bg-[#F7F8F6] dark:bg-[#071310]/60">
                      <td className="px-2 py-3 font-semibold text-[#0E3B2E] dark:text-[#E2B34B]">
                        Net Profit / Bulan
                      </td>
                      <td className="font-mono-tabular px-2 py-3 text-right font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                        {formatRupiah(effectiveNetMonthly)}
                      </td>
                    </tr>
                    <tr className="bg-[#F7F8F6] dark:bg-[#071310]/60">
                      <td className="px-2 py-3 font-semibold text-[#0E3B2E] dark:text-[#E2B34B]">
                        Net Profit / Tahun
                      </td>
                      <td className="font-mono-tabular px-2 py-3 text-right font-bold text-[#0E3B2E] dark:text-[#E2B34B]">
                        {formatRupiah(effectiveNetYearly)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">
                        ROI Pendapatan Sewa / Tahun
                      </td>
                      <td className="font-mono-tabular py-2.5 text-right font-semibold text-slate-900 dark:text-white">
                        {effectiveRoiPercent.toFixed(2).replace('.', ',')}%
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">
                        Estimasi Capital Gain / Tahun
                      </td>
                      <td className="font-mono-tabular py-2.5 text-right font-semibold text-slate-900 dark:text-white">
                        {fin.capitalGainPercent.toFixed(2).replace('.', ',')}%
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-display text-base font-bold text-slate-900 dark:text-white">
                        Total ROI + Capital Gain / Tahun
                      </td>
                      <td className="font-mono-tabular py-3 text-right text-xl font-bold text-[#C49328] dark:text-[#E2B34B]">
                        {totalCombinedRoi.toFixed(2).replace('.', ',')}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {managementMode === 'managed' && (
                <div className="mt-4 rounded-xl border border-slate-200/80 bg-[#F7F8F6] p-3.5 text-xs text-slate-600 dark:border-emerald-900/70 dark:bg-[#071310] dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Biaya Ijaroh sudah termasuk:{' '}
                  </span>
                  {IJAROH_INCLUSIONS.join(' · ')}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Sumber data: Booklet Resmi Harmonia Student House Dramaga-Bogor
                </span>
                <button
                  type="button"
                  onClick={() => onSelectUnitForForm(`${unit.name} - ${unit.category}`)}
                  className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0E3B2E] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-all hover:bg-[#14503F] active:scale-[0.98] dark:bg-[#C49328] dark:text-[#071310] dark:hover:bg-[#E2B34B]"
                >
                  <span>Daftar {unit.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal for Floorplan / Unit Photo Zoom */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setZoomImage(null)}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-4 dark:bg-[#0E201B]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="font-display text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                  {zoomImage.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setZoomImage(null)}
                  aria-label="Tutup tampilan perbesar"
                  className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-slate-200 text-slate-700 dark:border-emerald-900 dark:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex max-h-[75vh] items-center justify-center overflow-auto">
                <img
                  src={zoomImage.src}
                  alt={zoomImage.title}
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
