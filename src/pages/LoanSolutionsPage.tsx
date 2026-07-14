import { Link } from "react-router-dom";
import LoanSolutions from "../components/LoanSolutions";
import Programs from "../components/Programs";

export default function LoanSolutionsPage() {
  return (
    <main className="bg-transparent min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-6">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Loan Solutions
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Find the loan that fits your life
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            From first homes to high-balance purchases and everything in between,
            we match you with the right program and stay with you through
            closing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/calculators"
              className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5"
            >
              Run the Numbers
            </Link>
          </div>
        </div>
      </section>

      {/* Loan types */}
      <LoanSolutions />

      {/* Down payment assistance programs */}
      <Programs />
    </main>
  );
}
