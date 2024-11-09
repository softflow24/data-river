import { type Step } from "~/types/welcome";

interface StepIndicatorProps {
  step: Step;
}

export function StepIndicator({ step }: StepIndicatorProps) {
  const isDisabled = step.status === "upcoming" || step.status === "completed";

  return (
    <div
      className={`group relative flex items-center gap-2 ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="relative">
        <div
          className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full 
          ${step.status === "current" ? "bg-focus" : "bg-muted"}`}
        />
        {step.status === "current" && (
          <div className="absolute inset-0 rounded-full bg-focus/80 animate-scale-pulse" />
        )}
      </div>
      <a
        href={isDisabled ? undefined : step.href}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
        }}
        className={`flex flex-1 items-center py-2 text-sm ${
          step.status === "current"
            ? "text-foreground font-medium"
            : "text-muted-foreground"
        } ${isDisabled ? "pointer-events-none" : "hover:text-foreground"}`}
      >
        {step.label}
      </a>
    </div>
  );
}
