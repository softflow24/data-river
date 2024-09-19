import { Edge } from "reactflow";

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", sourceHandle: "yes", animated: true },
  { id: "e3-5", source: "3", target: "5", sourceHandle: "no", animated: true },
  { id: "e4-5", source: "4", target: "5", animated: true },
];
