'use client';

import { useState, useCallback, useEffect } from 'react';

const labels = {
  hu: {
    orgSize: 'Szervezet mérete',
    employees: 'fő',
    revenue: 'Éves árbevétel',
    revenueUnit: 'M Ft',
    maxFine: 'Max. bírság kockázat',
    awfLabel: 'AI Work Fluency egyszeri díja',
    awfSub: 'Egyszeri bevezetési díj',
    fineCompare: 'a maximális bírságnak',
  },
  en: {
    orgSize: 'Organization size',
    employees: 'employees',
    revenue: 'Annual revenue',
    revenueUnit: 'M HUF',
    maxFine: 'Max fine risk',
    awfLabel: 'AI Work Fluency one-time cost',
    awfSub: 'One-time implementation fee',
    fineCompare: 'of the maximum fine',
  },
} as const;

type Locale = keyof typeof labels;

interface RiskCalculatorProps {
  locale: string;
  onHeadcountChange?: (count: number) => void;
}

function getRevenueMultiplier(revenueM: number): number {
  if (revenueM <= 100) return 1.0;
  if (revenueM <= 200) return 1.0 + ((revenueM - 100) / 100) * 0.5;
  if (revenueM <= 300) return 1.5 + ((revenueM - 200) / 100) * 0.3;
  // 300–10000: linear from 1.8 to 3.0
  return 1.8 + ((revenueM - 300) / 9700) * 1.2;
}

const ALAP_PER_FO = 16_000;
const MIN_PRICE = 350_000;
const HUF_EUR_RATE = 400;

export default function RiskCalculator({ locale, onHeadcountChange }: RiskCalculatorProps) {
  const t = labels[(locale as Locale) in labels ? (locale as Locale) : 'hu'];

  const [headcount, setHeadcount] = useState(30);
  const [revenue, setRevenue] = useState(500);

  const multiplier = getRevenueMultiplier(revenue);
  const awfCost = Math.max(MIN_PRICE, Math.round(headcount * ALAP_PER_FO * multiplier));
  const maxFineHuf = revenue * 1_000_000 * 0.07;
  const maxFineEur = Math.round(maxFineHuf / HUF_EUR_RATE);
  const finePercent = maxFineHuf > 0 ? ((awfCost / maxFineHuf) * 100).toFixed(1) : '0';

  const handleHeadcount = useCallback(
    (val: number) => {
      setHeadcount(val);
      onHeadcountChange?.(val);
    },
    [onHeadcountChange],
  );

  useEffect(() => {
    onHeadcountChange?.(headcount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fmt = (n: number) => n.toLocaleString(locale === 'en' ? 'en-US' : 'hu-HU');

  return (
    <div className="border border-gray-200 bg-white p-5 sm:p-8">
      {/* Sliders */}
      <div className="space-y-8">
        {/* Headcount */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-base sm:text-sm font-semibold text-[#051c2c]">{t.orgSize}</label>
            <span className="text-base sm:text-sm tabular-nums text-[#051c2c] font-semibold">
              {headcount} {t.employees}
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            value={headcount}
            onChange={(e) => handleHeadcount(Number(e.target.value))}
            className="risk-range w-full"
          />
          <div className="flex justify-between text-sm sm:text-xs text-gray-400 mt-1">
            <span>10</span>
            <span>500</span>
          </div>
        </div>

        {/* Revenue */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-base sm:text-sm font-semibold text-[#051c2c]">{t.revenue}</label>
            <span className="text-base sm:text-sm tabular-nums text-[#051c2c] font-semibold">
              {fmt(revenue)} {t.revenueUnit}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={10000}
            step={100}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="risk-range w-full"
          />
          <div className="flex justify-between text-sm sm:text-xs text-gray-400 mt-1">
            <span>100</span>
            <span>10 000</span>
          </div>
        </div>
      </div>

      {/* Results — AWF cost is PRIMARY */}
      <div className="mt-8 space-y-4">
        {/* AWF cost — big, primary, blue */}
        <div className="border-2 border-[#00a9f4] bg-[#00a9f4]/5 p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#00a9f4] mb-2">
            {t.awfLabel}
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-[#051c2c] tabular-nums">
            {fmt(awfCost)} Ft
          </p>
          <p className="text-base sm:text-sm text-gray-500 mt-1">
            {t.awfSub}
          </p>
          <p className="text-sm text-[#00a9f4] font-semibold mt-2">
            {finePercent}% {t.fineCompare}
          </p>
        </div>

        {/* Fine risk — secondary, smaller, muted red */}
        <div className="border border-red-200 bg-red-50/40 p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm sm:text-xs font-semibold uppercase tracking-wide text-red-400">
              {t.maxFine}
            </p>
            <p className="text-lg font-bold text-red-600 tabular-nums">
              {fmt(Math.round(maxFineHuf))} Ft
            </p>
          </div>
          <p className="text-sm sm:text-xs text-red-400 tabular-nums text-right mt-0.5">
            ~{fmt(maxFineEur)} EUR
          </p>
        </div>
      </div>

      {/* Inline range slider styling */}
      <style jsx>{`
        .risk-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: #e5e7eb;
          outline: none;
        }
        .risk-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #00a9f4;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        }
        .risk-range::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #00a9f4;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
          border-radius: 0;
        }
        .risk-range::-webkit-slider-runnable-track {
          height: 6px;
        }
        .risk-range::-moz-range-track {
          height: 6px;
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
