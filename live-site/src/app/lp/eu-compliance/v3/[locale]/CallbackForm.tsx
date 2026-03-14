'use client';

import { useState, type FormEvent } from 'react';

const labels = {
  hu: {
    name: 'Név',
    company: 'Cégnév',
    email: 'E-mail',
    phone: 'Telefonszám',
    submit: 'Visszahívást kérek',
    success: 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.',
    error: 'Hiba történt, kérjük próbálja újra.',
    namePlaceholder: 'Teljes név',
    companyPlaceholder: 'Cég neve',
    emailPlaceholder: 'pelda@ceg.hu',
    phonePlaceholder: '+36 ...',
  },
  en: {
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone number',
    submit: 'Request callback',
    success: 'Thank you! We will contact you shortly.',
    error: 'Something went wrong, please try again.',
    namePlaceholder: 'Full name',
    companyPlaceholder: 'Company name',
    emailPlaceholder: 'you@company.com',
    phonePlaceholder: '+36 ...',
  },
} as const;

type Locale = keyof typeof labels;

interface CallbackFormProps {
  locale: string;
}

export default function CallbackForm({ locale }: CallbackFormProps) {
  const t = labels[(locale as Locale) in labels ? (locale as Locale) : 'hu'];

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          source: 'eu-compliance-v3-callback',
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-green-500/30 bg-green-500/10 p-6">
        <p className="text-sm text-green-400 font-medium">{t.success}</p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#00a9f4] transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-1.5">
          {t.name}
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-1.5">
          {t.company}
        </label>
        <input
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={t.companyPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-1.5">
          {t.email}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-1.5">
          {t.phone}
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phonePlaceholder}
          className={inputClass}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">{t.error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#00a9f4] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'sending' ? '...' : t.submit}
      </button>
    </form>
  );
}
