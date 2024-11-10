import { FilterSection } from "./filter-section";
import { Slider } from "@data-river/shared/ui/components/ui/slider";

interface RangeFilterProps {
  title: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  max: number;
  step: number;
}

export function RangeFilter({
  title,
  value,
  onChange,
  max,
  step,
}: RangeFilterProps) {
  return (
    <FilterSection title={title}>
      <div className="space-y-4">
        <Slider
          value={value}
          onValueChange={(value) => onChange(value as [number, number])}
          max={max}
          step={step}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{value[0]}</span>
          <span>{value[1]}</span>
        </div>
      </div>
    </FilterSection>
  );
}
