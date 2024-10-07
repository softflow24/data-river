import Icons from "lucide-react";

interface Control {
  type: "text" | "text-area";
  label: string;
  name: string;
  placeholder?: string;
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
}
