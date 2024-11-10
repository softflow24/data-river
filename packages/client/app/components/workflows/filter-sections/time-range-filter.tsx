import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Calendar } from "@data-river/shared/ui/components/ui/calendar";
import { format, subDays, startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@data-river/shared/ui/components/ui/popover";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { cn } from "@data-river/shared/ui/utils";
import { FilterSection } from "./filter-section";

const TIME_RANGES = [
  { label: "Today", value: "today", shortcut: "T" },
  { label: "Yesterday", value: "yesterday", shortcut: "Y" },
  { label: "Last 7 days", value: "7days", shortcut: "W" },
  { label: "Last 14 days", value: "14days", shortcut: "B" },
  { label: "Last 30 days", value: "30days", shortcut: "M" },
] as const;

function getPresetRange(preset: (typeof TIME_RANGES)[number]["value"]) {
  const today = startOfToday();

  switch (preset) {
    case "today":
      return { from: today, to: new Date() };
    case "yesterday":
      return { from: subDays(today, 1), to: today };
    case "7days":
      return { from: subDays(today, 7), to: new Date() };
    case "14days":
      return { from: subDays(today, 14), to: new Date() };
    case "30days":
      return { from: subDays(today, 30), to: new Date() };
    default:
      return null;
  }
}

interface TimeRangeFilterProps {
  dateRange: { from?: Date; to?: Date } | null;
  onChange: (range: { from?: Date; to?: Date } | null) => void;
}

export function TimeRangeFilter({ dateRange, onChange }: TimeRangeFilterProps) {
  const [open, setOpen] = useState(false);

  useHotkeys(
    "enter",
    (e: KeyboardEvent) => {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    },
    { enableOnFormTags: true },
    [open],
  );

  TIME_RANGES.forEach(({ value, shortcut }) => {
    useHotkeys(
      shortcut.toLowerCase(),
      (e: KeyboardEvent) => {
        if (!open) return;
        e.preventDefault();
        onChange(getPresetRange(value));
      },
      { enableOnFormTags: true },
      [onChange, open],
    );
  });

  return (
    <FilterSection title="Time Range">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from
              ? `${format(dateRange.from, "LLL dd, y")} - ${
                  dateRange.to ? format(dateRange.to, "LLL dd, y") : "..."
                }`
              : "Pick a date range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="flex">
            <div className="w-[200px] border-r p-4 space-y-4">
              <div className="font-medium text-sm">Quick Select</div>
              {TIME_RANGES.map(({ label, value, shortcut }) => (
                <div
                  key={value}
                  className={cn(
                    "flex items-center gap-3 text-sm cursor-pointer hover:text-primary transition-colors py-1",
                    dateRange === getPresetRange(value) && "text-primary",
                  )}
                  onClick={() => {
                    onChange(getPresetRange(value));
                    setOpen(false);
                  }}
                >
                  <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-bold text-muted-foreground">
                    {shortcut}
                  </kbd>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="p-4 flex flex-col">
              <div className="font-medium text-sm mb-4">Custom Range</div>
              <Calendar
                mode="range"
                selected={{
                  from: dateRange?.from || undefined,
                  to: dateRange?.to || undefined,
                }}
                onSelect={(range) => {
                  onChange(
                    range?.from
                      ? {
                          from: range.from,
                          to: range.to || range.from,
                        }
                      : null,
                  );
                  if (range?.to) setOpen(false);
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FilterSection>
  );
}
