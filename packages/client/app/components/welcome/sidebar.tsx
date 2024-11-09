import { useLocation } from "@remix-run/react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { StepStatus, type Step } from "~/types/welcome";
import { StepIndicator } from "./step-indicator";

interface WelcomeSidebarProps {
  className?: string;
}

export function WelcomeSidebar({ className = "" }: WelcomeSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  let steps: Step[] = [
    {
      label: "Pick Username",
      href: "/welcome/username",
      status: "upcoming",
    },
    {
      label: "Select Interests",
      href: "/welcome/interests",
      status: "upcoming",
    },
  ];

  steps = steps.map((step) => ({
    ...step,
    status: getStepStatus(step.href, currentPath, steps),
  }));

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <p className="text-sm text-muted-foreground">
            Complete your profile setup
          </p>
        </div>
        <form action="/logout" method="post">
          <Button variant="ghost" size="sm" type="submit">
            Log out
          </Button>
        </form>
      </div>

      <nav className="space-y-2">
        {steps.map((step) => (
          <StepIndicator key={step.href} step={step} />
        ))}
      </nav>
    </div>
  );
}

// Helper function to determine step status
function getStepStatus(
  stepPath: string,
  currentPath: string,
  steps: Step[],
): StepStatus {
  const stepIndex = steps.findIndex((s) => s.href === stepPath);
  const currentIndex = steps.findIndex((s) => s.href === currentPath);

  if (stepPath === currentPath) return "current";
  if (stepIndex < currentIndex) return "completed";
  return "upcoming";
}
