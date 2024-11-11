import { FilterSection } from "./filter-section";
import { Slider } from "@data-river/shared/ui/components/ui/slider";
import { Label } from "@data-river/shared/ui/components/ui/label";
import { useCallback, useState, useEffect } from "react";
import debounce from "lodash/debounce";

interface RangeFilterProps {
  runRange: [number, number];
  remixRange: [number, number];
  onRunRangeChange: (value: [number, number]) => void;
  onRemixRangeChange: (value: [number, number]) => void;
}

export function RangeFilter({
  runRange,
  remixRange,
  onRunRangeChange,
  onRemixRangeChange,
}: RangeFilterProps) {
  // Local state for immediate updates
  const [localRunRange, setLocalRunRange] = useState(runRange);
  const [localRemixRange, setLocalRemixRange] = useState(remixRange);

  // Update local state when props change
  useEffect(() => {
    setLocalRunRange(runRange);
  }, [runRange]);

  useEffect(() => {
    setLocalRemixRange(remixRange);
  }, [remixRange]);

  // Debounced handlers
  const debouncedRunChange = useCallback(
    debounce((value: [number, number]) => {
      onRunRangeChange(value);
    }, 300),
    [onRunRangeChange],
  );

  const debouncedRemixChange = useCallback(
    debounce((value: [number, number]) => {
      onRemixRangeChange(value);
    }, 300),
    [onRemixRangeChange],
  );

  return (
    <FilterSection title="Range Filters">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm">Run Count</Label>
          <Slider
            value={localRunRange}
            onValueChange={(value) => {
              const newValue = value as [number, number];
              setLocalRunRange(newValue);
              debouncedRunChange(newValue);
            }}
            max={1000}
            step={10}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{localRunRange[0]}</span>
            <span>{localRunRange[1]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm">Remix Count</Label>
          <Slider
            value={localRemixRange}
            onValueChange={(value) => {
              const newValue = value as [number, number];
              setLocalRemixRange(newValue);
              debouncedRemixChange(newValue);
            }}
            max={100}
            step={5}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{localRemixRange[0]}</span>
            <span>{localRemixRange[1]}</span>
          </div>
        </div>
      </div>
    </FilterSection>
  );
}
