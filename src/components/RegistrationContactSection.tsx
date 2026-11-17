import {CheckCircle2, Loader2, Mail, MessageCircle, Send} from 'lucide-react';
import {motion} from 'motion/react';
import {FormEvent, useEffect, useState} from 'react';
import {
  ADMIN_EMAIL,
  buildWhatsAppUrl,
  UNIT_TYPES,
  WHATSAPP_DISPLAY,
} from '../data/harmoniaData';
import {InquiryRecord} from '../types/inquiry';

interface RegistrationContactSectionProps {
  preselectedUnit: string;
}

export function RegistrationContactSection({
  preselectedUnit,
}: RegistrationContactSectionProps) {
  const [formType, setFormType] = useState<'registration' | 'contact'>('registration');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [unitType, setUnitType] = useState(
    preselectedUnit || `${UNIT_TYPES[0].name} - ${UNIT_TYPES[0].category}`,
  );
  const [paymentScheme, setPaymentScheme] = useState('Cicilan Syariah (Tanpa Riba & KPR Bank)');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<InquiryRecord | null>(null);

  useEffect(() => {
    if (preselectedUnit) {
      setUnitType(preselectedUnit);
      setFormType('registration');
    }
  }, [preselectedUnit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (name.trim().length < 2) {
      setErrorMsg('Mohon lengkapi nama lengkap Anda.');
      return;
    }

    if (whatsapp.replace(/\D/g, '').length < 9) {
      setErrorMsg('Mohon masukkan nomor WhatsApp aktif yang dapat dihubungi.');
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Format alamat email tidak valid.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          formType,
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim(),
          unitType: formType === 'registration' ? unitType : 'Konsultasi Layanan & Investasi',
          paymentScheme: formType === 'registration' ? paymentScheme : 'Konsultasi Langsung',
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        inquiry?: InquiryRecord;
      };

      if (!response.ok || !data.inquiry) {
        setErrorMsg(data.error || 'Gagal mengirim formulir. Silakan coba lagi.');
        return;
      }

      setSubmittedRecord(data.inquiry);
      setName('');
      setWhatsapp('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMsg('Koneksi ke server terganggu. Anda juga dapat langsung menghubungi WhatsApp kami.');
    } finally {
      setSubmitting(false);
    }
  };

  const buildMailtoHref = (record: InquiryRecord) => {
    const subject =
      record.formType === 'registration'
        ? `[Pendaftaran Unit Harmonia] ${record.name} - ${record.unitType}`
        : `[Konsultasi Harmonia] ${record.name}`;
    const body = [
      `Halo Admin Harmonia Student House,`,
      ``,
      `Nama: ${record.name}`,
      `No. WhatsApp: ${record.whatsapp}`,
      `Email: ${record.email || '-'}`,
      `Unit Diminati: ${record.unitType}`,
      `Skema Pembayaran: ${record.paymentScheme}`,
      `Pesan: ${record.message || '-'}`,
      `ID Referensi: ${record.id}`,
    ].join('\n');
    return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const buildSubmittedWhatsAppHref = (record: InquiryRecord) => {
    const text = [
      `Assalamualaikum Admin Harmonia Student House (${record.id}),`,
      `Saya baru saja mengirimkan ${record.formType === 'registration' ? 'Pendaftaran Minat Unit' : 'Formulir Konsultasi'}:`,
      `• Nama: ${record.name}`,
      `• Unit: ${record.unitType}`,
      `• Skema: ${record.paymentScheme}`,
      record.message ? `• Pesan: ${record.message}` : '',
      `Mohon informasi ketersediaan unit dan jadwal survei lokasi.`,
    ]
      .filter(Boolean)
      .join('\n');
    return buildWhatsAppUrl(text);
  };

  return (
    <section
      id="pendaftaran"
      className="bg-[#F7F8F6] py-14 sm:py-20 dark:bg-[#071310]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
          className="grid gap-8 lg:grid-cols-12"
        >
          {/* Left Column: Direct Admin Consultation & Real-time Guarantee */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#0E3B2E] p-6 text-white sm:p-8 lg:col-span-5 dark:border-emerald-900 dark:bg-[#0E201B]">
            <div>
              <p className="font-mono-tabular text-xs font-semibold tracking-wider text-[#E2B34B] uppercase">
                06 · Konsultasi &amp; Pendaftaran Resmi
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl">
                Jadwalkan Konsultasi atau Amankan Unit Pilihan Anda
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-100/90">
                Setiap pendaftaran dan pesan konsultasi diteruskan ke email admin{' '}
                <span className="font-semibold text-white">{ADMIN_EMAIL}</span> serta memicu
                notifikasi real-time agar tim kami segera merespons.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={buildWhatsAppUrl(
                    'Assalamualaikum Admin Harmonia Student House, saya ingin konsultasi lebih lanjut terkait layanan & investasi unit di Dramaga-Bogor.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center justify-between gap-4 rounded-xl bg-[#C49328] px-4 py-3 text-[#071310] transition-transform duration-150 hover:bg-[#E2B34B] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold uppercase">Konsultasi WhatsApp</div>
                      <div className="font-mono-tabular text-sm font-bold">{WHATSAPP_DISPLAY}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">Chat Langsung →</span>
                </a>

                <a
                  href={`mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(
                    'Konsultasi Investasi Harmonia Student House Dramaga-Bogor',
                  )}`}
                  className="flex min-h-[56px] items-center justify-between gap-4 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white transition-colors hover:bg-white/10"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-[#E2B34B]" />
                    <div className="min-w-0">
                      <div className="text-xs text-emerald-100/80">Email Resmi Admin</div>
                      <div className="truncate text-sm font-semibold">{ADMIN_EMAIL}</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-5 text-xs leading-relaxed text-emerald-100/80">
              <div className="font-semibold text-white">
                Diproduksi oleh Harmonia Student House
              </div>
              <div>Dikembangkan oleh Isykariman Property Syariah</div>
            </div>
          </div>

          {/* Right Column: Responsive Registration & Contact Form */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 lg:col-span-7 dark:border-emerald-900/80 dark:bg-[#0E201B]">
            {/* Segmented Mode Switch */}
            <div
              role="tablist"
              aria-label="Jenis formulir"
              className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-[#071310]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={formType === 'registration'}
                onClick={() => {
                  setFormType('registration');
                  setSubmittedRecord(null);
                  setErrorMsg('');
                }}
                className={`min-h-[42px] rounded-lg px-3 text-xs font-semibold transition-all sm:text-sm ${
                  formType === 'registration'
                    ? 'bg-white text-[#0E3B2E] shadow-xs dark:bg-[#143028] dark:text-[#E2B34B]'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Pendaftaran Unit
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={formType === 'contact'}
                onClick={() => {
                  setFormType('contact');
                  setSubmittedRecord(null);
                  setErrorMsg('');
                }}
                className={`min-h-[42px] rounded-lg px-3 text-xs font-semibold transition-all sm:text-sm ${
                  formType === 'contact'
                    ? 'bg-white text-[#0E3B2E] shadow-xs dark:bg-[#143028] dark:text-[#E2B34B]'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Kontak &amp; Konsultasi
              </button>
            </div>

            {submittedRecord ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-800 dark:bg-emerald-950/40">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {submittedRecord.formType === 'registration'
                        ? 'Pendaftaran Minat Unit Berhasil Dikirim'
                        : 'Pesan Konsultasi Berhasil Dikirim'}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Referensi <span className="font-mono-tabular font-semibold">{submittedRecord.id}</span>{' '}
                      telah tercatat di sistem notifikasi real-time kami dan diteruskan ke admin{' '}
                      <span className="font-medium text-slate-900 dark:text-white">
                        {submittedRecord.emailTarget}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={buildSubmittedWhatsAppHref(submittedRecord)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#0E3B2E] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#14503F] dark:bg-[#C49328] dark:text-[#071310]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Konfirmasi Cepat via WhatsApp</span>
                  </a>
                  <a
                    href={buildMailtoHref(submittedRecord)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-emerald-800 dark:bg-[#071310] dark:text-slate-200"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Kirim via Email Client</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedRecord(null)}
                  className="mt-4 text-xs font-semibold text-[#0E3B2E] underline underline-offset-4 dark:text-[#E2B34B]"
                >
                  Kirim pendaftaran atau pesan lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="harmonia-name"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Nama Lengkap *
                    </label>
                    <input
                      id="harmonia-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Ahmad Fauzan"
                      className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0E3B2E] focus:outline-none dark:border-emerald-900 dark:bg-[#071310] dark:text-white dark:focus:border-[#E2B34B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="harmonia-whatsapp"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Nomor WhatsApp *
                    </label>
                    <input
                      id="harmonia-whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="0812xxxxxxxx"
                      className="font-mono-tabular min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0E3B2E] focus:outline-none dark:border-emerald-900 dark:bg-[#071310] dark:text-white dark:focus:border-[#E2B34B]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="harmonia-email"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Alamat Email
                  </label>
                  <input
                    id="harmonia-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0E3B2E] focus:outline-none dark:border-emerald-900 dark:bg-[#071310] dark:text-white dark:focus:border-[#E2B34B]"
                  />
                </div>

                {formType === 'registration' && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="harmonia-unit"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Pilihan Tipe Unit
                      </label>
                      <select
                        id="harmonia-unit"
                        value={unitType}
                        onChange={(e) => setUnitType(e.target.value)}
                        className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 focus:border-[#0E3B2E] focus:outline-none dark:border-emerald-900 dark:bg-[#071310] dark:text-white dark:focus:border-[#E2B34B]"
                      >
                        {UNIT_TYPES.map((u) => {
                          const label = `${u.name} - ${u.category}`;
                          return (
                            <option key={u.id} value={label}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="harmonia-scheme"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Skema Kepemilikan Syariah
                      </label>
                      <select
                        id="harmonia-scheme"
                        value={paymentScheme}
                        onChange={(e) => setPaymentScheme(e.target.value)}
                        className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 focus:border-[#0E3B2E] focus:outline-none dark:border-emerald-900 dark:bg-[#071310] dark:text-white dark:focus:border-[#E2B34B]"
                      >
                        <option value="Cicilan Syariah (Tanpa Riba & KPR Bank)">
                          Cicilan Syariah (Tanpa Riba &amp; KPR Bank)
                        </option>
                        <option value="Cash Keras">Cash Keras</option>
                        <option value="Survey Lokasi Terlebih Dahulu">
                          Survey Lokasi Terlebih Dahulu
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="harmonia-message"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {formType === 'registration'
                      ? 'Catatan atau Pertanyaan Tambahan'
                      : 'Pesan Konsultasi Layanan'}
                  </label>
                  <textarea
                    id="harmonia-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      formType === 'registration'
                        ? 'Contoh: Mohon kirimkan pricelist lengkap dan jadwal survey minggu ini.'
                        : 'Tuliskan pertanyaan Anda seputar ROI, skema pembayaran syariah, atau ketersediaan kavling.'
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0E3B2E] focus:outline-none dark:border-emerald-900 dark:bg-[#071310] dark:text-white dark:focus:border-[#E2B34B]"
                  />
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-300"
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0E3B2E] px-6 text-sm font-semibold text-white transition-all hover:bg-[#14503F] active:scale-[0.99] disabled:opacity-60 dark:bg-[#C49328] dark:text-[#071310] dark:hover:bg-[#E2B34B]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Mengirim ke Admin...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>
                        {formType === 'registration'
                          ? 'Kirim Pendaftaran Minat'
                          : 'Kirim Pesan ke Admin'}
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
