import { motion } from "framer-motion";

interface RequirementsProps {
  username: string;
  isAvailable: boolean | null;
}

export function Requirements({ username, isAvailable }: RequirementsProps) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-sm font-medium">Username requirements:</h3>
      <ul className="text-sm text-muted-foreground space-y-1">
        <li className="flex items-center space-x-2">
          <div
            className={`w-1 h-1 rounded-full ${
              username.length >= 3 ? "bg-primary" : "bg-muted-foreground"
            }`}
          />
          <span>At least 3 characters long</span>
        </li>
        <li className="flex items-center space-x-2">
          <div
            className={`w-1 h-1 rounded-full ${
              /^[a-zA-Z0-9_-]*$/.test(username)
                ? "bg-primary"
                : "bg-muted-foreground"
            }`}
          />
          <span>Can contain letters, numbers, underscores, and hyphens</span>
        </li>
        <li className="flex items-center space-x-2">
          <div
            className={`w-1 h-1 rounded-full ${
              isAvailable ? "bg-primary" : "bg-muted-foreground"
            }`}
          />
          <span>Must be unique</span>
        </li>
      </ul>
    </motion.div>
  );
}
