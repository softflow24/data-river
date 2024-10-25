"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { AnimatedList } from "~/components/ui/animated-list";
import { cn } from "~/lib/utils";
import { RainbowButton } from "./ui/rainbow-button";
import RetroGrid from "./ui/retro-grid";
import WordPullUp from "./ui/word-pull-up";
import DotPattern from "./ui/dot-pattern";
import GridPattern from "./ui/animated-grid-pattern";

const milestones = [
  { title: "Expanding the Basic Node Library", date: "Q3 2023" },
  { title: "Connecting to popular tools and platforms", date: "Q4 2023" },
  { title: "Building intelligent, self-learning nodes", date: "Q1 2024" },
  {
    title: "A lake filled with pre-built blocks and workflows",
    date: "Q2 2024",
  },
];

const MilestoneCard = ({ title, date }: { title: string; date: string }) => (
  <Card className="w-full cursor-pointer transition-all duration-200 ease-in-out hover:scale-[103%]">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{date}</p>
      <Badge>Coming Soon</Badge>
    </CardContent>
  </Card>
);

export default function RoadmapSection() {
  return (
    <section className="bg-background relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <RetroGrid className="absolute inset-0 z-10 -mt-64" />
      <DotPattern
        width={20}
        height={20}
        className="absolute inset-0 opacity-10 z-0 [mask-image:linear-gradient(to_top,white,transparent,transparent)]"
        cx={1}
        cy={1}
        cr={1.5}
      />
      <GridPattern
        width={40}
        height={40}
        className={cn(
          "[mask-image:linear-gradient(to_top,white,transparent,transparent)] opacity-10",
        )}
      />
      <div className="container py-24 sm:py-32 m-auto relative z-20">
        <WordPullUp words={"The Journey Ahead"} className="mb-24" />
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 hidden md:grid">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} {...milestone} />
          ))}
        </div>
        <div
          className={cn(
            "relative flex h-[702px] w-full flex-col p-6 overflow-hidden md:hidden",
          )}
        >
          <AnimatedList>
            {milestones.map((milestone, index) => (
              <MilestoneCard key={index} {...milestone} />
            ))}
          </AnimatedList>
        </div>
        <div className="text-center mt-12">
          <a href="https://discord.gg/CmEqvZQUQn" target="_blank" rel="noreferrer">
            <RainbowButton size="lg">
              {" "}
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>{" "}
              Join Our Discord Community
            </RainbowButton>
          </a>
        </div>
      </div>
    </section>
  );
}
