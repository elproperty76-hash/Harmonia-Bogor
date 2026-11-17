import {BellRing, Check, Mail, MessageCircle, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {ADMIN_EMAIL, buildWhatsAppUrl} from '../data/harmoniaData';
import {ToastNotification} from '../hooks/useRealtimeNotifications';
import {InquiryRecord} from '../types/inquiry';

interface RealtimeNotificationDrawerProps {
  open: boolean;
  onClose: () => void;
  inquiries: InquiryRecord[];
  connected: boolean;
  activeConnections: number;
  toasts: ToastNotification[];
  onDismissToast: (id: string) => void;
  onMarkStatus: (id: string, status: 'pending' | 'responded') => void;
  onOpenDrawer: () => void;
}

export function RealtimeNotificationDrawer({
  open,
  onClose,
  inquiries,
  connected,
  activeConnections,
  toasts,
  onDismissToast,
  onMarkStatus,
  onOpenDrawer,
}: RealtimeNotificationDrawerProps) {
  const formatTime = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <>
      {/* Live WebSocket Toast Notifications */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-20 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 md:bottom-6"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{opacity: 0, y: 16, scale: 0.96}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 8, scale: 0.96}}
              transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-emerald-800 dark:bg-[#0E201B]"
            >
              <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-[#C49328]" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {toast.title}
                </div>
                <div className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                  {toast.subtitle}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onDismissToast(toast.id);
                    onOpenDrawer();
                  }}
                  className="mt-2 text-xs font-semibold text-[#0E3B2E] underline underline-offset-2 dark:text-[#E2B34B]"
                >
                  Buka Antrean Respon
                </button>
              </div>
              <button
                type="button"
                onClick={() => onDismissToast(toast.id)}
                aria-label="Tutup notifikasi"
                className="flex min-h-[28px] min-w-[28px] items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Admin Real-Time Notification Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
            onClick={onClose}
          >
            <motion.aside
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
              onClick={(e) => e.stopPropagation()}
              aria-label="Pusat Notifikasi Real-Time Admin"
              className="flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white dark:border-emerald-900 dark:bg-[#071310]"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-emerald-950">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Notifikasi Real-Time Admin
                  </h3>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        connected ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span>
                      {connected ? 'WebSocket Terhubung' : 'Menghubungkan ulang...'} ·{' '}
                      {activeConnections} sesi aktif
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup panel notifikasi"
                  className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-slate-200 text-slate-700 dark:border-emerald-900 dark:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="border-b border-slate-200/80 bg-[#F7F8F6] px-5 py-2.5 text-xs text-slate-600 dark:border-emerald-950 dark:bg-[#0E201B] dark:text-slate-300">
                Target email admin: <span className="font-semibold">{ADMIN_EMAIL}</span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {inquiries.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-emerald-900 dark:text-slate-400">
                    Belum ada pesan atau pendaftaran unit masuk pada sesi ini. Setiap pengiriman
                    formulir akan muncul secara real-time di sini.
                  </div>
                ) : (
                  inquiries.map((item) => {
                    const waReplyUrl = buildWhatsAppUrl(
                      `Assalamualaikum ${item.name}, terima kasih telah menghubungi Harmonia Student House terkait ${item.unitType} (${item.id}).`,
                    );
                    const isResponded = item.status === 'responded';

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-[#F7F8F6] p-4 dark:border-emerald-900/80 dark:bg-[#0E201B]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                              {item.name}
                            </div>
                            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                              {item.formType === 'registration' ? 'Pendaftaran Unit' : 'Konsultasi'}{' '}
                              · <span className="font-mono-tabular">{formatTime(item.createdAt)}</span>
                            </div>
                          </div>

                          <span
                            className={`text-xs font-semibold ${
                              isResponded
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-amber-700 dark:text-[#E2B34B]'
                            }`}
                          >
                            {isResponded ? 'Sudah Direspon' : 'Menunggu Respon'}
                          </span>
                        </div>

                        <div className="mt-2.5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                          <div>
                            Unit: <span className="font-semibold">{item.unitType}</span>
                          </div>
                          <div>
                            Skema: <span>{item.paymentScheme}</span>
                          </div>
                          <div className="font-mono-tabular">WhatsApp: {item.whatsapp}</div>
                          {item.email && <div>Email: {item.email}</div>}
                          {item.message && (
                            <p className="mt-1.5 rounded-lg bg-white p-2 text-slate-700 dark:bg-[#071310] dark:text-slate-200">
                              {item.message}
                            </p>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-3 dark:border-emerald-950">
                          <a
                            href={waReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg bg-[#0E3B2E] px-3 text-xs font-semibold text-white dark:bg-[#C49328] dark:text-[#071310]"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>Balas WA</span>
                          </a>

                          {item.email && (
                            <a
                              href={`mailto:${item.email}?subject=${encodeURIComponent(
                                `Respon Harmonia Student House (${item.id})`,
                              )}`}
                              className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 dark:border-emerald-900 dark:bg-[#071310] dark:text-slate-200"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              <span>Email</span>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              onMarkStatus(item.id, isResponded ? 'pending' : 'responded')
                            }
                            className="ml-auto inline-flex min-h-[34px] items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-emerald-950"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>{isResponded ? 'Buka Ulang' : 'Tandai Direspon'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
