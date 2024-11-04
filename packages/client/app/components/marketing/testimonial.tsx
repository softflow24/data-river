export const Testimonial = () => {
  return (
    <div className="hidden bg-muted/40 xl:flex xl:w-[60%] xl:flex-col xl:justify-center xl:px-24 shrink-0">
      <div className="mx-auto max-w-[45%]">
        <blockquote className="space-y-10">
          <p className="text-3xl font-medium leading-relaxed lg:text-4xl">
            "I just learned about Data River and I'm in love! It's an open
            source Firebase alternative with real-time database changes and
            simple UI for database interaction."
          </p>
          <footer className="flex items-center gap-3 text-xl">
            <span className="font-semibold">Sarah Chen</span>
            <span className="text-muted-foreground">• Software Engineer</span>
          </footer>
        </blockquote>
      </div>
    </div>
  );
};
