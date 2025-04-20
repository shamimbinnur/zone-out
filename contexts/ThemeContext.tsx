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
  const [theme, setTheme] = useState<ThemeColor>(themeColors[0]); // Default to dark theme initially
  const [themeClass, setThemeClass] = useState<string>(themeColors[0].bg);

  // Check system preferences and localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // First check if there's a saved theme in localStorage
      const savedTheme = localStorage.getItem("pomodoro-theme");

      if (savedTheme) {
        const foundTheme = themeColors.find((t) => t.name === savedTheme);
        if (foundTheme) {
          setTheme(foundTheme);
          setThemeClass(foundTheme.bg);
        }
      } else {
        // If no saved theme, use system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const preferredTheme = prefersDark ? themeColors[0] : themeColors[1]; // Dark or Light
        setTheme(preferredTheme);
        setThemeClass(preferredTheme.bg);
      }

      // Listen for system preference changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: any) => {
        // Only update if there's no saved preference
        if (!localStorage.getItem("pomodoro-theme")) {
          const systemTheme = e.matches ? themeColors[0] : themeColors[1];
          setTheme(systemTheme);
          setThemeClass(systemTheme.bg);
        }
      };

      // Compatibility approach for different browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else {
        // @ts-ignore - For Safari < 14
        mediaQuery.addListener(handleChange);
      }

      // Cleanup
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleChange);
        } else {
          // @ts-ignore - For Safari < 14
          mediaQuery.removeListener(handleChange);
        }
      };
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
