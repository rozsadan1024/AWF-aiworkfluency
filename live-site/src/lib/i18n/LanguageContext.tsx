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
    // Check URL param first, then localStorage
    const urlParam = new URLSearchParams(window.location.search).get('lang');
    if (urlParam === 'en' || urlParam === 'hu') {
      setLangState(urlParam);
      localStorage.setItem('app_lang', urlParam);
      return;
    }
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
