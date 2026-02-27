'use client';

import { useState } from 'react';

export function ROICalculatorWidget() {
  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [salary, setSalary] = useState(2500);

  const hourlyRate = salary / 160;
  const totalAiTimeCost = employees * hoursPerWeek * 4 * hourlyRate;
  const savings = totalAiTimeCost * 0.2;
  const awfCost = employees * 19;
  const netRoi = savings - awfCost;
  const paybackMonths = savings > 0 ? awfCost / savings : 0;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Paraméterek</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Alkalmazottak száma
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
            AI-feladatokra fordított idő (óra/hét/fő)
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
            Átlagos bruttó bér (EUR/hó)
          </label>
          <input
            type="number"
            min={500}
            max={20000}
            step={100}
            value={salary}
            onChange={(e) => setSalary(Math.max(500, parseInt(e.target.value) || 500))}
            className="input-field"
          />
        </div>

        <p className="text-xs text-gray-400">
          A kalkuláció 20%-os hatékonyságjavulást feltételez az AI-feladatok terén.
        </p>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Eredmények</h2>

        <div className="space-y-4">
          <div className="card bg-gray-50 border-gray-200">
            <div className="text-sm text-gray-600 font-medium">A csapat AI-feladatokra fordított összköltsége/hó</div>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">&euro;{Math.round(totalAiTimeCost).toLocaleString('hu-HU')}</div>
            <div className="text-xs text-gray-500 mt-1">
              {employees} fő &times; {hoursPerWeek} óra/hét &times; 4 hét &times; &euro;{hourlyRate.toFixed(1)}/óra
            </div>
          </div>

          <div className="card bg-green-50 border-green-200">
            <div className="text-sm text-green-600 font-medium">Becsült megtakarítás/hó (20%-os hatékonyságjavulás)</div>
            <div className="text-2xl font-extrabold text-green-700 mt-1">&euro;{Math.round(savings).toLocaleString('hu-HU')}</div>
            <div className="text-xs text-green-600 mt-1">
              Ha a csapat 20%-kal kevesebb idő alatt végzi el ugyanazokat az AI-feladatokat
            </div>
          </div>

          <div className="card bg-gray-50">
            <div className="text-sm text-gray-600 font-medium">AI Work Fluency havi díj</div>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">&euro;{awfCost.toLocaleString('hu-HU')}</div>
            <div className="text-xs text-gray-500 mt-1">{employees} fő &times; &euro;19/fő/hó (Starter)</div>
          </div>

          <div className={`card ${netRoi >= 0 ? 'bg-brand-50 border-brand-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="text-sm font-medium" style={{ color: netRoi >= 0 ? '#2563eb' : '#d97706' }}>
              Nettó ROI/hó
            </div>
            <div className="text-3xl font-extrabold mt-1" style={{ color: netRoi >= 0 ? '#2563eb' : '#d97706' }}>
              {netRoi >= 0 ? '+' : ''}&euro;{Math.round(netRoi).toLocaleString('hu-HU')}
            </div>
            {paybackMonths > 0 && paybackMonths < 12 && (
              <div className="text-xs text-gray-500 mt-1">
                Megtérülés: {paybackMonths < 1 ? 'azonnal' : `${paybackMonths.toFixed(1)} hónap`}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="md:col-span-2 mt-4 border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-400 text-center">
          Ez a kalkulátor kizárólag tájékoztató jellegű becslést ad. A tényleges eredmények a csapat összetételétől, az iparágtól és számos egyéb tényezőtől függenek. Az itt megjelenő számok nem minősülnek ígéretnek vagy garanciának.
        </p>
      </div>
    </div>
  );
}
