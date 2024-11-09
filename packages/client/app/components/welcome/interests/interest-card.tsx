import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SelectionIndicator } from "./selection-indicator";

interface InterestCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function InterestCard({
  id,
  name,
  icon,
  color,
  isSelected,
  onToggle,
}: InterestCardProps) {
  const Icon = Icons[icon as keyof typeof Icons] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <label className="group relative block cursor-pointer">
        <input
          type="checkbox"
          name="interests"
          value={id}
          checked={isSelected}
          onChange={() => onToggle(id)}
          className="hidden"
        />
        <div
          className={`
            relative flex items-center gap-4 rounded-lg border-2 p-4
            transition-all duration-200 ease-in-out
            ${color}
            ${
              isSelected
                ? "border-primary ring-1 ring-primary"
                : "border-primary/0 hover:border-primary/20"
            }
          `}
        >
          <div className="rounded-md p-2 bg-background/80 backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
          <span className="font-medium">{name}</span>

          <SelectionIndicator isSelected={isSelected} />
        </div>
      </label>
    </motion.div>
  );
}
