import { Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    position: { x: 0, y: 100 },
    data: { label: "Start", isMinimalist: false },
  },
  {
    id: "2",
    type: "process",
    position: { x: 200, y: 0 },
    data: { label: "Process", isMinimalist: false },
  },
  {
    id: "3",
    type: "conditional",
    position: { x: 400, y: 100 },
    data: {
      label: "Condition",
      condition: "text contains Yes",
      isMinimalist: false,
    },
  },
  {
    id: "4",
    type: "action",
    position: { x: 600, y: 0 },
    data: { label: "Action", isMinimalist: false },
  },
  {
    id: "5",
    type: "response",
    position: { x: 800, y: 100 },
    data: { label: "Response", isMinimalist: false },
  },
];
