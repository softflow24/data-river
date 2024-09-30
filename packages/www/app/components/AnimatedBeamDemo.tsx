import { forwardRef, useRef } from "react";
import { cn } from "~/lib/utils";
import { AnimatedBeam } from "~/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const slackRef = useRef<HTMLDivElement>(null);
  const zapierRef = useRef<HTMLDivElement>(null);
  const openaiRef = useRef<HTMLDivElement>(null);
  const googleSheetsRef = useRef<HTMLDivElement>(null);
  const notionRef = useRef<HTMLDivElement>(null);
  const dataRiverRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg p-10"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={githubRef} className="size-16">
            <img
              src="assets/images/integration-logos/github.svg"
              alt="GitHub"
              width={48}
              height={48}
            />
          </Circle>
          <Circle ref={googleSheetsRef} className="size-16">
            <img
              src="assets/images/integration-logos/google-drive.svg"
              alt="Google Sheets"
              width={48}
              height={48}
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={slackRef} className="size-16">
            <img
              src="assets/images/integration-logos/slack.svg"
              alt="Slack"
              width={48}
              height={48}
            />
          </Circle>
          <Circle ref={dataRiverRef} className="size-32">
            <img
              src="assets/images/logo.svg"
              alt="Data river"
              width={48}
              height={48}
            />
          </Circle>
          <Circle ref={openaiRef} className="size-16">
            <img
              src="assets/images/integration-logos/openai.svg"
              alt="OpenAI"
              width={48}
              height={48}
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={notionRef} className="size-16">
            <img
              src="assets/images/integration-logos/notion.svg"
              alt="Notion"
              width={48}
              height={48}
            />
          </Circle>
          <Circle ref={zapierRef} className="size-16">
            <img
              src="assets/images/integration-logos/zapier.svg"
              alt="Zapier"
              width={48}
              height={48}
            />
          </Circle>
        </div>
      </div>

      {/* Connecting the beams between the icons */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={githubRef}
        toRef={dataRiverRef}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={slackRef}
        toRef={dataRiverRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={openaiRef}
        toRef={dataRiverRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={notionRef}
        toRef={dataRiverRef}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={googleSheetsRef}
        toRef={dataRiverRef}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={zapierRef}
        toRef={dataRiverRef}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}
