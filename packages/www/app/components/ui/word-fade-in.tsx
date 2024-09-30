"use client";

import { motion, Variants } from "framer-motion";
import useIntersectionObserver from "~/hooks/use-intersect-observer";

import { cn } from "~/lib/utils";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export default function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
}: WordFadeInProps) {
  const _words = words.split(" ");
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]",
        className,
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={word} custom={i} variants={variants}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.h1>
  );
}
