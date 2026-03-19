'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

function FaqEntry({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 transition-colors hover:bg-[#f7f7f7]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left"
      >
        <span className="text-base sm:text-sm font-bold text-[#051c2c] leading-snug">{item.q}</span>
        <span
          className="shrink-0 w-5 h-5 flex items-center justify-center text-[#051c2c] transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-200"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-200 px-5 pb-5 pt-4">
            <p className="text-base sm:text-sm leading-relaxed text-gray-500">{item.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <FaqEntry key={i} item={item} />
      ))}
    </div>
  );
}
