import { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  threshold?: number;
  delay?: number;
}

export default function useIntersectionObserver({
  threshold = 0.1,
  delay = 500,
}: IntersectionObserverOptions = {}): {
  ref: React.RefObject<any>;
  isVisible: boolean;
} {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return { ref, isVisible };
}
