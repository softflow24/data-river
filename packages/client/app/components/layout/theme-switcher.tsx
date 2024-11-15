import { Laptop, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@data-river/shared/ui/components/ui/popover";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { cn } from "@data-river/shared/ui/utils";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { selectTheme } from "~/store/settings/settings.selectors";
import { settingsSlice } from "~/store/settings/settings.slice";
import type { Theme } from "~/store/settings/settings.slice";

interface ThemeSwitcherProps {
  className?: string;
  align?: "start" | "center" | "end";
}

const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Laptop,
  },
];

export function ThemeSwitcher({
  className,
  align = "end",
}: ThemeSwitcherProps) {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const fetcher = useFetcher();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const setTheme = (newTheme: Theme) => {
    // Update Redux store
    dispatch(settingsSlice.actions.setTheme(newTheme));

    // Update cookie using Remix fetcher
    fetcher.submit(
      { theme: newTheme },
      { method: "post", action: "/preferences" },
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 w-full cursor-pointer",
            className,
          )}
        >
          <div className="relative h-4 w-4">
            <AnimatePresence mode="wait">
              {/* Sun icon */}
              {theme === "light" && (
                <motion.div
                  key="light"
                  initial={{ opacity: 0, rotate: 180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Sun className="h-4 w-4" />
                </motion.div>
              )}
              {/* Moon icon */}
              {theme === "dark" && (
                <motion.div
                  key="dark"
                  initial={{ opacity: 0, rotate: 180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Moon className="h-4 w-4" />
                </motion.div>
              )}
              {/* System icon */}
              {theme === "system" && (
                <motion.div
                  key="system"
                  initial={{ opacity: 0, rotate: 180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Laptop className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="flex-1">Theme</span>
        </div>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-40 p-1">
        <div className="grid gap-1">
          {themes.map(({ value, label, icon: ThemeIcon }) => (
            <Button
              key={value}
              variant={theme === value ? "secondary" : "ghost"}
              className={cn(
                "justify-start gap-2",
                theme === value && "bg-muted font-medium",
              )}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
            >
              <ThemeIcon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
