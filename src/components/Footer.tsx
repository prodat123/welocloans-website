import { Link } from "react-router-dom";
import logo from "./logo.png";
import eho from "../equal housing opportunity.webp";

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img
                src={logo}
                alt="WELOC Loans"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Simple, transparent mortgage solutions for every stage of life.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {[
                "HOP Program",
                "LIPA Program",
                "CalHFA Dream for All",
                "Santa Ana Program",
                "Garden Grove Program",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="/#programs"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/team"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Client Reviews
                </Link>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Loan Calculator", href: "/#calculator" },
                { label: "Eligibility Checker", href: "/#qualifier" },
                { label: "FAQ", href: "/#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-800">
          {/* Equal Housing Opportunity */}
          <img
            src={eho}
            alt="Equal Housing Opportunity"
            className="h-16 w-auto opacity-70"
          />

          {/* NMLS */}
          <div className="flex items-center gap-2 border border-slate-700 rounded-lg px-3 py-2">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                NMLS
              </p>
              <p className="text-[11px] font-bold text-slate-300 leading-none mt-0.5">
                #2696277
              </p>
            </div>
            <div className="w-px h-6 bg-slate-700 mx-1" />
            <p className="text-[9px] text-slate-500 leading-tight max-w-[80px]">
              Consumer Access
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} WELOC Loans. All rights reserved.
              NMLS #2696277.
            </p>
            <p className="text-xs text-slate-500">
              5948 Temple City Blvd, Temple City, CA 91780
            </p>
          </div>
          <p className="text-xs text-slate-500 text-center md:text-right max-w-md">
            This is not a commitment to lend. Loan approval is subject to credit
            approval and program guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
}
