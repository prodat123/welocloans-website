import { Link } from "react-router-dom";
import Programs from "../components/Programs";
import CalculatorTeaser from "../components/CalculatorTeaser";

const stats = [
  { value: "$0", label: "Down payment on many assistance programs" },
  { value: "3.5%", label: "Minimum down on an FHA loan" },
  { value: "$161K", label: "Available through select city programs" },
];

export default function FirstTimeBuyerPage() {
  return (
    <main className="bg-transparent min-h-screen">
      {/* Hook */}
      <section className="pt-40 pb-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-5">
            First-Time Homebuyers
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
            Your first home,
            <br />
            <span className="text-blue-700">without the guesswork.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto">
            Buying your first home is the biggest thing most people ever do, and
            it's exactly what we do best. We line up the programs, run the numbers,
            and walk you all the way to the keys.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-glow hover:shadow-lg"
            >
              Get Started
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
            <a
              href="#programs"
              className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5"
            >
              See Programs
            </a>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-card"
              >
                <p className="text-3xl font-extrabold text-blue-700 mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-slate-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs (anchor: #programs) */}
      <Programs />

      {/* Tools */}
      <CalculatorTeaser />
    </main>
  );
}
