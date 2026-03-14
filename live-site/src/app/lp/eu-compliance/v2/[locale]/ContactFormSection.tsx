'use client';

import { useState, FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

interface ContactFormSectionProps {
  title: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitLabel: string;
}

export default function ContactFormSection({
  title,
  nameLabel,
  emailLabel,
  companyLabel,
  phoneLabel,
  messageLabel,
  submitLabel,
}: ContactFormSectionProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#051c2c]" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">
              {title}
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl text-[#051c2c] font-bold">{title}</h2>
        </div>

        {sent ? (
          <div className="bg-[#f0fdf4] border border-green-200 p-8 text-center">
            <div className="w-12 h-12 bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[#051c2c] mb-2">
              {title === 'Kapcsolat' ? 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.' : 'Thank you! We\'ll be in touch shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-[#051c2c] mb-1.5">
                {nameLabel} *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#00a9f4] focus:ring-1 focus:ring-[#00a9f4] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-[#051c2c] mb-1.5">
                {emailLabel} *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#00a9f4] focus:ring-1 focus:ring-[#00a9f4] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-company" className="block text-sm font-semibold text-[#051c2c] mb-1.5">
                {companyLabel} *
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#00a9f4] focus:ring-1 focus:ring-[#00a9f4] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-semibold text-[#051c2c] mb-1.5">
                {phoneLabel}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#00a9f4] focus:ring-1 focus:ring-[#00a9f4] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-[#051c2c] mb-1.5">
                {messageLabel} *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#00a9f4] focus:ring-1 focus:ring-[#00a9f4] transition-colors resize-vertical"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="bg-[#051c2c] hover:bg-[#0a3152] text-white font-semibold text-base py-3.5 px-8 inline-flex items-center gap-3 transition-colors group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? '...' : submitLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
