'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem('cookie-consent', 'all');
    setVisible(false);
  }

  function acceptNecessary() {
    localStorage.setItem('cookie-consent', 'necessary');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#051c2c] border-t border-white/10 shadow-2xl">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
          Ez a weboldal cookie-kat (sütiket) használ a működés biztosítása és a felhasználói élmény javítása érdekében.
          Részletek az{' '}
          <a href="/privacy" className="text-[#00a9f4] hover:underline">adatvédelmi tájékoztatóban</a>.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={acceptNecessary}
            className="text-sm text-white/50 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 transition-colors"
          >
            Csak szükségesek
          </button>
          <button
            onClick={acceptAll}
            className="text-sm text-white font-semibold bg-[#00a9f4] hover:bg-[#0090d0] px-5 py-2 transition-colors"
          >
            Elfogadom
          </button>
        </div>
      </div>
    </div>
  );
}
