import { useMemo, useState } from "react";
import { formatCurrency, calcMonthly } from "../../utils/mortgage";
import SliderInput from "./SliderInput";

const TAX_RATE = 1.25;
const INS_RATE = 0.35;

export default function AffordabilityCalculator() {
  const [income, setIncome] = useState(95000);
  const [debts, setDebts] = useState(400);
  const [down, setDown] = useState(40000);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const [dti, setDti] = useState(43);

  const result = useMemo(() => {
    const monthlyIncome = income / 12;
    const housingBudget = Math.max(0, monthlyIncome * (dti / 100) - debts);
    const factor = calcMonthly(1, rate, term);
    const taxInsFactor = (TAX_RATE + INS_RATE) / 1200;
    const price = (housingBudget + down * factor) / (factor + taxInsFactor);
    const loanAmount = Math.max(0, price - down);
    const pi = calcMonthly(loanAmount, rate, term);
    const tax = (price * TAX_RATE) / 1200;
    const insurance = (price * INS_RATE) / 1200;
    return {
      price: Math.max(0, price),
      loanAmount,
      pi,
      tax,
      insurance,
      housingBudget,
      total: pi + tax + insurance,
    };
  }, [income, debts, down, rate, term, dti]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="bg-white border border-slate-200/70 rounded-2xl p-7 shadow-card">
        <SliderInput
          label="Annual Household Income"
          value={income}
          min={20000}
          max={500000}
          step={1000}
          unit="$"
          onChange={setIncome}
        />
        <SliderInput
          label="Monthly Debt Payments"
          value={debts}
          min={0}
          max={5000}
          step={25}
          unit="$"
          onChange={setDebts}
        />
        <SliderInput
          label="Available Down Payment"
          value={down}
          min={0}
          max={400000}
          step={1000}
          unit="$"
          onChange={setDown}
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
        <SliderInput
          label="Target Debt-to-Income Ratio"
          value={dti}
          min={20}
          max={50}
          step={1}
          unit="%"
          onChange={setDti}
        />
        <div className="mb-1">
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
        <p className="text-xs text-slate-400 leading-relaxed mt-4">
          Assumes {TAX_RATE}% annual property tax and {INS_RATE}% annual
          homeowners insurance. Most lenders cap total debt (housing + other
          debts) at 43–45% of gross income.
        </p>
      </div>

      {/* Result */}
      <div className="bg-blue-700 rounded-2xl p-8 shadow-lg text-center flex flex-col items-center">
        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
          Estimated Home Price You Can Afford
        </p>
        <p className="text-6xl font-extrabold text-white leading-none mb-8 break-all">
          {formatCurrency(result.price)}
        </p>

        <div className="w-full max-w-sm space-y-2.5 text-sm mb-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Max monthly housing budget</span>
            <span className="font-semibold text-white">
              {formatCurrency(result.housingBudget)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Estimated loan amount</span>
            <span className="font-semibold text-white">
              {formatCurrency(result.loanAmount)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-blue-500/40 pt-2.5">
            <span className="text-blue-200">Principal &amp; interest</span>
            <span className="font-semibold text-white">
              {formatCurrency(result.pi)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Tax + insurance</span>
            <span className="font-semibold text-white">
              {formatCurrency(result.tax + result.insurance)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-blue-500/40 pt-2.5">
            <span className="text-blue-200 font-semibold">
              Total monthly payment
            </span>
            <span className="font-bold text-white">
              {formatCurrency(result.total)}
            </span>
          </div>
        </div>

        <a
          href="/#contact"
          className="w-full max-w-sm flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-blue-700 font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
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
        <p className="text-[10px] text-blue-300 mt-4 max-w-sm">
          Illustrative estimate only. Actual affordability depends on full
          underwriting, credit, and program guidelines.
        </p>
      </div>
    </div>
  );
}
