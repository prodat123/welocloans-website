import { useSearchParams } from "react-router-dom";
import PaymentCalculator from "../components/calculators/PaymentCalculator";
import AffordabilityCalculator from "../components/calculators/AffordabilityCalculator";
import ProgramCalculator from "../components/calculators/ProgramCalculator";
import RefinanceCalculator from "../components/calculators/RefinanceCalculator";

const TOOLS = [
  {
    id: "payment",
    label: "Payment Calculator",
    short: "Payment",
    desc: "Estimate your monthly mortgage payment, including tax, insurance, and PMI.",
    Component: PaymentCalculator,
  },
  {
    id: "affordability",
    label: "Affordability Calculator",
    short: "Affordability",
    desc: "Find out how much home you can afford based on your income and debts.",
    Component: AffordabilityCalculator,
  },
  {
    id: "programs",
    label: "Down Payment Programs",
    short: "DPA Programs",
    desc: "Compare your payment with and without a down payment assistance program.",
    Component: ProgramCalculator,
  },
  {
    id: "refinance",
    label: "Refinance Savings",
    short: "Refinance",
    desc: "See how much refinancing could save you each month and over time.",
    Component: RefinanceCalculator,
  },
] as const;

type ToolId = (typeof TOOLS)[number]["id"];

export default function CalculatorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("tool");
  const active: ToolId =
    (TOOLS.find((t) => t.id === requested)?.id as ToolId) ?? "payment";
  const tool = TOOLS.find((t) => t.id === active) ?? TOOLS[0];

  const setActive = (id: ToolId) => {
    setSearchParams({ tool: id }, { replace: true });
  };

  return (
    <main className="bg-transparent min-h-screen pt-40 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Loan Calculators
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Run the numbers, your way
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Pick a tool below depending on what you want to figure out:
            monthly payment, affordability, assistance programs, or refinance
            savings.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-10 bg-white border border-slate-200/70 rounded-2xl p-2 shadow-card inline-flex flex-wrap gap-1.5 sm:flex-nowrap w-full sm:w-auto">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                active === t.id
                  ? "bg-blue-700 text-white shadow-md"
                  : "text-slate-500 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              <span className="sm:hidden">{t.short}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Active tool description */}
        <p className="text-sm text-slate-500 mb-6 -mt-4">{tool.desc}</p>

        {/* Active tool */}
        <tool.Component />
      </div>
    </main>
  );
}
