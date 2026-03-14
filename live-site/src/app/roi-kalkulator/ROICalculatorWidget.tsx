'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function ROICalculatorWidget() {
  const { t, lang } = useLanguage();
  const isHu = lang === 'hu';
  const currencySymbol = isHu ? '' : '€';
  const currencySuffix = isHu ? ' Ft' : '';
  const defaultSalary = isHu ? 800000 : 2500;
  const awfPerSeat = isHu ? 7500 : 19;

  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [salary, setSalary] = useState(defaultSalary);

  const hourlyRate = salary / 160;
  const totalAiTimeCost = employees * hoursPerWeek * 4 * hourlyRate;
  const savings = totalAiTimeCost * 0.2;
  const awfCost = employees * awfPerSeat;
  const netRoi = savings - awfCost;
  const paybackMonths = savings > 0 ? awfCost / savings : 0;

  const fmt = (n: number) => `${currencySymbol}${Math.round(n).toLocaleString()}${currencySuffix}`;
  const fmtRate = (n: number) => `${currencySymbol}${n.toFixed(1)}${currencySuffix}`;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">{t.roi_params}</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t.roi_employees_label}
          </label>
          <input
            type="number"
            min={1}
            max={1000}
            value={employees}
            onChange={(e) => setEmployees(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t.roi_hours_label}
          </label>
          <input
            type="number"
            min={0.5}
            max={40}
            step={0.5}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t.roi_salary_label}
          </label>
          <input
            type="number"
            min={isHu ? 200000 : 500}
            max={isHu ? 5000000 : 20000}
            step={isHu ? 50000 : 100}
            value={salary}
            onChange={(e) => setSalary(Math.max(isHu ? 200000 : 500, parseInt(e.target.value) || (isHu ? 200000 : 500)))}
            className="input-field"
          />
        </div>

        <p className="text-xs text-gray-400">
          {t.roi_assumption}
        </p>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t.roi_results}</h2>

        <div className="space-y-4">
          <div className="card bg-gray-50 border-gray-200">
            <div className="text-sm text-gray-600 font-medium">{t.roi_total_cost}</div>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{fmt(totalAiTimeCost)}</div>
            <div className="text-xs text-gray-500 mt-1">
              {employees} {t.roi_total_cost_detail} &times; {hoursPerWeek} {t.roi_hours_unit} &times; 4 {t.roi_weeks} &times; {fmtRate(hourlyRate)}{t.roi_hourly}
            </div>
          </div>

          <div className="card bg-green-50 border-green-200">
            <div className="text-sm text-green-600 font-medium">{t.roi_savings}</div>
            <div className="text-2xl font-extrabold text-green-700 mt-1">{fmt(savings)}</div>
            <div className="text-xs text-green-600 mt-1">
              {t.roi_savings_detail}
            </div>
          </div>

          <div className="card bg-gray-50">
            <div className="text-sm text-gray-600 font-medium">{t.roi_awf_cost}</div>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{fmt(awfCost)}</div>
            <div className="text-xs text-gray-500 mt-1">{employees} {t.roi_total_cost_detail} &times; {currencySymbol}{awfPerSeat.toLocaleString()}{currencySuffix}{t.roi_awf_detail}</div>
          </div>

          <div className={`card ${netRoi >= 0 ? 'bg-brand-50 border-brand-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="text-sm font-medium" style={{ color: netRoi >= 0 ? '#2563eb' : '#d97706' }}>
              {t.roi_net}
            </div>
            <div className="text-3xl font-extrabold mt-1" style={{ color: netRoi >= 0 ? '#2563eb' : '#d97706' }}>
              {netRoi >= 0 ? '+' : ''}{fmt(netRoi)}
            </div>
            {paybackMonths > 0 && paybackMonths < 12 && (
              <div className="text-xs text-gray-500 mt-1">
                {t.roi_payback} {paybackMonths < 1 ? t.roi_payback_immediate : `${paybackMonths.toFixed(1)} ${t.roi_payback_months}`}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="md:col-span-2 mt-4 border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-400 text-center">
          {t.roi_disclaimer}
        </p>
      </div>
    </div>
  );
}
