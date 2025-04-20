"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  ThemeColor,
  themeColors,
} from "@/components/pomo/BackgroundColorSelector";

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  themeClass: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeColor>(themeColors[0]); // Default to first theme
  const [themeClass, setThemeClass] = useState<string>(themeColors[0].bg);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("pomodoro-theme");
      if (savedTheme) {
        const foundTheme = themeColors.find((t) => t.name === savedTheme);
        if (foundTheme) {
          setTheme(foundTheme);
          setThemeClass(foundTheme.bg);
        }
      }
    }
  }, []);

  // Update themeClass when theme changes
  useEffect(() => {
    setThemeClass(theme.bg);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeClass }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
