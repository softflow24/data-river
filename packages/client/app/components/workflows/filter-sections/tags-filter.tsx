import { Badge } from "@data-river/shared/ui/components/ui/badge";
import { FilterSection } from "./filter-section";
import { cn } from "@data-river/shared/ui/utils";
import { motion } from "framer-motion";

interface TagsFilterProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  availableTags: Array<{ id: string; count: number; color: string }>;
}

export function TagsFilter({
  selectedTags,
  onChange,
  availableTags,
}: TagsFilterProps) {
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  if (availableTags.length === 0) {
    return (
      <FilterSection title="Tags" defaultOpen>
        <div className="text-sm text-muted-foreground py-2">
          No tags available
        </div>
      </FilterSection>
    );
  }

  return (
    <FilterSection title="Tags" defaultOpen>
      <div className="space-y-1.5">
        {availableTags.map(({ id, count, color }) => (
          <motion.div
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group relative flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer",
              "border border-transparent transition-all duration-200",
              selectedTags.includes(id)
                ? "bg-primary/10 border-primary/20 shadow-sm"
                : "hover:bg-muted/50 hover:border-muted-foreground/20",
            )}
            onClick={() => toggleTag(id)}
          >
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-transform group-hover:scale-110",
                `${color}-700`,
              )}
            />
            <span className="flex-1 font-medium capitalize">
              {id.replace(/-/g, " ")}
            </span>
            <Badge
              variant={selectedTags.includes(id) ? "default" : "secondary"}
              className="transition-colors"
            >
              {count}
            </Badge>
            {selectedTags.includes(id) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 rounded-lg border-2 border-primary/30"
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <button
            onClick={() => onChange([])}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear selected ({selectedTags.length})
          </button>
        </div>
      )}
    </FilterSection>
  );
}
