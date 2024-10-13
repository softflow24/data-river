import { Button } from "~/components/ui/button";
import { Star, Users, Box, Workflow } from "lucide-react";
import NumberTicker from "~/components/ui/number-ticker";
import MagicCard from "~/components/ui/magic-card";
import FlickeringGrid from "./ui/flickering-grid";
import DotPattern from "./ui/dot-pattern";

interface StorySectionProps {
  stats: {
    stars: number;
    contributors: number;
    blocks: number;
    workflows: number;
  };
}

export default function StorySection({ stats }: StorySectionProps) {
  const statIcons = {
    stars: <Star className="w-8 h-8 mb-2" />,
    contributors: <Users className="w-8 h-8 mb-2" />,
    blocks: <Box className="w-8 h-8 mb-2" />,
    workflows: <Workflow className="w-8 h-8 mb-2" />,
  };

  return (
    <section
      className="bg-background relative overflow-hidden min-h-svh flex flex-col items-center"
      style={{ backgroundColor: "#001220" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/images/waves/layered-waves-0.svg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <FlickeringGrid
        className="mx-auto absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background to-transparent" />
      <DotPattern
        width={20}
        height={20}
        className="absolute inset-0 opacity-10 z-10 [mask-image:linear-gradient(to_top,white,transparent,transparent)]"
        cx={1}
        cy={1}
        cr={1.5}
      />
      <div className="container py-24 sm:py-32 m-auto sm:m-0 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-foreground">
          Where We Are Today
        </h2>
        <p className="text-lg mb-12 text-center max-w-3xl mx-auto text-muted-foreground px-2">
          data-river is in its early stages, but the flow is gaining momentum.
          Our core functionalities are in place, and we're building the
          foundation for a platform that empowers anyone to create powerful,
          automated workflows without needing to code.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(stats).map(([key, value]) => (
            <MagicCard
              key={key}
              className="dark:bg-background  flex flex-col items-center justify-center p-6 cursor-default select-none mx-6"
              backgroundContent={
                <FlickeringGrid
                  className="absolute inset-0 z-0 w-full h-full"
                  squareSize={4}
                  gridGap={6}
                  color="#16A34A"
                  maxOpacity={0.5}
                  flickerChance={0.1}
                />
              }
            >
              <div className="flex justify-center">
                {statIcons[key as keyof typeof statIcons]}
              </div>
              <div className="text-4xl font-bold text-center">
                <NumberTicker value={value} />
              </div>
              <p className="text-center text-muted-foreground capitalize mt-2">
                {key}
              </p>
            </MagicCard>
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg">
            <a
              href="https://github.com/orgs/softflow24/projects/2/views/4"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Our Roadmap
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
