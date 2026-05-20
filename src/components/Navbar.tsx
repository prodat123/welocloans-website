import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useModal } from "../ModalContext";
import logo from "./logo.png";

const homeLinks = [
  { label: "Programs", href: "/#programs" },
  { label: "Qualify", href: "/#qualifier" },
  { label: "Calculator", href: "/#calculator" },
  { label: "FAQ", href: "/#faq" },
];

const pageLinks = [
  { label: "Our Team", to: "/team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { openModal } = useModal();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f4f6f8]/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3"
          : "bg-[#f4f6f8] py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="WELOC Loans" className="h-24 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Anchor links */}
          {homeLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Divider */}
          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Page links — always visible */}
          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "text-blue-700 bg-blue-50"
                  : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={openModal}
            className="ml-3 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
          >
            Get Started
          </button>
        </nav>

        {/* Burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent"
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
        <div className="md:hidden bg-white border-t border-slate-100 px-6 pb-6 pt-3 flex flex-col gap-1">
          {homeLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {l.label}
            </a>
          ))}

          <div className="my-1 border-t border-slate-100" />

          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "text-blue-700 bg-blue-50"
                  : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              openModal();
            }}
            className="mt-2 px-5 py-3 bg-blue-700 text-white font-bold text-sm rounded-xl text-center"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
