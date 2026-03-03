import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Work Fluency — Tedd az AI-t a csapatod fegyverévé',
  description: 'Személyre szabott AI tréning minden alkalmazottnak. Valós munkahelyi feladatok, mérhető fejlődés, EU AI Act megfelelőség.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
