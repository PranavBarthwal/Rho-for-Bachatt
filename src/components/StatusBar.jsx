import { useEffect, useState } from "react";

export default function StatusBar() {
  const [label, setLabel] = useState("1:06");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let hours = now.getHours() % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setLabel(`${hours}:${minutes}`);
    };
    tick();
    const id = window.setInterval(tick, 10000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-time">{label}</span>
      <span className="status-right">
        <svg className="signal" viewBox="0 0 18 14" width="17" height="13">
          <rect x="0" y="9" width="3" height="5" rx="0.6" />
          <rect x="5" y="6" width="3" height="8" rx="0.6" />
          <rect x="10" y="3" width="3" height="11" rx="0.6" />
          <rect x="15" y="0" width="3" height="14" rx="0.6" />
        </svg>
        <span className="status-net">5G</span>
        <span className="battery" title="100 percent">
          <span className="battery-body">100</span>
          <span className="battery-nub" />
        </span>
      </span>
    </div>
  );
}
