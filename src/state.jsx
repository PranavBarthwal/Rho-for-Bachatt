import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppState = createContext(null);

export function AppStateProvider({ children }) {
  const [sipAmount, setSipAmount] = useState(301);
  const [bank, setBank] = useState("");
  const [kyc, setKyc] = useState(false);
  const [paid, setPaid] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const id = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const progress = paid ? 100 : kyc ? 75 : bank ? 50 : 25;

  const value = useMemo(
    () => ({
      sipAmount,
      setSipAmount,
      bank,
      setBank,
      kyc,
      setKyc,
      paid,
      setPaid,
      progress,
      toast,
      showToast: setToast,
    }),
    [sipAmount, bank, kyc, paid, progress, toast]
  );

  return <AppState.Provider value={value}>{children}</AppState.Provider>;
}

export function useAppState() {
  return useContext(AppState);
}
