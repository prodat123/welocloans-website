import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ModalContext } from "./ModalContext";
import GetStartedModal from "./components/GetStartedModal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import AccessibilityWidget from "./components/AccessibilityWidget";

import { Analytics } from "@vercel/analytics/react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal: () => setModalOpen(true) }}>
      <Analytics />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
        <Footer />
        <AccessibilityWidget />
        {modalOpen && (
          <GetStartedModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        )}
      </BrowserRouter>
    </ModalContext.Provider>
  );
}
