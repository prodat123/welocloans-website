import { useState, useMemo, useRef } from "react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function calcMonthly(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  display?: string;
}) {
  // Use a ref to track the live drag value for display only,
  // and commit to state on pointer-up so React doesn't fight the thumb.
  const displayRef = useRef<HTMLSpanElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <span
          ref={displayRef}
          className="text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg"
        >
          {display ??
            (unit === "$" ? formatCurrency(value) : `${value}${unit}`)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        onInput={(e) => {
          const v = Number((e.target as HTMLInputElement).value);
          if (displayRef.current) {
            displayRef.current.textContent =
              unit === "$"
                ? formatCurrency(v)
                : unit === "%"
                  ? `${v.toFixed(step < 1 ? 2 : 0)}%`
                  : `${v}${unit}`;
          }
        }}
        onPointerUp={(e) =>
          onChange(Number((e.target as HTMLInputElement).value))
        }
        onKeyUp={(e) => onChange(Number((e.target as HTMLInputElement).value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #2a7c8a 0%, #2a7c8a ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
        }}
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{unit === "$" ? formatCurrency(min) : `${min}${unit}`}</span>
        <span>{unit === "$" ? formatCurrency(max) : `${max}${unit}`}</span>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [price, setPrice] = useState(450000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const loanAmount = useMemo(() => price * (1 - down / 100), [price, down]);
  const tax = useMemo(() => Math.round((price * 0.0125) / 12), [price]);
  const insurance = useMemo(() => Math.round((price * 0.0035) / 12), [price]);
  const pi = useMemo(
    () => calcMonthly(loanAmount, rate, term),
    [loanAmount, rate, term],
  );
  const total = pi + tax + insurance;

  const piPct = (pi / total) * 100;
  const taxPct = (tax / total) * 100;
  const insPct = (insurance / total) * 100;

  return (
    <section id="calculator" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Loan Calculator
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Estimate your monthly payment
          </h2>
          <p className="text-lg text-slate-500 max-w-xl">
            Adjust the sliders to see real-time estimates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Sliders */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
            <SliderInput
              label="Home Price"
              value={price}
              min={100000}
              max={2000000}
              step={1000}
              unit="$"
              onChange={setPrice}
            />
            <SliderInput
              label="Down Payment"
              value={down}
              min={0}
              max={50}
              step={0.5}
              unit="%"
              onChange={setDown}
              display={`${down}% (${formatCurrency((price * down) / 100)})`}
            />
            <SliderInput
              label="Interest Rate"
              value={rate}
              min={2}
              max={12}
              step={0.01}
              unit="%"
              onChange={setRate}
              display={`${rate.toFixed(2)}%`}
            />
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Loan Term
              </label>
              <div className="flex gap-2">
                {[10, 15, 20, 30].map((y) => (
                  <button
                    key={y}
                    onClick={() => setTerm(y)}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      term === y
                        ? "bg-blue-700 text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
                    }`}
                  >
                    {y} yr
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-600">Property Tax / mo</label>
                <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg">{formatCurrency(tax)}</span>
              </div>
              <p className="text-xs text-slate-400">Estimated at 1.25% of home price annually</p>
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-600">Insurance / mo</label>
                <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg">{formatCurrency(insurance)}</span>
              </div>
              <p className="text-xs text-slate-400">Estimated at 0.35% of home price annually</p>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col gap-5">
            <div className="bg-blue-700 rounded-2xl p-7 text-center">
              <p className="text-xs font-bold tracking-widest uppercase text-blue-200 mb-2">
                Estimated Monthly Payment
              </p>
              <p className="text-6xl font-extrabold text-white tracking-tight mb-1">
                {formatCurrency(total)}
              </p>
              <p className="text-sm text-blue-200">
                Loan amount: {formatCurrency(loanAmount)}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">
                Payment Breakdown
              </p>
              <div className="flex h-2.5 rounded-full overflow-hidden mb-5 gap-0.5">
                <div
                  className="bg-blue-700 transition-all rounded-l-full"
                  style={{ width: `${piPct}%` }}
                />
                <div
                  className="bg-blue-400 transition-all"
                  style={{ width: `${taxPct}%` }}
                />
                <div
                  className="bg-blue-200 transition-all rounded-r-full"
                  style={{ width: `${insPct}%` }}
                />
              </div>
              {[
                {
                  label: "Principal & Interest",
                  value: pi,
                  color: "bg-blue-700",
                },
                { label: "Property Tax", value: tax, color: "bg-blue-400" },
                {
                  label: "Home Insurance",
                  value: insurance,
                  color: "bg-blue-200",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                    <span className="text-sm text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              Get Pre-Qualified Today
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <p className="text-center text-[10px] text-slate-400">
              * Estimates are for illustrative purposes only. Contact us for an
              official quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
