import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Puzzle, Users, GitBranch, MousePointerClick } from "lucide-react";
import TypingAnimation from "./ui/typing-animation";
import DotPattern from "./ui/dot-pattern";
import { AnimatedBeamDemo } from "./AnimatedBeamDemo";
import WordFadeIn from "./ui/word-fade-in";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Visual Programming",
    description:
      "Create complex workflows with an intuitive drag-and-drop interface.",
    icon: <MousePointerClick className="w-8 h-8" />,
  },
  {
    title: "Extensible Architecture",
    description: "Easily add new nodes and functionalities to suit your needs.",
    icon: <Puzzle className="w-8 h-8" />,
  },
  {
    title: "Real-time Collaboration",
    description:
      "Work together on workflows in real-time, just like Google Docs.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Version Control",
    description: "Track changes, branch, and merge your workflows like code.",
    icon: <GitBranch className="w-8 h-8" />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-background relative overflow-hidden max-h-[120rem] md:min-h-screen flex flex-col items-center justify-center">
      <DotPattern
        width={20}
        height={20}
        className="absolute inset-0 opacity-10 z-0"
        cx={1}
        cy={1}
        cr={1.5}
      />
      <div className="container pt-32 m-auto z-10 relative md:py-24 lg:-mt-24">
        {/* Title and Description */}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
          <TypingAnimation
            text="Key Features"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          />
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Data River offers a powerful set of features to streamline your
            workflow and boost productivity.
          </p>
        </div>

        <div className=" mx-4 md:mx-auto grid justify-center gap-6 grid-cols-1 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg h-44"
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-4">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full flex items-center justify-center my-24 md:my-48">
          <WordFadeIn
            words={"Seamless Integration between your favorite tools"}
          />
        </div>

        <div className="flex items-center justify-center text-center mt-24 mx-auto max-w-3xl">
          <AnimatedBeamDemo />
        </div>
      </div>
    </section>
  );
}
