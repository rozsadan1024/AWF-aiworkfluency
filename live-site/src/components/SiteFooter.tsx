import Link from 'next/link';
import { Shield } from 'lucide-react';

export function SiteFooter({ t }: { t: Record<string, string> }) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-white font-semibold mb-4">{t.footer_product}</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hu#companies" className="hover:text-white transition-colors">{t.nav_companies}</Link></li>
              <li><Link href="/hu#how" className="hover:text-white transition-colors">{t.nav_how}</Link></li>
              <li><Link href="/hu#pricing" className="hover:text-white transition-colors">{t.nav_pricing}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-4">{t.footer_resources}</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/esettanulmanyok" className="hover:text-white transition-colors">{t.footer_case}</Link></li>
              <li><Link href="/roi-kalkulator" className="hover:text-white transition-colors">{t.footer_roi}</Link></li>
              <li><Link href="/eu-ai-act" className="hover:text-white transition-colors">{t.footer_euai}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-4">{t.footer_company}</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/rolunk" className="hover:text-white transition-colors">{t.footer_about}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer_contact}</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-4">{t.footer_legal}</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t.footer_privacy}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer_terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-300">{t.nav_brand}</span>
          </div>
          <p className="text-sm">{t.footer_copy}</p>
        </div>
      </div>
    </footer>
  );
}
