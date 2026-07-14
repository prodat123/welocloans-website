import { useMemo, useState } from "react";
import { formatCurrency, calcMonthly } from "../../utils/mortgage";
import SliderInput from "./SliderInput";

export default function PaymentCalculator() {
  const [price, setPrice] = useState(550000);
  const [down, setDown] = useState(10);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const [taxRate, setTaxRate] = useState(1.25);
  const [insRate, setInsRate] = useState(0.35);
  const [hoa, setHoa] = useState(0);

  const loanAmount = useMemo(() => price * (1 - down / 100), [price, down]);
  const pi = useMemo(
    () => calcMonthly(loanAmount, rate, term),
    [loanAmount, rate, term],
  );
  const tax = useMemo(() => (price * (taxRate / 100)) / 12, [price, taxRate]);
  const insurance = useMemo(
    () => (price * (insRate / 100)) / 12,
    [price, insRate],
  );
  const pmi = useMemo(
    () => (down < 20 ? (loanAmount * 0.006) / 12 : 0),
    [down, loanAmount],
  );
  const total = pi + tax + insurance + pmi + hoa;

  const rows = [
    { label: "Principal & Interest", value: pi, color: "bg-white" },
    { label: "Property Tax", value: tax, color: "bg-blue-300" },
    { label: "Home Insurance", value: insurance, color: "bg-coral-400" },
    ...(pmi > 0
      ? [{ label: "PMI", value: pmi, color: "bg-amber-400" }]
      : []),
    ...(hoa > 0 ? [{ label: "HOA Dues", value: hoa, color: "bg-slate-300" }] : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="bg-white border border-slate-200/70 rounded-2xl p-7 shadow-card">
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
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  term === y
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:shadow-xs"
                }`}
              >
                {y} yr
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <SliderInput
            label="Tax Rate"
            value={taxRate}
            min={0}
            max={3}
            step={0.05}
            unit="%"
            onChange={setTaxRate}
            display={`${taxRate.toFixed(2)}%`}
          />
          <SliderInput
            label="Insurance"
            value={insRate}
            min={0}
            max={1.5}
            step={0.05}
            unit="%"
            onChange={setInsRate}
            display={`${insRate.toFixed(2)}%`}
          />
          <SliderInput
            label="HOA / mo"
            value={hoa}
            min={0}
            max={800}
            step={10}
            unit="$"
            onChange={setHoa}
          />
        </div>
        {down < 20 && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mt-1">
            Down payments under 20% typically require PMI, included below.
          </p>
        )}
      </div>

      {/* Result */}
      <div className="bg-blue-700 rounded-2xl p-8 shadow-lg text-center flex flex-col items-center">
        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
          Estimated Monthly Payment
        </p>
        <p className="text-6xl font-extrabold text-white leading-none mb-8">
          {formatCurrency(total)}
        </p>

        {/* Stacked bar breakdown */}
        <div className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-blue-900/40 shadow-inner">
          {rows.map((r) => (
            <div
              key={r.label}
              className={r.color}
              style={{ width: `${(r.value / total) * 100}%` }}
            />
          ))}
        </div>

        <div className="w-full max-w-sm space-y-2.5 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-blue-200">
                <span className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                {r.label}
              </span>
              <span className="font-semibold text-white">
                {formatCurrency(r.value)}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm border-t border-blue-500/40 mt-6 pt-5 grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-blue-300 text-[11px] uppercase tracking-wider mb-0.5">
              Loan Amount
            </p>
            <p className="text-white font-bold">{formatCurrency(loanAmount)}</p>
          </div>
          <div>
            <p className="text-blue-300 text-[11px] uppercase tracking-wider mb-0.5">
              Cash at Closing
            </p>
            <p className="text-white font-bold">
              {formatCurrency(price * (down / 100))}
            </p>
          </div>
        </div>

        <a
          href="/#contact"
          className="mt-7 w-full max-w-sm flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-blue-700 font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
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
  );
}
