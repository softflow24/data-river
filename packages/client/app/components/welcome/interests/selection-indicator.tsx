import { motion } from "framer-motion";

interface SelectionIndicatorProps {
  isSelected: boolean;
}

export function SelectionIndicator({ isSelected }: SelectionIndicatorProps) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2">
      <motion.div className="rounded-full w-6 h-6 flex items-center justify-center">
        {isSelected && (
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            fill="none"
          >
            <motion.path
              d="M4.5 12.75l6 6 9-13.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
              }}
            />
          </svg>
        )}
      </motion.div>
    </div>
  );
}
