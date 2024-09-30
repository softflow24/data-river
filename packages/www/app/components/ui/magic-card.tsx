import React, { forwardRef, useCallback, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "~/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  maskColor?: string;
  ref?: React.Ref<HTMLDivElement>;
  backgroundContent?: React.ReactNode;
}

const MagicCard = forwardRef<HTMLDivElement, MagicCardProps>(
  (
    {
      children,
      className,
      gradientSize = 200,
      gradientColor = "#262626",
      gradientOpacity = 0.8,
      backgroundContent,
    }: MagicCardProps,
    ref,
  ) => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      },
      [mouseX, mouseY],
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      mouseX.set(-100);
      mouseY.set(-100);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group relative flex overflow-hidden rounded-xl",
          className,
        )}
      >
        <div className="relative z-10 w-full h-full">{children}</div>
        {backgroundContent ? (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, white, transparent)`,
              WebkitMaskImage: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, white, transparent)`,
              opacity: isHovering ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {backgroundContent}
          </motion.div>
        ) : (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl"
            style={{
              background: useMotionTemplate`
                radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
              `,
              opacity: isHovering ? gradientOpacity : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </motion.div>
    );
  },
);

MagicCard.displayName = "MagicCard";

export default MagicCard;
