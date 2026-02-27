import Link from 'next/link';
import { Shield } from 'lucide-react';

export function SiteNav({ t }: { t: Record<string, string> }) {
  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/hu" className="flex items-center gap-2">
          <Shield className="w-7 h-7 text-brand-600" />
          <span className="text-xl font-bold text-gray-900">{t.nav_brand}</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/hu#companies" className="hover:text-brand-600 transition-colors">{t.nav_companies}</Link>
          <Link href="/hu#how" className="hover:text-brand-600 transition-colors">{t.nav_how}</Link>
          <Link href="/hu#pricing" className="hover:text-brand-600 transition-colors">{t.nav_pricing}</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4 hidden sm:block">{t.nav_login}</Link>
          <Link href="/assessment" className="btn-primary text-sm py-2 px-4">{t.nav_try}</Link>
        </div>
      </div>
    </nav>
  );
}
