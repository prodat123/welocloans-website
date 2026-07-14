import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ModalContext } from "./ModalContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import GetStartedPage from "./pages/GetStartedPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import LoanSolutionsPage from "./pages/LoanSolutionsPage";
import FirstTimeBuyerPage from "./pages/FirstTimeBuyerPage";
import AccessibilityWidget from "./components/AccessibilityWidget";
import logo from "./components/logo.png";

import { Analytics } from "@vercel/analytics/react";

// ── Set to false to restore the full site ──────────────────
const MAINTENANCE_MODE = false;

function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center px-6 text-center">
      <img src={logo} alt="WELOC Loans" className="h-28 w-auto mb-8" />

      <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
        Website in Progress
      </h1>
      <p className="text-lg text-slate-500 max-w-md mb-12">
        We're putting the finishing touches on our new site. In the meantime,
        reach out to us directly. We're happy to help.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a
          href="tel:+16263748775"
          className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2a7c8a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.6 1.37h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.08 6.08l1.91-1.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Call us</p>
            <p className="text-sm font-bold text-slate-800">(626) 374-8775</p>
          </div>
        </a>

        <a
          href="mailto:contact@welocloans.com"
          className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2a7c8a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Email us</p>
            <p className="text-sm font-bold text-slate-800">
              contact@welocloans.com
            </p>
          </div>
        </a>

        <a
          href="https://www.google.com/maps/search/?api=1&query=5948+Temple+City+Blvd+Temple+City+CA+91780"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2a7c8a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Visit us</p>
            <p className="text-sm font-bold text-slate-800">
              5948 Temple City Blvd, Temple City, CA 91780
            </p>
          </div>
        </a>
      </div>

      <p className="text-xs text-slate-400 mt-12">
        © {new Date().getFullYear()} WELOC Loans · NMLS #2696277
      </p>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a tick so the target route has rendered before scrolling to it.
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
        window.scrollTo(0, 0);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AppInner() {
  const navigate = useNavigate();

  return (
    <ModalContext.Provider value={{ openModal: () => navigate("/get-started") }}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/calculators" element={<CalculatorsPage />} />
        <Route path="/loan-solutions" element={<LoanSolutionsPage />} />
        <Route path="/first-time-homebuyer" element={<FirstTimeBuyerPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
      </Routes>
      <Footer />
      <AccessibilityWidget />
    </ModalContext.Provider>
  );
}

export default function App() {
  if (MAINTENANCE_MODE) {
    return (
      <>
        <Analytics />
        <MaintenancePage />
      </>
    );
  }

  return (
    <>
      <Analytics />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </>
  );
}
