import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import StatusBar from "./components/StatusBar.jsx";
import Dock from "./components/Dock.jsx";
import Sheet from "./components/Sheet.jsx";
import HomePage from "./pages/HomePage.jsx";
import ReferPage from "./pages/ReferPage.jsx";
import { CardsPage, FundsPage, GoldPage, LoansPage, PassbookPage } from "./pages/OtherPages.jsx";
import { AppStateProvider, useAppState } from "./state.jsx";

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"];
const DOCK_ROUTES = new Set(["/", "/mutual-funds", "/gold", "/loans", "/cards"]);

function Shell() {
  const location = useLocation();
  const { bank, setBank, showToast, toast } = useAppState();
  const [showBalance, setShowBalance] = useState(true);
  const [bankOpen, setBankOpen] = useState(false);
  const showDock = DOCK_ROUTES.has(location.pathname);

  useEffect(() => {
    const onScroll = () => setShowBalance(window.scrollY < 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`phone ${showDock ? "with-dock" : "theme-refer"}`}>
      <StatusBar />
      <Routes>
        <Route path="/" element={<HomePage showBalance={showBalance} setBankOpen={setBankOpen} />} />
        <Route path="/refer" element={<ReferPage />} />
        <Route path="/rewards" element={<ReferPage rewards />} />
        <Route path="/passbook" element={<PassbookPage />} />
        <Route path="/mutual-funds" element={<FundsPage />} />
        <Route path="/gold" element={<GoldPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
      {showDock && <Dock onSelectBank={() => setBankOpen(true)} />}
      <Sheet open={bankOpen} title="Select bank account" onClose={() => setBankOpen(false)}>
        {BANKS.map((name) => (
          <button
            key={name}
            className={bank === name ? "bank-option on" : "bank-option"}
            type="button"
            onClick={() => {
              setBank(name);
              setBankOpen(false);
              showToast(`${name} selected`);
            }}
          >
            {name}
          </button>
        ))}
      </Sheet>
      <p className={`toast ${toast ? "show" : ""}`} role="status">{toast}</p>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <Shell />
    </AppStateProvider>
  );
}
