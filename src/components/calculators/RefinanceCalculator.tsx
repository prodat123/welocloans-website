import { useMemo, useState } from "react";
import { formatCurrency, calcMonthly } from "../../utils/mortgage";
import SliderInput from "./SliderInput";

export default function RefinanceCalculator() {
  const [balance, setBalance] = useState(400000);
  const [currentRate, setCurrentRate] = useState(7.25);
  const [remainingTerm, setRemainingTerm] = useState(27);
  const [newRate, setNewRate] = useState(6.25);
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(6000);

  const currentPayment = useMemo(
    () => calcMonthly(balance, currentRate, remainingTerm),
    [balance, currentRate, remainingTerm],
  );
  const newPayment = useMemo(
    () => calcMonthly(balance, newRate, newTerm),
    [balance, newRate, newTerm],
  );
  const monthlySavings = currentPayment - newPayment;
  const breakEvenMonths =
    monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : null;
  const lifetimeSavings =
    monthlySavings * Math.min(remainingTerm, newTerm) * 12 - closingCosts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="bg-white border border-slate-200/70 rounded-2xl p-7 shadow-card">
        <SliderInput
          label="Current Loan Balance"
          value={balance}
          min={50000}
          max={1500000}
          step={1000}
          unit="$"
          onChange={setBalance}
        />
        <SliderInput
          label="Current Interest Rate"
          value={currentRate}
          min={2}
          max={12}
          step={0.01}
          unit="%"
          onChange={setCurrentRate}
          display={`${currentRate.toFixed(2)}%`}
        />
        <SliderInput
          label="Years Remaining on Current Loan"
          value={remainingTerm}
          min={1}
          max={30}
          step={1}
          unit=" yr"
          onChange={setRemainingTerm}
        />
        <SliderInput
          label="New Interest Rate"
          value={newRate}
          min={2}
          max={12}
          step={0.01}
          unit="%"
          onChange={setNewRate}
          display={`${newRate.toFixed(2)}%`}
        />
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            New Loan Term
          </label>
          <div className="flex gap-2">
            {[15, 20, 30].map((y) => (
              <button
                key={y}
                onClick={() => setNewTerm(y)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  newTerm === y
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:shadow-xs"
                }`}
              >
                {y} yr
              </button>
            ))}
          </div>
        </div>
        <SliderInput
          label="Estimated Closing Costs"
          value={closingCosts}
          min={0}
          max={20000}
          step={250}
          unit="$"
          onChange={setClosingCosts}
        />
      </div>

      {/* Result */}
      <div className="bg-blue-700 rounded-2xl p-8 shadow-lg text-center flex flex-col items-center">
        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
          {monthlySavings > 0 ? "Estimated Monthly Savings" : "Monthly Change"}
        </p>
        <p className="text-6xl font-extrabold text-white leading-none mb-1">
          {monthlySavings > 0 ? "+" : ""}
          {formatCurrency(monthlySavings)}
        </p>
        <p className="text-blue-300 text-sm mb-8">per month</p>

        <div className="w-full max-w-sm space-y-2.5 text-sm mb-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Current payment (P&amp;I)</span>
            <span className="font-semibold text-white">
              {formatCurrency(currentPayment)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-200">New payment (P&amp;I)</span>
            <span className="font-semibold text-white">
              {formatCurrency(newPayment)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-blue-500/40 pt-2.5">
            <span className="text-blue-200">Break-even point</span>
            <span className="font-semibold text-white">
              {breakEvenMonths !== null
                ? `${breakEvenMonths} months`
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-200">
              Net savings over remaining term
            </span>
            <span className="font-semibold text-white">
              {formatCurrency(Math.max(0, lifetimeSavings))}
            </span>
          </div>
        </div>

        <a
          href="/#contact"
          className="w-full max-w-sm flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-blue-700 font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          Talk to a Loan Officer
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
        <p className="text-[10px] text-blue-300 mt-4 max-w-sm">
          Illustrative estimate only. Actual refinance terms depend on credit,
          equity, and current market rates.
        </p>
      </div>
    </div>
  );
}
