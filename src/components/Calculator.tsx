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

const PROGRAMS = [
  {
    id: "lipa",
    shortName: "LIPA",
    name: "LA City LIPA",
    tagline: "Up to $161,000 silent second — $0/month on assistance",
    firstLoan: (price: number) => Math.max(price * 0.14, price * 0.99 - 161000),
    buyerCash: (price: number) => price * 0.01,
    aid: (price: number) => Math.min(161000, price * 0.85),
    aidLabel: "Silent 2nd mortgage",
    aidNote: "$0/month — repaid when you sell",
  },
  {
    id: "calhfa",
    shortName: "CalHFA",
    name: "CalHFA Dream for All",
    tagline:
      "State covers 20% of purchase price — no interest or monthly payment",
    firstLoan: (price: number) => price * 0.765,
    buyerCash: (price: number) => price * 0.035,
    aid: (price: number) => price * 0.2,
    aidLabel: "Shared appreciation loan",
    aidNote: "No interest, no monthly payment",
  },
  {
    id: "hop",
    shortName: "HOP",
    name: "LA County HOP",
    tagline: "Down payment & closing costs covered — keep your cash",
    firstLoan: (price: number) => price * 0.965,
    buyerCash: (_price: number) => 0,
    aid: (price: number) => price * 0.035,
    aidLabel: "Deferred assistance",
    aidNote: "$0/month — repaid at sale",
  },
];

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
  const [selectedProgramId, setSelectedProgramId] = useState("lipa");

  const prog = PROGRAMS.find((p) => p.id === selectedProgramId) ?? PROGRAMS[0];

  // Before (standard)
  const loanAmount = useMemo(() => price * (1 - down / 100), [price, down]);
  const tax = useMemo(() => Math.round((price * 0.0125) / 12), [price]);
  const insurance = useMemo(() => Math.round((price * 0.0035) / 12), [price]);
  const pi = useMemo(
    () => calcMonthly(loanAmount, rate, term),
    [loanAmount, rate, term],
  );
  const beforeTotal = pi + tax + insurance;
  const beforeCash = price * (down / 100);

  // After (with program)
  const afterLoan = useMemo(() => prog.firstLoan(price), [prog, price]);
  const afterAid = useMemo(() => prog.aid(price), [prog, price]);
  const afterCash = useMemo(() => prog.buyerCash(price), [prog, price]);
  const afterPi = useMemo(
    () => calcMonthly(afterLoan, rate, term),
    [afterLoan, rate, term],
  );
  const afterTotal = afterPi + tax + insurance;

  const monthlySavings = beforeTotal - afterTotal;
  const cashSavings = beforeCash - afterCash;

  return (
    <section id="calculator" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Loan Calculator
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            See how much a program saves you
          </h2>
          <p className="text-lg text-slate-500 max-w-xl">
            Adjust the sliders and pick a program to see how your monthly
            payment changes.
          </p>
        </div>

        {/* Top row: sliders + program picker */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-6">
          {/* Sliders */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">
                    Tax / mo
                  </span>
                  <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg">
                    {formatCurrency(tax)}
                  </span>
                </div>
                <p className="text-xs text-slate-400">1.25% annually</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-600">
                    Insurance / mo
                  </span>
                  <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg">
                    {formatCurrency(insurance)}
                  </span>
                </div>
                <p className="text-xs text-slate-400">0.35% annually</p>
              </div>
            </div>
          </div>

          {/* Program selector + quick summary */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                Choose a program to compare
              </p>
              <div className="flex gap-2 mb-3">
                {PROGRAMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProgramId(p.id)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                      selectedProgramId === p.id
                        ? "bg-blue-700 border-blue-700 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
                    }`}
                  >
                    {p.shortName}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 text-center">
                {prog.tagline}
              </p>
            </div>

            {/* Quick stats */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-2 gap-4">
              {[
                {
                  label: "Standard loan amount",
                  value: formatCurrency(loanAmount),
                },
                {
                  label: `${prog.shortName} first loan`,
                  value: formatCurrency(afterLoan),
                },
                {
                  label: "Your cash at closing",
                  value: formatCurrency(beforeCash),
                },
                {
                  label: `Cash with ${prog.shortName}`,
                  value: formatCurrency(afterCash),
                },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[11px] text-slate-400 mb-0.5">{s.label}</p>
                  <p className="text-base font-extrabold text-slate-800">
                    {s.value}
                  </p>
                </div>
              ))}
              <div className="col-span-2 border-t border-slate-100 pt-3 mt-1">
                <p className="text-[11px] text-slate-400 mb-0.5">
                  {prog.aidLabel}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-base font-extrabold text-slate-800">
                    {formatCurrency(afterAid)}
                  </p>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {prog.aidNote}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Before / After comparison */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            {/* Before */}
            <div className="bg-slate-100 p-8 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Without a Program
              </p>
              <p className="text-6xl font-extrabold text-slate-700 leading-none mb-1">
                {formatCurrency(beforeTotal)}
              </p>
              <p className="text-sm text-slate-400 mb-6">per month</p>
              <div className="w-full max-w-[200px] space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">P&amp;I</span>
                  <span className="font-semibold text-slate-600">
                    {formatCurrency(pi)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax + Insurance</span>
                  <span className="font-semibold text-slate-600">
                    {formatCurrency(tax + insurance)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-400">Down payment</span>
                  <span className="font-semibold text-slate-600">
                    {formatCurrency(beforeCash)}
                  </span>
                </div>
              </div>
            </div>

            {/* Center divider */}
            <div className="bg-blue-700 flex flex-col items-center justify-center px-6 py-8 gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 opacity-60 hidden md:block"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              <div className="text-center">
                {monthlySavings > 5 ? (
                  <>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">
                      You save
                    </p>
                    <p className="text-3xl font-extrabold text-white leading-none">
                      {formatCurrency(monthlySavings)}
                    </p>
                    <p className="text-blue-200 text-xs mt-1">per month</p>
                    <p className="text-blue-300 text-xs mt-0.5">
                      {formatCurrency(monthlySavings * 12)}/yr
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">
                      You keep
                    </p>
                    <p className="text-3xl font-extrabold text-white leading-none">
                      {formatCurrency(Math.max(0, cashSavings))}
                    </p>
                    <p className="text-blue-200 text-xs mt-1">at closing</p>
                  </>
                )}
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 opacity-60 hidden md:block"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            {/* After */}
            <div className="bg-blue-700 p-8 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">
                With {prog.name}
              </p>
              <p className="text-6xl font-extrabold text-white leading-none mb-1">
                {formatCurrency(afterTotal)}
              </p>
              <p className="text-sm text-blue-300 mb-6">per month</p>
              <div className="w-full max-w-[200px] space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-300">P&amp;I</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(afterPi)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Tax + Insurance</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(tax + insurance)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-blue-600 pt-2">
                  <span className="text-blue-300">Cash at closing</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(afterCash)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">{prog.aidLabel}</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(afterAid)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="bg-slate-800 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              * Illustrative estimates only. Tax, insurance, and PMI may vary.
              Contact us for an official quote.
            </p>
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              Get Pre-Qualified
              <svg
                width="14"
                height="14"
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
          </div>
        </div>
      </div>
    </section>
  );
}
