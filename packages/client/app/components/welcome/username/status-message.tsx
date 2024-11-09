import { motion } from "framer-motion";

interface StatusMessageProps {
  username: string;
  error: string | null;
  isChecking: boolean;
  isAvailable: boolean | null;
}

export function StatusMessage({
  username,
  error,
  isChecking,
  isAvailable,
}: StatusMessageProps) {
  const getMessage = () => {
    if (error) return error;
    if (isChecking) return "Checking availability...";
    if (isAvailable === null) return "Checking availability...";
    return isAvailable ? "Username is available!" : "Username is already taken";
  };

  return (
    <motion.div
      className="min-h-[20px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {username.length === 0 && (
        <p className="text-sm text-muted-foreground/80">
          This will be your unique identifier
        </p>
      )}
      {username.length > 0 && (
        <motion.p
          key={error?.toString() ?? username}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm ${
            error
              ? "text-red-500"
              : !isChecking && isAvailable !== null
                ? isAvailable
                  ? "text-green-500"
                  : "text-red-500"
                : "text-muted-foreground"
          }`}
        >
          {getMessage()}
        </motion.p>
      )}
    </motion.div>
  );
}
