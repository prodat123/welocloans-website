const programs = [
  {
    name: "LA County Program",
    full: "Homeownership Program",
    badge: "Down Payment Assistance",
    badgeColor: "bg-blue-50 text-blue-700",
    description:
      "We get you money for your down payment and closing costs. You don't pay it back until you sell or refinance.",
    details: [
      "No monthly payments on the assistance",
      "Covers down payment & closing costs",
      "Only repay when you sell or refinance",
      "Keep more cash in your pocket at closing",
    ],
    icon: "🏠",
  },
  {
    name: "LA City Program",
    full: "Low Income Purchase Assistance",
    badge: "City Assistance",
    badgeColor: "bg-green-50 text-green-700",
    description:
      "You can get up to $161,000 to help buy your home. No monthly payments on that money forever.",
    details: [
      "Up to $161,000 toward your purchase",
      "$0 monthly payments on the loan",
      "Only repay when you sell or refinance",
      "Dramatically lowers what you need upfront",
    ],
    icon: "🤝",
  },
  {
    name: "CalHFA Dream for All",
    full: "California Housing Finance Agency",
    badge: "Statewide Program",
    badgeColor: "bg-purple-50 text-purple-700",
    description:
      "The state covers up to 20% of your home price so you barely need a down payment. No interest, no monthly payments on that portion.",
    details: [
      "Up to 20% of purchase price covered",
      "No interest charged on the assistance",
      "No monthly payments on the shared loan",
      "Available anywhere in California",
    ],
    icon: "🌟",
  },
  {
    name: "Santa Ana Program",
    full: "City of Santa Ana",
    badge: "Verify Availability",
    badgeColor: "bg-orange-50 text-orange-700",
    description:
      "The City of Santa Ana offers cash to cover your down payment. Funds are limited, so reach out early.",
    details: [
      "Down payment fully or partially covered",
      "Closing cost assistance included",
      "No repayment while you live in the home",
      "First-come, first-served — act fast",
    ],
    icon: "📍",
  },
  {
    name: "Garden Grove Program",
    full: "City of Garden Grove",
    badge: "Verify Availability",
    badgeColor: "bg-orange-50 text-orange-700",
    description:
      "The City of Garden Grove offers cash to help with your down payment. Funds run out fast, so don't wait.",
    details: [
      "Down payment assistance available",
      "Reduces how much you need to save",
      "No repayment while you live in the home",
      "First-come, first-served — act fast",
    ],
    icon: "📍",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Available Programs
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            First-Time Homebuyer Programs
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            These programs are designed to help you buy your first home with
            little to no down payment. We'll help you figure out which ones you
            qualify for.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Top row — 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {programs.slice(0, 3).map((p) => (
              <div
                key={p.name}
                className={`bg-white rounded-2xl border border-blue-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400">{p.full}</p>
                    </div>
                  </div>
                  {/* <span
                  className={`shrink-0 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${p.badgeColor}`}
                >
                  {p.badge}
                </span> */}
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {p.description}
                </p>

                <ul className="space-y-1.5">
                  {p.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-xs text-slate-600"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2a7c8a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row — 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-2/3 md:mx-auto">
            {programs.slice(3).map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-2xl border border-blue-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400">{p.full}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {p.description}
                </p>
                <ul className="space-y-1.5">
                  {p.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-xs text-slate-600"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2a7c8a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 text-center w-full rounded-xl px-4 py-3 mt-8">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Heads up:</strong> These programs are funded annually and
            availability can change. Contact us to confirm which ones are
            currently open before you plan around them.
          </p>
        </div>
      </div>
    </section>
  );
}
