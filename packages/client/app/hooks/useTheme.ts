import { useEffect, useState } from "react";
import { useAppSelector } from "~/store/hooks";
import { selectTheme } from "~/store/settings/settings.selectors";
import type { Theme } from "~/store/settings/settings.slice";

function getThemeFromCookie(): Theme {
  if (typeof document === "undefined") return "system";
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("theme="));
  return (cookie?.split("=")[1] ?? "system") as Theme;
}

export function useTheme(initialTheme: Theme = getThemeFromCookie()) {
  const storeTheme = useAppSelector(selectTheme);
  const [resolvedTheme, setResolvedTheme] = useState<
    "light" | "dark" | "system"
  >(() => {
    // Initial resolve
    const theme = storeTheme ?? initialTheme;
    if (theme !== "system") return theme;

    // For SSR, default to light
    if (typeof window === "undefined") return initialTheme;

    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    let selectedTheme = storeTheme ?? initialTheme;

    if (selectedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        setResolvedTheme(e.matches ? "dark" : "light");
      };

      // Set initial
      updateTheme(media);

      // Listen for changes
      media.addEventListener("change", updateTheme);
      return () => media.removeEventListener("change", updateTheme);
    } else {
      setResolvedTheme(selectedTheme);
    }
  }, [storeTheme, initialTheme]);

  console.log(resolvedTheme);
  return resolvedTheme;
}
