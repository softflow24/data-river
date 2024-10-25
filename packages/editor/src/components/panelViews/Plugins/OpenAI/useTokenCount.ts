import { useState, useEffect } from "react";

const approximateTokens = (text: string): number => {
  const safetyMargin = 2;
  const tokensPerChar = 1 / Math.E; // Approximately 0.3679

  if (text.length < 2) return 0;
  return Math.ceil(text.length * tokensPerChar) + safetyMargin;
};

export const useTokenCount = (text: string): number => {
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    const count = approximateTokens(text);
    setTokenCount(count);
  }, [text]);

  return tokenCount;
};
