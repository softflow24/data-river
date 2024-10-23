import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, Sparkles } from "lucide-react";
import { cn } from "@data-river/shared/ui";

interface AnimatedSparkleProps {
  animate: boolean;
  className?: string;
}

const AnimatedSparkle: React.FC<AnimatedSparkleProps> = ({
  animate,
  className,
}) => {
  return (
    <div className="relative w-3 h-3">
      <Sparkle
        className={cn("w-full h-full absolute inset-0 z-10", className)}
      />
      <AnimatePresence>
        {animate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Sparkles
              className={cn("w-full h-full animate-blink", className)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSparkle;
