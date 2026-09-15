"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  applyThemeAnimated,
  DEFAULT_THEME,
  readThemeFromDom,
  STORAGE_KEY,
  type ThemeState,
} from "@/lib/theme";

type ThemeContextValue = ThemeState & {
  setTheme: (patch: Partial<ThemeState>) => void;
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeState>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readThemeFromDom());
    setReady(true);
  }, []);

  const setTheme = useCallback((patch: Partial<ThemeState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      applyThemeAnimated(next);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}

      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, setTheme, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme precisa estar dentro de <ThemeProvider>");
  }

  return ctx;
}
