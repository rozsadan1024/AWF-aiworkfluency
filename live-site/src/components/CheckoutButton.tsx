'use client';

import { useState } from 'react';

export function CheckoutButton({
  tier,
  children,
  className,
  fallbackHref,
  locale,
}: {
  tier: 'basic' | 'pro';
  children: React.ReactNode;
  className?: string;
  fallbackHref?: string;
  locale?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, locale }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      if (fallbackHref) {
        window.location.href = fallbackHref;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? '...' : children}
    </button>
  );
}
