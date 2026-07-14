import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const questions = [
  {
    id: "firstTime",
    label: "I have not owned a home in the past 3 years",
    tip: "Required for all first-time buyer programs.",
  },
  {
    id: "primary",
    label: "This will be my primary residence (not a rental or investment)",
    tip: "All listed programs require owner-occupancy.",
  },
  {
    id: "california",
    label: "I am purchasing a home in California",
    tip: "CalHFA programs are California-only.",
  },
  {
    id: "income",
    label: "My household income is below the area median income (AMI)",
    tip: "Most programs cap income at 80%–120% of the local AMI.",
  },
  {
    id: "credit",
    label: "My credit score is 620 or above",
    tip: "A 620+ score is generally the minimum for most assistance programs.",
  },
  {
    id: "orangeCounty",
    label: "I am purchasing in Orange County (Santa Ana or Garden Grove)",
    tip: "Unlocks city-specific programs with extra assistance.",
  },
];

const programMap: Record<string, string[]> = {
  hop: ["firstTime", "primary", "california", "income"],
  lipa: ["firstTime", "primary", "california", "income", "credit"],
  calhfa: ["firstTime", "primary", "california", "credit"],
  santaAna: ["firstTime", "primary", "orangeCounty", "income"],
  gardenGrove: ["firstTime", "primary", "orangeCounty", "income"],
};

const programInfo: Record<
  string,
  { name: string; tagline: string; color: string }
> = {
  hop: {
    name: "HOP Program",
    tagline: "Down payment assistance, deferred loan",
    color: "border-blue-400 bg-blue-50",
  },
  lipa: {
    name: "LIPA Program",
    tagline: "Up to $161,000 silent second mortgage",
    color: "border-green-400 bg-green-50",
  },
  calhfa: {
    name: "CalHFA Dream for All",
    tagline: "Up to 20% covered, statewide",
    color: "border-purple-400 bg-purple-50",
  },
  santaAna: {
    name: "Santa Ana Program",
    tagline: "City of Santa Ana assistance (verify funds)",
    color: "border-orange-400 bg-orange-50",
  },
  gardenGrove: {
    name: "Garden Grove Program",
    tagline: "City of Garden Grove assistance (verify funds)",
    color: "border-orange-400 bg-orange-50",
  },
};

export default function Qualifier() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  const qualified = Object.entries(programMap)
    .filter(([, reqs]) => reqs.every((r) => checked[r]))
    .map(([key]) => key);

  const anyChecked = Object.values(checked).some(Boolean);

  return (
    <section id="qualifier" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Quick Eligibility Check
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Which first-time homebuyer program do you qualify for?
          </h2>
          <p className="text-lg text-slate-500 max-w-xl">
            Check every box that applies to you and we'll show you which
            programs you're likely eligible for.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Checklist */}
          <div className="space-y-3">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => toggle(q.id)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                  checked[q.id]
                    ? "border-blue-400 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-white shadow-xs hover:border-blue-200 hover:bg-slate-50 hover:shadow-sm"
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${
                    checked[q.id]
                      ? "bg-blue-700 border-blue-700"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {checked[q.id] && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <div>
                  <p
                    className={`text-sm font-semibold leading-snug ${checked[q.id] ? "text-blue-900" : "text-slate-800"}`}
                  >
                    {q.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {q.tip}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Results panel */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 shadow-card">
              <h3 className="text-base font-extrabold text-slate-900 mb-1">
                Programs you may qualify for
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {anyChecked
                  ? "Based on your selections:"
                  : "Check the boxes on the left to see your results."}
              </p>

              {!anyChecked && (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="text-4xl mb-3 text-slate-300">
                    <FontAwesomeIcon icon={faListCheck} />
                  </span>
                  <p className="text-sm text-slate-400">
                    Your matching programs will appear here as you check items
                    on the left.
                  </p>
                </div>
              )}

              {anyChecked && qualified.length === 0 && (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="text-3xl mb-3 text-slate-300">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                  <p className="text-sm font-semibold text-slate-700 mb-1">
                    No programs matched yet
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Keep checking boxes. You may still qualify once more
                    criteria are met. Contact us and we'll look at every option
                    for you.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {qualified.map((key) => {
                  const p = programInfo[key];
                  return (
                    <div
                      key={key}
                      className={`border-2 rounded-xl px-4 py-3.5 shadow-xs ${p.color}`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2a7c8a"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm font-extrabold text-slate-900">
                          {p.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 pl-5">{p.tagline}</p>
                    </div>
                  );
                })}
              </div>

              {anyChecked && (
                <a
                  href="#contact"
                  className="mt-6 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
                >
                  Talk to a Loan Officer
                  <svg
                    width="15"
                    height="15"
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
              )}

              <p className="text-[10px] text-slate-400 text-center mt-4">
                This is a general eligibility indicator, not a guarantee. A loan
                officer will confirm your exact eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
