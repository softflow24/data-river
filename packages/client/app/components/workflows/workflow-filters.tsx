import { Button } from "@data-river/shared/ui/components/ui/button";
import { useState } from "react";
import { StatusFilter } from "./filter-sections/status-filter";
import { TimeRangeFilter } from "./filter-sections/time-range-filter";
import { RangeFilter } from "./filter-sections/range-filter";
import { TagsFilter } from "./filter-sections/tags-filter";

export type WorkflowFilters = {
  search: string;
  status: {
    public: boolean;
  };
  runRange: [number, number];
  remixRange: [number, number];
  tags: string[];
  sort: "updated" | "created" | "name" | "runs" | "remixes";
  dateRange: {
    from?: Date;
    to?: Date;
  } | null;
};

interface WorkflowFiltersProps {
  onChange: (filters: WorkflowFilters) => void;
  initialFilters?: WorkflowFilters;
}

export function WorkflowFilters({
  onChange,
  initialFilters,
}: WorkflowFiltersProps) {
  const [filters, setFilters] = useState<WorkflowFilters>(
    initialFilters ?? {
      search: "",
      status: {
        public: false,
      },
      runRange: [0, 1000],
      remixRange: [0, 100],
      tags: [],
      sort: "updated",
      dateRange: null,
    },
  );

  const updateFilters = (updates: Partial<WorkflowFilters>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onChange(newFilters);
  };

  const handleStatusChange = (isPublic: boolean) => {
    updateFilters({ status: { ...filters.status, public: isPublic } });
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | null) => {
    updateFilters({
      dateRange: range,
    });
  };

  const handleRunRangeChange = (value: [number, number]) => {
    updateFilters({ runRange: value });
  };

  const handleRemixRangeChange = (value: [number, number]) => {
    updateFilters({ remixRange: value });
  };

  const handleTagsChange = (tags: string[]) => {
    updateFilters({ tags });
  };

  const hasActiveFilters =
    filters.status.public ||
    filters.tags.length > 0 ||
    filters.runRange[0] > 0 ||
    filters.runRange[1] < 1000 ||
    filters.remixRange[0] > 0 ||
    filters.remixRange[1] < 100 ||
    filters.dateRange !== null;

  return (
    <div className="space-y-4">
      <div className="font-medium">Filters</div>

      <StatusFilter
        isPublic={filters.status.public}
        onChange={handleStatusChange}
      />

      <TimeRangeFilter
        dateRange={
          filters.dateRange
            ? {
                from: filters.dateRange.from
                  ? new Date(filters.dateRange.from)
                  : undefined,
                to: filters.dateRange.to
                  ? new Date(filters.dateRange.to)
                  : undefined,
              }
            : null
        }
        onChange={handleDateRangeChange}
      />

      <RangeFilter
        title="Run Count"
        value={filters.runRange}
        onChange={handleRunRangeChange}
        max={1000}
        step={10}
      />

      <RangeFilter
        title="Remix Count"
        value={filters.remixRange}
        onChange={handleRemixRangeChange}
        max={100}
        step={5}
      />

      <TagsFilter selectedTags={filters.tags} onChange={handleTagsChange} />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() =>
            updateFilters({
              status: { public: false },
              runRange: [0, 1000],
              remixRange: [0, 100],
              tags: [],
              dateRange: null,
            })
          }
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}
