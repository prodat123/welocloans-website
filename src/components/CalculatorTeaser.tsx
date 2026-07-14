import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalculator,
  faHouseChimney,
  faHandHoldingDollar,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const tools: { label: string; icon: IconDefinition; color: string }[] = [
  { label: "Payment Calculator", icon: faCalculator, color: "text-blue-700" },
  { label: "Affordability Calculator", icon: faHouseChimney, color: "text-coral-600" },
  { label: "Down Payment Programs", icon: faHandHoldingDollar, color: "text-amber-600" },
  { label: "Refinance Savings", icon: faArrowsRotate, color: "text-blue-700" },
];

export default function CalculatorTeaser() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white border border-slate-200/70 rounded-3xl p-10 lg:p-14 shadow-card grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
              Loan Calculators
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Every tool you need, in one place
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Whether you want a quick monthly payment, your true affordability,
              a program comparison, or refinance savings. Pick the calculator
              built for the question you're asking.
            </p>
            <Link
              to="/calculators"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              Explore Calculators
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
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {tools.map((t) => (
              <Link
                key={t.label}
                to="/calculators"
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-start gap-3 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <span className={`w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs ${t.color}`}>
                  <FontAwesomeIcon icon={t.icon} className="text-lg" />
                </span>
                <span className="text-sm font-bold text-slate-800 leading-snug">
                  {t.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
