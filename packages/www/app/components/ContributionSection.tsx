import { CardContent, CardHeader } from "~/components/ui/card";
import { Box, PaintBucket, FileText, Bug } from "lucide-react";
import Meteors from "./ui/meteors";
import DotPattern from "./ui/dot-pattern";
import GridPattern from "./ui/animated-grid-pattern";
import Particles from "./ui/particles";
import { NeonGradientCard } from "./ui/neon-gradient-card";
import ShineBorder from "./ui/shine-border";
import { useState } from "react";
import HyperText from "./ui/hyper-text";
import useIntersectionObserver from "~/hooks/use-intersect-observer";
import WordPullUp from "./ui/word-pull-up";

const contributions = [
  {
    title: "Code",
    icon: Box,
    description: "Help us build new nodes, features, and integrations.",
  },
  {
    title: "Design",
    icon: PaintBucket,
    description: "Enhance the visual experience with your creativity.",
  },
  {
    title: "Documentation",
    icon: FileText,
    description:
      "Make data-river accessible by creating clear, easy-to-follow guides.",
  },
  {
    title: "Testing",
    icon: Bug,
    description: "Test flows, break things, and help us improve.",
  },
];

const ContributionCard = ({
  title,
  Icon,
  description,
}: {
  title: string;
  Icon: React.ElementType;
  description: string;
}) => {
  const { ref, isVisible } = useIntersectionObserver({ delay: 1000 });

  return (
    <NeonGradientCard
      className="w-full items-center justify-center text-center" // Changed from max-w-sm to w-full
      ref={ref}
    >
      <CardHeader>
        <Icon className="w-12 h-12 mb-4 mx-auto transition-transform hover:rotate-6" />
        <div className="flex items-center justify-center">
          <HyperText
            text={title}
            className="text-xl font-bold"
            triggerAnimationValue={isVisible ? 1 : 0}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </NeonGradientCard>
  );
};

export default function ContributionSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-background">
      {/* Add Particles and Meteors for dynamic effect */}
      <Particles className="absolute inset-0 z-0 opacity-40" />
      <Meteors />
      {/* Use the Dot Pattern or Grid Pattern */}
      <DotPattern
        width={20}
        height={20}
        className="absolute inset-0 opacity-10 z-0"
        cx={1}
        cy={1}
        cr={1.5}
      />
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 opacity-10 z-0"
      />

      {/* Keep the retro grid */}
      <div className="container py-24 sm:py-32 m-auto relative z-20 px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Adjusted padding */}
        <WordPullUp words="Contribute to the Flow" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {" "}
          {/* Adjusted grid and gap */}
          {contributions.map((contribution, index) => (
            <ContributionCard
              key={index}
              title={contribution.title}
              Icon={contribution.icon}
              description={contribution.description}
            />
          ))}
        </div>
        <div className="flex items-center justify-center text-center mt-24">
          <a
            href="https://github.com/orgs/softflow24/projects/2"
            className="mt-24 transition-all duration-300 hover:scale-105 "
          >
            <ShineBorder
              className="text-center text-2xl font-bold capitalize"
              color={!isHovered ? "white" : ["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              duration={isHovered ? 7 : 14}
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              Check Out Our Project
            </ShineBorder>
          </a>
        </div>
      </div>
    </section>
  );
}
