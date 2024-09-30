"use client";

import { useEffect, useState } from "react";
import useIntersectionObserver from "~/hooks/use-intersect-observer";
import { cn } from "~/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const { ref, isVisible } = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;

    const typingEffect = setInterval(() => {
      if (displayedText.length < text.length) {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, isVisible, text, displayedText]);

  if (!isVisible) {
    className = className + " opacity-0";
  }

  return (
    <h1
      ref={ref}
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {isVisible && displayedText.length > 0
        ? displayedText
        : isVisible
          ? text.charAt(0)
          : text}
    </h1>
  );
}
