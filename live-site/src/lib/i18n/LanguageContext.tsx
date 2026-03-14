'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dictionaries, defaultLocale, Locale } from './dictionaries';

interface LanguageContextType {
  lang: Locale;
  t: Record<string, string>;
  setLang: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: defaultLocale,
  t: dictionaries[defaultLocale],
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // 1. Check ?lang= query param
    const urlParam = new URLSearchParams(window.location.search).get('lang');
    if (urlParam === 'en' || urlParam === 'hu') {
      setLangState(urlParam);
      localStorage.setItem('app_lang', urlParam);
      return;
    }
    // 2. Detect locale from URL path (e.g. /hu, /hu/..., /corp/hu, /eu-ai-act/hu)
    const pathParts = window.location.pathname.split('/');
    const pathLocale = pathParts.find(p => p === 'hu' || p === 'en');
    if (pathLocale === 'en' || pathLocale === 'hu') {
      setLangState(pathLocale);
      localStorage.setItem('app_lang', pathLocale);
      return;
    }
    // 3. Fall back to localStorage
    const stored = localStorage.getItem('app_lang') as Locale | null;
    if (stored && (stored === 'en' || stored === 'hu')) {
      setLangState(stored);
    }
  }, []);

  function setLang(newLang: Locale) {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  }

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
