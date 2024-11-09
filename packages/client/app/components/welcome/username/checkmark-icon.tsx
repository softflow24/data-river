import { motion } from "framer-motion";

export function CheckmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
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
  );
}
