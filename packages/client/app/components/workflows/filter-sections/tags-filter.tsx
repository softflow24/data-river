import { FilterSection } from "./filter-section";
import { cn } from "@data-river/shared/ui/utils";

const AVAILABLE_TAGS = [
  { id: "automation", count: 9 },
  { id: "api", count: 5 },
  { id: "data-processing", count: 5 },
  { id: "integration", count: 8 },
  { id: "ai", count: 3 },
  { id: "backup", count: 9 },
  { id: "notifications", count: 8 },
] as const;

interface TagsFilterProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export function TagsFilter({ selectedTags, onChange }: TagsFilterProps) {
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  return (
    <FilterSection title="Tags" defaultOpen>
      <div className="space-y-1">
        {AVAILABLE_TAGS.map(({ id, count }) => (
          <div
            key={id}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-muted transition-colors",
              selectedTags.includes(id) && "bg-muted",
            )}
            onClick={() => toggleTag(id)}
          >
            <div className="h-2 w-2 rounded-full bg-primary/60" />
            <span className="flex-1">{id}</span>
            <span className="text-xs text-muted-foreground">{count}</span>
          </div>
        ))}
      </div>
    </FilterSection>
  );
}
