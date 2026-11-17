import {Bell, Menu, Moon, Sun, X} from 'lucide-react';
import {useState} from 'react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  pendingCount: number;
  onOpenNotifications: () => void;
  onScrollToForm: () => void;
}

const NAV_LINKS = [
  {label: 'Tentang', href: '#tentang'},
  {label: 'Unit & ROI', href: '#unit'},
  {label: 'Proyek', href: '#proyek'},
  {label: 'Lokasi', href: '#lokasi'},
  {label: 'Testimoni', href: '#testimoni'},
];

export function Navbar({
  isDark,
  onToggleTheme,
  pendingCount,
  onOpenNotifications,
  onScrollToForm,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#F7F8F6]/90 backdrop-blur-md transition-colors duration-200 dark:border-emerald-950/80 dark:bg-[#071310]/90">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#beranda"
          className="flex shrink-0 items-center gap-2.5 font-display text-lg font-bold tracking-tight whitespace-nowrap text-[#0E3B2E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49328] dark:text-slate-100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-[#C49328]"
          >
            <path
              d="M16 4C18.2 9 18.2 13 16 15.5C13.8 13 13.8 9 16 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M27.4 12.3C22.4 14.5 18.7 13.7 16.9 11.4C19.8 9.6 23.6 10.2 27.4 12.3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M23 26.2C20.1 21.8 19.3 18 20.8 15.3C23.6 17.5 24.4 21.6 23 26.2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M9 26.2C7.6 21.6 8.4 17.5 11.2 15.3C12.7 18 11.9 21.8 9 26.2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M4.6 12.3C8.4 10.2 12.2 9.6 15.1 11.4C13.3 13.7 9.6 14.5 4.6 12.3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span>Harmonia</span>
        </a>

        {/* Zone 2: Minimalist Single-Line Navigation */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex dark:text-slate-300"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-[#0E3B2E] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49328] dark:hover:text-[#E2B34B]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme Toggle, Real-time Inbox Trigger & Primary CTA */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Buka notifikasi pesan masuk"
            className="relative flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-700 transition-colors hover:border-[#C49328] hover:text-[#0E3B2E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49328] dark:border-emerald-900 dark:bg-[#0E201B] dark:text-slate-200 dark:hover:border-[#E2B34B]"
          >
            <Bell className="h-4 w-4" />
            {pendingCount > 0 && (
              <span className="font-mono-tabular absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#C49328] px-1 text-[10px] font-semibold text-white">
                {pendingCount > 9 ? '9+' : pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-700 transition-colors hover:border-[#C49328] hover:text-[#0E3B2E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49328] dark:border-emerald-900 dark:bg-[#0E201B] dark:text-slate-200 dark:hover:border-[#E2B34B]"
          >
            {isDark ? <Sun className="h-4 w-4 text-[#E2B34B]" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onScrollToForm}
            className="hidden min-h-[40px] shrink-0 items-center justify-center rounded-lg bg-[#0E3B2E] px-4 py-2 text-xs font-semibold whitespace-nowrap text-white transition-all duration-200 hover:bg-[#14503F] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49328] sm:inline-flex dark:bg-[#C49328] dark:text-[#071310] dark:hover:bg-[#E2B34B]"
          >
            Daftar Minat
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu navigasi"
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-700 md:hidden dark:border-emerald-900 dark:bg-[#0E201B] dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-emerald-950 dark:bg-[#0B1A16]">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-emerald-950/60"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToForm();
              }}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#0E3B2E] px-4 text-sm font-semibold text-white dark:bg-[#C49328] dark:text-[#071310]"
            >
              Daftar Minat Unit
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
