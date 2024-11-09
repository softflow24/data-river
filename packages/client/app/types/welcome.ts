export type StepStatus = "completed" | "current" | "upcoming";

export type Step = {
  label: string;
  href: string;
  status: StepStatus;
};
