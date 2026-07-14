import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useModal } from "../ModalContext";
import logo from "./logo.png";

// Swap this for the live borrower portal when it's ready.
const PORTAL_URL = "https://portal.welocloans.com";

type Leaf = { label: string; to?: string; href?: string; desc?: string };
type Group = { heading?: string; items: Leaf[] };
type Tab = { label: string; to?: string; groups?: Group[] };

const NAV: Tab[] = [
  {
    label: "Buy",
    groups: [
      {
        heading: "Calculators",
        items: [
          {
            label: "Purchase Calculator",
            to: "/calculators?tool=payment",
            desc: "Estimate your monthly payment",
          },
          {
            label: "Affordability Calculator",
            to: "/calculators?tool=affordability",
            desc: "See how much home you can afford",
          },
        ],
      },
      {
        heading: "Loan Options",
        items: [
          { label: "Conventional", to: "/loan-solutions#conventional" },
          { label: "FHA", to: "/loan-solutions#fha" },
          { label: "Jumbo", to: "/loan-solutions#jumbo" },
          { label: "Non-QM", to: "/loan-solutions#non-qm" },
        ],
      },
      {
        heading: "Ready to move",
        items: [
          {
            label: "First-Time Homebuyer",
            to: "/first-time-homebuyer",
            desc: "Programs built for first homes",
          },
          {
            label: "Get Preapproved",
            to: "/get-started",
            desc: "Know your number before you shop",
          },
        ],
      },
    ],
  },
  {
    label: "Refinance",
    groups: [
      {
        items: [
          {
            label: "Get Started",
            to: "/get-started",
            desc: "Start a refinance application",
          },
          {
            label: "Refinance Calculator",
            to: "/calculators?tool=refinance",
            desc: "See what refinancing could save",
          },
        ],
      },
    ],
  },
  {
    label: "FTHB",
    to: "/first-time-homebuyer",
    groups: [
      {
        items: [
          {
            label: "Programs",
            to: "/first-time-homebuyer#programs",
            desc: "Down payment assistance & more",
          },
          {
            label: "Tools",
            to: "/calculators",
            desc: "Calculators to plan your buy",
          },
        ],
      },
    ],
  },
  {
    label: "Loan Solutions",
    to: "/loan-solutions",
    groups: [
      {
        items: [
          { label: "All Loan Solutions", to: "/loan-solutions" },
          { label: "Conventional", to: "/loan-solutions#conventional" },
          { label: "FHA", to: "/loan-solutions#fha" },
          { label: "Jumbo", to: "/loan-solutions#jumbo" },
          { label: "Non-QM", to: "/loan-solutions#non-qm" },
        ],
      },
    ],
  },
  { label: "Team", to: "/team" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function LeafLink({
  leaf,
  onClick,
}: {
  leaf: Leaf;
  onClick: () => void;
}) {
  const cls =
    "block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group/leaf";
  const inner = (
    <>
      <span className="block text-sm font-semibold text-slate-700 group-hover/leaf:text-blue-700">
        {leaf.label}
      </span>
      {leaf.desc && (
        <span className="block text-xs text-slate-400 mt-0.5">{leaf.desc}</span>
      )}
    </>
  );
  return leaf.to ? (
    <Link to={leaf.to} onClick={onClick} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={leaf.href} onClick={onClick} className={cls}>
      {inner}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  // Stable ref callback: sets the initial hidden state once on mount (no flash)
  // and keeps `transform` fully imperative so React never clobbers it on re-render.
  const setBarRef = useCallback((el: HTMLDivElement | null) => {
    progressRef.current = el;
    if (el) el.style.transform = "scaleX(0)";
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // setScrolled bails out when the value is unchanged, so this only
      // re-renders at the 40px threshold — not on every scroll tick.
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const frac = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      // Compositor-only transform write — no React re-render, no layout.
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${frac})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenTab(null);
    setMobileTab(null);
  }, [pathname]);

  const closeAll = () => {
    setOpenTab(null);
    setMenuOpen(false);
    setMobileTab(null);
  };

  return (
    <>
      {/* Scroll progress bar — compositor-only transform, updated via rAF (no re-render) */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none">
        <div
          ref={setBarRef}
          className="h-full w-full origin-left bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800"
          style={{ willChange: "transform" }}
        />
      </div>

      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-card border-b border-slate-200/60 py-3"
          : "bg-white/60 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="WELOC Loans" className="h-20 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((tab) => {
            const isOpen = openTab === tab.label;
            const baseCls =
              "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors";
            const active =
              tab.to && pathname === tab.to.split("#")[0].split("?")[0];
            const stateCls = active
              ? "text-blue-700 bg-blue-50"
              : "text-slate-600 hover:text-blue-700 hover:bg-blue-50";

            // Simple link tab (no dropdown)
            if (!tab.groups) {
              return (
                <Link
                  key={tab.label}
                  to={tab.to!}
                  className={`${baseCls} ${stateCls}`}
                >
                  {tab.label}
                </Link>
              );
            }

            return (
              <div
                key={tab.label}
                className="relative"
                onMouseEnter={() => setOpenTab(tab.label)}
                onMouseLeave={() => setOpenTab((o) => (o === tab.label ? null : o))}
              >
                {tab.to ? (
                  <Link
                    to={tab.to}
                    className={`${baseCls} ${stateCls}`}
                    onClick={() => setOpenTab(null)}
                  >
                    {tab.label}
                    <Chevron open={isOpen} />
                  </Link>
                ) : (
                  <button
                    className={`${baseCls} ${stateCls}`}
                    onClick={() =>
                      setOpenTab((o) => (o === tab.label ? null : tab.label))
                    }
                  >
                    {tab.label}
                    <Chevron open={isOpen} />
                  </button>
                )}

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute left-0 top-full pt-2 z-50">
                    <div
                      className={`bg-white rounded-2xl border border-slate-200/70 shadow-card-hover p-3 ${
                        tab.groups.length > 1
                          ? "grid grid-cols-3 gap-2 w-[560px]"
                          : "w-64"
                      }`}
                    >
                      {tab.groups.map((group, gi) => (
                        <div key={group.heading ?? gi}>
                          {group.heading && (
                            <p className="px-3 pt-1.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {group.heading}
                            </p>
                          )}
                          {group.items.map((leaf) => (
                            <LeafLink
                              key={leaf.label}
                              leaf={leaf}
                              onClick={() => setOpenTab(null)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Sign In
          </a>
          <button
            onClick={openModal}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Get Started
          </button>
        </div>

        {/* Burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1 bg-transparent"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-slate-800 rounded transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-800 rounded transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-800 rounded transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-lg px-6 pb-6 pt-3 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
          {NAV.map((tab) => {
            if (!tab.groups) {
              return (
                <Link
                  key={tab.label}
                  to={tab.to!}
                  onClick={closeAll}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  {tab.label}
                </Link>
              );
            }
            const open = mobileTab === tab.label;
            return (
              <div key={tab.label}>
                <button
                  onClick={() =>
                    setMobileTab((o) => (o === tab.label ? null : tab.label))
                  }
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 transition-colors"
                >
                  {tab.label}
                  <Chevron open={open} />
                </button>
                {open && (
                  <div className="pl-3 pb-1">
                    {tab.groups.map((group, gi) => (
                      <div key={group.heading ?? gi} className="mb-1">
                        {group.heading && (
                          <p className="px-3 pt-2 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {group.heading}
                          </p>
                        )}
                        {group.items.map((leaf) => (
                          <LeafLink
                            key={leaf.label}
                            leaf={leaf}
                            onClick={closeAll}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="my-2 border-t border-slate-100" />

          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeAll}
            className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 text-center"
          >
            Sign In
          </a>
          <button
            onClick={() => {
              closeAll();
              openModal();
            }}
            className="mt-1 px-5 py-3 bg-blue-700 text-white font-bold text-sm rounded-xl text-center"
          >
            Get Started
          </button>
        </div>
      )}
      </header>
    </>
  );
}
