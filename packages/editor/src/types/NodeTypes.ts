import Icons from "lucide-react";

interface Control {
  type: "text" | "text-area" | "select" | "conditions-summary";
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface NodeData {
  block: string;
  label: string;
  description?: string;
  color: string;
  sourceHandle: boolean;
  targetHandle: boolean;
  icon: keyof typeof Icons;
  controls?: Control[];
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  config?: Record<string, unknown>;
}
