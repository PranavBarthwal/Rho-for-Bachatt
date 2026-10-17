import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAppState } from "../state.jsx";
import { placeGoldCall } from "../lib/call.js";

const TABS = [
  { to: "/", label: "Insta Fund", icon: "bag", end: true },
  { to: "/mutual-funds", label: "Mutual Funds", icon: "chart" },
  { to: "/gold", label: "Gold & Silver", icon: "gold" },
  { to: "/loans", label: "Loans", icon: "loan" },
  { to: "/cards", label: "Cards", icon: "card" },
];

function TabIcon({ name }) {
  if (name === "bag") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M8 12.5h12l-.8 8.2a2 2 0 0 1-2 1.8H10.8a2 2 0 0 1-2-1.8L8 12.5z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M11 12.2V10a3 3 0 0 1 6 0v2.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M14 15.2v3.2M12.5 16.8h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "chart") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M6 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8 17l4-5 3.2 3.2L20 9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 9H20v3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "gold") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M7 18.5l3.2-5h7.6l3.2 5H7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.2 13.5l2.2-3.4h5.2l2.2 3.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M11.2 10.1l1.5-2.3h2.6l1.5 2.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "loan") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M7 15.5c2.2-1 3.6-1 5.2.2 1.2.9 2.2.9 3.6 0 1.6-1 3-.8 4.4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="18.5" cy="11" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18.5 9.6v1.5l.9.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M8.5 18.5c1.8 1.6 3.6 2.4 5.5 2.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <rect x="5" y="8" width="18" height="12" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 12.5h18" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function Dock({ onSelectBank }) {
  const { sipAmount, showToast } = useAppState();
  const calling = useRef(false);

  async function onGoldClick() {
    if (calling.current) return;
    calling.current = true;
    showToast("Calling +91 89207 10046");
    try {
      const result = await placeGoldCall();
      showToast(result.status === "queued" ? "Call queued" : "Call placed");
    } catch (error) {
      showToast(error.message || "Could not place the call");
    } finally {
      calling.current = false;
    }
  }

  return (
    <div className="dock">
      <button className="bank-cta" type="button" onClick={onSelectBank}>
        Select bank account
        <span aria-hidden="true">→</span>
      </button>
      <div className="sip-strip">
        <span className="sip-line" />
        <p>
          ₹{sipAmount} Daily <i>✦</i> <b>↗</b> Axis Birla Insta Fund
        </p>
        <span className="sip-line" />
      </div>
      <nav className="tabs" aria-label="Primary">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => (isActive ? "tab active" : "tab")}
            onClick={tab.to === "/gold" ? onGoldClick : undefined}
          >
            <TabIcon name={tab.icon} />
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
