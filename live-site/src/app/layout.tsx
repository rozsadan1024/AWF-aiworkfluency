import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIProof — Keep Your Job in the AI Era',
  description: 'Practice real work tasks with AI. Get scored. Learn the expert way. Stay indispensable.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
