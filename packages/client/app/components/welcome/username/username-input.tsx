import { Input, Label } from "@data-river/shared/ui";
import { motion } from "framer-motion";
import { StatusIndicator } from "./status-indicator";
import { StatusMessage } from "./status-message";

interface UsernameInputProps {
  username: string;
  isChecking: boolean;
  isAvailable: boolean | null;
  error: string | null;
  onChange: (value: string) => void;
}

export function UsernameInput({
  username,
  isChecking,
  isAvailable,
  error,
  onChange,
}: UsernameInputProps) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label htmlFor="username">Username</Label>
      <div className="relative group">
        <BackgroundGlow
          isChecking={isChecking}
          error={error}
          isAvailable={isAvailable}
        />
        <div className="relative">
          <UsernameField
            username={username}
            isChecking={isChecking}
            error={error}
            isAvailable={isAvailable}
            onChange={onChange}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <StatusIndicator
              username={username}
              isChecking={isChecking}
              isAvailable={isAvailable}
            />
          </div>
        </div>
      </div>
      <StatusMessage
        username={username}
        error={error}
        isChecking={isChecking}
        isAvailable={isAvailable}
      />
    </motion.div>
  );
}

interface BackgroundGlowProps {
  isChecking: boolean;
  error: string | null;
  isAvailable: boolean | null;
}

function BackgroundGlow({
  isChecking,
  error,
  isAvailable,
}: BackgroundGlowProps) {
  return (
    <div
      className={`
        absolute -inset-0.5 rounded-lg blur
        transition-all duration-300
        ${
          !isChecking && (error || isAvailable !== null)
            ? error || !isAvailable
              ? "bg-gradient-to-r from-red-500/20 via-red-500/30 to-red-500/20 opacity-50"
              : "bg-gradient-to-r from-green-500/20 via-green-500/30 to-green-500/20 opacity-50"
            : "bg-gradient-to-r from-focus/20 via-focus/30 to-focus/20 opacity-30 group-hover:opacity-50"
        }
      `}
    />
  );
}

interface UsernameFieldProps extends UsernameInputProps {}

function UsernameField({
  username,
  isChecking,
  error,
  isAvailable,
  onChange,
}: UsernameFieldProps) {
  return (
    <Input
      id="username"
      name="username"
      value={username}
      autoFocus
      onChange={(e) => onChange(e.target.value)}
      placeholder="cooluser123"
      required
      className={`
        pr-10 
        transition-all 
        duration-200 
        bg-background/80 
        backdrop-blur-sm
        placeholder:text-muted-foreground/50
        ${
          !isChecking && (error || isAvailable !== null)
            ? error || !isAvailable
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-green-500 focus-visible:ring-green-500"
            : "focus-visible:ring-primary/30"
        }
      `}
    />
  );
}
