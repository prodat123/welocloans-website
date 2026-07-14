import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faKey,
  faCity,
  faChartLine,
  faUserTie,
  faBriefcase,
  faFileCircleXmark,
  faBuildingColumns,
  faUserDoctor,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import Reveal from "./Reveal";

export type LoanSolution = {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  tile: string;
  icon: IconDefinition;
  description: string;
  points: string[];
};

export const loanSolutions: LoanSolution[] = [
  {
    id: "conventional",
    name: "Conventional",
    tagline: "The everyday standard",
    badge: "Most Popular",
    badgeColor: "bg-blue-50 text-blue-700",
    tile: "bg-blue-50 text-blue-700",
    icon: faHouse,
    description:
      "Flexible, competitive financing for buyers with steady income and solid credit. Put as little as 3% down and drop PMI once you hit 20% equity.",
    points: [
      "As little as 3% down for first-time buyers",
      "PMI falls off automatically at 20% equity",
      "Fixed or adjustable rates, 10–30 year terms",
      "Great for primary homes, second homes & rentals",
    ],
  },
  {
    id: "fha",
    name: "FHA",
    tagline: "Built for first-time buyers",
    badge: "Low Credit OK",
    badgeColor: "bg-coral-50 text-coral-700",
    tile: "bg-coral-50 text-coral-600",
    icon: faKey,
    description:
      "Government-backed loans that make ownership reachable with a lower credit score and just 3.5% down. Ideal when you're just getting started.",
    points: [
      "3.5% down with a 580+ credit score",
      "More forgiving of past credit bumps",
      "Gift funds allowed for the down payment",
      "Pairs with down payment assistance programs",
    ],
  },
  {
    id: "jumbo",
    name: "Jumbo",
    tagline: "For higher-priced homes",
    badge: "High Balance",
    badgeColor: "bg-amber-50 text-amber-700",
    tile: "bg-amber-50 text-amber-600",
    icon: faCity,
    description:
      "Financing above conforming loan limits for luxury and high-cost markets, with competitive rates on the homes other lenders can't cover.",
    points: [
      "Loan amounts above county conforming limits",
      "Competitive rates for strong borrowers",
      "Primary, second home & investment eligible",
      "Flexible structures for high-value properties",
    ],
  },
  {
    id: "non-qm",
    name: "Non-QM",
    tagline: "When you don't fit the box",
    badge: "Self-Employed",
    badgeColor: "bg-blue-50 text-blue-700",
    tile: "bg-blue-50 text-blue-700",
    icon: faChartLine,
    description:
      "Alternative documentation loans for self-employed borrowers, investors, and anyone whose income doesn't show up neatly on a W-2.",
    points: [
      "Bank-statement & asset-based qualifying",
      "Ideal for self-employed & 1099 earners",
      "DSCR options for real estate investors",
      "Solutions after recent credit events",
    ],
  },
  {
    id: "self-employed",
    name: "Self-Employed",
    tagline: "Bank statements, not W-2s",
    badge: "Bank Statement",
    badgeColor: "bg-coral-50 text-coral-700",
    tile: "bg-coral-50 text-coral-600",
    icon: faUserTie,
    description:
      "Qualify using 12 to 24 months of bank statements instead of tax returns, so your real cash flow tells the story, not your write-offs.",
    points: [
      "Qualify on bank-statement deposits",
      "No tax returns or W-2s required",
      "Great when write-offs lower taxable income",
      "Competitive rates for strong borrowers",
    ],
  },
  {
    id: "business-owners",
    name: "Business Owners",
    tagline: "Financing that fits your books",
    badge: "1099 / P&L",
    badgeColor: "bg-amber-50 text-amber-700",
    tile: "bg-amber-50 text-amber-600",
    icon: faBriefcase,
    description:
      "Built for owners and 1099 earners whose income is strong but complicated. We look at profit-and-loss statements and real business cash flow.",
    points: [
      "Profit-and-loss statement options",
      "1099-only qualifying available",
      "Flexible on business write-offs",
      "Primary, second home, or investment",
    ],
  },
  {
    id: "no-income-docs",
    name: "No Income Docs",
    tagline: "Asset and equity based",
    badge: "No Docs",
    badgeColor: "bg-blue-50 text-blue-700",
    tile: "bg-blue-50 text-blue-700",
    icon: faFileCircleXmark,
    description:
      "For borrowers with substantial assets or equity but hard-to-document income. Qualify on assets or property cash flow instead of pay stubs.",
    points: [
      "Asset-based qualifying available",
      "No pay stubs or tax returns",
      "Ideal for retirees and complex incomes",
      "Fast, streamlined underwriting",
    ],
  },
  {
    id: "real-estate-investors",
    name: "Real Estate Investors",
    tagline: "Let the property qualify",
    badge: "DSCR",
    badgeColor: "bg-amber-50 text-amber-700",
    tile: "bg-amber-50 text-amber-600",
    icon: faBuildingColumns,
    description:
      "DSCR loans qualify on the rental income a property generates, not your personal income, so you can grow your portfolio without limits.",
    points: [
      "Qualify on rental cash flow (DSCR)",
      "No personal income verification",
      "Finance multiple properties",
      "LLC vesting available",
    ],
  },
  {
    id: "medical-pros",
    name: "Medical Professionals",
    tagline: "0% down for healthcare pros",
    badge: "0% Down",
    badgeColor: "bg-coral-50 text-coral-700",
    tile: "bg-coral-50 text-coral-600",
    icon: faUserDoctor,
    description:
      "Physician and healthcare-professional loans with little to no down payment, low reserves, and flexibility around student-loan debt.",
    points: [
      "0% to low down payment options",
      "Student-loan debt treated flexibly",
      "No PMI on many programs",
      "For doctors, dentists, and more",
    ],
  },
  {
    id: "home-equity",
    name: "Home Equity",
    tagline: "Put your equity to work",
    badge: "HELOC / HELOAN",
    badgeColor: "bg-blue-50 text-blue-700",
    tile: "bg-blue-50 text-blue-700",
    icon: faMoneyBillTrendUp,
    description:
      "Tap the equity you have already built to fund renovations, consolidate debt, or cover big expenses, without touching your first-mortgage rate.",
    points: [
      "HELOC and fixed home-equity loans",
      "Keep your low first-mortgage rate",
      "Great for renovations or debt payoff",
      "Take cash as a lump sum or credit line",
    ],
  },
];

export default function LoanSolutions() {
  return (
    <section id="loan-solutions" className="py-24 bg-transparent scroll-mt-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Loan Solutions
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            One lender, every kind of loan
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Whatever your situation looks like, there's a path to the keys. Explore
            the loan types we offer, and we'll help you land on the right one.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {loanSolutions.map((l, i) => (
            <Reveal key={l.id} delay={(i % 2) * 110} className="h-full">
            <div
              id={l.id}
              className="h-full scroll-mt-28 bg-white rounded-2xl border border-blue-100 p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover hover:border-blue-200 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${l.tile}`}>
                    <FontAwesomeIcon icon={l.icon} className="text-xl" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {l.name}
                    </h3>
                    <p className="text-xs text-slate-400">{l.tagline}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${l.badgeColor}`}
                >
                  {l.badge}
                </span>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {l.description}
              </p>

              <ul className="space-y-2 mb-6">
                {l.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2a7c8a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>

              <Link
                to="/get-started"
                className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors"
              >
                See if you qualify
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
              </Link>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
