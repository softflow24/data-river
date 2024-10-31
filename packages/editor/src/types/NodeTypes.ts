import { RequestFormData } from "@data-river/shared/contracts/blocks/request";
import Icons from "lucide-react";

interface Control {
  type:
    | "text"
    | "text-area"
    | "select"
    | "conditions-summary"
    | "request-info"
    | "text-readonly";
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface NodeData {
  addable?: boolean; // Whether the block can be added to the flow manually.
  stable?: boolean; // Whether the block is stable.
  block: string;
  label: string;
  description?: string;
  color: string;
  icon: keyof typeof Icons;
  controls?: Control[];
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  config?: Record<string, unknown>;
  inputsConfiguration?: Record<
    string,
    { type: string | string[]; required: boolean }
  >;
  outputsConfiguration?: Record<
    string,
    { type: string | string[]; required: boolean }
  >;
}

export type RequestNodeData = Omit<NodeData, "config"> & {
  config: RequestFormData;
};
