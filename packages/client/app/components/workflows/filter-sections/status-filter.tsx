import { Switch } from "@data-river/shared/ui/components/ui/switch";
import { Label } from "@data-river/shared/ui/components/ui/label";
import { FilterSection } from "./filter-section";

interface StatusFilterProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

export function StatusFilter({ isPublic, onChange }: StatusFilterProps) {
  return (
    <FilterSection title="Status" defaultOpen>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="public" className="text-sm">
            Public
          </Label>
          <Switch id="public" checked={isPublic} onCheckedChange={onChange} />
        </div>
      </div>
    </FilterSection>
  );
}
