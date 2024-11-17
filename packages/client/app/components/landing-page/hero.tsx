import { Button } from "./ui/button";

export function Hero() {
  return (
    <section id="product" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Effortless Workflow Creation for Every Project
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Bring your ideas to life with dynamic blocks, flexible
              integrations, and powerful automation tools.
            </p>
          </div>
          <div className="space-x-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
