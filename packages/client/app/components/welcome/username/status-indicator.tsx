import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { CheckmarkIcon } from "./checkmark-icon";

interface StatusIndicatorProps {
  username: string;
  isChecking: boolean;
  isAvailable: boolean | null;
}

export function StatusIndicator({
  username,
  isChecking,
  isAvailable,
}: StatusIndicatorProps) {
  if (username.length < 3) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="text-sm text-muted-foreground"
      >
        @
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {isChecking ? (
        <LoadingSpinner />
      ) : (
        isAvailable !== null && (
          <AvailabilityIndicator isAvailable={isAvailable} />
        )
      )}
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"
    />
  );
}

interface AvailabilityIndicatorProps {
  isAvailable: boolean;
}

function AvailabilityIndicator({ isAvailable }: AvailabilityIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        backgroundColor: isAvailable ? "#22c55e" : "#ef4444",
      }}
      transition={{ duration: 0.2 }}
      className="rounded-full w-5 h-5 flex items-center justify-center"
    >
      {isAvailable ? (
        <CheckmarkIcon />
      ) : (
        <XIcon className="h-3 w-3 text-white" />
      )}
    </motion.div>
  );
}
