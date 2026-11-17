import {ArrowRight, MessageCircle} from 'lucide-react';
import {MotionConfig} from 'motion/react';
import {useEffect, useState} from 'react';
import {AboutAndAdvantages} from './components/AboutAndAdvantages';
import {HeroSection} from './components/HeroSection';
import {LocationSiteplanGallery} from './components/LocationSiteplanGallery';
import {Navbar} from './components/Navbar';
import {ProjectGallerySection} from './components/ProjectGallerySection';
import {RealtimeNotificationDrawer} from './components/RealtimeNotificationDrawer';
import {RegistrationContactSection} from './components/RegistrationContactSection';
import {TestimonialsSection} from './components/TestimonialsSection';
import {UnitExplorerSection} from './components/UnitExplorerSection';
import {
  ADMIN_EMAIL,
  buildWhatsAppUrl,
  UNIT_TYPES,
  WHATSAPP_DISPLAY,
} from './data/harmoniaData';
import {useRealtimeNotifications} from './hooks/useRealtimeNotifications';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const [smartphoneFrameMode, setSmartphoneFrameMode] = useState(false);
  const [preselectedUnit, setPreselectedUnit] = useState(
    `${UNIT_TYPES[0].name} - ${UNIT_TYPES[0].category}`,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);

  const {
    inquiries,
    pendingCount,
    connected,
    activeConnections,
    toasts,
    dismissToast,
    markStatus,
  } = useRealtimeNotifications();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('harmonia-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage failures
    }
  }, [isDark]);

  useEffect(() => {
    const onQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
    };
  }, []);

  const handleScrollToForm = (unitLabel?: string) => {
    if (unitLabel) {
      setPreselectedUnit(unitLabel);
    }
    const el = document.getElementById('pendaftaran');
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F7F8F6] pb-16 text-slate-900 transition-colors duration-200 md:pb-0 dark:bg-[#071310] dark:text-slate-100">
        {gmpQuotaExceeded && (
          <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 shadow-sm md:text-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-950 underline hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <Navbar
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          pendingCount={pendingCount}
          onOpenNotifications={() => setDrawerOpen(true)}
          onScrollToForm={() => handleScrollToForm()}
        />

        <main>
          <HeroSection
            onScrollToForm={handleScrollToForm}
            smartphoneFrameMode={smartphoneFrameMode}
            onToggleSmartphoneFrameMode={() => setSmartphoneFrameMode((prev) => !prev)}
          />

          <AboutAndAdvantages />

          <UnitExplorerSection onSelectUnitForForm={handleScrollToForm} />

          <ProjectGallerySection onSelectProjectUnit={handleScrollToForm} />

          <LocationSiteplanGallery quotaExceeded={gmpQuotaExceeded} />

          <TestimonialsSection />

          <RegistrationContactSection preselectedUnit={preselectedUnit} />
        </main>

        {/* Quiet Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-8 dark:border-emerald-950/80 dark:bg-[#0B1A16]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:px-6 lg:px-10 dark:text-slate-400">
            <div>
              <span className="font-display font-bold text-slate-900 dark:text-white">
                Harmonia Student House Dramaga-Bogor
              </span>{' '}
              · Dikelola oleh Harmonia Student House · Dikembangkan oleh Isykariman Property Syariah
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={buildWhatsAppUrl(
                  'Assalamualaikum Admin Harmonia Student House, saya ingin konsultasi investasi kost Ring 1 IPB.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tabular hover:text-[#0E3B2E] dark:hover:text-[#E2B34B]"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={`mailto:${ADMIN_EMAIL}`}
                className="hover:text-[#0E3B2E] dark:hover:text-[#E2B34B]"
              >
                {ADMIN_EMAIL}
              </a>
            </div>
          </div>
        </footer>

        {/* Mobile Thumb-Zone Sticky Quick Bar */}
        <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/90 bg-white/95 px-3 py-2 backdrop-blur-md md:hidden dark:border-emerald-950 dark:bg-[#071310]/95">
          <div className="flex items-center gap-2">
            <a
              href={buildWhatsAppUrl(
                'Assalamualaikum Admin Harmonia Student House, saya ingin konsultasi unit kost di Ring 1 IPB.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold whitespace-nowrap text-slate-800 dark:border-emerald-900 dark:bg-[#0E201B] dark:text-slate-100"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => handleScrollToForm()}
              className="flex min-h-[44px] flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-[#0E3B2E] px-4 text-xs font-bold whitespace-nowrap text-white dark:bg-[#C49328] dark:text-[#071310]"
            >
              <span>Daftar Minat</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <RealtimeNotificationDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          inquiries={inquiries}
          connected={connected}
          activeConnections={activeConnections}
          toasts={toasts}
          onDismissToast={dismissToast}
          onMarkStatus={markStatus}
          onOpenDrawer={() => setDrawerOpen(true)}
        />
      </div>
    </MotionConfig>
  );
}
