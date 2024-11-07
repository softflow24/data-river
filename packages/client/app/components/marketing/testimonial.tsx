import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Testimonial = () => {
  const testimonials = [
    "Data-River has completely transformed how my team and I handle automation. The visual editor makes complex workflows accessible, even for those with no coding experience. It's intuitive, powerful, and simply brilliant!",
    "The modular design of Data-River is perfect for our growing team. We can build, share, and customize blocks, which saves us hours on repetitive tasks. Plus, our non-tech members love the easy drag-and-drop setup.",
    "As an educator, Data-River is a game changer. Its intuitive, visual approach makes it easy to introduce programming concepts to students, and the platform’s flexibility allows them to explore more advanced logic when they’re ready.",
  ];

  const [testimonial, setTestimonial] = useState(testimonials[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * testimonials.length);
    setTestimonial(testimonials[randomIndex]);

    const interval = setInterval(() => {
      setTestimonial((current) => {
        const currentIndex = testimonials.indexOf(current);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return testimonials[nextIndex];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden bg-muted/40 xl:flex xl:w-[60%] xl:flex-col xl:justify-center xl:px-24 shrink-0">
      <div className="mx-auto max-w-[45%]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={testimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-10"
          >
            <motion.p
              className="text-3xl font-medium leading-relaxed lg:text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              "{testimonial}"
            </motion.p>
          </motion.blockquote>
        </AnimatePresence>
      </div>
    </div>
  );
};
